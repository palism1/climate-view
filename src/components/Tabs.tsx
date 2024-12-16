import React, { useState } from "react";
import { Tabs as MuiTabs, Tab, Box } from "@mui/material";
import TemperatureChart from "./TemperatureChart";
import SeaLevelChart from "./SeaLevelChart";
import WeatherPatternsMap from "./WeatherPatternsMap";
import "./Tabs.css"; // Import the external CSS file

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div className="tabs-container">
      <MuiTabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        className="tabs"
      >
        <Tab label="Global Temperature" />
        <Tab label="Sea Levels" />
        <Tab label="Weather Patterns" />
      </MuiTabs>

      <Box className="tab-content">
        {activeTab === 0 && (
          <div className="chart-container">
            <TemperatureChart />
          </div>
        )}
        {activeTab === 1 && (
          <div className="chart-container">
            <SeaLevelChart />
          </div>
        )}
        {activeTab === 2 && (
          <div className="chart-container">
            <WeatherPatternsMap />
          </div>
        )}
      </Box>
    </div>
  );
};

export default Tabs;
