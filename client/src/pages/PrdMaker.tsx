import JSZip from "jszip";
import { Download, FileCode2, KeyRound, Loader2, LockKeyhole, Play, RefreshCw, Sparkles, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { localSignInPath } from "@/lib/authNavigation";
import { trpc } from "@/lib/trpc";
import { buildProjectBrief, createStarterFiles, starterTemplates, type StarterKind } from "@/lib/prdMakerTemplates";

export default function PrdMaker() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, loading } = useAuth();
  const [kind, setKind] = useState<StarterKind>("web-app");
  const [projectName, setProjectName] = useState("Proyek Baru");
  const [problem, setProblem] = useState(starterTemplates[0].problem);
  const [audience, setAudience] = useState(starterTemplates[0].audience);
  const [stack, setStack] = useState(starterTemplates[0].stack);
  const [baseUrl, setBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState<string[]>([]);
  const [generatedPrd, setGeneratedPrd] = useState("");
  const modelMutation = trpc.prdMaker.models.useMutation({ onSuccess: (found) => { setModels(found); setModel((current) => current || found[0] || ""); toast.success(`${found.length} model tersedia.`); }, onError: (error) => toast.error(error.message) });
  const generationMutation = trpc.prdMaker.generate.useMutation({ onSuccess: (value) => { setGeneratedPrd(value); toast.success("PRD AI siap. Tinjau lalu unduh starter project."); }, onError: (error) => toast.error(error.message) });
  const activeTemplate = starterTemplates.find((template) => template.id === kind) ?? starterTemplates[0];
  const brief = useMemo(() => ({ projectName, problem, audience, stack, kind }), [projectName, problem, audience, stack, kind]);
  const files = useMemo(() => createStarterFiles(brief, generatedPrd), [brief, generatedPrd]);

  const chooseTemplate = (next: typeof starterTemplates[number]) => {
    setKind(next.id); setProblem(next.problem); setAudience(next.audience); setStack(next.stack); setGeneratedPrd("");
  };
  const ensureAuth = () => { if (!isAuthenticated) { setLocation(localSignInPath("/prd-maker")); return false; } return true; };
  const fetchModels = () => { if (!ensureAuth()) return; if (!baseUrl.trim() || !apiKey.trim()) { toast.error("Masukkan Base URL dan API key terlebih dahulu."); return; } modelMutation.mutate({ baseUrl, apiKey }); };
  const generate = () => { if (!ensureAuth()) return; if (!baseUrl.trim() || !apiKey.trim() || !model) { toast.error("Ambil model lalu pilih satu model untuk membuat PRD AI."); return; } generationMutation.mutate({ baseUrl, apiKey, model, projectName, problem, audience, stack }); };
  const downloadZip = async () => {
    const zip = new JSZip(); Object.entries(files).forEach(([path, content]) => zip.file(path, content));
    const blob = await zip.generateAsync({ type: "blob" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${projectName.trim().toLowerCase().replace(/[^a-z0-9]+/gi, "-") || "starter-project"}-starter.zip`; anchor.click(); URL.revokeObjectURL(url); toast.success("Starter project sedang diunduh.");
  };
  const downloadFile = (path: string, content: string) => { const blob = new Blob([content], { type: "text/markdown;charset=utf-8" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = path.replace("/", "-"); anchor.click(); URL.revokeObjectURL(url); };

  return <div className="page"><div className="page-wrap prd-page"><header className="page-heading prd-heading"><div><span className="eyebrow">PRD MAKER · PROJECT STARTER</span><h1>Dari ide mentah<br /><em>ke rencana kerja.</em></h1><p>Susun brief, gunakan AI milikmu secara aman, lalu unduh struktur dokumen yang siap menjadi titik awal project.</p></div><div className="prd-heading-sticker"><WandSparkles size={25} /><strong>8 FILE</strong><span>starter pack</span></div></header>
    <section className="prd-guide"><span className="section-index">MULAI DI SINI</span><ol><li><b>1.</b> Pilih starter dan jelaskan masalah.</li><li><b>2.</b> Opsional: hubungkan endpoint AI milikmu untuk PRD yang lebih spesifik.</li><li><b>3.</b> Tinjau PRD, lalu unduh delapan file starter.</li></ol></section>
    <section className="prd-template-section"><div className="prd-section-head"><div><span className="eyebrow">PILIH TITIK AWAL</span><h2>Template yang sudah jadi.</h2></div><p>Template memberi contoh bentuk hasil. Semua isi tetap dapat kamu ubah sebelum diunduh.</p></div><div className="prd-template-grid">{starterTemplates.map((template) => <button key={template.id} type="button" className={`prd-template-card ${kind === template.id ? "prd-template-active" : ""}`} onClick={() => chooseTemplate(template)}><span>{template.eyebrow}</span><strong>{template.label}</strong><p>{template.description}</p><em>{template.stack}</em></button>)}</div></section>
    <section className="prd-workbench"><div className="prd-brief-panel"><div className="prd-panel-title"><FileCode2 size={22} /><div><span className="eyebrow">BRIEF PROJECT</span><h2>Jelaskan yang ingin dibangun.</h2></div></div><label>Nama project<input value={projectName} onChange={(event) => setProjectName(event.target.value)} maxLength={100} /></label><label>Untuk siapa?<input value={audience} onChange={(event) => setAudience(event.target.value)} maxLength={300} /></label><label>Stack yang diinginkan<input value={stack} onChange={(event) => setStack(event.target.value)} maxLength={300} /></label><label>Masalah dan hasil yang diharapkan<textarea value={problem} onChange={(event) => setProblem(event.target.value)} rows={7} maxLength={12000} /></label><button type="button" className="prd-reset" onClick={() => { const preset = buildProjectBrief(activeTemplate, projectName); setProblem(preset.problem); setAudience(preset.audience); setStack(preset.stack); setGeneratedPrd(""); }}><RefreshCw size={14} /> Kembalikan contoh template</button></div>
      <div className="prd-provider-panel"><div className="prd-panel-title"><KeyRound size={22} /><div><span className="eyebrow">AI OPSIONAL</span><h2>Hubungkan provider milikmu.</h2></div></div><p className="prd-security-note"><LockKeyhole size={16} /> API key hanya dikirim untuk request ini melalui server terproteksi. Key tidak disimpan pada browser, database, atau output project.</p>{!loading && !isAuthenticated && <button type="button" className="brutal-button button-pink" onClick={() => setLocation(localSignInPath("/prd-maker"))}>Masuk untuk memakai AI</button>}<label>Base URL OpenAI-compatible<input value={baseUrl} onChange={(event) => setBaseUrl(event.target.value)} placeholder="https://api.provider.com/v1" inputMode="url" autoComplete="off" /></label><label>API key<input value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder="sk-…" type="password" autoComplete="off" /></label><button type="button" className="brutal-button button-black" disabled={modelMutation.isPending} onClick={fetchModels}>{modelMutation.isPending ? <Loader2 className="spin" size={16} /> : <Play size={16} />} Ambil daftar model</button>{models.length > 0 && <label>Pilih model<select value={model} onChange={(event) => setModel(event.target.value)}>{models.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>}<button type="button" className="brutal-button button-pink prd-generate" disabled={generationMutation.isPending || !model} onClick={generate}>{generationMutation.isPending ? <Loader2 className="spin" size={17} /> : <Sparkles size={17} />} Buat PRD dengan AI</button><small>Endpoint provider harus OpenAI-compatible, HTTPS, dan dapat diakses publik. Endpoint lokal tidak dapat dijangkau dari aplikasi yang terdeploy.</small></div></section>
    <section className="prd-output"><div className="prd-section-head"><div><span className="eyebrow">PROJECT STARTER</span><h2>{generatedPrd ? "PRD AI sudah masuk ke paket." : "Contoh output siap ditinjau."}</h2></div><button type="button" className="brutal-button button-black" onClick={downloadZip}><Download size={16} /> Unduh starter .zip</button></div><div className="prd-file-grid">{Object.entries(files).map(([path, content]) => <article key={path}><span>{path}</span><p>{content.split("\n").slice(0, 4).join(" ").slice(0, 145)}…</p><button type="button" onClick={() => downloadFile(path, content)}>Unduh file ↗</button></article>)}</div></section>
    <section className="prd-next"><span className="section-index">SELANJUTNYA</span><h2>Mulai dari <code>prd.md</code>, lalu jawab asumsi terbuka.</h2><p>Jangan langsung menganggap template sebagai spesifikasi final. Validasi masalah, pilih satu alur paling penting, lalu gunakan <code>todo.md</code> untuk memecah pekerjaan menjadi langkah kecil yang dapat diuji.</p></section>
  </div></div>;
}
