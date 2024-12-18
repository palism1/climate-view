import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CmsPage from "../cms/CmsPage";
import { fetchCmsContent } from "../cms/CmsService";

vi.mock("../cms/CmsService");

const mockFetchCmsContent = fetchCmsContent as jest.MockedFunction<
  typeof fetchCmsContent
>;

describe("CmsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders CMS content successfully", async () => {
    const mockContent = { title: "Test Page", body: "<p>Test Content</p>" };
    mockFetchCmsContent.mockResolvedValueOnce(mockContent);

    render(<CmsPage pageId="test-page" />);

    await waitFor(() => {
      expect(screen.getByText("Test Page")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  it("displays loading indicator while fetching content", () => {
    mockFetchCmsContent.mockResolvedValueOnce(new Promise(() => {}));

    render(<CmsPage pageId="test-page" />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays error message when content fails to load", async () => {
    mockFetchCmsContent.mockRejectedValueOnce(new Error("Network Error"));

    render(<CmsPage pageId="test-page" />);

    await waitFor(() => {
      expect(screen.getByText("Error loading content.")).toBeInTheDocument();
    });
  });
});
