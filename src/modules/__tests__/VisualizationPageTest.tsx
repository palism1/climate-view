import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import VisualizationPage from "../VisualizationPage";
import { fetchVisualizationData } from "../VisualizationService";

vi.mock("../VisualizationService");

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
    fetchVisualizationData.mockResolvedValueOnce(mockData);

    render(<VisualizationPage dataId="test-data" />);

    await waitFor(() => {
      expect(screen.getByText("Sample Data")).toBeInTheDocument();
    });
  });

  it("displays loading indicator while fetching data", () => {
    fetchVisualizationData.mockResolvedValueOnce(new Promise(() => {}));

    render(<VisualizationPage dataId="test-data" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error message when data fails to load", async () => {
    fetchVisualizationData.mockRejectedValueOnce(new Error("Network Error"));

    render(<VisualizationPage dataId="test-data" />);

    await waitFor(() => {
      expect(screen.getByText("Error loading data.")).toBeInTheDocument();
    });
  });
});
