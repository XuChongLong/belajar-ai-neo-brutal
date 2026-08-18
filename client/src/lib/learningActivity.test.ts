import { describe, expect, it } from "vitest";
import { appendLearningActivity, clampWeeklyGoal, getWeeklyActivitySummary } from "./learningActivity";

describe("weekly learning activity", () => {
  it("counts distinct active days rather than repeat actions on a single day", () => {
    const now = new Date(2026, 7, 19, 10, 0, 0);
    const history = [
      { id: "one", type: "lesson-completed" as const, materialId: 1, occurredAt: new Date(2026, 7, 17, 8, 0, 0).getTime() },
      { id: "two", type: "quiz-completed" as const, materialId: 1, occurredAt: new Date(2026, 7, 17, 9, 0, 0).getTime() },
      { id: "three", type: "flashcard-mastered" as const, materialId: null, occurredAt: new Date(2026, 7, 18, 9, 0, 0).getTime() },
    ];
    const summary = getWeeklyActivitySummary(history, 5, now);

    expect(summary.activeDays).toBe(2);
    expect(summary.percent).toBe(40);
  });

  it("uses safe weekly targets and retains the newest activity first", () => {
    const history = appendLearningActivity([], "lesson-read", 4, 100);
    expect(history[0]).toMatchObject({ type: "lesson-read", materialId: 4, occurredAt: 100 });
    expect(clampWeeklyGoal(6)).toBe(5);
    expect(clampWeeklyGoal(7)).toBe(7);
  });
});
