import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`bg-amber-200 border border-gray-200 text-gray-700 font-semibold rounded px-4 py-2 shadow-md hover:bg-amber-300 transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
