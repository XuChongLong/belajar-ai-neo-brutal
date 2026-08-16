import { describe, expect, it } from "vitest";
import { aiEngineeringPdfMaterials } from "./aiEngineeringPdfMaterials";
import { searchMaterialContent } from "./fullTextSearch";

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
});
