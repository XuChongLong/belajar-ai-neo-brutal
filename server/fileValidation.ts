export const MAX_STUDY_FILE_BYTES = 5 * 1024 * 1024;
export const allowedStudyMimeTypes = new Set(["application/pdf", "text/plain", "image/png", "image/jpeg", "image/webp"]);

export function sanitizeStudyFileName(name: string) {
  return name.trim().replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120) || "catatan";
}

export function validateStudyFile(input: { originalName: string; mimeType: string; base64: string }) {
  if (!allowedStudyMimeTypes.has(input.mimeType)) throw new Error("Format file belum didukung. Gunakan PDF, TXT, PNG, JPG, atau WEBP.");
  const bytes = Buffer.from(input.base64, "base64");
  if (!bytes.length || bytes.length > MAX_STUDY_FILE_BYTES) throw new Error("Ukuran file harus di bawah 5 MB.");
  return { bytes, safeName: sanitizeStudyFileName(input.originalName) };
}
