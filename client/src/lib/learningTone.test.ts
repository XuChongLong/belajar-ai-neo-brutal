import { describe, expect, it } from "vitest";
import { materials, rawMaterials } from "./materials";

const stopWords = new Set(["yang", "dan", "atau", "untuk", "dengan", "pada", "dari", "ini", "itu", "sebagai", "agar", "saat", "kamu", "kita", "akan", "dalam", "bisa", "tidak", "nggak", "jangan"]);

function keyTerms(text: string) {
  return new Set(text.toLowerCase().match(/[a-zà-ÿ]{4,}/g)?.filter((word) => !stopWords.has(word)) ?? []);
}

function sharedKeyTermRatio(before: string, after: string) {
  const sourceTerms = keyTerms(before);
  const renderedTerms = keyTerms(after);
  return [...sourceTerms].filter((term) => renderedTerms.has(term)).length / Math.max(sourceTerms.size, 1);
}

describe("casual Indonesian learning tone", () => {
  it("covers every published material, including Prolog and Cyber Security, without dropping structured learning blocks", () => {
    expect(materials.length).toBeGreaterThan(1000);
    expect(materials).toHaveLength(rawMaterials.length);
    expect(materials.every((material) => material.summary.startsWith("Santai dulu,"))).toBe(true);
    expect(materials.every((material) => material.analogy.startsWith("Biar kebayang:"))).toBe(true);
    expect(materials.every((material) => material.sections.length > 0 && material.sections.every((section) => section.body.startsWith("Oke,") || section.body.startsWith("Santai dulu,") || section.body.startsWith("Biar nggak") || section.body.startsWith("Nggak usah")))).toBe(true);
    expect(materials.every((material) => material.resources?.every((resource) => resource.url.startsWith("http")) ?? true)).toBe(true);
    const cyberPrologue = materials.find((material) => material.id === 180);
    const cyberCore = materials.find((material) => material.id === 200);
    expect(cyberPrologue?.summary).toContain("Santai dulu,");
    expect(cyberCore?.sections.some((section) => /izin|lab|aman|scope/i.test(section.body))).toBe(true);
  });

  it("keeps source links, learning structure, exercises, and safety context across every track", () => {
    rawMaterials.forEach((raw, index) => {
      const toned = materials[index];
      expect(toned.id).toBe(raw.id);
      expect(toned.resources).toEqual(raw.resources);
      expect(toned.sections).toHaveLength(raw.sections.length);
      expect(toned.quiz.map((question) => question.options)).toEqual(raw.quiz.map((question) => question.options));
      expect(toned.sections.every((section, sectionIndex) => section.body.length >= raw.sections[sectionIndex].body.length)).toBe(true);
    });
    const creativeSafety = materials.find((material) => /Rights, Consent, dan Intellectual Property/.test(material.category));
    expect(creativeSafety).toBeTruthy();
    expect(creativeSafety?.sections.some((section) => /consent|izin|rights|hak|provenance/i.test(section.body))).toBe(true);
    const cyberSafety = materials.find((material) => material.id === 200);
    expect(cyberSafety?.sections.some((section) => /izin|scope|lab|aset sendiri|pihak lain/i.test(section.body))).toBe(true);
  });

  it("preserves key learning content and makes sensitive domain limits explicit", () => {
    const samples = [
      { id: 100, exerciseIndex: 5, marker: "Catat asumsi" },
      { id: 5000, exerciseIndex: 3, marker: "Bikin kartu keputusan" },
      { id: 200, exerciseIndex: 3, marker: "data fiktif" },
      { id: 9108, exerciseIndex: 3, marker: "Bikin kartu keputusan" },
    ];
    samples.forEach(({ id, exerciseIndex, marker }) => {
      const raw = rawMaterials.find((material) => material.id === id)!;
      const toned = materials.find((material) => material.id === id)!;
      expect(raw).toBeTruthy();
      expect(toned.resources).toEqual(raw.resources);
      expect(toned.sections[exerciseIndex]?.body).toMatch(new RegExp(marker, "i"));
    });
    const creativeSensitive = materials.find((material) => material.id === 9108)!;
    expect(creativeSensitive.sections.at(-1)?.body).toContain("bukan nasihat hukum");
    expect(creativeSensitive.sections.at(-1)?.body).toMatch(/lisensi, consent, atribusi, dan provenance/i);
    expect(creativeSensitive.sections.at(-1)?.body).toMatch(/tahan dulu publikasinya/i);
    const cyberSensitive = materials.find((material) => material.id === 200)!;
    expect(cyberSensitive.sections.at(-1)?.body).toMatch(/lab, data fiktif, aset sendiri, atau aset yang ada izin tertulisnya/i);
    expect(cyberSensitive.sections.at(-1)?.body).toMatch(/scope belum jelas, stop dulu/i);
  });

  it("retains exercise and guardrail meaning for every representative track before and after tone rendering", () => {
    const representativeTracks = [
      { id: 100, exerciseIndex: 5, guardrailIndex: 6 },
      { id: 5000, exerciseIndex: 3, guardrailIndex: 4 },
      { id: 200, exerciseIndex: 3, guardrailIndex: 4 },
      { id: 9108, exerciseIndex: 3, guardrailIndex: 4 },
      { id: 9120, exerciseIndex: 3, guardrailIndex: 4 },
    ];
    representativeTracks.forEach(({ id, exerciseIndex, guardrailIndex }) => {
      const raw = rawMaterials.find((material) => material.id === id)!;
      const toned = materials.find((material) => material.id === id)!;
      expect(sharedKeyTermRatio(raw.sections[exerciseIndex].body, toned.sections[exerciseIndex].body)).toBeGreaterThanOrEqual(.8);
      expect(sharedKeyTermRatio(raw.sections[guardrailIndex].body, toned.sections[guardrailIndex].body)).toBeGreaterThanOrEqual(.8);
    });
  });

  it("keeps every published material's practice and guardrail sections mapped after tone rendering", () => {
    let practiceSections = 0;
    let guardrailSections = 0;
    const cyberPrologueCount = rawMaterials.filter((material) => material.category.includes("Cyber Security Intensif · Bab Prolog")).length;
    rawMaterials.forEach((raw, materialIndex) => {
      const toned = materials[materialIndex];
      expect(toned.resources).toEqual(raw.resources);
      raw.sections.forEach((section, sectionIndex) => {
        const isPractice = /latihan|praktik|giliran kamu nyoba/i.test(section.heading);
        const isGuardrail = /batas|risiko/i.test(section.heading);
        if (isPractice) {
          practiceSections += 1;
          expect(toned.sections[sectionIndex]).toBeTruthy();
          expect(sharedKeyTermRatio(section.body, toned.sections[sectionIndex].body)).toBeGreaterThanOrEqual(.8);
        }
        if (isGuardrail) {
          guardrailSections += 1;
          expect(toned.sections[sectionIndex]).toBeTruthy();
          expect(sharedKeyTermRatio(section.body, toned.sections[sectionIndex].body)).toBeGreaterThanOrEqual(.8);
        }
      });
      if (raw.category.includes("Cyber Security Intensif · Bab Prolog")) {
        expect(toned.sections.some((section) => /contoh.*aman|batas|izin|scope/i.test(section.heading + section.body))).toBe(true);
      }
    });
    expect(practiceSections).toBe(rawMaterials.length);
    expect(cyberPrologueCount).toBe(12);
    expect(guardrailSections).toBe(rawMaterials.length - cyberPrologueCount);
  });

  it("keeps distinct non-legal-advice boundaries for both Creative rights and provenance chapters", () => {
    const creativeRights = materials.find((material) => material.id === 9108)!;
    const creativeProvenance = materials.find((material) => material.id === 9120)!;
    [creativeRights, creativeProvenance].forEach((material) => {
      const boundary = material.sections.at(-1)?.body ?? "";
      expect(boundary).toContain("bukan nasihat hukum");
      expect(boundary).toMatch(/lisensi, consent, atribusi, dan provenance/i);
      expect(boundary).toMatch(/tahan dulu publikasinya/i);
    });
    expect(creativeRights.category).toMatch(/Rights, Consent/i);
    expect(creativeProvenance.category).toMatch(/Provenance/i);
  });
});
