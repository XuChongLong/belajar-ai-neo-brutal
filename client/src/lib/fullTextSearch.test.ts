import { describe, expect, it } from "vitest";
import { aiEngineeringPdfMaterials } from "./aiEngineeringPdfMaterials";
import { materials } from "./materials";
import { filterCatalogMaterials, getCatalogSearchMatches, searchMaterialContent } from "./fullTextSearch";

describe("full-text material search", () => {
  it("finds specific words from the deep instruction and source context of all sixty AI Engineering lessons", () => {
    expect(searchMaterialContent(aiEngineeringPdfMaterials, "ketidaksepakatan rubrik").map((result) => result.material.id)).toContain(115);
    expect(searchMaterialContent(aiEngineeringPdfMaterials, "feature flag kill switch").map((result) => result.material.id)).toContain(158);
    expect(searchMaterialContent(aiEngineeringPdfMaterials, "kebijakan karyawan").map((result) => result.material.id)).toContain(100);
  });

  it("requires every word in a multi-word query and exposes the matched content label", () => {
    const results = searchMaterialContent(aiEngineeringPdfMaterials, "dokumen bermusuhan");
    expect(results[0].material.id).toBe(129);
    expect(["penjelasan", "konteks buku"]).toContain(results[0].matchLabel);
    expect(searchMaterialContent(aiEngineeringPdfMaterials, "kata-yang-tidak-ada")).toEqual([]);
  });

  it("finds active intensive courses through capstone outcomes and source metadata", () => {
    const capstoneResults = searchMaterialContent(materials, "Production Readiness Pack", materials.length);
    expect(capstoneResults.some((result) => result.material.specialization === "cloud-devops" && result.matchLabel === "arah course")).toBe(true);
    expect(capstoneResults.filter((result) => result.material.specialization === "cloud-devops")).toHaveLength(1);
    const sourceResults = searchMaterialContent(materials, "Well Architected", materials.length);
    expect(sourceResults.some((result) => result.material.specialization === "cloud-devops" && result.matchLabel === "sumber")).toBe(true);
  });

  it("returns the exact filtered catalogue set used by query URL and search input", () => {
    const cloud = materials.filter((material) => material.specialization === "cloud-devops");
    const capstone = getCatalogSearchMatches(cloud, "Production Readiness Pack");
    const source = getCatalogSearchMatches(cloud, "Terraform Documentation");
    expect(capstone).toHaveLength(1);
    expect(capstone[0]?.material.id).toBe(5000);
    expect(capstone[0]?.matchLabel).toBe("arah course");
    expect(source.length).toBeGreaterThan(0);
    expect(source.length).toBeLessThan(cloud.length);
    expect(source.every((result) => result.matchLabel === "sumber")).toBe(true);
  });

  it("applies query q through the same catalogue filter used by the Materials page", () => {
    const cloud = materials.filter((material) => material.specialization === "cloud-devops");
    const capstone = filterCatalogMaterials(cloud, { search: "Production Readiness Pack" });
    const source = filterCatalogMaterials(cloud, { search: "Terraform Documentation" });
    expect(capstone.map((material) => material.id)).toEqual([5000]);
    expect(source).toHaveLength(36);
    expect(source.every((material) => material.category.includes("Bab 6") || material.category.includes("Bab 7") || material.category.includes("Bab 12"))).toBe(true);
  });
});
