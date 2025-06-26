import React from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

const LinkButton: React.FC<LinkProps & { children: React.ReactNode; className?: string }> = ({ children, className = '', ...props }) => (
  <Link
    className={`bg-amber-200 border border-transparent text-gray-700 font-bold rounded-lg px-5 py-3 shadow-lg hover:bg-amber-300 transition-all flex items-center justify-center ${className}`}
    {...props}
  >
    {children}
  </Link>
);

export default LinkButton;
