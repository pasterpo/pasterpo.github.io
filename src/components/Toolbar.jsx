import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import BrandLogo from './brand/BrandLogo';
import { Columns, PanelLeft, PanelRight, Download, FileText, Play } from 'lucide-react';

const LAYOUT_ICONS = {
  split: Columns,
  editor: PanelLeft,
  preview: PanelRight,
};

const LAYOUT_LABELS = {
  split: 'Split view',
  editor: 'Editor only',
  preview: 'Preview only',
};

export default function Toolbar() {
  const { state, dispatch, closeProject, renameProject, compile } = useApp();
  const [openMenu, setOpenMenu] = useState(null);
  const [renaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleMenu = (name) => setOpenMenu(openMenu === name ? null : name);

  const handleRename = () => {
    if (newName.trim()) {
      renameProject(newName.trim());
      setRenaming(false);
    }
  };

  const handleExportHTML = () => {
    if (!state.activeProject) return;
    compile();
    setTimeout(() => {
      const html = state.lastCompiledHtml || '<p>Compile first</p>';
      const blob = new Blob([html], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${state.activeProject.name || 'document'}.html`;
      a.click();
      URL.revokeObjectURL(a.href);
    }, 100);
    setOpenMenu(null);
  };

  const LayoutIcon = LAYOUT_ICONS[state.workspaceLayout] || Columns;

  return (
    <header className="toolbar" ref={menuRef}>
      <button type="button" className="toolbar-brand" onClick={closeProject} title="Back to projects">
        <BrandLogo size="md" variant="on-dark" />
      </button>

      <div className="toolbar-menus">
        {['File', 'Edit', 'View'].map(menu => (
          <div key={menu} className="toolbar-menu-wrap">
            <button
              type="button"
              className={`toolbar-menu-trigger ${openMenu === menu ? 'active' : ''}`}
              onClick={() => toggleMenu(menu)}
            >
              {menu}
            </button>
            {openMenu === menu && (
              <div className="toolbar-dropdown">
                {menu === 'File' && (
                  <>
                    <button type="button" className="toolbar-dropdown-item" onClick={() => { closeProject(); setOpenMenu(null); }}>
                      <FileText size={14} /> Back to Dashboard
                    </button>
                    <div className="toolbar-dropdown-divider" />
                    <button type="button" className="toolbar-dropdown-item" onClick={handleExportHTML}>
                      <Download size={14} /> Download HTML
                      <span className="shortcut">⌘⇧E</span>
                    </button>
                  </>
                )}
                {menu === 'Edit' && (
                  <>
                    <button type="button" className="toolbar-dropdown-item" onClick={() => setOpenMenu(null)}>
                      Undo <span className="shortcut">⌘Z</span>
                    </button>
                    <button type="button" className="toolbar-dropdown-item" onClick={() => setOpenMenu(null)}>
                      Redo <span className="shortcut">⌘⇧Z</span>
                    </button>
                    <div className="toolbar-dropdown-divider" />
                    <button type="button" className="toolbar-dropdown-item" onClick={() => setOpenMenu(null)}>
                      Find & Replace <span className="shortcut">⌘H</span>
                    </button>
                  </>
                )}
                {menu === 'View' && (
                  <>
                    <button type="button" className="toolbar-dropdown-item" onClick={() => { dispatch({ type: 'TOGGLE_SIDEBAR' }); setOpenMenu(null); }}>
                      Toggle Sidebar <span className="shortcut">⌘B</span>
                    </button>
                    <button type="button" className="toolbar-dropdown-item" onClick={() => { dispatch({ type: 'CYCLE_WORKSPACE_LAYOUT' }); setOpenMenu(null); }}>
                      Cycle Layout <span className="shortcut">⌘\</span>
                    </button>
                    <button type="button" className="toolbar-dropdown-item" onClick={() => setOpenMenu(null)}>
                      Toggle Word Wrap <span className="shortcut">⌥Z</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {renaming ? (
        <div className="toolbar-project-name">
          <input
            className="toolbar-rename-input"
            autoFocus
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={e => { if (e.key === 'Enter') handleRename(); if (e.key === 'Escape') setRenaming(false); }}
          />
        </div>
      ) : (
        <button
          type="button"
          className="toolbar-project-name"
          onClick={() => { setNewName(state.activeProject?.name || ''); setRenaming(true); }}
        >
          <span className="truncate">{state.activeProject?.name || 'Untitled'}</span>
          <span className="chevron">▾</span>
        </button>
      )}

      <div className="toolbar-actions">
        <button
          type="button"
          className="toolbar-action toolbar-compile"
          onClick={compile}
          title="Compile (⌘ Enter)"
        >
          <Play size={16} />
          <span>Compile</span>
        </button>
        <div className="toolbar-divider" />
        <button
          type="button"
          className="toolbar-action"
          onClick={() => dispatch({ type: 'CYCLE_WORKSPACE_LAYOUT' })}
          title={LAYOUT_LABELS[state.workspaceLayout]}
        >
          <LayoutIcon size={16} />
        </button>
      </div>
    </header>
  );
}
