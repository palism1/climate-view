import React, { useState } from 'react';
import { Tabs as MuiTabs, Tab, Box } from '@mui/material';
import TemperatureChart from './TemperatureChart';
import SeaLevelChart from './SeaLevelChart';
import WeatherPatternsMap from './WeatherPatternsMap';
import LiveTemperatureMap from './LiveTemperatureMap'; // Import the new component

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
      {/* Tab Headers */}
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
        <Tab label="Live Temperature" /> {/* New Tab */}
      </MuiTabs>

      {/* Tab Content */}
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
        {activeTab === 3 && ( // New Content for Live Temperature Tab
          <div style={{ height: '100%', width: '100%' }}>
            <LiveTemperatureMap />
          </div>
        )}
      </Box>
    </div>
  );
};

export default Tabs;
