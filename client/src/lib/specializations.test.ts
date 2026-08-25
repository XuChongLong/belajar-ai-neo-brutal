import { describe, expect, it } from "vitest";
import { categoryMeta, getFocusedCatalogueHref, materials } from "./materials";
import { getLearningRecommendations, learningGoals } from "./learningPath";
import { isSpecializationId, materialMatchesSpecialization, specializationMeta } from "./specializations";

describe("expanded specialization catalogue", () => {
  it("adds intensive Cloud plus the AI Engineering and Cyber Security curricula", () => {
    expect(materials).toHaveLength(648);
    expect(new Set(materials.map((material) => material.id)).size).toBe(648);
    expect(Object.values(specializationMeta)).toHaveLength(7);
    expect(materials.filter((material) => material.specialization === "ai-engineering")).toHaveLength(60);
    expect(materials.filter((material) => material.specialization === "ai-security")).toHaveLength(252);
    expect(materials.filter((material) => material.specialization === "cloud-devops")).toHaveLength(156);
    expect(materials.filter((material) => material.specialization === "data-engineering")).toHaveLength(156);
    Object.values(specializationMeta).filter((track) => !["ai-engineering", "ai-security", "cloud-devops", "data-engineering"].includes(track.id)).forEach((track) => expect(materials.filter((material) => material.specialization === track.id)).toHaveLength(8));
  });

  it("provides story-led sections, resources, and quizzes for every specialization lesson", () => {
    materials.filter((material) => material.specialization && material.id >= 40).forEach((material) => {
      expect(material.sections.length).toBeGreaterThanOrEqual(4);
      expect(material.resources?.length).toBeGreaterThan(0);
      expect(material.quiz).toHaveLength(2);
    });
  });

  it("keeps the Cyber Security prologue available as the first filterable category", () => {
    const prologue = "Cyber Security Intensif · Bab Prolog — Sebelum Masuk Course Inti";
    expect(categoryMeta[prologue]).toEqual({ emoji: "◌", level: "Pemula" });
    expect(materials.filter((material) => material.category === prologue)).toHaveLength(12);
    expect(materials.findIndex((material) => material.category === prologue)).toBeLessThan(materials.findIndex((material) => material.category.includes("Bab 1 — Kontrak")));
  });

  it("keeps a track recommendation focused on its priority category", () => {
    const cloud = getLearningRecommendations(materials, [], {}, "cloud-operator");
    expect(cloud.some((item) => item.material.category.startsWith("Cloud Computing AI Intensif"))).toBe(true);
    expect(learningGoals.some((goal) => goal.id === "creative-ai-builder")).toBe(true);
  });

  it("accepts only known specialization routes and filters their own materials", () => {
    expect(isSpecializationId("ai-engineering")).toBe(true);
    expect(isSpecializationId("cloud-devops")).toBe(true);
    expect(isSpecializationId("not-a-track")).toBe(false);
    expect(getLearningRecommendations(materials, [], {}, "ai-engineer").some((item) => item.material.specialization === "ai-engineering")).toBe(true);
    expect(materials.filter((material) => materialMatchesSpecialization(material, "ai-engineering"))).toHaveLength(60);
    expect(materials.filter((material) => materialMatchesSpecialization(material, "cloud-devops"))).toHaveLength(156);
    expect(materials.filter((material) => materialMatchesSpecialization(material, "data-engineering"))).toHaveLength(156);
    expect(materials.filter((material) => materialMatchesSpecialization(material, "ai-security"))).toHaveLength(252);
    expect(materials.filter((material) => materialMatchesSpecialization(material, null))).toHaveLength(648);
    expect(getFocusedCatalogueHref("ai-engineering")).toBe("/materi?jurusan=ai-engineering");
    expect(getFocusedCatalogueHref("cloud-devops")).toBe("/materi?jurusan=cloud-devops");
    expect(getFocusedCatalogueHref()).toBe("/materi");
  });
});
