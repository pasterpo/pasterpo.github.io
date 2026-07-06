import { useState } from 'react';
import { useApp } from '../context/AppContext';
import BrandLogo from './brand/BrandLogo';
import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const { state, dispatch, createProject, openProject, deleteProject } = useApp();
  const [showNewModal, setShowNewModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const query = state.projectSearch.toLowerCase();
  let filtered = state.projects;
  if (query) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
  }

  if (state.projectSort === 'alpha') {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  } else if (state.projectSort === 'recent') {
    filtered = [...filtered].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }

  const handleCreate = () => {
    const name = newProjectName.trim() || 'Untitled Project';
    createProject(name);
    setNewProjectName('');
    setShowNewModal(false);
  };

  const handleDuplicate = (e, project) => {
    e.stopPropagation();
    const copy = JSON.parse(JSON.stringify(project));
    copy.id = crypto.randomUUID();
    copy.name = `${project.name} (Copy)`;
    copy.updatedAt = new Date().toISOString();
    const idMap = new Map();
    copy.nodes.forEach(n => {
      const newId = crypto.randomUUID();
      idMap.set(n.id, newId);
      n.id = newId;
    });
    copy.nodes.forEach(n => {
      if (n.parentId && idMap.has(n.parentId)) n.parentId = idMap.get(n.parentId);
    });
    if (copy.entryFileId && idMap.has(copy.entryFileId)) copy.entryFileId = idMap.get(copy.entryFileId);
    if (copy.selectedFileId && idMap.has(copy.selectedFileId)) copy.selectedFileId = idMap.get(copy.selectedFileId);
    copy.openFileIds = (copy.openFileIds || []).map(id => idMap.get(id) || id);
    dispatch({ type: 'ADD_PROJECT', payload: copy });
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (confirm('Delete this project? This cannot be undone.')) {
      deleteProject(id);
    }
  };

  const emptyVariant = state.projects.length === 0 ? 'empty' : 'no-results';

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <BrandLogo size="lg" />
        </div>
        <div className="dashboard-header-right">
          <button type="button" className="btn-new-project" onClick={() => setShowNewModal(true)}>
            <Plus size={16} />
            New Project
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        <div className="dashboard-toolbar">
          <h1 className="dashboard-title">Your Projects</h1>
          <div className="dashboard-toolbar-controls">
            <input
              className="dashboard-search"
              type="search"
              placeholder="Search projects..."
              value={state.projectSearch}
              onChange={e => dispatch({ type: 'SET_PROJECT_SEARCH', payload: e.target.value })}
            />
            <select
              className="dashboard-sort"
              value={state.projectSort}
              onChange={e => dispatch({ type: 'SET_PROJECT_SORT', payload: e.target.value })}
            >
              <option value="recent">Last Modified</option>
              <option value="alpha">Name A–Z</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            variant={emptyVariant}
            onCreateProject={() => setShowNewModal(true)}
          />
        ) : (
          <div className="project-grid" role="list">
            {filtered.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={openProject}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {showNewModal && (
        <div className="modal-overlay" onClick={() => setShowNewModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2>New Project</h2>
            <p>Give your project a name. You can always rename it later.</p>
            <input
              className="modal-input"
              type="text"
              placeholder="My Document"
              value={newProjectName}
              onChange={e => setNewProjectName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleCreate(); }}
              autoFocus
            />
            <div className="modal-actions">
              <button type="button" className="btn-modal-cancel" onClick={() => setShowNewModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn-modal-confirm" onClick={handleCreate}>
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
