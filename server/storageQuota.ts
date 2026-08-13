export const STUDY_STORAGE_QUOTA_BYTES = 25 * 1024 * 1024;

export function buildStorageQuotaSummary(usage: { usedBytes: number; fileCount: number }) {
  const usedBytes = Math.max(0, usage.usedBytes);
  const quotaBytes = STUDY_STORAGE_QUOTA_BYTES;
  return {
    quotaBytes,
    usedBytes,
    remainingBytes: Math.max(0, quotaBytes - usedBytes),
    percentUsed: Math.min(100, Math.round((usedBytes / quotaBytes) * 100)),
    fileCount: Math.max(0, usage.fileCount),
  };
}
