# Blueprint Penjurusan belajar.ai

Kurikulum diperluas dari **39** materi inti AI menjadi **87** materi dengan tambahan enam jalur spesialisasi. Jalur baru dimulai dari praktik yang dapat diverifikasi, lalu secara bertahap menuju sistem, evaluasi, dan proyek mini. Setiap jalur memakai kertas putih dan tinta hitam sebagai dasar keterbacaan, dengan satu warna aksen berkontras tinggi.

| Jalur | Prasyarat ringkas | Identitas visual | Hasil akhir |
|---|---|---|---|
| Cloud & DevOps untuk AI | Dasar AI; Linux/terminal dasar membantu | Biru `#2F78FF`, putih, hitam | Deploy layanan AI yang punya CI/CD, observability, dan batas biaya. |
| Data Analyst & Data Engineering | Spreadsheet dasar | Kuning `#FFD447`, putih, hitam | Mengubah data mentah menjadi insight serta pipeline kecil yang dapat dipantau. |
| AI Product Builder | Dasar AI dan Prompt Engineering | Ungu `#A684FF`, putih, hitam | Menulis brief, alur pengguna, metrik, dan rencana evaluasi produk AI. |
| Automation Specialist | Browser, spreadsheet, dan prompt dasar | Hijau `#43D17D`, putih, hitam | Membuat workflow trigger–action dengan human review dan penanganan error. |
| AI Security & Safety | Tidak ada; direkomendasikan untuk semua | Oranye `#FF914D`, putih, hitam | Mengenali risiko akun, data, LLM, dan agent serta menerapkan kontrol dasar. |
| Creative AI & Content Systems | Tidak ada | Magenta `#F85DA6`, putih, hitam | Membuat sistem konten yang transparan, konsisten, dan menghormati hak kreator. |

## Cloud & DevOps untuk AI

| ID | Pelajaran | Fokus praktik |
|---:|---|---|
| 40 | Peta Cloud: Dari Laptop ke Layanan AI | Memetakan request, aplikasi, data, dan pengguna. |
| 41 | Linux & Terminal untuk Builder AI | Menavigasi file, proses, environment, dan log dengan aman. |
| 42 | Docker: Mengemas Aplikasi agar Konsisten | Memahami image, container, volume, dan `.env`. |
| 43 | Reverse Proxy, Domain, dan HTTPS | Membaca jalur trafik dan menghindari rahasia di browser. |
| 44 | CI/CD: Menguji Sebelum Merilis | Menyusun mental model trigger, test, build, dan deploy. |
| 45 | Observability: Log, Metrik, dan Alert | Memilih sinyal layanan yang benar-benar berguna. |
| 46 | Arsitektur Cloud & Batas Biaya | Menilai trade-off reliabilitas, skalabilitas, dan biaya. |
| 47 | Proyek Mini: Runbook Deploy Agent yang Aman | Menulis langkah rilis, rollback, pemantauan, dan ownership. |

## Data Analyst & Data Engineering

| ID | Pelajaran | Fokus praktik |
|---:|---|---|
| 48 | Pertanyaan Data yang Benar | Mengubah pertanyaan kabur menjadi metrik dan keputusan. |
| 49 | Membaca Tabel tanpa Tertipu Angka | Mengecek pembanding, periode, denominator, dan konteks. |
| 50 | Spreadsheet untuk Data Bersih | Menstandarkan kolom, mendeteksi duplikasi, dan memberi dokumentasi. |
| 51 | SQL: Bertanya ke Database dengan Tertib | Memahami filter, agregasi, join, dan validasi hasil. |
| 52 | Statistik Ringkas untuk Keputusan | Memilih rata-rata, median, persentase, dan sebaran yang tepat. |
| 53 | Dashboard yang Bercerita | Memilih grafik, anotasi, dan ukuran keberhasilan. |
| 54 | ETL & Orkestrasi Data | Memahami extract, transform, load, jadwal, dan failure handling. |
| 55 | Proyek Mini: Dashboard Belajar yang Bisa Dipercaya | Membuat metrik, cek kualitas, dan insight terukur. |

## AI Product Builder

| ID | Pelajaran | Fokus praktik |
|---:|---|---|
| 56 | Memilih Masalah yang Layak Dibantu AI | Memisahkan masalah AI dari aturan atau UX biasa. |
| 57 | Riset Pengguna & Problem Statement | Menyusun pengguna, konteks, pain point, dan bukti. |
| 58 | User Flow untuk Fitur AI | Mendesain input, review, fallback, dan tindakan berikutnya. |
| 59 | PRD AI: Batasan, Data, dan Acceptance Criteria | Mengubah ide menjadi kontrak kerja yang dapat diuji. |
| 60 | Metrik Produk AI: Benar Saja Tidak Cukup | Menggabungkan kualitas, biaya, waktu, dan trust pengguna. |
| 61 | Human-in-the-Loop & UX Kepercayaan | Memberi kontrol, penjelasan, dan jalur koreksi. |
| 62 | Evaluasi dan Iterasi Fitur AI | Menyusun dataset uji, rubrik, feedback, dan keputusan rilis. |
| 63 | Proyek Mini: Product Brief AI yang Siap Dibangun | Menghasilkan artefak PRD, risiko, metrik, dan eksperimen pertama. |

## Automation Specialist

| ID | Pelajaran | Fokus praktik |
|---:|---|---|
| 64 | Memilih Tugas yang Layak Diotomasi | Menilai frekuensi, aturan, risiko, dan nilai waktu. |
| 65 | Trigger, Action, dan Data Mapping | Memetakan kapan alur dimulai dan data apa yang berpindah. |
| 66 | API, Webhook, dan Credential dengan Aman | Membedakan koneksi, event, otorisasi, dan secret. |
| 67 | Kondisi, Cabang, dan Error Handling | Mendesain jalur normal, jalur gagal, dan notifikasi. |
| 68 | Human Review: Titik Berhenti yang Sehat | Menentukan aksi yang harus mendapat persetujuan. |
| 69 | Dokumentasi & Observability Workflow | Membaca execution log dan membuat SOP singkat. |
| 70 | Agentic Automation tanpa Kehilangan Kontrol | Memberi batas tool, budget, dan verifikasi output. |
| 71 | Proyek Mini: Asisten Ringkasan Meeting | Mengubah transkrip menjadi draf yang tetap direview manusia. |

## AI Security & Safety

| ID | Pelajaran | Fokus praktik |
|---:|---|---|
| 72 | Peta Ancaman Digital untuk Builder AI | Mengenali aset, aktor, dampak, dan kontrol awal. |
| 73 | Password, MFA, dan Manajemen Sesi | Melindungi akun, perangkat, dan sesi belajar. |
| 74 | API Key & Secret Hygiene | Menyimpan, merotasi, membatasi, dan tidak membocorkan rahasia. |
| 75 | Data Sensitif dan Batas Prompt | Menentukan informasi yang tidak boleh diunggah atau dibagikan. |
| 76 | Prompt Injection & Output yang Tidak Tepercaya | Memahami input tak tepercaya dan validasi sebelum aksi. |
| 77 | Hak Akses, Least Privilege, dan Audit | Mendesain izin minimum serta jejak perubahan. |
| 78 | Risiko Agent: Excessive Agency & Tool Safety | Menetapkan approval, scope, budget, dan kill switch. |
| 79 | Proyek Mini: Security Checklist untuk Fitur AI | Membuat threat sketch dan daftar kontrol yang bisa diuji. |

## Creative AI & Content Systems

| ID | Pelajaran | Fokus praktik |
|---:|---|---|
| 80 | Sistem Konten: Tujuan, Audiens, dan Batas Brand | Membuat brief yang menjaga arah kreatif. |
| 81 | Prompt Kreatif yang Bisa Diiterasi | Menyusun subject, style, composition, constraint, dan versi. |
| 82 | Editorial Workflow: Ide ke Draft | Memisahkan riset, outline, draft, edit, dan fact-check. |
| 83 | Visual Direction & Brief yang Jelas | Mengubah rasa visual menjadi arahan yang dapat dicek. |
| 84 | Audio dan Video: Storyboard sebelum Generate | Merancang beat, scene, voice, dan review checkpoint. |
| 85 | Hak Cipta, Likeness, dan Izin | Menghindari klaim, materi, serta identitas yang tidak berizin. |
| 86 | Provenance & Content Credentials | Menjaga transparansi tentang asal, perubahan, dan penggunaan AI. |
| 87 | Proyek Mini: Paket Konten Transparan | Menyusun brief, aset, caption, disclosure, dan checklist publikasi. |

## Rujukan Utama

| Area | Rujukan |
|---|---|
| Cloud, CI/CD, observability | AWS Well-Architected, GitHub Actions, Prometheus, Apache Airflow. |
| Product dan safety | NIST AI RMF, Google PAIR Guidebook, OWASP GenAI LLM Top 10. |
| Automation | n8n workflow documentation, Zapier workflow guide, Make platform documentation. |
| Creative AI | Adobe Content Credentials, WIPO AI & IP, U.S. Copyright Office AI resources. |
