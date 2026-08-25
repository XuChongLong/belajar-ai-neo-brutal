import { describe, expect, it } from "vitest";
import { createIntensiveCourseMaterials, legacyMaterialSuccessors, type IntensiveCourseDefinition } from "./intensiveCourseFactory";

const unit = (title: string) => ({ title, decision: `Keputusan untuk ${title} harus dapat dijelaskan lewat tujuan, bukti, owner, dan trade-off.`, scenario: `Tim latihan meninjau ${title} menggunakan data fiktif, lalu mendokumentasikan keputusan yang paling kecil namun menurunkan risiko.`, exercise: `Buat catatan singkat untuk ${title} dengan asumsi, bukti, dan langkah review.` });
const chapter = (title: string) => ({ title, level: "Pemula" as const, focus: `membuat keputusan ${title.toLowerCase()} secara terarah`, artifact: `artefak ${title.toLowerCase()}`, guardrail: "Gunakan data, akun, dan lingkungan yang kamu miliki atau telah diizinkan.", sources: [{ label: "Sumber contoh", url: "https://example.com", note: "Sumber test." }], units: Array.from({ length: 12 }, (_, index) => unit(`${title} ${index + 1}`)), opening: `Bab ${title} menjelaskan alasan, artefak, dan batas praktik sebelum melangkah lebih teknis.`, caseStudy: { title: `Kasus ${title}`, narrative: `Tim kecil menghadapi keputusan ${title.toLowerCase()} dan perlu menyatukan tujuan, bukti, owner, serta langkah pemulihan. Mereka tidak mengejar jawaban cepat; mereka membuat artefak yang dapat ditinjau dan memperbaiki sistem berdasarkan temuan.`, artifact: `Register keputusan ${title.toLowerCase()} berisi owner, asumsi, bukti, dan tindak lanjut.`, teachingPoint: "Keputusan yang kuat dapat ditelusuri dari masalah sampai langkah berikutnya.", questions: ["Apa yang diketahui?", "Siapa owner?", "Apa langkah aman berikutnya?"] as const } });

describe("intensive course factory", () => {
  it("creates a prologue plus twelve ordered checkpoints with rich material contracts", () => {
    const course: IntensiveCourseDefinition = { specialization: "cloud-devops", label: "Course Uji", emoji: "☁", baseId: 9500, prologue: chapter("Prolog"), chapters: Array.from({ length: 12 }, (_, index) => chapter(`Bab ${index + 1}`)) };
    const materials = createIntensiveCourseMaterials(course);
    expect(materials).toHaveLength(156);
    expect(materials[0]?.title).toMatch(/^Prolog\.1/);
    expect(materials[11]?.title).toMatch(/^Prolog\.12/);
    expect(materials[12]?.title).toMatch(/^1\.1/);
    expect(materials[155]?.title).toMatch(/^12\.12/);
    expect(materials.filter((material) => material.chapterLecture)).toHaveLength(13);
    expect(materials.filter((material) => material.caseStudy)).toHaveLength(13);
    materials.forEach((material) => { expect(material.sections).toHaveLength(5); expect(material.resources?.length).toBeGreaterThan(0); expect(material.quiz).toHaveLength(2); });
  });

  it("maps every old non-intensive course id to a new successor id", () => {
    expect(Object.keys(legacyMaterialSuccessors)).toHaveLength(40);
    expect(new Set(Object.values(legacyMaterialSuccessors)).size).toBe(40);
    expect(legacyMaterialSuccessors[40]).toBe(5012);
    expect(legacyMaterialSuccessors[87]).toBe(9019);
  });
});
