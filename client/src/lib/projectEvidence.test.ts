import { describe, expect, it } from "vitest";
import { normalizeCoursePortfolio, normalizeProjectEvidence } from "./projectEvidence";

describe("Project Evidence progress compatibility", () => {
  it("loads a legacy snapshot with no evidence fields as a safe empty state", () => {
    expect(normalizeProjectEvidence(undefined)).toEqual({});
    expect(normalizeCoursePortfolio(undefined)).toEqual({});
  });

  it("preserves a valid evidence and portfolio round-trip while dropping invalid entries", () => {
    const evidence = normalizeProjectEvidence({
      "cloud-devops:Bab 1": { checked: ["Konteks", "Konteks", 3], reflection: "Saya memilih perubahan yang dapat dirollback.", updatedAt: "2026-08-17T10:00:00.000Z" },
      invalid: { checked: [], reflection: 3, updatedAt: "" },
    });
    const portfolio = normalizeCoursePortfolio({
      "cloud-devops": { narrative: "Saya merangkai bukti deploy dan runbook.", selectedEvidence: ["cloud-devops:Bab 1", "cloud-devops:Bab 1"], updatedAt: "2026-08-17T10:00:00.000Z" },
      invalid: { narrative: [], selectedEvidence: [], updatedAt: "" },
    });

    expect(evidence).toEqual({ "cloud-devops:Bab 1": { checked: ["Konteks"], reflection: "Saya memilih perubahan yang dapat dirollback.", updatedAt: "2026-08-17T10:00:00.000Z" } });
    expect(portfolio).toEqual({ "cloud-devops": { narrative: "Saya merangkai bukti deploy dan runbook.", selectedEvidence: ["cloud-devops:Bab 1"], updatedAt: "2026-08-17T10:00:00.000Z" } });
  });
});
