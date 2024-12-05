import React, { useState } from 'react';
import { Tabs as MuiTabs, Tab, Box } from '@mui/material';
import TemperatureChart from './TemperatureChart';
import SeaLevelChart from './SeaLevelChart';
import WeatherPatternsMap from './WeatherPatternsMap';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // Take full height of content area
        width: '100%', // Full width
      }}
    >
      <MuiTabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <Tab label="Global Temperature" />
        <Tab label="Sea Levels" />
        <Tab label="Weather Patterns" />
      </MuiTabs>

      <Box
        style={{
          flex: 1, // Take remaining height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
        }}
      >
        {activeTab === 0 && (
          <div style={{ height: '100%', width: '100%' }}>
            <TemperatureChart />
          </div>
        )}
        {activeTab === 1 && (
          <div style={{ height: '100%', width: '100%' }}>
            <SeaLevelChart />
          </div>
        )}
        {activeTab === 2 && (
          <div style={{ height: '100%', width: '100%' }}>
            <WeatherPatternsMap />
          </div>
        )}
      </Box>
    </div>
  );
};

export default Tabs;
