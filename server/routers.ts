import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createStoredFile, getStoredFileUsageByUser, listStoredFilesByUser, removeStoredFileByUser } from "./db";
import { validateStudyFile } from "./fileValidation";
import { buildStorageQuotaSummary } from "./storageQuota";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
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
});

export type AppRouter = typeof appRouter;
