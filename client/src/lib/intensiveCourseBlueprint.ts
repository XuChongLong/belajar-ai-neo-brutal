import type { IntensiveChapter, IntensiveCourseDefinition, IntensiveSource, IntensiveUnit } from "./intensiveCourseFactory";

export function topics(...items: readonly string[]): IntensiveUnit[] {
  if (items.length !== 12) throw new Error("Setiap checkpoint intensif harus memiliki tepat 12 topik.");
  return items.map((title) => ({
    title,
    decision: `Di topik “${title}”, jangan langsung kepincut tool atau template, bro. Cek dulu tujuannya apa, siapa yang kena dampak, bukti apa yang kamu punya, dan batas mana yang nggak boleh diterobos. Baru bandingkan pilihannya dengan kepala dingin.`,
    scenario: `Di tim beneran, keputusan soal “${title}” sering kelihatan gampang sampai datanya bolong, kebutuhan berubah, atau risikonya belum ditulis. Jadi jangan ngarang asumsi: kumpulkan fakta yang bisa dicek, pilih langkah kecil, lalu sisakan jalan buat review atau rollback kalau ternyata meleset.`,
    exercise: `Bikin kartu keputusan “${title}” versi kamu: masalahnya apa, konteksnya gimana, asumsi, tiga pilihan, bukti, owner, risiko, dan kapan keputusan ini perlu dicek ulang.`,
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
    caseStudy: { title: input.caseTitle, narrative: input.caseNarrative, artifact: `Bikin ${input.artifact} yang gampang dibaca teman tim: tulis konteks, fakta, asumsi, pilihan, owner, dan tanda kapan perlu dicek lagi.`, teachingPoint: input.teachingPoint, questions: input.questions },
  };
}

export const defineIntensiveCourse = (course: IntensiveCourseDefinition) => course;
