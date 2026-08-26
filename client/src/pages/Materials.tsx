import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, CircleDotDashed, Clock3, Layers3 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "wouter";
import { categoryMeta, materials } from "@/lib/materials";
import { isSpecializationId, materialMatchesSpecialization, specializationMeta, specializationOrder, type SpecializationId } from "@/lib/specializations";
import { useLearning } from "@/contexts/LearningContext";
import { getCourseJourney, getCourseStartRecommendation } from "@/lib/courseJourney";

function trackHref(track: SpecializationId) {
  return `/materi?jurusan=${track}`;
}

export default function Materials() {
  const { completed, completedCount, current, progressPercent } = useLearning();
  const searchString = useSearch();
  const trackParam = new URLSearchParams(searchString).get("jurusan");
  const selectedTrack = isSpecializationId(trackParam) ? trackParam : null;
  const [openChapter, setOpenChapter] = useState<string | null>(null);

  useEffect(() => { setOpenChapter(null); }, [selectedTrack]);

  const selectedTrackMeta = selectedTrack ? specializationMeta[selectedTrack] : null;
  const trackMaterials = useMemo(() => materials.filter((material) => materialMatchesSpecialization(material, selectedTrack)).sort((left, right) => selectedTrack === "ai-engineering" ? (left.displayNumber ?? left.id) - (right.displayNumber ?? right.id) : left.id - right.id), [selectedTrack]);
  const trackCompletedCount = trackMaterials.filter((material) => completed.includes(material.id)).length;
  const trackPercent = trackMaterials.length ? Math.round((trackCompletedCount / trackMaterials.length) * 100) : 0;
  const nextMaterial = trackMaterials.find((material) => !completed.includes(material.id)) ?? trackMaterials[0];
  const selectedJourney = getCourseJourney(selectedTrack ?? undefined);
  const courseStart = useMemo(() => selectedTrack ? getCourseStartRecommendation(materials, selectedTrack, completed) : null, [selectedTrack, completed]);
  const chapters = useMemo(() => Array.from(new Set(trackMaterials.map((material) => material.category))).map((chapter, index) => {
    const items = trackMaterials.filter((material) => material.category === chapter);
    const done = items.filter((material) => completed.includes(material.id)).length;
    const upcoming = items.find((material) => !completed.includes(material.id)) ?? items[0];
    return { chapter, items, done, upcoming, index, percent: items.length ? Math.round((done / items.length) * 100) : 0 };
  }), [trackMaterials, completed]);
  const subjects = useMemo(() => specializationOrder.map((id) => {
    const subjectMaterials = materials.filter((material) => materialMatchesSpecialization(material, id));
    const done = subjectMaterials.filter((material) => completed.includes(material.id)).length;
    const chapterCount = new Set(subjectMaterials.map((material) => material.category)).size;
    const next = subjectMaterials.find((material) => !completed.includes(material.id)) ?? subjectMaterials[0];
    return { id, meta: specializationMeta[id], materials: subjectMaterials, done, chapterCount, next };
  }), [completed]);

  if (!selectedTrack) {
    return <div className="page"><div className="page-wrap subject-catalog-page">
      <header className="subject-catalog-hero"><span className="eyebrow">MATA PELAJARAN</span><h1>Jangan buka semua jalan<br /><em>sekaligus.</em></h1><p>Kalau masuk kota baru tanpa Maps, kamu bisa muter-muter dulu. Belajar AI juga begitu. Pilih satu arah yang paling kamu butuhkan; nanti prolog, bab, latihan, dan langkah lanjutnya sudah tertata buat kamu.</p><div className="subject-global-progress"><span><BookOpen size={16} /> {completedCount} dari {materials.length} materi sudah kamu selesaikan</span><div><i style={{ width: `${progressPercent}%` }} /></div><b>{progressPercent}%</b></div></header>
      <section className="subject-grid" aria-label="Daftar mata pelajaran">{subjects.map(({ id, meta, materials: subjectMaterials, done, chapterCount, next }) => <Link key={id} href={trackHref(id)} className={`subject-card subject-card-${meta.accent}`}><div className="subject-card-top"><span className="subject-emoji">{meta.emoji}</span><span>{subjectMaterials.length} materi</span></div><h2>{meta.label}</h2><p>{meta.intro}</p><div className="subject-card-meta"><span>{chapterCount} bab</span><span>{done}/{subjectMaterials.length} selesai</span></div><div className="subject-card-footer"><span>{done ? "Lanjutkan pelajaran" : "Lihat mata pelajaran"}</span><ArrowRight size={18} /></div>{next && <small>Mulai: {next.title}</small>}</Link>)}</section>
      <section className="subject-method"><div><span className="eyebrow">CARA PAKAINYA</span><h2>Anggap ini Maps, bukan tumpukan artikel.</h2></div><div><article><strong>01</strong><p><b>Pilih tujuan dulu.</b> Misalnya kamu pengin bikin produk, olah data, atau ngerti keamanan.</p></article><article><strong>02</strong><p><b>Buka satu bab.</b> Nggak perlu baca semuanya. Ikuti langkah yang paling dekat dari tujuanmu sekarang.</p></article><article><strong>03</strong><p><b>Cek apa yang kebawa.</b> Catat jawaban atau bikin latihan kecil supaya materi nggak cuma lewat.</p></article></div></section>
    </div></div>;
  }

  return <div className="page"><div className={`page-wrap subject-detail-page subject-detail-${selectedTrack}`}>
    <Link href="/materi" className="subject-back"><ArrowLeft size={16} /> Semua mata pelajaran</Link>
    <header className="subject-detail-hero"><span className="subject-emoji">{selectedTrackMeta?.emoji}</span><div><span className="eyebrow">MATA PELAJARAN</span><h1>{selectedTrackMeta?.label}</h1><p>{selectedTrackMeta?.intro}</p><div className="subject-detail-stats"><span>{trackMaterials.length} materi · {chapters.length} bab</span><span>{trackCompletedCount} selesai</span><b>{trackPercent}%</b></div></div></header>
    {nextMaterial && <section className="subject-next-card"><div><span className="eyebrow">LANGKAH YANG PALING MASUK AKAL SEKARANG</span><h2>{nextMaterial.title}</h2><p>{nextMaterial.minutes} menit · {nextMaterial.level}. Nggak perlu langsung ngebut. Buka bagian ini dulu, biar bab setelahnya nggak terasa kayak loncat tanpa pegangan.</p></div><Link href={`/materi/${nextMaterial.id}`} className="brutal-button button-pink">{trackCompletedCount ? "Lanjut dari sini" : "Mulai dari dasar"} <ArrowRight size={17} /></Link></section>}
    {selectedJourney && courseStart && <details className="subject-course-note"><summary>Tentang mata pelajaran ini <ChevronDown size={16} /></summary><div><p><strong>Cocok untuk:</strong> {selectedJourney.fitFor}</p><p><strong>Hasil belajar:</strong> {selectedJourney.outcomes.join(" · ")}</p><p><strong>Artefak akhir:</strong> {selectedJourney.capstone.title}</p>{!courseStart.readyForCorePath && courseStart.preparation[0] && <Link href={`/materi/${courseStart.preparation[0].material.id}`}>Pengantar yang direkomendasikan: {courseStart.preparation[0].material.title} <ArrowRight size={14} /></Link>}</div></details>}
    <section className="subject-chapter-list" aria-label={`Daftar bab ${selectedTrackMeta?.label}`}><div className="subject-chapter-heading"><span className="eyebrow">PETA BAB</span><p>Ini rutenya, bro. Buka satu bab saat kamu siap masuk ke topik itu; subbabnya baru muncul supaya kepala nggak langsung penuh.</p></div>{chapters.map((chapter) => { const open = openChapter === chapter.chapter; return <article className={`subject-chapter ${open ? "subject-chapter-open" : ""}`} key={chapter.chapter}><button type="button" onClick={() => setOpenChapter(open ? null : chapter.chapter)} aria-expanded={open}><span className="subject-chapter-number">{String(chapter.index + 1).padStart(2, "0")}</span><span className="subject-chapter-copy"><small>{categoryMeta[chapter.chapter]?.emoji ?? "✦"} · {chapter.items.length} subbab · {chapter.done} selesai</small><strong>{chapter.chapter}</strong></span><span className="subject-chapter-progress"><i style={{ width: `${chapter.percent}%` }} /></span><ChevronDown size={18} /></button>{open && <div className="subject-sublesson-list">{chapter.items.map((material) => <Link href={`/materi/${material.id}`} key={material.id}><span>{completed.includes(material.id) ? <Check size={15} /> : String(material.displayNumber ?? material.id).padStart(2, "0")}</span><div><strong>{material.title}</strong><small>{material.minutes} menit · {material.level}</small></div><ArrowRight size={15} /></Link>)}{chapter.upcoming && <Link className="subject-chapter-cta" href={`/materi/${chapter.upcoming.id}`}><CircleDotDashed size={16} /> {chapter.percent === 100 ? "Buka lagi buat ngingetin" : "Gas ke langkah ini"}</Link>}</div>}</article>; })}</section>
  </div></div>;
}
