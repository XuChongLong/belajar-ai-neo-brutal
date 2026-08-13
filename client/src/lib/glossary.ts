// Style reminder: Paper Playground — glossary entries should feel like friendly margin notes, not a dry dictionary.

export type GlossaryTerm = { term: string; definition: string; analogy: string; category: string; materialId: number };

export const glossaryTerms: GlossaryTerm[] = [
  { term: "AI", definition: "Cara membuat komputer mengenali pola, memahami masukan, atau membantu mengambil keputusan.", analogy: "Seperti kru kecil di belakang panggung yang membantu aplikasi bekerja.", category: "Dasar-Dasar AI", materialId: 1 },
  { term: "Machine Learning", definition: "Pendekatan ketika model belajar menemukan pola dari contoh, bukan hanya mengikuti aturan manual.", analogy: "Seperti anak magang yang makin terampil setelah menerima banyak contoh dan feedback.", category: "Dasar-Dasar AI", materialId: 4 },
  { term: "Neural Network", definition: "Model berlapis yang mengolah sinyal dari pola sederhana menjadi prediksi yang lebih kompleks.", analogy: "Seperti tim detektif yang berbagi petunjuk sebelum membuat kesimpulan.", category: "Dasar-Dasar AI", materialId: 6 },
  { term: "Token", definition: "Unit kecil teks yang diproses model bahasa; tidak selalu sama dengan satu kata.", analogy: "Seperti keping puzzle sebelum komputer menyusun kalimat.", category: "LLM", materialId: 13 },
  { term: "LLM", definition: "Model yang belajar pola bahasa dari banyak teks untuk memprediksi dan menghasilkan rangkaian token.", analogy: "Seperti pembaca super cepat yang sangat mengenal pola cara manusia menulis.", category: "LLM", materialId: 11 },
  { term: "Transformer", definition: "Arsitektur yang memakai attention untuk menimbang hubungan antarbagian teks.", analogy: "Seperti pembaca yang bisa menyorot banyak kata penting sekaligus.", category: "LLM", materialId: 12 },
  { term: "Prompt Engineering", definition: "Menyusun instruksi, konteks, batasan, dan format agar hasil AI lebih konsisten.", analogy: "Seperti menulis brief yang jelas untuk teman satu tim.", category: "LLM", materialId: 16 },
  { term: "Hallucination", definition: "Informasi yang terdengar meyakinkan tetapi tidak didukung fakta atau konteks yang benar.", analogy: "Seperti teman yang tidak tahu jawaban tetapi tetap menjawab dengan percaya diri.", category: "LLM", materialId: 18 },
  { term: "Embedding", definition: "Representasi angka yang membantu komputer membandingkan kemiripan makna.", analogy: "Seperti menaruh kalimat di peta; kalimat yang mirip berada lebih dekat.", category: "RAG", materialId: 23 },
  { term: "Chunking", definition: "Memotong dokumen menjadi potongan yang cukup kecil untuk dicari tetapi tetap membawa konteks.", analogy: "Seperti memotong buku menjadi kartu catatan tanpa memisahkan cerita penting.", category: "RAG", materialId: 24 },
  { term: "RAG", definition: "Pola yang menggabungkan retrieval dokumen dengan generation jawaban.", analogy: "Seperti siswa yang membuka catatan sebelum menjawab ujian.", category: "RAG", materialId: 21 },
  { term: "Vector Database", definition: "Penyimpanan representasi angka dan metadata untuk mencari informasi yang maknanya mirip.", analogy: "Seperti perpustakaan yang mengelompokkan buku berdasarkan kemiripan ide.", category: "RAG", materialId: 22 },
  { term: "AI Agent", definition: "Sistem yang memahami tujuan, membuat rencana, memakai tools, mengamati hasil, lalu melanjutkan atau berhenti.", analogy: "Seperti asisten yang bisa membuka kalender, memanggil alat, dan kembali membawa hasil.", category: "Agents", materialId: 28 },
  { term: "Function Calling", definition: "Jembatan terstruktur agar model mengusulkan fungsi dan aplikasi memvalidasi serta menjalankannya.", analogy: "Seperti resepsionis yang mengisi formulir untuk bagian yang punya akses kerja.", category: "Agents", materialId: 29 },
  { term: "Human-in-the-loop", definition: "Pola ketika manusia tetap meninjau atau menyetujui tindakan yang berisiko.", analogy: "Seperti rem dan sabuk pengaman pada kendaraan yang cepat.", category: "Agents", materialId: 32 },
  { term: "Context Window", definition: "Jumlah token yang dapat diproses model dalam satu konteks kerja.", analogy: "Seperti luas meja kerja yang membatasi jumlah catatan yang bisa dibentangkan.", category: "LLM", materialId: 20 },
];
