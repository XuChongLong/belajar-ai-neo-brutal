export type SpecializationId = "ai-engineering" | "cloud-devops" | "data-engineering" | "ai-product" | "automation" | "ai-security" | "creative-ai";

export type SpecializationMeta = {
  id: SpecializationId;
  label: string;
  shortLabel: string;
  emoji: string;
  accent: string;
  intro: string;
};

export const specializationMeta: Record<SpecializationId, SpecializationMeta> = {
  "ai-engineering": { id: "ai-engineering", label: "AI Engineering", shortLabel: "AI Engineering", emoji: "✦", accent: "pink", intro: "Jalur ini sedang disiapkan ulang dari PDF agar materi baru lebih segar, runtut, dan relevan." },
  "cloud-devops": { id: "cloud-devops", label: "Cloud Computing AI", shortLabel: "Cloud Computing", emoji: "☁", accent: "blue", intro: "Bawa sistem AI dari laptop menuju layanan yang dapat dirilis, dipantau, dan dirawat." },
  "data-engineering": { id: "data-engineering", label: "Data Analyst & Data Engineering", shortLabel: "Data", emoji: "▦", accent: "yellow", intro: "Ubah data mentah menjadi keputusan yang bisa ditelusuri, bukan sekadar angka yang terlihat rapi." },
  "ai-product": { id: "ai-product", label: "AI Product Builder", shortLabel: "AI Product", emoji: "▱", accent: "violet", intro: "Rancang solusi AI yang punya masalah jelas, kontrol manusia, dan ukuran keberhasilan yang nyata." },
  automation: { id: "automation", label: "Automation Specialist", shortLabel: "Automation", emoji: "↻", accent: "green", intro: "Bangun workflow lintas alat yang menghemat waktu tanpa menghilangkan titik pemeriksaan penting." },
  "ai-security": { id: "ai-security", label: "Cyber Security AI", shortLabel: "Cyber Security", emoji: "◆", accent: "orange", intro: "Jaga akun, data, prompt, agent, dan keputusan AI lewat kebiasaan keamanan yang dapat diterapkan." },
  "creative-ai": { id: "creative-ai", label: "Creative AI & Content Systems", shortLabel: "Creative AI", emoji: "✺", accent: "magenta", intro: "Buat sistem konten yang terarah, transparan, dan tetap menghormati karya serta suara manusia." },
};

export const specializationOrder: SpecializationId[] = ["ai-engineering", "cloud-devops", "data-engineering", "ai-product", "automation", "ai-security", "creative-ai"];

export function isSpecializationId(value: string | null): value is SpecializationId {
  return Boolean(value && specializationOrder.includes(value as SpecializationId));
}

export function materialMatchesSpecialization(material: { specialization?: SpecializationId }, specialization: SpecializationId | null) {
  return specialization === null || material.specialization === specialization;
}
