import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchCmsContent } from "../cms/CmsService";

vi.mock("axios");

describe("CmsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches CMS content successfully", async () => {
    const mockContent = { title: "Test Page", body: "<p>Test Content</p>" };
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockContent });

    const pageId = "test-page";
    const content = await fetchCmsContent(pageId);

    expect(axios.get).toHaveBeenCalledWith(
      `http://127.0.0.1:5000/api/cms/content/${pageId}`
    );
    expect(content).toEqual(mockContent);
  });

  it("handles errors when fetching CMS content", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    const pageId = "test-page";
    await expect(fetchCmsContent(pageId)).rejects.toThrow("Network Error");
  });
});
