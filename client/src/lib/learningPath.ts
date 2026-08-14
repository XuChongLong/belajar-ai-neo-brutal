// Style reminder: Paper Playground — recommendations read like a friendly workbook note: specific, encouraging, and never judgmental.

import type { Material } from "@/lib/materials";

export type QuizAttempt = { score: number; total: number; percentage: number; lastAttemptAt: string };
export type LearningGoalId = "ai-explorer" | "prompt-engineer" | "ai-builder" | "rag-specialist" | "cloud-operator" | "data-analyst" | "ai-product-builder" | "automation-specialist" | "ai-safety-builder" | "creative-ai-builder";

export type LearningGoal = {
  id: LearningGoalId;
  label: string;
  emoji: string;
  description: string;
  priorities: string[];
  keywords: string[];
};

export const learningGoals: LearningGoal[] = [
  { id: "ai-explorer", label: "AI Explorer", emoji: "✦", description: "Peta besar AI dari nol, tanpa buru-buru.", priorities: ["Dasar-Dasar AI", "Large Language Models", "RAG & Teknik Lanjutan", "AI Agents & Tools"], keywords: ["Apa Itu", "Sejarah", "Jenis-Jenis", "Kehidupan"] },
  { id: "prompt-engineer", label: "Prompt Engineer", emoji: "⌁", description: "Fokus merancang instruksi dan memahami LLM.", priorities: ["Large Language Models", "Dasar-Dasar AI", "AI Agents & Tools", "RAG & Teknik Lanjutan"], keywords: ["Prompt", "Tokenisasi", "Temperature", "Context Window", "Hallucination"] },
  { id: "ai-builder", label: "AI Builder", emoji: "⚙", description: "Bangun aplikasi AI dari fondasi sampai tools.", priorities: ["Dasar-Dasar AI", "RAG & Teknik Lanjutan", "AI Agents & Tools", "Large Language Models"], keywords: ["Training", "Neural", "RAG", "Vector", "Function Calling", "Memory"] },
  { id: "rag-specialist", label: "RAG Specialist", emoji: "⌗", description: "Dalami pipeline pencarian, embedding, dan evaluasi.", priorities: ["RAG & Teknik Lanjutan", "Large Language Models", "Dasar-Dasar AI", "AI Agents & Tools"], keywords: ["RAG", "Vector", "Embedding", "Chunking", "Semantic", "Pipeline", "Evaluasi"] },
  { id: "cloud-operator", label: "Cloud Operator", emoji: "☁", description: "Deploy, pantau, dan rawat layanan AI dengan lebih tenang.", priorities: ["Cloud Computing AI", "Infrastruktur Agent", "AI Agents & Tools", "Dasar-Dasar AI"], keywords: ["Cloud", "Docker", "CI/CD", "Observability", "Deploy", "Runbook"] },
  { id: "data-analyst", label: "Data Analyst", emoji: "▦", description: "Ubah data menjadi insight yang bisa dipertanggungjawabkan.", priorities: ["Data Analyst & Data Engineering", "Dasar-Dasar AI", "RAG & Teknik Lanjutan"], keywords: ["Data", "SQL", "Dashboard", "ETL", "Statistik"] },
  { id: "ai-product-builder", label: "AI Product Builder", emoji: "▱", description: "Rancang produk AI dari masalah sampai evaluasi.", priorities: ["AI Product Builder", "Large Language Models", "AI Agents & Tools", "Dasar-Dasar AI"], keywords: ["Produk", "PRD", "User", "Metrik", "Evaluasi"] },
  { id: "automation-specialist", label: "Automation Specialist", emoji: "↻", description: "Bangun workflow lintas tool yang tetap terkendali.", priorities: ["Automation Specialist", "AI Agents & Tools", "Infrastruktur Agent", "Large Language Models"], keywords: ["Workflow", "Trigger", "Webhook", "Automation", "Agentic"] },
  { id: "ai-safety-builder", label: "AI Safety Builder", emoji: "◆", description: "Bangun kebiasaan keamanan dan safety sejak awal.", priorities: ["Cyber Security AI", "AI Agents & Tools", "Dasar-Dasar AI", "Large Language Models"], keywords: ["Security", "Secret", "Prompt Injection", "Akses", "Agent"] },
  { id: "creative-ai-builder", label: "Creative AI Builder", emoji: "✺", description: "Buat sistem konten AI yang transparan dan terarah.", priorities: ["Creative AI & Content Systems", "Large Language Models", "Dasar-Dasar AI"], keywords: ["Konten", "Prompt Kreatif", "Visual", "Storyboard", "Provenance"] },
];

export type LearningRecommendation = {
  type: "review" | "continue" | "explore";
  label: string;
  title: string;
  reason: string;
  material: Material;
  accent: "pink" | "yellow" | "paper";
};

export type ReviewItem = {
  material: Material;
  reason: string;
  signal: "quiz" | "bookmark" | "next";
};

function getGoal(goalId: LearningGoalId | null) {
  return learningGoals.find((goal) => goal.id === goalId) ?? learningGoals[0];
}

function goalScore(material: Material, goalId: LearningGoalId | null) {
  const goal = getGoal(goalId);
  const priorityIndex = goal.priorities.indexOf(material.category);
  const categoryScore = priorityIndex >= 0 ? (goal.priorities.length - priorityIndex) * 10 : 0;
  const keywordScore = goal.keywords.some((keyword) => material.title.toLowerCase().includes(keyword.toLowerCase())) ? 8 : 0;
  return categoryScore + keywordScore;
}

export function getLearningRecommendations(materials: Material[], completed: number[], attempts: Record<string, QuizAttempt>, goalId: LearningGoalId | null = null): LearningRecommendation[] {
  const goal = getGoal(goalId);
  const attempted = materials.filter((material) => attempts[material.id]);
  const categoryScores = Array.from(new Set(materials.map((material) => material.category))).map((category) => {
    const categoryMaterials = attempted.filter((material) => material.category === category);
    const average = categoryMaterials.length ? categoryMaterials.reduce((sum, material) => sum + (attempts[material.id]?.percentage ?? 0), 0) / categoryMaterials.length : null;
    return { category, average, count: categoryMaterials.length };
  });
  const recommendations: LearningRecommendation[] = [];
  const used = new Set<number>();

  const weakest = [...categoryScores].filter((item) => item.average !== null).sort((a, b) => (a.average ?? 0) - (b.average ?? 0))[0];
  if (weakest && (weakest.average ?? 100) < 80) {
    const reviewMaterial = materials.filter((material) => material.category === weakest.category && attempts[material.id] && (attempts[material.id].percentage < 80 || !completed.includes(material.id))).sort((a, b) => goalScore(b, goalId) - goalScore(a, goalId))[0] ?? materials.find((material) => material.category === weakest.category);
    if (reviewMaterial) {
      used.add(reviewMaterial.id);
      recommendations.push({ type: "review", label: "PERLU DIKUATKAN", title: "Ulangi konsep yang masih bisa dipoles", reason: `Rata-rata quiz di ${weakest.category} masih ${Math.round(weakest.average ?? 0)}%. Jalur ${goal.label} menjadikan topik ini prioritas supaya fondasinya lebih mantap.`, material: reviewMaterial, accent: "pink" });
    }
  }

  const foundation = materials.filter((material) => !completed.includes(material.id) && !used.has(material.id)).sort((a, b) => goalScore(b, goalId) - goalScore(a, goalId)).find((material) => material.category === "Dasar-Dasar AI" || goalScore(material, goalId) >= 30);
  if (foundation) {
    used.add(foundation.id);
    recommendations.push({ type: "continue", label: "LANGKAH BERIKUTNYA", title: `Lanjutkan jalur ${goal.label}`, reason: `${goal.description} Materi ini punya prioritas tinggi untuk tujuanmu dan membantu langkah berikutnya terasa lebih ringan.`, material: foundation, accent: "yellow" });
  }

  const nextFrontier = materials.filter((material) => !completed.includes(material.id) && !used.has(material.id)).sort((a, b) => goalScore(b, goalId) - goalScore(a, goalId))[0];
  if (nextFrontier) {
    recommendations.push({ type: "explore", label: "BOLEH DIEKSPLOR", title: `Topik ${goal.label} berikutnya`, reason: `Setelah dua langkah sebelumnya, coba kenalan dengan ${nextFrontier.category.toLowerCase()} lewat materi yang paling dekat dengan tujuanmu.`, material: nextFrontier, accent: "paper" });
  }

  return recommendations;
}

export function getRecommendationSummary(materials: Material[], completed: number[], attempts: Record<string, QuizAttempt>, goalId: LearningGoalId | null = null) {
  const goal = getGoal(goalId);
  const recommendations = getLearningRecommendations(materials, completed, attempts, goalId);
  if (!Object.keys(attempts).length) return { headline: `Siapkan jalur ${goal.label}-mu.`, body: "Selesaikan satu quiz dulu. Setelah itu, rekomendasi akan menggabungkan tujuanmu dengan bagian yang paling butuh perhatian." };
  if (!recommendations.length) return { headline: "Semua sinyal terlihat kuat.", body: "Kamu sudah menyelesaikan semua materi yang direkomendasikan. Saatnya mengulang quiz favorit atau memilih topik baru." };
  const review = recommendations.find((item) => item.type === "review");
  return { headline: review ? "Jalurmu menemukan satu titik untuk diperkuat." : `Jalur ${goal.label}-mu sudah punya arah berikutnya.`, body: "Rekomendasi ini berubah otomatis saat tujuan atau hasil quiz-mu berubah." };
}

export function getReviewQueue(materials: Material[], completed: number[], bookmarks: number[], attempts: Record<string, QuizAttempt>, goalId: LearningGoalId | null = null): ReviewItem[] {
  const items: ReviewItem[] = [];
  const used = new Set<number>();
  const weak = materials.filter((material) => attempts[material.id] && attempts[material.id].percentage < 80).sort((a, b) => (attempts[a.id]?.percentage ?? 0) - (attempts[b.id]?.percentage ?? 0));
  weak.forEach((material) => { if (!used.has(material.id)) { used.add(material.id); items.push({ material, signal: "quiz", reason: `Quiz ${attempts[material.id]?.percentage ?? 0}% · konsep ini masih bisa dipoles.` }); } });
  materials.filter((material) => bookmarks.includes(material.id)).sort((a, b) => goalScore(b, goalId) - goalScore(a, goalId)).forEach((material) => { if (!used.has(material.id)) { used.add(material.id); items.push({ material, signal: "bookmark", reason: completed.includes(material.id) ? "Bookmark tersimpan · cocok untuk pengulangan cepat." : "Bookmark tersimpan · belum masuk checklist selesai." }); } });
  materials.filter((material) => !completed.includes(material.id)).sort((a, b) => goalScore(b, goalId) - goalScore(a, goalId)).forEach((material) => { if (!used.has(material.id) && items.length < 6) { used.add(material.id); items.push({ material, signal: "next", reason: "Belum selesai · satu langkah kecil berikutnya." }); } });
  return items.slice(0, 6);
}

export function getGoalProgress(materials: Material[], completed: number[], attempts: Record<string, QuizAttempt>, goalId: LearningGoalId | null = null) {
  const goal = getGoal(goalId);
  const weights = new Map(goal.priorities.map((category, index) => [category, Math.max(0.7, 1.5 - index * 0.2)]));
  const totalWeight = materials.reduce((sum, material) => sum + (weights.get(material.category) ?? 0.7), 0);
  const completedWeight = materials.reduce((sum, material) => sum + (completed.includes(material.id) ? (weights.get(material.category) ?? 0.7) : 0), 0);
  const completion = totalWeight ? Math.round((completedWeight / totalWeight) * 100) : 0;
  const attemptedMaterials = materials.filter((material) => attempts[material.id]);
  const mastery = attemptedMaterials.length ? Math.round(attemptedMaterials.reduce((sum, material) => sum + attempts[material.id].percentage * (weights.get(material.category) ?? 0.7), 0) / attemptedMaterials.reduce((sum, material) => sum + (weights.get(material.category) ?? 0.7), 0)) : 0;
  const score = Math.round(completion * 0.6 + mastery * 0.4);
  const relevantCompleted = materials.filter((material) => completed.includes(material.id) && (weights.get(material.category) ?? 0) >= 1).length;
  const relevantTotal = materials.filter((material) => (weights.get(material.category) ?? 0) >= 1).length;
  const attempted = Object.keys(attempts).length;
  const milestone = score >= 90 ? "Tinggal sedikit lagi menuju badge tujuan." : score >= 75 ? "Kamu sudah masuk fase penguatan." : score >= 50 ? "Peta belajarmu mulai terbentuk." : score >= 25 ? "Langkah awalmu sudah terlihat." : "Pilih satu materi untuk menyalakan progress pertamamu.";
  const nextAction = !attempted ? "Kerjakan quiz pertama untuk membuka sinyal mastery." : score < 50 ? `Selesaikan ${Math.max(1, Math.ceil((50 - score) / 10))} materi prioritas berikutnya.` : mastery < 80 ? "Ulangi quiz dengan skor terendah untuk mengangkat mastery." : "Lanjutkan materi prioritas agar progress tetap naik.";
  return { goal, score, completion, mastery, relevantCompleted, relevantTotal, attempted, milestone, nextAction };
}
