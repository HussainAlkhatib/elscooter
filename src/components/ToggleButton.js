import React, { useState } from 'react';
import './ToggleButton.css';

const ToggleButton = ({ label, icon, readOnly }) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    if (readOnly) return; // Prevent interaction in read-only mode
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
        <input type="checkbox" checked={isOn} onChange={handleToggle} disabled={readOnly} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleButton;