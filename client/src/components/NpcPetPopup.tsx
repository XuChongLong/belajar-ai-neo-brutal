import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useLocation } from "wouter";
import { useLearning } from "@/contexts/LearningContext";
import { getPetStage, normalizeNpcPopupPosition, petProfiles, type PetPopupPosition } from "@/lib/npcPets";
import NpcPetArt from "@/components/NpcPetArt";

const COMPANION_SIZE = 108;

function clampToViewport(position: { x: number; y: number }) {
  if (typeof window === "undefined") return position;
  return {
    x: Math.min(Math.max(8, position.x), Math.max(8, window.innerWidth - COMPANION_SIZE - 8)),
    y: Math.min(Math.max(8, position.y), Math.max(8, window.innerHeight - COMPANION_SIZE - 8)),
  };
}

function toPixels(position: PetPopupPosition) {
  if (typeof window === "undefined") return { x: 18, y: 18 };
  return clampToViewport({ x: position.x * (window.innerWidth - COMPANION_SIZE), y: position.y * (window.innerHeight - COMPANION_SIZE) });
}

function toStoredPosition(position: { x: number; y: number }) {
  if (typeof window === "undefined") return { x: 0.83, y: 0.76 };
  return normalizeNpcPopupPosition({ x: position.x / Math.max(1, window.innerWidth - COMPANION_SIZE), y: position.y / Math.max(1, window.innerHeight - COMPANION_SIZE) });
}

export default function NpcPetPopup() {
  const [location] = useLocation();
  const { npc, setNpcPopupPosition } = useLearning();
  const [position, setPosition] = useState(() => toPixels(npc.popupPosition));
  const [motion, setMotion] = useState("float");
  const dragRef = useRef<{ pointerId: number; offsetX: number; offsetY: number; moved: boolean } | null>(null);
  const activePet = npc.activePet;
  const stage = getPetStage(npc.xp[activePet]);
  const profile = petProfiles[activePet];
  useEffect(() => {
    const updatePosition = () => setPosition(toPixels(npc.popupPosition));
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [npc.popupPosition]);

  useEffect(() => {
    const animationNames = ["float", "tilt", "hop", "look"];
    const interval = window.setInterval(() => setMotion(animationNames[Math.floor(Math.random() * animationNames.length)]), 3600 + Math.floor(Math.random() * 2600));
    return () => window.clearInterval(interval);
  }, []);

  const persistPosition = (next: { x: number; y: number }) => setNpcPopupPosition(toStoredPosition(next));
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    dragRef.current = { pointerId: event.pointerId, offsetX: event.clientX - bounds.left, offsetY: event.clientY - bounds.top, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    drag.moved = true;
    setPosition(clampToViewport({ x: event.clientX - drag.offsetX, y: event.clientY - drag.offsetY }));
  };
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
    setPosition((current) => {
      persistPosition(current);
      return current;
    });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const delta = event.shiftKey ? 36 : 16;
    const movement: Record<string, { x: number; y: number }> = { ArrowLeft: { x: -delta, y: 0 }, ArrowRight: { x: delta, y: 0 }, ArrowUp: { x: 0, y: -delta }, ArrowDown: { x: 0, y: delta } };
    if (!movement[event.key]) return;
    event.preventDefault();
    setPosition((current) => {
      const next = clampToViewport({ x: current.x + movement[event.key].x, y: current.y + movement[event.key].y });
      persistPosition(next);
      return next;
    });
  };
  if (!npc.popupEnabled || location === "/npc") return null;

  return <div className={`npc-pet-popup npc-pet-motion-${motion}`} style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }} role="img" tabIndex={0} aria-label={`${profile.name}, teman belajar yang dapat dipindahkan. Gunakan panah untuk menggeser.`} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} onKeyDown={handleKeyDown}>
    <NpcPetArt petId={activePet} stage={stage.id} accessory={npc.equippedAccessory} alt="" />
  </div>;
}
