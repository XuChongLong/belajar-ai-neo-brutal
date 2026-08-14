import { accessoryCatalog, getPetAsset, petProfiles, type AccessoryId, type PetId, type PetStage } from "@/lib/npcPets";

export default function NpcPetArt({ petId, stage, alt, accessory = null, className = "" }: { petId: PetId; stage: PetStage; alt: string; accessory?: AccessoryId | null; className?: string }) {
  return <div className={`npc-pet-art ${className}`}>
    <img src={getPetAsset(petId, stage)} alt={alt} />
    {accessory && <span className={`npc-accessory npc-accessory-${accessory}`} aria-label={accessoryCatalog[accessory].name}>{accessoryCatalog[accessory].symbol}</span>}
    <i aria-hidden="true">{petProfiles[petId].symbol}</i>
  </div>;
}
