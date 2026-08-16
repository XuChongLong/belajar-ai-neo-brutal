export type SyncStatus = "guest" | "loading" | "syncing" | "synced" | "offline";

export function formatLastSynced(lastSyncedAt: number | null, now = Date.now()) {
  if (!lastSyncedAt) return "Belum tersimpan ke akun";
  const elapsedSeconds = Math.max(0, Math.floor((now - lastSyncedAt) / 1_000));
  if (elapsedSeconds < 15) return "Baru saja tersimpan";
  if (elapsedSeconds < 60) return `Tersimpan ${elapsedSeconds} dtk lalu`;
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  if (elapsedMinutes < 60) return `Tersimpan ${elapsedMinutes} mnt lalu`;
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) return `Tersimpan ${elapsedHours} jam lalu`;
  return `Tersimpan ${Math.floor(elapsedHours / 24)} hari lalu`;
}

export function getSyncStatusCopy(status: SyncStatus, lastSyncedAt: number | null) {
  if (status === "guest") return "Mode tamu · masuk agar progres ikut akunmu";
  if (status === "loading") return "Memuat progres akun…";
  if (status === "syncing") return "Menyimpan perubahan…";
  if (status === "offline") return "Belum tersimpan · perubahan tetap ada di perangkat ini";
  return formatLastSynced(lastSyncedAt);
}
