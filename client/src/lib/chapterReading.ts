export function addChapterReadLesson(existing: number[], lessonId: number) {
  return existing.includes(lessonId) ? existing : [...existing, lessonId];
}

export function getChapterReadCount(readLessonIds: number[], chapterLessonIds: number[]) {
  return readLessonIds.filter((lessonId) => chapterLessonIds.includes(lessonId)).length;
}

export function getChapterCompletedCount(completedLessonIds: number[], chapterLessonIds: number[]) {
  return getChapterReadCount(completedLessonIds, chapterLessonIds);
}

export function toggleCompletedLesson(completedLessonIds: number[], lessonId: number) {
  return completedLessonIds.includes(lessonId)
    ? completedLessonIds.filter((completedId) => completedId !== lessonId)
    : [...completedLessonIds, lessonId];
}

export function getChapterReadPercent(readCount: number, lessonCount: number) {
  if (lessonCount <= 0) return 0;
  return Math.min(100, Math.round((readCount / lessonCount) * 100));
}
