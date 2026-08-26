// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MaterialDetail from "./MaterialDetail";

const navigation = vi.hoisted(() => ({ navigate: vi.fn() }));
const learning = vi.hoisted(() => ({ markCurrent: vi.fn() }));

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a href={href} {...props}>{children}</a>,
  useLocation: () => ["/materi/5000", navigation.navigate],
  useRoute: () => [true, { id: "5000" }],
}));

vi.mock("@/contexts/LearningContext", () => ({
  useLearning: () => ({
    completed: [], scores: {}, bookmarks: [], chapterReadLessons: {}, projectEvidence: {}, syncStatus: "synced",
    markComplete: vi.fn(), toggleComplete: vi.fn(), markCurrent: learning.markCurrent, markChapterLessonRead: vi.fn(),
    saveQuizAttempt: vi.fn(), toggleBookmark: vi.fn(), setProjectEvidence: vi.fn(),
  }),
}));

vi.mock("sonner", () => ({ toast: vi.fn() }));

describe("MaterialDetail reading settings", () => {
  beforeEach(() => {
    navigation.navigate.mockReset();
    learning.markCurrent.mockReset();
    window.localStorage.clear();
    window.scrollTo = vi.fn();
    window.matchMedia = vi.fn().mockImplementation(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  });
  afterEach(cleanup);

  it("changes the reader class for all preference categories and resets to the default", () => {
    const { container } = render(<MaterialDetail />);
    const article = container.querySelector(".lesson-article");
    expect(article?.className).toContain("reader-scale-comfortable");
    expect(article?.className).toContain("reader-font-sans");
    expect(article?.className).toContain("reader-width-standard");

    fireEvent.click(screen.getByRole("button", { name: "Atur bacaan" }));
    fireEvent.click(screen.getByRole("button", { name: /^Lega$/ }));
    fireEvent.click(screen.getByRole("button", { name: "Mudah baca" }));
    fireEvent.click(screen.getByRole("button", { name: "Lapang" }));
    expect(article?.className).toContain("reader-scale-generous");
    expect(article?.className).toContain("reader-font-accessible");
    expect(article?.className).toContain("reader-width-wide");

    fireEvent.click(screen.getByRole("button", { name: "Kembalikan tampilan standar" }));
    expect(article?.className).toContain("reader-scale-comfortable");
    expect(article?.className).toContain("reader-font-sans");
    expect(article?.className).toContain("reader-width-standard");
  });

  it("keeps page turning controls at the top of the binder reader", () => {
    render(<MaterialDetail />);
    expect(screen.getByLabelText("Buku terbuka dua halaman")).toBeTruthy();
    expect(screen.getByLabelText("Halaman kiri buku")).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Balik halaman materi" })).toBeTruthy();
    expect(screen.getByRole("button", { name: /lembar berikutnya/i })).toBeTruthy();
    expect(screen.getAllByText(/kutipan ilmuwan.*sumber nasa/i).length).toBeGreaterThan(0);
  });

  it("turns to the next binder page through the existing material route and progress state", () => {
    render(<MaterialDetail />);
    fireEvent.click(screen.getByRole("button", { name: /lembar berikutnya/i }));
    expect(learning.markCurrent).toHaveBeenCalledWith(5001);
    expect(navigation.navigate).toHaveBeenCalledWith("/materi/5001");
  });
});
