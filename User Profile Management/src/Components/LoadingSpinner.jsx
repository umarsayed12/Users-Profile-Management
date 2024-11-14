import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-96 bg-white rounded-lg shadow">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;
