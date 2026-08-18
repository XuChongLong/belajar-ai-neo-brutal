import { z } from "zod";

const materialIds = z.array(z.number().int().positive()).max(500);
const stringIds = z.array(z.string().min(1).max(120)).max(500);
const petId = z.enum(["cat", "dog", "unicorn", "robot"]);
const petStage = z.enum(["bayi", "anak", "remaja", "prima", "dewasa"]);
const accessory = z.enum(["bow", "glasses", "crown"]);

export const learningProgressSnapshotSchema = z.object({
  completed: materialIds,
  bookmarks: materialIds,
  scores: z.record(z.string().regex(/^\d+$/), z.number().int().min(0).max(100)),
  quizAttempts: z.record(z.string().min(1).max(120), z.object({
    score: z.number().int().min(0).max(100),
    total: z.number().int().min(1).max(100),
    percentage: z.number().int().min(0).max(100),
    lastAttemptAt: z.string().datetime(),
  })),
  wrongQuizQuestions: z.record(z.string().min(1).max(120), z.array(z.object({
    id: z.string().min(1).max(120),
    question: z.string().min(1).max(2_000),
    answer: z.string().min(1).max(2_000),
    explanation: z.string().min(1).max(4_000),
    materialId: z.number().int().positive(),
    materialTitle: z.string().min(1).max(500),
  })).max(50)),
  chapterReadLessons: z.record(z.string().regex(/^\d+$/), materialIds),
  flashcardKnown: stringIds,
  flashcardReviewQueue: stringIds,
  selectedGoal: z.string().min(1).max(120).nullable(),
  npc: z.object({
    activePet: petId,
    xp: z.object({ cat: z.number().int().min(0).max(1_000_000), dog: z.number().int().min(0).max(1_000_000), unicorn: z.number().int().min(0).max(1_000_000), robot: z.number().int().min(0).max(1_000_000) }),
    earnedMilestones: z.object({ cat: z.array(petStage).max(5), dog: z.array(petStage).max(5), unicorn: z.array(petStage).max(5), robot: z.array(petStage).max(5) }),
    popupEnabled: z.boolean(),
    popupPosition: z.object({ x: z.number().min(0).max(1), y: z.number().min(0).max(1) }),
    foodInventory: z.number().int().min(0).max(10_000),
    snackCoins: z.number().int().min(0).max(10_000),
    ownedAccessories: z.array(accessory).max(3),
    equippedAccessory: accessory.nullable(),
    audioEnabled: z.boolean(),
    daily: z.object({
      date: z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]),
      feedings: z.number().int().min(0).max(10),
      plays: z.number().int().min(0).max(10),
      miniGameRounds: z.number().int().min(0).max(10),
      miniGameBestScore: z.number().int().min(0).max(10_000),
      miniGameCoinsClaimed: z.number().int().min(0).max(10),
      questProgress: z.object({ lessons: z.number().int().min(0).max(100), quizCorrect: z.number().int().min(0).max(100), flashcards: z.number().int().min(0).max(100) }),
      claimedQuestIds: z.array(z.enum(["lesson", "quiz", "flashcard"])).max(3),
    }),
  }),
  current: z.number().int().positive(),
  streak: z.number().int().min(0).max(10_000),
  lastVisit: z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]),
  activityHistory: z.array(z.object({
    id: z.string().min(1).max(160),
    type: z.enum(["lesson-completed", "lesson-read", "quiz-completed", "flashcard-mastered"]),
    materialId: z.number().int().positive().nullable(),
    occurredAt: z.number().int().positive(),
  })).max(80).default([]),
  weeklyGoal: z.number().int().refine((value) => [3, 5, 7].includes(value), "Target mingguan harus 3, 5, atau 7 hari.").default(5),
});
