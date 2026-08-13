// Style reminder: Paper Playground — the study-file drawer feels like a labeled folder on a learner's desk: private, tidy, and uncomplicated.

import { Download, FileImage, FileText, FolderUp, Loader2, LogIn, Trash2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

const MAX_BYTES = 5 * 1024 * 1024;
const allowedTypes = ["application/pdf", "text/plain", "image/png", "image/jpeg", "image/webp"];
const purposeLabel = { "study-note": "Catatan belajar", reference: "Referensi", other: "Lainnya" } as const;

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileIcon(type: string) {
  return type.startsWith("image/") ? <FileImage size={22} /> : <FileText size={22} />;
}

export default function StudyFiles() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [purpose, setPurpose] = useState<keyof typeof purposeLabel>("reference");
  const { isAuthenticated, loading, user } = useAuth();
  const utils = trpc.useUtils();
  const filesQuery = trpc.files.list.useQuery(undefined, { enabled: isAuthenticated });
  const upload = trpc.files.upload.useMutation({
    onSuccess: async () => { await Promise.all([utils.files.list.invalidate(), utils.files.quota.invalidate()]); toast("File tersimpan di laci belajarmu."); },
    onError: (error) => toast.error(error.message),
  });
  const remove = trpc.files.remove.useMutation({
    onSuccess: async () => { await Promise.all([utils.files.list.invalidate(), utils.files.quota.invalidate()]); toast("File dihapus dari daftar belajarmu."); },
    onError: (error) => toast.error(error.message),
  });

  const onSelectFile = async (file: File | undefined) => {
    if (!file) return;
    if (!allowedTypes.includes(file.type)) { toast.error("Gunakan PDF, TXT, PNG, JPG, atau WEBP."); return; }
    if (file.size > MAX_BYTES) { toast.error("Ukuran file maksimal 5 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      upload.mutate({ originalName: file.name, mimeType: file.type, base64, purpose });
    };
    reader.onerror = () => toast.error("File tidak bisa dibaca. Coba pilih ulang.");
    reader.readAsDataURL(file);
  };

  if (loading) return <div className="page"><div className="page-wrap files-loading"><Loader2 className="spin" size={25} /> Menyiapkan laci belajar...</div></div>;

  if (!isAuthenticated) return <div className="page"><div className="page-wrap files-auth-gate"><div className="files-gate-sticker"><FolderUp size={30} /><span>PRIVATE<br />DRAWER</span></div><span className="eyebrow">STUDY FILES · AKUN PRIBADI</span><h1>Masuk untuk menyimpan<br /><em>catatan belajarmu.</em></h1><p>Gunakan laci pribadi untuk menyimpan PDF, teks, atau gambar referensi hingga 5 MB. File dan metadata hanya muncul di akun pemiliknya.</p><button type="button" className="brutal-button button-pink" onClick={() => startLogin()}><LogIn size={17} /> Masuk untuk buka laci</button></div></div>;

  return <div className="page"><div className="page-wrap files-page"><div className="page-heading"><div><span className="eyebrow">STUDY FILES · LACI PRIBADI</span><h1>Bahan belajar,<br /><em>satu tempat rapi.</em></h1></div><div className="files-user-note"><span>AKUN AKTIF</span><strong>{user?.name ?? "Pembelajar"}</strong><small>file tersimpan otomatis</small></div></div>
    <section className="files-upload-panel"><div><span className="eyebrow">TAMBAH BAHAN</span><h2>Simpan referensi untuk dibaca lagi nanti.</h2><p>Didukung: PDF, TXT, PNG, JPG, atau WEBP. Maksimum 5 MB per file.</p></div><div className="files-upload-actions"><select value={purpose} onChange={(event) => setPurpose(event.target.value as keyof typeof purposeLabel)} aria-label="Tujuan file"><option value="reference">Referensi</option><option value="study-note">Catatan belajar</option><option value="other">Lainnya</option></select><input ref={inputRef} className="file-input-hidden" type="file" accept=".pdf,.txt,image/png,image/jpeg,image/webp" onChange={(event) => { onSelectFile(event.target.files?.[0]); event.currentTarget.value = ""; }} /><button type="button" className="brutal-button button-black" disabled={upload.isPending} onClick={() => inputRef.current?.click()}>{upload.isPending ? <Loader2 className="spin" size={17} /> : <UploadCloud size={17} />}{upload.isPending ? "Mengunggah..." : "Pilih file"}</button></div></section>
    <section className="files-list-section"><div className="files-list-heading"><div><span className="section-index">LACI KAMU</span><h2>{filesQuery.data?.length ?? 0} file tersimpan</h2></div><span>Hapus menghilangkan file dari daftar akun ini.</span></div>{filesQuery.isLoading ? <div className="files-empty"><Loader2 className="spin" size={23} /><p>Memuat laci belajar...</p></div> : filesQuery.error ? <div className="files-empty"><span>⊙</span><p>{filesQuery.error.message}</p></div> : filesQuery.data?.length ? <div className="files-list">{filesQuery.data.map((file) => <article className="study-file-card" key={file.id}><div className="study-file-icon">{fileIcon(file.mimeType)}</div><div className="study-file-copy"><div><span className="file-purpose">{purposeLabel[file.purpose]}</span><span className="file-date">{new Date(file.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span></div><h3>{file.originalName}</h3><p>{formatBytes(file.sizeBytes)} · {file.mimeType.replace("application/", "")}</p></div><div className="study-file-actions"><a href={file.url} target="_blank" rel="noreferrer" className="file-open"><Download size={15} /> Buka</a><button type="button" onClick={() => { if (window.confirm(`Hapus ${file.originalName} dari daftar file?`)) remove.mutate({ id: file.id }); }} disabled={remove.isPending} aria-label={`Hapus ${file.originalName}`}><Trash2 size={16} /></button></div></article>)}</div> : <div className="files-empty"><span>✦</span><h2>Lacimu masih kosong.</h2><p>Simpan satu catatan atau referensi dari materi yang sedang kamu pelajari.</p></div>}</section>
  </div></div>;
}
