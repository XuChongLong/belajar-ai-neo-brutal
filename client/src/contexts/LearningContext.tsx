// Style reminder: Paper Playground — state should feel lightweight, friendly, and immediate like a workbook checklist.

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { materials } from "@/lib/materials";
import { addChapterReadLesson, toggleCompletedLesson } from "@/lib/chapterReading";
import { buyNpcFood, buyNpcShopItem, claimNpcDailyQuest, claimNpcMiniGameReward, ensureNpcDaily, equipNpcAccessory, feedNpcPet, initialPetProgress, normalizeNpcPopupPosition, playWithNpcPet, rewardNpcLearningActivity, type AccessoryId, type DailyQuestId, type PetActionResult, type PetId, type PetPopupPosition, type PetProgress } from "@/lib/npcPets";
import type { LearningProgressSnapshot, WrongQuizQuestion } from "@shared/learningProgress";

export type { WrongQuizQuestion } from "@shared/learningProgress";

type LearningState = LearningProgressSnapshot & { npc: PetProgress };
export type LearningSyncStatus = "guest" | "loading" | "syncing" | "synced" | "offline";

type LearningContextValue = LearningState & {
  completedCount: number;
  bookmarkCount: number;
  progressPercent: number;
  syncStatus: LearningSyncStatus;
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

const LEGACY_STORAGE_KEY = "belajar-ai-progress-v1";
const accountStorageKey = (userId: number) => `belajar-ai-progress-account-${userId}-v1`;
const initialState: LearningState = { completed: [], bookmarks: [], scores: {}, quizAttempts: {}, wrongQuizQuestions: {}, chapterReadLessons: {}, flashcardKnown: [], flashcardReviewQueue: [], selectedGoal: null, npc: initialPetProgress, current: 1, streak: 0, lastVisit: "" };
const LearningContext = createContext<LearningContextValue | null>(null);

function normalizeState(raw: Partial<LearningState> | null | undefined): LearningState {
  const npc = raw?.npc;
  return {
    ...initialState,
    ...raw,
    completed: raw?.completed ?? [],
    bookmarks: raw?.bookmarks ?? [],
    scores: raw?.scores ?? {},
    quizAttempts: raw?.quizAttempts ?? {},
    wrongQuizQuestions: raw?.wrongQuizQuestions ?? {},
    chapterReadLessons: raw?.chapterReadLessons ?? {},
    flashcardKnown: raw?.flashcardKnown ?? [],
    flashcardReviewQueue: raw?.flashcardReviewQueue ?? [],
    selectedGoal: raw?.selectedGoal ?? null,
    npc: {
      ...initialPetProgress,
      ...npc,
      xp: { ...initialPetProgress.xp, ...npc?.xp },
      earnedMilestones: { ...initialPetProgress.earnedMilestones, ...npc?.earnedMilestones },
      popupPosition: normalizeNpcPopupPosition(npc?.popupPosition ?? initialPetProgress.popupPosition),
      ownedAccessories: npc?.ownedAccessories ?? initialPetProgress.ownedAccessories,
      equippedAccessory: npc?.equippedAccessory ?? initialPetProgress.equippedAccessory,
      audioEnabled: npc?.audioEnabled ?? initialPetProgress.audioEnabled,
      daily: { ...initialPetProgress.daily, ...npc?.daily, questProgress: { ...initialPetProgress.daily.questProgress, ...npc?.daily?.questProgress }, claimedQuestIds: npc?.daily?.claimedQuestIds ?? initialPetProgress.daily.claimedQuestIds },
    },
  };
}

function readState(key: string) {
  if (typeof window === "undefined") return initialState;
  try { return normalizeState(JSON.parse(localStorage.getItem(key) ?? "null") as Partial<LearningState> | null); }
  catch { return initialState; }
}

function toSnapshot(state: LearningState): LearningProgressSnapshot {
  return {
    completed: state.completed, bookmarks: state.bookmarks, scores: state.scores, quizAttempts: state.quizAttempts, wrongQuizQuestions: state.wrongQuizQuestions, chapterReadLessons: state.chapterReadLessons, flashcardKnown: state.flashcardKnown, flashcardReviewQueue: state.flashcardReviewQueue, selectedGoal: state.selectedGoal, npc: state.npc, current: state.current, streak: state.streak, lastVisit: state.lastVisit,
  };
}

export function LearningProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const accountScope = user?.id ?? -1;
  const progressQuery = trpc.learning.mine.useQuery({ accountId: accountScope }, { enabled: isAuthenticated && Boolean(user) });
  const saveProgress = trpc.learning.save.useMutation();
  const [state, setState] = useState<LearningState>(() => readState(LEGACY_STORAGE_KEY));
  const [accountReady, setAccountReady] = useState(false);
  const lastPersistedRef = useRef("");

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated || !user) {
      setAccountReady(false);
      setState(readState(LEGACY_STORAGE_KEY));
      return;
    }
    if (progressQuery.isLoading || progressQuery.isFetching || progressQuery.isError) return;

    const cachedAccountState = readState(accountStorageKey(user.id));
    const hasAccountCache = typeof window !== "undefined" && Boolean(localStorage.getItem(accountStorageKey(user.id)));
    const hasLegacyState = typeof window !== "undefined" && Boolean(localStorage.getItem(LEGACY_STORAGE_KEY));
    const remoteState = progressQuery.data?.snapshot ? normalizeState(progressQuery.data.snapshot) : null;
    const next = remoteState ?? (hasAccountCache ? cachedAccountState : hasLegacyState ? readState(LEGACY_STORAGE_KEY) : initialState);

    setState(next);
    localStorage.setItem(accountStorageKey(user.id), JSON.stringify(next));
    lastPersistedRef.current = remoteState ? JSON.stringify(toSnapshot(next)) : "";
    setAccountReady(true);
  }, [authLoading, isAuthenticated, user?.id, progressQuery.isLoading, progressQuery.isFetching, progressQuery.isError, progressQuery.data?.updatedAt]);

  useEffect(() => {
    if (authLoading || (isAuthenticated && !accountReady)) return;
    const today = new Date().toISOString().slice(0, 10);
    setState((prev) => {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const nextStreak = prev.lastVisit === today ? prev.streak : prev.lastVisit === yesterday ? prev.streak + 1 : prev.lastVisit ? 1 : 0;
      return { ...prev, lastVisit: today, streak: nextStreak, npc: ensureNpcDaily(prev.npc, today) };
    });
  }, [authLoading, isAuthenticated, accountReady]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isAuthenticated || !user) localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(state));
    else if (accountReady) localStorage.setItem(accountStorageKey(user.id), JSON.stringify(state));
  }, [state, isAuthenticated, user?.id, accountReady]);

  useEffect(() => {
    if (!isAuthenticated || !user || !accountReady) return;
    const snapshot = toSnapshot(state);
    const fingerprint = JSON.stringify(snapshot);
    if (fingerprint === lastPersistedRef.current) return;
    const timer = window.setTimeout(() => {
      saveProgress.mutate(snapshot, { onSuccess: () => { lastPersistedRef.current = fingerprint; } });
    }, 500);
    return () => window.clearTimeout(timer);
  }, [state, isAuthenticated, user?.id, accountReady, saveProgress.mutate]);

  const value = useMemo<LearningContextValue>(() => ({
    ...state,
    completedCount: state.completed.length,
    bookmarkCount: state.bookmarks.length,
    progressPercent: Math.round((state.completed.length / materials.length) * 100),
    syncStatus: !isAuthenticated ? "guest" : !accountReady ? "loading" : saveProgress.isPending ? "syncing" : saveProgress.isError ? "offline" : "synced",
    markComplete: (id) => setState((prev) => prev.completed.includes(id) ? { ...prev, current: id } : ({ ...prev, completed: [...prev.completed, id], current: id, npc: rewardNpcLearningActivity(prev.npc, "lessons", 1, 35) })),
    toggleComplete: (id) => setState((prev) => prev.completed.includes(id) ? { ...prev, completed: toggleCompletedLesson(prev.completed, id), current: id } : ({ ...prev, completed: toggleCompletedLesson(prev.completed, id), current: id, npc: rewardNpcLearningActivity(prev.npc, "lessons", 1, 35) })),
    markCurrent: (id) => setState((prev) => ({ ...prev, current: id })),
    toggleBookmark: (id) => setState((prev) => ({ ...prev, bookmarks: prev.bookmarks.includes(id) ? prev.bookmarks.filter((bookmark) => bookmark !== id) : [...prev.bookmarks, id] })),
    saveScore: (id, score) => setState((prev) => ({ ...prev, scores: { ...prev.scores, [id]: Math.max(prev.scores[id] ?? 0, score) } })),
    saveQuizAttempt: (id, score, total, wrongQuestions = []) => setState((prev) => {
      const key = String(id);
      const previousBest = typeof id === "number" ? (prev.scores[id] ?? 0) : (prev.quizAttempts[key]?.score ?? 0);
      const gainedCorrect = Math.max(0, score - previousBest);
      const gainedXp = gainedCorrect * 8;
      return { ...prev, scores: typeof id === "number" ? { ...prev.scores, [id]: Math.max(prev.scores[id] ?? 0, score) } : prev.scores, quizAttempts: { ...prev.quizAttempts, [key]: { score, total, percentage: Math.round((score / Math.max(total, 1)) * 100), lastAttemptAt: new Date().toISOString() } }, wrongQuizQuestions: wrongQuestions.length ? { ...prev.wrongQuizQuestions, [key]: wrongQuestions } : Object.fromEntries(Object.entries(prev.wrongQuizQuestions).filter(([questionKey]) => questionKey !== key)), npc: gainedXp ? rewardNpcLearningActivity(prev.npc, "quizCorrect", gainedCorrect, gainedXp) : prev.npc };
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
  }), [state, isAuthenticated, accountReady, saveProgress.isPending, saveProgress.isError]);

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) throw new Error("useLearning must be used inside LearningProvider");
  return context;
}
