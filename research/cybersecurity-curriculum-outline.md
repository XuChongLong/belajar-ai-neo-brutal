# Rancangan Kurikulum Cyber Security Intensif — 20 Bab, 240 Subbab

## Tujuan pembelajaran

Kurikulum ini kini terdiri dari **20 checkpoint dan 240 subbab**, menggantikan desain lama 31 subbab. Jalurnya memecah fondasi, administrasi Linux, jaringan, aplikasi web, asset discovery, vulnerability management, identity, automasi, coding aman, SOC, respons insiden, AI, IoT, dan capstone menjadi langkah kecil yang bisa dinilai. Setiap materi memakai sumber video pengguna sebagai pijakan, namun topik yang di sumber mencakup eksploitasi, brute force, payload, capture Wi-Fi, atau privilege escalation diterjemahkan menjadi mekanisme risiko, bukti deteksi, hardening, scope, dan respons defensif pada lab sendiri.

| Checkpoint | Bab | Cakupan subbab | Fokus hasil belajar |
|---:|---|---:|---|
| 01 | Kontrak belajar, etika, dan risiko | 1.1–1.12 | Scope, aset, dampak, kontrol, dan evidence. |
| 02 | Peta profesi, catatan, dan metodologi | 2.1–2.12 | Dokumentasi, asumsi, handoff, dan bahasa laporan. |
| 03 | Jaringan dari paket ke keputusan | 3.1–3.12 | IP, DNS, port, protokol, segmentasi, dan diagnosis. |
| 04 | Lab Linux/Kali yang terpulihkan | 4.1–4.12 | VM, snapshot, isolasi, update, service, dan rollback. |
| 05 | Linux praktis untuk administrasi aman | 5.1–5.12 | Filesystem, pencarian bukti, perubahan, dan rollback. |
| 06 | Akun, akses, dan hygiene endpoint | 6.1–6.12 | MFA, session, lifecycle akun, privilege, dan review. |
| 07 | Observabilitas jaringan dan aset | 7.1–7.12 | Inventory, layanan, baseline, exposure, dan owner. |
| 08 | Wi-Fi dan traffic sebagai permukaan | 8.1–8.12 | Router, firmware, segmentasi, PCAP lab, dan runbook. |
| 09 | Web: input, session, dan otorisasi | 9.1–9.12 | Validasi, boundary, auth, authz, dan rate limit. |
| 10 | Asset discovery dan OSINT beretika | 10.1–10.12 | Discovery defensif, verifikasi, privacy, dan disclosure. |
| 11 | Vulnerability management | 11.1–11.12 | CVE, signal, priority, patch, exception, dan retest. |
| 12 | Konfigurasi dan identity organisasi | 12.1–12.12 | Baseline, AD, groups, service account, dan change control. |
| 13 | Rahasia, dependency, dan supply chain | 13.1–13.12 | Secret lifecycle, provenance, staging, dan rollback. |
| 14 | Python, PowerShell, dan automasi | 14.1–14.12 | Data fiktif, scripts read-only, inventory, dan audit. |
| 15 | Kode aman dan kesadaran memori | 15.1–15.12 | Boundary, error, testing, patching, dan review. |
| 16 | Logs, telemetry, dan SOC triage | 16.1–16.12 | Event, alert, severity, timeline, ticket, dan learning loop. |
| 17 | Incident response dan disclosure | 17.1–17.12 | Containment, bukti, komunikasi, remediation, dan postmortem. |
| 18 | AI, agent, dan input tak tepercaya | 18.1–18.12 | Permission, prompt injection, output validation, dan kill switch. |
| 19 | IoT, perangkat kecil, dan aset fisik | 19.1–19.12 | Inventory, firmware, network, owner, dan disposal. |
| 20 | Capstone: rencana yang bisa dipertanggungjawabkan | 20.1–20.12 | Threat model, backlog, runbook, laporan, dan roadmap 30–60–90. |

## Struktur pengajaran

Setiap subbab memiliki lima lapis baca: **bedah konsep**, **mekanisme dan trade-off**, **skenario tim**, **latihan lab berizin**, serta **batas aman dan pemeriksaan**. Bab pertama dari tiap checkpoint menambahkan pengantar konseptual dan tiga pertanyaan kunci agar pembaca memahami hubungan antara 12 subbab, bukan sekadar mengejar kartu satu per satu.

Blueprint rinci judul seluruh 240 subbab, artefak, dan pemetaan sumber terdapat pada [blueprint intensif](./cybersecurity-intensive-blueprint.md). Dokumen itu menjadi sumber struktur yang menggantikan daftar 31 subbab sebelumnya.

## Peta cakupan sumber

| Sumber | Peran pada kurikulum intensif |
|---|---|
| CS50 Cybersecurity | Dasar risiko, akun, data, sistem, dan decision-making. |
| Hands-On Cybersecurity | Kali/Linux, terminal, jaringan, Wi-Fi sebagai konsep pertahanan, dan Wireshark/PCAP lab. |
| Ethical Hacking 15h Part 1 | Profesi, note-taking, network, virtualisasi, Linux, Python, metodologi, dan passive recon defensif. |
| Ethical Hacking 15h Part 2 | Asset discovery, teknologi web, layanan, research kerentanan, dokumentasi, dan capstone lab. |
| 19 rumpun playlist lainnya | Web security, OSINT, memory safety, Linux/Windows, AD, Bug Bounty, Rust, SOC, PowerShell, AI, Help Desk, IoT, serta soft skills. |

## Sumber primer

[1] [CS50's Introduction to Cybersecurity — kursus penuh](https://youtu.be/9HOpanT0GRs)  
[2] [Hands-On Cybersecurity and Ethical Hacking — kursus penuh](https://youtu.be/ug8W0sFiVJo)  
[3] [Full-Length Hacking Courses — The Cyber Mentors, 21 video](https://youtube.com/playlist?list=PLLKT__MCUeixqHJ1TRqrHsEd6_EdEvo47)  
[4] [CS50 Cybersecurity — silabus resmi](https://cs50.harvard.edu/cybersecurity/)  
[5] [Harvard CS50 Cybersecurity — ringkasan topik](https://pll.harvard.edu/course/cs50s-introduction-cybersecurity)
