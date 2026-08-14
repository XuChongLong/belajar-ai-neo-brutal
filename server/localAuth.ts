import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;
const USERNAME_PATTERN = /^[a-z0-9][a-z0-9._-]{2,31}$/;
const MAX_FAILED_ATTEMPTS = 5;
const ATTEMPT_WINDOW_MS = 60_000;
const failedAttempts = new Map<string, { count: number; resetAt: number }>();

export function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}

export function isValidUsername(value: string) {
  return USERNAME_PATTERN.test(normalizeUsername(value));
}

export function isValidPassword(value: string) {
  return value.length >= 10 && value.length <= 128;
}

export function localOpenId(username: string) {
  return `local:${normalizeUsername(username)}`;
}

export function isLoginRateLimited(username: string, now = Date.now()) {
  const attempt = failedAttempts.get(normalizeUsername(username));
  if (!attempt) return false;
  if (attempt.resetAt <= now) {
    failedAttempts.delete(normalizeUsername(username));
    return false;
  }
  return attempt.count >= MAX_FAILED_ATTEMPTS;
}

export function recordFailedLogin(username: string, now = Date.now()) {
  const key = normalizeUsername(username);
  const current = failedAttempts.get(key);
  const attempt = !current || current.resetAt <= now
    ? { count: 1, resetAt: now + ATTEMPT_WINDOW_MS }
    : { ...current, count: current.count + 1 };
  failedAttempts.set(key, attempt);
  return attempt.count;
}

export function clearFailedLogins(username: string) {
  failedAttempts.delete(normalizeUsername(username));
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
  return `scrypt$${salt}$${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string | null | undefined) {
  if (!storedHash) return false;
  const [algorithm, salt, encodedKey] = storedHash.split("$");
  if (algorithm !== "scrypt" || !salt || !encodedKey) return false;
  const expected = Buffer.from(encodedKey, "hex");
  if (expected.length !== KEY_LENGTH) return false;
  const derived = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
  return timingSafeEqual(expected, derived);
}
