// Style reminder: Paper Playground — the live catalogue keeps only published tracks; reserved tracks stay visible through specialization metadata.

import { specializationMaterials } from "./specializationMaterials";
import { aiEngineeringPdfMaterials } from "./aiEngineeringPdfMaterials";
import { cyberSecurityMaterials } from "./cyberSecurityCourseMaterials";
import type { ChainedCaseStudy } from "./employeePolicyAssistantCaseStudy";
import type { AiEngineeringChapterLecture } from "./aiEngineeringChapterLectures";
import type { AiEngineeringBookContext } from "./aiEngineeringSublessonBookContexts";

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
  chapterLecture?: AiEngineeringChapterLecture;
  bookContext?: AiEngineeringBookContext;
  caseStudy?: ChainedCaseStudy;
  diagram?: { src: string; alt: string; caption: string; note: string };
  diagramQuiz?: QuizQuestion;
  resources?: { label: string; url: string; note?: string }[];
  quiz: QuizQuestion[];
};

export const getFocusedCatalogueHref = (specialization?: Material["specialization"]) =>
  specialization ? `/materi?jurusan=${specialization}` : "/materi";

export const categoryMeta: Record<string, { emoji: string; level: MaterialLevel }> = {
  "AI Engineering · Bab 1 — Memutuskan Apa yang Layak Dibangun": { emoji: "✦", level: "Pemula" },
  "AI Engineering · Bab 2 — Memahami Foundation Model": { emoji: "✦", level: "Pemula" },
  "AI Engineering · Bab 3 — Fondasi Evaluasi": { emoji: "✦", level: "Pemula" },
  "AI Engineering · Bab 4 — Evaluation Pipeline yang Andal": { emoji: "✦", level: "Menengah" },
  "AI Engineering · Bab 5 — Prompt Engineering dan Pertahanan": { emoji: "✦", level: "Menengah" },
  "AI Engineering · Bab 6 — Context Engineering, RAG, dan Agent": { emoji: "✦", level: "Menengah" },
  "AI Engineering · Bab 7 — Finetuning dan Adaptasi Model": { emoji: "✦", level: "Menengah" },
  "AI Engineering · Bab 8 — Data Engineering untuk AI": { emoji: "✦", level: "Menengah" },
  "AI Engineering · Bab 9 — Inference Cepat dan Hemat": { emoji: "✦", level: "Lanjut" },
  "AI Engineering · Bab 10 — Sistem Produksi dan Feedback Loop": { emoji: "✦", level: "Lanjut" },
  "Cloud Computing AI": { emoji: "☁", level: "Menengah" },
  "Data Analyst & Data Engineering": { emoji: "▦", level: "Menengah" },
  "AI Product Builder": { emoji: "▱", level: "Menengah" },
  "Automation Specialist": { emoji: "↻", level: "Menengah" },
  "Cyber Security AI": { emoji: "◆", level: "Menengah" },
  "Cyber Security Intensif · Bab Prolog — Sebelum Masuk Course Inti": { emoji: "◌", level: "Pemula" },
  "Cyber Security Intensif · Bab 1 — Kontrak Belajar, Etika, dan Cara Berpikir Risiko": { emoji: "◆", level: "Pemula" },
  "Cyber Security Intensif · Bab 2 — Peta Profesi, Catatan, dan Metodologi Kerja": { emoji: "◆", level: "Pemula" },
  "Cyber Security Intensif · Bab 3 — Jaringan dari Paket ke Keputusan": { emoji: "◆", level: "Pemula" },
  "Cyber Security Intensif · Bab 4 — Lab Linux/Kali yang Bersih dan Terpulihkan": { emoji: "◆", level: "Pemula" },
  "Cyber Security Intensif · Bab 5 — Linux Praktis untuk Administrasi Aman": { emoji: "◆", level: "Pemula" },
  "Cyber Security Intensif · Bab 6 — Akun, Hak Akses, dan Hygiene Endpoint": { emoji: "◆", level: "Pemula" },
  "Cyber Security Intensif · Bab 7 — Observabilitas Jaringan dan Inventaris Aset": { emoji: "◆", level: "Menengah" },
  "Cyber Security Intensif · Bab 8 — Wi-Fi dan Traffic sebagai Permukaan Keamanan": { emoji: "◆", level: "Menengah" },
  "Cyber Security Intensif · Bab 9 — Web: Input, Session, dan Otorisasi": { emoji: "◆", level: "Menengah" },
  "Cyber Security Intensif · Bab 10 — Asset Discovery dan OSINT yang Beretika": { emoji: "◆", level: "Menengah" },
  "Cyber Security Intensif · Bab 11 — Vulnerability Management Tanpa Sensasionalisme": { emoji: "◆", level: "Menengah" },
  "Cyber Security Intensif · Bab 12 — Konfigurasi Sistem dan Identity Organisasi": { emoji: "◆", level: "Menengah" },
  "Cyber Security Intensif · Bab 13 — Rahasia, Dependency, dan Supply Chain": { emoji: "◆", level: "Menengah" },
  "Cyber Security Intensif · Bab 14 — Python, PowerShell, dan Automasi Read-Only": { emoji: "◆", level: "Menengah" },
  "Cyber Security Intensif · Bab 15 — Kode Aman dan Kesadaran Memori": { emoji: "◆", level: "Menengah" },
  "Cyber Security Intensif · Bab 16 — Logs, Telemetry, dan SOC Triage": { emoji: "◆", level: "Menengah" },
  "Cyber Security Intensif · Bab 17 — Incident Response dan Responsible Disclosure": { emoji: "◆", level: "Lanjut" },
  "Cyber Security Intensif · Bab 18 — AI, Agent, dan Input yang Tidak Tepercaya": { emoji: "◆", level: "Lanjut" },
  "Cyber Security Intensif · Bab 19 — IoT, Perangkat Kecil, dan Aset Fisik": { emoji: "◆", level: "Lanjut" },
  "Cyber Security Intensif · Bab 20 — Capstone: Rencana Security yang Bisa Dipertanggungjawabkan": { emoji: "◆", level: "Lanjut" },
  "Creative AI & Content Systems": { emoji: "✺", level: "Menengah" },
};

export const materials: Material[] = [...aiEngineeringPdfMaterials, ...specializationMaterials, ...cyberSecurityMaterials];

export const categories = ["Semua kategori", ...Object.keys(categoryMeta)];
export const levels = ["Semua level", "Pemula", "Menengah", "Lanjut"];
