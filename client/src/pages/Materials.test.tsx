// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Materials from "./Materials";

const route = vi.hoisted(() => ({ search: "?jurusan=cloud-devops&q=Production%20Readiness%20Pack" }));

vi.mock("wouter", () => ({
  Link: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a href={href} {...props}>{children}</a>,
  useLocation: () => ["/materi", vi.fn()],
  useSearch: () => route.search,
}));

vi.mock("@/contexts/LearningContext", () => ({
  useLearning: () => ({ bookmarks: [], completed: [], completedCount: 0, current: null, progressPercent: 0 }),
}));

vi.mock("@/components/MaterialCard", () => ({
  default: ({ material }: { material: { id: number; title: string } }) => <article data-testid={`material-card-${material.id}`}>{material.title}</article>,
}));

function resultMeta() {
  return screen.getByText((_, element) => element?.id === "search-results");
}

describe("Materials query q integration", () => {
  afterEach(cleanup);
  beforeEach(() => { route.search = "?jurusan=cloud-devops&q=Production%20Readiness%20Pack"; });

  it("renders one catalog card when q matches a Course Journey capstone", () => {
    render(<Materials />);
    expect(resultMeta().textContent).toContain("Menampilkan 1 materi dalam 1 checkpoint");
    expect(resultMeta().textContent).toContain("arah course");
    expect(screen.getByTestId("material-card-5000")).toBeTruthy();
    expect(screen.queryByTestId("material-card-5001")).toBeNull();
  });

  it("renders only source-linked checkpoints when q matches a source label", () => {
    route.search = "?jurusan=cloud-devops&q=Terraform%20Documentation";
    render(<Materials />);
    expect(resultMeta().textContent).toContain("Menampilkan 36 materi dalam 3 checkpoint");
    expect(resultMeta().textContent).toContain("sumber");
    expect(screen.getByTestId("material-card-5072")).toBeTruthy();
    expect(screen.getByTestId("material-card-5144")).toBeTruthy();
    expect(screen.queryByTestId("material-card-5000")).toBeNull();
  });
});
