import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner">
        {/* Outer ring */}
        <div className="spinner-outer"></div>
        
        {/* Inner ring */}
        <div className="spinner-inner"></div>
        
        {/* Center dot */}
        <div className="spinner-dot"></div>
      </div>
      
      <div className="loading-text">
        <h2>Loading Stock Data</h2>
        <p>Fetching real-time market information...</p>
      </div>
      
      {/* Animated dots */}
      <div className="loading-dots">
        <div className="loading-dot" style={{ backgroundColor: '#3b82f6' }}></div>
        <div className="loading-dot" style={{ backgroundColor: '#8b5cf6' }}></div>
        <div className="loading-dot" style={{ backgroundColor: '#3b82f6' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
