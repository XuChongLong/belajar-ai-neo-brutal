import { useRef, useState, type CSSProperties } from "react";
import { CircleDollarSign, Play, Sparkles, Trophy } from "lucide-react";
import NpcPetArt from "@/components/NpcPetArt";
import { DAILY_MINIGAME_LIMIT, MINIGAME_FAST_TIME_MS, MINIGAME_TARGET_SCORE, type AccessoryId, type PetId, type PetStage } from "@/lib/npcPets";

const lanes = [12, 68, 34, 76, 20, 56, 42, 82];

type Props = {
  petId: PetId;
  stage: PetStage;
  petName: string;
  accessory: AccessoryId | null;
  dailyRounds: number;
  bestScore: number;
  coinsClaimed: number;
  onComplete: (score: number, durationMs: number) => void;
};

export default function NpcSnackSprint({ petId, stage, petName, accessory, dailyRounds, bestScore, coinsClaimed, onComplete }: Props) {
  const [running, setRunning] = useState(false);
  const [caught, setCaught] = useState(0);
  const [finished, setFinished] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const startedAt = useRef(0);
  const locked = dailyRounds >= DAILY_MINIGAME_LIMIT;
  const start = () => { startedAt.current = Date.now(); setCaught(0); setFinished(false); setPracticeMode(locked); setRunning(true); };
  const catchSnack = () => {
    const next = caught + 1;
      setCaught(next);
    if (next >= MINIGAME_TARGET_SCORE) {
      setRunning(false);
      setFinished(true);
      if (!practiceMode) onComplete(next, Math.max(1, Date.now() - startedAt.current));
    }
  };
  const lane = lanes[caught % lanes.length];
  const speedBonusText = `≤ ${Math.round(MINIGAME_FAST_TIME_MS / 1000)} dtk = 2 koin`;
  return <section className="npc-mini-game" aria-labelledby="mini-game-heading"><div className="npc-section-heading"><div><span className="section-index">MINI-GAME PET</span><h2 id="mini-game-heading">Snack Sprint.</h2></div><p>Tangkap biskuit yang bergerak untuk mengajak {petName} bermain dan mendapatkan koin bonus.</p></div><div className="npc-mini-game-card"><div className="npc-mini-game-copy"><span className="eyebrow">1× BONUS HARIAN</span><h3>Tangkap {MINIGAME_TARGET_SCORE} biskuit.</h3><p>Selesaikan satu ronde yang valid untuk memperoleh <b>1 koin snack</b>. Selesaikan lebih cepat dari {speedBonusText} untuk <b>2 koin</b>.</p><div className="npc-mini-game-stats"><span><Trophy size={15} /> Skor terbaik <b>{bestScore}/{MINIGAME_TARGET_SCORE}</b></span><span><CircleDollarSign size={15} /> Klaim hari ini <b>{coinsClaimed} koin</b></span></div>{locked && !running ? <div className="npc-mini-game-locked"><Sparkles size={18} /><strong>Bonus hari ini sudah diambil.</strong><small>Quest tetap bisa kamu selesaikan kapan saja. Latihan tidak memberi koin tambahan.</small><button type="button" onClick={start}><Play size={14} /> {finished && practiceMode ? "Ulangi latihan" : "Latihan tanpa bonus"}</button></div> : !running ? <button type="button" className="brutal-button button-pink" onClick={start}><Play size={16} /> Mulai Snack Sprint</button> : <p className="npc-mini-game-live" role="status">{practiceMode ? "Latihan" : "Tangkap biskuit"}: <b>{caught}/{MINIGAME_TARGET_SCORE}</b></p>}</div><div className={`npc-sprint-arena ${running ? "npc-sprint-running" : ""}`}><div className="npc-sprint-pet"><NpcPetArt petId={petId} stage={stage} accessory={accessory} alt={`${petName} siap bermain Snack Sprint`} /></div><div className="npc-sprint-track" aria-label="Arena Snack Sprint">{running ? <button type="button" className="npc-sprint-snack" style={{ "--lane": `${lane}%` } as CSSProperties} onClick={catchSnack} aria-label={`Tangkap biskuit ${caught + 1} dari ${MINIGAME_TARGET_SCORE}`}>✦</button> : <span className="npc-sprint-start">{locked ? "LATIHAN" : "SIAP MAIN"}</span>}<i className="npc-sprint-line" /></div></div></div></section>;
}
