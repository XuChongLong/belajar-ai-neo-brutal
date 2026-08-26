import React from "react";
import { ArrowRight, Bookmark, Check, Clock3, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { materials } from "@/lib/materials";
import { useLearning } from "@/contexts/LearningContext";

export default function SavedMaterials() {
  const { bookmarks, completed, current, toggleBookmark, syncStatus } = useLearning();
  const saved = bookmarks.map((id) => materials.find((material) => material.id === id)).filter((material): material is NonNullable<typeof material> => Boolean(material));
  const currentSaved = saved.find((material) => material.id === current);

  return <div className="page"><div className="page-wrap saved-materials-page">
    <header className="saved-materials-hero"><div><span className="eyebrow">SIMPAN MATERI</span><h1>Yang mau kamu<br /><em>lanjutkan nanti.</em></h1><p>Kalau ada materi yang lagi kamu pelajari atau belum sempat kamu mulai, simpan dulu. Nanti tinggal balik ke sini—nggak perlu nyari dari awal lagi.</p></div><div className="saved-materials-count"><Bookmark size={18} fill="currentColor" /><strong>{saved.length}</strong><span>materi tersimpan</span></div></header>

    {currentSaved && <section className="saved-resume-card"><div><span className="eyebrow">SEDANG KAMU PEGANG</span><h2>{currentSaved.title}</h2><p>{currentSaved.summary}</p></div><Link href={`/materi/${currentSaved.id}`} className="brutal-button button-pink">Lanjutkan <ArrowRight size={17} /></Link></section>}

    <section className="saved-list-section"><div className="saved-list-heading"><div><span className="eyebrow">DAFTAR SIMPANAN</span><h2>{saved.length ? "Materi yang kamu tandai." : "Belum ada yang disimpan."}</h2></div><small>{syncStatus === "synced" ? "Tersimpan di akunmu" : syncStatus === "syncing" ? "Lagi menyimpan…" : "Tersimpan di perangkat ini"}</small></div>
      {saved.length ? <div className="saved-materials-list">{saved.map((material) => { const isDone = completed.includes(material.id); const isCurrent = current === material.id && !isDone; return <article key={material.id} className="saved-material-row"><div className="saved-material-number">{String(material.displayNumber ?? material.id).padStart(2, "0")}</div><div className="saved-material-copy"><span>{material.category}</span><h3>{material.title}</h3><p>{isDone ? "Sudah selesai · simpan untuk diulang kapan pun." : isCurrent ? "Sedang kamu pelajari · lanjutkan dari sini." : "Belum kamu mulai · buka saat kamu siap."}</p><small><Clock3 size={13} /> {material.minutes} menit · {material.level}</small></div><div className="saved-material-actions"><Link href={`/materi/${material.id}`} className="saved-open"><span>{isDone ? <Check size={15} /> : <Bookmark size={15} fill="currentColor" />}</span>{isDone ? "Buka lagi" : "Buka materi"}<ArrowRight size={15} /></Link><button type="button" onClick={() => toggleBookmark(material.id)} aria-label={`Hapus ${material.title} dari materi tersimpan`}><Trash2 size={15} /> Hapus</button></div></article>; })}</div> : <div className="saved-empty"><Bookmark size={24} /><h3>Belum ada bahan buat nanti.</h3><p>Pas nemu materi yang menarik, tekan tombol <strong>Simpan materi</strong>. Daftarnya bakal muncul di sini dan ikut tersinkron ke progres akunmu.</p><Link href="/materi" className="brutal-button button-pink">Pilih mata pelajaran <ArrowRight size={17} /></Link></div>}
    </section>
  </div></div>;
}
