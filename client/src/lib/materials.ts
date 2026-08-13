// Style reminder: Paper Playground — clear editorial hierarchy, ink-black borders, hot-pink accents, and friendly Indonesian copy.

export type MaterialLevel = "Pemula" | "Menengah" | "Lanjut";

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type Material = {
  id: number;
  title: string;
  category: string;
  level: MaterialLevel;
  minutes: number;
  emoji: string;
  summary: string;
  analogy: string;
  sections: { heading: string; body: string }[];
  quiz: QuizQuestion[];
};

const categoryMeta: Record<string, { emoji: string; level: MaterialLevel }> = {
  "Dasar-Dasar AI": { emoji: "✦", level: "Pemula" },
  "Large Language Models": { emoji: "⌁", level: "Menengah" },
  "RAG & Teknik Lanjutan": { emoji: "⌗", level: "Menengah" },
  "AI Agents & Tools": { emoji: "⚙", level: "Lanjut" },
};

const titles: { title: string; minutes: number; category: string }[] = [
  { title: "Apa Itu Artificial Intelligence (AI)?", minutes: 5, category: "Dasar-Dasar AI" },
  { title: "Sejarah Singkat AI: Dari Turing Sampai ChatGPT", minutes: 7, category: "Dasar-Dasar AI" },
  { title: "Jenis-Jenis AI: Narrow, General, dan Super AI", minutes: 6, category: "Dasar-Dasar AI" },
  { title: "Machine Learning vs Deep Learning vs AI — Apa Bedanya?", minutes: 8, category: "Dasar-Dasar AI" },
  { title: "Bagaimana AI Belajar? Konsep Training Data", minutes: 6, category: "Dasar-Dasar AI" },
  { title: "Neural Network: Otak Buatan yang Meniru Manusia", minutes: 7, category: "Dasar-Dasar AI" },
  { title: "Supervised vs Unsupervised vs Reinforcement Learning", minutes: 8, category: "Dasar-Dasar AI" },
  { title: "Dataset dan Labeling: Makanan Utama AI", minutes: 5, category: "Dasar-Dasar AI" },
  { title: "Overfitting dan Underfitting", minutes: 6, category: "Dasar-Dasar AI" },
  { title: "AI dalam Kehidupan Sehari-hari: Contoh Nyata", minutes: 5, category: "Dasar-Dasar AI" },
  { title: "Apa Itu Large Language Model (LLM)?", minutes: 7, category: "Large Language Models" },
  { title: "Transformer Architecture: Fondasi di Balik ChatGPT", minutes: 10, category: "Large Language Models" },
  { title: "Tokenisasi: Bagaimana AI Membaca Teks", minutes: 6, category: "Large Language Models" },
  { title: "Attention Mechanism: Perhatian yang Bikin AI Pintar", minutes: 8, category: "Large Language Models" },
  { title: "Pre-training vs Fine-tuning: Dua Fase Belajar LLM", minutes: 7, category: "Large Language Models" },
  { title: "Prompt Engineering: Seni Berbicara dengan AI", minutes: 8, category: "Large Language Models" },
  { title: "Temperature, Top-K, Top-P: Mengatur Kreativitas AI", minutes: 6, category: "Large Language Models" },
  { title: "Hallucination pada AI: Ketika AI Ngarang", minutes: 5, category: "Large Language Models" },
  { title: "Open Source vs Closed Source LLM", minutes: 7, category: "Large Language Models" },
  { title: "Context Window: Batas Memori AI", minutes: 5, category: "Large Language Models" },
  { title: "Apa Itu RAG (Retrieval-Augmented Generation)?", minutes: 8, category: "RAG & Teknik Lanjutan" },
  { title: "Vector Database: Gudang Pengetahuan AI", minutes: 7, category: "RAG & Teknik Lanjutan" },
  { title: "Embedding: Mengubah Teks Jadi Angka", minutes: 8, category: "RAG & Teknik Lanjutan" },
  { title: "Chunking Strategy: Memotong Dokumen untuk AI", minutes: 6, category: "RAG & Teknik Lanjutan" },
  { title: "Semantic Search vs Keyword Search", minutes: 6, category: "RAG & Teknik Lanjutan" },
  { title: "RAG Pipeline: Dari Dokumen Sampai Jawaban", minutes: 9, category: "RAG & Teknik Lanjutan" },
  { title: "Evaluasi RAG: Faithfulness, Relevancy, dan Recall", minutes: 7, category: "RAG & Teknik Lanjutan" },
  { title: "Apa Itu AI Agent? Dari Chatbot ke Asisten Pintar", minutes: 7, category: "AI Agents & Tools" },
  { title: "Function Calling: Ketika AI Bisa Pakai Tools", minutes: 8, category: "AI Agents & Tools" },
  { title: "Multi-Agent System: Tim AI yang Bekerja Bareng", minutes: 8, category: "AI Agents & Tools" },
  { title: "Memory pada AI Agent: Short-term vs Long-term", minutes: 6, category: "AI Agents & Tools" },
  { title: "AI Safety dan Alignment: Menjaga AI Tetap Aman", minutes: 7, category: "AI Agents & Tools" },
  { title: "Masa Depan AI: AGI, Regulasi, dan Dampak Sosial", minutes: 8, category: "AI Agents & Tools" },
];

const quickSummaries = [
  "Peta pertama untuk memahami apa yang sebenarnya dilakukan AI di balik aplikasi yang kamu pakai setiap hari.",
  "Perjalanan AI dari ide di atas kertas sampai jadi teman ngobrol yang ada di ponsel kita.",
  "Kenalan dengan tiga level kemampuan AI—dan kenapa kebanyakan AI hari ini masih sangat spesifik.",
  "Bedah tiga istilah yang sering tertukar, pakai contoh belajar yang gampang dibayangkan.",
  "Lihat cara model menemukan pola dari contoh, seperti anak magang yang terus menerima feedback.",
  "Intip ‘otak’ buatan yang tersusun dari lapisan-lapisan kecil untuk membaca pola.",
  "Tiga cara belajar yang berbeda: dengan kunci jawaban, tanpa kunci, atau lewat hadiah dan konsekuensi.",
  "Kenapa dataset itu seperti bahan masakan—dan labeling bisa menentukan rasa akhirnya.",
  "Saat model terlalu hafal latihan atau justru belum menangkap polanya, di sinilah masalahnya.",
  "Contoh AI yang mungkin sudah membantu memilih lagu, foto, rute, dan tulisanmu hari ini.",
  "Bahasa sederhana untuk memahami mesin yang memprediksi kata berikutnya dengan skala sangat besar.",
  "Arsitektur yang membuat model bisa melihat hubungan antarbagian kalimat tanpa membaca satu-satu.",
  "Cara kalimat dipecah menjadi potongan kecil sebelum bisa diproses oleh model bahasa.",
  "Mekanisme yang membantu model memutuskan bagian mana dari konteks yang paling perlu diperhatikan.",
  "Kenapa model perlu belajar umum dulu, lalu dilatih lebih spesifik untuk kebutuhan tertentu.",
  "Cara menulis instruksi yang lebih jelas supaya AI terasa seperti rekan satu tim, bukan mesin tebak-tebakan.",
  "Kenalan dengan knop kecil yang mengatur apakah jawaban AI terasa fokus atau lebih eksploratif.",
  "Kenapa AI kadang terdengar meyakinkan padahal sedang mengisi celah dengan jawaban yang salah.",
  "Membandingkan model terbuka dan tertutup tanpa terjebak perang istilah atau fanboy.",
  "Batas seberapa banyak konteks yang bisa ‘diingat’ model dalam satu percakapan.",
  "Cara memberi model catatan yang relevan sebelum ia menyusun jawaban untuk kita.",
  "Kenapa pencarian biasa belum cukup ketika aplikasi perlu menemukan makna, bukan hanya kata.",
  "Jembatan yang mengubah kalimat menjadi posisi angka agar komputer bisa membandingkan kemiripan.",
  "Seni memotong dokumen menjadi potongan yang pas: tidak terlalu pendek, tidak terlalu berantakan.",
  "Bedakan pencarian berdasarkan kata yang sama dengan pencarian berdasarkan maksud yang mirip.",
  "Ikuti perjalanan lengkap RAG dari dokumen mentah sampai jawaban yang bisa dicek.",
  "Cara mengecek apakah jawaban RAG setia pada sumber, relevan, dan benar-benar menemukan yang dibutuhkan.",
  "Dari chatbot yang menunggu perintah menjadi asisten yang bisa merencanakan langkah berikutnya.",
  "Saat model bisa memanggil kalkulator, database, atau API untuk menyelesaikan tugas nyata.",
  "Bayangkan beberapa agen AI dengan peran berbeda yang bekerja seperti tim kecil.",
  "Apa yang perlu disimpan oleh agent agar percakapan terasa nyambung tanpa mengingat semuanya.",
  "Prinsip agar sistem AI tetap bisa diawasi, dipahami, dan diarahkan ke dampak yang baik.",
  "Membaca masa depan AI dengan rasa penasaran, tapi tetap membawa kacamata kritis dan manusiawi.",
];

const specialContent: Record<number, Pick<Material, "summary" | "analogy" | "sections" | "quiz">> = {
  1: {
    summary: "AI adalah cara membuat komputer melakukan tugas yang biasanya membutuhkan kecerdasan manusia: mengenali pola, memahami bahasa, belajar dari contoh, lalu mengambil keputusan.",
    analogy: "Bayangkan AI seperti anak magang super cepat. Ia tidak otomatis tahu segalanya, tetapi bisa belajar dari banyak contoh dan aturan yang kita berikan.",
    sections: [
      { heading: "AI bukan robot yang punya pikiran sendiri", body: "AI adalah kumpulan metode, data, dan komputer yang bekerja bersama untuk menemukan pola. Saat aplikasi mengenali wajah, merekomendasikan lagu, atau membantu menulis, biasanya ada model AI di belakangnya." },
      { heading: "Tiga bahan utama", body: "Model adalah resepnya, data adalah contoh makanannya, dan komputasi adalah dapurnya. Semakin tepat ketiganya dipadukan, semakin berguna hasil AI—tetapi hasilnya tetap perlu diperiksa manusia." },
      { heading: "Mulai dari pertanyaan sederhana", body: "Saat mempelajari AI, jangan mulai dari rumus. Mulailah dari pertanyaan: pola apa yang ingin ditemukan, contoh apa yang tersedia, dan keputusan apa yang ingin dibantu?" },
    ],
    quiz: [
      { question: "AI biasanya belajar dengan cara…", options: ["Menerka tanpa contoh", "Mengenali pola dari data", "Membaca pikiran manusia"], answer: 1, explanation: "Betul. Data membantu model menemukan pola untuk menghasilkan prediksi atau keputusan." },
      { question: "Mana yang termasuk contoh AI?", options: ["Rekomendasi lagu", "Kabel charger", "Meja belajar"], answer: 0, explanation: "Rekomendasi lagu menggunakan pola dari kebiasaan dan preferensi pengguna." },
    ],
  },
  5: {
    summary: "Training data adalah kumpulan contoh yang dipakai model untuk menemukan pola. Kualitas dan keberagaman contoh sangat memengaruhi perilaku AI.",
    analogy: "Kalau kamu ingin belajar membedakan kucing dan anjing, kamu butuh banyak foto dengan jawaban yang jelas. Itulah peran training data.",
    sections: [
      { heading: "Contoh adalah guru model", body: "Model tidak membaca maksud manusia seperti kita. Ia memproses contoh, mencari pola, lalu menyesuaikan parameter internalnya agar prediksi berikutnya lebih tepat." },
      { heading: "Data yang bias menghasilkan AI yang bias", body: "Jika contoh latihan hanya mewakili satu kelompok, model bisa bekerja baik di situ tetapi keliru di situasi lain. Karena itu, data perlu relevan, cukup beragam, dan diperiksa." },
      { heading: "Training bukan sulap", body: "Proses training adalah eksperimen berulang: model memprediksi, dibandingkan dengan jawaban, lalu diperbaiki sedikit demi sedikit. Setelah itu, model diuji dengan contoh yang belum pernah dilihat." },
    ],
    quiz: [
      { question: "Fungsi utama training data adalah…", options: ["Menghias tampilan aplikasi", "Memberi contoh untuk menemukan pola", "Mematikan model"], answer: 1, explanation: "Training data memberi model contoh sehingga ia bisa belajar pola." },
      { question: "Kenapa data perlu beragam?", options: ["Agar file lebih besar", "Agar model tidak hanya jago di satu situasi", "Agar warna layar berubah"], answer: 1, explanation: "Data beragam membantu model menghadapi variasi nyata dengan lebih adil." },
    ],
  },
  16: {
    summary: "Prompt engineering adalah seni menyusun instruksi yang jelas, kontekstual, dan punya tujuan agar AI bisa membantu dengan lebih konsisten.",
    analogy: "Prompt itu seperti brief untuk teman satu tim. Semakin jelas tujuan, format, dan batasannya, semakin kecil kemungkinan hasilnya melenceng.",
    sections: [
      { heading: "Prompt yang baik punya konteks", body: "Jelaskan siapa pembacanya, apa tujuan akhirnya, dan informasi apa yang boleh digunakan. Konteks membuat AI memahami situasi sebelum menjawab." },
      { heading: "Minta format yang bisa dicek", body: "Daripada hanya berkata ‘buatkan ide’, minta lima ide dalam tabel dengan kolom masalah, solusi, dan alasan. Format membantu kamu membandingkan hasil." },
      { heading: "Iterasi adalah bagian dari proses", body: "Prompt pertama tidak harus sempurna. Tinjau hasilnya, cari bagian yang kurang, lalu perbaiki instruksi secara bertahap seperti mengedit brief." },
    ],
    quiz: [
      { question: "Prompt yang lebih membantu biasanya memiliki…", options: ["Tujuan dan konteks", "Kata-kata acak", "Instruksi yang sengaja kabur"], answer: 0, explanation: "Tujuan dan konteks memberi arah yang lebih jelas untuk model." },
      { question: "Kenapa format output penting?", options: ["Supaya hasil lebih mudah dicek", "Supaya AI lupa konteks", "Supaya jawaban selalu pendek"], answer: 0, explanation: "Format yang diminta membuat hasil lebih mudah dipakai dan dibandingkan." },
    ],
  },
  21: {
    summary: "RAG menggabungkan pencarian dokumen dengan generasi jawaban agar model bisa menjawab berdasarkan sumber yang relevan, bukan hanya mengandalkan ingatan parameternya.",
    analogy: "RAG seperti siswa yang membuka catatan sebelum menjawab ujian. Ia mencari halaman yang relevan, lalu merangkumnya menjadi jawaban.",
    sections: [
      { heading: "Kenapa RAG dibutuhkan?", body: "Model bahasa bisa terdengar yakin walau informasinya tidak tepat. RAG memberi model konteks dari dokumen yang lebih segar atau lebih spesifik." },
      { heading: "Empat langkah ringkas", body: "Dokumen dipecah menjadi potongan, diubah menjadi embedding, dicari potongan yang paling dekat dengan pertanyaan, lalu disisipkan ke prompt sebelum model menjawab." },
      { heading: "RAG bukan jaminan otomatis", body: "Jawaban masih perlu dievaluasi. Jika potongan dokumennya salah, terlalu pendek, atau tidak relevan, jawaban akhir juga dapat meleset." },
    ],
    quiz: [
      { question: "RAG menggabungkan…", options: ["Pencarian dan generasi", "Kamera dan speaker", "Game dan musik"], answer: 0, explanation: "Retrieval mengambil konteks, generation menyusun jawaban dari konteks tersebut." },
      { question: "RAG membantu mengurangi…", options: ["Ukuran layar", "Jawaban tanpa sumber yang relevan", "Kecepatan mengetik"], answer: 1, explanation: "RAG memberikan konteks tambahan agar jawaban lebih grounded." },
    ],
  },
};

export const materials: Material[] = titles.map((item, index) => {
  const id = index + 1;
  const meta = categoryMeta[item.category];
  const content = specialContent[id] ?? {
    summary: quickSummaries[id - 1],
    analogy: "Anggap konsep ini seperti toolkit: pahami fungsi tiap alat dulu, baru pilih alat yang cocok untuk masalahmu.",
    sections: [
      { heading: "Inti konsepnya", body: `Materi ini membantu kamu melihat bagaimana ${item.title.toLowerCase()} bekerja dalam ekosistem AI modern. Fokus pada hubungan antarbagian, bukan sekadar istilah.` },
      { heading: "Kenapa ini penting?", body: "Konsep yang terlihat rumit biasanya menjadi lebih ringan ketika dihubungkan dengan contoh sehari-hari. Coba cari satu situasi nyata yang mirip dengan ide di materi ini." },
      { heading: "Catatan kecil", body: "Tidak apa-apa kalau belum langsung hafal. Tandai bagian yang ingin kamu ulangi, lalu lanjutkan sedikit demi sedikit agar rasa penasaran tetap hidup." },
    ],
    quiz: [
      { question: `Apa fokus utama materi “${item.title}”?`, options: ["Memahami konsep dan kegunaannya", "Menghafal semua kode", "Menghindari semua teknologi"], answer: 0, explanation: "Pemahaman konsep membuatmu lebih siap membaca contoh dan mencoba alatnya." },
      { question: "Cara belajar yang paling sehat adalah…", options: ["Mencoba, mengecek, lalu memperbaiki", "Takut bertanya", "Menghafal tanpa memahami"], answer: 0, explanation: "Eksperimen kecil dan refleksi membantu konsep menempel lebih lama." },
    ],
  };
  return { id, title: item.title, category: item.category, level: meta.level, minutes: item.minutes, emoji: meta.emoji, ...content };
});

export const categories = ["Semua kategori", ...Object.keys(categoryMeta)];
export const levels = ["Semua level", "Pemula", "Menengah", "Lanjut"];
