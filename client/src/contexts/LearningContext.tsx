// Style reminder: Paper Playground — state should feel lightweight, friendly, and immediate like a workbook checklist.

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { materials } from "@/lib/materials";
import { addChapterReadLesson, toggleCompletedLesson } from "@/lib/chapterReading";
import { buyNpcFood, buyNpcShopItem, claimNpcDailyQuest, claimNpcMiniGameReward, ensureNpcDaily, equipNpcAccessory, feedNpcPet, initialPetProgress, normalizeNpcPopupPosition, playWithNpcPet, rewardNpcLearningActivity, type AccessoryId, type DailyQuestId, type PetActionResult, type PetId, type PetPopupPosition, type PetProgress } from "@/lib/npcPets";

export type WrongQuizQuestion = {
  id: string;
  question: string;
  answer: string;
  explanation: string;
  materialId: number;
  materialTitle: string;
};

type LearningState = {
  completed: number[];
  bookmarks: number[];
  scores: Record<number, number>;
  quizAttempts: Record<string, { score: number; total: number; percentage: number; lastAttemptAt: string }>;
  wrongQuizQuestions: Record<string, WrongQuizQuestion[]>;
  chapterReadLessons: Record<number, number[]>;
  flashcardKnown: string[];
  flashcardReviewQueue: string[];
  selectedGoal: string | null;
  npc: PetProgress;
  current: number;
  streak: number;
  lastVisit: string;
};

type LearningContextValue = LearningState & {
  completedCount: number;
  bookmarkCount: number;
  progressPercent: number;
  markComplete: (id: number) => void;
  toggleComplete: (id: number) => void;
  markCurrent: (id: number) => void;
  toggleBookmark: (id: number) => void;
  saveScore: (id: number, score: number) => void;
  saveQuizAttempt: (id: number | string, score: number, total: number, wrongQuestions?: WrongQuizQuestion[]) => void;
  markChapterLessonRead: (chapter: number, lessonId: number) => void;
  markFlashcardKnown: (id: string) => void;
  markFlashcardReview: (id: string) => void;
  setSelectedGoal: (goal: string) => void;
  selectNpcPet: (petId: PetId) => void;
  setNpcPopupEnabled: (enabled: boolean) => void;
  setNpcPopupPosition: (position: PetPopupPosition) => void;
  feedNpcPet: () => PetActionResult;
  playWithNpcPet: () => PetActionResult;
  buyNpcFood: () => PetActionResult;
  buyNpcShopItem: (itemId: string) => PetActionResult;
  equipNpcAccessory: (accessoryId: AccessoryId | null) => PetActionResult;
  setNpcAudioEnabled: (enabled: boolean) => void;
  claimNpcDailyQuest: (questId: DailyQuestId) => PetActionResult;
  claimNpcMiniGameReward: (score: number, durationMs: number) => PetActionResult;
  resetProgress: () => void;
};

const STORAGE_KEY = "belajar-ai-progress-v1";
const initialState: LearningState = { completed: [], bookmarks: [], scores: {}, quizAttempts: {}, wrongQuizQuestions: {}, chapterReadLessons: {}, flashcardKnown: [], flashcardReviewQueue: [], selectedGoal: null, npc: initialPetProgress, current: 1, streak: 3, lastVisit: "" };
const LearningContext = createContext<LearningContextValue | null>(null);

function readState(): LearningState {
  if (typeof window === "undefined") return initialState;
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Partial<LearningState> | null;
    return {
      ...initialState,
      ...parsed,
      completed: parsed?.completed ?? [], bookmarks: parsed?.bookmarks ?? [], scores: parsed?.scores ?? {}, quizAttempts: parsed?.quizAttempts ?? {}, wrongQuizQuestions: parsed?.wrongQuizQuestions ?? {}, chapterReadLessons: parsed?.chapterReadLessons ?? {}, flashcardKnown: parsed?.flashcardKnown ?? [], flashcardReviewQueue: parsed?.flashcardReviewQueue ?? [], selectedGoal: parsed?.selectedGoal ?? null,
      npc: {
        ...initialPetProgress,
        ...parsed?.npc,
        xp: { ...initialPetProgress.xp, ...parsed?.npc?.xp },
        earnedMilestones: { ...initialPetProgress.earnedMilestones, ...parsed?.npc?.earnedMilestones },
        popupPosition: normalizeNpcPopupPosition(parsed?.npc?.popupPosition ?? initialPetProgress.popupPosition),
        ownedAccessories: parsed?.npc?.ownedAccessories ?? initialPetProgress.ownedAccessories,
        equippedAccessory: parsed?.npc?.equippedAccessory ?? initialPetProgress.equippedAccessory,
        audioEnabled: parsed?.npc?.audioEnabled ?? initialPetProgress.audioEnabled,
        daily: { ...initialPetProgress.daily, ...parsed?.npc?.daily, questProgress: { ...initialPetProgress.daily.questProgress, ...parsed?.npc?.daily?.questProgress }, claimedQuestIds: parsed?.npc?.daily?.claimedQuestIds ?? initialPetProgress.daily.claimedQuestIds },
      },
    };
  } catch {
    return initialState;
  }
}

export function LearningProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LearningState>(() => readState());

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setState((prev) => {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const nextStreak = prev.lastVisit === today ? prev.streak : prev.lastVisit === yesterday ? prev.streak + 1 : prev.lastVisit ? 1 : prev.streak;
      return { ...prev, lastVisit: today, streak: nextStreak, npc: ensureNpcDaily(prev.npc, today) };
    });
  }, []);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }, [state]);

  const value = useMemo<LearningContextValue>(() => ({
    ...state,
    completedCount: state.completed.length,
    bookmarkCount: state.bookmarks.length,
    progressPercent: Math.round((state.completed.length / materials.length) * 100),
    markComplete: (id) => setState((prev) => prev.completed.includes(id) ? { ...prev, current: id } : ({ ...prev, completed: [...prev.completed, id], current: id, npc: rewardNpcLearningActivity(prev.npc, "lessons", 1, 35) })),
    toggleComplete: (id) => setState((prev) => prev.completed.includes(id)
      ? { ...prev, completed: toggleCompletedLesson(prev.completed, id), current: id }
      : ({ ...prev, completed: toggleCompletedLesson(prev.completed, id), current: id, npc: rewardNpcLearningActivity(prev.npc, "lessons", 1, 35) })),
    markCurrent: (id) => setState((prev) => ({ ...prev, current: id })),
    toggleBookmark: (id) => setState((prev) => ({ ...prev, bookmarks: prev.bookmarks.includes(id) ? prev.bookmarks.filter((bookmark) => bookmark !== id) : [...prev.bookmarks, id] })),
    saveScore: (id, score) => setState((prev) => ({ ...prev, scores: { ...prev.scores, [id]: Math.max(prev.scores[id] ?? 0, score) } })),
    saveQuizAttempt: (id, score, total, wrongQuestions = []) => setState((prev) => {
      const key = String(id);
      const previousBest = typeof id === "number" ? (prev.scores[id] ?? 0) : (prev.quizAttempts[key]?.score ?? 0);
      const gainedCorrect = Math.max(0, score - previousBest);
      const gainedXp = gainedCorrect * 8;
      return {
        ...prev,
        scores: typeof id === "number" ? { ...prev.scores, [id]: Math.max(prev.scores[id] ?? 0, score) } : prev.scores,
        quizAttempts: { ...prev.quizAttempts, [key]: { score, total, percentage: Math.round((score / Math.max(total, 1)) * 100), lastAttemptAt: new Date().toISOString() } },
        wrongQuizQuestions: wrongQuestions.length ? { ...prev.wrongQuizQuestions, [key]: wrongQuestions } : Object.fromEntries(Object.entries(prev.wrongQuizQuestions).filter(([questionKey]) => questionKey !== key)),
        npc: gainedXp ? rewardNpcLearningActivity(prev.npc, "quizCorrect", gainedCorrect, gainedXp) : prev.npc,
      };
    }),
    markChapterLessonRead: (chapter, lessonId) => setState((prev) => {
      const alreadyRead = prev.chapterReadLessons[chapter] ?? [];
      if (alreadyRead.includes(lessonId)) return prev;
      return { ...prev, chapterReadLessons: { ...prev.chapterReadLessons, [chapter]: addChapterReadLesson(alreadyRead, lessonId) } };
    }),
    markFlashcardKnown: (id) => setState((prev) => prev.flashcardKnown.includes(id) ? { ...prev, flashcardReviewQueue: prev.flashcardReviewQueue.filter((queuedId) => queuedId !== id) } : ({ ...prev, flashcardKnown: [...prev.flashcardKnown, id], flashcardReviewQueue: prev.flashcardReviewQueue.filter((queuedId) => queuedId !== id), npc: rewardNpcLearningActivity(prev.npc, "flashcards", 1, 6) })),
    markFlashcardReview: (id) => setState((prev) => ({ ...prev, flashcardKnown: prev.flashcardKnown.filter((knownId) => knownId !== id), flashcardReviewQueue: prev.flashcardReviewQueue.includes(id) ? prev.flashcardReviewQueue : [id, ...prev.flashcardReviewQueue] })),
    setSelectedGoal: (goal) => setState((prev) => ({ ...prev, selectedGoal: goal })),
    selectNpcPet: (petId) => setState((prev) => ({ ...prev, npc: { ...prev.npc, activePet: petId } })),
    setNpcPopupEnabled: (enabled) => setState((prev) => ({ ...prev, npc: { ...prev.npc, popupEnabled: enabled } })),
    setNpcPopupPosition: (position) => setState((prev) => ({ ...prev, npc: { ...prev.npc, popupPosition: normalizeNpcPopupPosition(position) } })),
    feedNpcPet: () => { const result = feedNpcPet(state.npc); setState((prev) => ({ ...prev, npc: result.progress })); return result; },
    playWithNpcPet: () => { const result = playWithNpcPet(state.npc); setState((prev) => ({ ...prev, npc: result.progress })); return result; },
    buyNpcFood: () => { const result = buyNpcFood(state.npc); setState((prev) => ({ ...prev, npc: result.progress })); return result; },
    buyNpcShopItem: (itemId) => { const result = buyNpcShopItem(state.npc, itemId); setState((prev) => ({ ...prev, npc: result.progress })); return result; },
    equipNpcAccessory: (accessoryId) => { const result = equipNpcAccessory(state.npc, accessoryId); setState((prev) => ({ ...prev, npc: result.progress })); return result; },
    setNpcAudioEnabled: (enabled) => setState((prev) => ({ ...prev, npc: { ...prev.npc, audioEnabled: enabled } })),
    claimNpcDailyQuest: (questId) => { const result = claimNpcDailyQuest(state.npc, questId); setState((prev) => ({ ...prev, npc: result.progress })); return result; },
    claimNpcMiniGameReward: (score, durationMs) => { const result = claimNpcMiniGameReward(state.npc, score, durationMs); setState((prev) => ({ ...prev, npc: result.progress })); return result; },
    resetProgress: () => setState(initialState),
  }), [state]);

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) throw new Error("useLearning must be used inside LearningProvider");
  return context;
}
