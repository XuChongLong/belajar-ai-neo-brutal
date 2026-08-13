// Style reminder: Paper Playground — flashcards are small, repeatable study loops with plain language and one clear action.

import type { WrongQuizQuestion } from "@/contexts/LearningContext";
import type { GlossaryTerm } from "@/lib/glossary";

export type Flashcard = {
  id: string;
  source: "glossary" | "quiz";
  label: string;
  front: string;
  back: string;
  note: string;
  materialId?: number;
};

export function buildFlashcards(terms: GlossaryTerm[], wrongQuestions: Record<string, WrongQuizQuestion[]>): Flashcard[] {
  const quizCards = Object.values(wrongQuestions).flat().map((item) => ({ id: `quiz-${item.id}`, source: "quiz" as const, label: "DARI QUIZ YANG PERLU DIULANG", front: item.question, back: item.answer, note: `${item.explanation} · ${item.materialTitle}`, materialId: item.materialId }));
  const glossaryCards = terms.map((item) => ({ id: `glossary-${item.term.toLowerCase().replace(/\s+/g, "-")}`, source: "glossary" as const, label: "ISTILAH GLOSARIUM", front: item.term, back: item.definition, note: item.analogy, materialId: item.materialId }));
  return [...quizCards, ...glossaryCards];
}

export function prioritizeFlashcards(cards: Flashcard[], reviewQueue: string[]) {
  const positions = new Map(reviewQueue.map((id, index) => [id, index]));
  return [...cards].sort((first, second) => {
    const firstPosition = positions.get(first.id);
    const secondPosition = positions.get(second.id);
    if (firstPosition === undefined && secondPosition === undefined) return 0;
    if (firstPosition === undefined) return 1;
    if (secondPosition === undefined) return -1;
    return firstPosition - secondPosition;
  });
}
