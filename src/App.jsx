import { useApp } from './context/AppContext';
import Dashboard from './components/Dashboard';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import EditorPane from './components/EditorPane';
import PreviewPane from './components/PreviewPane';

function EditorView() {
  return (
    <div className="app-layout">
      <Toolbar />
      <div className="workspace">
        <Sidebar />
        <EditorPane />
        <div className="resize-handle" />
        <PreviewPane />
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
