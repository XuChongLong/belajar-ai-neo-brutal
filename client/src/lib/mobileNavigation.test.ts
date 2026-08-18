import { describe, expect, it } from "vitest";
import { getInitialMobileDrawerOpen, resolveMobileDrawerOpen } from "./mobileNavigation";

describe("Android mobile navigation drawer", () => {
  it("starts closed and opens only after an explicit menu action", () => {
    expect(getInitialMobileDrawerOpen()).toBe(false);
    expect(resolveMobileDrawerOpen(false, "open")).toBe(true);
    expect(resolveMobileDrawerOpen(false, "toggle")).toBe(true);
  });

  it("closes from the close control, backdrop, toggle, and route change", () => {
    expect(resolveMobileDrawerOpen(true, "close")).toBe(false);
    expect(resolveMobileDrawerOpen(true, "backdrop")).toBe(false);
    expect(resolveMobileDrawerOpen(true, "toggle")).toBe(false);
    expect(resolveMobileDrawerOpen(true, "route-change")).toBe(false);
  });
});
