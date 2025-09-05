import React, { useState } from 'react';
import './ControlSlider.css';

const ControlSlider = ({ label, icon, min, max, initialValue, readOnly, writeCommand }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    if (readOnly) return; // Prevent interaction in read-only mode
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue);

    // --- IMPORTANT: Scooter-specific command ---
    // You MUST replace this with the actual command for your scooter.
    // Example: [0x01, 0x02, newValue, 0x00] (placeholder)
    const command = [0x01, 0x02, newValue, 0x00]; // Placeholder command
    writeCommand(command);
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
