import { describe, expect, it } from "vitest";
import { automationIntensiveMaterials } from "./automationIntensiveMaterials";

describe("Automation Specialist intensif", () => {
  it("keeps a Prolog and twelve ordered core checkpoints before the automation capstone", () => {
    expect(automationIntensiveMaterials).toHaveLength(156);
    expect(new Set(automationIntensiveMaterials.map((material) => material.id)).size).toBe(156);
    expect(automationIntensiveMaterials.filter((material) => material.category.includes("Bab Prolog"))).toHaveLength(12);
    expect(automationIntensiveMaterials.filter((material) => material.chapterLecture)).toHaveLength(13);
    expect(automationIntensiveMaterials.filter((material) => material.caseStudy)).toHaveLength(13);
    expect(automationIntensiveMaterials[0]?.title).toMatch(/^Prolog\.1/);
    expect(automationIntensiveMaterials[12]?.title).toMatch(/^1\.1/);
    expect(automationIntensiveMaterials.at(-1)?.title).toMatch(/^12\.12/);
  });

  it("provides five learning layers, two checks, and traceable sources for every workflow subchapter", () => {
    automationIntensiveMaterials.forEach((material) => {
      expect(material.sections).toHaveLength(5);
      expect(material.quiz).toHaveLength(2);
      expect(material.resources?.length).toBeGreaterThan(0);
    });
    expect(new Set(automationIntensiveMaterials.flatMap((material) => material.resources?.map((resource) => resource.url) ?? [])).size).toBeGreaterThanOrEqual(7);
  });
});
