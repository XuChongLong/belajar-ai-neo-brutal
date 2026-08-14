export const PET_IDS = ["cat", "dog", "unicorn", "robot"] as const;
export type PetId = (typeof PET_IDS)[number];
export type PetStage = "bayi" | "anak" | "remaja" | "prima" | "dewasa";
export type AccessoryId = "bow" | "glasses" | "crown";
export type DailyQuestId = "lesson" | "quiz" | "flashcard";
type QuestProgressKey = "lessons" | "quizCorrect" | "flashcards";
export type PetPopupPosition = { x: number; y: number };

export type DailyNpcState = {
  date: string;
  feedings: number;
  plays: number;
  miniGameRounds: number;
  miniGameBestScore: number;
  miniGameCoinsClaimed: number;
  questProgress: Record<QuestProgressKey, number>;
  claimedQuestIds: DailyQuestId[];
};

export type PetProgress = {
  activePet: PetId;
  xp: Record<PetId, number>;
  earnedMilestones: Record<PetId, PetStage[]>;
  popupEnabled: boolean;
  popupPosition: PetPopupPosition;
  foodInventory: number;
  snackCoins: number;
  ownedAccessories: AccessoryId[];
  equippedAccessory: AccessoryId | null;
  audioEnabled: boolean;
  daily: DailyNpcState;
};

export type PetActionResult = {
  ok: boolean;
  progress: PetProgress;
  message: string;
  xpAwarded: number;
  coinsAwarded: number;
  foodAwarded: number;
  evolved: boolean;
  previousStage: PetStage;
  stage: PetStage;
};

export const DAILY_FEED_LIMIT = 3;
export const DAILY_PLAY_LIMIT = 1;
export const FEED_XP = 5;
export const PLAY_XP = 3;
export const FOOD_COST = 1;
export const DAILY_MINIGAME_LIMIT = 1;
export const MINIGAME_TARGET_SCORE = 8;
export const MINIGAME_FAST_TIME_MS = 11_000;

export const accessoryCatalog: Record<AccessoryId, { id: AccessoryId; name: string; description: string; cost: number; symbol: string; color: string }> = {
  bow: { id: "bow", name: "Pita Komputasi", description: "Aksen manis untuk partner yang penuh ide.", cost: 4, symbol: "◓", color: "pink" },
  glasses: { id: "glasses", name: "Kacamata Fokus", description: "Untuk sesi belajar yang super teliti.", cost: 5, symbol: "◉", color: "yellow" },
  crown: { id: "crown", name: "Mahkota Debug", description: "Tanda partner yang tak takut memperbaiki error.", cost: 8, symbol: "♛", color: "green" },
};

export const shopItems: { id: string; kind: "food" | "accessory"; name: string; description: string; cost: number; food?: number; accessoryId?: AccessoryId; symbol: string; color: string }[] = [
  { id: "biskuit", kind: "food", name: "Biskuit Bintang", description: "Satu porsi kecil untuk satu kali makan.", cost: 1, food: 1, symbol: "✦", color: "pink" },
  { id: "bento", kind: "food", name: "Bento Data", description: "Paket hemat untuk empat kali makan.", cost: 3, food: 4, symbol: "▤", color: "yellow" },
  { id: "nectar", kind: "food", name: "Nektar Neural", description: "Stok delapan porsi untuk hari belajar yang panjang.", cost: 5, food: 8, symbol: "✧", color: "purple" },
  ...Object.values(accessoryCatalog).map((accessory) => ({ id: accessory.id, kind: "accessory" as const, name: accessory.name, description: accessory.description, cost: accessory.cost, accessoryId: accessory.id, symbol: accessory.symbol, color: accessory.color })),
];

export const petStages: { id: PetStage; label: string; minXp: number; level: number; description: string }[] = [
  { id: "bayi", label: "Bayi", minXp: 0, level: 1, description: "Mulai penasaran dan siap menemani belajar." },
  { id: "anak", label: "Anak-anak", minXp: 600, level: 2, description: "Sudah berani mencoba materi baru." },
  { id: "remaja", label: "Remaja", minXp: 1600, level: 3, description: "Makin cekatan menyelesaikan tantangan." },
  { id: "prima", label: "Dewasa Prima", minXp: 3600, level: 4, description: "Menjadi partner belajar yang andal." },
  { id: "dewasa", label: "Dewasa", minXp: 6500, level: 5, description: "Mentor kecil yang sudah sangat berpengalaman." },
];

export const dailyQuests: { id: DailyQuestId; title: string; description: string; progressKey: QuestProgressKey; target: number; rewardCoins: number; href: string; cta: string }[] = [
  { id: "lesson", title: "Langkah baru", description: "Tuntaskan 1 materi baru hari ini.", progressKey: "lessons", target: 1, rewardCoins: 2, href: "/materi", cta: "Cari materi" },
  { id: "quiz", title: "Otak tajam", description: "Kumpulkan 2 jawaban quiz yang benar.", progressKey: "quizCorrect", target: 2, rewardCoins: 1, href: "/review", cta: "Mulai review" },
  { id: "flashcard", title: "Ingatan kuat", description: "Kuasai 2 flashcard baru.", progressKey: "flashcards", target: 2, rewardCoins: 1, href: "/flashcards", cta: "Buka flashcard" },
];

export function getDayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function createDailyNpcState(date = getDayKey()): DailyNpcState {
  return { date, feedings: 0, plays: 0, miniGameRounds: 0, miniGameBestScore: 0, miniGameCoinsClaimed: 0, questProgress: { lessons: 0, quizCorrect: 0, flashcards: 0 }, claimedQuestIds: [] };
}

export const initialPetProgress: PetProgress = {
  activePet: "cat",
  xp: { cat: 0, dog: 0, unicorn: 0, robot: 0 },
  earnedMilestones: { cat: ["bayi"], dog: ["bayi"], unicorn: ["bayi"], robot: ["bayi"] },
  popupEnabled: false,
  popupPosition: { x: 0.83, y: 0.76 },
  foodInventory: 0,
  snackCoins: 0,
  ownedAccessories: [],
  equippedAccessory: null,
  audioEnabled: true,
  daily: createDailyNpcState(),
};

export function normalizeNpcPopupPosition(position: PetPopupPosition): PetPopupPosition {
  const clamp = (value: number) => Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0.5));
  return { x: clamp(position.x), y: clamp(position.y) };
}

export const petProfiles: Record<PetId, { id: PetId; name: string; species: string; color: string; personality: string; symbol: string }> = {
  cat: { id: "cat", name: "Kiko", species: "Kucing Penjelajah", color: "pink", personality: "Teliti, penasaran, dan suka merapikan ide yang rumit.", symbol: "✦" },
  dog: { id: "dog", name: "Bimo", species: "Anjing Penyemangat", color: "yellow", personality: "Ramah, konsisten, dan selalu bersorak saat kamu mencoba lagi.", symbol: "↗" },
  unicorn: { id: "unicorn", name: "Luma", species: "Unicorn Imajinatif", color: "purple", personality: "Kreatif, hangat, dan jago mengubah rasa ingin tahu menjadi ide.", symbol: "✧" },
  robot: { id: "robot", name: "Byte", species: "Robot Pembelajar", color: "green", personality: "Logis, sigap, dan suka mencatat kemajuan kecilmu.", symbol: "▣" },
};

const partyReference = "/manus-storage/npc-pet-party-reference_ab31577b.png";
const assets: Record<Exclude<PetId, "robot">, Record<PetStage, string>> = {
  cat: { bayi: "/manus-storage/npc-cat-bayi_e687f02e.png", anak: "/manus-storage/npc-cat-anak_0b19a7ce.png", remaja: "/manus-storage/npc-cat-remaja_d3340e6f.png", prima: "/manus-storage/npc-cat-prima_dfe1ad9c.png", dewasa: "/manus-storage/npc-cat-dewasa_fea0c5fb.png" },
  dog: { bayi: "/manus-storage/npc-dog-bayi_1600082c.png", anak: "/manus-storage/npc-dog-anak_a4ec6ce1.png", remaja: "/manus-storage/npc-dog-remaja_550d8563.png", prima: "/manus-storage/npc-dog-prima_f2cf2f11.png", dewasa: "/manus-storage/npc-dog-dewasa_fea0c5fb.png" },
  unicorn: { bayi: "/manus-storage/npc-unicorn-bayi_4e454e72.png", anak: "/manus-storage/npc-unicorn-anak_3ee6aa49.png", remaja: "/manus-storage/npc-unicorn-remaja_d2ca9803.png", prima: "/manus-storage/npc-unicorn-prima_9ae7258b.png", dewasa: "/manus-storage/npc-unicorn-dewasa_9030978a.png" },
};

export function getPetStage(xp: number) { return [...petStages].reverse().find((stage) => xp >= stage.minXp) ?? petStages[0]; }
export function getNextPetStage(xp: number) { return petStages.find((stage) => stage.minXp > xp) ?? null; }
export function getPetAsset(petId: PetId, stage: PetStage) { return petId === "robot" ? partyReference : assets[petId][stage]; }
export function getPetXpProgress(xp: number) { const stage = getPetStage(xp); const nextStage = getNextPetStage(xp); if (!nextStage) return { stage, nextStage, percent: 100, remaining: 0 }; const span = nextStage.minXp - stage.minXp; return { stage, nextStage, percent: Math.min(100, Math.round(((xp - stage.minXp) / span) * 100)), remaining: Math.max(0, nextStage.minXp - xp) }; }

export function ensureNpcDaily(progress: PetProgress, today = getDayKey()): PetProgress {
  return progress.daily.date === today ? progress : { ...progress, daily: createDailyNpcState(today) };
}

function applyPetXp(progress: PetProgress, amount: number) {
  const safeAmount = Math.max(0, amount);
  const activePet = progress.activePet;
  const previousStage = getPetStage(progress.xp[activePet]);
  const nextXp = progress.xp[activePet] + safeAmount;
  const stage = getPetStage(nextXp);
  const unlocked = petStages.filter((entry) => nextXp >= entry.minXp).map((entry) => entry.id);
  const next = { ...progress, xp: { ...progress.xp, [activePet]: nextXp }, earnedMilestones: { ...progress.earnedMilestones, [activePet]: Array.from(new Set([...progress.earnedMilestones[activePet], ...unlocked])) } };
  return { progress: next, previousStage, stage };
}

export function addPetXp(progress: PetProgress, amount: number): PetProgress { return applyPetXp(progress, amount).progress; }

function actionResult(progress: PetProgress, message: string, xpAwarded = 0, coinsAwarded = 0, foodAwarded = 0, previousStage = getPetStage(progress.xp[progress.activePet]), stage = previousStage): PetActionResult {
  return { ok: true, progress, message, xpAwarded, coinsAwarded, foodAwarded, evolved: previousStage.id !== stage.id, previousStage: previousStage.id, stage: stage.id };
}

function actionFailure(progress: PetProgress, message: string): PetActionResult { const stage = getPetStage(progress.xp[progress.activePet]); return { ok: false, progress, message, xpAwarded: 0, coinsAwarded: 0, foodAwarded: 0, evolved: false, previousStage: stage.id, stage: stage.id }; }

export function rewardNpcLearningActivity(progress: PetProgress, activity: QuestProgressKey, units: number, xp: number, today = getDayKey()) {
  const ready = ensureNpcDaily(progress, today);
  const nextDaily = { ...ready.daily, questProgress: { ...ready.daily.questProgress, [activity]: ready.daily.questProgress[activity] + Math.max(0, units) } };
  return applyPetXp({ ...ready, daily: nextDaily }, xp).progress;
}

export function feedNpcPet(progress: PetProgress, today = getDayKey()): PetActionResult {
  const ready = ensureNpcDaily(progress, today);
  if (ready.foodInventory < 1) return actionFailure(ready, "Kantong makananmu kosong. Selesaikan quest lalu tukarkan koin snack.");
  if (ready.daily.feedings >= DAILY_FEED_LIMIT) return actionFailure(ready, "Jatah makan hari ini sudah habis. Besok kamu bisa memberi makan lagi.");
  const before = getPetStage(ready.xp[ready.activePet]);
  const fed = { ...ready, foodInventory: ready.foodInventory - 1, daily: { ...ready.daily, feedings: ready.daily.feedings + 1 } };
  const outcome = applyPetXp(fed, FEED_XP);
  return actionResult(outcome.progress, `Nyam! ${petProfiles[ready.activePet].name} mendapat +${FEED_XP} XP.`, FEED_XP, 0, 0, before, outcome.stage);
}

export function playWithNpcPet(progress: PetProgress, today = getDayKey()): PetActionResult {
  const ready = ensureNpcDaily(progress, today);
  if (ready.daily.plays >= DAILY_PLAY_LIMIT) return actionFailure(ready, "Waktu bermain hari ini sudah selesai. Besok main lagi, ya.");
  const before = getPetStage(ready.xp[ready.activePet]);
  const played = { ...ready, daily: { ...ready.daily, plays: ready.daily.plays + 1 } };
  const outcome = applyPetXp(played, PLAY_XP);
  return actionResult(outcome.progress, `${petProfiles[ready.activePet].name} senang bermain dan mendapat +${PLAY_XP} XP.`, PLAY_XP, 0, 0, before, outcome.stage);
}

export function claimNpcMiniGameReward(progress: PetProgress, score: number, durationMs: number, today = getDayKey()): PetActionResult {
  const ready = ensureNpcDaily(progress, today);
  if (ready.daily.miniGameRounds >= DAILY_MINIGAME_LIMIT) return actionFailure(ready, "Bonus Snack Sprint hari ini sudah diambil. Besok main lagi, ya.");
  if (score < MINIGAME_TARGET_SCORE) return actionFailure(ready, `Tangkap ${MINIGAME_TARGET_SCORE} biskuit untuk menyelesaikan Snack Sprint.`);
  const coins = durationMs <= MINIGAME_FAST_TIME_MS ? 2 : 1;
  const next = { ...ready, snackCoins: ready.snackCoins + coins, daily: { ...ready.daily, miniGameRounds: ready.daily.miniGameRounds + 1, miniGameBestScore: Math.max(ready.daily.miniGameBestScore, score), miniGameCoinsClaimed: ready.daily.miniGameCoinsClaimed + coins } };
  return actionResult(next, coins === 2 ? "Sprint kilat! Kamu mendapat 2 koin snack." : "Sprint selesai! Kamu mendapat 1 koin snack.", 0, coins);
}

export function buyNpcFood(progress: PetProgress, today = getDayKey()): PetActionResult {
  const ready = ensureNpcDaily(progress, today);
  if (ready.snackCoins < FOOD_COST) return actionFailure(ready, "Butuh 1 koin snack untuk membeli satu makanan.");
  const next = { ...ready, snackCoins: ready.snackCoins - FOOD_COST, foodInventory: ready.foodInventory + 1 };
  return actionResult(next, "Satu makanan baru masuk ke tas pet.", 0, 0, 1);
}

export function buyNpcShopItem(progress: PetProgress, itemId: string, today = getDayKey()): PetActionResult {
  const ready = ensureNpcDaily(progress, today);
  const item = shopItems.find((entry) => entry.id === itemId);
  if (!item) return actionFailure(ready, "Barang shop tidak ditemukan.");
  if (ready.snackCoins < item.cost) return actionFailure(ready, `Butuh ${item.cost} koin snack untuk membeli ${item.name}.`);
  if (item.kind === "accessory" && item.accessoryId && ready.ownedAccessories.includes(item.accessoryId)) return actionFailure(ready, "Aksesori ini sudah ada di koleksimu.");
  const next = { ...ready, snackCoins: ready.snackCoins - item.cost, foodInventory: ready.foodInventory + (item.food ?? 0), ownedAccessories: item.accessoryId ? [...ready.ownedAccessories, item.accessoryId] : ready.ownedAccessories };
  return actionResult(next, item.kind === "food" ? `${item.name} masuk ke tas: +${item.food} makanan.` : `${item.name} masuk koleksi aksesori.`, 0, 0, item.food ?? 0);
}

export function equipNpcAccessory(progress: PetProgress, accessoryId: AccessoryId | null): PetActionResult {
  if (accessoryId && !progress.ownedAccessories.includes(accessoryId)) return actionFailure(progress, "Aksesori ini belum kamu miliki.");
  const name = accessoryId ? accessoryCatalog[accessoryId].name : "tanpa aksesori";
  return actionResult({ ...progress, equippedAccessory: accessoryId }, `Partner-mu sekarang memakai ${name}.`);
}

export function claimNpcDailyQuest(progress: PetProgress, questId: DailyQuestId, today = getDayKey()): PetActionResult {
  const ready = ensureNpcDaily(progress, today);
  const quest = dailyQuests.find((entry) => entry.id === questId);
  if (!quest) return actionFailure(ready, "Quest tidak ditemukan.");
  if (ready.daily.claimedQuestIds.includes(questId)) return actionFailure(ready, "Hadiah quest ini sudah diambil hari ini.");
  if (ready.daily.questProgress[quest.progressKey] < quest.target) return actionFailure(ready, "Progress quest belum cukup untuk mengambil hadiah.");
  const next = { ...ready, snackCoins: ready.snackCoins + quest.rewardCoins, daily: { ...ready.daily, claimedQuestIds: [...ready.daily.claimedQuestIds, questId] } };
  return actionResult(next, `Quest selesai! Kamu menerima ${quest.rewardCoins} koin snack.`, 0, quest.rewardCoins);
}

export const petRewards = [
  { action: "Materi ditandai selesai", xp: 35 },
  { action: "Jawaban quiz benar", xp: 8 },
  { action: "Flashcard dikuasai", xp: 6 },
  { action: "Beri makan (maks. 3×/hari)", xp: FEED_XP },
  { action: "Ajak bermain (1×/hari)", xp: PLAY_XP },
];
