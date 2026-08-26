import { ArrowRight, Check, ClipboardCheck, LockKeyhole, NotebookPen } from "lucide-react";
import { Link, useSearch } from "wouter";
import { useLearning } from "@/contexts/LearningContext";
import { courseJourneys, getEvidenceKey } from "@/lib/courseJourney";
import { materials } from "@/lib/materials";
import { specializationMeta, specializationOrder, type SpecializationId } from "@/lib/specializations";

function isPortfolioCourse(id: SpecializationId): id is keyof typeof courseJourneys {
  return id in courseJourneys;
}

export default function Portfolio() {
  const search = useSearch();
  const initialTrack = new URLSearchParams(search).get("jurusan");
  const activeTrack = specializationOrder.find((item) => item === initialTrack && isPortfolioCourse(item)) ?? specializationOrder.find(isPortfolioCourse)!;
  const { projectEvidence, coursePortfolio, setCoursePortfolio, syncStatus } = useLearning();
  const journey = courseJourneys[activeTrack];
  const portfolio = coursePortfolio[activeTrack] ?? { narrative: "", selectedEvidence: [], updatedAt: "" };
  const anchors = materials.filter((material) => material.specialization === activeTrack).sort((left, right) => left.id - right.id).filter((material, index, all) => index === 0 || all[index - 1]?.category !== material.category).map((material) => ({ material, key: getEvidenceKey(material), evidence: projectEvidence[getEvidenceKey(material)] }));
  const evidenceStarted = anchors.filter((item) => item.evidence && (item.evidence.checked.length > 0 || item.evidence.reflection.trim().length > 0));

  return <div className="page"><div className="page-wrap portfolio-page">
    <div className="page-heading portfolio-heading"><div><span className="eyebrow">PORTFOLIO CAPSTONE · PRIVAT</span><h1>Rangkai bukti,<br /><em>bukan klaim kosong.</em></h1></div><div className="heading-note"><LockKeyhole size={18} /><p>Portfolio ini hanya berada di progres belajarmu. Pilih sendiri bukti checkpoint yang ingin kamu bawa ke capstone.</p></div></div>
    <section className="portfolio-track-picker" aria-label="Pilih course portfolio">{specializationOrder.filter(isPortfolioCourse).map((track) => <Link key={track} href={`/portfolio?jurusan=${track}`} className={track === activeTrack ? "portfolio-track-active" : ""}><span>{specializationMeta[track].emoji}</span>{specializationMeta[track].shortLabel}</Link>)}</section>
    <section className="portfolio-workspace"><div className="portfolio-summary"><span className="section-index">CAPSTONE TRACK</span><h2>{journey.capstone.title}</h2><p>{journey.capstone.prompt}</p><div className="portfolio-counter"><ClipboardCheck size={18} /><strong>{evidenceStarted.length}/{anchors.length}</strong><span>checkpoint sudah punya jejak bukti</span></div><div className="portfolio-artifacts"><span>ARTEFAK YANG DITUJU</span>{journey.capstone.evidence.map((item) => <b key={item}><Check size={14} />{item}</b>)}</div><Link href={`/materi?jurusan=${activeTrack}`} className="brutal-button button-black">Kembali ke Course Start <ArrowRight size={16} /></Link></div>
      <div className="portfolio-editor"><div className="portfolio-editor-heading"><div><span className="section-index">RANGKUMAN PRIBADI</span><h2>Catatan capstone-mu.</h2></div><span>{syncStatus === "syncing" ? "menyimpan…" : syncStatus === "offline" ? "tersimpan lokal" : "tersimpan otomatis"}</span></div><label htmlFor="portfolio-narrative">Ceritakan keputusan, bukti terpilih, dan hal yang masih ingin kamu perbaiki.</label><textarea id="portfolio-narrative" value={portfolio.narrative} maxLength={4000} onChange={(event) => setCoursePortfolio(activeTrack, event.target.value, portfolio.selectedEvidence)} placeholder={`Contoh: Untuk ${journey.capstone.title}, saya memilih…`} /><small>{portfolio.narrative.length}/4000 · kamu yang menentukan isi dan kapan ingin membagikannya di luar aplikasi.</small><div className="portfolio-evidence-list"><span className="section-index">PILIH BUKTI CHECKPOINT</span>{anchors.map(({ material, key, evidence }) => { const started = Boolean(evidence && (evidence.checked.length || evidence.reflection.trim())); const selected = portfolio.selectedEvidence.includes(key); return <label key={key} className={started ? "portfolio-evidence-ready" : ""}><input type="checkbox" checked={selected} disabled={!started} onChange={() => setCoursePortfolio(activeTrack, portfolio.narrative, selected ? portfolio.selectedEvidence.filter((item) => item !== key) : [...portfolio.selectedEvidence, key])} /><span><Check size={13} /></span><div><strong>{material.category}</strong><small>{started ? `${evidence?.checked.length ?? 0} checklist · ${evidence?.reflection.trim() ? "ada refleksi" : "belum ada refleksi"}` : "Isi Project Evidence pada pembuka checkpoint untuk mengaktifkan bukti ini."}</small></div><NotebookPen size={16} /></label>; })}</div></div>
    </section>
  </div></div>;
}
