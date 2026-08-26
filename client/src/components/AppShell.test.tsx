// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AppShell from "./AppShell";

const route = vi.hoisted(() => ({ location: "/materi/5000" }));

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a href={href} {...props}>{children}</a>,
  useLocation: () => [route.location, vi.fn()],
}));

vi.mock("@/contexts/LearningContext", () => ({
  useLearning: () => ({ streak: 0, progressPercent: 0, completedCount: 0, syncStatus: "synced" }),
}));

vi.mock("@/components/PageAtmosphereCanvas", () => ({ default: () => <div data-testid="page-atmosphere" /> }));
vi.mock("@/components/NpcPetPopup", () => ({ default: () => <div data-testid="npc-pet" /> }));

function setViewport(mobile: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockImplementation(() => ({ matches: mobile, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  });
}

describe("AppShell editorial focus navigation", () => {
  beforeEach(() => { setViewport(false); route.location = "/materi/5000"; });
  afterEach(cleanup);

  it("keeps the brand rail and global search while course routes suppress decorative layers", () => {
    render(<AppShell><p>Lesson body</p></AppShell>);
    expect(screen.getByText("Lesson body")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Tampilkan navigasi" })).toBeTruthy();
    expect(screen.getByRole("button", { name: /cari isi materi/i })).toBeTruthy();
    expect(screen.queryByTestId("page-atmosphere")).toBeNull();
    expect(screen.queryByTestId("npc-pet")).toBeNull();
    expect(document.querySelector(".cursor-dot")).toBeNull();
  });

  it("keeps decorative layers on non-course pages and preserves Android drawer plus search interactions", () => {
    setViewport(true);
    route.location = "/";
    render(<AppShell><p>Home body</p></AppShell>);
    expect(screen.getByTestId("page-atmosphere")).toBeTruthy();
    expect(screen.getByTestId("npc-pet")).toBeTruthy();
    const menu = screen.getByRole("button", { name: "Buka menu" });
    fireEvent.click(menu);
    expect(document.querySelector(".sidebar-open")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Tutup menu navigasi" }));
    expect(document.querySelector(".sidebar-open")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Buka pencarian" }));
    expect(screen.getByRole("dialog", { name: "Pencarian global" })).toBeTruthy();
  });
});
