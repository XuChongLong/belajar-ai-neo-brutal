import { describe, expect, it } from "vitest";
import { migrateLegacyCourseProgress } from "./courseProgressMigration";

describe("migrateLegacyCourseProgress", () => {
  it("moves obsolete legacy ids to their intensive-course successors without changing active ids", () => {
    const migrated = migrateLegacyCourseProgress({
      completed: [40, 41, 5012],
      bookmarks: [48, 200],
      scores: { 40: 1, 5012: 2 },
      quizAttempts: { 64: { score: 1, total: 2, percentage: 50, lastAttemptAt: "2026-08-25" } },
      wrongQuizQuestions: { 80: [{ id: "wrong", question: "q", answer: "a", explanation: "e", materialId: 80, materialTitle: "old" }] },
      activityHistory: [{ id: "a", type: "lesson-completed", materialId: 87, occurredAt: 1 }],
      current: 55,
    }, new Set([200, 5012]));

    expect(migrated.completed).toEqual([5012, 5013]);
    expect(migrated.bookmarks).toEqual([6012, 200]);
    expect(migrated.scores?.[5012]).toBe(2);
    expect(migrated.quizAttempts?.["8012"]?.percentage).toBe(50);
    expect(migrated.wrongQuizQuestions?.["9012"]?.[0]?.materialId).toBe(80);
    expect(migrated.activityHistory?.[0]?.materialId).toBe(9019);
    expect(migrated.current).toBe(6019);
  });
});
