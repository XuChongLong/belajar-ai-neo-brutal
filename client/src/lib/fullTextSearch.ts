import type { Material } from "./materials";

export type MaterialSearchResult = {
  material: Material;
  matchLabel: string;
  excerpt: string;
  score: number;
};

const normalize = (value: string) => value.toLocaleLowerCase("id-ID").replace(/\s+/g, " ").trim();

function makeExcerpt(value: string, query: string) {
  const normalizedValue = normalize(value);
  const index = normalizedValue.indexOf(query);
  if (index < 0) return value.slice(0, 150).trim();
  const start = Math.max(0, index - 56);
  const end = Math.min(value.length, index + query.length + 112);
  return `${start ? "…" : ""}${value.slice(start, end).trim()}${end < value.length ? "…" : ""}`;
}

export function searchMaterialContent(materials: Material[], rawQuery: string, limit = 8): MaterialSearchResult[] {
  const query = normalize(rawQuery);
  const words = query.split(" ").filter(Boolean);
  if (!words.length) return [];

  return materials.flatMap((material) => {
    const fields: { label: string; value: string; weight: number }[] = [
      { label: "judul", value: material.title, weight: 120 },
      { label: "ringkasan", value: material.summary, weight: 76 },
      { label: "kategori", value: material.category, weight: 56 },
      { label: "penjelasan", value: material.sections.map((section) => `${section.heading} ${section.body}`).join(" "), weight: 48 },
      { label: "kuis", value: material.quiz.map((question) => `${question.question} ${question.options.join(" ")} ${question.explanation}`).join(" "), weight: 34 },
    ];
    if (material.bookContext) fields.push({ label: "konteks buku", value: `${material.bookContext.title} ${material.bookContext.body}`, weight: 72 });
    if (material.chapterLecture) fields.push({ label: "pembukaan bab", value: `${material.chapterLecture.title} ${material.chapterLecture.body} ${material.chapterLecture.questions.join(" ")}`, weight: 64 });
    if (material.caseStudy) fields.push({ label: "studi kasus", value: `${material.caseStudy.title} ${material.caseStudy.narrative} ${material.caseStudy.artifact} ${material.caseStudy.teachingPoint} ${material.caseStudy.guidedQuestions.join(" ")}`, weight: 52 });

    const ranked = fields.map((field) => {
      const haystack = normalize(field.value);
      const matches = words.every((word) => haystack.includes(word));
      if (!matches) return null;
      const occurrences = words.reduce((total, word) => total + haystack.split(word).length - 1, 0);
      return { material, matchLabel: field.label, excerpt: makeExcerpt(field.value, query), score: field.weight + occurrences * 4 };
    }).filter((result): result is MaterialSearchResult => Boolean(result));

    return ranked.length ? [ranked.sort((left, right) => right.score - left.score)[0]] : [];
  }).sort((left, right) => right.score - left.score || (left.material.displayNumber ?? left.material.id) - (right.material.displayNumber ?? right.material.id)).slice(0, limit);
}
