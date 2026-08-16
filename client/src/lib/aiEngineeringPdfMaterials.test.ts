import { describe, expect, it } from "vitest";
import { aiEngineeringPdfMaterials } from "./aiEngineeringPdfMaterials";
import { aiEngineeringTeachingContent } from "./aiEngineeringTeachingContent";
import { employeePolicyAssistantCaseStudy } from "./employeePolicyAssistantCaseStudy";

describe("PDF-led AI Engineering curriculum", () => {
  it("contains sixty small lessons ordered across the ten required chapter groups", () => {
    expect(aiEngineeringPdfMaterials).toHaveLength(60);
    expect(aiEngineeringPdfMaterials[0]?.id).toBe(100);
    expect(aiEngineeringPdfMaterials.at(-1)?.id).toBe(159);
    expect(aiEngineeringPdfMaterials[0]?.displayNumber).toBe(1);
    expect(aiEngineeringPdfMaterials.at(-1)?.displayNumber).toBe(60);
    expect(new Set(aiEngineeringPdfMaterials.map((material) => material.category)).size).toBe(10);
    expect(Object.keys(aiEngineeringTeachingContent)).toHaveLength(60);
  });

  it("keeps every lesson original, practical, quiz-backed, and connected to the primary source", () => {
    aiEngineeringPdfMaterials.forEach((material) => {
      expect(material.sections.map((section) => section.heading)).toEqual([
        "Konsep yang perlu dipahami",
        "Bagaimana konsep ini bekerja",
        "Kasus di dunia kerja",
        "Contoh langkah demi langkah",
        "Aturan pengambilan keputusan",
        "Latihan terarah",
        "Batasan dan risiko",
        "Ringkasan pembelajaran",
      ]);
      expect(material.sections[1]?.body.length).toBeGreaterThan(180);
      expect(material.sections[2]?.body.length).toBeGreaterThan(180);
      expect(material.sections[3]?.body.length).toBeGreaterThan(180);
      expect(material.sections.map((section) => section.body).join(" ").length).toBeGreaterThan(1400);
      expect(material.sections.map((section) => section.body).join(" ")).not.toMatch(/\bbeb\b/i);
      expect(material.quiz).toHaveLength(2);
      expect(material.resources?.some((resource) => resource.label.includes("Chip Huyen"))).toBe(true);
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
