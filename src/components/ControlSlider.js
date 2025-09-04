import React, { useState } from 'react';
import './ControlSlider.css';

const ControlSlider = ({ label, icon, min, max, initialValue }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
    // Later, this will send a command to the scooter
  };

  return (
    <div className="control-slider-container">
      <div className="slider-label">
        {icon && <span className="slider-icon">{icon}</span>}
        <span>{label}</span>
      </div>
      <div className="slider-wrapper">
        <input 
          type="range" 
          min={min} 
          max={max} 
          value={value} 
          className="control-slider" 
          onChange={handleChange} 
        />
        <span className="slider-value">{value} km/h</span>
      </div>
    </div>
  );
};

export default ControlSlider;
