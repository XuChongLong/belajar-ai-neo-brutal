import { and, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertPublicPetProfile, InsertStoredFile, InsertUser, publicPetProfiles, storedFiles, users } from "../drizzle/schema";
import { ENV } from './_core/env';
import { rankPublicPetProfiles } from "./petSocial";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createStoredFile(file: InsertStoredFile) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(storedFiles).values(file);
  const created = await db.select().from(storedFiles).where(eq(storedFiles.fileKey, file.fileKey)).limit(1);
  return created[0];
}

export async function listStoredFilesByUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db.select().from(storedFiles).where(eq(storedFiles.userId, userId)).orderBy(desc(storedFiles.createdAt));
}

export async function getStoredFileUsageByUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const summary = await db.select({
    usedBytes: sql<number>`coalesce(sum(${storedFiles.sizeBytes}), 0)`,
    fileCount: sql<number>`count(${storedFiles.id})`,
  }).from(storedFiles).where(eq(storedFiles.userId, userId));
  return { usedBytes: Number(summary[0]?.usedBytes ?? 0), fileCount: Number(summary[0]?.fileCount ?? 0) };
}

export async function removeStoredFileByUser(id: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const result = await db.delete(storedFiles).where(and(eq(storedFiles.id, id), eq(storedFiles.userId, userId)));
  return Number(result[0]?.affectedRows ?? 0) > 0;
}

export async function getPublicPetProfileByUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const result = await db.select().from(publicPetProfiles).where(eq(publicPetProfiles.userId, userId)).limit(1);
  return result[0];
}

export async function savePublicPetProfile(profile: InsertPublicPetProfile) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(publicPetProfiles).values(profile).onDuplicateKeyUpdate({
    set: {
      isPublic: profile.isPublic,
      petId: profile.petId,
      xp: profile.xp,
      stage: profile.stage,
      equippedAccessory: profile.equippedAccessory,
    },
  });
  return getPublicPetProfileByUser(profile.userId);
}

export async function listPublicPetLeaderboard(limit = 20) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const rows = await db.select({
    userId: publicPetProfiles.userId,
    isPublic: publicPetProfiles.isPublic,
    displayName: users.name,
    petId: publicPetProfiles.petId,
    xp: publicPetProfiles.xp,
    stage: publicPetProfiles.stage,
    equippedAccessory: publicPetProfiles.equippedAccessory,
    updatedAt: publicPetProfiles.updatedAt,
  }).from(publicPetProfiles).innerJoin(users, eq(publicPetProfiles.userId, users.id)).where(eq(publicPetProfiles.isPublic, 1)).orderBy(desc(publicPetProfiles.xp), desc(publicPetProfiles.updatedAt)).limit(limit);
  return rankPublicPetProfiles(rows);
}
