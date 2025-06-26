import NavItem from './components/NavItem';

interface NavBarProps {
  onToggle: () => void;
}

function NavBar({ onToggle }: NavBarProps) {
  return (
    <nav className="bg-menu p-4 border-gray-400 border-b">
      <ul className="flex items-center space-x-4">
        <li>
          <button
            type="button"
            onClick={onToggle}
            className="bg-navitem px-2 py-1 border border-gray-300 rounded"
          >
            ☰
          </button>
        </li>
        <li className="font-semibold">247 Group</li>
        <li>
          <NavItem to="/" end>
            Home
          </NavItem>
        </li>
        <li>
          <NavItem to="/imports">
            Import
          </NavItem>
        </li>
        <li>
          <NavItem to="/data">
            Data
          </NavItem>
        </li>

      </ul>
    </nav>
  );
}

export default NavBar;
