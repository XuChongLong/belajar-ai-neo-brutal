// Style reminder: Paper Playground — the catalogue behaves like a guided workbook, with routes, chapter checkpoints, and tactile filter controls.

import { ArrowRight, Bookmark, Check, ChevronDown, CircleDotDashed, ExternalLink, Filter, GitBranch, Map as MapIcon, Search, SlidersHorizontal, Timer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import MaterialCard from "@/components/MaterialCard";
import { categories, categoryMeta, levels, materials } from "@/lib/materials";
import { isSpecializationId, materialMatchesSpecialization, specializationMeta, specializationOrder, type SpecializationId } from "@/lib/specializations";
import { useLearning } from "@/contexts/LearningContext";
import { getCourseJourney, getCourseSourceMap, getCourseStartRecommendation } from "@/lib/courseJourney";
import { getCatalogSearchMatches } from "@/lib/fullTextSearch";

type LearningFilter = "all" | "in-progress" | "completed" | "not-started";

function trackHref(track: SpecializationId | null) {
  return track ? `/materi?jurusan=${track}` : "/materi";
}

export default function Materials() {
  const { bookmarks, completed, completedCount, current, progressPercent } = useLearning();
  const [, navigate] = useLocation();
  const searchString = useSearch();
  const trackParam = new URLSearchParams(searchString).get("jurusan");
  const searchParam = new URLSearchParams(searchString).get("q") ?? "";
  const selectedTrack = isSpecializationId(trackParam) ? trackParam : null;
  const selectedTrackMeta = selectedTrack ? specializationMeta[selectedTrack] : null;
  const [search, setSearch] = useState(searchParam);
  const [category, setCategory] = useState(categories[0]);
  const [level, setLevel] = useState(levels[0]);
  const [learningFilter, setLearningFilter] = useState<LearningFilter>("all");
  const [onlySaved, setOnlySaved] = useState(() => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("filter") === "saved");
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);

  useEffect(() => { setSearch(searchParam); }, [searchParam]);

  const trackMaterials = useMemo(() => materials.filter((material) => materialMatchesSpecialization(material, selectedTrack)).sort((left, right) => {
    if (selectedTrack === "ai-engineering") return (left.displayNumber ?? left.id) - (right.displayNumber ?? right.id);
    return left.id - right.id;
  }), [selectedTrack]);
  const trackCompletedCount = trackMaterials.filter((material) => completed.includes(material.id)).length;
  const trackPercent = trackMaterials.length ? Math.round((trackCompletedCount / trackMaterials.length) * 100) : 0;
  const emptyReservedTrack = Boolean(selectedTrackMeta && trackMaterials.length === 0);
  const nextMaterial = trackMaterials.find((material) => !completed.includes(material.id)) ?? trackMaterials[0];
  const selectedJourney = getCourseJourney(selectedTrack ?? undefined);
  const courseStart = useMemo(() => selectedTrack ? getCourseStartRecommendation(materials, selectedTrack, completed) : null, [selectedTrack, completed]);
  const sourceMap = useMemo(() => selectedTrack ? getCourseSourceMap(materials, selectedTrack) : [], [selectedTrack]);
  const searchHits = useMemo(() => getCatalogSearchMatches(trackMaterials, search), [trackMaterials, search]);
  const searchHitById = useMemo(() => new Map(searchHits.map((hit) => [hit.material.id, hit])), [searchHits]);

  const filtered = useMemo(() => trackMaterials.filter((material) => {
    const matchesSearch = searchHitById.has(material.id);
    const matchesFilters = (category === categories[0] || material.category === category) && (level === levels[0] || material.level === level) && (!onlySaved || bookmarks.includes(material.id));
    const matchesLearning = learningFilter === "all" || (learningFilter === "completed" && completed.includes(material.id)) || (learningFilter === "in-progress" && material.id === current && !completed.includes(material.id)) || (learningFilter === "not-started" && !completed.includes(material.id) && material.id !== current);
    return matchesSearch && matchesFilters && matchesLearning;
  }), [trackMaterials, search, category, level, onlySaved, bookmarks, learningFilter, completed, current]);

  const chapters = useMemo(() => Array.from(new Set(trackMaterials.map((material) => material.category))).map((chapter, index) => {
    const allItems = trackMaterials.filter((material) => material.category === chapter);
    const items = filtered.filter((material) => material.category === chapter);
    const doneCount = allItems.filter((material) => completed.includes(material.id)).length;
    const chapterCurrent = allItems.some((material) => material.id === current);
    const chapterNext = allItems.find((material) => !completed.includes(material.id)) ?? allItems[0];
    return { chapter, allItems, items, doneCount, chapterCurrent, chapterNext, index, percent: allItems.length ? Math.round((doneCount / allItems.length) * 100) : 0 };
  }).filter((chapter) => chapter.items.length > 0), [trackMaterials, filtered, completed, current]);

  const resetFilters = () => { setSearch(""); setCategory(categories[0]); setLevel(levels[0]); setLearningFilter("all"); setOnlySaved(false); };
  const displayPercent = selectedTrackMeta ? trackPercent : progressPercent;
  const displayCompleted = selectedTrackMeta ? trackCompletedCount : completedCount;
  const displayTotal = selectedTrackMeta ? trackMaterials.length : materials.length;
  const isFilteredView = filtered.length !== trackMaterials.length;

  return <div className="page"><div className={`page-wrap catalog-page ${selectedTrack ? `catalog-track-${selectedTrack}` : ""}`}>
    <div className="page-heading catalog-heading">
      <div><span className="eyebrow">{selectedTrackMeta ? `JALUR ${selectedTrackMeta.label.toUpperCase()} · ${trackMaterials.length} MATERI` : `KATALOG BELAJAR · ${materials.length} MATERI`}</span><h1>{selectedTrackMeta ? <>{selectedTrackMeta.label},<br /><em>berprogres per bab.</em></> : <>Pilih jurusan,<br /><em>ikuti checkpoint.</em></>}</h1></div>
      <div className="heading-note"><span className="scribble-arrow">↗</span><p>{selectedTrackMeta ? "Setiap bab punya garis finish kecil. Selesaikan satu demi satu, bukan semuanya sekaligus." : "Pilih jalur yang paling dekat dengan tujuanmu. Katalog akan menata langkah berikutnya."}</p></div>
    </div>

    <section className="catalog-track-picker catalog-track-picker-workbook" aria-label="Pilih jurusan">
      <div className="track-picker-copy"><span className="section-index">01 · PILIH JURUSAN</span><strong>Masuk lewat satu pintu, bukan daftar campuran.</strong></div>
      <div className="track-picker-options"><Link href="/materi" className={`track-picker-option ${!selectedTrack ? "track-picker-active" : ""}`}><span>✦</span> Semua jurusan</Link>{specializationOrder.map((track) => <Link key={track} href={trackHref(track)} className={`track-picker-option track-option-${specializationMeta[track].accent} ${selectedTrack === track ? "track-picker-active" : ""}`}><span>{specializationMeta[track].emoji}</span> {specializationMeta[track].shortLabel}</Link>)}</div>
    </section>

    <section className="progress-tracker catalog-progress-tracker"><div className="tracker-copy"><span className="section-index">PROGRESS JALUR</span><strong>{emptyReservedTrack ? "Menunggu materi baru dari PDF" : `${displayCompleted} dari ${displayTotal} materi selesai`}</strong></div><div className="tracker-bar"><i style={{ width: `${displayPercent}%` }} /></div><b>{emptyReservedTrack ? "—" : `${displayPercent}%`}</b></section>

    {!emptyReservedTrack && selectedTrack && selectedJourney && courseStart && <section className="course-start-card" aria-label={`Mulai ${selectedTrackMeta?.label}`}>
      <div className="course-start-stamp"><MapIcon size={22} /><span>COURSE<br />START</span></div>
      <div className="course-start-main"><div className="course-start-heading"><div><span className="eyebrow">01 · PETA SEBELUM MULAI</span><h2>{selectedJourney.fitFor}</h2></div><span className={`course-readiness ${courseStart.readyForCorePath ? "course-readiness-ready" : ""}`}>{courseStart.readyForCorePath ? "SIAP MASUK JALUR" : "ADA SETUP RINGAN"}</span></div>
        <div className="course-start-grid"><div><span className="course-start-label">PRASYARAT PRAKTIS</span><ul>{selectedJourney.prerequisites.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul></div><div><span className="course-start-label">SETELAH JALUR INI</span><ul>{selectedJourney.outcomes.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul></div><div className="course-capstone"><span className="course-start-label">ARTEFAK CAPSTONE</span><strong>{selectedJourney.capstone.title}</strong><p>{selectedJourney.capstone.prompt}</p><small>{selectedJourney.capstone.evidence.join(" · ")}</small></div></div>
        <div className="course-start-footer"><span><Timer size={16} /> Estimasi {selectedJourney.estimatedHours} jam · dikerjakan bertahap</span>{courseStart.primary && <Link className="brutal-button button-black" href={`/materi/${courseStart.primary.id}`}>{trackCompletedCount ? "Lanjutkan checkpoint" : "Mulai dari Prolog"} <ArrowRight size={17} /></Link>}</div>
      </div>
      <div className="course-prerequisite-map"><div><span className="course-start-label"><GitBranch size={14} /> PETA KESIAPAN</span><p>{courseStart.readyForCorePath ? "Pengantar yang direkomendasikan sudah tersentuh. Lanjut dengan ritme course ini." : "Ini bukan kunci akses. Satu pengantar singkat di bawah akan membuat istilah dan keputusan awal lebih nyambung."}</p></div>{courseStart.preparation.length > 0 ? <div className="prerequisite-links">{courseStart.preparation.map((item) => <Link key={item.course} href={`/materi/${item.material.id}`}><span>SEBELUMNYA · {item.journey.capstone.title}</span><strong>{item.material.title}</strong><small>{item.reason}</small><ArrowRight size={15} /></Link>)}</div> : <div className="prerequisite-ready"><Check size={16} /> Pengantar terkait sudah selesai. Kamu tetap bebas meninjau ulang kapan saja.</div>}</div>
    </section>}

    {!emptyReservedTrack && selectedTrack && sourceMap.length > 0 && <section className="course-source-map" aria-label={`Source Map ${selectedTrackMeta?.label}`}><div className="source-map-heading"><div><span className="section-index">02 · SOURCE MAP</span><h2>Sumber tidak disembunyikan di ujung materi.</h2><p>Gunakan peta ini untuk melihat referensi yang dipakai dan checkpoint yang dibantu oleh tiap sumber.</p></div><span>{sourceMap.length} REFERENSI</span></div><div className="source-map-grid">{sourceMap.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer"><span>{source.label}</span><strong>{source.note}</strong><small>{source.checkpoints.slice(0, 3).join(" · ")}{source.checkpoints.length > 3 ? ` +${source.checkpoints.length - 3} checkpoint` : ""}</small><ExternalLink size={15} /></a>)}</div></section>}

    {!emptyReservedTrack && nextMaterial && <section className="catalog-resume-card"><div className="resume-stamp"><CircleDotDashed size={20} /><span>CHECKPOINT<br />BERIKUTNYA</span></div><div><span className="eyebrow">LANJUTKAN JALURMU</span><strong>{nextMaterial.title}</strong><p>{completed.includes(nextMaterial.id) ? "Kamu sudah menutup semua checkpoint di jalur ini." : `${nextMaterial.minutes} menit · ${nextMaterial.level} · satu langkah kecil untuk menjaga ritme.`}</p></div><Link className="brutal-button button-pink" href={`/materi/${nextMaterial.id}`}>Buka checkpoint <ArrowRight size={17} /></Link></section>}

    {emptyReservedTrack ? <section className="empty-track-state"><span className="empty-track-mark">✦</span><div><span className="eyebrow">MATERI BARU SEDANG DISIAPKAN</span><h2>{selectedTrackMeta?.label} akan dibangun ulang dari PDF.</h2><p>Judul jalurnya tetap ada, tetapi materi lama sengaja dikosongkan agar tidak tercampur dengan kurikulum baru. Tambahkan PDF saat siap, lalu jalur ini akan diisi kembali secara runtut.</p><Link href="/materi" className="brutal-button button-black">Lihat jurusan lain <ArrowRight size={17} /></Link></div></section> : <>
      <section className="catalog-toolbar catalog-toolbar-workbook" aria-label="Filter katalog">
        <div className="search-box"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={selectedTrackMeta ? `Cari di ${selectedTrackMeta.shortLabel}...` : "Cari materi, misalnya: RAG..."} aria-label="Cari materi" /></div>
        <div className="filter-label"><SlidersHorizontal size={16} /> FILTER</div>
        <select value={selectedTrack ?? "all"} onChange={(event) => { const nextTrack = event.target.value; navigate(nextTrack === "all" ? "/materi" : trackHref(nextTrack as SpecializationId)); }} aria-label="Filter jurusan"><option value="all">Semua jurusan</option>{specializationOrder.map((track) => <option key={track} value={track}>{specializationMeta[track].shortLabel}</option>)}</select>
        <select value={learningFilter} onChange={(event) => setLearningFilter(event.target.value as LearningFilter)} aria-label="Filter status belajar"><option value="all">Semua status</option><option value="in-progress">Sedang berjalan</option><option value="not-started">Belum dimulai</option><option value="completed">Sudah selesai</option></select>
        <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter bab atau kategori">{categories.filter((item) => item === categories[0] || trackMaterials.some((material) => material.category === item)).map((item) => <option key={item}>{item}</option>)}</select>
        <select value={level} onChange={(event) => setLevel(event.target.value)} aria-label="Filter level">{levels.map((item) => <option key={item}>{item}</option>)}</select>
        <button type="button" className={`saved-filter ${onlySaved ? "saved-filter-active" : ""}`} onClick={() => setOnlySaved((value) => !value)} aria-pressed={onlySaved}><Bookmark size={15} fill={onlySaved ? "currentColor" : "none"} /> Disimpan <b>{bookmarks.length}</b></button>
      </section>
      <div className="results-meta"><span><Filter size={13} /> Menampilkan <strong>{filtered.length}</strong> materi dalam <strong>{chapters.length}</strong> checkpoint{search.trim() ? ` · mencari juga dari ${Array.from(new Set(searchHits.map((hit) => hit.matchLabel).filter(Boolean))).join(", ") || "isi course"}` : ""}</span><span className="results-tip">✦ pilih kartu checkpoint untuk meneruskan ritme belajarmu</span></div>
      <section className="materials-groups checkpoint-groups">{chapters.map((chapter) => {
        const expanded = isFilteredView || chapter.index === 0 || chapter.chapterCurrent || expandedChapters.includes(chapter.chapter);
        const visibleItems = expanded ? chapter.items : [];
        const remainingItems = Math.max(0, chapter.items.length - visibleItems.length);
        return <section className={`material-group chapter-checkpoint ${chapter.percent === 100 ? "checkpoint-complete" : ""} ${chapter.chapterCurrent ? "checkpoint-current" : ""} ${expanded ? "checkpoint-expanded" : ""}`} key={chapter.chapter}>
          <div className="checkpoint-heading"><div className="checkpoint-number"><span>CHECKPOINT</span><strong>{String(chapter.index + 1).padStart(2, "0")}</strong></div><div className="checkpoint-copy"><span className="section-index">{categoryMeta[chapter.chapter]?.emoji ?? "✦"} · {chapter.allItems.length} LANGKAH</span><h2>{chapter.chapter}</h2><p>{chapter.doneCount === chapter.allItems.length ? "Bab ini sudah selesai. Kamu bisa meninjaunya lagi kapan saja." : `${chapter.doneCount} dari ${chapter.allItems.length} materi telah ditandai selesai.`}</p></div><div className="checkpoint-meter" aria-label={`Progres ${chapter.chapter}`}><span>{chapter.percent}%</span><div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={chapter.percent}><i style={{ width: `${chapter.percent}%` }} /></div>{chapter.chapterNext && <Link href={`/materi/${chapter.chapterNext.id}`} className="checkpoint-next">{chapter.percent === 100 ? "Review bab" : "Lanjutkan"} <ArrowRight size={14} /></Link>}</div></div>
          {visibleItems.length > 0 && <div className="materials-grid">{visibleItems.map((material) => <MaterialCard key={material.id} material={material} />)}</div>}
          {!isFilteredView && <button type="button" className="checkpoint-expand" onClick={() => setExpandedChapters((previous) => previous.includes(chapter.chapter) ? previous.filter((item) => item !== chapter.chapter) : [...previous, chapter.chapter])} aria-expanded={expanded}>{expanded ? "Tutup daftar subbab" : `Buka ${remainingItems || chapter.items.length} subbab`} <ChevronDown size={16} /></button>}
        </section>;
      })}</section>
      {filtered.length === 0 && <div className="empty-state"><span>⊙</span><h2>{onlySaved ? "Belum ada bookmark." : "Checkpoint ini belum punya materi yang cocok."}</h2><p>{onlySaved ? "Simpan beberapa materi dulu, lalu meja review-mu akan terasa lebih personal." : "Coba ubah jurusan, status, atau kata kunci pencarian."}</p><button className="brutal-button button-black" onClick={() => { resetFilters(); navigate(trackHref(selectedTrack)); }}>Reset filter</button></div>}
    </>}
  </div></div>;
}
