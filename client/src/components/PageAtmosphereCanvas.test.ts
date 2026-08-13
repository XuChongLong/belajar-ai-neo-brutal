import { describe, expect, it } from "vitest";
import { getAtmosphereScene } from "./PageAtmosphereCanvas";

describe("page atmosphere scenes", () => {
  it("assigns a distinct decorative scene to each major page family", () => {
    expect(getAtmosphereScene("/")).toBe("home");
    expect(getAtmosphereScene("/materi")).toBe("catalogue");
    expect(getAtmosphereScene("/materi/4")).toBe("lesson");
    expect(getAtmosphereScene("/progress")).toBe("progress");
    expect(getAtmosphereScene("/review")).toBe("review");
    expect(getAtmosphereScene("/glosarium")).toBe("glossary");
    expect(getAtmosphereScene("/files")).toBe("files");
    expect(getAtmosphereScene("/profil")).toBe("profile");
    expect(getAtmosphereScene("/tentang")).toBe("about");
  });

  it("keeps a safe default scene for unknown routes", () => {
    expect(getAtmosphereScene("/tidak-dikenal")).toBe("default");
  });
});
