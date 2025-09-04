import React, { useState } from 'react';
import './ToggleButton.css';

const ToggleButton = ({ label, icon }) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
    // Later, this will send a command to the scooter
  };

  return (
    <div className="toggle-button-container">
      <div className="toggle-label">
        {icon && <span className="toggle-icon">{icon}</span>}
        <span>{label}</span>
      </div>
      <label className="switch">
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleButton;
