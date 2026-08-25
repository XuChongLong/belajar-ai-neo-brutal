import type { IntensiveChapter, IntensiveCourseDefinition, IntensiveSource, IntensiveUnit } from "./intensiveCourseFactory";

export function topics(...items: readonly string[]): IntensiveUnit[] {
  if (items.length !== 12) throw new Error("Setiap checkpoint intensif harus memiliki tepat 12 topik.");
  return items.map((title) => ({
    title,
    decision: `Untuk “${title}”, jangan mulai dari tool atau template. Nyatakan tujuan, pengguna/owner yang terkena dampak, bukti yang tersedia, batas yang tidak boleh dilanggar, lalu bandingkan pilihan berdasarkan trade-off yang benar-benar relevan.`,
    scenario: `Dalam latihan tim, sebuah keputusan tentang “${title}” tampak mudah sampai ada data tidak lengkap, perubahan kebutuhan, atau risiko yang tidak tertulis. Tim menghentikan asumsi, menyusun fakta yang dapat diperiksa, lalu memilih langkah kecil yang dapat di-review dan dibatalkan bila perlu.`,
    exercise: `Buat satu kartu keputusan “${title}”: masalah, konteks, asumsi, tiga pilihan, bukti, owner, risiko, dan kriteria kapan keputusan perlu ditinjau ulang.`,
  }));
}

export function checkpoint(input: {
  title: string;
  level: IntensiveChapter["level"];
  focus: string;
  artifact: string;
  guardrail: string;
  sources: readonly IntensiveSource[];
  topics: readonly string[];
  opening: string;
  caseTitle: string;
  caseNarrative: string;
  teachingPoint: string;
  questions: readonly [string, string, string];
}): IntensiveChapter {
  return {
    title: input.title,
    level: input.level,
    focus: input.focus,
    artifact: input.artifact,
    guardrail: input.guardrail,
    sources: input.sources,
    units: topics(...input.topics),
    opening: input.opening,
    caseStudy: { title: input.caseTitle, narrative: input.caseNarrative, artifact: `Buat ${input.artifact} dalam format yang dapat dibaca rekan tim: sertakan konteks, fakta, asumsi, pilihan, owner, dan indikator review.`, teachingPoint: input.teachingPoint, questions: input.questions },
  };
}

export const defineIntensiveCourse = (course: IntensiveCourseDefinition) => course;
