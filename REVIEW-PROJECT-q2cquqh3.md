# Review Project — Belajar AI

**Reviewer:** Manus AI  
**Ruang lingkup:** Tampilan desktop dan mobile, alur belajar, aksesibilitas dasar, serta kualitas implementasi pada versi yang sedang berjalan.

## Kesimpulan

> **Belajar AI sudah memiliki identitas yang kuat dan terasa jauh dari template generik.** Arah *Paper Playground* terbaca konsisten melalui kertas hangat, garis tinta tebal, bayangan offset, hot pink, ilustrasi robot, dan copy yang terasa dekat dengan pemula.

Kekuatan terbesar project ini ada pada keberanian visual dan banyaknya fitur pembelajaran yang sudah terhubung, seperti materi, kuis, mode review, glosarium, flashcards, progres, Study Files, NPC Pet, serta PRD Maker. Prioritas berikutnya bukan menambah banyak halaman baru, melainkan membuat pengalaman belajar yang sudah ada lebih **terarah, dipercaya, dan tahan lintas perangkat**.

| Area | Penilaian | Catatan utama |
|---|---|---|
| Identitas visual | Kuat | Sistem neo-brutalism konsisten dan mudah dikenali. |
| Struktur pembelajaran | Menjanjikan | Fitur beragam, tetapi katalog panjang memerlukan orientasi yang lebih kuat. |
| Mobile | Baik | Satu kolom rapi; halaman detail dan katalog tetap terasa sangat panjang. |
| Kepercayaan data | Perlu perhatian | Progres belajar masih mengandalkan penyimpanan browser dan beberapa angka awal bersifat tetap. |
| Stabilitas kode | Baik | Seluruh 63 test dan pemeriksaan TypeScript berhasil pada sesi review. |

## Yang sudah sangat baik

| Kekuatan | Bukti pada produk | Mengapa penting |
|---|---|---|
| Bahasa visual konsisten | Beranda, progress, review, profil, flashcards, dan PRD Maker memakai pola border hitam, shadow offset, label tinta, serta warna kertas yang seragam. | Pengguna membangun ingatan merek lebih cepat karena setiap halaman terasa berasal dari produk yang sama. |
| Hero dan CTA jelas | Beranda langsung mengarahkan pengguna ke materi pertama, lalu menyediakan jalan alternatif ke review, glosarium, dan flashcards. | Pemula tidak perlu menebak harus mulai dari mana. |
| Konten belajar tidak pasif | Detail materi memiliki analogi, studi kasus, diagram, kuis mini, kuis akhir bab, penanda selesai, dan navigasi materi berikutnya. | Pola ini membantu pembelajaran aktif, bukan sekadar membaca artikel. |
| Status dan umpan balik terasa nyata | Progres, bookmark, skor kuis, kuota Study Files, dan beberapa keadaan kosong/loading sudah diberi copy yang manusiawi. | Antarmuka terasa responsif dan tidak dingin. |
| Fondasi implementasi rapi | Pengujian otomatis dan type check berhasil tanpa error; log browser dan jaringan yang diperiksa juga tidak menunjukkan kegagalan. | Risiko regresi dasar relatif lebih terkontrol saat iterasi berikutnya. |

## Kritik dan rekomendasi prioritas

| Prioritas | Temuan | Dampak bagi pengguna | Rekomendasi yang disarankan |
|---|---|---|---|
| P0 | Progres belajar disimpan di `localStorage`, sementara aplikasi juga sudah memiliki akun pengguna. | Progres, nilai kuis, bookmark, streak, flashcards, dan NPC bisa hilang ketika browser dibersihkan atau saat pengguna berpindah perangkat. | Simpan state pembelajaran inti per pengguna di database. Gunakan `localStorage` hanya sebagai cache/offline fallback, lalu sinkronkan saat pengguna masuk. |
| P0 | Streak awal bernilai 3 hari, sedangkan kartu target mingguan berisi `03 / 05` dan tiga hari selesai secara tetap. | Pengguna baru dapat melihat capaian yang belum mereka raih; hal ini menurunkan kepercayaan pada sistem progres. | Turunkan semua angka habit dari state nyata. Jika belum ada aktivitas, tampilkan keadaan awal yang jujur, misalnya `0 / 5` dengan CTA memilih target pertama. |
| P1 | Halaman materi dengan 108 materi berubah menjadi katalog sangat panjang dan banyak kartu tampak serupa, terutama di ponsel. | Pengguna berisiko kehilangan konteks, sulit membandingkan materi, dan memilih berdasarkan tampilan acak alih-alih tujuan belajar. | Jadikan jurusan sebagai struktur utama: tab bab/stiker besar, ringkasan progres per jurusan, filter level/durasi/status, serta tombol “lanjutkan dari terakhir” yang terus terlihat. Variasikan kartu unggulan dan divider bab agar pemindaian lebih cepat. |
| P1 | Dalam tampilan desktop yang diuji, navigasi terasa lebih mirip header aplikasi umum karena rail/sidebar sedang tertutup. | Signature yang direncanakan sebagai “workbook spine” belum menjadi jangkar visual utama. | Pertahankan kontrol untuk menutup navigasi, tetapi jadikan rail pembelajaran lebih menonjol secara default pada desktop. Kelompokkan menu agar tidak tampak sebagai daftar sebelas tujuan setara. |
| P1 | Warna pastel kategori cukup banyak pada beranda dan katalog. | Kesan ceria tercapai, tetapi hot pink kadang tidak lagi terasa sebagai bahasa utama untuk aksi, progres, dan prioritas. | Tetapkan pink sebagai satu-satunya warna aksi/progres. Batasi pastel menjadi permukaan kategori, sticky note, atau reward; gunakan kembali warna dasar kertas dan hitam untuk sisanya. |
| P1 | Detail materi sudah kaya, tetapi pembaca ponsel tetap perlu menggulir sangat jauh sebelum menemukan kuis dan aksi selesai. | Fokus belajar mudah terputus dan pengguna kehilangan posisi dalam bab. | Tambahkan indikator bab yang ringkas/sticky, estimasi bagian tersisa, serta CTA “lanjut ke bagian berikutnya” di antara blok konten. Daftar isi mobile dapat dibuat lebih eksplisit sebagai navigasi progres, bukan hanya tombol tambahan. |
| P2 | Efek cursor dan spark dipicu oleh perpindahan serta klik global. | Efek ini menyenangkan sesaat, namun berpotensi mengalihkan fokus saat membaca panjang dan menyebabkan pembaruan UI sangat sering di desktop. | Batasi spark pada interaksi berhadiah atau CTA penting; gunakan pembaruan berbasis `requestAnimationFrame` bila cursor tetap dipakai. Hormati `prefers-reduced-motion` dan nonaktifkan dekorasi ini pada interaksi belajar yang panjang. |
| P2 | Dialog pencarian dan navigasi mobile perlu diaudit dari sisi keyboard. | Pengguna keyboard atau pembaca layar dapat mengalami fokus yang berpindah ke elemen tersembunyi atau tidak kembali ke tombol pemicu. | Tambahkan focus trap untuk dialog/drawer, pindahkan fokus saat dibuka, kembalikan fokus ketika ditutup, dan uji seluruh alur dengan tombol Tab, Shift+Tab, Escape, dan Enter. |
| P2 | Teks pendukung dan metadata pada beberapa kartu mobile terlihat sangat rapat. | Pembaca pemula dapat melewatkan konteks, durasi, atau deskripsi yang sebenarnya berguna untuk memilih materi. | Naikkan ukuran minimum teks pendukung, tambah jarak antarbaris, dan beri prioritas visual yang lebih tegas antara judul, status, serta metadata. |
| P3 | Banyak fitur kuat berada pada tingkat menu yang sama: review, glosarium, flashcards, NPC, PRD Maker, files, profil, dan lainnya. | Produk mulai terasa seperti kumpulan alat, bukan perjalanan belajar yang dipandu. | Bentuk tiga kelompok utama: **Belajar** (materi, review, flashcards), **Ruang kerja** (Study Files, PRD Maker), dan **Saya** (progress, NPC, profil). Berikan rekomendasi kontekstual dari beranda, bukan sekadar menu tetap. |

## Urutan pengerjaan yang paling masuk akal

Fase pertama sebaiknya fokus pada **kepercayaan progres**. Hubungkan progres inti ke akun pengguna dan hilangkan angka capaian yang masih statis. Setelah itu, rapikan katalog materi menjadi pengalaman berbasis jurusan dan bab, bukan sekadar daftar panjang. Kedua perubahan ini memberi dampak langsung pada alasan pengguna kembali belajar setiap hari.

Fase kedua dapat memperjelas sistem desain. Jadikan rail desktop sebagai “punggung workbook”, batasi warna aksen agar pink kembali dominan, dan ubah label, stiker, serta progress rail menjadi elemen struktural. Dengan begitu, kekuatan visual yang sekarang sudah bagus akan lebih khas sekaligus lebih fungsional.

Fase ketiga adalah penyempurnaan mobile dan aksesibilitas. Fokus pada navigasi bagian dalam materi, keterbacaan teks pendukung, fokus keyboard, dan motion yang lebih selektif. Perbaikan ini tidak perlu mengubah karakter playful produk; tujuannya adalah agar karakter tersebut tidak mengganggu proses memahami materi.

## Pemeriksaan teknis yang dilakukan

| Pemeriksaan | Hasil | Batasan review |
|---|---|---|
| Unit/integration test | 18 file test dan 63 test berhasil. | Tidak menggantikan uji kegunaan dengan pengguna nyata. |
| TypeScript | `tsc --noEmit` berhasil. | Tidak menilai kualitas pedagogi dari seluruh materi. |
| Log browser dan jaringan | Tidak ada error browser atau respons 4xx/5xx yang terlihat pada log yang diperiksa. | Belum mencakup audit performa produksi, pembaca layar, atau perangkat fisik. |
| Tampilan responsif | Beranda, materi, detail materi, progress, review, profil, PRD Maker, dan flashcards diperiksa pada desktop dan ponsel. | Menu drawer dan setiap state interaksi tidak diuji secara manual satu per satu. |

## Penutup

Project ini **sudah kuat secara rasa dan arah visual**. Yang kurang bukan estetika dasar, melainkan struktur produk yang membuat pengguna merasa: “progresku aman, aku tahu harus lanjut ke mana, dan aku tidak perlu mencari-cari saat materi makin banyak.” Jika tiga prioritas pertama dikerjakan, Belajar AI akan terasa bukan hanya menarik saat pertama dibuka, tetapi juga lebih layak dipakai sebagai tempat belajar rutin.
