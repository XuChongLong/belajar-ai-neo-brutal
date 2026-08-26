# QA Visual — Course Start dan Source Map

## 2026-08-26

Katalog **Cloud Computing AI** diperiksa pada viewport desktop 1280×720 dan Android 390×844 melalui halaman `/materi?jurusan=cloud-devops`.

Course Start muncul sebelum kartu checkpoint, menampilkan alasan memilih jalur, prasyarat praktis, outcome, estimasi waktu, artefak capstone, CTA ke Prolog, serta kartu persiapan lintas-course. Source Map tampil tepat setelahnya sebagai kartu tautan berlabel yang memuat catatan dan checkpoint terkait. Kedua blok tidak menunjukkan overflow horizontal pada screenshot Android; grid berubah menjadi satu kolom dan CTA tetap terlihat.

Pemeriksaan interaksi detail, portfolio, dan deployment publik tetap menjadi bagian QA akhir setelah semua fitur diselesaikan.

## Project Evidence dan Portfolio — desktop

Halaman `/materi/5000` menampilkan blok **Project Evidence · Privat** pada pembuka checkpoint Cloud, setelah konteks pembelajaran dan sebelum sumber/kuis. Checklist dan area refleksi tampak terpisah jelas dengan tautan ke portfolio.

Halaman `/portfolio?jurusan=cloud-devops` menampilkan penegasan privasi, pemilih course, tujuan artefak capstone, indikator checkpoint yang sudah memiliki bukti, editor ringkasan pribadi, dan daftar checkpoint yang tetap nonaktif sampai evidence benar-benar diisi. Tidak ada ulasan/rating/testimonial buatan pada tampilan ini.

## Source Map lintas-course — desktop

Katalog `/materi?jurusan=data-engineering` dan `/materi?jurusan=ai-security` sama-sama menampilkan Course Start lalu Source Map sebelum kartu checkpoint. Kedua track memiliki kartu sumber berlabel beserta checkpoint yang terkait, dan tidak ada Source Map kosong pada render desktop.

## QA Android — evidence dan portfolio

Pembaca `/materi/5012` menampilkan contoh kerja prioritas dan Project Evidence sebagai blok bertumpuk yang tidak overflow pada viewport 390×844. Namun halaman `/portfolio?jurusan=cloud-devops` masih mempertahankan susunan dua kolom desktop pada Android sehingga editor berada jauh di luar area awal viewport. Perlu media query khusus Portfolio sebelum rilis.

Perbaikan responsif telah diverifikasi ulang pada `/portfolio?jurusan=cloud-devops`: ringkasan capstone, editor, dan daftar bukti kini tersusun satu kolom pada 390×844, tanpa area kosong besar atau overflow horizontal.

## Pemeriksaan deployment publik

Sesaat setelah checkpoint `0bea4d9c`, URL publik cache-busted `/portfolio?jurusan=cloud-devops&release=0bea4d9c` masih merender 404 dari bundle lama. App shell termuat, sehingga ini dicatat sebagai kemungkinan jeda propagasi deployment; URL perlu diperiksa kembali sebelum menyatakan QA publik selesai.

Pemeriksaan ulang setelah jeda masih menunjukkan 404 pada Portfolio, sementara beranda publik tetap berisi katalog 1.092 materi dari bundle sebelumnya. Verifikasi publik tidak dinyatakan selesai dan perlu diulang setelah propagasi hosting benar-benar berganti ke checkpoint `0bea4d9c`.

Setelah notifikasi deployment berhasil, pemeriksaan cache-busted publik akhirnya memuat `/portfolio?jurusan=cloud-devops` dengan pilihan tujuh course, editor privat, dan daftar evidence. URL `/materi?jurusan=cloud-devops` juga memuat Course Start, kartu prerequisite yang bersifat opsional, CTA Prolog, serta tujuh kartu Source Map. Propagasi rilis `0bea4d9c` telah tervalidasi publik.

Pada katalog publik Cloud, input pencarian kaya tersedia bersama filter checkpoint; regresi otomatis sudah membuktikan istilah artefak `Production Readiness Pack` dan metadata sumber `Well Architected` menemukan materi Cloud melalui indeks Course Journey/sumber. Percobaan input browser dilakukan pada input katalog publik sebagai bagian QA interaksi akhir.

## QA pencarian kaya — desktop dan Android

Dengan query URL yang dapat dibagikan, `/materi?jurusan=cloud-devops&q=Production%20Readiness%20Pack` di desktop memfilter katalog menjadi satu materi pembuka course dan menampilkan label hasil dari **arah course**. Pada Android, query `/materi?jurusan=cloud-devops&q=Terraform%20Documentation` memfilter materi yang memakai metadata sumber Terraform; kartu checkpoint tetap bertumpuk satu kolom tanpa overflow horizontal. Kedua hasil memperlihatkan bahwa pencarian artefak maupun sumber benar-benar mengubah katalog, bukan hanya memasukkan teks ke input.

Checkpoint `87bcae5f` juga membawa helper filter katalog dan test exact result. Dua pemeriksaan DOM publik awal masih memperlihatkan bundle sebelumnya dengan 156 materi untuk query capstone; hal ini dicatat sebagai jeda propagasi rilis kedua, bukan dipakai sebagai bukti QA berhasil. Verifikasi publik query perlu diulang saat hosting telah berganti bundle.

Setelah propagasi `87bcae5f` selesai, DOM publik pada `/materi?jurusan=cloud-devops&q=Production%20Readiness%20Pack` menunjukkan input berisi query, **Menampilkan 1 materi dalam 1 checkpoint**, label **arah course**, dan hanya kartu `Prolog.1 · Apa yang Dimaksud Cloud Computing`. Ini menjadi bukti UI publik bahwa filter artefak capstone bekerja nyata.

DOM publik pada `/materi?jurusan=cloud-devops&q=Terraform%20Documentation` menunjukkan input berisi query, **Menampilkan 36 materi dalam 3 checkpoint**, label **sumber**, serta hasil yang dimulai dari Bab 6 Infrastructure as Code dan melanjut ke checkpoint terkait. Ini membuktikan metadata sumber memfilter daftar materi publik, bukan sekadar memberi hasil teks statis.

Karena runner screenshot tidak mempertahankan posisi hash setelah hidrasi, bukti Android tetap berupa viewport 390×844 tanpa overflow ditambah regresi integrasi. Halaman `Materials` sekarang memanggil `filterCatalogMaterials` secara langsung; test memastikan query `q=Production Readiness Pack` menghasilkan tepat materi `5000`, sedangkan `q=Terraform Documentation` menghasilkan 36 materi hanya dari Bab 6, 7, dan 12. Seluruh 113 test lulus.

Test komponen `Materials.test.tsx` kini dirender dengan jsdom dan memeriksa teks hasil serta kartu yang tampil: query capstone menghasilkan satu kartu `5000` tanpa `5001`, sedangkan query Terraform menghasilkan checkpoint sumber dengan kartu `5072` dan `5144` tanpa Prolog `5000`. Konfigurasi Vitest diperluas untuk benar-benar mengoleksi test TSX; suite terakhir mencatat 38 file dan 115 test lulus. Screenshot viewport Android 390×844 tetap memeriksa kerapatan layout query tanpa overflow horizontal.
