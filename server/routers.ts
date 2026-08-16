import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createPasswordUser, createStoredFile, getLearningProgressByUser, getPublicPetProfileByUser, getStoredFileUsageByUser, getUserByUsername, listPublicPetLeaderboard, listStoredFilesByUser, removeStoredFileByUser, saveLearningProgressByUser, savePublicPetProfile } from "./db";
import { validateStudyFile } from "./fileValidation";
import { buildStorageQuotaSummary } from "./storageQuota";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";
import { rankPublicPetProfiles } from "./petSocial";
import { discoverProviderModels, generatePrdMarkdown } from "./prdMaker";
import { clearFailedLogins, hashPassword, isLoginRateLimited, isValidPassword, isValidUsername, localOpenId, normalizeUsername, recordFailedLogin, verifyPassword } from "./localAuth";
import { sdk } from "./_core/sdk";
import { learningProgressSnapshotSchema } from "./learningProgress";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const REMEMBER_ME_SESSION_MS = 30 * ONE_DAY_MS;
const STANDARD_SESSION_MS = ONE_DAY_MS;

const localCredentialInput = z.object({
  username: z.string().min(3).max(32),
  password: z.string().min(10).max(128),
  rememberMe: z.boolean().optional().default(false),
});

function safeUser(user: NonNullable<Awaited<ReturnType<typeof getUserByUsername>>>) {
  const { passwordHash: _passwordHash, ...publicUser } = user;
  return publicUser;
}

async function createLocalSession(ctx: { req: Parameters<typeof getSessionCookieOptions>[0]; res: { cookie: (name: string, value: string, options: Record<string, unknown>) => unknown } }, user: NonNullable<Awaited<ReturnType<typeof getUserByUsername>>>, rememberMe: boolean) {
  const expiresInMs = rememberMe ? REMEMBER_ME_SESSION_MS : STANDARD_SESSION_MS;
  const sessionToken = await sdk.createSessionToken(user.openId, { name: user.name ?? user.username ?? "Belajar AI", expiresInMs });
  const cookieOptions = getSessionCookieOptions(ctx.req);
  ctx.res.cookie(COOKIE_NAME, sessionToken, rememberMe ? { ...cookieOptions, maxAge: expiresInMs } : cookieOptions);
}

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user ? safeUser(opts.ctx.user) : null),
    register: publicProcedure.input(localCredentialInput).mutation(async ({ ctx, input }) => {
      const username = normalizeUsername(input.username);
      if (!isValidUsername(username) || !isValidPassword(input.password)) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Gunakan username 3–32 karakter (huruf kecil, angka, titik, garis bawah, atau strip) dan password 10–128 karakter." });
      }
      if (await getUserByUsername(username)) {
        throw new TRPCError({ code: "CONFLICT", message: "Username ini sudah digunakan. Coba masuk atau pilih username lain." });
      }
      let user;
      try {
        user = await createPasswordUser({ openId: localOpenId(username), username, passwordHash: await hashPassword(input.password) });
      } catch (error) {
        throw new TRPCError({ code: "CONFLICT", message: "Username ini sudah digunakan. Coba masuk atau pilih username lain.", cause: error });
      }
      if (!user) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Akun belum dapat dibuat. Coba lagi." });
      await createLocalSession(ctx, user, input.rememberMe);
      return { user: safeUser(user) };
    }),
    login: publicProcedure.input(localCredentialInput).mutation(async ({ ctx, input }) => {
      const username = normalizeUsername(input.username);
      if (isLoginRateLimited(username)) throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Terlalu banyak percobaan masuk. Tunggu sebentar lalu coba lagi." });
      const user = isValidUsername(username) ? await getUserByUsername(username) : undefined;
      const valid = user?.loginMethod === "password" && await verifyPassword(input.password, user.passwordHash);
      if (!user || !valid) {
        recordFailedLogin(username);
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Username atau password tidak cocok." });
      }
      clearFailedLogins(username);
      await createLocalSession(ctx, user, input.rememberMe);
      return { user: safeUser(user) };
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  files: router({
    list: protectedProcedure.query(({ ctx }) => listStoredFilesByUser(ctx.user.id)),
    quota: protectedProcedure.query(async ({ ctx }) => buildStorageQuotaSummary(await getStoredFileUsageByUser(ctx.user.id))),
    upload: protectedProcedure.input(z.object({
      originalName: z.string().min(1).max(255),
      mimeType: z.string().min(1).max(160),
      base64: z.string().min(1).max(7_100_000),
      purpose: z.enum(["study-note", "reference", "other"]).default("reference"),
    })).mutation(async ({ ctx, input }) => {
      let validated: ReturnType<typeof validateStudyFile>;
      try {
        validated = validateStudyFile(input);
      } catch (error) {
        throw new TRPCError({ code: "BAD_REQUEST", message: error instanceof Error ? error.message : "File tidak valid." });
      }
      const { bytes, safeName } = validated;
      const quota = buildStorageQuotaSummary(await getStoredFileUsageByUser(ctx.user.id));
      if (bytes.length > quota.remainingBytes) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Kuota penyimpanan 25 MB akunmu tidak mencukupi untuk file ini." });
      }
      const { key, url } = await storagePut(`${ctx.user.id}/study-files/${Date.now()}-${safeName}`, bytes, input.mimeType);
      const file = await createStoredFile({ userId: ctx.user.id, fileKey: key, url, originalName: input.originalName, mimeType: input.mimeType, sizeBytes: bytes.length, purpose: input.purpose });
      return file;
    }),
    remove: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
      const removed = await removeStoredFileByUser(input.id, ctx.user.id);
      if (!removed) throw new TRPCError({ code: "NOT_FOUND", message: "File tidak ditemukan atau bukan milik akun ini." });
      return { success: true } as const;
    }),
  }),
  learning: router({
    mine: protectedProcedure.input(z.object({ accountId: z.number().int().positive() })).query(async ({ ctx, input }) => {
      if (input.accountId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN", message: "Snapshot progres hanya dapat dibuka oleh pemilik akun." });
      return (await getLearningProgressByUser(ctx.user.id)) ?? null;
    }),
    save: protectedProcedure.input(learningProgressSnapshotSchema).mutation(({ ctx, input }) =>
      saveLearningProgressByUser(ctx.user.id, input)),
  }),
  petSocial: router({
    leaderboard: publicProcedure.query(async () => rankPublicPetProfiles(await listPublicPetLeaderboard())),
    mine: protectedProcedure.query(({ ctx }) => getPublicPetProfileByUser(ctx.user.id)),
    update: protectedProcedure.input(z.object({
      isPublic: z.boolean(),
      petId: z.enum(["cat", "dog", "unicorn", "robot"]),
      xp: z.number().int().min(0).max(1_000_000),
      stage: z.enum(["bayi", "anak", "remaja", "prima", "dewasa"]),
      equippedAccessory: z.string().max(64).nullable(),
    })).mutation(({ ctx, input }) => savePublicPetProfile({
      userId: ctx.user.id,
      isPublic: input.isPublic ? 1 : 0,
      petId: input.petId,
      xp: input.xp,
      stage: input.stage,
      equippedAccessory: input.equippedAccessory,
    })),
  }),
  prdMaker: router({
    models: protectedProcedure.input(z.object({ baseUrl: z.string().min(8).max(500), apiKey: z.string().min(1).max(2048) })).mutation(({ input }) => discoverProviderModels(input.baseUrl, input.apiKey)),
    generate: protectedProcedure.input(z.object({
      baseUrl: z.string().min(8).max(500), apiKey: z.string().min(1).max(2048), model: z.string().min(1).max(256),
      projectName: z.string().min(2).max(100), problem: z.string().min(20).max(12_000), audience: z.string().min(2).max(300), stack: z.string().min(2).max(300),
    })).mutation(({ input }) => generatePrdMarkdown(input)),
  }),
});

export type AppRouter = typeof appRouter;
