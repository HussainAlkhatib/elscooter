import React from 'react';
import './Dashboard.css';
import Speedometer from './Speedometer';
import Battery from './Battery';
import Card from './Card';
import ToggleButton from './ToggleButton';
import ControlSlider from './ControlSlider';
import IconButton from './IconButton';

const Dashboard = ({ scooterData, isConnected }) => {
  const { speed, battery } = scooterData;

  return (
    <main className="dashboard">
      <Speedometer speed={speed} />
      
      <div className="stats-grid">
        <Battery level={battery} />
      </div>

      <Card>
        <ControlSlider 
          label="Speed Limit" 
          icon="️⚡️" 
          min={5} 
          max={30} 
          initialValue={25} 
        />
      </Card>

      <Card>
        <ToggleButton label="Headlight" icon="💡" />
        <ToggleButton label="Taillight" icon="🚨" />
      </Card>

      <div className="actions-grid">
        <IconButton label="Horn" icon="🔊" />
        <IconButton label="Lock" icon="🔒" />
      </div>
    </main>
  );
};

export default Dashboard;