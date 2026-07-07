import { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';

const LOCAL_PROJECTS_KEY = 'cloverleaf-projects-v1';
const LOCAL_LAST_PROJECT_KEY = 'cloverleaf-last-project-id';
const THEME_STORAGE_KEY = 'cloverleaf-theme';
const LEGACY_PROJECT_KEYS = ['htmleaf-projects-v3', 'htmleaf-projects-v2', 'htmleaf-projects-v1'];
const LEGACY_LAST_PROJECT_KEY = 'htmleaf-last-project-id';

function uuid() {
  return crypto.randomUUID();
}

function createStarterProject(name = 'Untitled Project') {
  const rootId = uuid();
  const assetsId = uuid();
  const htmlId = uuid();
  const cssId = uuid();
  const jsId = uuid();

  return {
    id: uuid(),
    name,
    updatedAt: new Date().toISOString(),
    compileMode: 'freestyle',
    pageSize: 'A4',
    pageOrientation: 'portrait',
    entryFileId: htmlId,
    selectedFileId: htmlId,
    openFileIds: [htmlId, cssId, jsId],
    comments: [],
    historySnapshots: [],
    nodes: [
      { id: rootId, parentId: null, type: 'folder', name: 'root' },
      { id: assetsId, parentId: rootId, type: 'folder', name: 'assets' },
      {
        id: htmlId, parentId: rootId, type: 'file', name: 'index.html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clover Leaf Document</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="document">
    <h1>My Document</h1>
    <p>Start writing your HTML document here. Use the preview pane to see live output.</p>
    <section>
      <h2>Getting Started</h2>
      <p>Clover Leaf helps you write HTML with clarity. Edit your markup in the editor, compile to preview, and export as PDF.</p>
    </section>
  </main>
  <script src="script.js"><\/script>
</body>
</html>`
      },
      {
        id: cssId, parentId: rootId, type: 'file', name: 'styles.css',
        content: `body {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  color: #1d2430;
  background: #ffffff;
  line-height: 1.8;
}

.document {
  max-width: 720px;
  margin: 48px auto;
  padding: 0 24px;
}

h1 { font-size: 2.4rem; margin-bottom: 0.5em; line-height: 1.2; }
h2 { font-size: 1.6rem; margin: 1.5em 0 0.5em; color: #34495e; }
p { margin-bottom: 1em; }`
      },
      {
        id: jsId, parentId: rootId, type: 'file', name: 'script.js',
        content: `// Clover Leaf project script
console.log('Clover Leaf document loaded');`
      },
    ],
  };
}

function readStoredSplitRatio() {
  try {
    const stored = parseFloat(localStorage.getItem('cloverleaf-editor-split'));
    if (!Number.isNaN(stored) && stored >= 0.22 && stored <= 0.78) return stored;
  } catch {
    /* ignore */
  }
  return 0.5;
}

function readStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    /* ignore */
  }
  return 'system';
}

function resolveTheme(theme) {
  if (theme === 'dark' || theme === 'light') return theme;
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function loadProjectsFromStorage() {
  try {
    const current = localStorage.getItem(LOCAL_PROJECTS_KEY);
    if (current) return JSON.parse(current);

    for (const key of LEGACY_PROJECT_KEYS) {
      const legacy = localStorage.getItem(key);
      if (legacy) {
        const projects = JSON.parse(legacy);
        localStorage.setItem(LOCAL_PROJECTS_KEY, legacy);
        return projects;
      }
    }
  } catch (e) {
    console.warn('Failed to load projects:', e);
  }
  return null;
}

function migrateLastProjectId() {
  try {
    const current = localStorage.getItem(LOCAL_LAST_PROJECT_KEY);
    if (current) return current;
    const legacy = localStorage.getItem(LEGACY_LAST_PROJECT_KEY);
    if (legacy) {
      localStorage.setItem(LOCAL_LAST_PROJECT_KEY, legacy);
      return legacy;
    }
  } catch {
    /* ignore */
  }
  return null;
}

const initialState = {
  view: 'dashboard', // 'dashboard' | 'editor'
  projects: [],
  activeProjectId: null,
  activeProject: null,
  activeFileId: null,
  openFileIds: [],
  sidebarPanel: 'files', // 'files' | 'search' | 'review' | 'settings'
  sidebarOpen: true,
  workspaceLayout: 'split', // 'split' | 'editor' | 'preview'
  editorSplitRatio: readStoredSplitRatio(),
  compiled: false,
  compileMode: 'freestyle',
  pageSize: 'A4',
  pageOrientation: 'portrait',
  lastCompiledHtml: '',
  previewZoom: 1,
  projectSearch: '',
  projectSort: 'recent',
  menuOpen: null,
  theme: readStoredTheme(),
  resolvedTheme: 'light',
  toasts: [],
};

function getNodePath(nodes, nodeId) {
  const segments = [];
  let current = nodes.find(n => n.id === nodeId);
  while (current && current.parentId) {
    segments.unshift(current.name);
    current = nodes.find(n => n.id === current.parentId);
  }
  return segments.join('/');
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, view: action.payload };

    case 'LOAD_PROJECTS':
      return { ...state, projects: action.payload };

    case 'ADD_PROJECT': {
      const projects = [action.payload, ...state.projects];
      return { ...state, projects };
    }

    case 'DELETE_PROJECT': {
      const projects = state.projects.filter(p => p.id !== action.payload);
      return { ...state, projects };
    }

    case 'OPEN_PROJECT': {
      const project = state.projects.find(p => p.id === action.payload);
      if (!project) return state;
      return {
        ...state,
        view: 'editor',
        activeProjectId: project.id,
        activeProject: JSON.parse(JSON.stringify(project)),
        activeFileId: project.selectedFileId || project.openFileIds?.[0] || null,
        openFileIds: project.openFileIds || [],
        compileMode: project.compileMode || 'freestyle',
        pageSize: project.pageSize || 'A4',
        pageOrientation: project.pageOrientation || 'portrait',
        compiled: false,
        lastCompiledHtml: '',
      };
    }

    case 'CLOSE_PROJECT':
      return {
        ...state,
        view: 'dashboard',
        activeProjectId: null,
        activeProject: null,
        activeFileId: null,
        openFileIds: [],
        compiled: false,
        lastCompiledHtml: '',
        sidebarPanel: 'files',
      };

    case 'UPDATE_PROJECT': {
      const updated = action.payload;
      const projects = state.projects.map(p => p.id === updated.id ? updated : p);
      return {
        ...state,
        projects,
        activeProject: state.activeProjectId === updated.id ? updated : state.activeProject,
      };
    }

    case 'SET_ACTIVE_FILE':
      return { ...state, activeFileId: action.payload };

    case 'SET_OPEN_FILES':
      return { ...state, openFileIds: action.payload };

    case 'SET_SIDEBAR_PANEL':
      return { ...state, sidebarPanel: action.payload, sidebarOpen: true };

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case 'SET_EDITOR_SPLIT_RATIO':
      return { ...state, editorSplitRatio: action.payload };

    case 'SET_WORKSPACE_LAYOUT':
      return { ...state, workspaceLayout: action.payload };

    case 'CYCLE_WORKSPACE_LAYOUT': {
      const order = ['split', 'editor', 'preview'];
      const idx = order.indexOf(state.workspaceLayout);
      const next = order[(idx + 1) % order.length];
      return { ...state, workspaceLayout: next };
    }

    case 'SET_COMPILE_MODE':
      return { ...state, compileMode: action.payload };

    case 'SET_PAGE_SIZE':
      return { ...state, pageSize: action.payload };

    case 'SET_PAGE_ORIENTATION':
      return { ...state, pageOrientation: action.payload };

    case 'SET_COMPILED':
      return { ...state, compiled: true, lastCompiledHtml: action.payload };

    case 'SET_PREVIEW_ZOOM':
      return { ...state, previewZoom: action.payload };

    case 'SET_PROJECT_SEARCH':
      return { ...state, projectSearch: action.payload };

    case 'SET_PROJECT_SORT':
      return { ...state, projectSort: action.payload };

    case 'SET_MENU_OPEN':
      return { ...state, menuOpen: action.payload };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'SET_RESOLVED_THEME':
      return { ...state, resolvedTheme: action.payload };

    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.payload] };

    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };

    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const saveToastTimerRef = useRef(null);
  const lastSaveToastRef = useRef(0);

  const hydratedRef = useRef(false);

  const showToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = crypto.randomUUID();
    dispatch({ type: 'ADD_TOAST', payload: { id, message, type, duration } });
    if (duration > 0) {
      setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: id }), duration);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const apply = () => {
      const resolved = resolveTheme(state.theme);
      dispatch({ type: 'SET_RESOLVED_THEME', payload: resolved });
      document.documentElement.setAttribute('data-theme', resolved);
    };
    apply();
    try {
      localStorage.setItem(THEME_STORAGE_KEY, state.theme);
    } catch {
      /* ignore */
    }
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (state.theme === 'system') apply();
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [state.theme]);

  // Load projects from localStorage on mount (with legacy migration)
  useEffect(() => {
    const projects = loadProjectsFromStorage();
    if (projects) {
      dispatch({ type: 'LOAD_PROJECTS', payload: projects });
    }
    migrateLastProjectId();
    hydratedRef.current = true;
  }, []);

  // Save projects to localStorage on change (after hydration)
  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(state.projects));
    } catch (e) {
      console.warn('Failed to save projects:', e);
      showToast('Failed to save projects', 'error');
    }
  }, [state.projects, showToast]);

  const scheduleSaveToast = useCallback(() => {
    if (saveToastTimerRef.current) clearTimeout(saveToastTimerRef.current);
    saveToastTimerRef.current = setTimeout(() => {
      const now = Date.now();
      if (now - lastSaveToastRef.current < 8000) return;
      lastSaveToastRef.current = now;
      showToast('Changes saved', 'success', 2500);
    }, 1500);
  }, [showToast]);

  const createProject = useCallback((name) => {
    const project = createStarterProject(name || 'Untitled Project');
    dispatch({ type: 'ADD_PROJECT', payload: project });
    dispatch({ type: 'OPEN_PROJECT', payload: project.id });
    showToast(`Created "${project.name}"`, 'success');
    return project;
  }, [showToast]);

  const openProject = useCallback((id) => {
    dispatch({ type: 'OPEN_PROJECT', payload: id });
  }, []);

  const closeProject = useCallback(() => {
    // Save current project state before closing
    if (state.activeProject) {
      const updated = {
        ...state.activeProject,
        selectedFileId: state.activeFileId,
        openFileIds: state.openFileIds,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'UPDATE_PROJECT', payload: updated });
    }
    dispatch({ type: 'CLOSE_PROJECT' });
    showToast('Project saved', 'success', 2500);
  }, [state.activeProject, state.activeFileId, state.openFileIds, showToast]);

  const deleteProject = useCallback((id) => {
    const project = state.projects.find(p => p.id === id);
    dispatch({ type: 'DELETE_PROJECT', payload: id });
    if (state.activeProjectId === id) {
      dispatch({ type: 'CLOSE_PROJECT' });
    }
    showToast(project ? `Deleted "${project.name}"` : 'Project deleted', 'info');
  }, [state.activeProjectId, state.projects, showToast]);

  const updateFileContent = useCallback((fileId, content) => {
    if (!state.activeProject) return;
    const updated = {
      ...state.activeProject,
      updatedAt: new Date().toISOString(),
      nodes: state.activeProject.nodes.map(n =>
        n.id === fileId ? { ...n, content } : n
      ),
    };
    dispatch({ type: 'UPDATE_PROJECT', payload: updated });
    scheduleSaveToast();
  }, [state.activeProject, scheduleSaveToast]);

  const openFile = useCallback((fileId) => {
    dispatch({ type: 'SET_ACTIVE_FILE', payload: fileId });
    if (!state.openFileIds.includes(fileId)) {
      dispatch({ type: 'SET_OPEN_FILES', payload: [...state.openFileIds, fileId] });
    }
  }, [state.openFileIds]);

  const closeFile = useCallback((fileId) => {
    const newOpen = state.openFileIds.filter(id => id !== fileId);
    dispatch({ type: 'SET_OPEN_FILES', payload: newOpen });
    if (state.activeFileId === fileId) {
      dispatch({ type: 'SET_ACTIVE_FILE', payload: newOpen[newOpen.length - 1] || null });
    }
  }, [state.openFileIds, state.activeFileId]);

  const addFile = useCallback((parentId, name, content = '') => {
    if (!state.activeProject) return null;
    const newFile = {
      id: uuid(),
      parentId,
      type: 'file',
      name,
      content,
    };
    const updated = {
      ...state.activeProject,
      updatedAt: new Date().toISOString(),
      nodes: [...state.activeProject.nodes, newFile],
    };
    dispatch({ type: 'UPDATE_PROJECT', payload: updated });
    openFile(newFile.id);
    return newFile;
  }, [state.activeProject, openFile]);

  const addFolder = useCallback((parentId, name) => {
    if (!state.activeProject) return null;
    const newFolder = {
      id: uuid(),
      parentId,
      type: 'folder',
      name,
    };
    const updated = {
      ...state.activeProject,
      updatedAt: new Date().toISOString(),
      nodes: [...state.activeProject.nodes, newFolder],
    };
    dispatch({ type: 'UPDATE_PROJECT', payload: updated });
    return newFolder;
  }, [state.activeProject]);

  const deleteNode = useCallback((nodeId) => {
    if (!state.activeProject) return;
    // Recursively collect all descendants
    const toDelete = new Set();
    const collect = (id) => {
      toDelete.add(id);
      state.activeProject.nodes.filter(n => n.parentId === id).forEach(n => collect(n.id));
    };
    collect(nodeId);

    const updated = {
      ...state.activeProject,
      updatedAt: new Date().toISOString(),
      nodes: state.activeProject.nodes.filter(n => !toDelete.has(n.id)),
    };
    dispatch({ type: 'UPDATE_PROJECT', payload: updated });

    // Close any open tabs for deleted files
    const newOpen = state.openFileIds.filter(id => !toDelete.has(id));
    dispatch({ type: 'SET_OPEN_FILES', payload: newOpen });
    if (toDelete.has(state.activeFileId)) {
      dispatch({ type: 'SET_ACTIVE_FILE', payload: newOpen[0] || null });
    }
  }, [state.activeProject, state.openFileIds, state.activeFileId]);

  const renameNode = useCallback((nodeId, newName) => {
    if (!state.activeProject) return;
    const updated = {
      ...state.activeProject,
      updatedAt: new Date().toISOString(),
      nodes: state.activeProject.nodes.map(n =>
        n.id === nodeId ? { ...n, name: newName } : n
      ),
    };
    dispatch({ type: 'UPDATE_PROJECT', payload: updated });
  }, [state.activeProject]);

  const renameProject = useCallback((newName) => {
    if (!state.activeProject) return;
    const updated = {
      ...state.activeProject,
      name: newName,
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'UPDATE_PROJECT', payload: updated });
  }, [state.activeProject]);

  const compile = useCallback(() => {
    if (!state.activeProject) return;
    const nodes = state.activeProject.nodes;
    const entryId = state.activeProject.entryFileId;
    const entryNode = nodes.find(n => n.id === entryId);
    if (!entryNode) {
      showToast('No entry file found', 'error');
      return;
    }

    let html = entryNode.content || '';

    // Resolve local references (CSS/JS/images)
    const fileMap = new Map();
    nodes.filter(n => n.type === 'file').forEach(n => {
      fileMap.set(getNodePath(nodes, n.id), n);
    });

    const entryDir = getNodePath(nodes, entryId).split('/').slice(0, -1).join('/');

    // Inline CSS links
    html = html.replace(/<link[^>]+href=["']([^"']+)["'][^>]*>/gi, (match, href) => {
      if (/^(https?:|\/\/)/i.test(href)) return match;
      const path = entryDir ? `${entryDir}/${href}` : href;
      const node = fileMap.get(path.replace(/^\//, ''));
      if (node) return `<style>${node.content}</style>`;
      return match;
    });

    // Inline script tags
    html = html.replace(/<script[^>]+src=["']([^"']+)["'][^>]*><\/script>/gi, (match, src) => {
      if (/^(https?:|\/\/)/i.test(src)) return match;
      const path = entryDir ? `${entryDir}/${src}` : src;
      const node = fileMap.get(path.replace(/^\//, ''));
      if (node) return `<script>${node.content}<\/script>`;
      return match;
    });

    dispatch({ type: 'SET_COMPILED', payload: html });
    showToast('Compiled successfully', 'success', 2500);
  }, [state.activeProject, showToast]);

  const setTheme = useCallback((theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
    const labels = { light: 'Light mode', dark: 'Dark mode', system: 'System theme' };
    showToast(labels[theme] || 'Theme updated', 'info', 2500);
  }, [showToast]);

  const cycleTheme = useCallback(() => {
    const order = ['light', 'dark', 'system'];
    const idx = order.indexOf(state.theme);
    setTheme(order[(idx + 1) % order.length]);
  }, [state.theme, setTheme]);

  const value = {
    state,
    dispatch,
    showToast,
    setTheme,
    cycleTheme,
    createProject,
    openProject,
    closeProject,
    deleteProject,
    updateFileContent,
    openFile,
    closeFile,
    addFile,
    addFolder,
    deleteNode,
    renameNode,
    renameProject,
    compile,
    getNodePath: (nodeId) => state.activeProject ? getNodePath(state.activeProject.nodes, nodeId) : '',
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
