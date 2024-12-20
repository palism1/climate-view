import React, { useEffect, useState } from "react";
import { fetchTemperatureData } from "../services/api";

interface TemperatureData {
  // Define the structure of temperature data here
  // For example:
  date: string;
  temperature: number;
}

const Home: React.FC = () => {
  const [temperatureData, setTemperatureData] = useState<
    TemperatureData[] | null
  >(null);

  useEffect(() => {
    const getTemperatureData = async () => {
      try {
        const data = await fetchTemperatureData();
        setTemperatureData(data);
      } catch (error) {
        console.error("Failed to load temperature data:", error);
      }
    };

    getTemperatureData();
  }, []);

  return (
    <div>
      <h1>Climate Change Data Visualization</h1>
      {temperatureData ? (
        <div>
          <h2>Temperature Data</h2>
          <pre>{JSON.stringify(temperatureData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading temperature data...</p>
      )}
    </div>
  );
};

export default Home;
