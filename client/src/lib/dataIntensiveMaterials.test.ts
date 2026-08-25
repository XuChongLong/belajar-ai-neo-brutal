import { describe, expect, it } from "vitest";
import { dataIntensiveMaterials } from "./dataIntensiveMaterials";

describe("Data Analyst & Data Engineering intensif", () => {
  it("keeps the Prolog, twelve checkpoints, and ordered 156-subchapter journey intact", () => {
    expect(dataIntensiveMaterials).toHaveLength(156);
    expect(new Set(dataIntensiveMaterials.map((material) => material.id)).size).toBe(156);
    expect(dataIntensiveMaterials.filter((material) => material.category.includes("Bab Prolog"))).toHaveLength(12);
    expect(dataIntensiveMaterials.filter((material) => material.chapterLecture)).toHaveLength(13);
    expect(dataIntensiveMaterials.filter((material) => material.caseStudy)).toHaveLength(13);
    expect(dataIntensiveMaterials[0]?.title).toMatch(/^Prolog\.1/);
    expect(dataIntensiveMaterials[12]?.title).toMatch(/^1\.1/);
    expect(dataIntensiveMaterials.at(-1)?.title).toMatch(/^12\.12/);
  });

  it("attaches five learning layers, two quizzes, and sources across every data subchapter", () => {
    dataIntensiveMaterials.forEach((material) => {
      expect(material.sections).toHaveLength(5);
      expect(material.quiz).toHaveLength(2);
      expect(material.resources?.length).toBeGreaterThan(0);
    });
    expect(new Set(dataIntensiveMaterials.flatMap((material) => material.resources?.map((resource) => resource.url) ?? [])).size).toBeGreaterThanOrEqual(7);
  });
});
