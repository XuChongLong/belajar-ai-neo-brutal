# Arah Desain — Belajar AI

## Tiga Arah Eksplorasi

### 1. Paper Playground
**Very Brief Intro:** Neo Brutalism editorial yang terasa seperti buku aktivitas digital: kertas putih hangat, hot pink, garis hitam tebal, stiker, dan layout asimetris. Energinya ceria tetapi tetap rapi untuk belajar.

**Probability:** 0.07

### 2. Studio Papan Tulis
**Very Brief Intro:** Ruang belajar digital dengan nuansa papan tulis, catatan tempel, dan coretan diagram. Lebih taktil dan eksperimental, dengan fokus pada proses memahami konsep.

**Probability:** 0.03

### 3. Pixel Lab
**Very Brief Intro:** Laboratorium AI bergaya arcade dengan warna kontras dan modul belajar seperti level permainan. Fokusnya lebih playful dan kompetitif, tetapi tetap memakai struktur materi yang jelas.

**Probability:** 0.08

## Arah Terpilih: Paper Playground

### Design Movement
Neo Brutalism editorial yang dipadukan dengan bahasa visual workbook edukasi, sehingga interface terasa seperti buku aktivitas yang bisa disentuh, bukan dashboard korporat.

### Core Principles
1. **Tegas dan mudah dipindai.** Border hitam 3px, shadow offset tanpa blur, dan hirarki heading yang besar membuat setiap bagian terbaca dalam sekali lihat.
2. **Ceria tanpa berisik.** Hot pink menjadi aksen utama, sementara putih dan hitam menjaga kontras serta fokus belajar.
3. **Asimetris dengan tujuan.** Layout memakai rail navigasi, kolom editorial, dan kartu yang sedikit bergeser agar halaman terasa hidup tanpa mengorbankan orientasi.
4. **Interaksi terasa fisik.** Tombol dan kartu bergeser saat hover/active seperti stiker yang ditekan.

### Color Philosophy
Hot pink `#FF2D9B` adalah energi dan ajakan untuk mulai. Putih `#FFFDF9` memberi ruang bernapas seperti kertas, sedangkan hitam `#1A1A1A` menjadi tinta yang menahan semua elemen agar tetap tajam. Blush pink `#FFF0F5` dipakai sebagai permukaan sekunder agar hierarki terlihat tanpa menambah palet yang berlebihan.

### Layout Paradigm
Desktop memakai sidebar tetap yang sempit, kemudian area utama dengan hero editorial dua kolom: teks tegas di kiri dan ilustrasi robot di kanan. Konten berikutnya memakai grid kartu yang tidak sepenuhnya simetris, dengan beberapa kartu diberi aksen posisi dan ukuran untuk meniru lembar aktivitas. Mobile mengubah sidebar menjadi drawer top bar dan mempertahankan alur satu kolom.

### Signature Elements
1. **Ink labels:** label uppercase kecil dengan border hitam dan background pink/putih.
2. **Sticker shapes:** lingkaran, bintang, dan tab miring sebagai aksen dekoratif yang bergerak pelan.
3. **Progress rail:** garis progress hitam dengan fill pink dan milestone berbentuk badge.

### Interaction Philosophy
Setiap aksi harus memberi umpan balik yang jelas: tombol terasa turun ketika ditekan, kartu terangkat ketika disorot, progress langsung berubah saat materi ditandai selesai, dan quiz memberi respons warna serta copy yang ramah. Tidak ada interaksi dekoratif yang menghalangi membaca.

### Animation
Entrance menggunakan slide-up kecil dan fade-in dengan stagger 40–60ms. Hover hanya mengubah transform dan shadow agar tetap ringan. Sparkle click dibatasi pada 8 partikel kecil dan dimatikan untuk `prefers-reduced-motion`. Toast muncul dari bawah dalam sekitar 220ms. Progress bar mengisi dengan easing snappy, sementara elemen dekoratif memakai float sangat pelan dan tidak berulang secara agresif.

### Typography System
Heading memakai **Space Grotesk** 700–800 untuk bentuk geometris yang berani. Body memakai **DM Sans** 400–600 agar paragraf panjang tetap nyaman. Label memakai Space Grotesk 700 uppercase dengan letter spacing 0.08em. Heading utama berkisar 56–76px desktop dan 40–48px mobile; body 16–18px dengan line-height 1.6.

### Brand Essence
Belajar AI yang memecah konsep rumit menjadi langkah-langkah kecil yang terasa seru untuk pemula dan anak muda — bukan kuliah teknis yang bikin ngantuk.

**Personality:** berani, ramah, penasaran.

### Brand Voice
Headline terdengar seperti teman yang mendorong kita mencoba. CTA konkret dan aktif, microcopy menjelaskan tanpa menggurui. Hindari jargon tanpa analogi.

**Contoh headline:** “AI nggak seseram yang kamu kira.”  
**Contoh CTA:** “Buka materi pertama”

### Wordmark & Logo
Wordmark memakai tulisan lowercase `belajar.ai` dengan titik pink sebagai “spark”, dipasangkan dengan simbol robot-book dari aset visual. Mark harus tetap terbaca sendiri sebagai favicon dan avatar aplikasi.

### Signature Brand Color
**Belajar Pink — `#FF2D9B`**, hot pink yang dipakai sebagai aksen progres, CTA, highlight, dan momen reward.

## Style Decisions

- Semua halaman mempertahankan latar kertas putih hangat, border hitam tebal, dan shadow offset tanpa blur.
- Ilustrasi generated asset hanya dipakai pada area hero, dashboard learning path, dan texture dekoratif agar setiap visual punya fungsi berbeda.
- Motion non-esensial harus menghormati `prefers-reduced-motion`.
- Wordmark `belajar.ai` dengan titik pink sebagai spark menjadi jangkar identitas yang hadir di rail desktop dan header mobile.
- Palet utama diprioritaskan pada pink, hitam, putih kertas, dan blush; kuning hanya dipakai sebagai sticky note atau reward.
- Daftar materi panjang memakai pemisah kategori berbentuk tab/stiker dan setiap ringkasan kartu memakai copy yang berbeda.
