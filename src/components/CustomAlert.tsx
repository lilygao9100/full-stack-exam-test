import React from 'react';

interface CustomAlterProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

// This component receives a type and a message as props.
const CustomAlert: React.FC<CustomAlterProps> = ( {type, message}) => {
  // The background colour is determined based on the type.
  // Each type has a corresponding colour.
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
    }[type];

    return (
      <div className={`${bgColor} text-white p-4 rounded-md mb-4`}>
        {message}
      </div>
    );
};

export default CustomAlert;