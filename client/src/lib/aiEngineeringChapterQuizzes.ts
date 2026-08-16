export type ChapterQuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type ChapterQuiz = {
  chapter: number;
  title: string;
  intro: string;
  questions: ChapterQuizQuestion[];
};

export const aiEngineeringChapterQuizzes: Record<number, ChapterQuiz> = {
  1: { chapter: 1, title: "Uji pemahaman Bab 1", intro: "Uji apakah kamu dapat memilih masalah AI yang layak sebelum memilih teknologi.", questions: [
    { question: "Mengapa tim perlu memetakan risiko sebelum memilih model?", options: ["Agar masalah, dampak salah, dan kontrol manusia dapat ditentukan lebih dahulu", "Agar selalu dapat memakai model terbesar", "Agar UI tidak perlu dirancang"], answer: 0, explanation: "Benar. Pemilihan model harus mengikuti masalah, risiko, dan kontrol yang dibutuhkan." },
    { question: "Use case awal yang paling sehat biasanya memiliki ciri…", options: ["Bernilai, berulang, memiliki data cukup, dan hasilnya dapat ditinjau", "Paling viral walau tidak jelas manfaatnya", "Langsung memberi tindakan keuangan tanpa review"], answer: 0, explanation: "Mulai dari tugas bernilai tetapi mudah ditinjau atau dibatalkan." },
    { question: "Perbedaan utama demo dan sistem produksi adalah…", options: ["Sistem produksi menangani variasi, kegagalan, keamanan, serta evaluasi", "Demo selalu memakai model lebih kecil", "Sistem produksi tidak memerlukan pengguna"], answer: 0, explanation: "Demo membuktikan kemungkinan; produksi harus dapat dipercaya dalam kondisi nyata." }
  ] },
  2: { chapter: 2, title: "Uji pemahaman Bab 2", intro: "Periksa pemahaman tentang perilaku foundation model dan batas konteks.", questions: [
    { question: "Mengapa jawaban model yang lancar belum tentu benar?", options: ["Model memprediksi kelanjutan token dan dapat menghasilkan klaim tanpa bukti", "Model selalu membuka basis fakta resmi", "Tata bahasa yang baik menjamin kebenaran"], answer: 0, explanation: "Kefasihan bukan bukti. Aplikasi perlu konteks, sumber, dan pemeriksaan." },
    { question: "Cara terbaik memakai context window adalah…", options: ["Memilih bukti relevan, terbaru, aman, dan terstruktur", "Mengirim seluruh dokumen tanpa seleksi", "Menghapus pertanyaan pengguna"], answer: 0, explanation: "Konteks merupakan anggaran; informasi yang tepat lebih penting daripada volume." },
    { question: "Respons aman ketika bukti tidak tersedia adalah…", options: ["Menyatakan keterbatasan dan mengarahkan pengguna ke jalur verifikasi", "Mengisi jawaban dengan perkiraan yakin", "Menambah temperature agar kreatif"], answer: 0, explanation: "Desain sistem harus memungkinkan tidak menjawab ketika tidak ada dasar yang cukup." }
  ] },
  3: { chapter: 3, title: "Uji pemahaman Bab 3", intro: "Periksa cara mendefinisikan kualitas dan membaca kegagalan secara sistematis.", questions: [
    { question: "Apa fungsi utama dataset evaluasi?", options: ["Mewakili penggunaan serta risiko nyata untuk menguji sistem secara konsisten", "Membuat model terlihat bagus pada contoh mudah", "Menggantikan semua penilaian manusia"], answer: 0, explanation: "Dataset evaluasi harus mencakup variasi normal, sulit, ambigu, dan berisiko." },
    { question: "Kapan rubrik manusia diperlukan?", options: ["Saat kualitas bersifat kontekstual dan tidak cukup diukur oleh satu angka", "Hanya ketika server mati", "Tidak pernah, karena metrik otomatis selalu lengkap"], answer: 0, explanation: "Rubrik membantu menilai kualitas seperti keterbacaan, groundedness, dan manfaat." },
    { question: "Langkah tepat setelah menemukan banyak jawaban buruk adalah…", options: ["Mengelompokkan pola kegagalan lalu menguji penyebabnya", "Langsung mengganti model tanpa bukti", "Menghapus semua log"], answer: 0, explanation: "Error analysis mengubah keluhan umum menjadi hipotesis yang dapat diuji." }
  ] },
  4: { chapter: 4, title: "Uji pemahaman Bab 4", intro: "Uji disiplin eksperimen dan keputusan rilis berbasis evaluasi.", questions: [
    { question: "Mengapa versi prompt, model, dan dataset perlu dicatat bersama?", options: ["Agar hasil eksperimen dapat diulang dan perubahan dapat dijelaskan", "Agar tim dapat mengubah semuanya sekaligus", "Agar tidak perlu membaca contoh keluaran"], answer: 0, explanation: "Versioning adalah dasar perbandingan yang dapat dipercaya." },
    { question: "Apa peran evaluasi online?", options: ["Memeriksa dampak nyata pada alur kerja setelah rilis terbatas", "Menggantikan evaluasi offline", "Hanya mengukur uptime"], answer: 0, explanation: "Offline menjadi pagar sebelum rilis; online memeriksa manfaat dan risiko penggunaan nyata." },
    { question: "Kasus penting dari insiden sebaiknya…", options: ["Ditambahkan ke regression suite setelah perilaku benar didefinisikan", "Dibiarkan di chat tim", "Dihapus agar skor tampak tinggi"], answer: 0, explanation: "Kasus insiden adalah aset pembelajaran untuk mencegah regresi." }
  ] },
  5: { chapter: 5, title: "Uji pemahaman Bab 5", intro: "Periksa spesifikasi prompt, output terstruktur, dan pertahanan terhadap injection.", questions: [
    { question: "Prompt yang sehat diperlakukan sebagai…", options: ["Spesifikasi perilaku yang dapat dibaca, diberi versi, dan diuji", "Kalimat ajaib yang tidak perlu diuji", "Pengganti seluruh kontrol aplikasi"], answer: 0, explanation: "Prompt adalah satu komponen sistem dan perlu dievaluasi." },
    { question: "Mengapa structured output tetap perlu validator aplikasi?", options: ["Model dapat menghasilkan format atau nilai yang tidak valid", "JSON selalu pasti benar", "Validator hanya diperlukan untuk UI"], answer: 0, explanation: "Aplikasi tetap harus memeriksa sintaks, tipe, rentang, dan aturan bisnis." },
    { question: "Pertahanan terpenting terhadap prompt injection adalah…", options: ["Batas otorisasi, pemisahan data, dan validasi tool secara berlapis", "Meminta model untuk selalu patuh", "Menghapus semua dokumen"], answer: 0, explanation: "Keselamatan ditentukan oleh desain aplikasi, bukan janji model." }
  ] },
  6: { chapter: 6, title: "Uji pemahaman Bab 6", intro: "Uji pemahaman tentang context engineering, RAG, dan pilihan agent.", questions: [
    { question: "Masalah utama yang diselesaikan RAG adalah…", options: ["Akses ke informasi yang berubah, privat, atau perlu disertai sumber", "Menghilangkan kebutuhan evaluasi", "Membuat semua respons kreatif"], answer: 0, explanation: "RAG memberi bukti eksternal saat pertanyaan diajukan." },
    { question: "Mengapa chunking perlu diuji pada pertanyaan nyata?", options: ["Ukuran potongan memengaruhi apakah aturan dan pengecualian diambil bersama", "Karena semua dokumen harus dipotong sama panjang", "Agar model tidak perlu konteks"], answer: 0, explanation: "Chunk yang baik mengikuti makna yang perlu dipakai bersama." },
    { question: "Kapan workflow deterministik lebih baik daripada agent?", options: ["Saat urutan tindakan sudah diketahui dan perlu mudah diaudit", "Saat tim ingin sistem lebih rumit", "Saat tidak ada tool yang digunakan"], answer: 0, explanation: "Agent layak ketika pemilihan langkah dinamis benar-benar memberi nilai." }
  ] },
  7: { chapter: 7, title: "Uji pemahaman Bab 7", intro: "Periksa keputusan adaptasi model dan kesiapan data finetuning.", questions: [
    { question: "Sebelum mempertimbangkan finetuning, tim sebaiknya…", options: ["Membuktikan batas prompt, konteks, atau model melalui baseline evaluasi", "Langsung melatih dengan semua chat historis", "Menghapus set evaluasi"], answer: 0, explanation: "Finetuning bukan pilihan awal otomatis." },
    { question: "Data SFT yang baik perlu berisi…", options: ["Contoh legal, relevan, ditinjau, dan dipisahkan dari evaluasi", "Jawaban acak tanpa konteks", "Semua data pribadi pengguna"], answer: 0, explanation: "Kualitas dan provenance data menentukan perilaku yang dipelajari." },
    { question: "Mengapa PEFT/LoRA tetap perlu evaluasi target?", options: ["Penghematan sumber daya tidak menjamin kualitas pada tugas penting", "Teknik ringan selalu lebih baik", "Evaluasi hanya untuk pelatihan penuh"], answer: 0, explanation: "Keputusan teknik harus mengikuti kualitas, risiko, dan kebutuhan produk." }
  ] },
  8: { chapter: 8, title: "Uji pemahaman Bab 8", intro: "Uji provenance, kualitas, dan pemrosesan data untuk sistem AI.", questions: [
    { question: "Peta data membantu tim mengetahui…", options: ["Asal, izin, owner, aliran, dan retensi data", "Hanya ukuran file data", "Model terbesar yang tersedia"], answer: 0, explanation: "Data yang dapat ditelusuri lebih mudah diperbarui dan dipertanggungjawabkan." },
    { question: "Tujuan annotation guideline adalah…", options: ["Membuat label cukup konsisten antarpenilai", "Mempercepat pemberian label tanpa standar", "Menggantikan review kasus ambigu"], answer: 0, explanation: "Definisi, contoh batas, dan eskalasi membantu menjaga konsistensi." },
    { question: "Mengapa train dan evaluasi perlu dipisah dengan hati-hati?", options: ["Agar skor tidak meningkat palsu karena kebocoran atau duplikasi", "Agar semua data selalu dibuang", "Supaya model tidak belajar sama sekali"], answer: 0, explanation: "Evaluasi harus mewakili kemampuan pada data yang belum dilihat." }
  ] },
  9: { chapter: 9, title: "Uji pemahaman Bab 9", intro: "Periksa trade-off performa, biaya, dan kapasitas layanan AI.", questions: [
    { question: "Mengapa p95 latency perlu dipantau selain rata-rata?", options: ["Rata-rata dapat menyembunyikan pengalaman pengguna yang paling lambat", "P95 selalu lebih kecil dari rata-rata", "Biaya tidak terkait latency"], answer: 0, explanation: "Pengalaman buruk di ekor distribusi tetap penting bagi pengguna." },
    { question: "Model routing yang baik seharusnya…", options: ["Mencocokkan kelas tugas dengan kualitas, risiko, waktu, dan biaya", "Selalu memilih model paling mahal", "Tidak perlu diuji"], answer: 0, explanation: "Router adalah komponen keputusan yang harus dievaluasi." },
    { question: "Budget guardrail diperlukan untuk…", options: ["Menetapkan quota, alarm, dan fallback sebelum biaya atau kapasitas melewati batas", "Membuat semua fitur lebih lambat", "Menghapus semua model"], answer: 0, explanation: "Guardrail menjaga nilai produk saat penggunaan meningkat." }
  ] },
  10: { chapter: 10, title: "Uji pemahaman Bab 10", intro: "Satukan arsitektur, observability, feedback, dan respons insiden.", questions: [
    { question: "Mengapa arsitektur perlu memisahkan tanggung jawab?", options: ["Agar akses, konteks, model, dan diagnosis dapat diuji serta dirawat", "Agar komponen sebanyak mungkin", "Agar tidak ada owner sistem"], answer: 0, explanation: "Setiap komponen harus memiliki alasan dan kontrak yang jelas." },
    { question: "Observability yang aman perlu menyeimbangkan…", options: ["Bukti untuk diagnosis dengan privasi, masking, retensi, dan akses", "Log sebanyak mungkin tanpa batas", "Tidak mencatat sinyal apa pun"], answer: 0, explanation: "Log harus membantu perbaikan tanpa menjadi salinan sensitif percakapan." },
    { question: "Blueprint aplikasi AI yang baik harus menyebutkan…", options: ["Asumsi, batas, metrik, kontrol risiko, dan eksperimen berikutnya", "Hanya nama model", "Janji bahwa sistem tidak pernah gagal"], answer: 0, explanation: "Blueprint adalah rencana yang dapat dikritik dan dibangun bertahap." }
  ] },
};
