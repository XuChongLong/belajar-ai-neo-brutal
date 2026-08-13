// Style reminder: Paper Playground — state should feel lightweight, friendly, and immediate like a workbook checklist.

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { materials } from "@/lib/materials";

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
  flashcardKnown: string[];
  flashcardReviewQueue: string[];
  selectedGoal: string | null;
  current: number;
  streak: number;
  lastVisit: string;
};

type LearningContextValue = LearningState & {
  completedCount: number;
  bookmarkCount: number;
  progressPercent: number;
  markComplete: (id: number) => void;
  markCurrent: (id: number) => void;
  toggleBookmark: (id: number) => void;
  saveScore: (id: number, score: number) => void;
  saveQuizAttempt: (id: number | string, score: number, total: number, wrongQuestions?: WrongQuizQuestion[]) => void;
  markFlashcardKnown: (id: string) => void;
  markFlashcardReview: (id: string) => void;
  setSelectedGoal: (goal: string) => void;
  resetProgress: () => void;
};

const STORAGE_KEY = "belajar-ai-progress-v1";
const initialState: LearningState = { completed: [], bookmarks: [], scores: {}, quizAttempts: {}, wrongQuizQuestions: {}, flashcardKnown: [], flashcardReviewQueue: [], selectedGoal: null, current: 1, streak: 3, lastVisit: "" };
const LearningContext = createContext<LearningContextValue | null>(null);

function readState(): LearningState {
  if (typeof window === "undefined") return initialState;
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Partial<LearningState> | null;
    return { ...initialState, ...parsed, completed: parsed?.completed ?? [], bookmarks: parsed?.bookmarks ?? [], scores: parsed?.scores ?? {}, quizAttempts: parsed?.quizAttempts ?? {}, wrongQuizQuestions: parsed?.wrongQuizQuestions ?? {}, flashcardKnown: parsed?.flashcardKnown ?? [], flashcardReviewQueue: parsed?.flashcardReviewQueue ?? [], selectedGoal: parsed?.selectedGoal ?? null };
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
      return { ...prev, lastVisit: today, streak: nextStreak };
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<LearningContextValue>(() => ({
    ...state,
    completedCount: state.completed.length,
    bookmarkCount: state.bookmarks.length,
    progressPercent: Math.round((state.completed.length / materials.length) * 100),
    markComplete: (id) => setState((prev) => ({ ...prev, completed: prev.completed.includes(id) ? prev.completed : [...prev.completed, id], current: id })),
    markCurrent: (id) => setState((prev) => ({ ...prev, current: id })),
    toggleBookmark: (id) => setState((prev) => ({ ...prev, bookmarks: prev.bookmarks.includes(id) ? prev.bookmarks.filter((bookmark) => bookmark !== id) : [...prev.bookmarks, id] })),
    saveScore: (id, score) => setState((prev) => ({ ...prev, scores: { ...prev.scores, [id]: Math.max(prev.scores[id] ?? 0, score) } })),
    saveQuizAttempt: (id, score, total, wrongQuestions = []) => setState((prev) => ({ ...prev, scores: typeof id === "number" ? { ...prev.scores, [id]: Math.max(prev.scores[id] ?? 0, score) } : prev.scores, quizAttempts: { ...prev.quizAttempts, [String(id)]: { score, total, percentage: Math.round((score / Math.max(total, 1)) * 100), lastAttemptAt: new Date().toISOString() } }, wrongQuizQuestions: wrongQuestions.length ? { ...prev.wrongQuizQuestions, [String(id)]: wrongQuestions } : Object.fromEntries(Object.entries(prev.wrongQuizQuestions).filter(([key]) => key !== String(id))) })),
    markFlashcardKnown: (id) => setState((prev) => ({ ...prev, flashcardKnown: prev.flashcardKnown.includes(id) ? prev.flashcardKnown : [...prev.flashcardKnown, id], flashcardReviewQueue: prev.flashcardReviewQueue.filter((queuedId) => queuedId !== id) })),
    markFlashcardReview: (id) => setState((prev) => ({ ...prev, flashcardKnown: prev.flashcardKnown.filter((knownId) => knownId !== id), flashcardReviewQueue: prev.flashcardReviewQueue.includes(id) ? prev.flashcardReviewQueue : [id, ...prev.flashcardReviewQueue] })),
    setSelectedGoal: (goal) => setState((prev) => ({ ...prev, selectedGoal: goal })),
    resetProgress: () => setState(initialState),
  }), [state]);

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) throw new Error("useLearning must be used inside LearningProvider");
  return context;
}
