import React, { useState } from "react";
import { Tabs as MuiTabs, Tab, Box } from "@mui/material";
import TemperatureChart from "./TemperatureChart";
import SeaLevelChart from "./SeaLevelChart";
import WeatherPatternsMap from "./WeatherPatternsMap";
import LiveTemperatureMap from "./LiveTemperatureMap"; // Import the new component
import "./Tabs.css"; // Import the CSS file

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
        <Tab label="Live Temperature" /> {/* New Tab */}
      </MuiTabs>

      <Box className="box-container">
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
        {activeTab === 3 && ( // New Content for Live Temperature Tab
          <div className="live-temperature-container">
            <LiveTemperatureMap />
          </div>
        )}
      </Box>
    </div>
  );
};

export default Tabs;
