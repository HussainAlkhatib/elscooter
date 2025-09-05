import React from 'react';
import './Dashboard.css';
import Speedometer from './Speedometer';
import Battery from './Battery';
import Card from './Card';
import ToggleButton from './ToggleButton';
import ControlSlider from './ControlSlider';
import IconButton from './IconButton';

const Dashboard = ({ scooterData, isConnected, readOnly, writeCommand }) => {
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
          readOnly={readOnly}
          writeCommand={writeCommand}
        />
      </Card>

      <Card>
        <ToggleButton label="Headlight" icon="💡" readOnly={readOnly} writeCommand={writeCommand} />
        <ToggleButton label="Taillight" icon="🚨" readOnly={readOnly} writeCommand={writeCommand} />
        <ToggleButton label="Cruise Control" icon=" cruise" readOnly={readOnly} writeCommand={writeCommand} />
      </Card>

      <div className="actions-grid">
        <IconButton label="Horn" icon="🔊" readOnly={readOnly} writeCommand={writeCommand} />
        <IconButton label="Lock" icon="🔒" readOnly={readOnly} writeCommand={writeCommand} />
        <IconButton label="Eco Mode" icon="🍃" readOnly={readOnly} writeCommand={writeCommand} />
        <IconButton label="Sport Mode" icon="🚀" readOnly={readOnly} writeCommand={writeCommand} />
      </div>
    </main>
  );
};

export default Dashboard;
