// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createEmptyLearningProgress } from "@shared/learningProgress";
import { LearningProvider, useLearning } from "./LearningContext";

const rpc = vi.hoisted(() => ({ save: vi.fn() }));

vi.mock("@/_core/hooks/useAuth", () => ({
  useAuth: () => ({ user: { id: 42 }, isAuthenticated: true, loading: false }),
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    learning: {
      mine: { useQuery: () => ({ data: { snapshot: { ...createEmptyLearningProgress(), bookmarks: [5000] }, updatedAt: "2026-08-26T00:00:00.000Z" }, isLoading: false, isFetching: false, isError: false }) },
      save: { useMutation: () => ({ mutate: rpc.save, isPending: false, isError: false }) },
    },
  },
}));

function BookmarkHarness() {
  const { bookmarks, syncStatus, toggleBookmark } = useLearning();
  return <><output data-testid="bookmarks">{bookmarks.join(",")}</output><output data-testid="sync-status">{syncStatus}</output><button type="button" onClick={() => toggleBookmark(5000)}>Ubah simpanan</button></>;
}

describe("LearningContext bookmark snapshot sync", () => {
  beforeEach(() => {
    localStorage.clear();
    rpc.save.mockReset();
    rpc.save.mockImplementation((_snapshot, options) => options?.onSuccess?.({ updatedAt: "2026-08-26T00:05:00.000Z" }));
    vi.useFakeTimers();
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("loads bookmarks from the account snapshot and writes the removal back through the existing save mutation", async () => {
    render(<LearningProvider><BookmarkHarness /></LearningProvider>);
    await act(async () => {});
    expect(screen.getByTestId("bookmarks").textContent).toBe("5000");
    expect(screen.getByTestId("sync-status").textContent).toBe("synced");

    fireEvent.click(screen.getByRole("button", { name: /ubah simpanan/i }));
    expect(screen.getByTestId("bookmarks").textContent).toBe("");
    act(() => { vi.advanceTimersByTime(501); });
    expect(rpc.save).toHaveBeenCalledWith(expect.objectContaining({ bookmarks: [] }), expect.any(Object));
  });
});
