import { describe, expect, it } from "vitest";
import { buildProjectBrief, createStarterFiles, starterTemplates } from "./prdMakerTemplates";

describe("PRD Maker starter templates", () => {
  it("creates every requested project document with a generated PRD when supplied", () => {
    const files = createStarterFiles(buildProjectBrief(starterTemplates[0], "Kelas Pintar"), "# PRD asli");
    expect(Object.keys(files)).toEqual(["prd.md", "architecture.md", "rules.md", "design.md", "security/qc.md", "todo.md", "workflow.md", "personality.mdd"]);
    expect(files["prd.md"]).toBe("# PRD asli");
    expect(files["architecture.md"]).toContain("Kelas Pintar");
  });

  it("keeps an actionable fallback PRD when no provider output exists", () => {
    const files = createStarterFiles(buildProjectBrief(starterTemplates[1], "Agent Rapi"));
    expect(files["prd.md"]).toContain("## Masalah");
    expect(files["workflow.md"]).toContain("Mulai dari mana");
  });
});
