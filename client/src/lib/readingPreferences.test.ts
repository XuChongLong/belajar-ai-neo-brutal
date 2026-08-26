// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";
import { READING_PREFERENCES_KEY, defaultReadingPreferences, loadReadingPreferences, normalizeReadingPreferences, readingPreferenceClassNames, saveReadingPreferences } from "./readingPreferences";

describe("reading preferences", () => {
  beforeEach(() => window.localStorage.clear());
  it("normalizes missing, legacy, and invalid preference values to safe reading defaults", () => {
    expect(normalizeReadingPreferences(null)).toEqual(defaultReadingPreferences);
    expect(normalizeReadingPreferences({ textScale: "generous", font: "serif", columnWidth: "wide" })).toEqual({ textScale: "generous", font: "serif", columnWidth: "wide" });
    expect(normalizeReadingPreferences({ textScale: "huge", font: "comic", columnWidth: "unlimited" })).toEqual(defaultReadingPreferences);
  });

  it("creates scoped reader classes without changing the surrounding course UI", () => {
    expect(readingPreferenceClassNames({ textScale: "compact", font: "accessible", columnWidth: "narrow" })).toBe("reader-scale-compact reader-font-accessible reader-width-narrow");
  });

  it("persists a valid choice locally and safely repairs a corrupted saved value", () => {
    saveReadingPreferences({ textScale: "generous", font: "accessible", columnWidth: "wide" });
    expect(loadReadingPreferences()).toEqual({ textScale: "generous", font: "accessible", columnWidth: "wide" });
    window.localStorage.setItem(READING_PREFERENCES_KEY, "not-json");
    expect(loadReadingPreferences()).toEqual(defaultReadingPreferences);
  });
});
