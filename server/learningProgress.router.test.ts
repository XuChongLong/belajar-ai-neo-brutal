import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const mocks = vi.hoisted(() => ({
  getLearningProgressByUser: vi.fn(),
  saveLearningProgressByUser: vi.fn(),
}));

vi.mock("./db", () => mocks);
vi.mock("./storage", () => ({ storagePut: vi.fn() }));

import { appRouter } from "./routers";

function createContext(id = 12): TrpcContext {
  return { user: { id, openId: `learning-user-${id}`, name: "Rani", email: null, loginMethod: "password", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] };
}

const snapshot = {
  completed: [1, 2], bookmarks: [2], scores: { 2: 3 }, quizAttempts: {}, wrongQuizQuestions: {}, chapterReadLessons: { 1: [1, 2] }, flashcardKnown: ["glossary-foundation-model"], flashcardReviewQueue: [], selectedGoal: "AI Explorer", npc: { activePet: "cat", xp: { cat: 80, dog: 0, unicorn: 0, robot: 0 }, earnedMilestones: { cat: ["bayi"], dog: ["bayi"], unicorn: ["bayi"], robot: ["bayi"] }, popupEnabled: false, popupPosition: { x: 0.83, y: 0.76 }, foodInventory: 1, snackCoins: 2, ownedAccessories: [], equippedAccessory: null, audioEnabled: true, daily: { date: "2026-08-17", feedings: 0, plays: 0, miniGameRounds: 0, miniGameBestScore: 0, miniGameCoinsClaimed: 0, questProgress: { lessons: 1, quizCorrect: 2, flashcards: 0 }, claimedQuestIds: ["lesson"] } }, current: 3, streak: 2, lastVisit: "2026-08-17",
};

describe("learning router", () => {
  beforeEach(() => { vi.clearAllMocks(); mocks.getLearningProgressByUser.mockResolvedValue(undefined); mocks.saveLearningProgressByUser.mockImplementation(async (userId, state) => ({ userId, snapshot: state })); });

  it("reads the progress snapshot belonging to the authenticated learner", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.learning.mine({ accountId: 12 })).resolves.toBeNull();
    expect(mocks.getLearningProgressByUser).toHaveBeenCalledWith(12);
  });

  it("does not allow one account scope to read another learner's snapshot", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.learning.mine({ accountId: 99 })).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(mocks.getLearningProgressByUser).not.toHaveBeenCalled();
  });

  it("keeps two account scopes isolated when their snapshots are read in the same session", async () => {
    const snapshotForA = { userId: 12, snapshot: { ...snapshot, completed: [1] } };
    const snapshotForB = { userId: 27, snapshot: { ...snapshot, completed: [8, 9] } };
    mocks.getLearningProgressByUser.mockImplementation(async (userId) => userId === 12 ? snapshotForA : userId === 27 ? snapshotForB : undefined);

    const accountA = appRouter.createCaller(createContext(12));
    const accountB = appRouter.createCaller(createContext(27));
    const [resultA, resultB] = await Promise.all([accountA.learning.mine({ accountId: 12 }), accountB.learning.mine({ accountId: 27 })]);

    expect(resultA?.snapshot.completed).toEqual([1]);
    expect(resultB?.snapshot.completed).toEqual([8, 9]);
    expect(resultA?.snapshot.completed).not.toEqual(resultB?.snapshot.completed);
  });

  it("persists a validated snapshot only under the authenticated learner id", async () => {
    const caller = appRouter.createCaller(createContext());
    await caller.learning.save(snapshot);
    expect(mocks.saveLearningProgressByUser).toHaveBeenCalledWith(12, snapshot);
  });

  it("rejects malformed progress data before it reaches persistence", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.learning.save({ ...snapshot, streak: -1 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(mocks.saveLearningProgressByUser).not.toHaveBeenCalled();
  });
});
