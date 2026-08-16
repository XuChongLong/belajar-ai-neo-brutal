import { describe, expect, it } from "vitest";
import { addChapterReadLesson, getChapterReadCount, getChapterReadPercent } from "./chapterReading";

describe("chapter reading progress", () => {
  it("keeps lesson reads unique and calculates progress from the current chapter only", () => {
    const initial = addChapterReadLesson([], 112);
    const duplicateSafe = addChapterReadLesson(initial, 112);
    const advanced = addChapterReadLesson(duplicateSafe, 113);

    expect(advanced).toEqual([112, 113]);
    expect(getChapterReadCount([...advanced, 999], [112, 113, 114, 115, 116, 117])).toBe(2);
    expect(getChapterReadPercent(2, 6)).toBe(33);
    expect(getChapterReadPercent(8, 6)).toBe(100);
  });
});
