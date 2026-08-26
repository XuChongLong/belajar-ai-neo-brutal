import { describe, expect, it } from "vitest";
import { materials } from "./materials";
import { courseJourneys, getCourseNextStep, getCoursePrerequisiteMap, getCourseSourceMap, getCourseStartRecommendation, getEvidenceChecklist, getEvidenceKey } from "./courseJourney";
import { specializationOrder } from "./specializations";

describe("Course Journey", () => {
  it("gives every active course a learner fit, prerequisites, outcomes, and capstone evidence", () => {
    specializationOrder.forEach((specialization) => {
      const journey = courseJourneys[specialization];
      expect(journey.fitFor.length).toBeGreaterThan(30);
      expect(journey.prerequisites.length).toBeGreaterThanOrEqual(2);
      expect(journey.outcomes).toHaveLength(3);
      expect(journey.capstone.evidence).toHaveLength(3);
      expect(journey.estimatedHours).toBeGreaterThan(0);
    });
  });

  it("derives traceable sources and a reusable evidence checklist from published material", () => {
    const cloudMaterial = materials.find((material) => material.specialization === "cloud-devops");
    expect(cloudMaterial).toBeDefined();
    expect(getCourseSourceMap(materials, "cloud-devops").length).toBeGreaterThanOrEqual(6);
    expect(getEvidenceKey(cloudMaterial!)).toContain("cloud-devops:");
    expect(getEvidenceChecklist(cloudMaterial!)).toHaveLength(4);
  });

  it("builds a valid Source Map for every active course with published source material", () => {
    specializationOrder.forEach((specialization) => {
      const sourceMap = getCourseSourceMap(materials, specialization);
      expect(sourceMap.length).toBeGreaterThan(0);
      sourceMap.forEach((source) => {
        expect(source.label.length).toBeGreaterThan(1);
        expect(source.url).toMatch(/^https?:\/\//);
        expect(source.checkpoints.length).toBeGreaterThan(0);
      });
    });
  });

  it("keeps prerequisite advice soft and selects the first unfinished course step deterministically", () => {
    const cloudMap = getCoursePrerequisiteMap("cloud-devops");
    expect(cloudMap.recommendedBefore.map((item) => item.course)).toContain("ai-engineering");
    expect(cloudMap.canContinueTo.map((item) => item.course)).toContain("ai-security");

    const cloudMaterials = materials.filter((material) => material.specialization === "cloud-devops").sort((left, right) => left.id - right.id);
    expect(getCourseNextStep(materials, "cloud-devops", [])?.id).toBe(cloudMaterials[0]?.id);
    expect(getCourseNextStep(materials, "cloud-devops", [cloudMaterials[0]!.id])?.id).toBe(cloudMaterials[1]?.id);
  });

  it("changes soft course preparation advice after the related course introduction is completed", () => {
    const aiEngineeringIntro = materials.filter((material) => material.specialization === "ai-engineering").sort((left, right) => left.id - right.id)[0]!;
    const before = getCourseStartRecommendation(materials, "cloud-devops", []);
    const after = getCourseStartRecommendation(materials, "cloud-devops", [aiEngineeringIntro.id]);

    expect(before.readyForCorePath).toBe(false);
    expect(before.preparation[0]?.course).toBe("ai-engineering");
    expect(before.preparation[0]?.material.id).toBe(aiEngineeringIntro.id);
    expect(after.readyForCorePath).toBe(true);
    expect(after.preparation).toEqual([]);
    expect(after.primary?.specialization).toBe("cloud-devops");
  });
});
