import React from 'react';
import './IconButton.css';

const IconButton = ({ label, icon, readOnly }) => {
  const handleClick = () => {
    if (readOnly) return; // Prevent interaction in read-only mode
    // Later, this will send a command to the scooter
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