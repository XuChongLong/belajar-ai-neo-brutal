import { describe, expect, it } from "vitest";
import { rankPublicPetProfiles } from "./petSocial";

describe("public pet leaderboard ranking", () => {
  it("excludes non-public pet profiles from the public leaderboard", () => {
    const ranked = rankPublicPetProfiles([
      { userId: 1, isPublic: 1, xp: 500, updatedAt: new Date("2026-08-13T08:00:00Z") },
      { userId: 2, isPublic: 0, xp: 9000, updatedAt: new Date("2026-08-13T09:00:00Z") },
    ]);
    expect(ranked.map((entry) => entry.userId)).toEqual([1]);
  });

  it("ranks public profiles by XP and uses the newest update as a deterministic tie-breaker", () => {
    const ranked = rankPublicPetProfiles([
      { userId: 1, isPublic: 1, xp: 600, updatedAt: new Date("2026-08-13T08:00:00Z") },
      { userId: 2, isPublic: 1, xp: 1600, updatedAt: new Date("2026-08-13T07:00:00Z") },
      { userId: 3, isPublic: 1, xp: 1600, updatedAt: new Date("2026-08-13T10:00:00Z") },
    ]);
    expect(ranked.map((entry) => entry.userId)).toEqual([3, 2, 1]);
  });
});
