// Style reminder: Paper Playground — material cards should read like bold activity stickers with clear status and friendly metadata.

import { ArrowUpRight, Check, Clock3 } from "lucide-react";
import { Link } from "wouter";
import type { Material } from "@/lib/materials";
import { useLearning } from "@/contexts/LearningContext";

export default function MaterialCard({ material, compact = false }: { material: Material; compact?: boolean }) {
  const { completed, current } = useLearning();
  const isDone = completed.includes(material.id);
  const isCurrent = current === material.id && !isDone;
  return <Link href={`/materi/${material.id}`} className={`material-card ${compact ? "material-card-compact" : ""}`}>
    <div className="card-topline"><span className="material-number">{String(material.id).padStart(2, "0")}</span><span className={`status-pill ${isDone ? "status-done" : isCurrent ? "status-current" : ""}`}>{isDone ? <><Check size={12} /> Selesai</> : isCurrent ? "Sedang belajar" : "Belum mulai"}</span></div>
    <div className="material-emoji">{material.emoji}</div>
    <div className="material-category">{material.category}</div>
    <h3>{material.title}</h3>
    {!compact && <p>{material.summary}</p>}
    <div className="material-footer"><span><Clock3 size={14} /> {material.minutes} menit</span><span className={`level level-${material.level.toLowerCase()}`}>{material.level}</span><ArrowUpRight size={18} className="card-arrow" /></div>
  </Link>;
}
