# Blueprint Cyber Security Intensif — 240 Subbab

## Prinsip desain

Jalur ini mengganti versi 31 subbab yang terlalu ringkas. Setiap bab berisi **12 subbab**, sehingga totalnya **240 subbab** dalam 20 checkpoint. Materi mengikuti urutan nyata dari dua video utama dan seluruh rumpun playlist The Cyber Mentor, tetapi topik yang di sumber berbentuk eksploitasi, credential attack, wireless capture, payload, atau privilege escalation akan dipelajari sebagai pola risiko, bukti deteksi, hardening, dan latihan dalam aset fiktif atau lab sendiri. Tidak ada subbab yang memberikan prosedur penyalahgunaan terhadap sistem nyata.

| Bagian | Bab | Subbab | Sumber dominan |
|---|---:|---:|---|
| Fondasi dan lingkungan | 1–5 | 60 | CS50, Hands-On, Ethical Hacking Part 1, Linux/Kali |
| Aset, jaringan, dan aplikasi | 6–10 | 60 | Ethical Hacking Part 1–2, Web App Security, OSINT |
| Identitas, endpoint, dan engineering | 11–14 | 48 | Linux/Windows, Active Directory, Python, Rust, Help Desk |
| Detection dan operasi keamanan | 15–17 | 36 | SOC 101, PowerShell, Bug Bounty |
| AI, IoT, dan capstone | 18–20 | 36 | Learn AI Fundamentals, IoT, seluruh sumber |
| **Total** | **20** | **240** | **2 video utama + seluruh 21 video playlist** |

## Bab 1 — Kontrak Belajar, Etika, dan Cara Berpikir Risiko

1.1 Tujuan pembela vs rasa penasaran tanpa scope; 1.2 Izin tertulis dan batas aset; 1.3 Data fiktif, snapshot, dan rollback; 1.4 Dampak pada orang, layanan, dan reputasi; 1.5 CIA sebagai bahasa awal; 1.6 Threat model satu halaman; 1.7 Aset, actor, dan jalur dampak; 1.8 Kontrol preventif, detektif, korektif; 1.9 Risiko, likelihood, dan prioritas; 1.10 Evidence minimum; 1.11 Catatan yang bisa diaudit; 1.12 Refleksi keputusan aman pertama.

**Sumber:** CS50, Ethical Hacking Part 1, Ethical Hacking 12 Hours, Hands-On.

## Bab 2 — Peta Profesi, Catatan, dan Metodologi Kerja

2.1 Hari kerja keamanan yang realistis; 2.2 Peran blue team, appsec, dan pentest berizin; 2.3 Mengubah pertanyaan kabur menjadi scope; 2.4 Struktur notebook investigasi; 2.5 Timebox dan decision log; 2.6 Menulis asumsi; 2.7 Membedakan observasi dan inferensi; 2.8 Membuat bukti yang bisa diulang; 2.9 Prioritas berdasarkan dampak; 2.10 Handoff antartim; 2.11 Bahasa laporan tanpa drama; 2.12 Retrospektif tanpa menyalahkan.

**Sumber:** Ethical Hacking Part 1–2, SOC 101, Practical Help Desk, Soft Skills.

## Bab 3 — Jaringan dari Paket ke Keputusan

3.1 Model mental paket; 3.2 IPv4 dan alamat privat; 3.3 Gateway dan segmentasi; 3.4 MAC sebagai konteks lokal; 3.5 DNS dan nama layanan; 3.6 TCP sebagai percakapan; 3.7 UDP dan trade-off; 3.8 Port sebagai kontrak layanan; 3.9 HTTPS dan boundary trust; 3.10 OSI untuk diagnosis; 3.11 Subnet sebagai kontrol blast radius; 3.12 Diagram jalur aplikasi sendiri.

**Sumber:** Ethical Hacking Part 1, Hands-On, SOC 101.

## Bab 4 — Lab Linux/Kali yang Bersih dan Terpulihkan

4.1 Host vs VM; 4.2 Memilih hypervisor; 4.3 Snapshot sebelum eksperimen; 4.4 Isolasi jaringan lab; 4.5 Instalasi sebagai supply-chain decision; 4.6 Update dan catatan versi; 4.7 Orientasi Kali tanpa fetish tool; 4.8 Terminal sebagai alat observasi; 4.9 Struktur filesystem; 4.10 Service lifecycle; 4.11 Paket dan provenance; 4.12 Reset lab dan review bukti.

**Sumber:** Ethical Hacking Part 1, Hands-On, Linux for Ethical Hackers.

## Bab 5 — Linux Praktis untuk Administrasi Aman

5.1 ls sebagai pembacaan inventory; 5.2 cd dan konteks lokasi; 5.3 file dan metadata; 5.4 nano serta perubahan terkontrol; 5.5 cat untuk membaca, bukan membocorkan; 5.6 directory sebagai boundary; 5.7 grep untuk pencarian bukti; 5.8 wc untuk baseline; 5.9 redirection dan risiko log; 5.10 pipe sebagai alur review; 5.11 copy, remove, dan rollback; 5.12 checklist perubahan aman.

**Sumber:** Hands-On, Linux for Ethical Hackers, Practical Help Desk.

## Bab 6 — Akun, Hak Akses, dan Hygiene Endpoint

6.1 Jenis user; 6.2 Root sebagai tanggung jawab; 6.3 sudo dan audit trail; 6.4 Password unik; 6.5 MFA dan fatigue; 6.6 Recovery tanpa kebocoran; 6.7 Sesi dan perangkat tepercaya; 6.8 Joiner–mover–leaver; 6.9 Least privilege; 6.10 Permission review; 6.11 Offboarding; 6.12 Audit akun triwulanan.

**Sumber:** CS50, Hands-On, Linux/Windows Privilege, Active Directory, Help Desk.

## Bab 7 — Observabilitas Jaringan dan Inventaris Aset

7.1 Mengapa inventory mendahului pemindaian; 7.2 Pemilik aset; 7.3 Port sebagai paparan layanan; 7.4 Baseline layanan lab; 7.5 Membaca hasil inventory; 7.6 Nmap sebagai konsep pemetaan aset berizin; 7.7 False positive dan false negative; 7.8 Layanan HTTP; 7.9 Layanan SMB; 7.10 Layanan SSH; 7.11 Exposure review; 7.12 Rencana pengurangan attack surface.

**Sumber:** Hands-On, Ethical Hacking Part 1–2, SOC 101.

## Bab 8 — Wi-Fi dan Traffic sebagai Permukaan Keamanan

8.1 SSID bukan identitas; 8.2 Router sebagai aset; 8.3 Band 2.4 vs 5 GHz; 8.4 Mode jaringan sebagai konsep; 8.5 Handshake sebagai proses protokol; 8.6 Risiko password default; 8.7 Segmentasi tamu; 8.8 Update firmware; 8.9 WPA dan keputusan konfigurasi; 8.10 Indikator gangguan koneksi; 8.11 Membaca PCAP latihan; 8.12 Runbook anomali Wi-Fi.

**Sumber:** Hands-On, Ethical Hacking 12 Hours, IoT & Hardware.

## Bab 9 — Web: Input, Session, dan Otorisasi

9.1 Request dan response; 9.2 Input tidak tepercaya; 9.3 Validasi format; 9.4 Validasi konteks; 9.5 Encoding output; 9.6 Authentication; 9.7 Authorization; 9.8 Session lifecycle; 9.9 Cookie boundary; 9.10 Error tanpa kebocoran; 9.11 Rate limit sebagai kontrol; 9.12 Uji desain pada aplikasi sendiri.

**Sumber:** Hacking Web Applications, Beginner Web Application Hacking, CS50.

## Bab 10 — Asset Discovery dan OSINT yang Beretika

10.1 Tujuan discovery defensif; 10.2 Domain dan subdomain; 10.3 Ownership dan approval; 10.4 Identifikasi teknologi untuk patching; 10.5 Public exposure review; 10.6 Mesin pencari sebagai sumber primer; 10.7 Social media tanpa doxxing; 10.8 Membedakan klaim dan bukti; 10.9 Tanggal, provenance, dan konteks; 10.10 Secret exposure response; 10.11 Disclosure channel; 10.12 Laporan exposure minimal.

**Sumber:** Ethical Hacking Part 2, OSINT, Practical Bug Bounty.

## Bab 11 — Vulnerability Management Tanpa Sensasionalisme

11.1 CVE sebagai bahasa bersama; 11.2 Aset sebelum severity; 11.3 Dampak vs skor; 11.4 Scanner sebagai sinyal; 11.5 Validasi tanpa menyentuh data; 11.6 False positive; 11.7 Evidence minimum; 11.8 Patch window; 11.9 Compensating control; 11.10 Exception berumur; 11.11 Retest dan closure; 11.12 Dashboard risiko yang jujur.

**Sumber:** Ethical Hacking Part 2, Hands-On, SOC 101, Practical Bug Bounty.

## Bab 12 — Konfigurasi Sistem dan Identity Organisasi

12.1 Configuration drift; 12.2 Baseline hardening; 12.3 Permission di Linux; 12.4 Permission di Windows; 12.5 Service account; 12.6 Local admin; 12.7 Active Directory sebagai trust graph; 12.8 Group membership; 12.9 GPO sebagai kebijakan; 12.10 Endpoint onboarding; 12.11 Change approval; 12.12 Audit akses berbasis risiko.

**Sumber:** Linux Privilege, Windows Privilege, Active Directory, PowerShell, Help Desk.

## Bab 13 — Rahasia, Dependency, dan Supply Chain

13.1 Apa yang disebut secret; 13.2 Scope key; 13.3 Secret storage; 13.4 Rotasi; 13.5 Revocation; 13.6 Log redaction; 13.7 Dependency inventory; 13.8 Versi dan patch; 13.9 Provenance package; 13.10 Staging update; 13.11 Rollback; 13.12 Postmortem secret leak.

**Sumber:** CS50, Hacking Web Applications, Rust Programming, Python, Ethical Hacking Part 2.

## Bab 14 — Python, PowerShell, dan Automasi Read-Only

14.1 Data fiktif dulu; 14.2 String dan normalisasi; 14.3 Variable sebagai kontrak; 14.4 Function kecil; 14.5 Boolean dan guard; 14.6 List dan batch review; 14.7 Dictionary sebagai event; 14.8 File I/O aman; 14.9 Import dan dependency; 14.10 Socket sebagai konsep observasi; 14.11 PowerShell untuk inventaris; 14.12 Automasi yang bisa diaudit.

**Sumber:** Ethical Hacking Part 1, Python for Beginners, Intro to PowerShell, SOC 101.

## Bab 15 — Kode Aman dan Kesadaran Memori

15.1 Boundary input; 15.2 Panjang dan tipe; 15.3 Error handling; 15.4 Unsafe pattern review; 15.5 Memory safety sebagai desain; 15.6 Fuzzing sebagai konsep quality assurance; 15.7 Crash evidence; 15.8 Patch priority; 15.9 Rust ownership sebagai konteks; 15.10 Dependency isolation; 15.11 Regression test; 15.12 Secure code review memo.

**Sumber:** Buffer Overflows Made Easy, Rust Programming 101, Ethical Hacking Part 2.

## Bab 16 — Logs, Telemetry, dan SOC Triage

16.1 Event vs log; 16.2 Authentication telemetry; 16.3 Endpoint telemetry; 16.4 Network telemetry; 16.5 Data minimization; 16.6 Alert threshold; 16.7 Severity; 16.8 Triage question; 16.9 Timeline; 16.10 Escalation; 16.11 Ticket hygiene; 16.12 False positive learning loop.

**Sumber:** Security Operations (SOC) 101, Practical Help Desk, PowerShell.

## Bab 17 — Incident Response dan Responsible Disclosure

17.1 Trigger insiden; 17.2 Containment tanpa panik; 17.3 Preservasi bukti; 17.4 Komunikasi internal; 17.5 Owner keputusan; 17.6 Secret exposure response; 17.7 Account compromise response; 17.8 Malware suspicion response; 17.9 Pelaporan kerentanan; 17.10 Safe harbor; 17.11 Remediasi dan retest; 17.12 Postmortem tanpa kambing hitam.

**Sumber:** SOC 101, Practical Bug Bounty, Ethical Hacking Part 2, CS50.

## Bab 18 — AI, Agent, dan Input yang Tidak Tepercaya

18.1 Model bukan policy engine; 18.2 Data classification; 18.3 Prompt sebagai input; 18.4 Prompt injection sebagai boundary failure; 18.5 Tool permission; 18.6 Human approval; 18.7 Retrieval trust; 18.8 Output validation; 18.9 Auditability; 18.10 Cost and rate limits; 18.11 Agent kill switch; 18.12 Evaluasi abuse case.

**Sumber:** Learn AI Fundamentals, CS50, Hacking Web Applications.

## Bab 19 — IoT, Perangkat Kecil, dan Aset Fisik

19.1 Inventory perangkat; 19.2 Owner dan lifecycle; 19.3 Default credential risk; 19.4 Firmware; 19.5 Segmentasi; 19.6 Remote administration; 19.7 Physical access; 19.8 Telemetry perangkat; 19.9 Consumer vs enterprise IoT; 19.10 Disposal; 19.11 Vendor risk; 19.12 Household/office hardening plan.

**Sumber:** IoT & Hardware Hacking, Practical Help Desk, Hands-On.

## Bab 20 — Capstone: Rencana Security yang Bisa Dipertanggungjawabkan

20.1 Memilih aset berizin; 20.2 Inventaris dan owner; 20.3 Threat model; 20.4 Access review; 20.5 Exposure review; 20.6 Logging plan; 20.7 Vulnerability backlog; 20.8 Incident runbook; 20.9 Secret and dependency plan; 20.10 AI/IoT scope bila relevan; 20.11 Executive-friendly report; 20.12 Roadmap 30–60–90 hari.

**Sumber:** Seluruh sumber pengguna, terutama CS50, Ethical Hacking Part 1–2, SOC 101, Practical Bug Bounty, Soft Skills.

## Kriteria setiap subbab di aplikasi

Setiap subbab perlu memiliki pembukaan konsep yang spesifik, mekanisme atau keputusan teknis yang dibedah, satu skenario realistis, latihan yang hanya memakai aset sendiri atau data fiktif, pagar legal, pertanyaan cek pemahaman, serta satu atau lebih tautan sumber asli. Dengan pola ini, jumlah besar tidak menjadi daftar judul kosong atau pengulangan generik.
