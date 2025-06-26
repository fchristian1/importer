import { useState } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  useLocation,
  Routes,
  Route,
} from 'react-router-dom';
import './index.css';
import NavBar from './NavBar';
import { ImporterProvider } from './context/ImporterContext';
import NavItem from './components/NavItem';
import type { ReactElement } from 'react';
// Seiten-Komponenten importieren
import HomePage from './pages/HomePage';
import ImportOverviewPage from './pages/ImportOverviewPage';
import ImportPage from './pages/ImportPage';
import MappingPage from './pages/MappingPage';
import TransformPage from './pages/TransformPage';
import UploadPage from './pages/UploadPage';
import OnlineCheckPage from './pages/OnlineCheckPage';
import ImportStatusPage from './pages/ImportStatusPage';
import DataOverviewPage from './pages/DataOverviewPage';
import DataSourcesPage from './pages/DataSourcesPage';
import DataCleanupPage from './pages/DataCleanupPage';

// Typdefinition für Menüeinträge
interface MenuRoute {
  to: string;
  label: string;
  element: ReactElement;
  end?: boolean;
}
interface MenuGroup {
  label: string;
  children: MenuItem[];
}
type MenuItem = MenuRoute | MenuGroup;

// Verschachtelte Menü-Konfiguration inkl. Routing-Komponenten
const menuConfig: MenuItem[] = [
  {
    to: '/',
    label: 'Home',
    element: <HomePage />,
    end: true,
  },
  {
    label: 'Data',
    children: [
      { to: '/data', label: 'Übersicht', element: <DataOverviewPage />, end: true },
      { to: '/data/sources', label: 'Quellen', element: <DataSourcesPage /> },
      { to: '/data/cleanup', label: 'Cleanup', element: <DataCleanupPage /> },
    ],
  },
  {
    label: 'Import',
    children: [
      { to: '/imports', label: 'Übersicht', element: <ImportOverviewPage />, end: true },
      { to: '/imports/import', label: 'Import', element: <ImportPage /> },
      { to: '/imports/mapping', label: 'Mapping', element: <MappingPage /> },
      { to: '/imports/transform', label: 'Transform', element: <TransformPage /> },
      { to: '/imports/upload', label: 'Upload', element: <UploadPage /> },
      { to: '/imports/online-check', label: 'Online Check', element: <OnlineCheckPage /> },
      { to: '/imports/status', label: 'Status', element: <ImportStatusPage /> },
    ],
  },
];

// Rekursive Hilfsfunktion für Menü-Rendering
function renderMenu(items: MenuItem[], currentPath: string): React.ReactElement[] {
  return items.flatMap(item => {
    if ('children' in item) {
      // Zeige nur das passende Submenü an
      const isActive = item.children.some(child => 'to' in child && currentPath.startsWith(child.to));
      return isActive ? renderMenu(item.children, currentPath) : [];
    }
    return [
      <li className="flex text-nowrap" key={item.to}>
        <NavItem to={item.to} {...(item.end ? { end: true } : {})}>
          {item.label}
        </NavItem>
      </li>
    ];
  });
}

// Rekursive Hilfsfunktion für Routing
function renderRoutes(items: MenuItem[]): React.ReactElement[] {
  return items.flatMap(item => {
    if ('children' in item) return renderRoutes(item.children);
    return [
      <Route key={item.to} path={item.to} element={item.element} index={!!item.end} />
    ];
  });
}

function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      <NavBar onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`bg-menu border-r border-gray-400 p-4 transition-all duration-300 overflow-auto ${
            collapsed ? 'w-0' : 'w-64'
          }`}
        >
          <p className="mb-2 font-semibold">
            {/* Zeige aktiven Bereich an */}
            {menuConfig.find(m => 'children' in m && m.children.some(child => 'to' in child && location.pathname.startsWith(child.to)))?.label }
          </p>
          <ul className="space-y-2">
            {renderMenu(menuConfig, location.pathname)}
          </ul>
        </aside>
        <main className="flex-1 p-4 overflow-hidden">
          <Routes>
            {renderRoutes(menuConfig)}
          </Routes>
        </main>
      </div>
      <footer className="bg-menu p-2 border-gray-400 border-t text-sm">
        Statusleiste
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ImporterProvider>
        <Layout />
      </ImporterProvider>
    </Router>
  );
}

export default App;

// Hinweis: Die Navigation und das Routing werden jetzt komplett aus menuConfig generiert.
