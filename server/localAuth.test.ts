import { describe, expect, it } from "vitest";
import { clearFailedLogins, hashPassword, isLoginRateLimited, isValidPassword, isValidUsername, localOpenId, normalizeUsername, recordFailedLogin, verifyPassword } from "./localAuth";

describe("local credential helpers", () => {
  it("normalizes and validates a practical username format", () => {
    expect(normalizeUsername("  Belajar.AI  ")).toBe("belajar.ai");
    expect(isValidUsername("Belajar.AI")).toBe(true);
    expect(isValidUsername("no")).toBe(false);
    expect(isValidUsername("unsafe space")).toBe(false);
    expect(localOpenId("Belajar.AI")).toBe("local:belajar.ai");
  });

  it("enforces a bounded password length", () => {
    expect(isValidPassword("terlalu9")).toBe(false);
    expect(isValidPassword("aman-sekali-123")).toBe(true);
    expect(isValidPassword("x".repeat(129))).toBe(false);
  });

  it("hashes passwords and verifies only the matching secret", async () => {
    const hash = await hashPassword("aman-sekali-123");
    expect(hash).toMatch(/^scrypt\$/);
    await expect(verifyPassword("aman-sekali-123", hash)).resolves.toBe(true);
    await expect(verifyPassword("salah-sekali-123", hash)).resolves.toBe(false);
    await expect(verifyPassword("aman-sekali-123", "invalid")).resolves.toBe(false);
  });

  it("throttles repeated failed attempts by normalized username and clears after success", () => {
    const username = "rate.limit";
    clearFailedLogins(username);
    for (let index = 0; index < 5; index += 1) recordFailedLogin("RATE.LIMIT", 1_000);
    expect(isLoginRateLimited(username, 1_001)).toBe(true);
    clearFailedLogins(username);
    expect(isLoginRateLimited(username, 1_001)).toBe(false);
  });
});
