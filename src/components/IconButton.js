import React from 'react';
import './IconButton.css';

const IconButton = ({ label, icon, readOnly, writeCommand }) => {
  const handleClick = () => {
    if (readOnly) return; // Prevent interaction in read-only mode

    // --- IMPORTANT: Scooter-specific command ---
    // You MUST replace this with the actual command for your scooter.
    let command;
    if (label === "Horn") {
      command = [0x04, 0x01]; // Placeholder for Horn command
    } else if (label === "Lock") {
      command = [0x05, 0x01]; // Placeholder for Lock command
    } else if (label === "Unlock") {
      command = [0x05, 0x00]; // Placeholder for Unlock command
    } else if (label === "Eco Mode") {
      command = [0x07, 0x01]; // Placeholder for Eco Mode command
    } else if (label === "Sport Mode") {
      command = [0x07, 0x02]; // Placeholder for Sport Mode command
    }

    if (command) {
      writeCommand(command);
    }
    console.log(`${label} button clicked`);
  };

  return (
    <button className="icon-button" onClick={handleClick} disabled={readOnly}>
      <div className="icon-button-icon">{icon}</div>
      <div className="icon-button-label">{label}</div>
    </button>
  );
};

export default IconButton;