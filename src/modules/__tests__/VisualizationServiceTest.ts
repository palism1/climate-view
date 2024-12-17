import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchVisualizationData } from "../VisualizationService";

describe("VisualizationService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches visualization data successfully", async () => {
    const mockData = {
      series: [{ name: "Sample Data", data: [10, 20, 30, 40, 50] }],
      options: {
        chart: { type: "line" },
        xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
      },
    };
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
      headers: new Headers(),
      redirected: false,
      status: 200,
      statusText: "OK",
      type: "basic",
      url: "",
      clone: () => this,
      body: null,
      bodyUsed: false,
      arrayBuffer: async () => new ArrayBuffer(0),
      blob: async () => new Blob(),
      formData: async () => new FormData(),
      text: async () => JSON.stringify(mockData),
    });

    const data = await fetchVisualizationData();

    expect(data).toEqual(mockData);
  });

  it("handles errors when fetching visualization data", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network Error"));

    await expect(fetchVisualizationData()).rejects.toThrow("Network Error");
  });
});
