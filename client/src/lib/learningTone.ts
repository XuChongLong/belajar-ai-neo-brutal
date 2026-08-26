import type { Material } from "./materials";

const sectionNames: Record<string, string> = {
  "Ngobrol dulu": "Ngobrol dulu, bro",
  "Konsep yang perlu dipahami": "Pahami dulu biar nggak cuma hafal",
  "Bagaimana konsep ini bekerja": "Cara kerjanya, kita bedah pelan-pelan",
  "Kasus di dunia kerja": "Biar kebayang di dunia nyata",
  "Contoh langkah demi langkah": "Coba lihat alurnya satu-satu",
  "Aturan pengambilan keputusan": "Sebelum mutusin, cek ini dulu",
  "Latihan terarah": "Sekarang giliran kamu nyoba",
  "Batasan dan risiko": "Jangan kelewatan batasnya, ya",
  "Bedah mekanisme dan trade-off": "Kenapa pilihannya nggak sesimpel itu",
  "Skenario tim": "Kalau kejadian di tim beneran",
  "Latihan berbasis artefak": "Bikin bukti kecil biar nggak cuma ngerti di kepala",
  "Batas aman dan pemeriksaan": "Rem dulu: cek batas aman dan bukti",
  "Kenapa ini penting sebelum teknis": "Kenapa ini perlu dibahas dulu",
  "Contoh kasus yang aman": "Contoh yang aman buat dibayangin",
  "Latihan kecil": "Coba kecil-kecilan dulu",
  "Jembatan ke course inti": "Habis ini, kita lanjut ke mana?",
};

const openers = [
  "Oke, kita pecah pelan-pelan. ",
  "Santai dulu, inti bagian ini begini. ",
  "Biar nggak terasa kayak hafalan, bayangin dulu konteksnya. ",
  "Nggak usah ngebut—pahami alurnya dulu. ",
];

function relaxPhrasing(text: string) {
  return text
    .replace(/\bTidak\b/g, "Nggak")
    .replace(/\btidak\b/g, "nggak")
    .replace(/\bJangan\b/g, "Jangan asal")
    .replace(/\bJangan asal asal\b/g, "Jangan asal")
    .replace(/\bGunakan\b/g, "Pakai")
    .replace(/\bgunakan\b/g, "pakai")
    .replace(/\bKemudian\b/g, "Terus")
    .replace(/\bkemudian\b/g, "terus")
    .replace(/\bsehingga\b/g, "biar")
    .replace(/\bSehingga\b/g, "Biar")
    .replace(/\bdapat\b/g, "bisa")
    .replace(/\bDapat\b/g, "Bisa")
    .replace(/\bAnda\b/g, "kamu")
    .replace(/\bKamu akan\b/g, "Habis ini kamu bakal")
    .replace(/\bkamu akan\b/g, "kamu bakal")
    .replace(/\bmemahami\b/g, "ngerti")
    .replace(/\bMemahami\b/g, "Ngerti");
}

function withOpener(text: string, index: number) {
  return `${openers[index % openers.length]}${relaxPhrasing(text)}`;
}

function casualQuestion(question: string) {
  const relaxed = relaxPhrasing(question);
  return `Coba cek lagi, ${relaxed.charAt(0).toLowerCase()}${relaxed.slice(1)}`;
}

function withBeforeGas(title: string) {
  return title.startsWith("Sebelum gas:") ? title : `Sebelum gas: ${title}`;
}

function summaryLead(text: string) {
  return text.replace(/^Santai,?\s*/i, "");
}

function sensitiveBoundary(material: Material) {
  if (material.specialization === "ai-security") {
    return "Ingat ya: ini buat belajar defensif. Praktik cuma di lab, data fiktif, aset sendiri, atau aset yang ada izin tertulisnya. Kalau scope belum jelas, stop dulu dan tanya owner.";
  }
  if (/Creative AI.*Bab (9|10)/.test(material.category)) {
    return "Catatan penting, ini bukan nasihat hukum: konten yang kelihatan online belum tentu bebas dipakai. Cek lisensi, consent, atribusi, dan provenance; kalau masih ragu, tahan dulu publikasinya dan minta review yang tepat.";
  }
  return undefined;
}

/**
 * Keeps domain facts, source URLs, exercises, and guardrails intact while making
 * the reading experience sound like a knowledgeable study friend.
 */
export function applyCasualIndonesianTone(materialList: readonly Material[]): Material[] {
  return materialList.map((material, materialIndex) => ({
    ...material,
    summary: `Santai dulu, di subbab ini kita ngobrolin ${material.title.replace(/^Bab\s+\d+\.\d+\s+·\s+|^\d+\.\d+\s+·\s+|^Prolog\.\d+\s+·\s+/, "")}. ${summaryLead(relaxPhrasing(material.summary))}`,
    analogy: `Biar kebayang: ${relaxPhrasing(material.analogy)}`,
    sections: material.sections.map((section, sectionIndex) => {
      const boundary = sectionIndex === material.sections.length - 1 ? sensitiveBoundary(material) : undefined;
      return {
        heading: sectionNames[section.heading] ?? `Biar nyambung: ${section.heading}`,
        body: `${withOpener(section.body, materialIndex + sectionIndex)}${boundary ? `\n\n${boundary}` : ""}`,
      };
    }),
    chapterLecture: material.chapterLecture ? {
      ...material.chapterLecture,
      title: withBeforeGas(relaxPhrasing(material.chapterLecture.title)),
      body: withOpener(material.chapterLecture.body, materialIndex),
      questions: material.chapterLecture.questions.map(casualQuestion),
    } : undefined,
    bookContext: material.bookContext ? {
      ...material.bookContext,
      title: `Biar nyambung dari awal: ${relaxPhrasing(material.bookContext.title)}`,
      body: withOpener(material.bookContext.body, materialIndex + 1),
    } : undefined,
    caseStudy: material.caseStudy ? {
      ...material.caseStudy,
      title: `Biar kebayang: ${relaxPhrasing(material.caseStudy.title)}`,
      narrative: withOpener(material.caseStudy.narrative, materialIndex + 2),
      artifact: `Buat yang simpel tapi kebaca: ${relaxPhrasing(material.caseStudy.artifact)}`,
      teachingPoint: `Intinya gini: ${relaxPhrasing(material.caseStudy.teachingPoint)}`,
      guidedQuestions: material.caseStudy.guidedQuestions.map(casualQuestion),
    } : undefined,
    deepDive: material.deepDive ? {
      ...material.deepDive,
      exampleTitle: `Contoh yang nggak cuma teori: ${relaxPhrasing(material.deepDive.exampleTitle)}`,
      example: withOpener(material.deepDive.example, materialIndex + 3),
      commonMistake: `Yang sering bikin nyasar: ${material.deepDive.commonMistake}`,
      rubric: [
        `Cek ini dulu: ${relaxPhrasing(material.deepDive.rubric[0])}`,
        `Cek ini dulu: ${relaxPhrasing(material.deepDive.rubric[1])}`,
        `Cek ini dulu: ${relaxPhrasing(material.deepDive.rubric[2])}`,
      ] as const,
    } : undefined,
    quiz: material.quiz.map((question) => ({
      ...question,
      question: `Coba cek pemahamanmu: ${relaxPhrasing(question.question)}`,
      explanation: `Nah, biar makin nempel: ${relaxPhrasing(question.explanation)}`,
    })),
  }));
}
