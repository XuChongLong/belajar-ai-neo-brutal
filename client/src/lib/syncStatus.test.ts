import { describe, expect, it } from "vitest";
import { formatLastSynced, getSyncStatusCopy } from "./syncStatus";

describe("sync status copy", () => {
  it("formats the last account sync using readable Indonesian timing", () => {
    const now = 1_800_000_000_000;
    expect(formatLastSynced(now - 8_000, now)).toBe("Baru saja tersimpan");
    expect(formatLastSynced(now - 125_000, now)).toBe("Tersimpan 2 mnt lalu");
    expect(formatLastSynced(now - 7_200_000, now)).toBe("Tersimpan 2 jam lalu");
  });

  it("keeps guest and offline states explicit instead of implying account sync", () => {
    expect(getSyncStatusCopy("guest", null)).toContain("Mode tamu");
    expect(getSyncStatusCopy("offline", null)).toContain("Belum tersimpan");
  });
});
