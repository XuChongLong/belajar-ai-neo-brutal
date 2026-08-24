# Rancangan Kurikulum Cyber Security — Belajar Bareng, Bukan Hafalan

## Tujuan pembelajaran

Kurikulum ini terdiri dari **31 subbab** yang dirancang supaya pembelajar bisa memahami keamanan sebagai kebiasaan mengambil keputusan, bukan koleksi nama tool. Jalurnya berangkat dari kebiasaan menjaga akun dan data, bergerak ke cara kerja sistem, lalu masuk ke web, identitas organisasi, monitoring, AI, serta perangkat IoT. Materi ofensif dari sumber video hanya dipakai untuk memahami bagaimana kontrol dapat gagal; semua latihan dibatasi pada akun, perangkat, dan lab yang memang menjadi milik atau telah mendapat izin peserta.

| Bab | Checkpoint | Subbab | Hasil belajar | Sumber utama |
|---|---:|---:|---|---|
| 1. Mulai dengan kepala dingin | 01 | 1.1–1.3 | Menentukan aset, risiko, batas legal, dan lab aman. | CS50; Ethical Hacking 15h Part 1; Hands-On Cybersecurity. |
| 2. Akun dan data pribadi | 02 | 2.1–2.3 | Membangun password unik, MFA, recovery, privasi, dan kebiasaan anti-social engineering. | CS50. |
| 3. Sistem yang tidak bikin kaget | 03 | 3.1–3.3 | Membaca peran OS, jaringan, log, Kali sebagai lab, dan help desk sebagai fondasi operasi. | Kali Linux; Practical Help Desk; Hands-On Cybersecurity. |
| 4. Aplikasi web dan rahasia | 04 | 4.1–4.4 | Memahami batas input, sesi, otorisasi, secret, dan pelaporan kerentanan yang bertanggung jawab. | Web Application Hacking; Beginner Web App Hacking; Bug Bounty. |
| 5. Identitas dan akses organisasi | 05 | 5.1–5.3 | Menerapkan permission, least privilege, audit, dan memahami risiko konfigurasi Windows/Linux/AD. | Linux/Windows Privilege Escalation; Active Directory; PowerShell. |
| 6. OSINT tanpa jadi kepo liar | 06 | 6.1–6.3 | Mengerti jejak digital, verifikasi informasi publik, dan batas etika OSINT. | OSINT 5 Hours. |
| 7. Deteksi dan respons | 07 | 7.1–7.3 | Memilah log, alert, prioritas insiden, serta komunikasi eskalasi. | Security Operations (SOC) 101; Practical Help Desk. |
| 8. Kode dan otomasi yang lebih aman | 08 | 8.1–8.3 | Membaca pola coding aman, mengotomasi analisis log sederhana, dan memahami risiko memori tanpa mempraktikkan eksploit. | Python; Rust; Buffer Overflows. |
| 9. AI dan perangkat yang ikut bicara | 09 | 9.1–9.3 | Memetakan risiko agent/LLM serta kebiasaan aman untuk perangkat IoT dan hardware. | AI Fundamentals; IoT & Hardware Hacking; CS50. |
| 10. Kerja profesional dan capstone | 10 | 10.1–10.3 | Menulis laporan, scope, rekomendasi, dan rencana perbaikan yang bisa dipakai tim. | Ethical Hacking 12h/15h; Soft Skills playlist; Bug Bounty. |

## Gaya penulisan setiap subbab

Setiap subbab akan berisi lima lapis penjelasan. Bagian **“ngobrol dulu”** menjelaskan mengapa konsep itu penting memakai bahasa sehari-hari. Bagian **“coba bayangin”** memakai analogi konkret—misalnya sesi login sebagai kartu akses gedung. Bagian **“cerita tim kecil”** memberi kasus realistis tanpa dramatisasi berlebihan. Bagian **“latihan aman”** meminta peserta memeriksa aset milik sendiri, data fiktif, atau rencana di atas kertas. Terakhir, bagian **“jangan kelewatan”** menerangkan batas legal, privasi, dan kapan harus meminta bantuan.

## Peta cakupan seluruh playlist

| Kelompok sumber playlist | Dipakai pada bab | Cara dipakai dalam materi |
|---|---|---|
| Ethical Hacking 12h, 15h Part 1, dan 15h Part 2 | 1, 3, 10 | Peta profesi, lab legal, metodologi, scope, dan report tanpa panduan menyerang target nyata. |
| Hacking Web Applications dan Beginner Web Application Hacking | 4 | Memahami batas input, autentikasi, otorisasi, validasi, serta perbaikan aplikasi. |
| OSINT 5 Hours dan Practical Bug Bounty | 6, 10 | Etika informasi publik, verifikasi, disclosure, bukti, dan laporan yang dapat ditindaklanjuti. |
| Buffer Overflows, Rust, dan Python | 8 | Konsep keamanan memori, kebiasaan coding aman, serta otomatisasi defensif untuk log/data fiktif. |
| Linux for Ethical Hackers, Linux Privilege Escalation, Windows Privilege Escalation, Active Directory, dan PowerShell | 3, 5, 7 | Permission, konfigurasi, identity, audit trail, dan pemeriksaan baseline sistem. |
| Security Operations (SOC) 101 dan Practical Help Desk | 3, 7, 10 | Triage alert, eskalasi, dokumentasi, komunikasi, dan operasi harian. |
| Learn AI Fundamentals dan IoT & Hardware Hacking | 9 | Risiko AI, batas tool/agent, perangkat terkoneksi, update, dan inventory. |
| Soft Skills for the Job Market: Applying for Jobs dan Standing Out | 10 | Komunikasi temuan, portofolio proyek aman, dan cara menjelaskan keputusan dengan jujur. |

## Sumber primer

[1] [CS50's Introduction to Cybersecurity — kursus penuh](https://youtu.be/9HOpanT0GRs)  
[2] [Hands-On Cybersecurity and Ethical Hacking — kursus penuh](https://youtu.be/ug8W0sFiVJo)  
[3] [Full-Length Hacking Courses — The Cyber Mentors, 21 video](https://youtube.com/playlist?list=PLLKT__MCUeixqHJ1TRqrHsEd6_EdEvo47)  
[4] [CS50 Cybersecurity — silabus resmi](https://cs50.harvard.edu/cybersecurity/)  
[5] [Harvard CS50 Cybersecurity — ringkasan topik](https://pll.harvard.edu/course/cs50s-introduction-cybersecurity)
