export const PET_IDS = ["cat", "dog", "unicorn", "robot"] as const;
export type PetId = (typeof PET_IDS)[number];
export type PetStage = "bayi" | "anak" | "remaja" | "prima" | "dewasa";

export type PetProgress = {
  activePet: PetId;
  xp: Record<PetId, number>;
  earnedMilestones: Record<PetId, PetStage[]>;
  popupEnabled: boolean;
};

export const petStages: { id: PetStage; label: string; minXp: number; level: number; description: string }[] = [
  { id: "bayi", label: "Bayi", minXp: 0, level: 1, description: "Mulai penasaran dan siap menemani belajar." },
  { id: "anak", label: "Anak-anak", minXp: 60, level: 2, description: "Sudah berani mencoba materi baru." },
  { id: "remaja", label: "Remaja", minXp: 160, level: 3, description: "Makin cekatan menyelesaikan tantangan." },
  { id: "prima", label: "Dewasa Prima", minXp: 360, level: 4, description: "Menjadi partner belajar yang andal." },
  { id: "dewasa", label: "Dewasa", minXp: 650, level: 5, description: "Mentor kecil yang sudah sangat berpengalaman." },
];

export const initialPetProgress: PetProgress = {
  activePet: "cat",
  xp: { cat: 0, dog: 0, unicorn: 0, robot: 0 },
  earnedMilestones: { cat: ["bayi"], dog: ["bayi"], unicorn: ["bayi"], robot: ["bayi"] },
  popupEnabled: false,
};

export const petProfiles: Record<PetId, { id: PetId; name: string; species: string; color: string; personality: string; symbol: string }> = {
  cat: { id: "cat", name: "Kiko", species: "Kucing Penjelajah", color: "pink", personality: "Teliti, penasaran, dan suka merapikan ide yang rumit.", symbol: "✦" },
  dog: { id: "dog", name: "Bimo", species: "Anjing Penyemangat", color: "yellow", personality: "Ramah, konsisten, dan selalu bersorak saat kamu mencoba lagi.", symbol: "↗" },
  unicorn: { id: "unicorn", name: "Luma", species: "Unicorn Imajinatif", color: "purple", personality: "Kreatif, hangat, dan jago mengubah rasa ingin tahu menjadi ide.", symbol: "✧" },
  robot: { id: "robot", name: "Byte", species: "Robot Pembelajar", color: "green", personality: "Logis, sigap, dan suka mencatat kemajuan kecilmu.", symbol: "▣" },
};

const partyReference = "/manus-storage/npc-pet-party-reference_ab31577b.png";

const assets: Record<Exclude<PetId, "robot">, Record<PetStage, string>> = {
  cat: {
    bayi: "/manus-storage/npc-cat-bayi_e687f02e.png", anak: "/manus-storage/npc-cat-anak_0b19a7ce.png", remaja: "/manus-storage/npc-cat-remaja_d3340e6f.png", prima: "/manus-storage/npc-cat-prima_dfe1ad9c.png", dewasa: "/manus-storage/npc-cat-dewasa_fea0c5fb.png",
  },
  dog: {
    bayi: "/manus-storage/npc-dog-bayi_1600082c.png", anak: "/manus-storage/npc-dog-anak_a4ec6ce1.png", remaja: "/manus-storage/npc-dog-remaja_550d8563.png", prima: "/manus-storage/npc-dog-prima_f2cf2f11.png", dewasa: "/manus-storage/npc-dog-dewasa_6c2fc19f.png",
  },
  unicorn: {
    bayi: "/manus-storage/npc-unicorn-bayi_4e454e72.png", anak: "/manus-storage/npc-unicorn-anak_3ee6aa49.png", remaja: "/manus-storage/npc-unicorn-remaja_d2ca9803.png", prima: "/manus-storage/npc-unicorn-prima_9ae7258b.png", dewasa: "/manus-storage/npc-unicorn-dewasa_9030978a.png",
  },
};

export function getPetStage(xp: number) {
  return [...petStages].reverse().find((stage) => xp >= stage.minXp) ?? petStages[0];
}

export function getNextPetStage(xp: number) {
  return petStages.find((stage) => stage.minXp > xp) ?? null;
}

export function getPetAsset(petId: PetId, stage: PetStage) {
  return petId === "robot" ? partyReference : assets[petId][stage];
}

export function getPetXpProgress(xp: number) {
  const stage = getPetStage(xp);
  const nextStage = getNextPetStage(xp);
  if (!nextStage) return { stage, nextStage, percent: 100, remaining: 0 };
  const span = nextStage.minXp - stage.minXp;
  return { stage, nextStage, percent: Math.min(100, Math.round(((xp - stage.minXp) / span) * 100)), remaining: Math.max(0, nextStage.minXp - xp) };
}

export function addPetXp(progress: PetProgress, amount: number): PetProgress {
  const safeAmount = Math.max(0, amount);
  const activePet = progress.activePet;
  const nextXp = progress.xp[activePet] + safeAmount;
  const earnedMilestones = petStages.filter((stage) => nextXp >= stage.minXp).map((stage) => stage.id);
  return { ...progress, xp: { ...progress.xp, [activePet]: nextXp }, earnedMilestones: { ...progress.earnedMilestones, [activePet]: Array.from(new Set([...progress.earnedMilestones[activePet], ...earnedMilestones])) } };
}

export const petRewards = [
  { action: "Materi ditandai selesai", xp: 35 },
  { action: "Jawaban quiz benar", xp: 8 },
  { action: "Flashcard dikuasai", xp: 6 },
];
