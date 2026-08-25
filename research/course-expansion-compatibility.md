# Audit Kompatibilitas Progres — Ekspansi Lima Course

## Temuan

Progres belajar disimpan sebagai daftar **ID materi numerik** pada snapshot akun, termasuk status selesai, bookmark, skor, kuis, aktivitas, dan materi saat ini. Tidak ada foreign key atau tabel materi di database; katalog konten bersifat statis di klien. Karena itu, mengganti atau menghapus ID lama tanpa pemetaan akan meninggalkan progres yang tidak lagi menunjuk materi yang tersedia.

| Course | Rentang ID lama | Jumlah materi lama | Strategi pengganti |
|---|---:|---:|---|
| Cloud Computing AI | 40–47 | 8 | Map satu per satu ke delapan subbab awal checkpoint fondasi cloud yang paling dekat |
| Data Analyst & Data Engineering | 48–55 | 8 | Map ke subbab awal tentang pertanyaan data, tabel, spreadsheet, SQL, statistik, dashboard, pipeline, dan capstone data |
| AI Product Builder | 56–63 | 8 | Map ke subbab awal tentang problem AI, riset, user flow, PRD, metrik, HITL, evaluasi, dan product brief |
| Automation Specialist | 64–71 | 8 | Map ke subbab awal tentang kandidat otomasi, trigger, API, error, approval, observability, agent, dan capstone workflow |
| Creative AI & Content Systems | 80–87 | 8 | Map ke subbab awal yang melanjutkan topik sistem konten, brand, produksi, review, rights, provenance, distribusi, dan capstone |

## Keputusan Implementasi

Setiap materi intensif baru akan mendapatkan ID baru yang tidak bertabrakan. Di sampingnya akan ada registry `legacyMaterialId → newMaterialId` untuk lima jalur ini. Saat snapshot progres dibaca, normalisasi akan mengonversi semua referensi ID lama ke successor yang paling dekat; daftar selesai, bookmark, skor, jawaban kuis, aktivitas, dan `current` akan dipetakan secara deduplikasi. Pemetaan hanya dijalankan untuk ID lama yang tidak lagi berada di katalog agar aman jika state lama dan baru tercampur.

Dengan pendekatan ini, pengguna tidak kehilangan jejak progres ketika konten lama ditransformasikan menjadi course bertingkat. Sebaliknya, materi pengganti dimulai pada checkpoint fondasi, bukan Prolog, karena Prolog adalah konteks baru yang sebaiknya tetap dibaca semua pengguna.
