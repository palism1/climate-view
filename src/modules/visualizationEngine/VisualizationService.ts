import { ApexOptions } from "apexcharts";

interface VisualizationData {
  series: ApexOptions["series"];
  options: ApexOptions;
}

export async function fetchVisualizationData(): Promise<VisualizationData> {
  // Implement the function to fetch visualization data
  // For now, return mock data
  return {
    series: [
      {
        name: "Sample Data",
        data: [10, 20, 30, 40, 50],
      },
    ],
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      },
    },
  };
}
