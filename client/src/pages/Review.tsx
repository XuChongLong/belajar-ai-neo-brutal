// Style reminder: Paper Playground — review mode is a focused desk of six next actions, not another overwhelming catalog.

import { ArrowRight, Bookmark, Brain, Check, Flame, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { materials } from "@/lib/materials";
import { getReviewQueue, learningGoals, type LearningGoalId } from "@/lib/learningPath";
import { useLearning } from "@/contexts/LearningContext";

const signalLabel = { quiz: "SKOR PERLU DIKUATKAN", bookmark: "BOOKMARK-MU", next: "LANGKAH BERIKUTNYA" };

export default function Review() {
  const { completed, bookmarks, quizAttempts, selectedGoal, streak } = useLearning();
  const goal = learningGoals.find((item) => item.id === selectedGoal) ?? learningGoals[0];
  const queue = getReviewQueue(materials, completed, bookmarks, quizAttempts, goal.id as LearningGoalId);
  const quizCount = Object.keys(quizAttempts).length;
  return <div className="page"><div className="page-wrap review-page"><div className="page-heading review-heading"><div><span className="eyebrow">MODE REVIEW · BELAJAR ULANG</span><h1>Ulangi yang penting,<br /><em>lanjut lebih yakin.</em></h1><p className="review-lead">Satu meja kecil untuk konsep yang skornya masih rendah, materi yang kamu simpan, dan langkah yang paling masuk akal berikutnya.</p></div><div className="review-stamp"><RotateCcw size={22} /><strong>{streak}</strong><span>hari<br />konsisten</span></div></div>
    <section className="review-stats"><div><Brain size={18} /><strong>{quizCount}</strong><span>quiz terbaca</span></div><div><Bookmark size={18} /><strong>{bookmarks.length}</strong><span>materi disimpan</span></div><div><Check size={18} /><strong>{completed.length}</strong><span>materi selesai</span></div><div><Flame size={18} /><strong>{goal.label}</strong><span>profil aktif</span></div></section>
    <section className="review-intro"><div><span className="eyebrow">URUTAN CERDAS</span><h2>Mulai dari yang paling terasa manfaatnya.</h2><p>Queue ini berubah mengikuti jawaban quiz, bookmark, progress, dan profil tujuanmu. Tidak ada hukuman kalau kamu ingin mulai dari kartu lain.</p></div><Link href="/materi" className="brutal-button button-pink">Cari materi lain <ArrowRight size={16} /></Link></section>
    {queue.length ? <section className="review-queue">{queue.map((item, index) => <Link href={`/materi/${item.material.id}`} className={`review-card review-card-${item.signal}`} key={`${item.signal}-${item.material.id}`}><div className="review-card-number">{String(index + 1).padStart(2, "0")}</div><div className="review-card-copy"><span className="eyebrow">{signalLabel[item.signal]}</span><h3>{item.material.title}</h3><p>{item.reason}</p><div><span>{item.material.category}</span><span>·</span><span>{item.material.minutes} menit</span></div></div><ArrowRight size={19} className="review-card-arrow" /></Link>)}</section> : <section className="review-empty"><span>✦</span><h2>Meja review-mu masih kosong.</h2><p>Kerjakan quiz pertama atau simpan materi yang ingin kamu ulangi. Nanti queue ini akan mengisinya dengan urutan yang ringan.</p><Link href="/materi/1" className="brutal-button button-black">Mulai dari materi pertama <ArrowRight size={16} /></Link></section>}
  </div></div>;
}
