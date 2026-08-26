// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SavedMaterials from "./SavedMaterials";

const learning = vi.hoisted(() => ({
  bookmarks: [5000],
  completed: [] as number[],
  current: 5000,
  syncStatus: "synced",
  toggleBookmark: vi.fn(),
}));

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a href={href} {...props}>{children}</a>,
}));

vi.mock("@/contexts/LearningContext", () => ({
  useLearning: () => learning,
}));

describe("SavedMaterials", () => {
  beforeEach(() => {
    learning.bookmarks = [5000];
    learning.completed = [];
    learning.current = 5000;
    learning.syncStatus = "synced";
    learning.toggleBookmark.mockReset();
  });
  afterEach(cleanup);

  it("shows a saved account bookmark as a resumable learning item and removes it on demand", () => {
    render(<SavedMaterials />);
    expect(screen.getByRole("heading", { name: /yang mau kamu\s*lanjutkan nanti/i })).toBeTruthy();
    expect(screen.getAllByText(/apa yang dimaksud cloud computing/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /lanjutkan/i }).getAttribute("href")).toBe("/materi/5000");
    fireEvent.click(screen.getByRole("button", { name: /hapus.*apa yang dimaksud cloud/i }));
    expect(learning.toggleBookmark).toHaveBeenCalledWith(5000);
  });

  it("gives a clear empty state and directs a learner back to subject selection", () => {
    learning.bookmarks = [];
    render(<SavedMaterials />);
    expect(screen.getByText(/belum ada bahan buat nanti/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /pilih mata pelajaran/i }).getAttribute("href")).toBe("/materi");
  });

  it("explains when a save action is still being synchronized", () => {
    learning.syncStatus = "syncing";
    render(<SavedMaterials />);
    expect(screen.getByText(/lagi menyimpan/i)).toBeTruthy();
  });
});
