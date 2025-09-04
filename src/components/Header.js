import React from 'react';
import './Header.css';

const Header = ({ onConnect, onAutoDetect, isConnected }) => {
  return (
    <header className="app-header">
      <h1 className="app-title">Scooter Control</h1>
      <div className="header-buttons">
        <button onClick={onAutoDetect} className="auto-detect-button">
          Auto Detect
        </button>
        <button onClick={onConnect} className={`connect-button ${isConnected ? 'connected' : ''}`}>
          {isConnected ? 'Connected' : 'Connect'}
        </button>
      </div>
    </header>
  );
};

export default Header;
