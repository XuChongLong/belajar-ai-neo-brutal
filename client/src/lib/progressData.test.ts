import { describe, expect, it } from "vitest";
import { createEmptyLearningProgress } from "@shared/learningProgress";
import { createProgressExport, createResetProgressSnapshot, getProgressExportFilename } from "./progressData";

describe("progress data management", () => {
  it("exports the complete learning snapshot including activities and weekly target", () => {
    const progress = createEmptyLearningProgress();
    progress.completed = [3];
    progress.weeklyGoal = 7;
    progress.activityHistory = [{ id: "activity-one", type: "lesson-completed", materialId: 3, occurredAt: 1_800_000_000_000 }];

    const exported = createProgressExport(progress, "2026-08-17T09:20:00.000Z");

    expect(exported).toMatchObject({ version: 1, exportedAt: "2026-08-17T09:20:00.000Z", progress: { completed: [3], weeklyGoal: 7, activityHistory: [{ id: "activity-one" }] } });
    expect(getProgressExportFilename(exported.exportedAt)).toBe("belajar-ai-progress-2026-08-17.json");
  });

  it("returns a clean but structurally valid snapshot for confirmed reset", () => {
    const reset = createResetProgressSnapshot();
    expect(reset).toMatchObject({ completed: [], bookmarks: [], scores: {}, activityHistory: [], weeklyGoal: 5, current: 1, streak: 0 });
    expect(reset.npc.xp).toEqual({ cat: 0, dog: 0, unicorn: 0, robot: 0 });
  });
});
