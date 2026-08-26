import type { CoursePortfolio, ProjectEvidence } from "@shared/learningProgress";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function uniqueStrings(value: unknown, limit: number, maxLength: number) {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.filter((item): item is string => typeof item === "string" && item.length > 0 && item.length <= maxLength))).slice(0, limit);
}

export function normalizeProjectEvidence(raw: unknown): Record<string, ProjectEvidence> {
  if (!isRecord(raw)) return {};
  return Object.fromEntries(Object.entries(raw).flatMap(([key, value]) => {
    if (key.length > 400 || !isRecord(value) || typeof value.reflection !== "string" || value.reflection.length > 4_000 || typeof value.updatedAt !== "string") return [];
    return [[key, { checked: uniqueStrings(value.checked, 20, 400), reflection: value.reflection, updatedAt: value.updatedAt }]];
  }).slice(0, 200));
}

export function normalizeCoursePortfolio(raw: unknown): Record<string, CoursePortfolio> {
  if (!isRecord(raw)) return {};
  return Object.fromEntries(Object.entries(raw).flatMap(([key, value]) => {
    if (key.length > 120 || !isRecord(value) || typeof value.narrative !== "string" || value.narrative.length > 4_000 || typeof value.updatedAt !== "string") return [];
    return [[key, { narrative: value.narrative, selectedEvidence: uniqueStrings(value.selectedEvidence, 20, 400), updatedAt: value.updatedAt }]];
  }).slice(0, 20));
}
