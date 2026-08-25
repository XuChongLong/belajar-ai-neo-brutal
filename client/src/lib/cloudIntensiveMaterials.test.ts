import { describe, expect, it } from "vitest";
import { cloudIntensiveMaterials } from "./cloudIntensiveMaterials";

describe("Cloud Computing AI intensif", () => {
  it("starts with a twelve-lesson prologue followed by twelve ordered checkpoints", () => {
    expect(cloudIntensiveMaterials).toHaveLength(156);
    expect(new Set(cloudIntensiveMaterials.map((material) => material.id)).size).toBe(156);
    expect(cloudIntensiveMaterials.filter((material) => material.category.includes("Bab Prolog"))).toHaveLength(12);
    expect(cloudIntensiveMaterials.filter((material) => material.category.includes("Bab ") && !material.category.includes("Bab Prolog"))).toHaveLength(144);
    expect(cloudIntensiveMaterials[0]?.title).toMatch(/^Prolog\.1/);
    expect(cloudIntensiveMaterials[12]?.title).toMatch(/^1\.1/);
    expect(cloudIntensiveMaterials.at(-1)?.title).toMatch(/^12\.12/);
  });

  it("attaches a chapter opener, case study, five-layer lesson, quiz, and source to every checkpoint", () => {
    expect(cloudIntensiveMaterials.filter((material) => material.chapterLecture)).toHaveLength(13);
    expect(cloudIntensiveMaterials.filter((material) => material.caseStudy)).toHaveLength(13);
    cloudIntensiveMaterials.forEach((material) => {
      expect(material.sections).toHaveLength(5);
      expect(material.quiz).toHaveLength(2);
      expect(material.resources?.length).toBeGreaterThan(0);
    });
    expect(new Set(cloudIntensiveMaterials.flatMap((material) => material.resources?.map((resource) => resource.url) ?? [])).size).toBeGreaterThanOrEqual(7);
  });
});
