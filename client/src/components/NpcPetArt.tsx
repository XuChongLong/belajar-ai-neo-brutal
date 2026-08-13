import { getPetAsset, petProfiles, type PetId, type PetStage } from "@/lib/npcPets";

export default function NpcPetArt({ petId, stage, alt, className = "" }: { petId: PetId; stage: PetStage; alt: string; className?: string }) {
  const isRobotFallback = petId === "robot";
  return <div className={`npc-pet-art ${isRobotFallback ? "npc-pet-art-robot-fallback" : ""} ${className}`}>
    <img src={getPetAsset(petId, stage)} alt={alt} />
    {isRobotFallback && <span className="npc-fallback-note" aria-label="Asset robot sementara">ASSET SEMENTARA</span>}
    <i aria-hidden="true">{petProfiles[petId].symbol}</i>
  </div>;
}
