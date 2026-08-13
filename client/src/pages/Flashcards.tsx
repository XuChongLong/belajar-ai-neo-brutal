// Style reminder: Paper Playground — flashcards feel like index cards on a desk: tactile, focused, and easy to repeat.

import { ArrowRight, Check, Layers3, RotateCcw, Shuffle, Sparkles, X } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { useLearning } from "@/contexts/LearningContext";
import { glossaryTerms } from "@/lib/glossary";
import { buildFlashcards, prioritizeFlashcards } from "@/lib/flashcards";

type Filter = "all" | "quiz" | "glossary";

export default function Flashcards() {
  const { flashcardKnown, flashcardReviewQueue, markFlashcardKnown, markFlashcardReview, wrongQuizQuestions } = useLearning();
  const allCards = useMemo(() => buildFlashcards(glossaryTerms, wrongQuizQuestions), [wrongQuizQuestions]);
  const prioritizedCards = useMemo(() => prioritizeFlashcards(allCards, flashcardReviewQueue), [allCards, flashcardReviewQueue]);
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const visibleCards = prioritizedCards.filter((card) => filter === "all" || card.source === filter).filter((card) => !flashcardKnown.includes(card.id));
  const card = visibleCards[index] ?? visibleCards[0];
  const knownCount = flashcardKnown.filter((id) => allCards.some((item) => item.id === id)).length;
  const nextCard = () => { setFlipped(false); setIndex((current) => visibleCards.length ? (current + 1) % visibleCards.length : 0); };
  const shuffleCard = () => { setFlipped(false); setIndex(visibleCards.length > 1 ? Math.floor(Math.random() * visibleCards.length) : 0); };
  const setKnown = () => { if (!card) return; markFlashcardKnown(card.id); setFlipped(false); setIndex((current) => visibleCards.length > 1 ? current % (visibleCards.length - 1) : 0); };
  const setNeedsReview = () => { if (!card) return; markFlashcardReview(card.id); setFlipped(false); nextCard(); };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === " " || event.key === "Enter") { event.preventDefault(); setFlipped((value) => !value); } if (event.key === "ArrowRight") nextCard(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return <div className="page"><div className="page-wrap flashcards-page"><div className="page-heading flashcards-heading"><div><span className="eyebrow">FLASHCARD LAB · INGAT LEBIH LAMA</span><h1>Satu kartu,<br /><em>satu aha moment.</em></h1><p className="flashcards-lead">Balik kartu dari istilah glossary dan pertanyaan quiz yang pernah membuatmu berhenti. Tekan Space untuk membalik.</p></div><div className="flashcards-sticker"><Sparkles size={21} /><strong>{knownCount}</strong><span>sudah<br />dikuasai</span></div></div>
    <section className="flashcard-stats"><div><Layers3 size={18} /><strong>{allCards.length}</strong><span>total kartu</span></div><div><Check size={18} /><strong>{knownCount}</strong><span>sudah dikuasai</span></div><div><RotateCcw size={18} /><strong>{Math.max(0, allCards.length - knownCount)}</strong><span>perlu diulang</span></div></section>
    <div className="flashcard-toolbar"><div className="flashcard-filters"><button type="button" className={filter === "all" ? "flash-filter-active" : ""} onClick={() => { setFilter("all"); setIndex(0); setFlipped(false); }}>Semua</button><button type="button" className={filter === "quiz" ? "flash-filter-active" : ""} onClick={() => { setFilter("quiz"); setIndex(0); setFlipped(false); }}>Dari quiz</button><button type="button" className={filter === "glossary" ? "flash-filter-active" : ""} onClick={() => { setFilter("glossary"); setIndex(0); setFlipped(false); }}>Istilah glossary</button></div><button type="button" className="shuffle-button" onClick={shuffleCard}><Shuffle size={15} /> Acak</button></div>
    {card ? <section className="flashcard-stage"><button type="button" className={`flashcard ${flipped ? "flashcard-flipped" : ""}`} onClick={() => setFlipped((value) => !value)} aria-label={flipped ? "Kembali ke pertanyaan flashcard" : "Balik flashcard untuk melihat jawaban"}><span className="flashcard-face flashcard-front"><span className="eyebrow">{card.label}</span><strong>{card.front}</strong><small>Klik atau tekan Space untuk membalik</small></span><span className="flashcard-face flashcard-back"><span className="eyebrow">JAWABAN / CATATAN</span><strong>{card.back}</strong><small>{card.note}</small></span></button><div className="flashcard-counter">{index + 1} / {visibleCards.length} kartu aktif</div><div className="flashcard-actions"><button type="button" className="flash-action-review" onClick={setNeedsReview}><X size={17} /> Perlu diulang</button><button type="button" className="flash-action-known" onClick={setKnown}><Check size={17} /> Aku paham</button><button type="button" className="flash-action-next" onClick={nextCard}>Kartu berikutnya <ArrowRight size={16} /></button></div></section> : <section className="flashcard-empty"><span>✦</span><h2>Semua kartu di filter ini sudah kamu kuasai.</h2><p>Ganti filter, reset kartu, atau lanjutkan belajar dari glosarium dan quiz materi.</p><div><button type="button" className="brutal-button button-yellow" onClick={() => { setFilter("all"); setIndex(0); }}>Lihat semua kartu</button><Link href="/materi" className="text-link">Buka materi <ArrowRight size={16} /></Link></div></section>}
    {knownCount > 0 && <button type="button" className="flash-reset" onClick={() => flashcardKnown.forEach((id) => markFlashcardReview(id))}><RotateCcw size={14} /> Reset kartu yang sudah dikuasai</button>}
  </div></div>;
}
