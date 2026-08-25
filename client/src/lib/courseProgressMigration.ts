import type { LearningActivity, LearningProgressSnapshot, QuizAttempt, WrongQuizQuestion } from "@shared/learningProgress";
import { legacyMaterialSuccessors } from "./intensiveCourseFactory";

function successor(id: number, activeMaterialIds: ReadonlySet<number>) {
  return activeMaterialIds.has(id) ? id : (legacyMaterialSuccessors[id] ?? id);
}

function remapNumberList(ids: readonly number[], activeMaterialIds: ReadonlySet<number>) {
  return Array.from(new Set(ids.map((id) => successor(id, activeMaterialIds))));
}

function remapScores(scores: LearningProgressSnapshot["scores"], activeMaterialIds: ReadonlySet<number>) {
  return Object.entries(scores).reduce<Record<number, number>>((next, [rawId, score]) => {
    const id = successor(Number(rawId), activeMaterialIds);
    next[id] = Math.max(next[id] ?? 0, score);
    return next;
  }, {});
}

function remapAttempts<T extends QuizAttempt | WrongQuizQuestion[]>(records: Record<string, T>, activeMaterialIds: ReadonlySet<number>) {
  return Object.entries(records).reduce<Record<string, T>>((next, [rawId, value]) => {
    const numericId = Number(rawId);
    const key = Number.isFinite(numericId) ? String(successor(numericId, activeMaterialIds)) : rawId;
    const previous = next[key];
    if (!previous) { next[key] = value; return next; }
    if (Array.isArray(previous) && Array.isArray(value)) {
      next[key] = [...previous, ...value].slice(0, 8) as T;
      return next;
    }
    const currentAttempt = value as QuizAttempt;
    const priorAttempt = previous as QuizAttempt;
    next[key] = (currentAttempt.percentage >= priorAttempt.percentage ? currentAttempt : priorAttempt) as T;
    return next;
  }, {});
}

export function migrateLegacyCourseProgress<T extends Partial<LearningProgressSnapshot>>(snapshot: T, activeMaterialIds: ReadonlySet<number>): T {
  const activities = snapshot.activityHistory?.map<LearningActivity>((activity) => ({ ...activity, materialId: activity.materialId === null ? null : successor(activity.materialId, activeMaterialIds) }));
  return {
    ...snapshot,
    completed: snapshot.completed ? remapNumberList(snapshot.completed, activeMaterialIds) : snapshot.completed,
    bookmarks: snapshot.bookmarks ? remapNumberList(snapshot.bookmarks, activeMaterialIds) : snapshot.bookmarks,
    scores: snapshot.scores ? remapScores(snapshot.scores, activeMaterialIds) : snapshot.scores,
    quizAttempts: snapshot.quizAttempts ? remapAttempts(snapshot.quizAttempts, activeMaterialIds) : snapshot.quizAttempts,
    wrongQuizQuestions: snapshot.wrongQuizQuestions ? remapAttempts(snapshot.wrongQuizQuestions, activeMaterialIds) : snapshot.wrongQuizQuestions,
    activityHistory: activities ?? snapshot.activityHistory,
    current: typeof snapshot.current === "number" ? successor(snapshot.current, activeMaterialIds) : snapshot.current,
  };
}
