// Style reminder: Paper Playground — the live catalogue keeps only published tracks; reserved tracks stay visible through specialization metadata.

import { specializationMaterials } from "./specializationMaterials";
import { aiEngineeringPdfMaterials } from "./aiEngineeringPdfMaterials";

export type MaterialLevel = "Pemula" | "Menengah" | "Lanjut";

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type Material = {
  id: number;
  displayNumber?: number;
  title: string;
  category: string;
  specialization?: import("./specializations").SpecializationId;
  level: MaterialLevel;
  minutes: number;
  emoji: string;
  summary: string;
  analogy: string;
  sections: { heading: string; body: string }[];
  diagram?: { src: string; alt: string; caption: string; note: string };
  diagramQuiz?: QuizQuestion;
  resources?: { label: string; url: string; note?: string }[];
  quiz: QuizQuestion[];
};

export const categoryMeta: Record<string, { emoji: string; level: MaterialLevel }> = {
  "AI Engineering · Bab 01 — Memutuskan Apa yang Layak Dibangun": { emoji: "✦", level: "Pemula" },
  "AI Engineering · Bab 02 — Memahami Foundation Model": { emoji: "✦", level: "Pemula" },
  "AI Engineering · Bab 03 — Fondasi Evaluasi": { emoji: "✦", level: "Pemula" },
  "AI Engineering · Bab 04 — Evaluation Pipeline yang Andal": { emoji: "✦", level: "Menengah" },
  "AI Engineering · Bab 05 — Prompt Engineering dan Pertahanan": { emoji: "✦", level: "Menengah" },
  "AI Engineering · Bab 06 — Context Engineering, RAG, dan Agent": { emoji: "✦", level: "Menengah" },
  "AI Engineering · Bab 07 — Finetuning dan Adaptasi Model": { emoji: "✦", level: "Menengah" },
  "AI Engineering · Bab 08 — Data Engineering untuk AI": { emoji: "✦", level: "Menengah" },
  "AI Engineering · Bab 09 — Inference Cepat dan Hemat": { emoji: "✦", level: "Lanjut" },
  "AI Engineering · Bab 10 — Sistem Produksi dan Feedback Loop": { emoji: "✦", level: "Lanjut" },
  "Cloud Computing AI": { emoji: "☁", level: "Menengah" },
  "Data Analyst & Data Engineering": { emoji: "▦", level: "Menengah" },
  "AI Product Builder": { emoji: "▱", level: "Menengah" },
  "Automation Specialist": { emoji: "↻", level: "Menengah" },
  "Cyber Security AI": { emoji: "◆", level: "Menengah" },
  "Creative AI & Content Systems": { emoji: "✺", level: "Menengah" },
};

export const materials: Material[] = [...aiEngineeringPdfMaterials, ...specializationMaterials];

export const categories = ["Semua kategori", ...Object.keys(categoryMeta)];
export const levels = ["Semua level", "Pemula", "Menengah", "Lanjut"];
