export type MobileDrawerAction = "open" | "close" | "backdrop" | "route-change" | "toggle";

export function getInitialMobileDrawerOpen() {
  return false;
}

export function resolveMobileDrawerOpen(currentOpen: boolean, action: MobileDrawerAction) {
  if (action === "open") return true;
  if (action === "toggle") return !currentOpen;
  return false;
}
