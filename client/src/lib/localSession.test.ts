import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clearLocalSessionToken, getLocalSessionToken, storeLocalSessionToken } from "./localSession";

describe("local credential session fallback", () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    vi.stubGlobal("sessionStorage", {
      setItem: (key: string, value: string) => values.set(key, value),
      getItem: (key: string) => values.get(key) ?? null,
      removeItem: (key: string) => values.delete(key),
      clear: () => values.clear(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("uses the newly created local session and removes stale preview authentication", () => {
    sessionStorage.setItem("manus-cookie", "stale-preview-token");
    storeLocalSessionToken("fresh-local-token");

    expect(getLocalSessionToken()).toBe("fresh-local-token");
    expect(sessionStorage.getItem("manus-cookie")).toBeNull();
  });

  it("clears the fallback token on logout", () => {
    storeLocalSessionToken("fresh-local-token");
    clearLocalSessionToken();
    expect(getLocalSessionToken()).toBeNull();
  });
});
