# Riset Rework AI Engineering

## Video yang diberikan pengguna

| Video | Status sumber | Sinyal kurikulum awal |
|---|---|---|
| https://youtu.be/JV3pL1_mn2M | Browser dibatasi oleh halaman unusual-traffic; analisis video langsung selesai disimpan di `ai-engineering-video-1-notes.md`. | Akan dipetakan dari analisis terstruktur sebelum materi ditulis ulang. |
| https://youtu.be/geQqpO_AFMo | Halaman YouTube dapat dibuka. Judul yang tampil: **AI Engineering in 41 Minutes: From Demo to Production** oleh **Anas Riad**, berdurasi sekitar 41:53. | Mengarah pada perjalanan dari demo ke produksi, termasuk hallucination, grounding/RAG, guardrails, evaluasi LLM, dan keputusan arsitektur. |

Catatan awal: komentar yang tampak pada halaman kedua menekankan bahwa grounding dan guardrails tidak otomatis mencegah keputusan arsitektur yang keliru. Rework materi akan memperlakukan evaluasi, human review, dan batas tindakan sebagai bagian inti AI Engineering, bukan tambahan di akhir.

## Sintesis sumber untuk urutan materi

Kedua video mengarahkan rework pada perjalanan **dari use case menuju produk AI yang dapat dievaluasi dan dioperasikan**, bukan sekadar urutan daftar tool. Analisis video pertama merangkum fondasi model, pemilihan model, evaluasi, prompting, RAG, agents, fine-tuning, dataset engineering, dan optimasi inference. Analisis video kedua menekankan lifecycle use case → model choice → evaluation → prompting/RAG/agent/fine-tuning → production architecture → monitoring → feedback loop. Sumber video: https://youtu.be/JV3pL1_mn2M dan https://youtu.be/geQqpO_AFMo.

| Tema rework | Bukti sumber | Implikasi untuk materi |
|---|---|---|
| Evals sebelum optimasi | Video kedua menyatakan bahwa evaluation mengubah pengembangan dari guesswork menjadi engineering; panduan OpenAI menyarankan evaluasi awal, task-specific, pencatatan, dan kalibrasi dengan human feedback. | Evals dipindahkan sebelum RAG, agents, dan fine-tuning; setiap pola mendapat rubrik serta edge case. |
| Prompting yang dapat diuji | Video kedua mengutamakan kejelasan; O’Reilly mencantumkan instruksi eksplisit, konteks, task decomposition, versioning, dan defensive prompting. | Prompt bukan materi satu kali; akan dihubungkan dengan output validator dan evaluasi. |
| RAG sebagai sistem | Kedua video membedakan indexing/offline dan querying/online; O’Reilly menempatkan retrieval dan optimasi RAG sebelum agent. | Urutan RAG dibuat dari data/source → chunking/indexing → retrieval → grounding → evaluation. |
| Agents bukan default | Video kedua mendefinisikan agent sebagai workflow dengan feedback; Anthropic merekomendasikan solusi paling sederhana dan menambah kompleksitas hanya jika bukti evaluasi mendukungnya. | Workflow deterministik, routing, dan approval diajarkan sebelum agent otonom. |
| Produksi dan feedback | O’Reilly mencantumkan guardrails, routing/gateway, cache, observability, orchestration, dan user feedback. | Jalur diakhiri dengan model router, guardrails, monitoring, cost/latency, dan feedback loop. |

## Rujukan yang dikonfirmasi

- O’Reilly mendeskripsikan *AI Engineering* Chip Huyen sebagai pengembangan aplikasi dengan foundation model dan memuat bab tentang evaluation, prompt engineering, RAG/agents, finetuning, dataset engineering, inference optimization, serta architecture and user feedback. URL: https://www.oreilly.com/library/view/ai-engineering/9781098166298/
- Panduan OpenAI menjelaskan eval sebagai tes terstruktur bagi sistem AI yang bervariasi, menyarankan objective, dataset, metrics, perbandingan, dan continuous evaluation. URL: https://developers.openai.com/api/docs/guides/evaluation-best-practices
- Anthropic membedakan workflow dengan jalur yang didefinisikan kode dari agents yang mengarahkan proses dan tool sendiri; sumber ini menganjurkan kesederhanaan dan kompleksitas tambahan hanya bila diperlukan. URL: https://www.anthropic.com/engineering/building-effective-agents
