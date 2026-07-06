import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Dashboard from './components/Dashboard';
import HelpPage from './components/HelpPage';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import SplitWorkspace from './components/SplitWorkspace';
import ToastContainer from './components/ToastContainer';

function EditorView() {
  return (
    <div className="app-layout">
      <Toolbar />
      <div className="workspace">
        <Sidebar />
        <SplitWorkspace />
      </div>
    </div>
  );
}

function HomeRoute() {
  const { state } = useApp();

  if (state.view === 'editor' && state.activeProject) {
    return <EditorView />;
  }

  return <Dashboard />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/help" element={<HelpPage />} />
        <Route path="/" element={<HomeRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
