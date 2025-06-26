import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ children, className = '', ...props }) => (
  <select
    className={`border border-gray-200 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 bg-white text-gray-800 ${className}`}
    {...props}
  >
    {children}
  </select>
);

export default Select;
