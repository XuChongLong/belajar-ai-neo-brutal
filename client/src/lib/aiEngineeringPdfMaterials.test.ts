import { describe, expect, it } from "vitest";
import { aiEngineeringPdfMaterials } from "./aiEngineeringPdfMaterials";
import { aiEngineeringTeachingContent } from "./aiEngineeringTeachingContent";

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
});
