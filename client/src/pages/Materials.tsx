// Style reminder: Paper Playground — the catalog is an organized activity sheet with bold filters, tactile cards, and generous scanability.

import { ArrowRight, Bookmark, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import MaterialCard from "@/components/MaterialCard";
import { categories, categoryMeta, levels, materials } from "@/lib/materials";
import { isSpecializationId, materialMatchesSpecialization, specializationMeta, specializationOrder } from "@/lib/specializations";
import { useLearning } from "@/contexts/LearningContext";

export default function Materials() {
  const { bookmarks, completed, completedCount, progressPercent } = useLearning();
  const [, navigate] = useLocation();
  const searchString = useSearch();
  const trackParam = new URLSearchParams(searchString).get("jurusan");
  const selectedTrack = isSpecializationId(trackParam) ? trackParam : null;
  const selectedTrackMeta = selectedTrack ? specializationMeta[selectedTrack] : null;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [level, setLevel] = useState(levels[0]);
  const [onlySaved, setOnlySaved] = useState(() => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("filter") === "saved");
  const trackMaterials = useMemo(() => materials.filter((material) => materialMatchesSpecialization(material, selectedTrack)), [selectedTrack]);
  const trackCompletedCount = trackMaterials.filter((material) => completed.includes(material.id)).length;
  const emptyReservedTrack = Boolean(selectedTrackMeta && trackMaterials.length === 0);
  const filtered = useMemo(() => trackMaterials.filter((material) => {
    const matchesSearch = `${material.title} ${material.category}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (category === categories[0] || material.category === category) && (level === levels[0] || material.level === level) && (!onlySaved || bookmarks.includes(material.id));
  }), [trackMaterials, search, category, level, onlySaved, bookmarks]);
  const grouped = useMemo(() => categories.slice(1).map((item) => ({ category: item, items: filtered.filter((material) => material.category === item) })).filter((group) => group.items.length > 0), [filtered]);
  const resetFilters = () => { setSearch(""); setCategory(categories[0]); setLevel(levels[0]); setOnlySaved(false); };
  return <div className="page"><div className={`page-wrap catalog-page ${selectedTrack ? `catalog-track-${selectedTrack}` : ""}`}><div className="page-heading"><div><span className="eyebrow">{selectedTrackMeta ? `JALUR ${selectedTrackMeta.label.toUpperCase()} · ${trackMaterials.length} MATERI` : `KATALOG BELAJAR · ${materials.length} MATERI`}</span><h1>{selectedTrackMeta ? <>{selectedTrackMeta.label},<br /><em>mulai dari sini.</em></> : <>Semua materi,<br /><em>pilih sesukamu.</em></>}</h1></div><div className="heading-note"><span className="scribble-arrow">↗</span><p>{selectedTrackMeta ? selectedTrackMeta.intro : <>Urutannya fleksibel.<br />Rasa penasarannya wajib.</>}</p></div></div>
    <section className="progress-tracker"><div className="tracker-copy"><span className="section-index">PROGRESS TRACKER</span><strong>{emptyReservedTrack ? "Menunggu materi baru dari PDF" : selectedTrackMeta ? `${trackCompletedCount} dari ${trackMaterials.length} materi di jalur ini selesai` : `${completedCount} dari ${materials.length} materi selesai`}</strong></div><div className="tracker-bar"><i style={{ width: `${selectedTrackMeta ? (trackMaterials.length ? Math.round((trackCompletedCount / trackMaterials.length) * 100) : 0) : progressPercent}%` }} /></div><b>{emptyReservedTrack ? "—" : `${selectedTrackMeta ? (trackMaterials.length ? Math.round((trackCompletedCount / trackMaterials.length) * 100) : 0) : progressPercent}%`}</b></section>
    <section className="catalog-track-picker" aria-label="Pilih jurusan"><div className="track-picker-copy"><span className="section-index">PINTU MASUK JURUSAN</span><strong>Pilih satu jalur agar materi tidak bercampur.</strong></div><div className="track-picker-options"><Link href="/materi" className={`track-picker-option ${!selectedTrack ? "track-picker-active" : ""}`}><span>✦</span> Semua</Link>{specializationOrder.map((track) => <Link key={track} href={`/materi?jurusan=${track}`} className={`track-picker-option track-option-${specializationMeta[track].accent} ${selectedTrack === track ? "track-picker-active" : ""}`}><span>{specializationMeta[track].emoji}</span> {specializationMeta[track].shortLabel}</Link>)}</div></section>
    {emptyReservedTrack ? <section className="empty-track-state"><span className="empty-track-mark">✦</span><div><span className="eyebrow">MATERI BARU SEDANG DISIAPKAN</span><h2>{selectedTrackMeta?.label} akan dibangun ulang dari PDF.</h2><p>Judul jalurnya tetap ada, tetapi materi lama sengaja dikosongkan agar tidak tercampur dengan kurikulum baru. Tambahkan PDF saat siap, lalu jalur ini akan diisi kembali secara runtut.</p><Link href="/materi" className="brutal-button button-black">Lihat jurusan lain <ArrowRight size={17} /></Link></div></section> : <><section className="catalog-toolbar"><div className="search-box"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={selectedTrackMeta ? `Cari di ${selectedTrackMeta.shortLabel}...` : "Cari materi, misalnya: RAG..."} aria-label="Cari materi" /></div><div className="filter-label"><SlidersHorizontal size={16} /> FILTER</div><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter kategori">{categories.map((item) => <option key={item}>{item}</option>)}</select><select value={level} onChange={(event) => setLevel(event.target.value)} aria-label="Filter level">{levels.map((item) => <option key={item}>{item}</option>)}</select><button type="button" className={`saved-filter ${onlySaved ? "saved-filter-active" : ""}`} onClick={() => setOnlySaved((value) => !value)} aria-pressed={onlySaved}><Bookmark size={15} fill={onlySaved ? "currentColor" : "none"} /> Disimpan <b>{bookmarks.length}</b></button></section>
    <div className="results-meta"><span>Menampilkan <strong>{filtered.length}</strong> materi</span><span className="results-tip">✦ klik kartu untuk mulai · bookmark untuk nanti</span></div>
    <section className="materials-groups">{grouped.map((group) => { const track = group.items[0]?.specialization ?? "core"; return <div className={`material-group material-group-track-${track}`} key={group.category}><div className="material-group-heading"><span className="group-tab">{categoryMeta[group.category]?.emoji ?? "✦"}</span><div><span className="section-index">KATEGORI {String(categories.indexOf(group.category)).padStart(2, "0")}</span><h2>{group.category}</h2></div><span className="group-count">{group.items.length} materi</span></div><div className="materials-grid">{group.items.map((material) => <MaterialCard key={material.id} material={material} />)}</div></div>; })}</section>
    {filtered.length === 0 && <div className="empty-state"><span>⊙</span><h2>{onlySaved ? "Belum ada bookmark." : "Materinya belum ketemu."}</h2><p>{onlySaved ? "Simpan beberapa materi dulu, lalu meja review-mu akan terasa lebih personal." : "Coba ganti kata kunci atau reset filter."}</p><button className="brutal-button button-black" onClick={() => { resetFilters(); navigate(selectedTrack ? `/materi?jurusan=${selectedTrack}` : "/materi"); }}>Reset filter</button></div>}</>}
  </div></div>;
}
