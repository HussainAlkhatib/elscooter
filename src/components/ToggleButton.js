import React, { useState } from 'react';
import './ToggleButton.css';

const ToggleButton = ({ label, icon, readOnly, writeCommand }) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    if (readOnly) return; // Prevent interaction in read-only mode
    const newState = !isOn;
    setIsOn(newState);

    // --- IMPORTANT: Scooter-specific command ---
    // You MUST replace this with the actual command for your scooter.
    let command;
    if (label === "Headlight") {
      command = newState ? [0x03, 0x01, 0x01] : [0x03, 0x01, 0x00]; // Placeholder for Headlight ON/OFF
    } else if (label === "Taillight") {
      command = newState ? [0x03, 0x02, 0x01] : [0x03, 0x02, 0x00]; // Placeholder for Taillight ON/OFF
    } else if (label === "Cruise Control") {
      command = newState ? [0x06, 0x01] : [0x06, 0x00]; // Placeholder for Cruise Control ON/OFF
    }

    if (command) {
      writeCommand(command);
    }
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