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

const cloudIntensiveCategoryMeta: Record<string, { emoji: string; level: MaterialLevel }> = {
  "Cloud Computing AI Intensif · Bab Prolog — Sebelum Masuk Course Inti": { emoji: "◌", level: "Pemula" },
  "Cloud Computing AI Intensif · Bab 1 — Peta Sistem dan Keputusan Arsitektur": { emoji: "☁", level: "Pemula" },
  "Cloud Computing AI Intensif · Bab 2 — Environment, Runtime, dan Konfigurasi": { emoji: "☁", level: "Pemula" },
  "Cloud Computing AI Intensif · Bab 3 — Container dan Workload yang Dapat Dipindah": { emoji: "☁", level: "Menengah" },
  "Cloud Computing AI Intensif · Bab 4 — Network, Edge, dan Jalur Request": { emoji: "☁", level: "Menengah" },
  "Cloud Computing AI Intensif · Bab 5 — Identity, Secret, dan Akses Minimum": { emoji: "☁", level: "Menengah" },
  "Cloud Computing AI Intensif · Bab 6 — Infrastructure as Code dan Perubahan Terkendali": { emoji: "☁", level: "Menengah" },
  "Cloud Computing AI Intensif · Bab 7 — CI/CD, Release, dan Rollback": { emoji: "☁", level: "Menengah" },
  "Cloud Computing AI Intensif · Bab 8 — Data, Storage, dan Lifecycle": { emoji: "☁", level: "Menengah" },
  "Cloud Computing AI Intensif · Bab 9 — Observability dan Sinyal Operasi": { emoji: "☁", level: "Menengah" },
  "Cloud Computing AI Intensif · Bab 10 — Reliability dan Incident Response": { emoji: "☁", level: "Lanjut" },
  "Cloud Computing AI Intensif · Bab 11 — FinOps, Kapasitas, dan Keputusan Biaya": { emoji: "☁", level: "Menengah" },
  "Cloud Computing AI Intensif · Bab 12 — Production Capstone: Menjalankan Layanan AI": { emoji: "☁", level: "Lanjut" },
};

const dataIntensiveCategoryMeta: Record<string, { emoji: string; level: MaterialLevel }> = {
  "Data Analyst & Data Engineering Intensif · Bab Prolog — Sebelum Masuk Course Inti": { emoji: "◌", level: "Pemula" },
  "Data Analyst & Data Engineering Intensif · Bab 1 — Pertanyaan, Metrik, dan Kontrak Keputusan": { emoji: "▦", level: "Pemula" },
  "Data Analyst & Data Engineering Intensif · Bab 2 — Spreadsheet dan SQL untuk Membaca Kenyataan": { emoji: "▦", level: "Pemula" },
  "Data Analyst & Data Engineering Intensif · Bab 3 — Statistik, Variasi, dan Eksperimen": { emoji: "▦", level: "Menengah" },
  "Data Analyst & Data Engineering Intensif · Bab 4 — Modelling Data dan Warehouse": { emoji: "▦", level: "Menengah" },
  "Data Analyst & Data Engineering Intensif · Bab 5 — Ingestion dan Kontrak Sumber Data": { emoji: "▦", level: "Menengah" },
  "Data Analyst & Data Engineering Intensif · Bab 6 — Transformasi dengan dbt dan Data yang Dapat Ditelusuri": { emoji: "▦", level: "Menengah" },
  "Data Analyst & Data Engineering Intensif · Bab 7 — Orkestrasi, Scheduling, dan Operasi Pipeline": { emoji: "▦", level: "Menengah" },
  "Data Analyst & Data Engineering Intensif · Bab 8 — Kualitas Data, Lineage, dan Observability": { emoji: "▦", level: "Menengah" },
  "Data Analyst & Data Engineering Intensif · Bab 9 — Privacy, Governance, dan Akses Data": { emoji: "▦", level: "Menengah" },
  "Data Analyst & Data Engineering Intensif · Bab 10 — BI, Storytelling, dan Keputusan": { emoji: "▦", level: "Menengah" },
  "Data Analyst & Data Engineering Intensif · Bab 11 — Performa, Biaya, dan Keberlanjutan Data": { emoji: "▦", level: "Menengah" },
  "Data Analyst & Data Engineering Intensif · Bab 12 — Data Product Capstone: Dari Pertanyaan ke Keputusan": { emoji: "▦", level: "Lanjut" },
};

const productIntensiveCategoryMeta: Record<string, { emoji: string; level: MaterialLevel }> = {
  "AI Product Builder Intensif · Bab Prolog — Sebelum Masuk Course Inti": { emoji: "◌", level: "Pemula" },
  "AI Product Builder Intensif · Bab 1 — Discovery dan Masalah yang Layak Dibantu AI": { emoji: "▱", level: "Pemula" },
  "AI Product Builder Intensif · Bab 2 — Problem Framing dan Outcome": { emoji: "▱", level: "Pemula" },
  "AI Product Builder Intensif · Bab 3 — Riset Pengguna dan Bukti Workflow": { emoji: "▱", level: "Pemula" },
  "AI Product Builder Intensif · Bab 4 — UX AI, Flow, dan Ekspektasi Pengguna": { emoji: "▱", level: "Menengah" },
  "AI Product Builder Intensif · Bab 5 — PRD AI, Scope, dan Kontrak Build": { emoji: "▱", level: "Menengah" },
  "AI Product Builder Intensif · Bab 6 — Data, Policy, dan Risiko Produk AI": { emoji: "▱", level: "Menengah" },
  "AI Product Builder Intensif · Bab 7 — Prototype dan Eksperimen Nilai": { emoji: "▱", level: "Menengah" },
  "AI Product Builder Intensif · Bab 8 — Evaluasi Kualitas, Safety, dan Kepercayaan": { emoji: "▱", level: "Menengah" },
  "AI Product Builder Intensif · Bab 9 — Metrik Produk, Eksperimen, dan Pembelajaran": { emoji: "▱", level: "Menengah" },
  "AI Product Builder Intensif · Bab 10 — Human-in-the-Loop dan Operasi Kepercayaan": { emoji: "▱", level: "Menengah" },
  "AI Product Builder Intensif · Bab 11 — Launch, Monitoring, dan Product Operations": { emoji: "▱", level: "Lanjut" },
  "AI Product Builder Intensif · Bab 12 — AI Product Capstone: Dari Bukti ke Launch": { emoji: "▱", level: "Lanjut" },
};

const automationIntensiveCategoryMeta: Record<string, { emoji: string; level: MaterialLevel }> = {
  "Automation Specialist Intensif · Bab Prolog — Sebelum Masuk Course Inti": { emoji: "◌", level: "Pemula" },
  "Automation Specialist Intensif · Bab 1 — Process Discovery dan Kandidat Otomasi": { emoji: "↻", level: "Pemula" },
  "Automation Specialist Intensif · Bab 2 — Event, Trigger, dan Desain Flow": { emoji: "↻", level: "Pemula" },
  "Automation Specialist Intensif · Bab 3 — Data Mapping dan Kontrak Antaraplikasi": { emoji: "↻", level: "Pemula" },
  "Automation Specialist Intensif · Bab 4 — API, Webhook, dan Credential Hygiene": { emoji: "↻", level: "Menengah" },
  "Automation Specialist Intensif · Bab 5 — Error Handling, Retry, dan Recovery": { emoji: "↻", level: "Menengah" },
  "Automation Specialist Intensif · Bab 6 — Human-in-the-Loop dan Approval Flow": { emoji: "↻", level: "Menengah" },
  "Automation Specialist Intensif · Bab 7 — Dokumentasi, Observability, dan Ownership": { emoji: "↻", level: "Menengah" },
  "Automation Specialist Intensif · Bab 8 — Testing, Versioning, dan Perubahan Aman": { emoji: "↻", level: "Menengah" },
  "Automation Specialist Intensif · Bab 9 — Agentic Automation dan Batas Tool": { emoji: "↻", level: "Lanjut" },
  "Automation Specialist Intensif · Bab 10 — Scale, Governance, dan Portfolio Workflow": { emoji: "↻", level: "Lanjut" },
  "Automation Specialist Intensif · Bab 11 — Security, Privacy, dan Audit Workflow": { emoji: "↻", level: "Lanjut" },
  "Automation Specialist Intensif · Bab 12 — Automation Capstone: Workflow yang Dapat Dipercaya": { emoji: "↻", level: "Lanjut" },
};

const creativeIntensiveCategoryMeta: Record<string, { emoji: string; level: MaterialLevel }> = {
  "Creative AI & Content Systems Intensif · Bab Prolog — Sebelum Masuk Course Inti": { emoji: "◌", level: "Pemula" },
  "Creative AI & Content Systems Intensif · Bab 1 — Strategi Konten, Audience, dan Nilai": { emoji: "✺", level: "Pemula" },
  "Creative AI & Content Systems Intensif · Bab 2 — Brand Voice dan Sistem Editorial": { emoji: "✺", level: "Pemula" },
  "Creative AI & Content Systems Intensif · Bab 3 — Riset, Fakta, dan Narrative Brief": { emoji: "✺", level: "Pemula" },
  "Creative AI & Content Systems Intensif · Bab 4 — Ideation, Prompt System, dan Versioning": { emoji: "✺", level: "Menengah" },
  "Creative AI & Content Systems Intensif · Bab 5 — Writing System: Outline, Draft, dan Edit": { emoji: "✺", level: "Menengah" },
  "Creative AI & Content Systems Intensif · Bab 6 — Visual Direction, Design System, dan Accessibility": { emoji: "✺", level: "Menengah" },
  "Creative AI & Content Systems Intensif · Bab 7 — Audio, Video, dan Storyboard": { emoji: "✺", level: "Menengah" },
  "Creative AI & Content Systems Intensif · Bab 8 — Quality Review, Brand Safety, dan Moderation": { emoji: "✺", level: "Menengah" },
  "Creative AI & Content Systems Intensif · Bab 9 — Rights, Consent, dan Intellectual Property": { emoji: "✺", level: "Menengah" },
  "Creative AI & Content Systems Intensif · Bab 10 — Provenance, Content Credentials, dan Transparency": { emoji: "✺", level: "Menengah" },
  "Creative AI & Content Systems Intensif · Bab 11 — Distribusi, Community, dan Content Learning Loop": { emoji: "✺", level: "Menengah" },
  "Creative AI & Content Systems Intensif · Bab 12 — Creative Systems Capstone: Paket Konten Transparan": { emoji: "✺", level: "Lanjut" },
};

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
  ...cloudIntensiveCategoryMeta,
  ...dataIntensiveCategoryMeta,
  ...productIntensiveCategoryMeta,
  ...automationIntensiveCategoryMeta,
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
  ...creativeIntensiveCategoryMeta,
};

export const materials: Material[] = [...aiEngineeringPdfMaterials, ...specializationMaterials, ...cyberSecurityMaterials];

export const categories = ["Semua kategori", ...Object.keys(categoryMeta)];
export const levels = ["Semua level", "Pemula", "Menengah", "Lanjut"];
