import React from 'react';
import './Loader.css';

/**
 * A simple pulsing-dot loading spinner.
 */
const Loader = () => {
  return (
    <div className="loader-container" id="loader">
      <div className="loader-dots">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Loader;
