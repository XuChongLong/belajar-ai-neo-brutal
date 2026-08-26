// @vitest-environment jsdom

import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import PublicArchiveImage from "./PublicArchiveImage";

describe("PublicArchiveImage", () => {
  it("retries a public fallback then shows an accessible archive placeholder", () => {
    render(<PublicArchiveImage src="https://example.test/primary.jpg" fallbackSrc="https://example.test/fallback.jpg" alt="Arsip ilmuwan" />);
    const image = screen.getByRole("img", { name: "Arsip ilmuwan" }) as HTMLImageElement;
    fireEvent.error(image);
    expect(image.src).toContain("fallback.jpg");
    fireEvent.error(image);
    expect(screen.getByRole("img", { name: /Arsip ilmuwan\. Arsip foto sedang tidak tersedia/i })).toBeTruthy();
  });
});
