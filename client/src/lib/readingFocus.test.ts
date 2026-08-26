import { describe, expect, it } from "vitest";
import { usesReadingFocusShell } from "./readingFocus";

describe("usesReadingFocusShell", () => {
  it("keeps catalogue and lesson routes calm while leaving workspace tools unchanged", () => {
    expect(usesReadingFocusShell("/materi")).toBe(true);
    expect(usesReadingFocusShell("/materi/5000")).toBe(true);
    expect(usesReadingFocusShell("/")).toBe(false);
    expect(usesReadingFocusShell("/portfolio")).toBe(false);
  });
});
