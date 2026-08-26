import type { Material } from "./materials";
import type { SpecializationId } from "./specializations";

export type CourseJourney = {
  specialization: SpecializationId;
  fitFor: string;
  prerequisites: string[];
  recommendedAfter: Array<{ course: SpecializationId; reason: string }>;
  outcomes: string[];
  estimatedHours: number;
  capstone: { title: string; prompt: string; evidence: string[] };
};

export type CourseSourceMapItem = {
  label: string;
  url: string;
  note: string;
  checkpoints: string[];
};

export const courseJourneys: Record<SpecializationId, CourseJourney> = {
  "ai-engineering": {
    specialization: "ai-engineering",
    fitFor: "Kamu yang ingin membawa model AI menjadi aplikasi yang bisa diuji, dievaluasi, dan dirawat.",
    prerequisites: ["Nyaman membaca contoh produk digital sederhana", "Mau belajar lewat eksperimen kecil, bukan mengejar demo instan"],
    recommendedAfter: [{ course: "ai-product", reason: "Product framing membuat keputusan evaluasi dan batas sistem AI lebih kontekstual, tetapi ini tetap jalur mandiri." }],
    outcomes: ["Memilih use case dan ukuran evaluasi", "Merancang context/RAG/agent dengan batas yang jelas", "Menulis feedback loop untuk sistem AI"],
    estimatedHours: 38,
    capstone: { title: "AI Engineering Decision Pack", prompt: "Rangkai use case, evaluasi, desain context, batas risiko, dan feedback loop menjadi paket keputusan yang dapat direview.", evidence: ["Use case & user harm note", "Rencana evaluasi", "Diagram context/feedback loop"] },
  },
  "cloud-devops": {
    specialization: "cloud-devops",
    fitFor: "Kamu yang ingin mengirim, memantau, dan merawat layanan AI tanpa mengandalkan klik manual yang sulit dilacak.",
    prerequisites: ["Paham konsep aplikasi web atau service sederhana", "Siap memakai sandbox/akun yang kamu miliki untuk latihan"],
    recommendedAfter: [{ course: "ai-engineering", reason: "Lebih mudah merancang operasi jika sudah pernah membedah perilaku sebuah sistem AI, tetapi kamu boleh mulai dari Prolog langsung." }],
    outcomes: ["Memilih desain deploy dan konfigurasi", "Menyusun perubahan IaC serta release yang dapat dirollback", "Membaca sinyal operasi dan menulis runbook"],
    estimatedHours: 42,
    capstone: { title: "Production Readiness Pack", prompt: "Susun arsitektur, change plan, release/rollback, observability, dan runbook untuk satu layanan AI fiktif.", evidence: ["Architecture & threat note", "Change/release plan", "Runbook observability"] },
  },
  "data-engineering": {
    specialization: "data-engineering",
    fitFor: "Kamu yang ingin mengubah data menjadi keputusan yang dapat ditelusuri, bukan sekadar dashboard yang terlihat rapi.",
    prerequisites: ["Siap bekerja dengan tabel, pertanyaan bisnis, dan data sintetis", "Tidak perlu sudah mahir SQL sebelum mulai"],
    recommendedAfter: [],
    outcomes: ["Merumuskan metrik dan kontrak data", "Mendesain transformasi, kualitas, dan lineage", "Menceritakan keputusan dengan batas interpretasi"],
    estimatedHours: 40,
    capstone: { title: "Data Decision Pack", prompt: "Buat kontrak pertanyaan, model data ringkas, quality checks, dan brief keputusan dari data sintetis.", evidence: ["Metric contract", "Lineage/quality note", "Decision brief"] },
  },
  "ai-product": {
    specialization: "ai-product",
    fitFor: "Kamu yang ingin memastikan AI menyelesaikan masalah pengguna, punya kontrol manusia, dan tidak berhenti di demo.",
    prerequisites: ["Punya satu masalah pengguna yang ingin diamati", "Bersedia menguji asumsi sebelum memilih model atau tool"],
    recommendedAfter: [{ course: "data-engineering", reason: "Kontrak metrik dan kualitas data memberi fondasi kuat untuk keputusan produk, namun tidak wajib untuk memulai discovery." }],
    outcomes: ["Menyusun problem framing dan PRD AI", "Mendesain kontrol, evaluasi, dan metrik produk", "Merencanakan launch serta product operations"],
    estimatedHours: 36,
    capstone: { title: "AI Product Brief", prompt: "Gabungkan evidence pengguna, scope, UX/control, evaluasi, risiko, dan launch plan menjadi brief produk AI.", evidence: ["Product intent map", "PRD & evaluation plan", "Launch/monitoring note"] },
  },
  automation: {
    specialization: "automation",
    fitFor: "Kamu yang ingin membuat workflow lintas aplikasi lebih rapi tanpa menyerahkan keputusan penting ke automation.",
    prerequisites: ["Memiliki proses berulang yang boleh dipetakan", "Siap memakai data contoh dan kredensial milik sendiri"],
    recommendedAfter: [{ course: "ai-product", reason: "Kebiasaan memetakan owner, nilai pengguna, dan kontrol manusia akan membuat workflow otomatis lebih bertanggung jawab." }],
    outcomes: ["Memilih kandidat otomasi yang bernilai", "Mendesain trigger, kontrak data, dan recovery", "Menjaga approval, observability, privacy, dan audit"],
    estimatedHours: 38,
    capstone: { title: "Trusted Workflow Pack", prompt: "Rancang satu workflow berizin lengkap dengan owner, approval, exception path, observability, dan audit note.", evidence: ["Workflow intent map", "Exception & approval flow", "Audit/runbook note"] },
  },
  "ai-security": {
    specialization: "ai-security",
    fitFor: "Kamu yang ingin membangun kebiasaan keamanan untuk akun, aplikasi, sistem, AI, dan perangkat tanpa gaya sok hacker.",
    prerequisites: ["Bersedia berlatih hanya pada lab/aset milik sendiri atau berizin", "Mau mendokumentasikan batas legal dan keputusan risiko"],
    recommendedAfter: [{ course: "cloud-devops", reason: "Sesudah memahami perubahan, observability, dan runbook operasi, kamu akan punya konteks lebih nyata untuk memetakan kontrol dan triage; namun Bab Prolog Security tetap aman dimulai dari nol." }],
    outcomes: ["Memetakan aset, risiko, dan kontrol", "Membaca sinyal keamanan dan menyusun triage", "Menulis rencana security yang dapat direview"],
    estimatedHours: 58,
    capstone: { title: "Defensible Security Plan", prompt: "Buat asset/risk map, kontrol prioritas, monitoring, incident path, dan disclosure boundary untuk sistem fiktif atau berizin.", evidence: ["Asset & risk map", "Control/telemetry plan", "Incident/disclosure note"] },
  },
  "creative-ai": {
    specialization: "creative-ai",
    fitFor: "Kamu yang ingin membuat sistem konten AI yang punya arah editorial, transparansi proses, dan penghormatan pada hak karya.",
    prerequisites: ["Punya topik, brief, atau brand fiktif untuk latihan", "Siap memakai aset yang dimiliki atau diizinkan"],
    recommendedAfter: [{ course: "ai-product", reason: "Problem framing dan evaluasi pengalaman pengguna membantu sistem konten tidak berhenti pada output yang sekadar menarik." }],
    outcomes: ["Membuat strategy/brief/editorial system", "Mendesain produksi kreatif yang bisa direview", "Mencatat consent, rights, provenance, dan learning loop"],
    estimatedHours: 36,
    capstone: { title: "Transparent Content System", prompt: "Rangkai brief, content system, review, rights/provenance note, dan distribusi untuk satu kampanye kecil.", evidence: ["Creative intent & editorial brief", "Production/review system", "Rights/provenance note"] },
  },
};

export function getCourseJourney(id: SpecializationId | undefined) {
  return id ? courseJourneys[id] : null;
}

export function getCoursePrerequisiteMap(id: SpecializationId) {
  const journey = courseJourneys[id];
  return {
    recommendedBefore: journey.recommendedAfter.map((entry) => ({ ...entry, journey: courseJourneys[entry.course] })),
    canContinueTo: Object.values(courseJourneys).flatMap((candidate) => candidate.recommendedAfter.filter((entry) => entry.course === id).map((entry) => ({ course: candidate.specialization, reason: entry.reason, journey: candidate }))),
  };
}

export function getCourseNextStep(materials: Material[], specialization: SpecializationId, completed: number[]) {
  return materials
    .filter((material) => material.specialization === specialization)
    .sort((left, right) => left.id - right.id)
    .find((material) => !completed.includes(material.id)) ?? null;
}

export function getCourseStartRecommendation(materials: Material[], specialization: SpecializationId, completed: number[]) {
  const prerequisiteMap = getCoursePrerequisiteMap(specialization);
  const preparation = prerequisiteMap.recommendedBefore.flatMap((item) => {
    const firstMaterial = materials.filter((material) => material.specialization === item.course).sort((left, right) => left.id - right.id)[0];
    if (!firstMaterial || completed.includes(firstMaterial.id)) return [];
    return [{ course: item.course, journey: item.journey, reason: item.reason, material: firstMaterial }];
  });

  return {
    course: courseJourneys[specialization],
    primary: getCourseNextStep(materials, specialization, completed),
    preparation,
    readyForCorePath: preparation.length === 0,
  };
}

export function getCourseSourceMap(materials: Material[], specialization: SpecializationId): CourseSourceMapItem[] {
  const byUrl = new Map<string, CourseSourceMapItem>();
  materials.filter((material) => material.specialization === specialization).forEach((material) => {
    material.resources?.forEach((resource) => {
      const current = byUrl.get(resource.url);
      if (current) {
        if (!current.checkpoints.includes(material.category)) current.checkpoints.push(material.category);
        return;
      }
      byUrl.set(resource.url, { label: resource.label, url: resource.url, note: resource.note ?? "Referensi untuk memperdalam batas dan praktik terbaru.", checkpoints: [material.category] });
    });
  });
  return Array.from(byUrl.values()).sort((left, right) => left.label.localeCompare(right.label));
}

export function getEvidenceKey(material: Pick<Material, "specialization" | "category">) {
  return `${material.specialization ?? "umum"}:${material.category}`;
}

export function getEvidenceChecklist(material: Pick<Material, "specialization" | "category" | "title">) {
  const journey = getCourseJourney(material.specialization);
  if (!journey) return [];
  const focus = material.title.replace(/^.*?·\s*/, "");
  return [
    `Tulis konteks dan tujuan untuk “${focus}”.`,
    "Catat asumsi, owner, dan bukti yang masih perlu dikumpulkan.",
    "Pilih satu risiko atau batas yang harus dijaga.",
    `Hubungkan hasilnya ke artefak ${journey.capstone.title}.`,
  ];
}
