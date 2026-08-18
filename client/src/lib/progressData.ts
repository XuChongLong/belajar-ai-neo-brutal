import { createEmptyLearningProgress, type LearningProgressSnapshot } from "@shared/learningProgress";

export type LearningProgressExport = {
  version: 1;
  exportedAt: string;
  progress: LearningProgressSnapshot;
};

export function createProgressExport(progress: LearningProgressSnapshot, exportedAt = new Date().toISOString()): LearningProgressExport {
  return { version: 1, exportedAt, progress };
}

export function getProgressExportFilename(exportedAt: string) {
  return `belajar-ai-progress-${exportedAt.slice(0, 10)}.json`;
}

export function createResetProgressSnapshot() {
  return createEmptyLearningProgress();
}
