import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute top-1 left-1 w-10 h-10 border-4 border-transparent border-t-purple-600 rounded-full animate-spin-slow"></div>
        <div className="absolute top-2 left-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
      </div>
      
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-2">Loading Stock Data</h2>
        <p className="text-gray-300 text-sm">Fetching the latest market information...</p>
        
        <div className="flex gap-1 justify-center mt-4">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
