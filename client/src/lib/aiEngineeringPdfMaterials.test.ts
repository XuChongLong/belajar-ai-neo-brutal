import { describe, expect, it } from "vitest";
import { aiEngineeringPdfMaterials } from "./aiEngineeringPdfMaterials";

describe("PDF-led AI Engineering curriculum", () => {
  it("contains sixty small lessons ordered across the ten required chapter groups", () => {
    expect(aiEngineeringPdfMaterials).toHaveLength(60);
    expect(aiEngineeringPdfMaterials[0]?.id).toBe(100);
    expect(aiEngineeringPdfMaterials.at(-1)?.id).toBe(159);
    expect(aiEngineeringPdfMaterials[0]?.displayNumber).toBe(1);
    expect(aiEngineeringPdfMaterials.at(-1)?.displayNumber).toBe(60);
    expect(new Set(aiEngineeringPdfMaterials.map((material) => material.category)).size).toBe(10);
  });

  it("keeps every lesson original, practical, quiz-backed, and connected to the primary source", () => {
    aiEngineeringPdfMaterials.forEach((material) => {
      expect(material.sections.map((section) => section.heading)).toEqual([
        "Inti pembahasan",
        "Mengapa ini penting",
        "Contoh penerapan",
        "Langkah yang dapat dicoba",
        "Pertanyaan untuk sistemmu",
        "Hal yang perlu diwaspadai",
        "Ringkasan",
      ]);
      expect(material.quiz).toHaveLength(2);
      expect(material.resources?.some((resource) => resource.label.includes("Chip Huyen"))).toBe(true);
    });
  });
});
