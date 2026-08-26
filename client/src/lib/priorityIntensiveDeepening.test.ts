import { describe, expect, it } from "vitest";
import { materials } from "./materials";
import { priorityIntensiveDeepening, priorityIntensiveDeepeningCount } from "./priorityIntensiveDeepening";

describe("priority intensive deepening", () => {
  it("adds 36 domain-specific examples, common mistakes, and rubrics across the five expanded courses", () => {
    expect(priorityIntensiveDeepeningCount).toBe(36);
    const deepened = materials.filter((material) => material.deepDive);
    expect(deepened).toHaveLength(36);
    expect(new Set(deepened.map((material) => material.specialization))).toEqual(new Set(["cloud-devops", "data-engineering", "ai-product", "automation", "creative-ai"]));
    deepened.forEach((material) => {
      expect(material.deepDive?.example.length).toBeGreaterThan(90);
      expect(material.deepDive?.commonMistake.length).toBeGreaterThan(70);
      expect(material.deepDive?.rubric).toHaveLength(3);
    });
  });
});
