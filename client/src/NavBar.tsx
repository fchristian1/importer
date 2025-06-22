
interface NavBarProps {
  onToggle: () => void;
}

function NavBar({ onToggle }: NavBarProps) {
  return (
    <nav className="bg-amber-200 border-b border-amber-300 p-4 rounded-b-lg">
      <ul className="flex items-center space-x-4">
        <li>
          <button
            type="button"
            onClick={onToggle}
            className="bg-gray-200 border border-gray-300 px-2 py-1 rounded"
          >
            ☰
          </button>
        </li>
        <li className="font-semibold">Importer</li>
      </ul>
    </nav>
  );
}

export default NavBar;
