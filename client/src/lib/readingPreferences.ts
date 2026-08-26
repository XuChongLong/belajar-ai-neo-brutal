export const READING_PREFERENCES_KEY = "belajar-ai-reading-preferences";

export type ReadingTextScale = "compact" | "comfortable" | "generous";
export type ReadingFont = "sans" | "serif" | "accessible";
export type ReadingColumnWidth = "narrow" | "standard" | "wide";

export type ReadingPreferences = {
  textScale: ReadingTextScale;
  font: ReadingFont;
  columnWidth: ReadingColumnWidth;
};

export const defaultReadingPreferences: ReadingPreferences = {
  textScale: "comfortable",
  font: "sans",
  columnWidth: "standard",
};

const textScales = new Set<ReadingTextScale>(["compact", "comfortable", "generous"]);
const fonts = new Set<ReadingFont>(["sans", "serif", "accessible"]);
const widths = new Set<ReadingColumnWidth>(["narrow", "standard", "wide"]);

export function normalizeReadingPreferences(value: unknown): ReadingPreferences {
  if (!value || typeof value !== "object") return defaultReadingPreferences;
  const candidate = value as Partial<ReadingPreferences>;
  return {
    textScale: textScales.has(candidate.textScale as ReadingTextScale) ? candidate.textScale as ReadingTextScale : defaultReadingPreferences.textScale,
    font: fonts.has(candidate.font as ReadingFont) ? candidate.font as ReadingFont : defaultReadingPreferences.font,
    columnWidth: widths.has(candidate.columnWidth as ReadingColumnWidth) ? candidate.columnWidth as ReadingColumnWidth : defaultReadingPreferences.columnWidth,
  };
}

export function loadReadingPreferences(): ReadingPreferences {
  if (typeof window === "undefined") return defaultReadingPreferences;
  try {
    const raw = window.localStorage.getItem(READING_PREFERENCES_KEY);
    return raw ? normalizeReadingPreferences(JSON.parse(raw)) : defaultReadingPreferences;
  } catch {
    return defaultReadingPreferences;
  }
}

export function saveReadingPreferences(preferences: ReadingPreferences) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(READING_PREFERENCES_KEY, JSON.stringify(normalizeReadingPreferences(preferences)));
}

export function readingPreferenceClassNames(preferences: ReadingPreferences) {
  return `reader-scale-${preferences.textScale} reader-font-${preferences.font} reader-width-${preferences.columnWidth}`;
}
