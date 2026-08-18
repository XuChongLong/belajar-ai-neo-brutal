import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";
import { hashPassword } from "./localAuth";

const mocked = vi.hoisted(() => ({
  getUserByUsername: vi.fn(),
  createPasswordUser: vi.fn(),
  createSessionToken: vi.fn(),
}));

vi.mock("./db", () => ({
  createPasswordUser: mocked.createPasswordUser,
  createStoredFile: vi.fn(),
  getPublicPetProfileByUser: vi.fn(),
  getStoredFileUsageByUser: vi.fn(),
  getUserByUsername: mocked.getUserByUsername,
  listPublicPetLeaderboard: vi.fn(),
  listStoredFilesByUser: vi.fn(),
  removeStoredFileByUser: vi.fn(),
  savePublicPetProfile: vi.fn(),
}));

vi.mock("./_core/sdk", () => ({
  sdk: { createSessionToken: mocked.createSessionToken },
}));

import { appRouter } from "./routers";

const user = {
  id: 44,
  openId: "local:anne.belajar",
  name: "anne.belajar",
  email: null,
  username: "anne.belajar",
  passwordHash: "scrypt$abc$def",
  loginMethod: "password",
  role: "user" as const,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
  lastSignedIn: new Date("2026-01-01"),
};

function createContext() {
  const cookies: { name: string; value: string; options: Record<string, unknown> }[] = [];
  const ctx: TrpcContext = {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { cookie: (name: string, value: string, options: Record<string, unknown>) => cookies.push({ name, value, options }), clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
  return { ctx, cookies };
}

describe("auth local credentials", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocked.createSessionToken.mockResolvedValue("signed-local-session");
  });

  it("registers a local account, creates a secure session, and never returns a password hash", async () => {
    mocked.getUserByUsername.mockResolvedValueOnce(undefined);
    mocked.createPasswordUser.mockResolvedValue({ ...user, passwordHash: await hashPassword("aman-sekali-123") });
    const { ctx, cookies } = createContext();

    const result = await appRouter.createCaller(ctx).auth.register({ username: "Anne.Belajar", password: "aman-sekali-123" });

    expect(mocked.createPasswordUser).toHaveBeenCalledWith(expect.objectContaining({ openId: "local:anne.belajar", username: "anne.belajar" }));
    expect(mocked.createSessionToken).toHaveBeenCalledWith("local:anne.belajar", expect.objectContaining({ name: "anne.belajar" }));
    expect(cookies).toHaveLength(1);
    expect(cookies[0]?.options).toMatchObject({ httpOnly: true, secure: true, sameSite: "none" });
    expect(result.sessionToken).toBe("signed-local-session");
    expect(result.user).toMatchObject({ username: "anne.belajar", loginMethod: "password" });
    expect(result.user).not.toHaveProperty("passwordHash");
  });

  it("uses a session-only cookie by default and a bounded persistent cookie when Remember Me is selected", async () => {
    const passwordHash = await hashPassword("aman-sekali-123");
    mocked.getUserByUsername.mockResolvedValue({ ...user, passwordHash });
    const first = createContext();
    await appRouter.createCaller(first.ctx).auth.login({ username: "anne.belajar", password: "aman-sekali-123", rememberMe: false });
    expect(mocked.createSessionToken).toHaveBeenLastCalledWith("local:anne.belajar", expect.objectContaining({ expiresInMs: 86_400_000 }));
    expect(first.cookies[0]?.options).not.toHaveProperty("maxAge");

    const second = createContext();
    await appRouter.createCaller(second.ctx).auth.login({ username: "anne.belajar", password: "aman-sekali-123", rememberMe: true });
    expect(mocked.createSessionToken).toHaveBeenLastCalledWith("local:anne.belajar", expect.objectContaining({ expiresInMs: 2_592_000_000 }));
    expect(second.cookies[0]?.options).toMatchObject({ maxAge: 2_592_000_000, httpOnly: true, secure: true });
  });

  it("rejects a duplicate username before creating a second account", async () => {
    mocked.getUserByUsername.mockResolvedValue(user);
    const { ctx } = createContext();
    await expect(appRouter.createCaller(ctx).auth.register({ username: "anne.belajar", password: "aman-sekali-123" })).rejects.toMatchObject({ code: "CONFLICT" });
    expect(mocked.createPasswordUser).not.toHaveBeenCalled();
  });

  it("signs in only after valid password verification and keeps the hash private", async () => {
    const passwordHash = await hashPassword("aman-sekali-123");
    mocked.getUserByUsername.mockResolvedValue({ ...user, passwordHash });
    const { ctx, cookies } = createContext();
    const result = await appRouter.createCaller(ctx).auth.login({ username: "ANNE.BELAJAR", password: "aman-sekali-123" });
    expect(cookies[0]?.value).toBe("signed-local-session");
    expect(result.sessionToken).toBe("signed-local-session");
    expect(result.user).not.toHaveProperty("passwordHash");

    await expect(appRouter.createCaller(ctx).auth.login({ username: "anne.belajar", password: "password-yang-salah" })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("keeps password hashes out of the authenticated account response", async () => {
    const { ctx } = createContext();
    ctx.user = { ...user, passwordHash: await hashPassword("aman-sekali-123") };
    const result = await appRouter.createCaller(ctx).auth.me();
    expect(result).toMatchObject({ username: "anne.belajar", loginMethod: "password" });
    expect(result).not.toHaveProperty("passwordHash");
  });
});
