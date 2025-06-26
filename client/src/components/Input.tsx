import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => (
  <input
    className={`border border-gray-200 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 bg-white text-gray-800 ${className}`}
    {...props}
  />
);

export default Input;
