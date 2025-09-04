import React, { useState } from 'react';
import './ControlSlider.css';

const ControlSlider = ({ label, icon, min, max, initialValue, readOnly }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    if (readOnly) return; // Prevent interaction in read-only mode
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
          disabled={readOnly} // Disable the input
        />
        <span className="slider-value">{value} km/h</span>
      </div>
    </div>
  );
};

export default ControlSlider;