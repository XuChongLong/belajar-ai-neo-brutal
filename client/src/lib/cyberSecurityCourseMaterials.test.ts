import { describe, expect, it } from "vitest";
import { cyberSecurityMaterials } from "./cyberSecurityCourseMaterials";

describe("Cyber Security curriculum", () => {
  it("contains a ten-chapter, thirty-one-sublesson learning path with rich reading layers", () => {
    expect(cyberSecurityMaterials).toHaveLength(31);
    expect(new Set(cyberSecurityMaterials.map((material) => material.category))).toHaveLength(10);
    cyberSecurityMaterials.forEach((material) => {
      expect(material.specialization).toBe("ai-security");
      expect(material.sections).toHaveLength(5);
      expect(material.quiz).toHaveLength(2);
      expect(material.resources?.length).toBeGreaterThan(0);
    });
  });

  it("restarts the sublesson number at every chapter checkpoint", () => {
    expect(cyberSecurityMaterials[0]?.title).toMatch(/^1\.1/);
    expect(cyberSecurityMaterials[9]?.title).toMatch(/^4\.1/);
    expect(cyberSecurityMaterials[12]?.title).toMatch(/^4\.4/);
    expect(cyberSecurityMaterials[13]?.title).toMatch(/^5\.1/);
    expect(cyberSecurityMaterials[30]?.title).toMatch(/^10\.3/);
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
