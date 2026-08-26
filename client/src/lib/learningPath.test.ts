import { describe, expect, it } from "vitest";
import type { Material } from "./materials";
import { getLearningRecommendations } from "./learningPath";

const material = (id: number, category: string, title: string) => ({ id, category, title }) as Material;

describe("learning path priorities", () => {
  it("places the active Cyber Security Intensif course ahead for the AI Safety Builder goal", () => {
    const recommendations = getLearningRecommendations([
      material(180, "Cyber Security Intensif · Bab Prolog", "Prolog · Mengapa Security Adalah Kebiasaan"),
      material(10, "AI Agents & Tools", "Agent tools"),
      material(1, "Dasar-Dasar AI", "Apa itu AI"),
    ], [], {}, "ai-safety-builder");

    expect(recommendations.find((item) => item.type === "continue")?.material.category).toContain("Cyber Security Intensif");
  });
});
