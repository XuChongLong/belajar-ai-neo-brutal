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
