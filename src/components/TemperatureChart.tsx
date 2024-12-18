// TemperatureChart.tsx

import React, { useState, useEffect } from "react";
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
  const [plotUrl, setPlotUrl] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  // List of all 50 US states
  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
    "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
    "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  // Fetch the Python-generated plot on component mount
  useEffect(() => {
    fetch("http://127.0.0.1:5000/plot")
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setPlotUrl(url);
      })
      .catch((error) => console.error("Error fetching the plot:", error));
  }, []);

  // Static Chart.js data
  const data = {
    labels: ["2000", "2005", "2010", "2015", "2020"],
    datasets: [
      {
        label: "Global Temperature (°C)",
        data: [14.5, 14.7, 14.8, 15.0, 15.3],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Handle region selection
  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const region = event.target.value;
    setSelectedRegion(region);

    // Send the selected region to the Flask backend
    fetch("http://127.0.0.1:5000/select-region", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ region: region }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Region selected:", data);
      })
      .catch((error) => console.error("Error sending region:", error));
  };

  return (
    <div className="temperature-chart-container">
      <div style={{ height: "400px" }}>
        {/* Tab to toggle dropdown */}
        <button onClick={toggleDropdown} className="dropdown-btn">
          Select Region
        </button>

        {/* Dropdown options */}
        {dropdownVisible && (
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            className="dropdown-select"
          >
            <option value="">-- Select Region --</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        )}

        {/* Chart.js Line Chart */}
        <Line data={data} options={options} />
      </div>

      {/* Dynamically fetched Python-generated plot */}
      {plotUrl && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3 style={{ color: "#fff" }}>Python-Generated Plot</h3>
          <img
            src={plotUrl}
            alt="Python Generated Plot"
            style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
          />
        </div>
      )}
    </div>
  );
};

export default TemperatureChart;
