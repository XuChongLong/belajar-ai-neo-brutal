# Catatan Review Visual

## Temuan dari desktop dan mobile

Desain secara konsisten menerapkan konsep **Paper Playground**: latar kertas hangat, border hitam tebal, shadow offset, aksen pink, ilustrasi robot, dan bahasa Indonesia yang ramah. Halaman beranda, progress, review, profil, PRD Maker, serta flashcards berhasil memakai sistem visual yang sama.

Pada desktop, navigasi tampil sebagai header horizontal saat sidebar dalam keadaan tertutup; akibatnya ciri "workbook spine" yang direncanakan belum menjadi struktur visual utama. Halaman materi sangat panjang dan memakai banyak kartu yang serupa, sehingga pola pemindaian dan pembeda antarbagian mulai melemah. Dominasi warna pastel kategori juga sesekali mengurangi peran pink sebagai aksen utama.

Pada mobile, struktur satu kolom rapi dan konten tetap dapat dibaca. Namun, halaman materi dan detail materi menjadi sangat panjang; kontrol orientasi, progres bab, serta akses cepat ke aksi selanjutnya perlu diperkuat agar pengguna tidak kehilangan konteks saat menggulir.

## Verifikasi setelah pembaruan katalog dan navigasi

Punggung workbook kini tampil terbuka secara default pada desktop. Rail menampilkan identitas belajar.ai, progres buku, kelompok menu Belajar/Meja Kerja/Akun, serta status penyimpanan akun. Katalog jurusan AI Engineering memakai pembagian checkpoint per bab dan progres yang terlihat pada setiap bab. Saat verifikasi, tombol kontrol rail masih bertumpuk dengan label kecil "WORKBOOK" pada sudut atas; posisinya perlu dirapikan sebelum penyerahan.

## Verifikasi tindak lanjut sinkronisasi

Beranda kini menampilkan kartu checkpoint terakhir tepat setelah ringkasan statistik, dengan judul materi, durasi, level, dan tombol untuk meneruskan pembacaan. Halaman Progress menampilkan status tersimpan yang menggunakan waktu relatif serta penjelasan cakupan data akun. Kedua tambahan tetap terbaca pada desktop dan mobile; pada layar ponsel, kartu checkpoint berubah menjadi susunan vertikal dengan CTA lebar penuh.

## Verifikasi riwayat dan pengaturan progres

Target mingguan pada beranda dan dashboard kini dihitung dari hari yang memiliki aktivitas akun, bukan angka statis. Halaman Progress menampilkan timeline aktivitas kosong yang menjelaskan tindakan pembentuk riwayat, sedangkan halaman Pengaturan Progres menempatkan pilihan target, ekspor JSON, dan reset berkonfirmasi dalam tiga kartu yang mudah dipindai. Punggung workbook kembali tampil sebagai anchor desktop pada halaman pengaturan.

## Verifikasi navigasi Android

Beranda, katalog materi, dan dashboard progres diuji pada lebar 375 px. Ketiganya kini memulai halaman dengan navigasi tertutup, sehingga area belajar tidak lagi tertutup panel menu. Header menyisakan tombol menu yang jelas di kiri, pencarian, serta shortcut progres; drawer baru memakai backdrop dan tombol “Tutup” agar pengguna memiliki dua cara yang tegas untuk kembali ke konten.

## Audit aset publik Android

Pada domain publik, ilustrasi hero tersedia dan endpoint aset mengembalikan respons sukses. Namun, tangkapan awal halaman sempat menunjukkan frame hero kosong sebelum gambar selesai dimuat, sedangkan pemeriksaan berikutnya menampilkan ilustrasi dengan benar. Perbaikan perlu memprioritaskan pengalaman pemuatan Android: dimensi frame yang stabil, placeholder beridentitas, decoding asinkron, dan fallback visual yang tetap informatif jika jaringan gambar lambat.

## Verifikasi pengayaan visual

Pada viewport 375 px, hero kini mempertahankan komposisi visual selama aset dimuat dan kemudian menampilkan ilustrasi robot tanpa lompatan tata letak. Detail materi menambahkan blok “Lihat dengan gambar” yang menyatukan ilustrasi konseptual, penjelasan sederhana, serta analogi tekstual; susunannya berubah menjadi satu kolom agar nyaman dibaca saat menggulir di Android.

Ilustrasi workbook pengganti telah berhasil tersedia dan terlihat pada blok analogi di detail materi versi pengembangan. Aset yang gagal tidak lagi dirujuk oleh halaman materi; sebuah sketsa data-ke-AI-ke-hasil tetap tersedia apabila aset gambar tidak dapat dimuat.

Verifikasi langsung URL aset mengonfirmasi ilustrasi workbook final berukuran 1920 × 1280 telah tersedia. Visual tersebut menampilkan robot belajar, kartu data, kartu model, hasil, serta stempel pemeriksaan manusia dengan kontras yang sesuai untuk pemakaian di Android.

Pemeriksaan halaman materi publik segera setelah checkpoint masih memperlihatkan urutan materi lama tanpa blok “Lihat dengan gambar”, meskipun kode pengembangan telah merender blok tersebut. Ini menunjukkan cache atau propagasi versi publik masih perlu dipastikan sebelum item QA publik ditutup.

Setelah pemuatan cache-bypass, halaman materi publik memuat blok “Lihat dengan gambar” beserta URL ilustrasi workbook final. Ini mengonfirmasi deployment terbaru telah terpropagasi; pemeriksaan perangkat Android pengguna tetap diperlukan untuk memverifikasi menu dan pemuatan aset dalam kondisi jaringan nyata.

## Penggantian placeholder Android

Ilustrasi PNG tambahan kini telah dihapus dari halaman materi. Blok analogi menggunakan visual konseptual yang dirender langsung oleh browser: kartu Data, AI, dan Hasil disertai checkpoint manusia. Pada viewport 375 px, visual tetap terbaca sebagai satu rangkaian dan tidak menampilkan placeholder PNG.

## Verifikasi publik Cyber Security

Domain publik kini memuat jalur **Cyber Security** berisi 31 materi dalam 10 checkpoint. Katalog menunjukkan filter bab mulai dari Bab 1 sampai Bab 10, dan detail materi pertama menampilkan bahasa percakapan, analogi, latihan defensif, pagar legal, dua pertanyaan cek pemahaman, serta tiga tautan sumber primer yang dapat dibuka dari antarmuka.

Terdapat temuan tata letak di pembaca materi: kolom artikel dan daftar isi sempat tertukar pada layar lebar sehingga konten hanya selebar 240 px. Urutannya telah dikoreksi; artikel kini mendapat lebar baca utama dan daftar isi berada di rail kanan. Blok sumber juga dibuat menjadi kartu bertumpuk pada Android, sehingga judul dan catatan referensi tidak lagi bertabrakan atau menyempit.

Pemeriksaan domain publik tepat setelah checkpoint responsif masih memperlihatkan bundle layout lama walau URL telah memakai parameter cache-bypass. Perbaikan telah lolos typecheck, 25 berkas test/82 test, serta screenshot development pada desktop dan 375 px; propagasi domain publik perlu diperiksa kembali setelah jeda deployment.

Setelah notifikasi deployment sukses, domain publik akhirnya memuat bundle responsif terbaru. Artikel tampil pada lebar baca utama, rail daftar isi berada di kanan, dan blok analogi browser-native tampak tanpa placeholder gambar.

## Verifikasi Cyber Security intensif

Rilis publik terbaru telah terpropagasi dan menampilkan **240 materi dalam 20 checkpoint**. Katalog hanya membuka satu checkpoint secara awal dan menyediakan kontrol “Buka 12 subbab” untuk checkpoint lain, sehingga volume materi besar tetap dapat dipindai. Detail materi pertama dan materi lanjut telah diverifikasi pada desktop serta viewport 375 px; pembukaan bab, lima lapisan materi, studi kasus checkpoint, latihan legal, sumber, dan kuis tetap terbaca.

Pemeriksaan jaringan terhadap seluruh URL YouTube pada registry sumber memperoleh respons sukses untuk sebagian tautan. Beberapa tautan memperoleh HTTP 429 dari YouTube karena pembatasan permintaan otomatis, bukan respons tautan tidak ditemukan. Registry tetap berisi dua video utama, playlist sumber, dan seluruh 21 video playlist yang telah dipetakan ke checkpoint terkait.

## Verifikasi Data Analyst & Data Engineering intensif

Katalog jalur Data pada viewport Android menampilkan **Bab Prolog** sebelum checkpoint inti, dengan 12 subbab pembuka yang menjelaskan peran analyst/data engineer, pertanyaan keputusan, definisi metrik, quality, privacy, dan peta perjalanan. Detail Prolog dan Bab 1 memperlihatkan lima lapisan materi, kartu analogi browser-native, studi kasus checkpoint, latihan artefak, sumber primer, dan kuis tanpa tumpang tindih. Typecheck serta seluruh suite otomatis lulus (29 berkas test / 92 test) setelah integrasi 156 materi Data.

## Verifikasi AI Product Builder intensif

Pada viewport Android, katalog AI Product menampilkan Bab Prolog sebagai titik masuk yang jelas sebelum Bab 1 discovery. Pembaca Prolog dan subbab pertama mempertahankan urutan lima lapisan, studi kasus, latihan artefak, sumber primer, kuis, dan navigasi tanpa elemen yang bertabrakan. Setelah integrasi 156 materi AI Product, typecheck dan seluruh suite otomatis lulus (30 berkas test / 94 test).

## Verifikasi Automation Specialist intensif

Katalog Automation pada viewport Android menampilkan Bab Prolog di depan checkpoint inti dan menggunakan kartu checkpoint yang dapat dipindai tanpa mengganggu orientasi. Detail Prolog serta Bab 1 mempertahankan lima lapisan materi, studi kasus, latihan artefak, sumber primer, dan kuis dengan tata letak satu kolom yang terbaca. Typecheck serta seluruh suite otomatis lulus (31 berkas test / 96 test) setelah integrasi 156 materi Automation.

## Verifikasi Creative AI & Content Systems intensif

Katalog Creative AI pada viewport Android menampilkan Bab Prolog sebelum checkpoint inti dan seluruh filter bab mengikuti urutan strategi hingga capstone. Detail Prolog serta Bab 1 menunjukkan lima lapisan materi, studi kasus, latihan artefak, sumber tentang rights/provenance, dan kuis dengan susunan satu kolom yang stabil. Typecheck dan seluruh suite otomatis lulus (32 berkas test / 98 test) setelah integrasi 156 materi Creative AI.
