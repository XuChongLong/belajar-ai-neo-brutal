export const DESKTOP_SIDEBAR_PREFERENCE_KEY = "belajar-ai-desktop-workbook-spine-v3";

export function getDesktopSidebarOpenPreference(value: string | null) {
  return value === "visible";
}

export function serializeDesktopSidebarOpenPreference(isOpen: boolean) {
  return isOpen ? "visible" : "hidden";
}
