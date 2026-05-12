import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FolderOpen, Search, MessageSquare, Settings, ChevronRight, File, Folder, Plus, Trash2, Edit3 } from 'lucide-react';

const PANELS = [
  { id: 'files', icon: FolderOpen, label: 'File Tree' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'review', icon: MessageSquare, label: 'Review' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

function FileTreeNode({ node, nodes, depth = 0 }) {
  const { state, openFile, deleteNode, renameNode } = useApp();
  const [expanded, setExpanded] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(node.name);
  const children = nodes.filter(n => n.parentId === node.id).sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  const isActive = state.activeFileId === node.id;

  const handleClick = () => {
    if (node.type === 'folder') setExpanded(!expanded);
    else openFile(node.id);
  };

  const handleRename = () => {
    if (editName.trim() && editName !== node.name) renameNode(node.id, editName.trim());
    setEditing(false);
  };

  if (node.parentId === null) {
    return <div className="file-tree">{children.map(c => <FileTreeNode key={c.id} node={c} nodes={nodes} depth={0} />)}</div>;
  }

  return (
    <div>
      <div
        className={`file-tree-item ${isActive ? 'active' : ''} ${node.type === 'folder' ? 'folder' : ''}`}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
        onClick={handleClick}
        onDoubleClick={(e) => { e.stopPropagation(); setEditName(node.name); setEditing(true); }}
      >
        {node.type === 'folder' && (
          <span className={`file-tree-folder-toggle ${expanded ? 'open' : ''}`}>
            <ChevronRight size={12} />
          </span>
        )}
        {node.type === 'folder' ? <Folder size={16} /> : <File size={16} />}
        {editing ? (
          <input
            autoFocus
            value={editName}
            onChange={e => setEditName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={e => { if (e.key === 'Enter') handleRename(); if (e.key === 'Escape') setEditing(false); }}
            onClick={e => e.stopPropagation()}
            style={{ flex: 1, padding: '1px 4px', border: '1px solid var(--ol-green)', borderRadius: 3, fontSize: 'inherit', outline: 'none', minWidth: 0 }}
          />
        ) : (
          <span className="name truncate">{node.name}</span>
        )}
      </div>
      {node.type === 'folder' && expanded && (
        <div className="file-tree-children">
          {children.map(c => <FileTreeNode key={c.id} node={c} nodes={nodes} depth={depth + 1} />)}
        </div>
      )}
    </div>
  );
}

function FilesPanel() {
  const { state, addFile, addFolder } = useApp();
  const project = state.activeProject;
  if (!project) return null;
  const root = project.nodes.find(n => n.parentId === null);

  const handleNewFile = () => {
    const name = prompt('File name:', 'new-file.html');
    if (name) addFile(root.id, name);
  };

  const handleNewFolder = () => {
    const name = prompt('Folder name:', 'new-folder');
    if (name) addFolder(root.id, name);
  };

  return (
    <>
      <div className="sidebar-panel-header">
        <span className="sidebar-panel-title">Files</span>
        <div className="sidebar-panel-actions">
          <button className="sidebar-panel-action" onClick={handleNewFile} title="New File"><Plus size={16} /></button>
          <button className="sidebar-panel-action" onClick={handleNewFolder} title="New Folder"><Folder size={16} /></button>
        </div>
      </div>
      <div className="sidebar-panel-body">
        {root && <FileTreeNode node={root} nodes={project.nodes} />}
      </div>
    </>
  );
}

function SearchPanel() {
  const { state, openFile, getNodePath } = useApp();
  const [query, setQuery] = useState('');
  const project = state.activeProject;
  const results = [];

  if (project && query.trim()) {
    const q = query.toLowerCase();
    project.nodes.filter(n => n.type === 'file' && n.content).forEach(node => {
      const lines = (node.content || '').split('\n');
      lines.forEach((line, i) => {
        if (line.toLowerCase().includes(q)) {
          results.push({ node, lineNum: i + 1, line: line.trim() });
        }
      });
    });
  }

  return (
    <>
      <div className="sidebar-panel-header">
        <span className="sidebar-panel-title">Search</span>
      </div>
      <div className="search-input-wrap">
        <input className="search-input" placeholder="Search in files..." value={query} onChange={e => setQuery(e.target.value)} />
      </div>
      <div className="sidebar-panel-body">
        {results.slice(0, 50).map((r, i) => (
          <div key={i} className="search-result-item" onClick={() => openFile(r.node.id)}>
            <div className="search-result-file">{r.node.name}:{r.lineNum}</div>
            <div className="search-result-line">{r.line}</div>
          </div>
        ))}
        {query && results.length === 0 && <p style={{ padding: 12, color: 'var(--ol-text-tertiary)', fontSize: '0.8rem' }}>No results found.</p>}
      </div>
    </>
  );
}

function ReviewPanel() {
  return (
    <>
      <div className="sidebar-panel-header"><span className="sidebar-panel-title">Review</span></div>
      <div className="sidebar-panel-body">
        <p style={{ color: 'var(--ol-text-tertiary)', fontSize: '0.8rem', padding: 8 }}>Track changes and comments will appear here.</p>
      </div>
    </>
  );
}

function SettingsPanel() {
  const { state, dispatch } = useApp();
  return (
    <>
      <div className="sidebar-panel-header"><span className="sidebar-panel-title">Settings</span></div>
      <div className="sidebar-panel-body" style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--ol-text-secondary)' }}>
          Compile Mode
          <select className="preview-mode-select" style={{ width: '100%', marginTop: 4 }} value={state.compileMode} onChange={e => dispatch({ type: 'SET_COMPILE_MODE', payload: e.target.value })}>
            <option value="freestyle">Freestyle</option>
            <option value="paged">Paged</option>
            <option value="app">App</option>
          </select>
        </label>
        <label style={{ fontSize: '0.8rem', color: 'var(--ol-text-secondary)' }}>
          Page Size
          <select className="preview-mode-select" style={{ width: '100%', marginTop: 4 }} value={state.pageSize} onChange={e => dispatch({ type: 'SET_PAGE_SIZE', payload: e.target.value })}>
            <option value="A4">A4</option><option value="A3">A3</option><option value="Letter">Letter</option><option value="Legal">Legal</option>
          </select>
        </label>
      </div>
    </>
  );
}

const PANEL_COMPONENTS = { files: FilesPanel, search: SearchPanel, review: ReviewPanel, settings: SettingsPanel };

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const ActivePanel = PANEL_COMPONENTS[state.sidebarPanel] || FilesPanel;

  return (
    <div className="sidebar">
      <nav className="sidebar-rail">
        {PANELS.map(p => (
          <button
            key={p.id}
            className={`sidebar-rail-btn ${state.sidebarPanel === p.id && state.sidebarOpen ? 'active' : ''}`}
            onClick={() => {
              if (state.sidebarPanel === p.id && state.sidebarOpen) {
                dispatch({ type: 'TOGGLE_SIDEBAR' });
              } else {
                dispatch({ type: 'SET_SIDEBAR_PANEL', payload: p.id });
              }
            }}
            title={p.label}
          >
            <p.icon size={20} />
          </button>
        ))}
      </nav>
      <aside className={`sidebar-panel ${!state.sidebarOpen ? 'collapsed' : ''}`}>
        <ActivePanel />
      </aside>
    </div>
  );
}
