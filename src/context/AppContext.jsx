import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

const LOCAL_PROJECTS_KEY = 'htmleaf-projects-v3';
const LOCAL_LAST_PROJECT_KEY = 'htmleaf-last-project-id';

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
  <title>HTMLeaf Document</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="document">
    <h1>My Document</h1>
    <p>Start writing your HTML document here. Use the preview pane to see live output.</p>
    <section>
      <h2>Getting Started</h2>
      <p>HTMLeaf works like Overleaf, but for HTML. Write your markup in the editor, and compile to see the rendered output or export as PDF.</p>
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
        content: `// HTMLeaf project script
console.log('HTMLeaf document loaded');`
      },
    ],
  };
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
  compiled: false,
  compileMode: 'freestyle',
  pageSize: 'A4',
  pageOrientation: 'portrait',
  lastCompiledHtml: '',
  previewZoom: 1,
  projectSearch: '',
  projectSort: 'recent',
  menuOpen: null, // which menu is open
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

    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load projects from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_PROJECTS_KEY);
      if (raw) {
        const projects = JSON.parse(raw);
        dispatch({ type: 'LOAD_PROJECTS', payload: projects });
      }
    } catch (e) {
      console.warn('Failed to load projects:', e);
    }
  }, []);

  // Save projects to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(state.projects));
    } catch (e) {
      console.warn('Failed to save projects:', e);
    }
  }, [state.projects]);

  const createProject = useCallback((name) => {
    const project = createStarterProject(name || 'Untitled Project');
    dispatch({ type: 'ADD_PROJECT', payload: project });
    dispatch({ type: 'OPEN_PROJECT', payload: project.id });
    return project;
  }, []);

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
  }, [state.activeProject, state.activeFileId, state.openFileIds]);

  const deleteProject = useCallback((id) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id });
    if (state.activeProjectId === id) {
      dispatch({ type: 'CLOSE_PROJECT' });
    }
  }, [state.activeProjectId]);

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
  }, [state.activeProject]);

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
    if (!entryNode) return;

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
  }, [state.activeProject]);

  const value = {
    state,
    dispatch,
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
