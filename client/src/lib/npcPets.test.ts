import { describe, expect, it } from "vitest";
import { addPetXp, getPetStage, getPetXpProgress, initialPetProgress } from "./npcPets";

describe("NPC Pet evolution", () => {
  it("maps XP to the intended five evolution stages", () => {
    expect(getPetStage(0).label).toBe("Bayi");
    expect(getPetStage(60).label).toBe("Anak-anak");
    expect(getPetStage(160).label).toBe("Remaja");
    expect(getPetStage(360).label).toBe("Dewasa Prima");
    expect(getPetStage(650).label).toBe("Dewasa");
  });

  it("awards XP only to the selected active pet and persists each milestone that XP unlocks", () => {
    const withXp = addPetXp({ ...initialPetProgress, activePet: "unicorn" }, 35);
    expect(withXp.xp.unicorn).toBe(35);
    expect(withXp.xp.cat).toBe(0);
    expect(initialPetProgress.popupEnabled).toBe(false);
    expect(getPetXpProgress(35)).toMatchObject({ remaining: 25, nextStage: expect.objectContaining({ label: "Anak-anak" }) });
    const evolved = addPetXp({ ...initialPetProgress, activePet: "unicorn" }, 160);
    expect(evolved.earnedMilestones.unicorn).toEqual(["bayi", "anak", "remaja"]);
  });
});
