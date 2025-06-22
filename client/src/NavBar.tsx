
interface NavBarProps {
  onToggle: () => void;
}

function NavBar({ onToggle }: NavBarProps) {
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
          <button className="bg-navitem border border-gray-300 px-2 py-1 rounded">
            Upload
          </button>
        </li>
        <li>
          <button className="bg-navitem border border-gray-300 px-2 py-1 rounded">
            Mapping
          </button>
        </li>
        <li>
          <button className="bg-navitem border border-gray-300 px-2 py-1 rounded">
            Transform
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
