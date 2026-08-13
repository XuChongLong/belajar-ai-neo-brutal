import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const mocks = vi.hoisted(() => ({
  createStoredFile: vi.fn(), getStoredFileUsageByUser: vi.fn(), listStoredFilesByUser: vi.fn(), removeStoredFileByUser: vi.fn(),
  getPublicPetProfileByUser: vi.fn(), listPublicPetLeaderboard: vi.fn(), savePublicPetProfile: vi.fn(),
}));

vi.mock("./db", () => mocks);
vi.mock("./storage", () => ({ storagePut: vi.fn() }));

import { appRouter } from "./routers";

function createContext(): TrpcContext {
  return { user: { id: 9, openId: "pet-user-9", name: "Nadia", email: "private@example.com", loginMethod: "manus", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] };
}

describe("petSocial router", () => {
  beforeEach(() => { vi.clearAllMocks(); mocks.listPublicPetLeaderboard.mockResolvedValue([]); mocks.getPublicPetProfileByUser.mockResolvedValue(undefined); mocks.savePublicPetProfile.mockImplementation(async (input) => input); });

  it("returns only persisted public leaderboard entries and does not fabricate rows", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.petSocial.leaderboard()).resolves.toEqual([]);
    expect(mocks.listPublicPetLeaderboard).toHaveBeenCalledWith();
  });

  it("keeps hidden profiles out and preserves XP then updated-at ranking at the router contract", async () => {
    mocks.listPublicPetLeaderboard.mockResolvedValue([
      { userId: 1, isPublic: 1, displayName: "Ari", petId: "cat", xp: 600, stage: "anak", equippedAccessory: null, updatedAt: new Date("2026-08-13T08:00:00Z") },
      { userId: 2, isPublic: 0, displayName: "Private", petId: "robot", xp: 9000, stage: "dewasa", equippedAccessory: "crown", updatedAt: new Date("2026-08-13T12:00:00Z") },
      { userId: 3, isPublic: 1, displayName: "Bima", petId: "unicorn", xp: 1600, stage: "remaja", equippedAccessory: "bow", updatedAt: new Date("2026-08-13T09:00:00Z") },
      { userId: 4, isPublic: 1, displayName: "Citra", petId: "dog", xp: 1600, stage: "remaja", equippedAccessory: null, updatedAt: new Date("2026-08-13T10:00:00Z") },
    ]);
    const caller = appRouter.createCaller(createContext());
    const result = await caller.petSocial.leaderboard();
    expect(result.map((entry) => entry.userId)).toEqual([4, 3, 1]);
    expect(result.some((entry) => entry.displayName === "Private")).toBe(false);
  });

  it("saves a display-safe public profile owned by the authenticated user", async () => {
    const caller = appRouter.createCaller(createContext());
    await caller.petSocial.update({ isPublic: true, petId: "cat", xp: 600, stage: "anak", equippedAccessory: "bow" });
    expect(mocks.savePublicPetProfile).toHaveBeenCalledWith(expect.objectContaining({ userId: 9, isPublic: 1, petId: "cat", xp: 600, stage: "anak", equippedAccessory: "bow" }));
  });

  it("allows a user to turn off their public leaderboard profile", async () => {
    const caller = appRouter.createCaller(createContext());
    await caller.petSocial.update({ isPublic: false, petId: "robot", xp: 0, stage: "bayi", equippedAccessory: null });
    expect(mocks.savePublicPetProfile).toHaveBeenCalledWith(expect.objectContaining({ userId: 9, isPublic: 0, equippedAccessory: null }));
  });
});
