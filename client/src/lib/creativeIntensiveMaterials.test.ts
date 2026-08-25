import { describe, expect, it } from "vitest";
import { creativeIntensiveMaterials } from "./creativeIntensiveMaterials";

describe("Creative AI & Content Systems intensif", () => {
  it("keeps a Prolog and twelve ordered core checkpoints before the creative capstone", () => {
    expect(creativeIntensiveMaterials).toHaveLength(156);
    expect(new Set(creativeIntensiveMaterials.map((material) => material.id)).size).toBe(156);
    expect(creativeIntensiveMaterials.filter((material) => material.category.includes("Bab Prolog"))).toHaveLength(12);
    expect(creativeIntensiveMaterials.filter((material) => material.chapterLecture)).toHaveLength(13);
    expect(creativeIntensiveMaterials.filter((material) => material.caseStudy)).toHaveLength(13);
    expect(creativeIntensiveMaterials[0]?.title).toMatch(/^Prolog\.1/);
    expect(creativeIntensiveMaterials[12]?.title).toMatch(/^1\.1/);
    expect(creativeIntensiveMaterials.at(-1)?.title).toMatch(/^12\.12/);
  });

  it("provides five content layers, two checks, and rights-aware primary sources for every creative subchapter", () => {
    creativeIntensiveMaterials.forEach((material) => {
      expect(material.sections).toHaveLength(5);
      expect(material.quiz).toHaveLength(2);
      expect(material.resources?.length).toBeGreaterThan(0);
    });
    expect(new Set(creativeIntensiveMaterials.flatMap((material) => material.resources?.map((resource) => resource.url) ?? [])).size).toBeGreaterThanOrEqual(6);
  });
});
