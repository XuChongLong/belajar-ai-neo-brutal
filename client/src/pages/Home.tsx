// Style reminder: Paper Playground — editorial hero, generous paper whitespace, energetic pink actions, and concrete learning entry points.

import { ArrowRight, BookOpen, Check, Clock3, Layers3, Sparkles } from "lucide-react";
import { Link } from "wouter";
import MaterialCard from "@/components/MaterialCard";
import { materials } from "@/lib/materials";
import { useLearning } from "@/contexts/LearningContext";

export default function Home() {
  const { completedCount, progressPercent } = useLearning();
  return <div className="page home-page">
    <div className="page-wrap">
      <div className="top-note"><span className="eyebrow-dot" /> WORKBOOK DIGITAL UNTUK PEMULA <span className="top-note-line" /><span>dibuat supaya kamu nggak cuma ikut tren</span></div>
      <section className="hero-section">
        <div className="hero-copy reveal-on-load"><div className="sticker-label">✦ bab 01 · mulai dari nol</div><h1>Belajar AI<br /><em>jadi seru.</em></h1><p className="hero-lead">Nggak perlu jadi jenius buat paham AI. Mulai dari sini, pelan-pelan, satu materi setiap hari.</p><Link href="/materi" className="brutal-button button-pink">Buka materi pertama <ArrowRight size={19} /></Link><div className="hero-caption"><span className="scribble-arrow">↳</span> 33 materi ringkas<br />yang bisa kamu cerna</div></div>
        <div className="hero-art reveal-on-load reveal-delay-2"><div className="art-sticker star-one">✦</div><div className="art-sticker star-two">✹</div><div className="hero-image-frame"><img src="/manus-storage/belajar-ai-hero-robot_a9d1a2ea.png" alt="Robot ramah dikelilingi kartu belajar AI" /></div><div className="hero-tag"><span>AI<br />tanpa<br />ribet</span><strong>→</strong></div></div>
      </section>
      <section className="stat-strip reveal-on-load reveal-delay-3"><div className="stat-item"><BookOpen size={20} /><div><strong>33</strong><span>materi terstruktur</span></div></div><div className="stat-item"><Clock3 size={20} /><div><strong>~4 jam</strong><span>total waktu belajar</span></div></div><div className="stat-item"><Layers3 size={20} /><div><strong>4</strong><span>kategori inti AI</span></div></div><div className="stat-progress"><span>progress kamu</span><div className="mini-progress"><i style={{ width: `${progressPercent}%` }} /></div><b>{completedCount}/33</b></div></section>
      <section className="home-grid section-space"><div className="section-intro"><span className="section-index">01 / 04</span><h2>Pilih pintu masukmu.</h2><p>Mulai dari konsep yang paling bikin kamu penasaran. Nggak ada urutan yang salah.</p><Link href="/materi" className="text-link">Lihat semua materi <ArrowRight size={16} /></Link></div><div className="featured-grid">{materials.slice(0, 3).map((material, index) => <div key={material.id} className={`featured-offset offset-${index}`}><MaterialCard material={material} /></div>)}</div></section>
      <section className="pink-banner section-space"><div><span className="eyebrow">CATATAN KECIL HARI INI</span><h2>AI bukan sihir.<br /><span>AI adalah pola.</span></h2><p>Kalau kamu bisa menjelaskan masalahnya dengan contoh sederhana, kamu sudah punya modal pertama untuk memahami AI.</p></div><div className="banner-stamp"><Sparkles size={25} /><strong>keep<br />curious</strong><span>✦</span></div></section>
      <section className="home-grid section-space bottom-home"><div className="section-intro"><span className="section-index">02 / 04</span><h2>Belajar dengan ritme yang masuk akal.</h2><p>Setiap materi punya analogi, contoh, dan quiz mini. Selesaikan sedikit demi sedikit, progress tersimpan otomatis.</p></div><div className="habit-card"><div className="habit-card-head"><span className="sticker-label sticker-white">TARGET MINGGU INI</span><span>03 / 05</span></div><div className="habit-dashes">{[0, 1, 2, 3, 4].map((day) => <span key={day} className={day < 3 ? "day-done" : ""}>{day < 3 ? <Check size={14} /> : day + 1}</span>)}</div><div className="habit-copy"><strong>3 hari berturut-turut.</strong><p>Ritme kecil, rasa paham yang makin besar.</p></div><Link href="/progress" className="brutal-button button-black">Lihat progress <ArrowRight size={17} /></Link></div></section>
    </div>
  </div>;
}
