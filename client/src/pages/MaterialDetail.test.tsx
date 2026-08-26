// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MaterialDetail from "./MaterialDetail";

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a href={href} {...props}>{children}</a>,
  useLocation: () => ["/materi/5000", vi.fn()],
  useRoute: () => [true, { id: "5000" }],
}));

vi.mock("@/contexts/LearningContext", () => ({
  useLearning: () => ({
    completed: [], scores: {}, bookmarks: [], chapterReadLessons: {}, projectEvidence: {}, syncStatus: "synced",
    markComplete: vi.fn(), toggleComplete: vi.fn(), markCurrent: vi.fn(), markChapterLessonRead: vi.fn(),
    saveQuizAttempt: vi.fn(), toggleBookmark: vi.fn(), setProjectEvidence: vi.fn(),
  }),
}));

vi.mock("sonner", () => ({ toast: vi.fn() }));

describe("MaterialDetail reading settings", () => {
  beforeEach(() => {
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
});
