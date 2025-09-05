import React, { useState } from 'react';
import './index.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { useBluetooth } from './hooks/useBluetooth';

function App() {
  const { connect, disconnect, autoDetect, writeCommand, isConnected, scooterData, deviceInfo, error } = useBluetooth();
  const [viewingFeatures, setViewingFeatures] = useState(false);

  const handleViewFeatures = () => {
    setViewingFeatures(true);
  };

  const handleBackToConnect = () => {
    setViewingFeatures(false);
  };

  return (
    <div className="app-container">
      <Header 
        onConnect={isConnected ? disconnect : connect} 
        onAutoDetect={autoDetect}
        isConnected={isConnected} 
        onViewFeatures={handleViewFeatures}
        onBackToConnect={handleBackToConnect}
        viewingFeatures={viewingFeatures}
      />
      {error && <div className="error-message">Error: {error}</div>}
      {deviceInfo && <div className="device-info">{deviceInfo}</div>}

      {!isConnected && !viewingFeatures ? (
        <div className="disconnected-state">
          <p>Connect your scooter to get started.</p>
          <button onClick={autoDetect} className="auto-detect-button large-button">
            Auto Detect Scooter
          </button>
          <button onClick={connect} className="connect-button large-button">
            Connect Manually
          </button>
        </div>
      ) : (
        <Dashboard 
          scooterData={scooterData} 
          isConnected={isConnected} 
          readOnly={viewingFeatures && !isConnected}
          writeCommand={writeCommand}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
