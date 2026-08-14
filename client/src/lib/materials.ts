// Style reminder: Paper Playground — the live catalogue keeps only published tracks; reserved tracks stay visible through specialization metadata.

import { specializationMaterials } from "./specializationMaterials";

export type MaterialLevel = "Pemula" | "Menengah" | "Lanjut";

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type Material = {
  id: number;
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
  "Cloud Computing AI": { emoji: "☁", level: "Menengah" },
  "Data Analyst & Data Engineering": { emoji: "▦", level: "Menengah" },
  "AI Product Builder": { emoji: "▱", level: "Menengah" },
  "Automation Specialist": { emoji: "↻", level: "Menengah" },
  "Cyber Security AI": { emoji: "◆", level: "Menengah" },
  "Creative AI & Content Systems": { emoji: "✺", level: "Menengah" },
};

export const materials: Material[] = specializationMaterials;

export const categories = ["Semua kategori", ...Object.keys(categoryMeta)];
export const levels = ["Semua level", "Pemula", "Menengah", "Lanjut"];
