import { describe, expect, it } from "vitest";
import { cyberSecurityCurriculumStats, cyberSecurityMaterials } from "./cyberSecurityCourseMaterials";

describe("Cyber Security curriculum", () => {
  it("contains a prologue plus twenty core checkpoints with rich reading layers", () => {
    expect(cyberSecurityCurriculumStats).toEqual({ chapters: 21, subchaptersPerChapter: 12, totalSubchapters: 252 });
    expect(cyberSecurityMaterials).toHaveLength(252);
    expect(new Set(cyberSecurityMaterials.map((material) => material.category))).toHaveLength(21);
    cyberSecurityMaterials.forEach((material) => {
      expect(material.specialization).toBe("ai-security");
      expect(material.sections).toHaveLength(5);
      expect(material.quiz).toHaveLength(2);
      expect(material.resources?.length).toBeGreaterThan(0);
    });
  });

  it("places the prologue before core lesson 1.1 and keeps core numbering intact", () => {
    expect(cyberSecurityMaterials[0]?.title).toMatch(/^Prolog\.1/);
    expect(cyberSecurityMaterials[11]?.title).toMatch(/^Prolog\.12/);
    expect(cyberSecurityMaterials[12]?.title).toMatch(/^1\.1/);
    expect(cyberSecurityMaterials[23]?.title).toMatch(/^1\.12/);
    expect(cyberSecurityMaterials[24]?.title).toMatch(/^2\.1/);
    expect(cyberSecurityMaterials[240]?.title).toMatch(/^20\.1/);
    expect(cyberSecurityMaterials[251]?.title).toMatch(/^20\.12/);
    expect(cyberSecurityMaterials.filter((material) => material.chapterLecture)).toHaveLength(21);
  });

  it("gives core lessons distinct applied scenarios and gives the prologue a clear contextual bridge", () => {
    const core = cyberSecurityMaterials.filter((material) => !material.title.startsWith("Prolog."));
    const prologue = cyberSecurityMaterials.filter((material) => material.title.startsWith("Prolog."));
    const scenarios = core.map((material) => material.sections.find((section) => section.heading === "Skenario tim")?.body ?? "");
    const labs = core.map((material) => material.sections.find((section) => section.heading === "Latihan lab berizin")?.body ?? "");
    expect(new Set(scenarios).size).toBe(240);
    expect(new Set(labs).size).toBe(240);
    labs.forEach((body) => expect(body).toMatch(/data fiktif|aset sendiri/i));
    expect(prologue).toHaveLength(12);
    prologue.forEach((material) => expect(material.sections.some((section) => section.heading === "Jembatan ke course inti")).toBe(true));
  });

  it("includes twenty-one distinct structured case studies, one for every checkpoint", () => {
    const cases = cyberSecurityMaterials.flatMap((material) => material.caseStudy ? [material.caseStudy] : []);
    expect(cases).toHaveLength(21);
    expect(new Set(cases.map((item) => item.title)).size).toBe(21);
    cases.forEach((item) => {
      expect(item.narrative.length).toBeGreaterThan(180);
      expect(item.guidedQuestions).toHaveLength(3);
      expect(item.artifact.length).toBeGreaterThan(60);
    });
  });

  it("maps the user-provided courses and every important playlist family to at least one lesson", () => {
    const labels = new Set(cyberSecurityMaterials.flatMap((material) => material.resources?.map((resource) => resource.label) ?? []));
    [
      "CS50: Intro to Cybersecurity — Full Course",
      "Hands-On Cybersecurity & Ethical Hacking — Full Course",
      "Ethical Hacking in 15 Hours — Part 1",
      "Ethical Hacking in 15 Hours — Part 2",
      "Hacking Web Applications",
      "Ethical Hacking in 12 Hours",
      "Open-Source Intelligence (OSINT) in 5 Hours",
      "Beginner Web Application Hacking",
      "Buffer Overflows Made Easy",
      "Linux for Ethical Hackers — Kali Linux Course",
      "Python for Beginners — Full Course",
      "Linux Privilege Escalation for Beginners",
      "Windows Privilege Escalation for Beginners",
      "Hacking Active Directory for Beginners",
      "Practical Bug Bounty",
      "Rust Programming 101",
      "Security Operations (SOC) 101",
      "Intro to PowerShell",
      "Learn AI Fundamentals",
      "Practical Help Desk",
      "IoT & Hardware Hacking for Beginners",
      "Full-Length Hacking Courses — Soft Skills & Career",
    ].forEach((label) => expect(labels.has(label)).toBe(true));
  });
});
