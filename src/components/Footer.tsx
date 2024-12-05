import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        textAlign: 'center',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        color: '#555',
        width: '100%',
      }}
    >
      <p>© 2024 ClimateViz | Powered by Flask & React</p>
    </footer>
  );
};

export default Footer;
