# QA Bahasa Santai untuk Seluruh Materi

## Cara cakupan dijaga

Seluruh katalog melewati satu lapisan `applyCasualIndonesianTone` setelah semua generator selesai membuat materi. Karena registry akhir mencakup AI Engineering, lima course intensif, serta Cyber Security, **1.092 materi** menerima gaya pembuka, analogi, section, lecture, konteks buku, studi kasus, deep dive, dan kuis yang konsisten.

| Blok yang dirender | Gaya baru | Yang tetap dijaga |
| --- | --- | --- |
| Ringkasan & analogi | “Santai dulu…” dan “Biar kebayang…” mengajak pembaca masuk lewat konteks. | Judul, konsep, urutan, dan durasi materi. |
| Isi subbab | Pembuka percakapan, padanan seperti “nggak”, “pakai”, dan “biar”, serta judul section yang lebih natural. | Detail teknis, latihan, dan sumber. |
| Prolog & lecture | Pembuka “Sebelum gas…” yang ditulis dari generator per domain: peta konteks Cloud/Data/Product/Automation/Creative, keputusan AI Engineering, serta scope defensif Cyber. | Alur fondasi menuju course inti. |
| Studi kasus, deep dive, dan kuis | “Biar kebayang…”, “Intinya gini…”, serta “Coba cek pemahamanmu…”. | Fakta kasus, artefak, jawaban, dan rubric. |
| Cyber Security | Slang dipakai untuk mengurangi jarak bahasa, bukan untuk membuat praktik terasa sembrono. Section terakhir menambahkan batas eksplisit: lab/data fiktif/aset sendiri atau izin tertulis; bila scope belum jelas, berhenti dan tanya owner. | Izin, scope, lab berizin, data fiktif, privacy, dan larangan aksi pada pihak lain. |
| Creative AI | Bahasa tetap santai saat membahas karya dan aset, tetapi tidak berubah menjadi janji atau nasihat hukum. Pada Bab Rights dan Provenance, section terakhir menegaskan bahwa konten online belum tentu bebas dipakai; pengguna perlu mengecek lisensi, consent, atribusi, provenance, serta menahan publikasi bila ragu. | Hak, lisensi, atribusi, consent, likeness, provenance, dan escalation review. |

## Pembuktian otomatis

Test `learningTone.test.ts` membandingkan registry mentah dengan materi yang dirender: jumlah materi, resource URL, jumlah section, pilihan kuis, dan panjang latihan tetap terjaga pada setiap track. Regresi representatif membandingkan isi latihan serta batas akhir pada AI Engineering, Cloud, Cyber, Creative Rights/Consent, dan Creative Provenance dengan rasio istilah penting minimal 80%. Regresi cakupan penuh juga memetakan section latihan dan guardrail pada seluruh **1.092 materi**: 1.092 latihan tetap ada, 1.080 guardrail eksplisit tetap ada, dan 12 Cyber Prolog memverifikasi contoh aman/scope/izin sebagai pagar pembukanya. Test khusus Creative menjalankan dua materi sensitif terpisah—Bab Rights/Consent dan Bab Provenance—dan memastikan masing-masing tetap memuat non-legal-advice, lisensi, consent, atribusi/provenance, serta instruksi menahan publikasi bila ragu. `pnpm check && pnpm test` lulus dengan **43 file test / 128 test**.

## Pemeriksaan pembaca

Desktop dan Android diuji pada AI Engineering, Cloud Prolog, Creative Bab Rights/Consent, Cyber Prolog, dan Cyber Bab 1. Ringkasan, lecture, dan konten pembuka tampil santai serta tetap terbaca pada kolom pembaca. Screenshot halaman penuh Android Creative 9.1 dan Cyber 1.1 memperlihatkan card batas eksplisit tetap muncul setelah prose, latihan, sumber, kuis, dan evidence—tidak tersembunyi oleh gaya bahasa santai.
