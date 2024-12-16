import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import "./TemperatureChart.css";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TemperatureChart: React.FC = () => {
  // Static data for global temperatures
  const data = {
    labels: ["2000", "2005", "2010", "2015", "2020"],
    datasets: [
      {
        label: "Global Temperature (°C)",
        data: [14.5, 14.7, 14.8, 15.0, 15.3],
        borderColor: "rgba(255, 99, 132, 1)", // Line color
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Fill color
        tension: 0.4, // Smoothness of the curve
      },
    ],
  };

  // Correctly typed Chart.js options
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false, // Ensures chart resizes dynamically
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#fff", // Legend text matches dark theme
        },
      },
      title: {
        display: true,
        text: "Global Temperature Trends",
        color: "#fff", // Title matches dark theme
        font: {
          size: 16, // Title font size
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
          color: "#fff", // Axis title matches dark theme
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#fff", // Axis tick labels match dark theme
          font: {
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
          color: "#fff", // Axis title matches dark theme
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#fff", // Axis tick labels match dark theme
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="temperature-chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default TemperatureChart;
