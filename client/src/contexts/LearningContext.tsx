// Style reminder: Paper Playground — state should feel lightweight, friendly, and immediate like a workbook checklist.

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { materials } from "@/lib/materials";

type LearningState = {
  completed: number[];
  scores: Record<number, number>;
  current: number;
  streak: number;
  lastVisit: string;
};

type LearningContextValue = LearningState & {
  completedCount: number;
  progressPercent: number;
  markComplete: (id: number) => void;
  markCurrent: (id: number) => void;
  saveScore: (id: number, score: number) => void;
  resetProgress: () => void;
};

const STORAGE_KEY = "belajar-ai-progress-v1";
const initialState: LearningState = { completed: [], scores: {}, current: 1, streak: 3, lastVisit: "" };
const LearningContext = createContext<LearningContextValue | null>(null);

function readState(): LearningState {
  if (typeof window === "undefined") return initialState;
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Partial<LearningState> | null;
    return { ...initialState, ...parsed, completed: parsed?.completed ?? [], scores: parsed?.scores ?? {} };
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
    progressPercent: Math.round((state.completed.length / materials.length) * 100),
    markComplete: (id) => setState((prev) => ({ ...prev, completed: prev.completed.includes(id) ? prev.completed : [...prev.completed, id], current: id })),
    markCurrent: (id) => setState((prev) => ({ ...prev, current: id })),
    saveScore: (id, score) => setState((prev) => ({ ...prev, scores: { ...prev.scores, [id]: Math.max(prev.scores[id] ?? 0, score) } })),
    resetProgress: () => setState(initialState),
  }), [state]);

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) throw new Error("useLearning must be used inside LearningProvider");
  return context;
}
