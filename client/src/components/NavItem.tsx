import React from 'react';
import { NavLink } from 'react-router-dom';
import type { NavLinkProps } from 'react-router-dom';

interface NavItemProps extends NavLinkProps {
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ children, className = '', ...props }) => (
  <NavLink
    {...props}
    className={({ isActive }) =>
      `${isActive
        ? 'bg-amber-200 text-amber-700'
        : 'bg-white text-gray-800 hover:bg-amber-100 '} border w-full border-gray-300 px-2 py-1 rounded transition-colors ${className}`
    }
  >
    {children}
  </NavLink>
);

export default NavItem;
