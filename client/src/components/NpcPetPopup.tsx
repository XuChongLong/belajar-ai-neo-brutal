import { X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useLearning } from "@/contexts/LearningContext";
import { getPetStage, petProfiles } from "@/lib/npcPets";
import NpcPetArt from "@/components/NpcPetArt";

export default function NpcPetPopup() {
  const [location, navigate] = useLocation();
  const [dismissed, setDismissed] = useState(false);
  const { npc, setNpcPopupEnabled } = useLearning();
  const activePet = npc.activePet;
  const stage = getPetStage(npc.xp[activePet]);
  const profile = petProfiles[activePet];
  if (!npc.popupEnabled || dismissed || location === "/npc") return null;

  return <aside className="npc-pet-popup" aria-label={`Teman belajar ${profile.name}`}>
    <button type="button" className="npc-popup-close" onClick={() => setDismissed(true)} aria-label="Sembunyikan pet untuk halaman ini"><X size={14} /></button>
    <button type="button" className="npc-popup-body" onClick={() => navigate("/npc")}>
      <NpcPetArt petId={activePet} stage={stage.id} alt={`${profile.name}, pet ${stage.label}`} />
      <span><small>{stage.label} · Lv.{stage.level}</small><strong>{profile.name}</strong><em>{npc.xp[activePet]} XP</em></span>
    </button>
    <button type="button" className="npc-popup-disable" onClick={() => setNpcPopupEnabled(false)}>Matikan popup</button>
  </aside>;
}
