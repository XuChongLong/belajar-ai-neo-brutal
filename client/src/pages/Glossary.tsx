// Style reminder: Paper Playground — glossary entries are margin notes with plain language, examples, and a clear lesson link.

import { ArrowUpRight, Search } from "lucide-react";
import { Link } from "wouter";
import { useMemo, useState } from "react";
import { glossaryTerms } from "@/lib/glossary";

export default function Glossary() {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => glossaryTerms.filter((item) => `${item.term} ${item.definition} ${item.category}`.toLowerCase().includes(search.toLowerCase())), [search]);
  return <div className="page"><div className="page-wrap glossary-page"><div className="page-heading"><div><span className="eyebrow">GLOSARIUM · MARGIN NOTES</span><h1>Istilah AI,<br /><em>nggak perlu bikin ciut.</em></h1></div><div className="heading-note"><span className="scribble-arrow">↗</span><p>Temukan istilah.<br />Buka konteksnya.</p></div></div>
    <section className="glossary-hero"><div><span className="eyebrow">CARA PAKAI</span><h2>Mulai dari kata yang bikin kamu berhenti.</h2><p>Setiap catatan memakai bahasa sederhana, analogi, dan link ke materi lengkap supaya kamu bisa berpindah dari definisi ke pemahaman.</p></div><div className="glossary-count"><strong>{filtered.length}</strong><span>catatan<br />terlihat</span></div></section>
    <div className="glossary-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari istilah: embedding, agent..." aria-label="Cari istilah AI" /></div>
    <section className="glossary-grid">{filtered.map((item, index) => <article className={`glossary-card glossary-card-${index % 4}`} key={item.term}><div className="glossary-card-top"><span>0{index + 1}</span><em>{item.category}</em></div><h3>{item.term}</h3><p>{item.definition}</p><blockquote>“{item.analogy}”</blockquote><Link href={`/materi/${item.materialId}`} className="glossary-link">Buka materi terkait <ArrowUpRight size={15} /></Link></article>)}</section>
    {!filtered.length && <div className="empty-state"><span>⊙</span><h2>Istilahnya belum ketemu.</h2><p>Coba kata yang lebih pendek atau cari berdasarkan kategori.</p><button className="brutal-button button-black" onClick={() => setSearch("")}>Reset pencarian</button></div>}
  </div></div>;
}
