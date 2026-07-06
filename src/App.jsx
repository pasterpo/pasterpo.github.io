import { useApp } from './context/AppContext';
import Dashboard from './components/Dashboard';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import SplitWorkspace from './components/SplitWorkspace';

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

export default function App() {
  const { state } = useApp();

  if (state.view === 'editor' && state.activeProject) {
    return <EditorView />;
  }

  return <Dashboard />;
}
