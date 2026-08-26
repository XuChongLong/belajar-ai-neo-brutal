import { ArrowRight, Check, Clock3, Layers3, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { materials } from "@/lib/materials";
import { specializationMeta, specializationOrder } from "@/lib/specializations";
import { useLearning } from "@/contexts/LearningContext";

const katherineJohnsonImage = "/manus-storage/katherine-johnson-nasa-1962_c6b966c1.jpg";

export default function Home() {
  const { completed, completedCount, progressPercent } = useLearning();
  const materialCount = materials.length;
  const totalHours = Math.ceil(materials.reduce((total, material) => total + material.minutes, 0) / 60);
  const tracks = specializationOrder.map((id) => ({ ...specializationMeta[id], count: materials.filter((material) => material.specialization === id).length }));
  const checkpoint = materials.find((material) => !completed.includes(material.id)) ?? materials[0];
  return <div className="page home-page simplified-landing"><div className="page-wrap">
    <header className="landing-hero"><div className="landing-hero-copy"><span className="eyebrow">WORKBOOK AI UNTUK PEMULA</span><h1>Pahami AI.<br /><em>Bukan cuma ikut tren.</em></h1><p>Belajar AI membantu kamu membaca konsep, melihat contoh nyata, melatih keputusan, dan menyimpan bukti proyek kecil—satu mata pelajaran pada satu waktu.</p><div className="landing-hero-actions"><Link href="/materi" className="brutal-button button-pink">Pilih mata pelajaran <ArrowRight size={18} /></Link><Link href={`/materi/${checkpoint.id}`} className="landing-text-link">Mulai dari materi pertama</Link></div><div className="landing-proof"><span>{materialCount} materi</span><span>·</span><span>~{totalHours} jam belajar</span><span>·</span><span>Proyek kecil per jalur</span></div></div>
      <figure className="scientist-quote-card"><img src={katherineJohnsonImage} alt="Katherine Johnson bekerja di meja NASA Langley pada 1962" width="1041" height="843" /><figcaption><span className="eyebrow">CATATAN DARI ILMUWAN</span><blockquote>“There will always, always be mathematics. Everything is physics and math.”</blockquote><p>— Katherine Johnson, matematikawan NASA</p><a href="https://www.nasa.gov/learning-resources/katherine-johnson-a-lifetime-of-stem/" target="_blank" rel="noreferrer">Kutipan & cerita di NASA ↗</a><small>Foto: NASA Langley Research Center, 1962.</small></figcaption></figure>
    </header>
    <section className="landing-explainer"><div><span className="eyebrow">APA YANG KAMU DAPATKAN</span><h2>Belajar yang punya arah.</h2><p>Bukan kumpulan artikel lepas. Setiap mata pelajaran dimulai dari prolog, berjalan per bab, lalu diakhiri artefak kecil yang bisa kamu simpan.</p></div><div className="landing-explainer-steps"><article><strong>01</strong><h3>Pahami konsep.</h3><p>Penjelasan santai, analogi, dan sumber asli saat kamu ingin menggali lebih jauh.</p></article><article><strong>02</strong><h3>Latih keputusan.</h3><p>Contoh kerja dan quiz mini membantumu membedakan hafalan dari pemahaman.</p></article><article><strong>03</strong><h3>Simpan bukti.</h3><p>Refleksi dan evidence checkpoint membentuk jejak portfolio pribadi.</p></article></div></section>
    <section className="landing-subjects"><div className="landing-section-heading"><div><span className="eyebrow">MULAI DARI MANA?</span><h2>Pilih mata pelajaranmu.</h2><p>Kamu tidak harus menuntaskan semua. Ambil satu yang paling dekat dengan tujuanmu sekarang.</p></div><Link href="/materi" className="landing-text-link">Lihat semua mata pelajaran <ArrowRight size={16} /></Link></div><div className="landing-subject-grid">{tracks.map((track) => <Link key={track.id} href={`/materi?jurusan=${track.id}`} className={`landing-subject-card subject-card-${track.accent}`}><span>{track.emoji}</span><div><small>{track.count} materi</small><h3>{track.label}</h3><p>{track.intro}</p></div><ArrowRight size={18} /></Link>)}</div></section>
    <section className="landing-progress-note"><div><span className="eyebrow">BELAJAR SUDAH DIMULAI</span><h2>{completedCount ? `${completedCount} materi sudah kamu tutup.` : "Mulai kecil, lalu lanjut besok."}</h2><p>{completedCount ? `Progresmu saat ini ${progressPercent}%. Kembali ke satu checkpoint yang paling dekat, bukan ke semua daftar sekaligus.` : "Satu materi pertama cukup untuk memulai. Tidak ada target untuk terlihat pintar dalam sehari."}</p></div><Link href={completedCount ? `/materi/${checkpoint.id}` : "/materi"} className="brutal-button button-black">{completedCount ? "Lanjutkan belajar" : "Pilih mata pelajaran"} <ArrowRight size={17} /></Link></section>
  </div></div>;
}
