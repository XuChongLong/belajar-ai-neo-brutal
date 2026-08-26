# Spesifikasi Redesign Editorial — Belajar AI

## Arah desain

Redesign ini memakai pendekatan **Quiet Editorial Workbook**. Ia bukan minimalisme steril dan bukan penghapusan karakter neo-brutal. Garis, warna, dan ekspresi brand dipertahankan, tetapi digunakan sebagai tanda navigasi dan aksi, bukan sebagai dekorasi yang mengapit setiap blok konten. Prinsipnya adalah *reading first, personality second*.

| Lapisan | Keputusan | Dampak pada pembaca |
| --- | --- | --- |
| Permukaan | Kertas hangat polos, tekstur/atmosfer jauh lebih tipis, tanpa gerak pada katalog dan lesson. | Mata berhenti mengejar dekorasi saat membaca. |
| Tinta | Arang untuk teks, abu lembut untuk metadata, satu aksen course untuk navigasi. | Hirarki dapat dibaca tanpa harus mengandalkan banyak warna. |
| Tipografi | Sans display hanya untuk judul halaman/bab; teks utama memakai ukuran 17–18px, line-height longgar, lebar 66–72 karakter. | Paragraf panjang terasa seperti artikel, bukan kartu promosi. |
| Layout | Satu kolom teks utama; rail kanan hanya berisi posisi/bab dan aksi lanjut. | Konteks tetap dekat tanpa membelah fokus. |
| Interaksi | Satu CTA primer di akhir konteks; panel bantuan menjadi disclosure atau sisipan ringan. | Pengguna selalu tahu langkah berikutnya tanpa melihat banyak tombol. |

## Arsitektur halaman

### Beranda

Beranda akan menjadi halaman *resume learning*, bukan poster panjang. Urutannya: identitas ringkas, checkpoint berikutnya sebagai hero utama, ringkasan progres, pilihan jalur dalam daftar bersih, lalu tools dan ritme mingguan sebagai bagian sekunder. Ilustrasi robot tetap hadir namun menyusut menjadi pendamping di desktop dan disembunyikan pada mobile.

### Katalog course

Course Start tetap ada, tetapi memadat menjadi *course brief* dengan siapa jalur ini untuk siapa, estimasi, artefak capstone, dan CTA tunggal. Source Map bergeser menjadi modul ringkas. Daftar checkpoint menggunakan baris editorial: nomor, judul, status, waktu, dan indikator progress. Filter menjadi toolbar ringkas yang menempel secara lembut saat diperlukan.

### Pembaca materi

Pembaca memakai tiga strata. Pertama, **article spine**: meta, judul, ringkasan, dan prose utama. Kedua, **aside kontekstual**: studi kasus, contoh kerja, catatan, dan gambar yang diposisikan setelah konsep yang relevan. Ketiga, **practice dock**: evidence, resource, quiz, dan selesai yang hadir setelah pembaca menutup materi. Tidak ada dekorasi kanvas bergerak atau cursor trail di mode lesson.

## Aturan reduksi distraksi

1. Satu warna aksen dominan per halaman, dengan pink dicadangkan untuk CTA/penanda interaksi penting.
2. Satu elemen display besar per viewport; heading lain menggunakan skala editorial yang lebih rendah.
3. Dekorasi bersifat statis, tipis, dan tidak berada di bawah teks panjang.
4. Cursor trail, click spark, dan animasi atmosfer dinonaktifkan pada katalog serta reader.
5. Kartu berbingkai tebal hanya untuk keputusan atau aktivitas; bukan untuk setiap paragraf atau metadata.

## Batas implementasi awal

Implementasi prioritas mengubah shell, beranda, katalog, dan pembaca materi. Data course, progres, Project Evidence, Portfolio, pencarian, Source Map, kuis, serta route tidak akan diubah. Dengan begitu perubahan dapat diuji sebagai redesign pengalaman tanpa risiko migrasi akun.
