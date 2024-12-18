import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import VisualizationPage from "../visualizationEngine/VisualizationPage";
import { fetchVisualizationData } from "../visualizationEngine/VisualizationService";

vi.mock("../visualizationEngine/VisualizationService", () => ({
  fetchVisualizationData: vi.fn(),
}));

describe("VisualizationPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders visualization data successfully", async () => {
    const mockData = {
      series: [{ name: "Sample Data", data: [10, 20, 30, 40, 50] }],
      options: {
        chart: { type: "line" },
        xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
      },
    };
    (fetchVisualizationData as jest.Mock).mockResolvedValueOnce(mockData);

    render(<VisualizationPage dataId="test-data" />);

    await waitFor(() => {
      expect(screen.getByText("Sample Data")).toBeInTheDocument();
    });
  });

  it("displays loading indicator while fetching data", () => {
    (fetchVisualizationData as jest.Mock).mockResolvedValueOnce(
      new Promise(() => {})
    );

    render(<VisualizationPage dataId="test-data" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error message when data fails to load", async () => {
    (fetchVisualizationData as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error")
    );

    render(<VisualizationPage dataId="test-data" />);

    await waitFor(() => {
      expect(screen.getByText("Error loading data.")).toBeInTheDocument();
    });
  });
});
