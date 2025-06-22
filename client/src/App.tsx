import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './index.css';
import NavBar from './NavBar';
import ImportPage from './pages/ImportPage';
import MappingPage from './pages/MappingPage';
import TransformPage from './pages/TransformPage';
import UploadPage from './pages/UploadPage';
import OnlineCheckPage from './pages/OnlineCheckPage';
import { ImporterProvider } from './context/ImporterContext';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <ImporterProvider>
        <div className="flex flex-col h-full">
          <NavBar onToggle={() => setCollapsed(!collapsed)} />
          <div className="flex flex-1 overflow-hidden">
            <aside
              className={`bg-menu border-r border-gray-400 p-4 transition-all duration-300 overflow-auto ${
                collapsed ? 'w-0' : 'w-64'
              }`}
            >
              <p className="font-semibold mb-2">Import</p>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      `block rounded border border-gray-300 p-2 text-sm ${
                        isActive ? 'bg-navitem' : 'bg-white'
                      }`
                    }
                  >
                    Import
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/mapping"
                    className={({ isActive }) =>
                      `block rounded border border-gray-300 p-2 text-sm ${
                        isActive ? 'bg-navitem' : 'bg-white'
                      }`
                    }
                  >
                    Mapping
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/transform"
                    className={({ isActive }) =>
                      `block rounded border border-gray-300 p-2 text-sm ${
                        isActive ? 'bg-navitem' : 'bg-white'
                      }`
                    }
                  >
                    Transform
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/upload"
                    className={({ isActive }) =>
                      `block rounded border border-gray-300 p-2 text-sm ${
                        isActive ? 'bg-navitem' : 'bg-white'
                      }`
                    }
                  >
                    Upload
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/online-check"
                    className={({ isActive }) =>
                      `block rounded border border-gray-300 p-2 text-sm ${
                        isActive ? 'bg-navitem' : 'bg-white'
                      }`
                    }
                  >
                    Online Check
                  </NavLink>
                </li>
              </ul>
            </aside>
            <main className="flex-1 overflow-auto p-4">
              <Routes>
                <Route path="/" element={<ImportPage />} />
                <Route path="/mapping" element={<MappingPage />} />
                <Route path="/transform" element={<TransformPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/online-check" element={<OnlineCheckPage />} />
              </Routes>
            </main>
          </div>
          <footer className="bg-menu border-t border-gray-400 p-2 text-sm">
            Statusleiste
          </footer>
        </div>
      </ImporterProvider>
    </Router>
  );
}

export default App;
