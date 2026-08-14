// Style reminder: Paper Playground — a tactile workbook shell with a strong navigation rail, ink borders, and playful micro-feedback.

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, BookMarked, BookOpen, FilePenLine, Flame, FolderUp, Gamepad2, Home, Info, LayoutDashboard, Layers3, Menu, RotateCcw, Search, UserRound, X } from "lucide-react";
import { useLearning } from "@/contexts/LearningContext";
import { materials } from "@/lib/materials";
import { glossaryTerms } from "@/lib/glossary";
import PageAtmosphereCanvas from "@/components/PageAtmosphereCanvas";
import NpcPetPopup from "@/components/NpcPetPopup";
import { DESKTOP_SIDEBAR_PREFERENCE_KEY, getDesktopSidebarOpenPreference, serializeDesktopSidebarOpenPreference } from "@/lib/navigationPreference";

const logo = "/manus-storage/belajar-ai-logo_ce2158e2.png";

const navItems = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/materi", label: "Semua Materi", icon: BookOpen },
  { href: "/progress", label: "Progress", icon: LayoutDashboard },
  { href: "/review", label: "Mode Review", icon: RotateCcw },
  { href: "/glosarium", label: "Glosarium", icon: BookMarked },
  { href: "/flashcards", label: "Flashcards", icon: Layers3 },
  { href: "/npc", label: "NPC Pet", icon: Gamepad2 },
  { href: "/prd-maker", label: "PRD Maker", icon: FilePenLine },
  { href: "/files", label: "Study Files", icon: FolderUp },
  { href: "/profil", label: "Profil", icon: UserRound },
  { href: "/tentang", label: "Tentang", icon: Info },
];

type Spark = { id: string; x: number; y: number; glyph: string };

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(() => typeof window === "undefined" ? true : getDesktopSidebarOpenPreference(window.localStorage.getItem(DESKTOP_SIDEBAR_PREFERENCE_KEY)));
  const [isMobileLayout, setIsMobileLayout] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const { streak } = useLearning();
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    const materialResults = materials.filter((item) => `${item.title} ${item.category} ${item.summary}`.toLowerCase().includes(query)).slice(0, 5).map((item) => ({ type: "MATERI", title: item.title, meta: `${item.category} · ${item.minutes} menit`, href: `/materi/${item.id}` }));
    const quizResults = materials.flatMap((item) => item.quiz.map((quiz) => ({ item, quiz }))).filter(({ item, quiz }) => `${quiz.question} ${quiz.options.join(" ")} ${item.title}`.toLowerCase().includes(query)).slice(0, 4).map(({ item, quiz }) => ({ type: "QUIZ", title: quiz.question, meta: item.title, href: `/materi/${item.id}` }));
    const glossaryResults = glossaryTerms.filter((item) => `${item.term} ${item.definition} ${item.category}`.toLowerCase().includes(query)).slice(0, 4).map((item) => ({ type: "GLOSARIUM", title: item.term, meta: item.definition, href: `/materi/${item.materialId}` }));
    return [...materialResults, ...quizResults, ...glossaryResults].slice(0, 8);
  }, [searchQuery]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
      trailRef.current = { x: trailRef.current.x + (event.clientX - trailRef.current.x) * 0.18, y: trailRef.current.y + (event.clientY - trailRef.current.y) * 0.18 };
      setTrail({ ...trailRef.current });
    };
    const onClick = (event: MouseEvent) => {
      const next = Array.from({ length: 9 }, (_, index) => ({ id: crypto.randomUUID(), x: event.clientX + (Math.random() - 0.5) * 58, y: event.clientY + (Math.random() - 0.5) * 58, glyph: index % 2 ? "•" : "✦" }));
      setSparks((prev) => [...prev, ...next]);
      window.setTimeout(() => setSparks((prev) => prev.filter((spark) => !next.some((item) => item.id === spark.id))), 760);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("click", onClick); };
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const sync = () => setIsMobileLayout(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(DESKTOP_SIDEBAR_PREFERENCE_KEY, serializeDesktopSidebarOpenPreference(desktopSidebarOpen));
  }, [desktopSidebarOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if ((event.key === "/" || (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey))) && document.activeElement?.tagName !== "INPUT") { event.preventDefault(); setSearchOpen(true); } if (event.key === "Escape") { setSearchOpen(false); setMobileOpen(false); setDesktopSidebarOpen(false); } };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => { if (searchOpen) window.setTimeout(() => searchInputRef.current?.focus(), 0); else setSearchQuery(""); }, [searchOpen]);

  const navigationVisible = isMobileLayout ? mobileOpen : desktopSidebarOpen;

  return (
    <div className={`app-shell ${desktopSidebarOpen ? "desktop-sidebar-open" : ""}`}>
      <div className="cursor-dot" style={{ left: cursor.x, top: cursor.y }} aria-hidden="true" />
      <div className="cursor-trail" style={{ left: trail.x, top: trail.y }} aria-hidden="true" />
      <div className="spark-layer" aria-hidden="true">{sparks.map((spark) => <span key={spark.id} className="spark" style={{ left: spark.x, top: spark.y }}>{spark.glyph}</span>)}</div>
      {searchOpen && <div className="global-search-overlay" role="dialog" aria-modal="true" aria-label="Pencarian global" onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false); }}><div className="global-search-panel"><div className="global-search-head"><div><span className="eyebrow">CARI DI BELAJAR.AI</span><h2>Temukan langkah berikutnya.</h2></div><button type="button" className="icon-button" onClick={() => setSearchOpen(false)} aria-label="Tutup pencarian"><X size={20} /></button></div><div className="global-search-input"><Search size={19} /><input ref={searchInputRef} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Cari materi, kuis, atau istilah..." aria-label="Cari materi, kuis, atau istilah" /><kbd>ESC</kbd></div>{searchQuery.trim() ? <div className="global-search-results">{searchResults.length ? searchResults.map((result) => <Link href={result.href} className="global-search-result" key={`${result.type}-${result.title}`} onClick={() => setSearchOpen(false)}><span className="search-result-type">{result.type}</span><div><strong>{result.title}</strong><small>{result.meta}</small></div><ArrowUpRight size={16} /></Link>) : <div className="global-search-empty"><span>⊙</span><p>Belum ada yang cocok. Coba kata yang lebih pendek.</p></div>}</div> : <div className="global-search-hint"><span>TIP CEPAT</span><p>Tekan <kbd>/</kbd> kapan pun untuk membuka pencarian. Cari berdasarkan judul materi, isi quiz, atau istilah glossary.</p></div>}</div></div>}
      <button type="button" className="desktop-nav-toggle" onClick={() => setDesktopSidebarOpen((open) => !open)} aria-controls="primary-navigation" aria-expanded={desktopSidebarOpen} aria-label={desktopSidebarOpen ? "Sembunyikan navigasi" : "Tampilkan navigasi"}>{desktopSidebarOpen ? <X size={20} /> : <Menu size={21} />}</button>
      <aside id="primary-navigation" className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`} aria-label="Navigasi utama" aria-hidden={!navigationVisible}>
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
        <div className="desktop-brand-rail"><Link href="/" className="desktop-brand-link"><img src={logo} alt="" /><span>belajar<span>.ai</span></span></Link><button type="button" className="global-search-trigger" onClick={() => setSearchOpen(true)}><Search size={15} /> <span>Cari materi, kuis, istilah...</span><kbd>/</kbd></button><span>AI TANPA RIBET <i /> WORKBOOK DIGITAL</span></div>
        <header className="mobile-header"><button className="icon-button" onClick={() => setMobileOpen(true)} aria-controls="primary-navigation" aria-expanded={mobileOpen} aria-label="Buka menu"><Menu size={22} /></button><Link href="/" className="mobile-brand"><img src={logo} alt="" /> <span>belajar<span>.ai</span></span></Link><button type="button" className="mobile-search-trigger" onClick={() => setSearchOpen(true)} aria-label="Buka pencarian"><Search size={18} /></button><Link href="/progress" className="mobile-progress">{streak}<Flame size={15} fill="currentColor" /></Link></header>
        <main><PageAtmosphereCanvas path={location} />{children}<NpcPetPopup /></main>
      </div>
    </div>
  );
}
