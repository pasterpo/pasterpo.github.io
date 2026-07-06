import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import BrandLogo from './brand/BrandLogo';
import { Columns, Download, FileText } from 'lucide-react';

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

  return (
    <header className="toolbar" ref={menuRef}>
      <button className="toolbar-brand" onClick={closeProject} title="Back to projects">
        <BrandLogo size="md" variant="on-dark" />
      </button>

      <div className="toolbar-menus">
        {['File', 'Edit', 'View'].map(menu => (
          <div key={menu} style={{ position: 'relative' }}>
            <button
              className={`toolbar-menu-trigger ${openMenu === menu ? 'active' : ''}`}
              onClick={() => toggleMenu(menu)}
            >
              {menu}
            </button>
            {openMenu === menu && (
              <div className="toolbar-dropdown">
                {menu === 'File' && (
                  <>
                    <button className="toolbar-dropdown-item" onClick={() => { closeProject(); setOpenMenu(null); }}>
                      <FileText size={14} /> Back to Dashboard
                    </button>
                    <div className="toolbar-dropdown-divider" />
                    <button className="toolbar-dropdown-item" onClick={handleExportHTML}>
                      <Download size={14} /> Download HTML
                      <span className="shortcut">⌘⇧E</span>
                    </button>
                  </>
                )}
                {menu === 'Edit' && (
                  <>
                    <button className="toolbar-dropdown-item" onClick={() => setOpenMenu(null)}>
                      Undo <span className="shortcut">⌘Z</span>
                    </button>
                    <button className="toolbar-dropdown-item" onClick={() => setOpenMenu(null)}>
                      Redo <span className="shortcut">⌘⇧Z</span>
                    </button>
                    <div className="toolbar-dropdown-divider" />
                    <button className="toolbar-dropdown-item" onClick={() => setOpenMenu(null)}>
                      Find & Replace <span className="shortcut">⌘H</span>
                    </button>
                  </>
                )}
                {menu === 'View' && (
                  <>
                    <button className="toolbar-dropdown-item" onClick={() => { dispatch({ type: 'TOGGLE_SIDEBAR' }); setOpenMenu(null); }}>
                      Toggle Sidebar <span className="shortcut">⌘B</span>
                    </button>
                    <button className="toolbar-dropdown-item" onClick={() => setOpenMenu(null)}>
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
            autoFocus
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={e => { if (e.key === 'Enter') handleRename(); if (e.key === 'Escape') setRenaming(false); }}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'inherit', padding: '2px 6px', borderRadius: 4, outline: 'none', width: '200px' }}
          />
        </div>
      ) : (
        <button className="toolbar-project-name" onClick={() => { setNewName(state.activeProject?.name || ''); setRenaming(true); }}>
          <span className="truncate">{state.activeProject?.name || 'Untitled'}</span>
          <span className="chevron">▾</span>
        </button>
      )}

      <div className="toolbar-actions">
        <button className="toolbar-action" title="Layout">
          <Columns size={16} />
        </button>
      </div>
    </header>
  );
}
