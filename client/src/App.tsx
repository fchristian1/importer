import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
} from 'react-router-dom';
import './index.css';
import NavBar from './NavBar';
import ImportOverviewPage from './pages/ImportOverviewPage';
import ImportPage from './pages/ImportPage';
import MappingPage from './pages/MappingPage';
import TransformPage from './pages/TransformPage';
import UploadPage from './pages/UploadPage';
import OnlineCheckPage from './pages/OnlineCheckPage';
import DataOverviewPage from './pages/DataOverviewPage';
import DataSourcesPage from './pages/DataSourcesPage';
import DataCleanupPage from './pages/DataCleanupPage';
import { ImporterProvider } from './context/ImporterContext';

function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isData = location.pathname.startsWith('/data');

  const menuItems = isData
    ? [
        { to: '/data', label: 'Übersicht', end: true },
        { to: '/data/sources', label: 'Quellen' },
        { to: '/data/cleanup', label: 'Cleanup' },
      ]
    : [
        { to: '/', label: 'Übersicht', end: true },
        { to: '/import', label: 'Import' },
        { to: '/mapping', label: 'Mapping' },
        { to: '/transform', label: 'Transform' },
        { to: '/upload', label: 'Upload' },
        { to: '/online-check', label: 'Online Check' },
      ];

  return (
    <div className="flex flex-col h-full">
      <NavBar onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`bg-menu border-r border-gray-400 p-4 transition-all duration-300 overflow-auto ${
            collapsed ? 'w-0' : 'w-64'
          }`}
        >
          <p className="font-semibold mb-2">{isData ? 'Data' : 'Import'}</p>
          <ul className="space-y-2">
            {menuItems.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  {...(end ? { end: true } : {})}
                  className={({ isActive }) =>
                    `block rounded border border-gray-300 p-2 text-sm ${
                      isActive ? 'bg-navitem' : 'bg-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 overflow-auto p-4">
          <Routes>
            <Route path="/" element={<ImportOverviewPage />} />
            <Route path="/import" element={<ImportPage />} />
            <Route path="/mapping" element={<MappingPage />} />
            <Route path="/transform" element={<TransformPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/online-check" element={<OnlineCheckPage />} />
            <Route path="/data" element={<DataOverviewPage />} />
            <Route path="/data/sources" element={<DataSourcesPage />} />
            <Route path="/data/cleanup" element={<DataCleanupPage />} />
          </Routes>
        </main>
      </div>
      <footer className="bg-menu border-t border-gray-400 p-2 text-sm">
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
