import { ArrowRight, Eye, EyeOff, KeyRound, Loader2, LogIn, ShieldCheck, UserPlus } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { storeLocalSessionToken } from "@/lib/localSession";
import "./Login.css";
import "./LoginControls.css";

type Mode = "login" | "register";

function getContinuePath(search: string) {
  const value = new URLSearchParams(search).get("lanjut") || "/";
  return value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

export default function Login() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, loading } = useAuth();
  const utils = trpc.useUtils();
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const continueTo = useMemo(() => getContinuePath(window.location.search), []);
  const complete = async (result: { user: unknown; sessionToken: string }) => {
    storeLocalSessionToken(result.sessionToken);
    utils.auth.me.setData(undefined, result.user as never);
    await utils.auth.me.invalidate();
    setLocation(continueTo);
  };
  const loginMutation = trpc.auth.login.useMutation({ onSuccess: complete, onError: (error) => toast.error(error.message) });
  const registerMutation = trpc.auth.register.useMutation({ onSuccess: complete, onError: (error) => toast.error(error.message) });
  const pending = loginMutation.isPending || registerMutation.isPending;

  useEffect(() => {
    if (!loading && isAuthenticated) setLocation(continueTo);
  }, [continueTo, isAuthenticated, loading, setLocation]);

  if (!loading && isAuthenticated) return null;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { username, password, rememberMe };
    if (mode === "login") loginMutation.mutate(data);
    else registerMutation.mutate(data);
  };

  return <div className="page"><div className="page-wrap local-auth-page">
    <section className="local-auth-hero"><span className="eyebrow">AKUN BELAJAR.AI · PRIBADI</span><h1>Satu akun,<br /><em>lanjut terus.</em></h1><p>Simpan bahan belajar, atur profil, dan tampilkan pet-mu dengan username serta password yang kamu pilih sendiri.</p><div className="local-auth-points"><span><ShieldCheck size={17} /> Password disimpan sebagai hash aman</span><span><KeyRound size={17} /> Sesi privat untuk laci dan profilmu</span></div></section>
    <section className="local-auth-card" aria-label="Akses akun belajar.ai"><div className="local-auth-sticker"><KeyRound size={27} /><strong>MY<br />KEY</strong></div><div className="local-auth-tabs" role="tablist" aria-label="Pilih jenis akses"><button type="button" role="tab" aria-selected={mode === "login"} className={mode === "login" ? "is-active" : ""} onClick={() => setMode("login")}>Masuk</button><button type="button" role="tab" aria-selected={mode === "register"} className={mode === "register" ? "is-active" : ""} onClick={() => setMode("register")}>Buat akun</button></div><div className="local-auth-copy"><span className="eyebrow">{mode === "login" ? "SENANG KETEMU LAGI" : "MULAI RUANG PRIBADIMU"}</span><h2>{mode === "login" ? "Masuk dan lanjut belajar." : "Buat akun tanpa ribet."}</h2><p>{mode === "login" ? "Gunakan username dan password yang kamu buat di belajar.ai." : "Pilih username unik. Password wajib berisi minimal 10 karakter."}</p></div><form onSubmit={submit} className="local-auth-form"><label>Username<input autoComplete="username" autoCapitalize="none" spellCheck={false} value={username} onChange={(event) => setUsername(event.target.value)} placeholder="misalnya anne.belajar" minLength={3} maxLength={32} required /></label><label>Password<span className="local-auth-password-input"><input autoComplete={mode === "login" ? "current-password" : "new-password"} type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="minimal 10 karakter" minLength={10} maxLength={128} required /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"} aria-pressed={showPassword} title={showPassword ? "Sembunyikan password" : "Tampilkan password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label><label className="local-auth-remember"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} /><span><b>Ingat saya</b><small>Tetap masuk hingga 30 hari di perangkat pribadi.</small></span></label><button type="submit" className="brutal-button button-pink" disabled={pending || loading}>{pending ? <Loader2 className="spin" size={17} /> : mode === "login" ? <LogIn size={17} /> : <UserPlus size={17} />}{pending ? "Memproses..." : mode === "login" ? "Masuk ke ruang belajar" : "Buat akun & mulai"}<ArrowRight size={16} /></button></form><small className="local-auth-note">Username: 3–32 karakter, huruf, angka, titik, garis bawah, atau strip. Password tidak pernah ditampilkan atau disimpan dalam bentuk teks biasa.</small></section>
  </div></div>;
}
