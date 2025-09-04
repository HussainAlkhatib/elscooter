import React from 'react';
import './Battery.css';

const Battery = ({ level }) => {
  const batteryColor = level > 20 ? (level > 50 ? '#34c759' : '#ffcc00') : '#ff3b30';

  return (
    <div className="battery-widget">
      <div className="battery-icon">
        <div className="battery-level" style={{ height: `${level}%`, backgroundColor: batteryColor }}></div>
      </div>
      <span className="battery-text">{level}%</span>
    </div>
  );
};

export default Battery;
