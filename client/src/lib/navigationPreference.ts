export const DESKTOP_SIDEBAR_PREFERENCE_KEY = "belajar-ai-desktop-sidebar";

export function getDesktopSidebarOpenPreference(value: string | null) {
  return value === "visible";
}

export function serializeDesktopSidebarOpenPreference(isOpen: boolean) {
  return isOpen ? "visible" : "hidden";
}
