import { describe, expect, it } from "vitest";
import { buildPrdSystemPrompt, buildPrdUserPrompt, resolveProviderBaseUrl } from "./prdMaker";

describe("PRD Maker provider safety", () => {
  it("allows HTTPS providers", () => {
    expect(resolveProviderBaseUrl("https://api.example.com/v1/")).toBe("https://api.example.com/v1");
  });

  it("rejects credential-bearing, remote HTTP, and private-network endpoints", () => {
    expect(() => resolveProviderBaseUrl("https://key@api.example.com/v1")).toThrow();
    expect(() => resolveProviderBaseUrl("http://api.example.com/v1")).toThrow();
    expect(() => resolveProviderBaseUrl("http://192.168.1.4/v1")).toThrow();
    expect(() => resolveProviderBaseUrl("https://localhost:11434/v1")).toThrow();
  });

  it("builds a scoped Indonesian PRD prompt without a provider credential", () => {
    const prompt = buildPrdUserPrompt({ projectName: "Kelas Pintar", audience: "Tutor", stack: "React + Node", problem: "Membantu tutor membuat rencana belajar." });
    expect(buildPrdSystemPrompt()).toContain("Indonesian Markdown");
    expect(prompt).toContain("Kelas Pintar");
    expect(prompt).not.toContain("Bearer");
  });
});
