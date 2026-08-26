# Riset Arah Redesign Editorial — Belajar AI

**Status:** Riset awal untuk redesign pembaca course.  
**Tujuan:** Memindahkan fokus dari visual yang terus meminta perhatian ke ritme belajar yang mudah dipindai, tenang, dan tetap berkarakter.

## Temuan ringkas

Audit visual awal menunjukkan bahasa neo-brutal saat ini efektif membedakan brand, tetapi terlalu banyak elemen sekaligus bersaing dengan materi: ilustrasi hero besar, bingkai hitam yang berulang, aksen pink/kuning, stamp, kartu checkpoint, dan heading display berukuran besar. Pada landing page, elemen ini cocok sebagai satu momen pembuka. Pada katalog 1.092 materi dan pembaca panjang, elemen yang sama perlu diturunkan menjadi **aksen orientasi**, bukan lapisan permanen di semua bagian.

| Referensi | Temuan yang dapat diambil | Keputusan untuk Belajar AI |
| --- | --- | --- |
| Awwwards editorial design course | Editorial web dibangun lewat tipografi, grid, warna, elemen grafis, dan art direction untuk hasil yang terorganisasi sekaligus kontemporer.[1] | Gunakan grid baca yang konsisten, hanya satu sistem aksen warna per course, dan tipografi sebagai orientasi utama. |
| Awwwards Culture & Education collection | Koleksi menempatkan pengalaman belajar dan konteks pendidikan sebagai kelas situs tersendiri, bukan sekadar katalog konten.[2] | Course menjadi pengalaman bertahap: ringkasan, orientasi, pembaca fokus, latihan, lalu refleksi. |
| DLR-Test.Training | Halaman mengutamakan satu janji, progres, rencana belajar berikutnya, dan CTA tunggal; detail tambahan muncul setelah orientasi utama.[3] | Beranda/course start perlu satu “lanjutkan” yang dominan, dengan progres dan next step dekat dengannya. |
| Why Zero | Eksplorasi WebGL sangat imersif tetapi halaman awal mengandalkan visual hampir penuh layar dan sangat sedikit konteks teks.[4] | Jadikan sebagai **anti-referensi** untuk mode membaca: tidak ada canvas/animasi besar di katalog atau pembaca materi. |

## Prinsip arah yang direkomendasikan

> **“Reading first, personality second.”** Brand tetap ada melalui warna, aturan garis halus, dan elemen grafis kecil; sementara konten menang lewat lebar paragraf, ruang putih, hirarki, serta alat navigasi yang tidak berteriak.

Sistem baru perlu menggunakan dasar kertas hangat yang nyaris polos, tinta arang, satu aksen tenang per course, dan aksen pink sebagai aksi positif saja. Pada pembaca, panjang baris ideal dijaga sempit, heading diringkas, serta visual analogi dipindahkan ke sisipan kontekstual yang dapat dilewati. Katalog tidak lagi memakai seluruh checkpoint sebagai dinding kartu; ia menjadi daftar editorial dengan posisi, judul, waktu, dan status yang cepat dipindai.

Untuk menurunkan distraksi, ilustrasi hero robot tidak perlu dihapus. Ia dapat dibatasi pada beranda atau dimunculkan sebagai thumbnail kecil; ia tidak boleh kembali menjadi dekorasi berukuran besar pada layar course atau materi. Motion hanya digunakan untuk state transisi, progress, dan feedback tindakan dengan durasi singkat serta menghormati `prefers-reduced-motion`.

## Audit komponen saat ini

| Area | Yang bekerja | Sumber distraksi | Arah redesign |
| --- | --- | --- | --- |
| Beranda | CTA lanjut checkpoint dan ringkasan progres sudah jelas. | Hero robot besar, sticker, hero tag, stat strip, checkpoint card, tiga tool card, jurusan, banner, serta target mingguan hadir beruntun dalam satu halaman. | Jadikan checkpoint aktif sebagai fokus utama. Sisakan hero kecil dan tenang, lalu pindahkan pilihan jalur serta tools ke blok sekunder. |
| Katalog | Course Start, Source Map, checkpoint, dan filter memberi orientasi kuat. | Terlalu banyak bingkai, label kapital, kartu, serta warna aksen muncul sebelum daftar materi. | Gunakan intro ringkas dan daftar bab seperti daftar isi editorial; Source Map dapat menjadi drawer/section yang lebih tenang. |
| Pembaca | Konten, evidence, resources, quiz, dan daftar isi sudah kaya serta memiliki semantik baik. | Hampir semua bantuan ditampilkan sebagai blok besar: analogi visual, glossary, studi kasus, deep dive, evidence, diagram, resources, worksheet, quiz. | Bangun *reading spine*: teks utama lebih tenang; panel pendukung tampil sebagai sisipan dengan gaya ringan atau dapat dibuka bila dibutuhkan. |

Redesign tidak akan mengurangi materi, evidence, atau progres. Yang berubah adalah **urutan perhatian**: orientasi singkat → teks utama → satu aksi berikutnya; semua alat pendukung tetap tersedia tetapi tidak mendominasi layar pertama pembaca.

## Referensi

[1]: https://www.awwwards.com/academy/course/from-poster-to-screen-designing-editorial-based-websites "From Poster to Screen: Designing Editorial Based Websites — Awwwards"
[2]: https://www.awwwards.com/websites/culture-education/ "Culture & Education Websites — Awwwards"
[3]: https://dlr-test.training/en "DLR-Test.Training"
[4]: https://why.zero.university/ "Zero — Human Infrastructure to Get Hired"
