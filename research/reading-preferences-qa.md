# QA Pengaturan Membaca

## Perilaku yang diverifikasi

Pengaturan muncul sebagai panel **Tampilan Baca** tepat setelah pengantar materi. Ia menawarkan tiga pilihan per dimensi dan berlaku hanya pada prose pembaca, bukan pada navigasi, kuis, atau kontrol course.

| Dimensi | Preset | Bukti |
| --- | --- | --- |
| Ukuran teks | Rapat, Nyaman, Lega | Test integrasi memilih `Lega` dan memastikan `reader-scale-generous` dipasang pada artikel. Reset mengembalikan `reader-scale-comfortable`. |
| Jenis font | Sans modern, Serif buku, Mudah baca | Test integrasi memilih `Mudah baca` dan memastikan `reader-font-accessible` dipasang pada artikel. |
| Lebar kolom | Rapat, Normal, Lapang | Test integrasi memilih `Lapang` dan memastikan `reader-width-wide` dipasang pada artikel. |
| Persistensi | Perangkat lokal | Test jsdom menyimpan pilihan lalu membacanya ulang; JSON rusak kembali ke default aman. |

## Pemeriksaan visual

Panel **Tampilan Baca** dibuka secara eksplisit pada pembaca Cloud `Prolog.1` di desktop 1280×720 dan Android 390×844. Tiga kombinasi berikut diperiksa dengan panel tetap terbuka: **Rapat + Sans modern + Rapat**, **Nyaman + Serif buku + Normal**, serta **Lega + Mudah baca + Lapang**.

Pada desktop, setiap kombinasi menyorot pilihan aktif yang tepat, rail daftar isi tetap berada di kanan, dan preset `Lapang` memperlebar artikel tanpa mendorong rail atau toolbar keluar viewport. Pada Android, ketiga kombinasi tetap satu kolom; tombol, seluruh opsi ukuran/font, dan panel tidak memicu overflow horizontal. Font/ukuran pembuka tidak sengaja diubah, karena preferensi ditujukan hanya bagi prose materi. Panel menggunakan tombol yang dapat dijangkau keyboard melalui fokus bawaan dan status `aria-pressed`.

## Hasil regresi

`pnpm check && pnpm test` lulus dengan **42 file test / 122 test**. `MaterialDetail.test.tsx` memverifikasi perubahan kelas pembaca melalui interaksi tombol nyata dan aksi reset; `readingPreferences.test.ts` memverifikasi normalisasi dan persistensi aman.
