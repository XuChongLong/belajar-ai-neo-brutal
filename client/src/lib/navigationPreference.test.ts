import { describe, expect, it } from "vitest";
import { getDesktopSidebarOpenPreference, serializeDesktopSidebarOpenPreference } from "./navigationPreference";

describe("desktop sidebar preference", () => {
  it("keeps navigation compact by default and restores an explicit visible choice", () => {
    expect(getDesktopSidebarOpenPreference(null)).toBe(false);
    expect(getDesktopSidebarOpenPreference("visible")).toBe(true);
    expect(getDesktopSidebarOpenPreference("hidden")).toBe(false);
  });

  it("serializes the only two supported sidebar states", () => {
    expect(serializeDesktopSidebarOpenPreference(true)).toBe("visible");
    expect(serializeDesktopSidebarOpenPreference(false)).toBe("hidden");
  });
});
