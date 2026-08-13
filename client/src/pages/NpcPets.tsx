import { Check, Gamepad2, PawPrint, Sparkles, ToggleLeft, ToggleRight } from "lucide-react";
import { Link } from "wouter";
import NpcPetArt from "@/components/NpcPetArt";
import { useLearning } from "@/contexts/LearningContext";
import { getPetStage, getPetXpProgress, petProfiles, petRewards, petStages, type PetId } from "@/lib/npcPets";

export default function NpcPets() {
  const { npc, selectNpcPet, setNpcPopupEnabled } = useLearning();
  const activeId = npc.activePet;
  const activeProfile = petProfiles[activeId];
  const activeXp = npc.xp[activeId];
  const progress = getPetXpProgress(activeXp);

  return <div className="page"><div className="page-wrap npc-page">
    <div className="page-heading npc-heading"><div><span className="eyebrow">NPC PET · TEMAN BELAJAR</span><h1>Tim kecilmu,<br /><em>naik level bareng.</em></h1><p className="npc-lead">Pilih satu pet aktif. Ia mendapat XP setiap kali kamu menuntaskan materi, meningkatkan jawaban quiz, atau menguasai flashcard.</p></div><div className="npc-heading-sticker"><PawPrint size={28} /><strong>4 PET</strong><span>koleksi awal</span></div></div>

    <section className="npc-main-card" aria-labelledby="active-pet-heading"><div className="npc-main-art"><NpcPetArt petId={activeId} stage={progress.stage.id} alt={`${activeProfile.name} pada tahap ${progress.stage.label}`} /></div><div className="npc-main-copy"><span className="eyebrow">PET AKTIF</span><div className="npc-name-row"><h2 id="active-pet-heading">{activeProfile.name}</h2><span>{activeProfile.species}</span></div><p>{activeProfile.personality}</p><div className="npc-level-badge">{progress.stage.label} <b>Lv.{progress.stage.level}</b></div><div className="npc-xp-track" role="progressbar" aria-label={`XP ${activeProfile.name}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress.percent}><i style={{ width: `${progress.percent}%` }} /></div><div className="npc-xp-meta"><strong>{activeXp} XP</strong><span>{progress.nextStage ? `${progress.remaining} XP menuju ${progress.nextStage.label}` : "Tahap akhir tercapai"}</span></div></div><div className="npc-main-quest"><Sparkles size={22} /><span>QUEST HARI INI</span><strong>Selesaikan satu materi baru.</strong><small>+35 XP untuk {activeProfile.name}</small><Link href="/materi">Cari materi <span>→</span></Link></div></section>

    <section className="npc-collection"><div className="npc-section-heading"><div><span className="section-index">KOLEKSI PET</span><h2>Pilih partner berikutnya.</h2></div><p>XP tiap pet disimpan terpisah. Ganti partner kapan saja dari koleksi ini.</p></div><div className="npc-pet-grid">{(Object.keys(petProfiles) as PetId[]).map((petId) => { const profile = petProfiles[petId]; const xp = npc.xp[petId]; const stage = getPetStage(xp); const active = activeId === petId; return <button type="button" key={petId} className={`npc-pet-card npc-${profile.color} ${active ? "npc-pet-card-active" : ""}`} onClick={() => selectNpcPet(petId)}><NpcPetArt petId={petId} stage={stage.id} alt={`${profile.name}, ${stage.label}`} /><span className="npc-pet-symbol">{profile.symbol}</span><div><small>{profile.species}</small><strong>{profile.name}</strong><em>{stage.label} · {xp} XP</em></div>{active && <b className="npc-active-check"><Check size={14} /> Aktif</b>}</button>; })}</div></section>

    <section className="npc-stage-section"><div className="npc-section-heading"><div><span className="section-index">JALUR EVOLUSI</span><h2>Dari bayi sampai mentor.</h2></div><p>Setiap aktivitas kecil memberi XP dan membuka tahap berikutnya.</p></div><div className="npc-stage-road">{petStages.map((stage) => { const unlocked = npc.earnedMilestones[activeId].includes(stage.id); return <div className={`npc-stage-stop ${unlocked ? "npc-stage-unlocked" : ""}`} key={stage.id}><span>{stage.level}</span><div><strong>{stage.label}</strong><small>{unlocked ? "Sudah dibuka" : `${stage.minXp} XP`}</small><p>{stage.description}</p></div></div>; })}</div></section>

    <section className="npc-rewards-settings"><div className="npc-reward-card"><Gamepad2 size={24} /><div><span className="eyebrow">CARA MENDAPAT XP</span><h2>Quest kecil, dampak besar.</h2><div className="npc-reward-list">{petRewards.map((reward) => <div key={reward.action}><span>{reward.action}</span><strong>+{reward.xp} XP</strong></div>)}</div></div></div><div className="npc-popup-setting"><div><span className="eyebrow">POPUP TEMAN</span><h2>Tampilkan pet di semua halaman?</h2><p>Default-nya mati. Saat aktif, pet muncul kecil di pojok dan bisa ditutup kapan saja.</p></div><button type="button" className={`npc-toggle ${npc.popupEnabled ? "npc-toggle-on" : ""}`} onClick={() => setNpcPopupEnabled(!npc.popupEnabled)} aria-pressed={npc.popupEnabled}>{npc.popupEnabled ? <ToggleRight size={31} /> : <ToggleLeft size={31} />}<span>{npc.popupEnabled ? "Popup aktif" : "Popup mati"}</span></button></div></section>

    <p className="npc-robot-note"><strong>Catatan asset:</strong> Byte (robot) memakai asset referensi sementara. Set evolusi robot lengkap—bayi hingga dewasa—sudah dicatat sebagai tindak lanjut dan akan diganti saat kuota asset AI tersedia.</p>
  </div></div>;
}
