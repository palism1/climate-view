import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { generateVisualization } from "./VisualizationService";

interface VisualizationData {
  labels: string[];
  values: number[];
}

const VisualizationPage: React.FC<{ data: VisualizationData }> = ({ data }) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const visualization = generateVisualization(data);
    setChartData(visualization);
  }, [data]);

  if (!chartData) {
    return <p>Loading visualization...</p>;
  }

  return (
    <div>
      <h1>Data Visualization</h1>
      <Bar data={chartData.data} options={chartData.options} />
    </div>
  );
};

export default VisualizationPage;
