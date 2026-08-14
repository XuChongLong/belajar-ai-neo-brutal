import { describe, expect, it } from "vitest";
import { materials } from "./materials";
import { getLearningRecommendations, learningGoals } from "./learningPath";
import { isSpecializationId, materialMatchesSpecialization, specializationMeta } from "./specializations";

describe("expanded specialization catalogue", () => {
  it("adds an AI Engineering path plus six distinct eight-lesson specialization paths", () => {
    expect(materials).toHaveLength(99);
    expect(new Set(materials.map((material) => material.id)).size).toBe(99);
    expect(Object.values(specializationMeta)).toHaveLength(7);
    expect(materials.filter((material) => material.specialization === "ai-engineering")).toHaveLength(51);
    Object.values(specializationMeta).filter((track) => track.id !== "ai-engineering").forEach((track) => expect(materials.filter((material) => material.specialization === track.id)).toHaveLength(8));
  });

  it("provides story-led sections, resources, and quizzes for every specialization lesson", () => {
    materials.filter((material) => material.specialization && material.id >= 40).forEach((material) => {
      expect(material.sections).toHaveLength(4);
      expect(material.resources?.length).toBeGreaterThan(0);
      expect(material.quiz).toHaveLength(2);
    });
  });

  it("keeps a track recommendation focused on its priority category", () => {
    const cloud = getLearningRecommendations(materials, [], {}, "cloud-operator");
    expect(cloud.some((item) => item.material.category === "Cloud Computing AI")).toBe(true);
    expect(learningGoals.some((goal) => goal.id === "creative-ai-builder")).toBe(true);
    expect(getLearningRecommendations(materials, [], {}, "ai-engineer").some((item) => item.material.category === "AI Engineering")).toBe(true);
  });

  it("accepts only known specialization routes and filters their own materials", () => {
    expect(isSpecializationId("ai-engineering")).toBe(true);
    expect(isSpecializationId("cloud-devops")).toBe(true);
    expect(isSpecializationId("not-a-track")).toBe(false);
    expect(materials.filter((material) => materialMatchesSpecialization(material, "ai-engineering"))).toHaveLength(51);
    expect(materials.filter((material) => materialMatchesSpecialization(material, "cloud-devops"))).toHaveLength(8);
    expect(materials.filter((material) => materialMatchesSpecialization(material, null))).toHaveLength(99);
  });
});
