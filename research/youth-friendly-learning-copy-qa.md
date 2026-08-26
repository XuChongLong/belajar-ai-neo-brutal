# QA Copy Pembelajaran yang Sistematis

## Penerapan

| Halaman | Bahasa sebelum | Bahasa sekarang |
| --- | --- | --- |
| Landing page | Nilai belajar dijelaskan sebagai slogan umum. | Membuka dengan analogi perjalanan: pengguna membuka Maps saat masuk tempat baru, lalu melihat mulai, lanjut, dan hasil tiap bab. |
| Katalog mata pelajaran | Mengajak memilih jurusan tanpa konteks pengambilan keputusan. | Menjelaskan bahwa membuka semua jalan sekaligus membuat pengguna mudah muter-muter, lalu meminta memilih satu arah. |
| Detail course | Menyebut checkpoint berikutnya secara generik. | Menjelaskan mengapa satu langkah pembuka perlu diambil sebelum bab berikutnya agar tidak terasa loncat tanpa pegangan. |
| Dashboard | Ringkasan progres bersifat abstrak. | Menjawab dua pertanyaan langsung: sudah sampai mana dan langkah kecil mana yang paling enak dibuka sekarang. |

## Pemeriksaan visual

Screenshot desktop dan Android 390×844 memperlihatkan paragraf analogi tetap berada dalam lebar baca yang nyaman, CTA tetap berada setelah arahan utama, dan tidak ada overflow horizontal pada landing page, katalog, detail course, maupun dashboard. Headline menggunakan kalimat santai tetapi langsung; setiap bagian memberi konteks sebelum CTA.

## Regresi

`pnpm check && pnpm test` lulus dengan **42 file test / 122 test**. Test katalog tetap memverifikasi bahwa pengguna memilih mata pelajaran terlebih dahulu dan subbab hanya terbuka setelah satu bab dipilih.
