# QA Penyederhanaan Discovery dan Dashboard

## Halaman yang diperiksa

| Halaman | Desktop | Android 390×844 | Hasil |
| --- | --- | --- | --- |
| Landing page | Hero menjelaskan manfaat belajar, CTA mata pelajaran, foto serta kutipan Katherine Johnson, tiga cara belajar, dan kartu mata pelajaran terbaca jelas. | Headline, CTA, dan foto arsip tampil satu kolom tanpa horizontal overflow. | Lulus. |
| `/materi` | Halaman awal hanya menampilkan tujuh kartu mata pelajaran dan metode belajar ringkas; subbab tidak dirender. | Pengguna langsung melihat alasan memilih mata pelajaran dan kartu pertama tanpa filter atau checkpoint panjang. | Lulus. |
| Detail Cloud | Hanya brief course, CTA langkah berikutnya, dan daftar bab tertutup ditampilkan. | CTA, ringkasan, dan daftar bab berada satu kolom; subbab baru muncul ketika bab dibuka. | Lulus. |
| Dashboard | Hanya progres, checkpoint berikutnya, ritme minggu ini, dan aktivitas terbaru. | Header, streak, ring progres, serta checkpoint berikutnya tersusun vertikal dan terbaca. | Lulus. |

## Kontrak navigasi

Regresi halaman Materials memverifikasi dua kondisi: halaman awal menyediakan pilihan mata pelajaran tanpa wall of sublesson, serta detail course baru membuka subbab sesudah pengguna menekan satu bab. Seluruh typecheck dan **42 file / 122 test** lulus sebelum QA visual ini.

## Catatan aset

Foto Katherine Johnson menggunakan aset arsip NASA Langley yang diunggah sebagai aset statis proyek. Kutipan dan tautan sumber ditempatkan sebagai konteks inspirasional, bukan endorsement.
