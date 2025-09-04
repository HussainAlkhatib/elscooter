import React from 'react';
import './Header.css';

const Header = ({ onConnect, onAutoDetect, isConnected, onViewFeatures, onBackToConnect, viewingFeatures }) => {
  return (
    <header className="app-header">
      <h1 className="app-title">Scooter Control</h1>
      <div className="header-buttons">
        {!isConnected && !viewingFeatures && (
          <button onClick={onViewFeatures} className="view-features-button">
            View Features
          </button>
        )}
        {viewingFeatures && (
          <button onClick={onBackToConnect} className="back-button">
            Back
          </button>
        )}
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