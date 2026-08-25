import { describe, expect, it } from "vitest";
import { cloudIntensiveMaterials } from "./cloudIntensiveMaterials";
import { dataIntensiveMaterials } from "./dataIntensiveMaterials";
import { aiProductIntensiveMaterials } from "./aiProductIntensiveMaterials";
import { automationIntensiveMaterials } from "./automationIntensiveMaterials";
import { creativeIntensiveMaterials } from "./creativeIntensiveMaterials";
import { migrateLegacyCourseProgress } from "./courseProgressMigration";
import { categoryMeta, materials } from "./materials";

const courses = [
  { label: "Cloud Computing AI", materials: cloudIntensiveMaterials, legacyId: 40, successor: 5012 },
  { label: "Data Analyst & Data Engineering", materials: dataIntensiveMaterials, legacyId: 48, successor: 6012 },
  { label: "AI Product Builder", materials: aiProductIntensiveMaterials, legacyId: 56, successor: 7012 },
  { label: "Automation Specialist", materials: automationIntensiveMaterials, legacyId: 64, successor: 8012 },
  { label: "Creative AI & Content Systems", materials: creativeIntensiveMaterials, legacyId: 80, successor: 9012 },
] as const;

describe("katalog lima course intensif", () => {
  it("menjaga struktur Prolog + 12 checkpoint, konten, sumber, dan metadata filter untuk semua course", () => {
    courses.forEach((course) => {
      expect(course.materials).toHaveLength(156);
      expect(course.materials.filter((material) => material.category.includes("Bab Prolog"))).toHaveLength(12);
      expect(new Set(course.materials.map((material) => material.category)).size).toBe(13);
      expect(course.materials.filter((material) => material.chapterLecture)).toHaveLength(13);
      expect(course.materials.filter((material) => material.caseStudy)).toHaveLength(13);
      expect(categoryMeta[course.materials[0]!.category]).toEqual({ emoji: "◌", level: "Pemula" });
      course.materials.forEach((material) => {
        expect(categoryMeta[material.category]).toBeDefined();
        expect(material.sections).toHaveLength(5);
        expect(material.quiz).toHaveLength(2);
        expect(material.resources?.length).toBeGreaterThan(0);
        material.resources?.forEach((source) => expect(() => new URL(source.url)).not.toThrow());
      });
    });
  });

  it("migrates legacy progress references to the first matching core checkpoint without changing active ids", () => {
    const activeIds = new Set(materials.map((material) => material.id));
    const legacyIds = courses.map((course) => course.legacyId);
    const migrated = migrateLegacyCourseProgress({
      completed: legacyIds,
      bookmarks: legacyIds,
      scores: Object.fromEntries(legacyIds.map((id, index) => [id, 70 + index])),
      quizAttempts: Object.fromEntries(legacyIds.map((id) => [id, { score: 1, total: 2, percentage: 50, lastAttemptAt: "2026-08-25T00:00:00.000Z" }])),
      wrongQuizQuestions: Object.fromEntries(legacyIds.map((id) => [id, []])),
      activityHistory: legacyIds.map((materialId) => ({ id: `activity-${materialId}`, at: "2026-08-25T00:00:00.000Z", type: "completed" as const, materialId, title: "legacy" })),
      current: 40,
    }, activeIds);
    const successors = courses.map((course) => course.successor);
    expect(migrated.completed).toEqual(successors);
    expect(migrated.bookmarks).toEqual(successors);
    expect(Object.keys(migrated.scores ?? {}).map(Number)).toEqual(successors);
    expect(Object.keys(migrated.quizAttempts ?? {}).map(Number)).toEqual(successors);
    expect(migrated.activityHistory?.map((activity) => activity.materialId)).toEqual(successors);
    expect(migrated.current).toBe(5012);
    expect(migrateLegacyCourseProgress({ completed: [5012] }, activeIds).completed).toEqual([5012]);
  });
});
