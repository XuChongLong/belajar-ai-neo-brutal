import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { petProfiles, type PetId, type PetStage } from "@/lib/npcPets";

export type EvolutionCelebration = { id: number; petId: PetId; from: PetStage; to: PetStage };

export default function NpcEvolutionCelebration({ event }: { event: EvolutionCelebration | null }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { if (!event) return; setVisible(true); const timer = window.setTimeout(() => setVisible(false), 3500); return () => window.clearTimeout(timer); }, [event]);
  if (!event || !visible) return null;
  const profile = petProfiles[event.petId];
  return <div className="npc-evolution-celebration" role="status" aria-live="polite"><div className="npc-evolution-burst" aria-hidden="true">{Array.from({ length: 16 }, (_, index) => <i key={index} style={{ "--particle": index } as React.CSSProperties} />)}</div><div className="npc-evolution-message"><Sparkles size={25} /><span>EVOLUSI TERBUKA</span><strong>{profile.name} naik ke tahap {event.to === "anak" ? "Anak-anak" : event.to === "remaja" ? "Remaja" : event.to === "prima" ? "Dewasa Prima" : "Dewasa"}!</strong><small>Kerja kerasmu mengubah partner belajar ini.</small></div></div>;
}
