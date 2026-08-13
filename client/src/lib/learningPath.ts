// Style reminder: Paper Playground — recommendations read like a friendly workbook note: specific, encouraging, and never judgmental.

import type { Material } from "@/lib/materials";

export type QuizAttempt = { score: number; total: number; percentage: number; lastAttemptAt: string };
export type LearningGoalId = "ai-explorer" | "prompt-engineer" | "ai-builder" | "rag-specialist";

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
];

export type LearningRecommendation = {
  type: "review" | "continue" | "explore";
  label: string;
  title: string;
  reason: string;
  material: Material;
  accent: "pink" | "yellow" | "paper";
};

const categoryOrder = ["Dasar-Dasar AI", "Large Language Models", "RAG & Teknik Lanjutan", "AI Agents & Tools"];

function getGoal(goalId: LearningGoalId | null) {
  return learningGoals.find((goal) => goal.id === goalId) ?? learningGoals[0];
}

function goalScore(material: Material, goalId: LearningGoalId | null) {
  const goal = getGoal(goalId);
  const categoryScore = (goal.priorities.length - goal.priorities.indexOf(material.category)) * 10;
  const keywordScore = goal.keywords.some((keyword) => material.title.toLowerCase().includes(keyword.toLowerCase())) ? 8 : 0;
  return categoryScore + keywordScore;
}

export function getLearningRecommendations(materials: Material[], completed: number[], attempts: Record<number, QuizAttempt>, goalId: LearningGoalId | null = null): LearningRecommendation[] {
  const goal = getGoal(goalId);
  const attempted = materials.filter((material) => attempts[material.id]);
  const categoryScores = categoryOrder.map((category) => {
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

export function getRecommendationSummary(materials: Material[], completed: number[], attempts: Record<number, QuizAttempt>, goalId: LearningGoalId | null = null) {
  const goal = getGoal(goalId);
  const recommendations = getLearningRecommendations(materials, completed, attempts, goalId);
  if (!Object.keys(attempts).length) return { headline: `Siapkan jalur ${goal.label}-mu.`, body: "Selesaikan satu quiz dulu. Setelah itu, rekomendasi akan menggabungkan tujuanmu dengan bagian yang paling butuh perhatian." };
  if (!recommendations.length) return { headline: "Semua sinyal terlihat kuat.", body: "Kamu sudah menyelesaikan semua materi yang direkomendasikan. Saatnya mengulang quiz favorit atau memilih topik baru." };
  const review = recommendations.find((item) => item.type === "review");
  return { headline: review ? "Jalurmu menemukan satu titik untuk diperkuat." : `Jalur ${goal.label}-mu sudah punya arah berikutnya.`, body: "Rekomendasi ini berubah otomatis saat tujuan atau hasil quiz-mu berubah." };
}
