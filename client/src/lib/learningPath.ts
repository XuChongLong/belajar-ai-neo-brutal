// Style reminder: Paper Playground — recommendations read like a friendly workbook note: specific, encouraging, and never judgmental.

import type { Material } from "@/lib/materials";

export type QuizAttempt = { score: number; total: number; percentage: number; lastAttemptAt: string };

export type LearningRecommendation = {
  type: "review" | "continue" | "explore";
  label: string;
  title: string;
  reason: string;
  material: Material;
  accent: "pink" | "yellow" | "paper";
};

const categoryOrder = ["Dasar-Dasar AI", "Large Language Models", "RAG & Teknik Lanjutan", "AI Agents & Tools"];

export function getLearningRecommendations(materials: Material[], completed: number[], attempts: Record<number, QuizAttempt>): LearningRecommendation[] {
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
    const reviewMaterial = materials.find((material) => material.category === weakest.category && attempts[material.id] && (attempts[material.id].percentage < 80 || !completed.includes(material.id))) ?? materials.find((material) => material.category === weakest.category);
    if (reviewMaterial) {
      used.add(reviewMaterial.id);
      recommendations.push({ type: "review", label: "PERLU DIKUATKAN", title: "Ulangi konsep yang masih bisa dipoles", reason: `Rata-rata quiz di ${weakest.category} masih ${Math.round(weakest.average ?? 0)}%. Satu putaran ulang akan bikin fondasinya lebih mantap.`, material: reviewMaterial, accent: "pink" });
    }
  }

  const foundation = materials.find((material) => material.category === "Dasar-Dasar AI" && !completed.includes(material.id) && !used.has(material.id));
  if (foundation) {
    used.add(foundation.id);
    recommendations.push({ type: "continue", label: "LANGKAH BERIKUTNYA", title: "Bangun fondasi sebelum melompat", reason: "Materi dasar yang belum selesai akan membantu topik-topik berikutnya terasa lebih ringan.", material: foundation, accent: "yellow" });
  }

  const nextFrontier = materials.find((material) => !completed.includes(material.id) && !used.has(material.id));
  if (nextFrontier) {
    recommendations.push({ type: "explore", label: "BOLEH DIEKSPLOR", title: "Topik yang bisa membuka rasa penasaran", reason: `Setelah dua langkah sebelumnya, coba kenalan dengan ${nextFrontier.category.toLowerCase()} lewat materi singkat ini.`, material: nextFrontier, accent: "paper" });
  }

  return recommendations;
}

export function getRecommendationSummary(materials: Material[], completed: number[], attempts: Record<number, QuizAttempt>) {
  const recommendations = getLearningRecommendations(materials, completed, attempts);
  if (!Object.keys(attempts).length) return { headline: "Kita mulai dari sinyal kecil.", body: "Selesaikan satu quiz dulu. Setelah itu, jalur belajarmu akan menyesuaikan dengan bagian yang paling butuh perhatian." };
  if (!recommendations.length) return { headline: "Semua sinyal terlihat kuat.", body: "Kamu sudah menyelesaikan semua materi yang direkomendasikan. Saatnya mengulang quiz favorit atau memilih topik baru." };
  const review = recommendations.find((item) => item.type === "review");
  return { headline: review ? "Jalurmu menemukan satu titik untuk diperkuat." : "Jalurmu sudah punya arah berikutnya.", body: "Rekomendasi ini berubah otomatis setiap kali kamu mengerjakan quiz baru." };
}
