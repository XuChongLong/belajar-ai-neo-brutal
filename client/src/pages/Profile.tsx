// Style reminder: Paper Playground — the profile is a personal library card: factual, warm, and tactile.

import { ArrowUpRight, CalendarDays, FileText, FolderUp, HardDrive, Loader2, LogIn, LogOut, Mail, RefreshCw, ShieldAlert, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 MB";
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatLoginMethod(method: string | null | undefined) {
  const labels: Record<string, string> = { google: "Google", manus: "Manus" };
  return method ? (labels[method.toLowerCase()] ?? method) : "Akun belajar.ai";
}

export default function Profile() {
  const { error, isAuthenticated, loading, refresh, user, logout } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const quotaQuery = trpc.files.quota.useQuery(undefined, { enabled: isAuthenticated });

  const handleLogout = async () => {
    setIsSigningOut(true);
    try {
      await logout();
    } finally {
      setIsSigningOut(false);
    }
  };

  if (loading) return <div className="page"><div className="page-wrap files-loading"><Loader2 className="spin" size={25} /> Menyiapkan kartu profil...</div></div>;

  if (error) return <div className="page"><div className="page-wrap profile-auth-gate profile-error-gate"><div className="profile-gate-sticker"><ShieldAlert size={31} /><span>STATUS<br />AKUN</span></div><span className="eyebrow">PROFIL · STATUS BELUM TERSEDIA</span><h1>Profil belum bisa<br /><em>dibuka.</em></h1><p>Koneksi untuk memeriksa sesi akun sedang bermasalah. Coba muat ulang status akun terlebih dahulu; kamu tidak perlu masuk ulang untuk mencoba lagi.</p><p className="profile-error-message">{error.message}</p><button type="button" className="brutal-button button-black" onClick={() => refresh()}><RefreshCw size={17} /> Coba lagi</button></div></div>;

  if (!isAuthenticated) return <div className="page"><div className="page-wrap profile-auth-gate"><div className="profile-gate-sticker"><UserRound size={31} /><span>MY<br />PROFILE</span></div><span className="eyebrow">PROFIL · AKUN PRIBADI</span><h1>Masuk untuk melihat<br /><em>ruang belajarmu.</em></h1><p>Profil menyatukan identitas akun dan ringkasan pemakaian laci Study Files-mu, sehingga kapasitas penyimpanan selalu mudah dipantau.</p><button type="button" className="brutal-button button-pink" onClick={() => startLogin()}><LogIn size={17} /> Masuk untuk buka profil</button></div></div>;

  const quota = quotaQuery.data;
  const quotaWarning = (quota?.percentUsed ?? 0) >= 80;
  const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "Belum tersedia";

  return <div className="page"><div className="page-wrap profile-page">
    <div className="page-heading profile-heading">
      <div><span className="eyebrow">PROFIL · RUANG BELAJAR PRIBADI</span><h1>Halo, <em>{user?.name?.split(" ")[0] ?? "Pembelajar"}.</em></h1><p className="profile-lead">Satu tempat untuk mengecek akun, laci referensi, dan kapasitas ruang belajarmu.</p></div>
      <div className="profile-id-card"><span>KARTU BELAJAR</span><strong>{user?.name ?? "Pembelajar"}</strong><small>akun aktif</small></div>
    </div>

    <section className="profile-info-grid" aria-label="Informasi akun">
      <article className="profile-info-card profile-info-name"><UserRound size={21} /><div><span>Nama pembelajar</span><strong>{user?.name ?? "Pembelajar"}</strong></div></article>
      <article className="profile-info-card profile-info-email"><Mail size={21} /><div><span>Email</span><strong>{user?.email ?? "Email tidak tersedia"}</strong></div></article>
      <article className="profile-info-card profile-info-member"><CalendarDays size={21} /><div><span>Bergabung sejak</span><strong>{memberSince}</strong></div></article>
      <article className="profile-info-card profile-info-login"><ShieldCheck size={21} /><div><span>Masuk melalui</span><strong>{formatLoginMethod(user?.loginMethod)}</strong></div></article>
    </section>

    <section className="quota-section" aria-labelledby="quota-heading">
      <div className="quota-section-heading"><div><span className="section-index">RUANG PENYIMPANAN</span><h2 id="quota-heading">Laci Study Files</h2><p>Setiap akun memiliki ruang pribadi hingga 25 MB untuk PDF, teks, dan gambar referensi.</p></div><HardDrive size={34} strokeWidth={2.2} /></div>
      {quotaQuery.isLoading ? <div className="quota-loading"><Loader2 className="spin" size={22} /> Menghitung ruang yang terpakai...</div> : quotaQuery.error ? <div className="quota-error"><strong>Ringkasan penyimpanan belum bisa dimuat.</strong><span>{quotaQuery.error.message}</span></div> : quota ? <div className={`quota-card ${quotaWarning ? "quota-warning" : ""}`}>
        <div className="quota-card-top"><div><span className="eyebrow">KAPASITAS PRIBADI</span><h3>{formatBytes(quota.usedBytes)} <small>dari {formatBytes(quota.quotaBytes)}</small></h3></div><div className="quota-percent"><strong>{quota.percentUsed}%</strong><span>terpakai</span></div></div>
        <div className="quota-progress-track" role="progressbar" aria-label="Pemakaian kuota penyimpanan" aria-valuemin={0} aria-valuemax={100} aria-valuenow={quota.percentUsed}><i style={{ width: `${quota.percentUsed}%` }} /></div>
        <div className="quota-progress-meta"><span>0 MB</span><strong>{quotaWarning ? "Mendekati batas kuota" : "Ruang tersedia untuk belajar"}</strong><span>25 MB</span></div>
        <div className="quota-stats"><div><strong>{formatBytes(quota.remainingBytes)}</strong><span>ruang tersisa</span></div><div><strong>{quota.fileCount}</strong><span>{quota.fileCount === 1 ? "file tersimpan" : "file tersimpan"}</span></div><p>{quotaWarning ? "Ruangmu sudah terpakai 80% atau lebih. Rapikan file yang tidak lagi dipakai agar tetap leluasa menyimpan referensi baru." : "Kapasitas dihitung dari ukuran file yang tersimpan pada laci Study Files akun ini."}</p></div>
      </div> : null}
    </section>

    <section className="profile-actions" aria-label="Tindakan profil"><Link href="/files" className="profile-action profile-action-files"><FolderUp size={22} /><div><span>STUDY FILES</span><strong>Buka laci belajarku</strong><small>Tambah, buka, atau rapikan referensi.</small></div><ArrowUpRight size={18} /></Link><div className="profile-action profile-action-note"><FileText size={22} /><div><span>BATAS FILE</span><strong>Maksimal 5 MB per file</strong><small>PDF, TXT, PNG, JPG, dan WEBP didukung.</small></div></div></section>

    <div className="profile-signout"><div><span className="eyebrow">SESI AKUN</span><h2>Butuh berganti akun?</h2><p>Keluar hanya mengakhiri sesi pada perangkat ini. Catatan belajar dan file yang tersimpan tetap ada di akunmu.</p></div><button type="button" className="brutal-button button-black" disabled={isSigningOut} onClick={handleLogout}>{isSigningOut ? <Loader2 className="spin" size={17} /> : <LogOut size={17} />}{isSigningOut ? "Keluar..." : "Keluar dari akun"}</button></div>
  </div></div>;
}
