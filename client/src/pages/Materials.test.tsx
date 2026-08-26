// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Materials from "./Materials";

const route = vi.hoisted(() => ({ search: "" }));

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a href={href} {...props}>{children}</a>,
  useSearch: () => route.search,
}));

vi.mock("@/contexts/LearningContext", () => ({
  useLearning: () => ({ completed: [], completedCount: 0, current: null, progressPercent: 0 }),
}));

describe("Materials subject catalogue", () => {
  afterEach(cleanup);
  beforeEach(() => { route.search = ""; });

  it("shows only subject choices on the catalogue entry page instead of a wall of sublessons", () => {
    render(<Materials />);
    expect(screen.getByRole("heading", { name: /jangan buka semua jalan/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /cloud computing ai/i }).getAttribute("href")).toBe("/materi?jurusan=cloud-devops");
    expect(screen.queryByText(/prolog\.1: apa yang dimaksud cloud computing/i)).toBeNull();
  });

  it("reveals sublessons only after a learner opens a selected course chapter", () => {
    route.search = "?jurusan=cloud-devops";
    render(<Materials />);
    const chapter = screen.getByRole("button", { name: /bab prolog/i });
    expect(chapter.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(chapter);
    expect(chapter.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("link", { name: /prolog\.1.*apa yang dimaksud cloud computing/i })).toBeTruthy();
  });
});
