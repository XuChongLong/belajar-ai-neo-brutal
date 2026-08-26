# Audit Produk Pasca-Ekspansi Course

**Cakupan audit:** kualitas konten, orientasi katalog, rekomendasi, latihan, evaluasi, dan QA yang tersisa setelah katalog bertumbuh menjadi 1.092 materi.

## Ringkasan penilaian

Ekspansi ini sudah kuat pada **struktur**: tiap lima course baru memiliki Prolog, 12 checkpoint inti, sumber primer, pembukaan bab, studi kasus, latihan artefak, kuis, dan navigasi checkpoint. Pengguna tidak lagi dilempar langsung ke materi teknis. Katalog, filter, pencarian, checkpoint bertahap, dan rute detail juga sudah teruji secara publik.

Namun, produk sekarang memasuki tahap yang berbeda. Tantangan utamanya bukan lagi “menambah jumlah materi”, melainkan memastikan 1.092 materi terasa **bernilai, mudah dipilih, dan terbukti dipelajari**. Prioritas tertinggi adalah memperdalam pembeda antarsubbab serta membangun jalur berbasis tujuan dan bukti kerja.

| Area | Status saat ini | Temuan utama | Dampak jika dibiarkan |
|---|---|---|---|
| Struktur course | Kuat | Prolog → 12 checkpoint → capstone sudah konsisten | Pengguna punya urutan yang jelas, tetapi belum tahu kedalaman outcome tiap jalur |
| Kedalaman subbab | Perlu penguatan | Lima lapis tulisan, ringkasan, analogi, dan dua bentuk kuis masih dibentuk melalui pola bersama | Sebagian subbab berisiko terasa seperti variasi judul dari template yang sama |
| Discovery | Cukup | Katalog punya jurusan/filter/checkpoint, beranda punya pintu jurusan dan CTA umum | Pengguna baru masih harus menebak jalur, prasyarat, waktu, dan hasil akhirnya |
| Rekomendasi | Dasar tersedia | Tujuan belajar, prioritas kategori, review rendah, dan “lanjutkan” sudah ada | Belum menjadi peta belajar lintas-course berbasis target nyata dan prasyarat |
| Evaluasi | Dasar tersedia | Quiz 2 soal dan flashcard dari jawaban salah/glosarium | Belum membuktikan kemampuan membuat artefak, menyelesaikan case, atau menutup capstone |
| Sumber | Jelas per course | Registry sumber primer dan tautan pada materi sudah tersedia | Belum ada tampilan source map/coverage yang menjelaskan alasan dan cakupan tiap sumber ke pengguna |

## Temuan 1 — Kedalaman subbab perlu dibuat lebih khas

Generator intensif memang menerima `decision`, `scenario`, dan `exercise` per unit. Tetapi lapisan pembuka, ringkasan, analogi, guardrail akhir, dan dua bentuk kuis masih disusun melalui pola bersama di `client/src/lib/intensiveCourseFactory.ts`. Akibatnya, sebuah topik yang berbeda—misalnya Terraform, data contract, human-in-the-loop, atau content provenance—dapat memakai ritme penjelasan yang sangat mirip.

> **Contoh bukti:** pembuka lima lapis menggunakan kerangka yang sama untuk setiap unit; ringkasan dan analogi juga dirakit dari judul unit serta fokus bab. Sementara itu, kekhasan paling kaya saat ini berada pada pembukaan checkpoint, studi kasus, sumber, dan daftar topik bab.

**Arah perbaikan:** jangan menulis ulang semua materi sekaligus. Mulai dengan memperkaya 36 subbab bernilai tinggi: 12 Prolog lintas course, 12 checkpoint fondasi, dan 12 capstone. Masing-masing perlu mendapat mekanisme/domain-specific explanation, contoh berangka atau diagram keputusan sederhana, kesalahan umum yang berbeda, dan rubrik artefak. Setelah itu, tambah field opsional `explanation`, `commonMistake`, `workedExample`, serta `rubric` pada unit agar material paling kritis tidak lagi digeneralisasi.

## Temuan 2 — Orientasi masih terlalu generik untuk katalog 1.092 materi

Katalog sudah memecah course menjadi checkpoint dan hanya membuka bab pertama secara default. Ini baik untuk mengurangi tampilan yang penuh. Beranda juga memberi pilihan jurusan. Akan tetapi, setelah pengguna memilih course, belum ada **Course Start Card** yang menjawab empat hal paling penting: “cocok untuk siapa”, “mulai dari kemampuan apa”, “artefak apa yang akan selesai”, dan “berapa checkpoint/jam yang realistis”.

Pencarian katalog saat ini cocok pada judul dan kategori. Ia belum mencari ringkasan, istilah kunci, sumber, artefak, atau outcome. Artinya pencarian “Terraform” dapat gagal bila judul bab lebih memakai istilah “Infrastructure as Code”, meskipun sumber dan isi materinya relevan.

**Arah perbaikan:** tambahkan halaman atau drawer “Mulai dari sini” per course yang memuat persona, prasyarat, 3 outcome, estimasi durasi, artefak final, dan checkpoint rekomendasi. Perluas indeks pencarian ke `title`, `category`, `summary`, section body, artifact, dan nama sumber. Tambahkan chip “fondasi”, “praktik”, “operasi”, dan “capstone” untuk menurunkan beban memilih.

## Temuan 3 — Rekomendasi perlu menjadi peta lintas-course, bukan hanya prioritas kategori

`learningPath.ts` sudah menggunakan tujuan belajar, skor quiz, materi selesai, bookmark, dan kategori prioritas. Ini fondasi yang bagus. Namun, rekomendasi belum mengenali **prasyarat, relasi antar-course, atau level kesiapan**. Sebagai contoh, pengguna yang ingin menjadi Cloud Operator mendapat prioritas Cloud, tetapi belum dipandu secara eksplisit apakah harus menyelesaikan fondasi AI, Linux, data, atau automation terlebih dahulu.

Ada satu ketidakkonsistenan yang perlu diperbaiki lebih dulu: tujuan **AI Safety Builder** masih memprioritaskan kategori lama `Cyber Security AI`, sedangkan course baru memakai kategori `Cyber Security Intensif`. Karena pencocokan prioritas menggunakan awalan kategori, tujuan itu berpotensi tidak memberi bobot yang seharusnya kepada jalur Cyber Security baru.

**Arah perbaikan:** buat graph prerequisite ringan per course dan per checkpoint; perbaiki priority label Cyber Security; lalu tampilkan “kamu di sini → langkah berikutnya → alasan” pada beranda serta katalog. Satu peta lintas-course yang ringkas akan lebih berguna daripada menambah filter lagi.

## Temuan 4 — Latihan belum menjadi bukti kompetensi

Setiap checkpoint sudah memiliki studi kasus serta artefak yang disebutkan. Namun artefak itu belum dapat ditulis, disimpan, dievaluasi dengan rubrik, atau ditandai selesai sebagai sebuah deliverable. Loop review juga masih terutama berasal dari dua sumber: pertanyaan quiz yang salah dan istilah glosarium. Dengan kata lain, sistem dapat menilai “pengguna mengingat jawaban”, tetapi belum bisa menunjukkan “pengguna mampu membuat runbook, data contract, PRD AI, workflow map, atau content provenance note”.

**Arah perbaikan:** buat **Project Evidence** dalam tiga level. Level pertama: checklist artefak sederhana per checkpoint. Level kedua: form/reflection terstruktur dengan rubrik 3–5 kriteria. Level ketiga: capstone portfolio per course yang menggabungkan artefak checkpoint. Fitur ini sebaiknya menyimpan metadata/teks pengguna sebagai bukti progres, bukan membuat ulasan atau testimoni palsu.

## Temuan 5 — Source map yang jelas perlu ditampilkan dalam UI

Research sudah mencatat registry sumber primer dan pemetaannya ke checkpoint. Materi juga menampilkan beberapa sumber. Yang belum ada adalah view ringkas yang membuat pengguna tahu “sumber mana dipakai untuk apa”, “video/dokumen mana sebaiknya dibuka dulu”, dan “materi mana yang didukung sumber ini”.

**Arah perbaikan:** tambahkan **Source Map** pada halaman Course Start dan/atau akhir Prolog. Tampilkan sumber primer, peran, checkpoint terkait, serta catatan bahwa dokumentasi dapat berubah. Tambahkan pemeriksaan tautan terjadwal hanya setelah kebutuhan periode pembaruan dan batas operasionalnya disepakati.

## Backlog prioritas

| Prioritas | Pekerjaan | Nilai pengguna | Ketergantungan | Ukuran implementasi |
|---|---|---|---|---|
| P0 | Perbaiki prioritas `AI Safety Builder` agar menunjuk Cyber Security intensif | Rekomendasi Cyber kembali akurat | Tidak ada | Kecil |
| P0 | Course Start Card + prerequisite map untuk delapan course utama | Mengurangi kebingungan memilih di katalog besar | Model metadata course | Sedang |
| P0 | Project Evidence checklist per checkpoint | Mengubah “membaca” menjadi bukti kerja | Kontrak progres + UI detail materi | Sedang |
| P1 | Perkaya 36 materi prioritas dengan contoh kerja, kesalahan umum, dan rubrik artefak | Menaikkan kedalaman terasa tanpa rewrite masif | Field konten baru | Sedang-besar |
| P1 | Source Map per course + indeks pencarian sumber/artefak | Menambah traceability dan discovery | Registry sumber runtime | Sedang |
| P1 | Rekomendasi lintas-course berbasis graph prasyarat | Jalur belajar terasa personal dan masuk akal | Metadata prerequisite | Sedang |
| P2 | Capstone portfolio dan reflection terstruktur | Bukti kompetensi yang lebih utuh | Project Evidence | Besar |
| P2 | Link-health monitoring dan perubahan versi sumber | Menjaga materi tetap relevan | Kebijakan jadwal/pembaruan | Sedang |

## Urutan yang direkomendasikan

Mulai dari **P0**: perbaiki pengenalan jalur Cyber Security di rekomendasi, lalu bangun Course Start Card dan Project Evidence checklist. Dua hal ini memberikan dampak terbesar terhadap orientasi dan progres nyata tanpa memaksa penulisan ulang 1.092 materi. Tahap berikutnya adalah memperdalam 36 materi prioritas dan menampilkan Source Map. Baru setelah itu capstone portfolio dan graph rekomendasi lintas-course dapat dibangun di atas fondasi yang sudah lebih terstruktur.

## Batas audit

Audit ini menguji struktur konten, logika discovery/rekomendasi, UI katalog, dan loop review yang ada di aplikasi. Validasi login lokal, unduhan ekspor JSON nyata, dialog reset konfirmasi, drawer Android pada perangkat pengguna, serta pemuatan hero/logo publik tetap membutuhkan pemeriksaan langsung di akun dan perangkat pengguna.
