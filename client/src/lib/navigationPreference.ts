export const DESKTOP_SIDEBAR_PREFERENCE_KEY = "belajar-ai-desktop-workbook-spine-v2";

export function getDesktopSidebarOpenPreference(value: string | null) {
  return value !== "hidden";
}

export function serializeDesktopSidebarOpenPreference(isOpen: boolean) {
  return isOpen ? "visible" : "hidden";
}
