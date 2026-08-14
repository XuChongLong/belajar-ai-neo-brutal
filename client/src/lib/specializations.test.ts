import { describe, expect, it } from "vitest";
import { materials } from "./materials";
import { getLearningRecommendations, learningGoals } from "./learningPath";
import { specializationMeta } from "./specializations";

describe("expanded specialization catalogue", () => {
  it("adds six distinct eight-lesson specialization paths after the 39 core lessons", () => {
    expect(materials).toHaveLength(87);
    expect(new Set(materials.map((material) => material.id)).size).toBe(87);
    expect(Object.values(specializationMeta)).toHaveLength(6);
    Object.values(specializationMeta).forEach((track) => expect(materials.filter((material) => material.specialization === track.id)).toHaveLength(8));
  });

  it("provides story-led sections, resources, and quizzes for every specialization lesson", () => {
    materials.filter((material) => material.specialization).forEach((material) => {
      expect(material.sections).toHaveLength(4);
      expect(material.resources?.length).toBeGreaterThan(0);
      expect(material.quiz).toHaveLength(2);
    });
  });

  it("keeps a track recommendation focused on its priority category", () => {
    const cloud = getLearningRecommendations(materials, [], {}, "cloud-operator");
    expect(cloud.some((item) => item.material.category === "Cloud & DevOps untuk AI")).toBe(true);
    expect(learningGoals.some((goal) => goal.id === "creative-ai-builder")).toBe(true);
  });
});
