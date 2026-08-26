# Audit Penyederhanaan Discovery, Dashboard, dan Landing Page

## Masalah yang diselesaikan

| Halaman | Kepadatan saat ini | Keputusan penyederhanaan |
| --- | --- | --- |
| Materi & Jurusan | Memperlihatkan Course Start, prerequisite, Source Map, resume, filter, dan daftar checkpoint pada satu alur vertikal. | Halaman awal hanya menjadi **daftar mata pelajaran**. Detail course dibuka saat satu mata pelajaran dipilih; daftar subbab tidak lagi dirender sekaligus di halaman pilihan. |
| Dashboard | Mencampur profil tujuan, sinkronisasi, ritme, riwayat, skor, tools, overview kategori, rekomendasi, badge, serta tip. | Tiga blok utama: progres keseluruhan, lanjutkan materi, dan ritme minggu ini. Detail aktivitas dan pengaturan tetap dapat diakses dari navigasi, tetapi tidak menjadi shortcut dashboard. |
| Landing page | Memiliki identitas visual dan CTA, tetapi alasan belajar, cara kerja, serta hasil yang dapat diperoleh belum dijelaskan dengan cukup eksplisit. | Hero menjawab untuk siapa, apa yang dipelajari, dan bagaimana ritmenya; ditambah catatan inspiratif teratribusi dari Katherine Johnson. |

## Arah halaman target

Beranda akan memperkenalkan Belajar AI sebagai workbook yang membantu pemula memahami AI melalui **konsep, contoh, latihan, dan bukti proyek**. Mata pelajaran bukan lagi ditampilkan sebagai katalog panjang; pengguna memilih satu kartu mata pelajaran, lalu diarahkan ke halaman detail jalur yang memuat satu CTA awal dan daftar bab yang dapat dibuka satu per satu.

Dashboard tidak akan mempromosikan Glosarium, Flashcard, atau Mode Review sebagai kartu utama. Ketiganya tetap berada pada navigasi, sehingga dashboard dapat menjawab tiga pertanyaan yang relevan: *seberapa jauh saya sudah belajar, materi apa yang harus saya buka sekarang, dan apakah ritme minggu ini terjaga?*

| Rute | Struktur ringkas | Aksi utama |
| --- | --- | --- |
| `/materi` | Judul singkat, daftar kartu mata pelajaran, dan satu status progres global. | Pilih mata pelajaran. |
| `/materi?jurusan=…` | Brief course singkat, checkpoint berikutnya, lalu daftar bab yang tertutup secara default. | Mulai atau lanjutkan checkpoint. |
| `/progress` | Ring progres, course aktif, materi berikutnya, dan ritme minggu ini. | Lanjutkan materi. |
| `/` | Penjelasan manfaat, tiga cara belajar, kursus yang tersedia, dan catatan motivasional beratribusi. | Pilih mata pelajaran atau mulai materi pertama. |

## Visual dan kutipan

Landing page memakai foto arsip Katherine Johnson di meja kerja NASA Langley (1962), dengan kredit NASA Langley Research Center. Kutipan yang dipakai berasal dari artikel NASA tentang Johnson:

> “We will always have STEM with us. … And there will always, always be mathematics. Everything is physics and math.” — Katherine Johnson, dikutip NASA. [1]

Foto dipakai sebagai inspirasi belajar dan diberi atribusi yang jelas; ia bukan endorsement. [2]

## Referensi

[1] [NASA — Katherine Johnson: A Lifetime of STEM](https://www.nasa.gov/learning-resources/katherine-johnson-a-lifetime-of-stem/)

[2] [NASA — Katherine Johnson at Work, 1962](https://www.nasa.gov/image-article/katherine-johnson-work-1962/)
