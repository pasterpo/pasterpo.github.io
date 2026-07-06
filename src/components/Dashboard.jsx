import { useState } from 'react';
import { useApp } from '../context/AppContext';
import BrandLogo from './brand/BrandLogo';
import { Plus, FileText, Trash2, FolderOpen, Copy } from 'lucide-react';

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

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

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <BrandLogo size="lg" />
        </div>
        <div className="dashboard-header-right">
          <button className="btn-new-project" onClick={() => setShowNewModal(true)}>
            <Plus size={16} />
            New Project
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        <div className="dashboard-toolbar">
          <div className="dashboard-toolbar-left">
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--ol-text)' }}>
              Your Projects
            </h1>
          </div>
          <div className="dashboard-toolbar-left">
            <div style={{ position: 'relative' }}>
              <input
                className="dashboard-search"
                type="search"
                placeholder="Search projects..."
                value={state.projectSearch}
                onChange={e => dispatch({ type: 'SET_PROJECT_SEARCH', payload: e.target.value })}
              />
            </div>
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
          <div className="dashboard-empty">
            <FolderOpen size={80} />
            {state.projects.length === 0 ? (
              <>
                <h2>No projects yet</h2>
                <p>Create your first project to start writing HTML documents with live preview and PDF export in Clover Leaf.</p>
                <button className="btn-new-project" onClick={() => setShowNewModal(true)}>
                  <Plus size={16} />
                  Create Your First Project
                </button>
              </>
            ) : (
              <>
                <h2>No matching projects</h2>
                <p>Try a different search term.</p>
              </>
            )}
          </div>
        ) : (
          <table className="project-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Modified</th>
                <th>Files</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(project => {
                const fileCount = project.nodes?.filter(n => n.type === 'file').length || 0;
                return (
                  <tr key={project.id} onClick={() => openProject(project.id)}>
                    <td>
                      <div className="project-name-cell">
                        <FileText size={18} />
                        <span>{project.name}</span>
                      </div>
                    </td>
                    <td className="project-date-cell">{formatDate(project.updatedAt)}</td>
                    <td className="project-files-cell">{fileCount} file{fileCount !== 1 ? 's' : ''}</td>
                    <td>
                      <div className="project-actions-cell">
                        <button className="project-action-btn" title="Duplicate" onClick={(e) => handleDuplicate(e, project)}>
                          <Copy size={16} />
                        </button>
                        <button className="project-action-btn danger" title="Delete" onClick={(e) => handleDelete(e, project.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
              <button className="btn-modal-cancel" onClick={() => setShowNewModal(false)}>Cancel</button>
              <button className="btn-modal-confirm" onClick={handleCreate}>Create Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
