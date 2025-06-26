import React from 'react';

interface DatasetProps {
  label: string;
  value: string;
  className?: string;
}

const Dataset: React.FC<DatasetProps> = ({ label, value, className = '' }) => (
  <div className={`border border-gray-200 rounded px-3 py-2 shadow-sm bg-gray-50 text-gray-800 ${className}`}>
    <span className="font-semibold text-gray-700">{label}: </span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export default Dataset;
