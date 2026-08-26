import type { Material, MaterialLevel, QuizQuestion } from "./materials";
import type { SpecializationId } from "./specializations";
import { priorityIntensiveDeepening } from "./priorityIntensiveDeepening";

export type IntensiveSource = { label: string; url: string; note: string };

export type IntensiveUnit = {
  title: string;
  decision: string;
  scenario: string;
  exercise: string;
};

export type IntensiveChapter = {
  title: string;
  level: MaterialLevel;
  focus: string;
  artifact: string;
  guardrail: string;
  sources: readonly IntensiveSource[];
  units: readonly IntensiveUnit[];
  opening: string;
  caseStudy: {
    title: string;
    narrative: string;
    artifact: string;
    teachingPoint: string;
    questions: readonly [string, string, string];
  };
};

export type IntensiveCourseDefinition = {
  specialization: Exclude<SpecializationId, "ai-engineering" | "ai-security">;
  label: string;
  emoji: string;
  baseId: number;
  prologue: IntensiveChapter;
  chapters: readonly IntensiveChapter[];
};

const fiveLayers = (chapter: IntensiveChapter, unit: IntensiveUnit, ordinal: string) => [
  { heading: "Ngobrol dulu", body: `${unit.title} adalah bagian dari cara kerja ${chapter.focus}. Subbab ${ordinal} tidak meminta kamu menghafal istilah, tetapi membantu kamu memahami keputusan apa yang sedang dibuat dan dampak apa yang ikut berubah.` },
  { heading: "Bedah mekanisme dan trade-off", body: unit.decision },
  { heading: "Skenario tim", body: unit.scenario },
  { heading: "Latihan berbasis artefak", body: `${unit.exercise} Simpan hasilnya sebagai bagian dari ${chapter.artifact}, sehingga orang lain bisa meninjau asumsi, pilihan, dan langkah berikutnya.` },
  { heading: "Batas aman dan pemeriksaan", body: `${chapter.guardrail} Sebelum lanjut, tanyakan: bukti apa yang mendukung keputusan ini, siapa owner-nya, dan apa jalan mundurnya jika asumsi ternyata salah?` },
];

const quiz = (unit: IntensiveUnit, chapter: IntensiveChapter): QuizQuestion[] => [
  { question: `Pada subbab “${unit.title}”, langkah kerja yang paling kuat adalah…`, options: [unit.decision, "menyalin konfigurasi atau keputusan tanpa meninjau konteks", "menganggap satu hasil awal sebagai bukti final"], answer: 0, explanation: `Benar. ${chapter.focus}` },
  { question: "Jika bukti, izin, atau dampak belum jelas, tindakan yang sehat adalah…", options: ["berhenti sejenak, dokumentasikan pertanyaan, lalu minta konteks atau gunakan data/lab yang aman", "melanjutkan karena masalah mungkin akan selesai sendiri", "menyembunyikan ketidakpastian agar terlihat cepat"], answer: 0, explanation: "Course ini menilai keputusan yang dapat dipertanggungjawabkan, bukan sekadar kecepatan." },
];

const materialFrom = (course: IntensiveCourseDefinition, chapter: IntensiveChapter, chapterIndex: number, unit: IntensiveUnit, unitIndex: number, isPrologue: boolean): Material => {
  const chapterDisplay = isPrologue ? "Prolog" : String(chapterIndex);
  const title = `${chapterDisplay}.${unitIndex + 1} · ${unit.title}`;
  const displayNumber = isPrologue ? unitIndex + 1 : 12 + ((chapterIndex - 1) * 12) + unitIndex + 1;
  const id = isPrologue ? course.baseId + unitIndex : course.baseId + 12 + ((chapterIndex - 1) * 12) + unitIndex;
  const category = isPrologue ? `${course.label} Intensif · Bab Prolog — Sebelum Masuk Course Inti` : `${course.label} Intensif · Bab ${chapterIndex} — ${chapter.title}`;
  return {
    id,
    displayNumber,
    title,
    category,
    specialization: course.specialization,
    level: chapter.level,
    minutes: 12 + ((chapterIndex + unitIndex) % 8),
    emoji: isPrologue ? "◌" : course.emoji,
    summary: `${unit.title} dibahas sebagai keputusan nyata dalam ${chapter.focus}. Kamu akan meninggalkan subbab ini dengan artefak kecil, pertanyaan review, dan batas kerja yang jelas.`,
    analogy: `Anggap ${unit.title.toLowerCase()} sebagai satu titik pemeriksaan dalam sistem yang lebih besar: pilihan kecil di sini memengaruhi kualitas, biaya, kepercayaan, dan kemampuan tim untuk memperbaiki masalah nanti.`,
    sections: fiveLayers(chapter, unit, `${chapterDisplay}.${unitIndex + 1}`),
    deepDive: priorityIntensiveDeepening[id],
    chapterLecture: unitIndex === 0 ? { title: isPrologue ? `Mulai dari konteks ${course.label}` : `Pembukaan Bab ${chapterIndex}: ${chapter.title}`, body: chapter.opening, questions: ["Keputusan apa yang menjadi fokus checkpoint ini?", "Artefak apa yang akan kamu buat?", "Batas apa yang perlu dijaga sebelum mulai praktik?"] } : undefined,
    caseStudy: unitIndex === 0 ? { phase: `${course.label} · ${isPrologue ? "Bab Prolog" : `Bab ${chapterIndex}`}`, title: chapter.caseStudy.title, narrative: chapter.caseStudy.narrative, artifactTitle: `Artefak checkpoint: ${chapter.artifact}`, artifact: chapter.caseStudy.artifact, teachingPoint: chapter.caseStudy.teachingPoint, guidedQuestions: [...chapter.caseStudy.questions] } : undefined,
    resources: [...chapter.sources],
    quiz: quiz(unit, chapter),
  };
};

export function createIntensiveCourseMaterials(course: IntensiveCourseDefinition): Material[] {
  if (course.prologue.units.length !== 12) throw new Error(`${course.label} prologue harus berisi 12 subbab.`);
  if (course.chapters.length !== 12) throw new Error(`${course.label} harus berisi 12 checkpoint inti.`);
  course.chapters.forEach((chapter, index) => {
    if (chapter.units.length !== 12) throw new Error(`${course.label} Bab ${index + 1} harus berisi 12 subbab.`);
  });
  return [
    ...course.prologue.units.map((unit, index) => materialFrom(course, course.prologue, 0, unit, index, true)),
    ...course.chapters.flatMap((chapter, index) => chapter.units.map((unit, unitIndex) => materialFrom(course, chapter, index + 1, unit, unitIndex, false))),
  ];
}

export const legacyMaterialSuccessors: Record<number, number> = {
  40: 5012, 41: 5013, 42: 5014, 43: 5015, 44: 5016, 45: 5017, 46: 5018, 47: 5019,
  48: 6012, 49: 6013, 50: 6014, 51: 6015, 52: 6016, 53: 6017, 54: 6018, 55: 6019,
  56: 7012, 57: 7013, 58: 7014, 59: 7015, 60: 7016, 61: 7017, 62: 7018, 63: 7019,
  64: 8012, 65: 8013, 66: 8014, 67: 8015, 68: 8016, 69: 8017, 70: 8018, 71: 8019,
  80: 9012, 81: 9013, 82: 9014, 83: 9015, 84: 9016, 85: 9017, 86: 9018, 87: 9019,
};

export const intensiveCourseCategory = (label: string, chapter: number | "Prolog", title?: string) =>
  chapter === "Prolog" ? `${label} Intensif · Bab Prolog — Sebelum Masuk Course Inti` : `${label} Intensif · Bab ${chapter} — ${title ?? ""}`;
