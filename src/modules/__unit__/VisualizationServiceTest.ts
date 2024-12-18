import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchVisualizationData } from "../visualizationEngine/VisualizationService.ts";

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
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const data = await fetchVisualizationData();

    expect(data).toEqual(mockData);
  });

  it("handles errors when fetching visualization data", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network Error"));

    await expect(fetchVisualizationData()).rejects.toThrow("Network Error");
  });
});
