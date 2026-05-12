import { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, FileCode } from 'lucide-react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { python } from '@codemirror/lang-python';
import { xml } from '@codemirror/lang-xml';
import { keymap } from '@codemirror/view';

function getExtension(name = '') {
  const parts = name.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

function getLanguageExtension(filename) {
  const ext = getExtension(filename);
  switch (ext) {
    case 'html': case 'htm': return html();
    case 'css': return css();
    case 'js': case 'jsx': case 'mjs': case 'ts': case 'tsx': return javascript();
    case 'json': return json();
    case 'md': return markdown();
    case 'py': return python();
    case 'xml': case 'svg': return xml();
    default: return [];
  }
}

function getLanguageLabel(filename) {
  const ext = getExtension(filename);
  const labels = { html: 'HTML', htm: 'HTML', css: 'CSS', js: 'JavaScript', jsx: 'JSX', json: 'JSON', md: 'Markdown', py: 'Python', xml: 'XML', svg: 'SVG', txt: 'Plain Text' };
  return labels[ext] || 'Text';
}

export default function EditorPane() {
  const { state, openFile, closeFile, updateFileContent, compile } = useApp();
  const containerRef = useRef(null);
  const viewRef = useRef(null);
  const fileIdRef = useRef(null);
  const suppressUpdateRef = useRef(false);

  const activeFile = state.activeProject?.nodes.find(n => n.id === state.activeFileId);
  const openFiles = state.openFileIds
    .map(id => state.activeProject?.nodes.find(n => n.id === id))
    .filter(Boolean);

  // Create/destroy CodeMirror when active file changes
  useEffect(() => {
    // Clean up previous editor
    if (viewRef.current) {
      viewRef.current.destroy();
      viewRef.current = null;
    }
    fileIdRef.current = null;

    if (!containerRef.current || !activeFile) return;

    // Clear container
    containerRef.current.innerHTML = '';

    const fileId = activeFile.id;
    fileIdRef.current = fileId;

    const saveKeymap = keymap.of([
      { key: 'Mod-s', run: () => true },
      { key: 'Mod-Enter', run: () => { compile(); return true; } },
    ]);

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged && !suppressUpdateRef.current) {
        updateFileContent(fileId, update.state.doc.toString());
      }
    });

    const editorState = EditorState.create({
      doc: activeFile.content || '',
      extensions: [
        basicSetup,
        getLanguageExtension(activeFile.name),
        saveKeymap,
        updateListener,
        EditorView.lineWrapping,
      ],
    });

    viewRef.current = new EditorView({
      state: editorState,
      parent: containerRef.current,
    });

    // Focus the editor
    viewRef.current.focus();

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
        fileIdRef.current = null;
      }
    };
  }, [state.activeFileId]); // Only recreate when file ID changes

  if (!state.activeProject) return null;

  return (
    <div className="editor-pane">
      {/* Tab strip */}
      <div className="editor-tabs">
        {openFiles.map(file => (
          <div
            key={file.id}
            className={`editor-tab ${state.activeFileId === file.id ? 'active' : ''}`}
            onClick={() => openFile(file.id)}
          >
            <span className="truncate">{file.name}</span>
            <button
              className="editor-tab-close"
              onClick={e => { e.stopPropagation(); closeFile(file.id); }}
              title="Close"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Editor toolbar */}
      {activeFile && (
        <div className="editor-toolbar">
          <span className="editor-toolbar-meta">
            {getLanguageLabel(activeFile.name)}
          </span>
          <div className="editor-toolbar-spacer" />
          <span className="editor-toolbar-meta">
            {(activeFile.content || '').split('\n').length} lines
          </span>
        </div>
      )}

      {/* CodeMirror */}
      {activeFile ? (
        <div className="editor-cm-wrap" ref={containerRef} />
      ) : (
        <div className="editor-empty">
          <FileCode size={48} />
          <p>Select a file from the sidebar to start editing</p>
        </div>
      )}
    </div>
  );
}
