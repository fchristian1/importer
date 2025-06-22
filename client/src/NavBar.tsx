import { NavLink } from 'react-router-dom';

interface NavBarProps {
  onToggle: () => void;
}

function NavBar({ onToggle }: NavBarProps) {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `bg-navitem border border-gray-300 px-2 py-1 rounded ${isActive ? 'font-bold' : ''}`;

  return (
    <nav className="bg-menu border-b border-gray-400 p-4">
      <ul className="flex items-center space-x-4">
        <li>
          <button
            type="button"
            onClick={onToggle}
            className="bg-navitem border border-gray-300 px-2 py-1 rounded"
          >
            ☰
          </button>
        </li>
        <li className="font-semibold">Importer</li>
        <li>
          <NavLink to="/" end className={linkStyle}>
            Import
          </NavLink>
        </li>
        <li>
          <NavLink to="/mapping" className={linkStyle}>
            Mapping
          </NavLink>
        </li>
        <li>
          <NavLink to="/transform" className={linkStyle}>
            Transform
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
