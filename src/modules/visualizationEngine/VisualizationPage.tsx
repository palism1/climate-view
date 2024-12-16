import React, { useEffect, useState } from "react";
import { fetchVisualizationData } from "./VisualizationService";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface VisualizationData {
  series: ApexOptions["series"];
  options: ApexOptions;
}

const VisualizationPage: React.FC<{ dataId: string }> = ({ dataId }) => {
  const [data, setData] = useState<VisualizationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchVisualizationData();
        setData(fetchedData);
      } catch (error) {
        console.error("Failed to load visualization data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [dataId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Error loading data.</p>;
  }

  return <Chart options={data.options} series={data.series} type="line" />;
};

export default VisualizationPage;
