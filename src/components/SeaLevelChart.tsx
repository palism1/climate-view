<<<<<<< HEAD
import React from "react";
import { Bar } from "react-chartjs-2";
=======
import React from 'react';
import { Bar } from 'react-chartjs-2';
>>>>>>> Pratik
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
<<<<<<< HEAD
} from "chart.js";
=======
} from 'chart.js';
>>>>>>> Pratik

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
<<<<<<< HEAD
    labels: ["2000", "2005", "2010", "2015", "2020"],
    datasets: [
      {
        label: "Sea Level (mm)",
        data: [3.2, 3.6, 4.0, 4.5, 5.0],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
=======
    labels: ['2000', '2005', '2010', '2015', '2020'],
    datasets: [
      {
        label: 'Sea Level (mm)',
        data: [3.2, 3.6, 4.0, 4.5, 5.0],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
>>>>>>> Pratik
      },
    ],
  };

<<<<<<< HEAD
  const options: ChartOptions<"bar"> = {
=======
  const options: ChartOptions<'bar'> = {
>>>>>>> Pratik
    responsive: true,
    plugins: {
      legend: {
        display: true,
<<<<<<< HEAD
        position: "top",
      },
      title: {
        display: true,
        text: "Sea Level Rise Over Time",
=======
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sea Level Rise Over Time',
>>>>>>> Pratik
      },
    },
    scales: {
      x: {
        title: {
          display: true,
<<<<<<< HEAD
          text: "Year",
=======
          text: 'Year',
>>>>>>> Pratik
        },
      },
      y: {
        title: {
          display: true,
<<<<<<< HEAD
          text: "Sea Level (mm)",
=======
          text: 'Sea Level (mm)',
>>>>>>> Pratik
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SeaLevelChart;
