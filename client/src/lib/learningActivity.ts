import type { LearningActivity, LearningActivityType } from "@shared/learningProgress";

export type WeeklyActivityDay = { dateKey: string; label: string; active: boolean; count: number };
export type WeeklyActivitySummary = { goal: number; activeDays: number; percent: number; complete: boolean; days: WeeklyActivityDay[] };

const MAX_ACTIVITY_HISTORY = 80;

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createActivityId(type: LearningActivityType, materialId: number | null, occurredAt: number) {
  return `${type}-${materialId ?? "general"}-${occurredAt}-${Math.random().toString(36).slice(2, 7)}`;
}

export function appendLearningActivity(history: LearningActivity[], type: LearningActivityType, materialId: number | null, occurredAt = Date.now()) {
  const next: LearningActivity = { id: createActivityId(type, materialId, occurredAt), type, materialId, occurredAt };
  return [next, ...history].slice(0, MAX_ACTIVITY_HISTORY);
}

export function clampWeeklyGoal(value: number) {
  return [3, 5, 7].includes(value) ? value : 5;
}

export function getWeeklyActivitySummary(history: LearningActivity[], weeklyGoal: number, now = new Date()): WeeklyActivitySummary {
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekday = weekStart.getDay() || 7;
  weekStart.setDate(weekStart.getDate() - weekday + 1);
  const days = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + index);
    const key = dateKey(day);
    const count = history.filter((activity) => dateKey(new Date(activity.occurredAt)) === key).length;
    return { dateKey: key, label: day.toLocaleDateString("id-ID", { weekday: "short" }).replace(".", ""), active: count > 0, count };
  });
  const activeDays = days.filter((day) => day.active).length;
  const goal = clampWeeklyGoal(weeklyGoal);
  return { goal, activeDays, percent: Math.min(100, Math.round((activeDays / goal) * 100)), complete: activeDays >= goal, days };
}

export function getActivityCopy(activity: LearningActivity, materialTitle?: string) {
  const subject = materialTitle ? ` · ${materialTitle}` : "";
  if (activity.type === "lesson-completed") return `Materi diselesaikan${subject}`;
  if (activity.type === "lesson-read") return `Bagian materi dibaca${subject}`;
  if (activity.type === "quiz-completed") return `Quiz dikerjakan${subject}`;
  return "Flashcard dikuasai";
}
