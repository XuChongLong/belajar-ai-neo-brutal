import { describe, expect, it } from "vitest";
import { buildStorageQuotaSummary, STUDY_STORAGE_QUOTA_BYTES } from "./storageQuota";

describe("storage quota summary", () => {
  it("calculates used, remaining, percentage, and file count from user-owned metadata", () => {
    const usedBytes = 6 * 1024 * 1024;
    expect(buildStorageQuotaSummary({ usedBytes, fileCount: 4 })).toEqual({
      quotaBytes: STUDY_STORAGE_QUOTA_BYTES,
      usedBytes,
      remainingBytes: 19 * 1024 * 1024,
      percentUsed: 24,
      fileCount: 4,
    });
  });

  it("clamps an over-quota aggregate to a full meter with no negative remaining capacity", () => {
    const summary = buildStorageQuotaSummary({ usedBytes: STUDY_STORAGE_QUOTA_BYTES + 1, fileCount: 5 });
    expect(summary.percentUsed).toBe(100);
    expect(summary.remainingBytes).toBe(0);
  });
});
