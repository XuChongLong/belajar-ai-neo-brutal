import { describe, expect, it } from "vitest";
import { prioritizeFlashcards, type Flashcard } from "./flashcards";

const cards: Flashcard[] = [
  { id: "glossary-ai", source: "glossary", label: "ISTILAH", front: "AI", back: "", note: "" },
  { id: "glossary-rag", source: "glossary", label: "ISTILAH", front: "RAG", back: "", note: "" },
  { id: "quiz-prompt", source: "quiz", label: "QUIZ", front: "Prompt?", back: "", note: "" },
];

describe("prioritizeFlashcards", () => {
  it("puts direct needs-review selections first in their saved order", () => {
    expect(prioritizeFlashcards(cards, ["quiz-prompt", "glossary-rag"]).map((card) => card.id)).toEqual(["quiz-prompt", "glossary-rag", "glossary-ai"]);
  });
});
