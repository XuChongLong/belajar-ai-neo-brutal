export type StarterKind = "web-app" | "agent" | "dashboard";

export type ProjectBrief = {
  projectName: string;
  problem: string;
  audience: string;
  stack: string;
  kind: StarterKind;
};

export const starterTemplates: { id: StarterKind; label: string; eyebrow: string; description: string; stack: string; problem: string; audience: string }[] = [
  { id: "web-app", label: "Web App", eyebrow: "STARTER 01", description: "Produk web responsif dengan alur pengguna, dashboard, dan API.", stack: "React + TypeScript + Node.js + PostgreSQL", audience: "Pengguna umum yang membutuhkan aplikasi web", problem: "Buat aplikasi web yang menyelesaikan masalah pengguna melalui alur sederhana, data yang aman, dan pengalaman mobile yang baik." },
  { id: "agent", label: "AI Agent", eyebrow: "STARTER 02", description: "Agent yang memakai tool, guardrail, dan persetujuan manusia.", stack: "TypeScript + Node.js + PostgreSQL + OpenAI-compatible API", audience: "Tim operasi atau knowledge worker", problem: "Buat agent AI yang membantu pekerjaan berulang, mencatat jejak tindakan, meminta persetujuan sebelum aksi berisiko, dan tetap mudah diaudit." },
  { id: "dashboard", label: "Internal Dashboard", eyebrow: "STARTER 03", description: "Panel kerja internal dengan peran, data, dan keputusan operasional.", stack: "React + TypeScript + Node.js + PostgreSQL", audience: "Tim internal dan operator", problem: "Buat dashboard internal untuk memantau data utama, mengambil tindakan terkontrol, dan menjaga akses berbasis peran." },
];

const now = () => new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });

export function createStarterFiles(brief: ProjectBrief, generatedPrd?: string) {
  const project = brief.projectName.trim() || "Proyek Baru";
  const prd = generatedPrd?.trim() || `# PRD — ${project}\n\n## Masalah\n${brief.problem}\n\n## Pengguna\n${brief.audience}\n\n## Sasaran\nTulis tiga hasil yang dapat diukur sebelum mulai membangun.\n\n## Kebutuhan fungsional\n- Pengguna dapat menyelesaikan alur inti tanpa bantuan manual.\n- Sistem memvalidasi input dan menunjukkan error yang dapat ditindaklanjuti.\n\n## Pertanyaan terbuka\n- Data apa yang benar-benar perlu disimpan?\n- Risiko apa yang harus memiliki persetujuan manusia?`;
  return {
    "prd.md": prd,
    "architecture.md": `# Architecture — ${project}\n\n| Area | Keputusan awal | Alasan |\n| --- | --- | --- |\n| Bahasa | TypeScript | Konsistensi front-end dan back-end |\n| Framework | ${brief.stack} | Sesuaikan setelah validasi kebutuhan |\n| Database | PostgreSQL bila ada data relasional | Transaksi dan query yang jelas |\n| Integrasi AI | Endpoint OpenAI-compatible opsional | Provider dapat diganti tanpa mengubah UX |\n\n## Alur utama\nPengguna → UI → API → domain logic → database/integrasi. Tambahkan queue atau storage hanya jika kebutuhan membuktikannya.\n\n## Keputusan yang perlu divalidasi\n- Skala pengguna dan target latency.\n- Data sensitif serta lokasi penyimpanannya.\n- Batas biaya provider dan observability.`,
    "rules.md": `# Rules — ${project}\n\n1. Jangan commit secret, token, atau data produksi.\n2. Validasi input di server, bukan hanya di UI.\n3. Tulis test untuk domain rule sebelum menambah alur baru.\n4. Gunakan akses minimum dan audit tindakan sensitif.\n5. Perbarui dokumentasi ketika kontrak API atau data berubah.`,
    "design.md": `# Design — ${project}\n\n## Prinsip\nDesain harus memperjelas tugas utama, status sistem, dan tindakan berikutnya.\n\n## Alur pertama\n1. Pengguna memahami nilai produk.\n2. Pengguna memasukkan data minimum.\n3. Sistem memberi hasil yang dapat diperiksa.\n4. Pengguna dapat mengoreksi atau melanjutkan.\n\n## Aksesibilitas\nGunakan label nyata, fokus keyboard, kontras memadai, dan status error yang tidak hanya berbasis warna.`,
    "security/qc.md": `# Security & Quality Checklist — ${project}\n\n## Sebelum rilis\n- [ ] Semua secret berasal dari environment/secret store.\n- [ ] Endpoint sensitif memiliki autentikasi dan otorisasi.\n- [ ] Input divalidasi dan batas ukuran diterapkan.\n- [ ] Error pengguna tidak membocorkan detail sistem.\n- [ ] Test domain, TypeScript, dan production build lulus.\n- [ ] Logging tidak menyimpan token atau isi sensitif.`,
    "todo.md": `# Project TODO — ${project}\n\n- [ ] Validasi masalah dengan 3–5 calon pengguna.\n- [ ] Tetapkan metrik sukses dan non-goal.\n- [ ] Buat model data minimum.\n- [ ] Bangun happy path end-to-end.\n- [ ] Tulis test domain dan jalankan QA.\n- [ ] Siapkan observability dan rencana rollback.`,
    "workflow.md": `# Workflow — ${project}\n\n## Mulai dari mana\n1. Baca ` + "`prd.md`" + ` lalu tandai asumsi yang belum terbukti.\n2. Pecah kebutuhan menjadi user story kecil dan urutkan berdasarkan risiko.\n3. Gambar arsitektur minimum di ` + "`architecture.md`" + `.\n4. Implementasikan happy path paling sempit.\n5. Jalankan quality checklist sebelum memperluas fitur.\n\nDibuat: ${now()}.`,
    "personality.mdd": `# Personality — ${project}\n\nProduk ini berbicara dengan jelas, tenang, dan tidak mengklaim lebih dari yang dapat dibuktikan. Gunakan bahasa ringkas, jelaskan ketidakpastian, dan selalu menawarkan langkah berikutnya yang dapat dilakukan pengguna.`,
  };
}

export function buildProjectBrief(template: typeof starterTemplates[number], projectName = "Proyek Baru"): ProjectBrief {
  return { projectName, problem: template.problem, audience: template.audience, stack: template.stack, kind: template.id };
}
