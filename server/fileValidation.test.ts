import { describe, expect, it } from "vitest";
import { MAX_STUDY_FILE_BYTES, sanitizeStudyFileName, validateStudyFile } from "./fileValidation";

describe("study file validation", () => {
  it("accepts a supported small text file and returns its bytes", () => {
    const result = validateStudyFile({ originalName: "catatan AI.txt", mimeType: "text/plain", base64: Buffer.from("halo").toString("base64") });
    expect(result.bytes.toString()).toBe("halo");
    expect(result.safeName).toBe("catatan-AI.txt");
  });

  it("rejects an unsupported media type", () => {
    expect(() => validateStudyFile({ originalName: "video.mp4", mimeType: "video/mp4", base64: "aGVsbG8=" })).toThrow("Format file belum didukung");
  });

  it("rejects files larger than the upload limit", () => {
    const tooLarge = Buffer.alloc(MAX_STUDY_FILE_BYTES + 1).toString("base64");
    expect(() => validateStudyFile({ originalName: "besar.pdf", mimeType: "application/pdf", base64: tooLarge })).toThrow("Ukuran file harus di bawah 5 MB");
  });
});
