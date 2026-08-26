# QA Visual — Quiet Editorial Workbook

## Ruang lingkup

Pemeriksaan dilakukan pada beranda, katalog Cloud Computing AI, dan pembaca `Prolog.1` dalam viewport desktop 1280×720 serta Android 390×844.

| Area | Hasil desktop | Hasil Android |
| --- | --- | --- |
| Beranda | Hero berubah menjadi pembuka teks dengan ilustrasi kecil sebagai pendamping. Checkpoint aktif dan progres mudah ditemukan pada alur pertama layar. | Ilustrasi pendamping disembunyikan; CTA, statistik, dan checkpoint tersusun vertikal tanpa memenuhi layar dengan dekorasi. |
| Katalog | Judul course, pilihan jurusan, progres, Course Start, dan daftar checkpoint kini dipisahkan oleh rule tipis; daftar materi menjadi baris yang dapat dipindai. | Judul, chooser, dan nilai navigasi course tetap terbaca pada satu kolom; tanpa atmosfer/cursor/NPC pada rute course. |
| Pembaca | Teks utama mendapat kolom baca besar, rail daftar subbab bertahan sebagai orientasi, dan heading tidak lagi ditimpa dekorasi bergerak. | Headline, ringkasan serif, dan konteks buku mengalir satu kolom dengan panjang baris nyaman dan tanpa overflow horizontal. |

## Validasi teknis

`pnpm check && pnpm test` lulus: **40 file test / 118 test**. Test `readingFocus.test.ts` memastikan shell fokus berlaku untuk `/materi` dan `/materi/:id`, sedangkan `AppShell.test.tsx` merender shell secara nyata: rute course menonaktifkan atmosfer/NPC/cursor namun mempertahankan rail serta pencarian; rute non-course mempertahankan atmosfer dan memverifikasi drawer Android dapat buka–tutup serta pencarian global dapat dibuka. Progres, course data, Source Map, evidence, portfolio, search, quiz, dan routes tidak mengalami perubahan kontrak.
