// Style reminder: Paper Playground — a tactile workbook shell with a strong navigation rail, ink borders, and playful micro-feedback.

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { BookMarked, BookOpen, Flame, Home, Info, LayoutDashboard, Menu, RotateCcw, X } from "lucide-react";
import { useLearning } from "@/contexts/LearningContext";

const logo = "/manus-storage/belajar-ai-logo_ce2158e2.png";

const navItems = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/materi", label: "Semua Materi", icon: BookOpen },
  { href: "/progress", label: "Progress", icon: LayoutDashboard },
  { href: "/review", label: "Mode Review", icon: RotateCcw },
  { href: "/glosarium", label: "Glosarium", icon: BookMarked },
  { href: "/tentang", label: "Tentang", icon: Info },
];

type Spark = { id: number; x: number; y: number; glyph: string };

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const { streak } = useLearning();

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
      trailRef.current = { x: trailRef.current.x + (event.clientX - trailRef.current.x) * 0.18, y: trailRef.current.y + (event.clientY - trailRef.current.y) * 0.18 };
      setTrail({ ...trailRef.current });
    };
    const onClick = (event: MouseEvent) => {
      const next = Array.from({ length: 9 }, (_, index) => ({ id: Date.now() + index, x: event.clientX + (Math.random() - 0.5) * 58, y: event.clientY + (Math.random() - 0.5) * 58, glyph: index % 2 ? "•" : "✦" }));
      setSparks((prev) => [...prev, ...next]);
      window.setTimeout(() => setSparks((prev) => prev.filter((spark) => !next.some((item) => item.id === spark.id))), 760);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("click", onClick); };
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <div className="app-shell">
      <div className="cursor-dot" style={{ left: cursor.x, top: cursor.y }} aria-hidden="true" />
      <div className="cursor-trail" style={{ left: trail.x, top: trail.y }} aria-hidden="true" />
      <div className="spark-layer" aria-hidden="true">{sparks.map((spark) => <span key={spark.id} className="spark" style={{ left: spark.x, top: spark.y }}>{spark.glyph}</span>)}</div>
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`} aria-label="Navigasi utama">
        <div className="sidebar-brand">
          <img src={logo} alt="" className="brand-mark" />
          <div><span className="brand-name">belajar<span>.ai</span></span><small>workbook interaktif</small></div>
          <button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Tutup menu"><X size={19} /></button>
        </div>
        <div className="sidebar-kicker">MENU UTAMA</div>
        <nav className="sidebar-nav">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? location === "/" : location.startsWith(href);
            return <Link key={href} href={href} className={`nav-link ${active ? "nav-active" : ""}`}><Icon size={19} strokeWidth={2.5} /><span>{label}</span>{active && <i />}</Link>;
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="streak-card"><div className="streak-icon"><Flame size={18} fill="currentColor" /></div><div><strong>{streak} hari</strong><span>streak belajar</span></div></div>
          <div className="sidebar-tip">“Pelan-pelan, yang penting konsisten.”</div>
          <span className="sidebar-version">v1.0 · dibuat untuk penasaran</span>
        </div>
      </aside>
      <div className="main-column">
        <div className="desktop-brand-rail"><Link href="/" className="desktop-brand-link"><img src={logo} alt="" /><span>belajar<span>.ai</span></span></Link><span>AI TANPA RIBET <i /> WORKBOOK DIGITAL</span></div>
        <header className="mobile-header"><button className="icon-button" onClick={() => setMobileOpen(true)} aria-label="Buka menu"><Menu size={22} /></button><Link href="/" className="mobile-brand"><img src={logo} alt="" /> <span>belajar<span>.ai</span></span></Link><Link href="/progress" className="mobile-progress">{streak}<Flame size={15} fill="currentColor" /></Link></header>
        <main>{children}</main>
      </div>
    </div>
  );
}
