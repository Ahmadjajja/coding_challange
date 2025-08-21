import React from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-content">
        {/* Error Icon */}
        <div className="error-icon">
          <FaExclamationTriangle />
        </div>
        
        {/* Error Message */}
        <h2>Oops! Something went wrong</h2>
        <p>{message}</p>
        
        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="retry-button"
        >
          <FaRedo />
          Try Again
        </button>
      </div>
      
      {/* Additional Info */}
      <div className="error-info">
        <p>This might be due to:</p>
        <ul>
          <li>• Network connectivity issues</li>
          <li>• API service temporarily unavailable</li>
          <li>• Rate limiting from the data provider</li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorMessage;
