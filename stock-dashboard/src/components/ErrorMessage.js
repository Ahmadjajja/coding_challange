import React from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
        <FaExclamationTriangle className="w-8 h-8 text-red-400" />
      </div>
      
      <div className="text-center max-w-md">
        <h2 className="text-xl font-semibold text-white mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-300 text-sm mb-6">{message}</p>
        
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 mx-auto transition-all duration-200 transform hover:scale-105"
        >
          <FaRedo className="text-sm" />
          Try Again
        </button>
      </div>
      
      <div className="text-center text-gray-400 text-xs max-w-md">
        <p className="mb-2">If the problem persists, please check:</p>
        <ul className="space-y-1">
          <li>• Your internet connection</li>
          <li>• API service availability</li>
          <li>• Try refreshing the page</li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorMessage;
