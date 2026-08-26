import React from "react";
import PublicArchiveImage from "@/components/PublicArchiveImage";

const katherineFallback = "/manus-storage/katherine-johnson-nasa-1962_c6b966c1.jpg";

type WorkbookInspirationProps = {
  specialization?: string | null;
  materialId?: number;
  compact?: boolean;
};

const figures = {
  johnson: {
    name: "Katherine Johnson",
    role: "Matematikawan NASA",
    quote: "“I loved going to work every single day.”",
    isVerifiedQuote: true,
    note: "Johnson memeriksa lintasan misi NASA dengan matematika yang teliti—pengingat bahwa rasa ingin tahu kecil bisa jadi kerja besar.",
    image: "/manus-storage/katherine-johnson-nasa_402b1eb7.jpg",
    source: "https://www.nasa.gov/centers-and-facilities/langley/katherine-johnson-biography/",
    rotation: "left",
  },
  hamilton: {
    name: "Margaret Hamilton",
    role: "Ilmuwan komputer Apollo",
    quote: "“We had to find a way and we did.”",
    isVerifiedQuote: true,
    note: "Hamilton memimpin pekerjaan software Apollo. Rumit bukan berarti harus panik; pecah masalahnya, cek satu-satu, lalu lanjut.",
    image: "/manus-storage/margaret-hamilton-nasa_df9c6f27.jpg",
    source: "https://science.nasa.gov/people/margaret-hamilton/",
    rotation: "right",
  },
  vaughan: {
    name: "Dorothy Vaughan",
    role: "Pemimpin West Area Computers, NASA",
    quote: "Kerja yang rapi hari ini bisa bikin jalan buat tim setelahmu.",
    isVerifiedQuote: false,
    note: "Catatan belajar dari perjalanan Vaughan: pegang dasar kuat, lalu berani pindah ke alat baru ketika zamannya berubah.",
    image: "/manus-storage/dorothy-vaughan-nasa_83df3be6.jpg",
    source: "https://www.nasa.gov/centers-and-facilities/langley/dorothy-j-vaughan/",
    rotation: "left",
  },
  easley: {
    name: "Annie Easley",
    role: "Ilmuwan komputer NASA",
    quote: "Rasa penasaran yang dipraktikkan bisa membawa kamu jauh.",
    isVerifiedQuote: false,
    note: "Catatan belajar dari kisah Easley: pekerjaan teknis yang konsisten bisa tumbuh jadi dampak yang jauh lebih besar dari meja kerja sendiri.",
    image: "/manus-storage/annie-easley-nasa_2f60df69.jpg",
    source: "https://www.nasa.gov/people/annie-easley/",
    rotation: "right",
  },
} as const;

const figureFor = (specialization?: string | null, materialId = 0) => {
  if (specialization === "ai-engineering" || specialization === "ai-product") return figures.hamilton;
  if (specialization === "cloud-devops") return figures.johnson;
  if (specialization === "data-engineering" || specialization === "creative-ai") return figures.easley;
  if (specialization === "automation" || specialization === "ai-security") return figures.vaughan;
  return materialId % 2 === 0 ? figures.johnson : figures.hamilton;
};

export default function WorkbookInspiration({ specialization, materialId, compact = false }: WorkbookInspirationProps) {
  const figure = figureFor(specialization, materialId);
  return <aside className={`workbook-inspiration workbook-inspiration-${figure.rotation} ${compact ? "workbook-inspiration-compact" : ""}`}>
    <div className="workbook-photo-clip"><PublicArchiveImage src={figure.image} fallbackSrc={katherineFallback} alt={`${figure.name}, ${figure.role}`} /></div>
    <div className="workbook-inspiration-copy"><span className="eyebrow">{figure.isVerifiedQuote ? "KUTIPAN ILMUWAN · SUMBER NASA" : "CATATAN BELAJAR · TERINSPIRASI KISAHNYA"}</span>{figure.isVerifiedQuote ? <blockquote>{figure.quote}</blockquote> : <p className="workbook-editorial-note">{figure.quote}</p>}<p>{figure.note}</p><a href={figure.source} target="_blank" rel="noreferrer">{figure.name} · NASA ↗</a></div>
  </aside>;
}
