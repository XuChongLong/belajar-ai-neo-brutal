import { describe, expect, it } from "vitest";
import { getDesktopSidebarOpenPreference, serializeDesktopSidebarOpenPreference } from "./navigationPreference";

describe("desktop sidebar preference", () => {
  it("keeps the workbook spine visible by default and restores an explicit hidden choice", () => {
    expect(getDesktopSidebarOpenPreference(null)).toBe(true);
    expect(getDesktopSidebarOpenPreference("visible")).toBe(true);
    expect(getDesktopSidebarOpenPreference("hidden")).toBe(false);
  });

  it("serializes the only two supported sidebar states", () => {
    expect(serializeDesktopSidebarOpenPreference(true)).toBe("visible");
    expect(serializeDesktopSidebarOpenPreference(false)).toBe("hidden");
  });
});
