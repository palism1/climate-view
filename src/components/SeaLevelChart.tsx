import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SeaLevelChart: React.FC = () => {
  const data = {
    labels: ["2000", "2005", "2010", "2015", "2020"],
    datasets: [
      {
        label: "Sea Level (mm)",
        data: [3.2, 3.6, 4.0, 4.5, 5.0],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Sea Level Rise Over Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Sea Level (mm)",
        },
      },
    },
  };

  return <Bar className="sea-level-chart" data={data} options={options} />;
};

export default SeaLevelChart;
