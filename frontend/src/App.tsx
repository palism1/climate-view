import React from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Footer from './components/Footer';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // Full height of the viewport
        width: '100vw', // Full width of the viewport
        backgroundColor: '#121212', // Dark theme background
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content (Tabs and Charts/Maps) */}
      <div
        style={{
          flex: 1, // Fill remaining space between header and footer
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Tabs />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
