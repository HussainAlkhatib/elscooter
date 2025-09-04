import React from 'react';
import './index.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { useBluetooth } from './hooks/useBluetooth';

function App() {
  const { connect, disconnect, autoDetect, isConnected, scooterData, deviceInfo, error } = useBluetooth();

  return (
    <div className="app-container">
      <Header 
        onConnect={isConnected ? disconnect : connect} 
        onAutoDetect={autoDetect}
        isConnected={isConnected} 
      />
      {error && <div className="error-message">Error: {error}</div>}
      {deviceInfo && <div className="device-info">{deviceInfo}</div>}
      <Dashboard scooterData={scooterData} isConnected={isConnected} />
      <Footer />
    </div>
  );
}

export default App;