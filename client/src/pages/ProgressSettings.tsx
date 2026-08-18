// Style reminder: Paper Playground — settings are a careful desk drawer: clear labels, friendly warnings, and tactile confirmation steps.

import { Download, FileDown, Loader2, LogIn, RotateCcw, Settings2, ShieldAlert, Target } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLearning } from "@/contexts/LearningContext";
import { localSignInPath } from "@/lib/authNavigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { getProgressExportFilename } from "@/lib/progressData";
import { toast } from "sonner";

const goalOptions = [3, 5, 7];

export default function ProgressSettings() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, loading } = useAuth();
  const { weeklyGoal, setWeeklyGoal, exportProgress, resetProgress, syncStatus, lastSyncedAt } = useLearning();
  const [isResetting, setIsResetting] = useState(false);

  const downloadExport = () => {
    const exportData = exportProgress();
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = getProgressExportFilename(exportData.exportedAt);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    toast("File progres berhasil diekspor.");
  };

  const confirmReset = () => {
    setIsResetting(true);
    resetProgress();
    window.setTimeout(() => { setIsResetting(false); toast("Progres telah direset dan akan disinkronkan ke akun."); }, 0);
  };

  if (loading) return <div className="page"><div className="page-wrap files-loading"><Loader2 className="spin" size={25} /> Menyiapkan pengaturan progres...</div></div>;
  if (!isAuthenticated) return <div className="page"><div className="page-wrap profile-auth-gate"><div className="profile-gate-sticker"><Settings2 size={31} /><span>DATA<br />BELAJAR</span></div><span className="eyebrow">PENGATURAN PROGRES · AKUN PRIBADI</span><h1>Masuk untuk mengatur<br /><em>data belajarmu.</em></h1><p>Ekspor dan reset hanya tersedia setelah masuk, agar perubahan selalu terkait dengan akun yang tepat.</p><button type="button" className="brutal-button button-pink" onClick={() => setLocation(localSignInPath("/pengaturan"))}><LogIn size={17} /> Masuk untuk buka pengaturan</button></div></div>;

  return <div className="page"><div className="page-wrap settings-page"><div className="page-heading"><div><span className="eyebrow">AKUN · PENGATURAN PROGRES</span><h1>Atur jejak,<br /><em>jaga kendali.</em></h1><p className="settings-lead">Pilih ritme mingguan, simpan salinan data, atau mulai ulang progres dengan konfirmasi yang jelas.</p></div><div className="settings-stamp"><Settings2 size={26} /><span>MY<br />WORKBOOK</span></div></div>
    <section className="settings-card goal-settings-card"><div><span className="eyebrow"><Target size={13} /> TARGET MINGGUAN</span><h2>Berapa hari aktif yang ingin kamu jaga?</h2><p>Target dihitung dari hari dengan aktivitas belajar nyata dan ikut tersimpan di akunmu.</p></div><div className="goal-choice-row" role="radiogroup" aria-label="Target belajar mingguan">{goalOptions.map((goal) => <button type="button" role="radio" aria-checked={weeklyGoal === goal} className={`goal-choice ${weeklyGoal === goal ? "goal-choice-active" : ""}`} key={goal} onClick={() => { setWeeklyGoal(goal); toast(`Target mingguan diubah menjadi ${goal} hari aktif.`); }}><strong>{goal}</strong><span>hari</span></button>)}</div></section>
    <section className="settings-card export-settings-card"><div><span className="eyebrow"><FileDown size={13} /> SALINAN DATA</span><h2>Simpan progresmu sebagai file JSON.</h2><p>Ekspor berisi materi selesai, bookmark, skor quiz, riwayat aktivitas, target mingguan, dan progres NPC. File dibuat di perangkat ini tanpa dikirim ke pihak lain.</p></div><button type="button" className="brutal-button button-black" onClick={downloadExport}><Download size={17} /> Ekspor progres</button></section>
    <section className="settings-card reset-settings-card"><div><span className="eyebrow"><ShieldAlert size={13} /> ZONA HATI-HATI</span><h2>Mulai ulang seluruh progres belajar.</h2><p>Reset menghapus progres materi, bookmark, skor, riwayat aktivitas, streak, target, dan progres NPC pada akun aktif. Setelah tersinkronisasi, tindakan ini tidak dapat dipulihkan lewat aplikasi.</p></div><AlertDialog><AlertDialogTrigger asChild><button type="button" className="brutal-button button-danger"><RotateCcw size={17} /> Reset progres</button></AlertDialogTrigger><AlertDialogContent className="reset-dialog"><AlertDialogHeader><AlertDialogTitle>Yakin ingin mereset workbook ini?</AlertDialogTitle><AlertDialogDescription>Semua checkpoint, riwayat, skor quiz, bookmark, streak, dan progres NPC pada akun aktif akan dikosongkan. Unduh ekspor terlebih dahulu bila ingin menyimpan salinan.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction disabled={isResetting} onClick={confirmReset} className="reset-dialog-confirm">{isResetting ? "Mereset…" : "Ya, reset progres"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></section>
    <section className="settings-footnote"><span>STATUS AKUN</span><strong>{syncStatus === "synced" ? "Progres tersimpan ke akun aktif." : "Perubahan akan tersimpan saat koneksi tersedia."}</strong><small>{lastSyncedAt ? `Sinkronisasi terakhir: ${new Date(lastSyncedAt).toLocaleString("id-ID")}` : "Belum ada snapshot akun yang tersimpan."}</small></section>
  </div></div>;
}
