import { describe, expect, it } from "vitest";
import { createEmptyLearningProgress } from "./learningProgress";

describe("learning progress snapshot", () => {
  it("starts an account with an empty learning record and safe NPC defaults", () => {
    const snapshot = createEmptyLearningProgress();

    expect(snapshot).toMatchObject({
      completed: [],
      bookmarks: [],
      scores: {},
      current: 1,
      streak: 0,
      lastVisit: "",
      npc: {
        activePet: "cat",
        xp: { cat: 0, dog: 0, unicorn: 0, robot: 0 },
        snackCoins: 0,
      },
    });
  });

  it("returns independent snapshots so accounts cannot share mutable state", () => {
    const first = createEmptyLearningProgress();
    const second = createEmptyLearningProgress();
    first.completed.push(99);
    first.npc.xp.cat = 100;

    expect(second.completed).toEqual([]);
    expect(second.npc.xp.cat).toBe(0);
  });
});
