import { describe, expect, it } from "vitest";
import { aiEngineeringPdfMaterials } from "./aiEngineeringPdfMaterials";
import { aiEngineeringTeachingContent } from "./aiEngineeringTeachingContent";
import { employeePolicyAssistantCaseStudy } from "./employeePolicyAssistantCaseStudy";
import { aiEngineeringChapterLectures } from "./aiEngineeringChapterLectures";
import { categoryMeta } from "./materials";
import { aiEngineeringAdvancedLectures } from "./aiEngineeringAdvancedLectures";
import { aiEngineeringChapterQuizzes } from "./aiEngineeringChapterQuizzes";

describe("PDF-led AI Engineering curriculum", () => {
  it("contains sixty small lessons ordered across the ten required chapter groups", () => {
    expect(aiEngineeringPdfMaterials).toHaveLength(60);
    expect(aiEngineeringPdfMaterials[0]?.id).toBe(100);
    expect(aiEngineeringPdfMaterials.at(-1)?.id).toBe(159);
    expect(aiEngineeringPdfMaterials[0]?.displayNumber).toBe(1);
    expect(aiEngineeringPdfMaterials.at(-1)?.displayNumber).toBe(60);
    expect(new Set(aiEngineeringPdfMaterials.map((material) => material.category)).size).toBe(10);
    expect(Object.keys(aiEngineeringTeachingContent)).toHaveLength(60);
    expect(aiEngineeringPdfMaterials.slice(0, 6).map((material) => material.displayNumber)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(aiEngineeringPdfMaterials.slice(0, 6).every((material) => material.category.startsWith("AI Engineering · Bab 1 —"))).toBe(true);
    expect(aiEngineeringPdfMaterials.filter((material) => material.chapterLecture)).toHaveLength(10);
    expect(Object.keys(aiEngineeringChapterLectures)).toHaveLength(10);
    expect(Object.keys(categoryMeta).filter((category) => category.startsWith("AI Engineering · Bab "))).toEqual(aiEngineeringPdfMaterials.filter((material, index) => index % 6 === 0).map((material) => material.category));
  });

  it("keeps every lesson original, practical, quiz-backed, and connected to the primary source", () => {
    aiEngineeringPdfMaterials.forEach((material) => {
      const expectedHeadings = [
        "Konsep yang perlu dipahami",
        ...(material.id >= 112 ? ["Penjelasan dosen: menghubungkan konsep dengan sistem nyata"] : []),
        "Bagaimana konsep ini bekerja",
        "Kasus di dunia kerja",
        "Contoh langkah demi langkah",
        "Aturan pengambilan keputusan",
        "Latihan terarah",
        "Batasan dan risiko",
      ];
      expect(material.sections.map((section) => section.heading)).toEqual(expectedHeadings);
      expect(material.sections[1]?.body.length).toBeGreaterThan(180);
      const substantiveOffset = material.id >= 112 ? 1 : 0;
      expect(material.sections[2 + substantiveOffset]?.body.length).toBeGreaterThan(180);
      expect(material.sections[3 + substantiveOffset]?.body.length).toBeGreaterThan(180);
      expect(material.sections.map((section) => section.body).join(" ").length).toBeGreaterThan(material.id >= 112 ? 1850 : 1200);
      expect(material.sections.map((section) => section.body).join(" ")).not.toMatch(/\bbeb\b/i);
      expect(material.quiz).toHaveLength(2);
      expect(material.resources?.some((resource) => resource.label.includes("Chip Huyen"))).toBe(true);
    });
  });

  it("gives every Chapter 3–10 lesson a distinct long-form lecturer explanation", () => {
    const advancedMaterials = aiEngineeringPdfMaterials.filter((material) => material.id >= 112);
    expect(advancedMaterials).toHaveLength(48);
    expect(Object.keys(aiEngineeringAdvancedLectures)).toHaveLength(48);

    advancedMaterials.forEach((material) => {
      const lecture = aiEngineeringAdvancedLectures[material.id];
      expect(lecture).toBeTruthy();
      expect(lecture.length).toBeGreaterThan(700);
      expect(material.sections[1]).toMatchObject({ heading: "Penjelasan dosen: menghubungkan konsep dengan sistem nyata", body: lecture });
    });
  });

  it("provides one substantive end-of-chapter comprehension quiz for every AI Engineering chapter", () => {
    expect(Object.keys(aiEngineeringChapterQuizzes).map(Number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    Object.values(aiEngineeringChapterQuizzes).forEach((quiz) => {
      expect(quiz.questions).toHaveLength(3);
      expect(quiz.intro.length).toBeGreaterThanOrEqual(60);
      quiz.questions.forEach((question) => {
        expect(question.options).toHaveLength(3);
        expect(question.answer).toBeGreaterThanOrEqual(0);
        expect(question.answer).toBeLessThan(question.options.length);
        expect(question.explanation.length).toBeGreaterThan(35);
      });
    });
  });

  it("connects Chapters 1 and 2 through a substantive Employee Policy Assistant case study", () => {
    const caseStudyLessonIds = aiEngineeringPdfMaterials.filter((material) => material.caseStudy).map((material) => material.id);
    expect(Object.keys(employeePolicyAssistantCaseStudy)).toHaveLength(12);
    expect(caseStudyLessonIds).toEqual([100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111]);

    aiEngineeringPdfMaterials.filter((material) => material.caseStudy).forEach((material, index) => {
      const caseStudy = material.caseStudy!;
      expect(caseStudy.phase).toContain(`Fase ${index + 1} dari 12`);
      expect(caseStudy.title).toContain("Kasus berantai");
      expect(caseStudy.narrative.length).toBeGreaterThan(700);
      expect(caseStudy.artifact.length).toBeGreaterThan(140);
      expect(caseStudy.teachingPoint.length).toBeGreaterThan(120);
      expect(caseStudy.guidedQuestions).toHaveLength(3);
      expect(`${caseStudy.narrative} ${caseStudy.artifact} ${caseStudy.teachingPoint}`).not.toMatch(/\bbeb\b/i);
    });
  });
});
