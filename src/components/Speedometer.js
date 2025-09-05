import React from 'react';
import './Speedometer.css';

const Speedometer = ({ speed }) => {
  return (
    <div className="speedometer-widget">
      <div className="speed-display">
        <span className="speed-value">{speed}</span>
        <span className="speed-unit">km/h</span>
      </div>
    </div>
  );
};

export default Speedometer;