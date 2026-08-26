// Style reminder: Paper Playground — reading view prioritizes calm paper space, strong article rhythm, and quiz feedback that feels encouraging.

import { ArrowLeft, ArrowRight, Bookmark, Bot, BrainCircuit, Check, ChevronDown, ClipboardCheck, Clock3, Database, Eye, EyeOff, Lightbulb, Maximize2, Minus, Plus, RotateCcw, Search, ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { toast } from "sonner";
import { getFocusedCatalogueHref, materials } from "@/lib/materials";
import { useLearning } from "@/contexts/LearningContext";
import { glossaryTerms } from "@/lib/glossary";
import { aiEngineeringChapterQuizzes } from "@/lib/aiEngineeringChapterQuizzes";
import { getChapterCompletedCount, getChapterReadCount, getChapterReadPercent } from "@/lib/chapterReading";
import { getEvidenceChecklist, getEvidenceKey } from "@/lib/courseJourney";
import { defaultReadingPreferences, loadReadingPreferences, normalizeReadingPreferences, readingPreferenceClassNames, saveReadingPreferences, type ReadingColumnWidth, type ReadingFont, type ReadingPreferences, type ReadingTextScale } from "@/lib/readingPreferences";
import WorkbookInspiration from "@/components/WorkbookInspiration";

const visualAnalogies = [
  { title: "AI belajar seperti melihat banyak contoh resep.", copy: "Bayangkan kamu belajar membedakan teh dan kopi dari banyak cangkir. Makin beragam contoh yang kamu lihat, makin baik kamu mengenali polanya—tetap perlu mengecek hasilnya." },
  { title: "Sistem AI seperti persimpangan yang perlu rambu.", copy: "Data masuk, model menilai, lalu hasil keluar. Rambu, batas, dan pemeriksaan manusia menjaga keputusan tidak melaju ke arah yang salah." },
  { title: "Produk AI dibangun seperti meja kerja kecil.", copy: "Data, model, dan pengalaman pengguna adalah komponen yang dirakit satu per satu. Manusia tetap memberi pemeriksaan akhir sebelum hasil dipakai." },
] as const;

export default function MaterialDetail() {
  const [, params] = useRoute("/materi/:id");
  const [, navigate] = useLocation();
  const id = Number(params?.id) || 1;
  const material = materials.find((item) => item.id === id) ?? materials[0];
  const {
    completed,
    scores,
    bookmarks,
    chapterReadLessons,
    markComplete,
    toggleComplete,
    markCurrent,
    markChapterLessonRead,
    saveQuizAttempt,
    toggleBookmark,
    projectEvidence,
    setProjectEvidence,
    syncStatus,
  } = useLearning();

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [chapterAnswers, setChapterAnswers] = useState<Record<number, number>>({});
  const [chapterSubmitted, setChapterSubmitted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [glossaryQuery, setGlossaryQuery] = useState("");
  const [diagramOpen, setDiagramOpen] = useState(false);
  const [diagramZoom, setDiagramZoom] = useState(1);
  const [diagramAnswer, setDiagramAnswer] = useState<number | null>(null);
  const [diagramSubmitted, setDiagramSubmitted] = useState(false);
  const [readingPreferences, setReadingPreferences] = useState<ReadingPreferences>(() => {
    const stored = loadReadingPreferences();
    if (typeof window === "undefined") return stored;
    const query = new URLSearchParams(window.location.search);
    return normalizeReadingPreferences({
      textScale: query.get("reading-size") ?? stored.textScale,
      font: query.get("reading-font") ?? stored.font,
      columnWidth: query.get("reading-width") ?? stored.columnWidth,
    });
  });
  const [readingSettingsOpen, setReadingSettingsOpen] = useState(() => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("reading-settings") === "open");
  const [pageTurnDirection, setPageTurnDirection] = useState<"forward" | "back">("forward");
  const [focusMode, setFocusMode] = useState(false);

  const isAiEngineering = material.specialization === "ai-engineering";
  const isDone = completed.includes(material.id);
  const isBookmarked = bookmarks.includes(material.id);
  const visibleNumber = String(material.displayNumber ?? material.id).padStart(2, "0");
  const chapterLabel = isAiEngineering ? material.title.match(/^Bab\s+(\d+\.\d+)/)?.[1] : undefined;
  const chapterNumber = isAiEngineering ? Number(chapterLabel?.split(".")[0]) : undefined;
  const focusedCatalogueHref = getFocusedCatalogueHref(material.specialization);
  const chapterMaterials = useMemo(() => chapterNumber ? materials
    .filter((item) => item.specialization === "ai-engineering" && item.category === material.category)
    .sort((left, right) => (left.displayNumber ?? left.id) - (right.displayNumber ?? right.id)) : [], [chapterNumber, material.category]);
  const chapterReadCount = chapterNumber ? getChapterReadCount(chapterReadLessons[chapterNumber] ?? [], chapterMaterials.map((item) => item.id)) : 0;
  const chapterCompletedCount = getChapterCompletedCount(completed, chapterMaterials.map((item) => item.id));
  const chapterCompletedPercent = getChapterReadPercent(chapterCompletedCount, chapterMaterials.length);
  const chapterQuiz = chapterNumber ? aiEngineeringChapterQuizzes[chapterNumber] : undefined;
  const isChapterEnd = chapterMaterials.at(-1)?.id === material.id;
  const visualAnalogy = visualAnalogies[(material.id - 1) % visualAnalogies.length];
  const isEvidenceAnchor = Boolean(material.specialization) && materials.filter((item) => item.specialization === material.specialization && item.category === material.category).sort((left, right) => left.id - right.id)[0]?.id === material.id;
  const evidenceKey = getEvidenceKey(material);
  const evidenceChecklist = isEvidenceAnchor ? getEvidenceChecklist(material) : [];
  const evidence = projectEvidence[evidenceKey] ?? { checked: [], reflection: "", updatedAt: "" };
  const prev = materials.find((item) => item.id === material.id - 1);
  const next = materials.find((item) => item.id === material.id + 1);
  const spreadSectionCount = Math.max(1, Math.ceil(material.sections.length / 2));
  const score = useMemo(() => material.quiz.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0), [answers, material.quiz]);
  const chapterScore = useMemo(() => chapterQuiz?.questions.reduce((total, question, index) => total + (chapterAnswers[index] === question.answer ? 1 : 0), 0) ?? 0, [chapterAnswers, chapterQuiz]);
  const glossaryMatches = useMemo(() => glossaryTerms
    .filter((term) => `${term.term} ${term.definition} ${term.category}`.toLowerCase().includes(glossaryQuery.trim().toLowerCase()))
    .slice(0, 8), [glossaryQuery]);

  useEffect(() => {
    if (!diagramOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setDiagramOpen(false); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); };
  }, [diagramOpen]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    setAnswers({});
    setSubmitted(false);
    setChapterAnswers({});
    setChapterSubmitted(false);
    setDiagramAnswer(null);
    setDiagramSubmitted(false);
  }, [material.id]);

  useEffect(() => {
    if (chapterNumber) markChapterLessonRead(chapterNumber, material.id);
  }, [chapterNumber, material.id, markChapterLessonRead]);

  useEffect(() => { saveReadingPreferences(readingPreferences); }, [readingPreferences]);

  const chooseAnswer = (questionIndex: number, optionIndex: number) => {
    if (!submitted) setAnswers((previous) => ({ ...previous, [questionIndex]: optionIndex }));
  };
  const submitQuiz = () => {
    const wrongQuestions = material.quiz.flatMap((question, index) => answers[index] === question.answer ? [] : [{
      id: `${material.id}-${index}`,
      question: question.question,
      answer: question.options[question.answer],
      explanation: question.explanation,
      materialId: material.id,
      materialTitle: material.title,
    }]);
    setSubmitted(true);
    saveQuizAttempt(material.id, score, material.quiz.length, wrongQuestions);
    toast(score === material.quiz.length ? "Mantap! Quiz kamu sempurna." : `Quiz selesai: ${score}/${material.quiz.length}. Coba ulang kalau mau naik skor!`);
  };
  const submitChapterQuiz = () => {
    if (!chapterQuiz) return;
    setChapterSubmitted(true);
    saveQuizAttempt(`chapter-${chapterQuiz.chapter}`, chapterScore, chapterQuiz.questions.length);
    toast(chapterScore === chapterQuiz.questions.length ? "Bab ini kamu kuasai dengan sangat baik." : `Uji bab selesai: ${chapterScore}/${chapterQuiz.questions.length}. Tinjau lagi konsep yang masih ragu.`);
  };
  const finish = () => {
    const wasDone = completed.includes(material.id);
    toggleComplete(material.id);
    if (!wasDone) markCurrent(next?.id ?? material.id);
    toast(wasDone ? "Tanda selesai dibatalkan. Kamu dapat menandainya lagi kapan saja." : "Subbab ditandai selesai. Progres kamu diperbarui.");
  };
  const submitDiagramQuiz = () => {
    if (diagramAnswer === null || !material.diagramQuiz) return;
    setDiagramSubmitted(true);
    saveQuizAttempt(`${material.id}-diagram`, diagramAnswer === material.diagramQuiz.answer ? 1 : 0, 1);
    toast(diagramAnswer === material.diagramQuiz.answer ? "Diagram kebaca dengan mantap." : "Belum tepat. Coba lihat lagi arah panahnya.");
  };
  const updateReadingPreference = <Key extends keyof ReadingPreferences>(key: Key, value: ReadingPreferences[Key]) => {
    setReadingPreferences((current) => ({ ...current, [key]: value }));
  };
  const turnPage = (target: typeof material, direction: "forward" | "back") => {
    setPageTurnDirection(direction);
    markCurrent(target.id);
    navigate(`/materi/${target.id}`);
  };

  return <div className={`page material-detail-track-${material.specialization ?? "core"} ${focusMode ? "reader-focus-mode" : ""}`}>
    <div className="detail-layout page-wrap">
      <div className="open-book-spread" aria-label="Buku terbuka dua halaman">
      <aside className="open-book-left-page" aria-label="Halaman kiri buku"><span className="eyebrow">MATERI DI HALAMAN KIRI</span>{material.chapterLecture && <section className="spread-left-chapter-lecture"><span className="eyebrow">MULAI DARI BUKU</span><h2>{material.chapterLecture.title}</h2>{material.chapterLecture.body.split("\n\n").slice(0, 2).map((paragraph, index) => <p key={`spread-lecture-${material.id}-${index}`}>{paragraph}</p>)}</section>}{material.bookContext && <section className="spread-left-context"><span className="eyebrow">KONTEKS SUBBAB</span><h2>{material.bookContext.title}</h2>{material.bookContext.body.split("\n\n").slice(0, 2).map((paragraph, index) => <p key={`spread-context-${material.id}-${index}`}>{paragraph}</p>)}</section>}<div className="spread-left-sections">{material.sections.slice(0, spreadSectionCount).map((section, index) => <section key={`spread-left-${section.heading}`}><span>{String(index + 1).padStart(2, "0")}</span><div><small className="section-page-number">Lembar {visibleNumber} · bagian {String(index + 1).padStart(2, "0")}</small><h2>{section.heading}</h2>{section.body.split("\n\n").slice(0, 2).map((paragraph, paragraphIndex) => <p key={`spread-left-${section.heading}-${paragraphIndex}`}>{paragraph}</p>)}</div></section>)}</div><span className="open-book-page-number">{visibleNumber} · BUKU BELAJAR.AI</span></aside>
      <article key={material.id} className={`lesson-article lesson-article-enter binder-sheet binder-turn-${pageTurnDirection} ${readingPreferenceClassNames(readingPreferences)}`}>
        <div className="binder-page-tabs" aria-hidden="true"><span>Bab {chapterNumber ?? "✦"}</span><span>Halaman {visibleNumber}</span><span>{material.level}</span></div>
        <div className="article-meta">
          <span className="sticker-label">{isAiEngineering ? material.category.replace("AI Engineering · ", "") : material.category}</span>
          <span><Clock3 size={15} /> {material.minutes} menit baca</span>
          <span>·</span>
          <span>{material.level}</span>
          <button type="button" className={`article-save-material ${isBookmarked ? "saved" : ""}`} onClick={() => toggleBookmark(material.id)} aria-pressed={isBookmarked}><Bookmark size={14} fill={isBookmarked ? "currentColor" : "none"} /> {isBookmarked ? "Tersimpan" : "Simpan materi"}</button>
          <button type="button" className="reader-focus-toggle" onClick={() => setFocusMode((active) => !active)} aria-pressed={focusMode} aria-label={focusMode ? "Tampilkan daftar isi" : "Sembunyikan daftar isi untuk fokus"}>{focusMode ? <Eye size={14} /> : <EyeOff size={14} />} {focusMode ? "Tampilkan rail" : "Fokus baca"}</button>
        </div>

        <div className="article-heading">
          <span className="article-number">{chapterLabel ?? visibleNumber}</span>
          <h1>{material.title}</h1>
          <p>{material.summary}</p>
        </div>

        <nav className="binder-page-turner" aria-label="Balik halaman materi">
          {prev ? <button type="button" onClick={() => turnPage(prev, "back")}><ArrowLeft size={16} /><span>Balik<br />{prev.title}</span></button> : <span />}
          {next ? <button type="button" onClick={() => turnPage(next, "forward")}><span>Lembar berikutnya<br />{next.title}</span><ArrowRight size={16} /></button> : <span />}
        </nav>

        <div className="spread-mobile-inspiration"><WorkbookInspiration specialization={material.specialization} materialId={material.id} /></div>

        <section className="reader-preferences" aria-label="Pengaturan membaca">
          <div className="reader-preferences-bar"><div><span className="eyebrow">TAMPILAN BACA</span><p>Atur agar materi terasa pas di matamu. Tersimpan di perangkat ini.</p></div><button type="button" className="reader-preferences-trigger" aria-expanded={readingSettingsOpen} onClick={() => setReadingSettingsOpen((open) => !open)}><SlidersHorizontal size={16} /> {readingSettingsOpen ? "Tutup pengaturan" : "Atur bacaan"}</button></div>
          {readingSettingsOpen && <div className="reader-preferences-panel">
            <fieldset><legend>Ukuran teks</legend><div>{([ ["compact", "Rapat"], ["comfortable", "Nyaman"], ["generous", "Lega"] ] as const).map(([value, label]) => <button type="button" key={value} className={readingPreferences.textScale === value ? "reader-choice-active" : ""} aria-pressed={readingPreferences.textScale === value} onClick={() => updateReadingPreference("textScale", value as ReadingTextScale)}>{label}</button>)}</div></fieldset>
            <fieldset><legend>Jenis font</legend><div>{([ ["sans", "Sans modern"], ["serif", "Serif buku"], ["accessible", "Mudah baca"] ] as const).map(([value, label]) => <button type="button" key={value} className={readingPreferences.font === value ? "reader-choice-active" : ""} aria-pressed={readingPreferences.font === value} onClick={() => updateReadingPreference("font", value as ReadingFont)}>{label}</button>)}</div></fieldset>
            <fieldset><legend>Lebar kolom</legend><div>{([ ["narrow", "Rapat"], ["standard", "Normal"], ["wide", "Lapang"] ] as const).map(([value, label]) => <button type="button" key={value} className={readingPreferences.columnWidth === value ? "reader-choice-active" : ""} aria-pressed={readingPreferences.columnWidth === value} onClick={() => updateReadingPreference("columnWidth", value as ReadingColumnWidth)}>{label}</button>)}</div></fieldset>
            <button type="button" className="reader-reset" onClick={() => setReadingPreferences(defaultReadingPreferences)}>Kembalikan tampilan standar</button>
          </div>}
        </section>

        {chapterNumber && <section className="chapter-reading-progress" aria-label={`Progres membaca Bab ${chapterNumber}`}>
          <div><span className="eyebrow">PROGRES SUBBAB BAB {chapterNumber}</span><strong>{chapterCompletedCount} dari {chapterMaterials.length} subbab sudah selesai</strong></div>
          <div className="chapter-progress-meter" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={chapterCompletedPercent}><i style={{ width: `${chapterCompletedPercent}%` }} /></div>
          <b>{chapterCompletedPercent}%</b>
        </section>}

        {material.chapterLecture && <section className="chapter-lecture spread-right-desktop-hidden" aria-labelledby={`chapter-lecture-${material.id}`}>
          <header><span className="eyebrow">MULAI DARI BUKU</span><h2 id={`chapter-lecture-${material.id}`}>{material.chapterLecture.title}</h2></header>
          <div>{material.chapterLecture.body.split("\n\n").map((paragraph, index) => <p key={`${material.id}-chapter-lecture-${index}`}>{paragraph}</p>)}</div>
          <aside><span className="eyebrow">PERTANYAAN KUNCI BAB INI</span><ol>{material.chapterLecture.questions.map((question) => <li key={question}>{question}</li>)}</ol></aside>
        </section>}

        {material.bookContext && <section className="sublesson-book-context spread-right-desktop-hidden" aria-labelledby={`book-context-${material.id}`}>
          <header><span className="eyebrow">MULAI DARI BUKU · KONTEKS SUBBAB</span><h2 id={`book-context-${material.id}`}>{material.bookContext.title}</h2></header>
          <div>{material.bookContext.body.split("\n\n").map((paragraph, index) => <p key={`${material.id}-book-context-${index}`}>{paragraph}</p>)}</div>
        </section>}

        <section className="lesson-visual-analogy" aria-labelledby={`visual-analogy-${material.id}`}><div className="lesson-visual-image" data-visual-mode="native-flow" role="img" aria-label="Alur sederhana: data masuk, AI memproses, hasil diperiksa manusia"><div className="visual-sticker visual-sticker-top">POLA MASUK</div><div className="visual-route"><div className="visual-step visual-data"><Database size={32} /><strong>DATA</strong><span>contoh & konteks</span></div><ArrowRight className="visual-arrow" size={24} aria-hidden="true" /><div className="visual-step visual-ai"><BrainCircuit size={36} /><strong>AI</strong><span>membaca pola</span></div><ArrowRight className="visual-arrow" size={24} aria-hidden="true" /><div className="visual-step visual-output"><Lightbulb size={32} /><strong>HASIL</strong><span>saran awal</span></div></div><div className="visual-human-check"><Bot size={28} /><span>manusia<br />cek lagi</span><ShieldCheck size={26} /></div><span className="visual-spark visual-spark-one">✦</span><span className="visual-spark visual-spark-two">✹</span></div><div className="lesson-visual-copy"><span className="eyebrow">LIHAT DENGAN GAMBAR</span><h2 id={`visual-analogy-${material.id}`}>{visualAnalogy.title}</h2><p>{visualAnalogy.copy}</p><div className="analogy-box"><span className="eyebrow">ANALOGI GAMPANG</span><p>{material.analogy}</p></div></div></section>

        {isAiEngineering && <section className="lesson-glossary" aria-labelledby="reader-glossary-title">
          <div className="lesson-glossary-heading"><div><span className="eyebrow">BANTUAN ISTILAH</span><h2 id="reader-glossary-title">Cari definisi tanpa meninggalkan pelajaran.</h2></div><button type="button" className="glossary-toggle" onClick={() => setGlossaryOpen((value) => !value)} aria-expanded={glossaryOpen}><Search size={16} /> {glossaryOpen ? "Tutup glosarium" : "Buka glosarium"}</button></div>
          {glossaryOpen && <div className="lesson-glossary-popover"><label htmlFor="reader-glossary-search">Cari istilah AI</label><div className="glossary-search-input"><Search size={16} /><input id="reader-glossary-search" autoFocus value={glossaryQuery} onChange={(event) => setGlossaryQuery(event.target.value)} placeholder="Contoh: RAG, token, evaluation..." /></div><div className="glossary-match-list">{glossaryMatches.map((term) => <Link href={`/materi/${term.materialId}`} key={term.term} className="glossary-match"><strong>{term.term}</strong><span>{term.definition}</span><small>{term.category} · buka materi terkait</small></Link>)}{glossaryMatches.length === 0 && <p className="glossary-empty">Istilah belum ditemukan. Coba kata kunci yang lebih umum.</p>}</div></div>}
        </section>}

        {material.caseStudy && <section className="chained-case-study" aria-labelledby={`case-study-${material.id}`}>
          <header><span className="eyebrow">STUDI KASUS BERANTAI</span><p className="case-study-phase">{material.caseStudy.phase}</p><h2 id={`case-study-${material.id}`}>{material.caseStudy.title}</h2></header>
          <div className="case-study-narrative">{material.caseStudy.narrative.split("\n\n").map((paragraph, index) => <p key={`${material.id}-case-narrative-${index}`}>{paragraph}</p>)}</div>
          <div className="case-study-grid"><section className="case-study-artifact"><span className="eyebrow">ARTEFAK TIM</span><h3>{material.caseStudy.artifactTitle}</h3><p>{material.caseStudy.artifact}</p></section><section className="case-study-teaching"><span className="eyebrow">CATATAN DOSEN</span><h3>Hal yang perlu diperhatikan</h3><p>{material.caseStudy.teachingPoint}</p></section></div>
          <div className="case-study-questions"><span className="eyebrow">PERTANYAAN BIMBINGAN</span><h3>Berhenti sejenak dan jawab sebelum melanjutkan.</h3><ol>{material.caseStudy.guidedQuestions.map((question) => <li key={question}>{question}</li>)}</ol></div>
        </section>}

        {material.sections.map((section, index) => <section className={`article-section ${index < spreadSectionCount ? "spread-right-desktop-hidden" : ""}`} id={`section-${material.id}-${index + 1}`} key={section.heading}><span className="section-index">{String(index + 1).padStart(2, "0")}</span><div className="article-section-copy"><small className="section-page-number">Lembar {visibleNumber} · bagian {String(index + 1).padStart(2, "0")}/{String(material.sections.length).padStart(2, "0")}</small><h2>{section.heading}</h2>{section.body.split("\n\n").map((paragraph, paragraphIndex) => <p key={`${section.heading}-${paragraphIndex}`}>{paragraph}</p>)}</div></section>)}

        {material.deepDive && <section className="priority-deep-dive" aria-labelledby={`deep-dive-${material.id}`}><header><span className="eyebrow">CONTOH KERJA · MATERI PRIORITAS</span><h2 id={`deep-dive-${material.id}`}>{material.deepDive.exampleTitle}</h2></header><div className="deep-dive-example"><p>{material.deepDive.example}</p></div><div className="deep-dive-grid"><section><span className="eyebrow">KESALAHAN UMUM</span><p>{material.deepDive.commonMistake}</p></section><section><span className="eyebrow">RUBRIK ARTEFAK</span><ol>{material.deepDive.rubric.map((item) => <li key={item}>{item}</li>)}</ol></section></div></section>}

        {!isAiEngineering && <div className="article-callout"><span>✦</span><div><strong>Catatan singkat.</strong><p>Coba jelaskan konsep ini dengan satu contoh dari aplikasi yang kamu gunakan sehari-hari.</p></div></div>}

        {evidenceChecklist.length > 0 && <section className="project-evidence-box" aria-labelledby={`project-evidence-${material.id}`}>
          <header><div><span className="eyebrow">PROJECT EVIDENCE · PRIVAT</span><h2 id={`project-evidence-${material.id}`}>Buat jejak keputusan, bukan sekadar centang selesai.</h2><p>Jawaban ini tersimpan di progres akunmu dan menjadi bahan rangkuman capstone. Tidak dipublikasikan sebagai testimonial atau profil umum.</p></div><Link href="/portfolio" className="project-evidence-link"><ClipboardCheck size={16} /> Lihat portfolio</Link></header>
          <div className="project-evidence-grid"><div className="evidence-checklist">{evidenceChecklist.map((item) => { const checked = evidence.checked.includes(item); return <label key={item}><input type="checkbox" checked={checked} onChange={() => setProjectEvidence(evidenceKey, checked ? evidence.checked.filter((current) => current !== item) : [...evidence.checked, item], evidence.reflection)} /><span><Check size={13} /></span>{item}</label>; })}</div><div className="evidence-reflection"><label htmlFor={`evidence-reflection-${material.id}`}>REFLEKSI SINGKAT</label><textarea id={`evidence-reflection-${material.id}`} value={evidence.reflection} onChange={(event) => setProjectEvidence(evidenceKey, evidence.checked, event.target.value)} maxLength={4000} placeholder="Apa keputusan, batas, atau bukti yang kamu pilih di checkpoint ini?" /><small>{evidence.reflection.length}/4000 · {syncStatus === "syncing" ? "menyimpan…" : syncStatus === "offline" ? "tersimpan lokal, sinkronkan lagi saat online" : "tersimpan otomatis"}</small></div></div>
        </section>}

        {material.diagram && <>
          <figure className="lesson-diagram"><div className="diagram-label"><span className="eyebrow">PETA VISUAL</span><button type="button" className="diagram-expand-button" onClick={() => { setDiagramOpen(true); setDiagramZoom(1); }} aria-label={`Perbesar diagram: ${material.diagram.caption}`}><Maximize2 size={14} /> <span>Lihat layar penuh</span></button></div><button type="button" className="diagram-frame diagram-frame-button" onClick={() => { setDiagramOpen(true); setDiagramZoom(1); }} aria-label={`Buka diagram dalam mode layar penuh: ${material.diagram.caption}`}><img src={material.diagram.src} alt={material.diagram.alt} /></button><figcaption><strong>{material.diagram.caption}</strong><p>{material.diagram.note}</p></figcaption></figure>
          {diagramOpen && <div className="diagram-modal" role="dialog" aria-modal="true" aria-label={`Diagram: ${material.diagram.caption}`} onMouseDown={(event) => { if (event.target === event.currentTarget) setDiagramOpen(false); }}><div className="diagram-modal-panel"><div className="diagram-modal-toolbar"><div><span className="eyebrow">PETA VISUAL</span><strong>{material.diagram.caption}</strong></div><div className="diagram-modal-actions"><button type="button" onClick={() => setDiagramZoom((zoom) => Math.max(.75, Number((zoom - .25).toFixed(2))))} aria-label="Perkecil diagram"><Minus size={17} /></button><span>{Math.round(diagramZoom * 100)}%</span><button type="button" onClick={() => setDiagramZoom((zoom) => Math.min(2, Number((zoom + .25).toFixed(2))))} aria-label="Perbesar diagram"><Plus size={17} /></button><button type="button" onClick={() => setDiagramOpen(false)} aria-label="Tutup layar penuh"><X size={19} /></button></div></div><div className="diagram-modal-stage"><img src={material.diagram.src} alt={material.diagram.alt} style={{ transform: `scale(${diagramZoom})` }} /></div><p className="diagram-modal-hint">Gunakan tombol zoom untuk memperbesar. Tekan Escape atau klik area luar untuk menutup.</p></div></div>}
          {material.diagramQuiz && <section className="diagram-quiz"><div className="diagram-quiz-heading"><span className="eyebrow">CEK CEPAT</span><span>{diagramSubmitted ? "Sudah dijawab" : "1 soal visual"}</span></div><h3>{material.diagramQuiz.question}</h3><div className="diagram-quiz-options">{material.diagramQuiz.options.map((option, optionIndex) => { const selected = diagramAnswer === optionIndex; const correct = diagramSubmitted && optionIndex === material.diagramQuiz?.answer; const wrong = diagramSubmitted && selected && !correct; return <button type="button" key={option} className={`diagram-quiz-option ${selected ? "selected" : ""} ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`} onClick={() => !diagramSubmitted && setDiagramAnswer(optionIndex)}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}{correct && <Check size={14} />}</button>; })}</div>{diagramSubmitted && <p className={`diagram-quiz-feedback ${diagramAnswer === material.diagramQuiz.answer ? "good" : "bad"}`}>{diagramAnswer === material.diagramQuiz.answer ? "✓ Mantap, kamu membaca alurnya dengan tepat. " : "↗ Belum tepat. "}{material.diagramQuiz.explanation}</p>}<div className="diagram-quiz-actions">{diagramSubmitted ? <button type="button" className="text-button" onClick={() => { setDiagramSubmitted(false); setDiagramAnswer(null); }}><RotateCcw size={14} /> Ulangi</button> : <button type="button" className="brutal-button button-black" disabled={diagramAnswer === null} onClick={submitDiagramQuiz}>Cek jawaban <ArrowRight size={15} /></button>}</div></section>}
        </>}

        {!isAiEngineering && material.resources && <section className="lesson-resources"><span className="eyebrow">SUMBER & DOKUMENTASI</span><h2>Lanjutkan dari sumber asli.</h2><p>Gunakan referensi ini untuk memeriksa versi terbaru, membaca batasan, dan mengikuti setup dengan nilai rahasia milikmu sendiri.</p><div>{material.resources.map((resource) => <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer"><strong>{resource.label}</strong><span>{resource.note ?? "Buka sumber"} ↗</span></a>)}</div></section>}
        {!isAiEngineering && <div className="practice-box"><div className="practice-sticker">TANTANGAN<br />2 MENIT</div><div><span className="eyebrow">WORKSHEET MINI</span><h3>Tarik konsep ini ke dunia nyata.</h3><p>Pilih satu aplikasi yang kamu pakai hari ini. Di mana kamu melihat konsep <strong>{material.title.split(":")[0]}</strong> bekerja?</p><div className="practice-lines"><span /><span /></div></div></div>}

        <section className="quiz-box"><div className="quiz-heading"><div><span className="eyebrow">CEK PEMAHAMAN</span><h2>Quiz mini, biar makin nempel.</h2></div><span className="quiz-score">{submitted ? `${score}/${material.quiz.length}` : `${material.quiz.length} soal`}</span></div>{material.quiz.map((question, questionIndex) => <div className="quiz-question" key={question.question}><div className="question-number">0{questionIndex + 1}</div><div className="question-content"><h3>{question.question}</h3><div className="quiz-options">{question.options.map((option, optionIndex) => { const chosen = answers[questionIndex] === optionIndex; const correct = submitted && optionIndex === question.answer; const wrong = submitted && chosen && !correct; return <button type="button" key={option} className={`quiz-option ${chosen ? "option-chosen" : ""} ${correct ? "option-correct" : ""} ${wrong ? "option-wrong" : ""}`} onClick={() => chooseAnswer(questionIndex, optionIndex)}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}{correct && <Check size={15} />}</button>; })}</div>{submitted && <p className={`quiz-feedback ${answers[questionIndex] === question.answer ? "feedback-good" : "feedback-bad"}`}>{answers[questionIndex] === question.answer ? "✓ " : "↗ "}{answers[questionIndex] === question.answer ? question.explanation : `Belum tepat. ${question.explanation}`}</p>}</div></div>)}<div className="quiz-actions">{submitted ? <button type="button" className="text-button" onClick={() => { setSubmitted(false); setAnswers({}); }}><RotateCcw size={15} /> Ulangi quiz</button> : <button type="button" className="brutal-button button-pink" onClick={submitQuiz} disabled={Object.keys(answers).length !== material.quiz.length}>Cek jawaban <ArrowRight size={17} /></button>}</div></section>

        {isChapterEnd && chapterQuiz && <section className="chapter-end-quiz" aria-labelledby={`chapter-quiz-${chapterQuiz.chapter}`}><header><div><span className="eyebrow">KUIS AKHIR BAB {chapterQuiz.chapter}</span><h2 id={`chapter-quiz-${chapterQuiz.chapter}`}>{chapterQuiz.title}</h2><p>{chapterQuiz.intro}</p></div><span className="chapter-quiz-score">{chapterSubmitted ? `${chapterScore}/${chapterQuiz.questions.length}` : `${chapterQuiz.questions.length} soal konsep`}</span></header>{chapterQuiz.questions.map((question, questionIndex) => <div className="chapter-quiz-question" key={question.question}><span>{String(questionIndex + 1).padStart(2, "0")}</span><div><h3>{question.question}</h3><div className="chapter-quiz-options">{question.options.map((option, optionIndex) => { const selected = chapterAnswers[questionIndex] === optionIndex; const correct = chapterSubmitted && optionIndex === question.answer; const wrong = chapterSubmitted && selected && !correct; return <button type="button" key={option} className={`${selected ? "selected" : ""} ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`} onClick={() => !chapterSubmitted && setChapterAnswers((previous) => ({ ...previous, [questionIndex]: optionIndex }))}><b>{String.fromCharCode(65 + optionIndex)}</b>{option}{correct && <Check size={15} />}</button>; })}</div>{chapterSubmitted && <p className={chapterAnswers[questionIndex] === question.answer ? "chapter-feedback-good" : "chapter-feedback-bad"}>{chapterAnswers[questionIndex] === question.answer ? "✓ " : "↗ "}{question.explanation}</p>}</div></div>)}<footer>{chapterSubmitted ? <button type="button" className="text-button" onClick={() => { setChapterSubmitted(false); setChapterAnswers({}); }}><RotateCcw size={15} /> Ulangi kuis akhir bab</button> : <button type="button" className="brutal-button button-black" disabled={Object.keys(chapterAnswers).length !== chapterQuiz.questions.length} onClick={submitChapterQuiz}>Nilai pemahaman bab <ArrowRight size={17} /></button>}</footer></section>}

        <div className="lesson-complete"><div><span className="eyebrow">PROGRES SUBBAB</span><h2>{isDone ? "Subbab ini sudah masuk progresmu." : "Tandai subbab ini setelah selesai belajar."}</h2><p>{isDone ? `Skor terbaikmu ${scores[material.id] ?? 0}/${material.quiz.length}. Kamu dapat membatalkan penanda bila ingin mengulang.` : "Gunakan penanda ini untuk melacak perjalanan dari Bab 1.1 sampai Bab 10.6."}</p></div><button type="button" className={`brutal-button ${isDone ? "button-white" : "button-black"}`} onClick={finish} aria-pressed={isDone}>{isDone ? <><Check size={17} /> Selesai · batalkan</> : <>Tandai selesai <Check size={17} /></>}</button></div>

      </article>
      </div>

      <aside className={`lesson-sidebar lesson-outline-rail ${sidebarOpen ? "lesson-sidebar-open" : ""}`}>
        <button type="button" className="lesson-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>Lihat daftar isi bab <ChevronDown size={17} /></button>
        <div className="lesson-sidebar-inner">
          <Link href={focusedCatalogueHref} className="back-link"><ArrowLeft size={15} /> Kembali ke jalur</Link>
          <span className="lesson-sidebar-label">{chapterNumber ? `DAFTAR ISI BAB ${chapterNumber}` : "DAFTAR SUB-BAB"}</span>
          <strong className="lesson-sidebar-title">{isAiEngineering ? material.category.replace("AI Engineering · ", "") : material.category}</strong>
          {chapterNumber && <div className="sidebar-chapter-progress"><div><span>Subbab selesai</span><b>{chapterCompletedCount}/{chapterMaterials.length}</b></div><div role="progressbar" aria-label={`Progres penyelesaian Bab ${chapterNumber}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={chapterCompletedPercent}><i style={{ width: `${chapterCompletedPercent}%` }} /></div><small>{chapterCompletedPercent}% bab ini sudah ditandai selesai · {chapterReadCount}/{chapterMaterials.length} dibuka</small></div>}
          <div className="lesson-list">{(chapterNumber ? chapterMaterials : materials.filter((item) => item.category === material.category)).map((item) => <Link key={item.id} href={`/materi/${item.id}`} className={item.id === material.id ? "lesson-active" : ""} onClick={() => { setPageTurnDirection(item.id >= material.id ? "forward" : "back"); markCurrent(item.id); if (chapterNumber) markChapterLessonRead(chapterNumber, item.id); }}><span>{item.specialization === "ai-engineering" ? item.title.match(/^Bab\s+(\d+\.\d+)/)?.[1] ?? "✦" : String(item.displayNumber ?? item.id).padStart(2, "0")}</span><b>{item.title}</b>{completed.includes(item.id) && <Check size={14} />}</Link>)}</div>
        </div>
      </aside>
    </div>
  </div>;
}
