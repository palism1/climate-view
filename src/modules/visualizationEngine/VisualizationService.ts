import { ApexOptions } from "apexcharts";

interface VisualizationData {
  series: ApexOptions["series"];
  options: ApexOptions;
}

export const fetchVisualizationData = async (): Promise<VisualizationData> => {
  const response = await fetch(`/api/visualization-data`);
  if (!response.ok) {
    throw new Error("Failed to fetch visualization data");
  }
  return response.json();
};
