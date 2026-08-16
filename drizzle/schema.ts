import { index, int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import type { LearningProgressSnapshot } from "../shared/learningProgress";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  username: varchar("username", { length: 64 }).unique(),
  passwordHash: varchar("passwordHash", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const storedFiles = mysqlTable("storedFiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  fileKey: varchar("fileKey", { length: 512 }).notNull().unique(),
  url: varchar("url", { length: 1024 }).notNull(),
  originalName: varchar("originalName", { length: 255 }).notNull(),
  mimeType: varchar("mimeType", { length: 160 }).notNull(),
  sizeBytes: int("sizeBytes").notNull(),
  purpose: mysqlEnum("purpose", ["study-note", "reference", "other"]).default("reference").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [index("storedFiles_user_created_idx").on(table.userId, table.createdAt)]);

export type StoredFile = typeof storedFiles.$inferSelect;
export type InsertStoredFile = typeof storedFiles.$inferInsert;

/**
 * Account-owned learning state. This intentionally stores only learning progress,
 * while temporary presentation preferences and game-only UI remain device-local.
 */
export const learningProgress = mysqlTable("learningProgress", {
  userId: int("userId").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  snapshot: json("snapshot").$type<LearningProgressSnapshot>().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [index("learningProgress_updated_idx").on(table.updatedAt)]);

export type LearningProgress = typeof learningProgress.$inferSelect;
export type InsertLearningProgress = typeof learningProgress.$inferInsert;

/**
 * An explicit, opt-in snapshot of a user's selected pet for the public leaderboard.
 * Learning and inventory details remain local to the learner; only these display-safe
 * fields are shared when `isPublic` is enabled.
 */
export const publicPetProfiles = mysqlTable("publicPetProfiles", {
  userId: int("userId").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  isPublic: int("isPublic").notNull().default(0),
  petId: varchar("petId", { length: 16 }).notNull(),
  xp: int("xp").notNull().default(0),
  stage: varchar("stage", { length: 16 }).notNull(),
  equippedAccessory: varchar("equippedAccessory", { length: 64 }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [index("publicPetProfiles_public_xp_idx").on(table.isPublic, table.xp)]);

export type PublicPetProfile = typeof publicPetProfiles.$inferSelect;
export type InsertPublicPetProfile = typeof publicPetProfiles.$inferInsert;
