import { describe, expect, it } from "vitest";
import { aiProductIntensiveMaterials } from "./aiProductIntensiveMaterials";

describe("AI Product Builder intensif", () => {
  it("builds an ordered Prolog plus twelve checkpoint course from discovery through launch", () => {
    expect(aiProductIntensiveMaterials).toHaveLength(156);
    expect(new Set(aiProductIntensiveMaterials.map((material) => material.id)).size).toBe(156);
    expect(aiProductIntensiveMaterials.filter((material) => material.category.includes("Bab Prolog"))).toHaveLength(12);
    expect(aiProductIntensiveMaterials.filter((material) => material.chapterLecture)).toHaveLength(13);
    expect(aiProductIntensiveMaterials.filter((material) => material.caseStudy)).toHaveLength(13);
    expect(aiProductIntensiveMaterials[0]?.title).toMatch(/^Prolog\.1/);
    expect(aiProductIntensiveMaterials[12]?.title).toMatch(/^1\.1/);
    expect(aiProductIntensiveMaterials.at(-1)?.title).toMatch(/^12\.12/);
  });

  it("provides five content layers, two checks, and primary sources for every product subchapter", () => {
    aiProductIntensiveMaterials.forEach((material) => {
      expect(material.sections).toHaveLength(5);
      expect(material.quiz).toHaveLength(2);
      expect(material.resources?.length).toBeGreaterThan(0);
    });
    expect(new Set(aiProductIntensiveMaterials.flatMap((material) => material.resources?.map((resource) => resource.url) ?? [])).size).toBeGreaterThanOrEqual(5);
  });
});
