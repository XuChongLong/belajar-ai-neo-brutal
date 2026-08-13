// Style reminder: Paper Playground — the catalog is an organized activity sheet with bold filters, tactile cards, and generous scanability.

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import MaterialCard from "@/components/MaterialCard";
import { categories, levels, materials } from "@/lib/materials";
import { useLearning } from "@/contexts/LearningContext";

export default function Materials() {
  const { completedCount, progressPercent } = useLearning();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [level, setLevel] = useState(levels[0]);
  const filtered = useMemo(() => materials.filter((material) => {
    const matchesSearch = `${material.title} ${material.category}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (category === categories[0] || material.category === category) && (level === levels[0] || material.level === level);
  }), [search, category, level]);
  const grouped = useMemo(() => categories.slice(1).map((item) => ({ category: item, items: filtered.filter((material) => material.category === item) })).filter((group) => group.items.length > 0), [filtered]);
  return <div className="page"><div className="page-wrap catalog-page"><div className="page-heading"><div><span className="eyebrow">KATALOG BELAJAR · 33 MATERI</span><h1>Semua materi,<br /><em>pilih sesukamu.</em></h1></div><div className="heading-note"><span className="scribble-arrow">↗</span><p>Urutannya fleksibel.<br />Rasa penasarannya wajib.</p></div></div>
    <section className="progress-tracker"><div className="tracker-copy"><span className="section-index">PROGRESS TRACKER</span><strong>{completedCount} dari 33 materi selesai</strong></div><div className="tracker-bar"><i style={{ width: `${progressPercent}%` }} /></div><b>{progressPercent}%</b></section>
    <section className="catalog-toolbar"><div className="search-box"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari materi, misalnya: RAG..." aria-label="Cari materi" /></div><div className="filter-label"><SlidersHorizontal size={16} /> FILTER</div><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter kategori">{categories.map((item) => <option key={item}>{item}</option>)}</select><select value={level} onChange={(event) => setLevel(event.target.value)} aria-label="Filter level">{levels.map((item) => <option key={item}>{item}</option>)}</select></section>
    <div className="results-meta"><span>Menampilkan <strong>{filtered.length}</strong> materi</span><span className="results-tip">✦ tip: klik kartu untuk mulai membaca</span></div>
    <section className="materials-groups">{grouped.map((group) => <div className="material-group" key={group.category}><div className="material-group-heading"><span className="group-tab">{group.category === "Dasar-Dasar AI" ? "✦" : group.category === "Large Language Models" ? "⌁" : group.category === "RAG & Teknik Lanjutan" ? "⌗" : "⚙"}</span><div><span className="section-index">KATEGORI {String(categories.indexOf(group.category)).padStart(2, "0")}</span><h2>{group.category}</h2></div><span className="group-count">{group.items.length} materi</span></div><div className="materials-grid">{group.items.map((material) => <MaterialCard key={material.id} material={material} />)}</div></div>)}</section>
    {filtered.length === 0 && <div className="empty-state"><span>⊙</span><h2>Materinya belum ketemu.</h2><p>Coba ganti kata kunci atau reset filter.</p><button className="brutal-button button-black" onClick={() => { setSearch(""); setCategory(categories[0]); setLevel(levels[0]); }}>Reset filter</button></div>}
  </div></div>;
}
