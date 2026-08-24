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
