import React from 'react';
import './Dashboard.css';
import Speedometer from './Speedometer';
import Battery from './Battery';
import Card from './Card';
import ToggleButton from './ToggleButton';
import ControlSlider from './ControlSlider';
import IconButton from './IconButton';

const Dashboard = ({ scooterData, isConnected, readOnly }) => {
  const { speed, battery } = scooterData;

  return (
    <main className="dashboard">
      {readOnly && <div className="read-only-overlay">View Only Mode</div>}
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
          readOnly={readOnly}
        />
      </Card>

      <Card>
        <ToggleButton label="Headlight" icon="💡" readOnly={readOnly} />
        <ToggleButton label="Taillight" icon="🚨" readOnly={readOnly} />
      </Card>

      <div className="actions-grid">
        <IconButton label="Horn" icon="🔊" readOnly={readOnly} />
        <IconButton label="Lock" icon="🔒" readOnly={readOnly} />
      </div>
    </main>
  );
};

export default Dashboard;
