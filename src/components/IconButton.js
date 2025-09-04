import React from 'react';
import './IconButton.css';

const IconButton = ({ label, icon }) => {
  const handleClick = () => {
    // Later, this will send a command to the scooter
    console.log(`${label} button clicked`);
  };

  return (
    <button className="icon-button" onClick={handleClick}>
      <div className="icon-button-icon">{icon}</div>
      <div className="icon-button-label">{label}</div>
    </button>
  );
};

export default IconButton;
