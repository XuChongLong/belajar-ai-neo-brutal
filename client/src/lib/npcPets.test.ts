import { describe, expect, it } from "vitest";
import { DAILY_FEED_LIMIT, MINIGAME_FAST_TIME_MS, MINIGAME_TARGET_SCORE, addPetXp, buyNpcFood, buyNpcShopItem, claimNpcDailyQuest, claimNpcMiniGameReward, createDailyNpcState, ensureNpcDaily, equipNpcAccessory, feedNpcPet, getPetStage, getPetXpProgress, initialPetProgress, playWithNpcPet, rewardNpcLearningActivity } from "./npcPets";

const today = "2026-08-14";
const freshProgress = () => ({ ...initialPetProgress, daily: createDailyNpcState(today), xp: { cat: 0, dog: 0, unicorn: 0, robot: 0 }, foodInventory: 0, snackCoins: 0, earnedMilestones: { cat: ["bayi"] as const, dog: ["bayi"] as const, unicorn: ["bayi"] as const, robot: ["bayi"] as const } });

describe("NPC Pet evolution and care", () => {
  it("uses a substantially tougher five-stage evolution curve", () => {
    expect(getPetStage(599).label).toBe("Bayi");
    expect(getPetStage(600).label).toBe("Anak-anak");
    expect(getPetStage(1600).label).toBe("Remaja");
    expect(getPetStage(3600).label).toBe("Dewasa Prima");
    expect(getPetStage(6500).label).toBe("Dewasa");
  });

  it("persists milestones when XP reaches an evolution threshold", () => {
    const evolved = addPetXp({ ...freshProgress(), activePet: "unicorn" }, 1600);
    expect(evolved.earnedMilestones.unicorn).toEqual(["bayi", "anak", "remaja"]);
    expect(getPetXpProgress(35)).toMatchObject({ remaining: 565, nextStage: expect.objectContaining({ label: "Anak-anak" }) });
  });

  it("allows exactly three feedings per day and grants five XP per meal", () => {
    let progress = { ...freshProgress(), foodInventory: 3 };
    for (let index = 0; index < DAILY_FEED_LIMIT; index += 1) { const result = feedNpcPet(progress, today); expect(result.ok).toBe(true); progress = result.progress; }
    expect(progress.xp.cat).toBe(15);
    expect(progress.daily.feedings).toBe(3);
    expect(feedNpcPet(progress, today).ok).toBe(false);
  });

  it("requires learning quest completion before coins can be exchanged for food", () => {
    const rewarded = rewardNpcLearningActivity(freshProgress(), "lessons", 1, 35, today);
    const claimed = claimNpcDailyQuest(rewarded, "lesson", today);
    expect(claimed.ok).toBe(true);
    expect(claimed.progress.snackCoins).toBe(2);
    const bought = buyNpcFood(claimed.progress, today);
    expect(bought.ok).toBe(true);
    expect(bought.progress.foodInventory).toBe(1);
    expect(claimNpcDailyQuest(claimed.progress, "lesson", today).ok).toBe(false);
  });

  it("limits playing to once per day", () => {
    const first = playWithNpcPet(freshProgress(), today);
    expect(first.ok).toBe(true);
    expect(playWithNpcPet(first.progress, today).ok).toBe(false);
  });

  it("resets daily limits on the next date and emits an evolution result at a threshold", () => {
    const previousDay = { ...freshProgress(), foodInventory: 1, daily: { ...createDailyNpcState("2026-08-13"), feedings: 3 } };
    expect(ensureNpcDaily(previousDay, today).daily.feedings).toBe(0);
    const threshold = { ...freshProgress(), foodInventory: 1, xp: { cat: 595, dog: 0, unicorn: 0, robot: 0 } };
    const result = feedNpcPet(threshold, today);
    expect(result).toMatchObject({ ok: true, evolved: true, previousStage: "bayi", stage: "anak" });
  });

  it("validates shop coins, grants food bundles, and prevents duplicate cosmetics", () => {
    const stocked = buyNpcShopItem({ ...freshProgress(), snackCoins: 5 }, "bento", today);
    expect(stocked).toMatchObject({ ok: true, foodAwarded: 4 });
    expect(stocked.progress).toMatchObject({ snackCoins: 2, foodInventory: 4 });
    const accessory = buyNpcShopItem({ ...freshProgress(), snackCoins: 5 }, "bow", today);
    expect(accessory.ok).toBe(true);
    expect(accessory.progress.ownedAccessories).toContain("bow");
    expect(buyNpcShopItem(accessory.progress, "bow", today).ok).toBe(false);
  });

  it("only equips owned accessories and keeps sound enabled by default", () => {
    const fresh = freshProgress();
    expect(fresh.audioEnabled).toBe(true);
    expect(equipNpcAccessory(fresh, "glasses").ok).toBe(false);
    const owned = { ...fresh, ownedAccessories: ["glasses"] as const };
    expect(equipNpcAccessory(owned, "glasses")).toMatchObject({ ok: true, progress: { equippedAccessory: "glasses" } });
  });

  it("awards one daily Snack Sprint bonus with a fast-play boost and resets it tomorrow", () => {
    const first = claimNpcMiniGameReward(freshProgress(), MINIGAME_TARGET_SCORE, MINIGAME_FAST_TIME_MS, today);
    expect(first).toMatchObject({ ok: true, coinsAwarded: 2, progress: { snackCoins: 2, daily: { miniGameRounds: 1, miniGameBestScore: MINIGAME_TARGET_SCORE, miniGameCoinsClaimed: 2 } } });
    expect(claimNpcMiniGameReward(first.progress, MINIGAME_TARGET_SCORE, MINIGAME_FAST_TIME_MS, today).ok).toBe(false);
    expect(ensureNpcDaily(first.progress, "2026-08-15").daily.miniGameRounds).toBe(0);
  });

  it("rejects unfinished Snack Sprint scores and gives one coin for a slower valid round", () => {
    expect(claimNpcMiniGameReward(freshProgress(), MINIGAME_TARGET_SCORE - 1, 1, today).ok).toBe(false);
    expect(claimNpcMiniGameReward(freshProgress(), MINIGAME_TARGET_SCORE, MINIGAME_FAST_TIME_MS + 1, today)).toMatchObject({ ok: true, coinsAwarded: 1 });
  });
});
