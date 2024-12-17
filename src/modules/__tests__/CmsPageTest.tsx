import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CmsPage from "../CmsPage";
import { fetchCmsContent } from "../CmsService";

vi.mock("../CmsService");

describe("CmsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders CMS content successfully", async () => {
    const mockContent = { title: "Test Page", body: "<p>Test Content</p>" };
    fetchCmsContent.mockResolvedValueOnce(mockContent);

    render(<CmsPage pageId="test-page" />);

    await waitFor(() => {
      expect(screen.getByText("Test Page")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  it("displays loading indicator while fetching content", () => {
    fetchCmsContent.mockResolvedValueOnce(new Promise(() => {}));

    render(<CmsPage pageId="test-page" />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays error message when content fails to load", async () => {
    fetchCmsContent.mockRejectedValueOnce(new Error("Network Error"));

    render(<CmsPage pageId="test-page" />);

    await waitFor(() => {
      expect(screen.getByText("Error loading content.")).toBeInTheDocument();
    });
  });
});
