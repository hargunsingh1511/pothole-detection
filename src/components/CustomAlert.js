import React from 'react';

const CustomAlert = ({ message, type, onClose }) => {
  const alertStyles = {
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    warning: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className={`p-4 mb-4 rounded ${alertStyles[type] || alertStyles.info}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="text-xl font-bold">×</button>
      </div>
    </div>
  );
};

export default CustomAlert;
