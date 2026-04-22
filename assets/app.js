const SUPABASE_URL = "https://nutdsgzbjgvmipngxohx.supabase.co";
const SUPABASE_ANON = "sb_publishable_zbTO3ascamLZ2SOPorktlA_fcTUiFYo";
const LOCAL_PROJECTS_KEY = "htmlleaf-local-projects-v2";
const LOCAL_LAST_PROJECT_KEY = "htmlleaf-last-project-id";
const GITHUB_API_ROOT = "https://api.github.com";
const DEMO_LIMIT = 25;
const PAGE_SIZES = {
  A4: { widthMm: 210, heightMm: 297 },
  A3: { widthMm: 297, heightMm: 420 },
  Letter: { widthMm: 215.9, heightMm: 279.4 },
  Legal: { widthMm: 215.9, heightMm: 355.6 },
  Tabloid: { widthMm: 279.4, heightMm: 431.8 }
};

const LANGUAGE_BY_EXTENSION = {
  html: { label: "HTML", mode: "htmlmixed", mime: "text/html" },
  htm: { label: "HTML", mode: "htmlmixed", mime: "text/html" },
  xml: { label: "XML", mode: "xml", mime: "application/xml" },
  svg: { label: "SVG", mode: "xml", mime: "image/svg+xml" },
  css: { label: "CSS", mode: "css", mime: "text/css" },
  js: { label: "JavaScript", mode: "javascript", mime: "text/javascript" },
  mjs: { label: "JavaScript", mode: "javascript", mime: "text/javascript" },
  cjs: { label: "JavaScript", mode: "javascript", mime: "text/javascript" },
  ts: { label: "TypeScript", mode: "javascript", mime: "text/typescript" },
  jsx: { label: "JSX", mode: { name: "javascript", jsx: true }, mime: "text/jsx" },
  tsx: { label: "TSX", mode: { name: "javascript", jsx: true }, mime: "text/tsx" },
  json: { label: "JSON", mode: { name: "javascript", json: true }, mime: "application/json" },
  py: { label: "Python", mode: "python", mime: "text/x-python" },
  md: { label: "Markdown", mode: "markdown", mime: "text/markdown" },
  txt: { label: "Plain Text", mode: null, mime: "text/plain" },
  yaml: { label: "YAML", mode: "yaml", mime: "text/yaml" },
  yml: { label: "YAML", mode: "yaml", mime: "text/yaml" },
  sh: { label: "Shell", mode: "shell", mime: "text/x-sh" },
  sql: { label: "SQL", mode: "sql", mime: "text/x-sql" },
  java: { label: "Java", mode: "clike", mime: "text/x-java" },
  c: { label: "C", mode: "clike", mime: "text/x-csrc" },
  cpp: { label: "C++", mode: "clike", mime: "text/x-c++src" },
  php: { label: "PHP", mode: "clike", mime: "application/x-httpd-php" },
  rb: { label: "Ruby", mode: null, mime: "text/x-ruby" }
};

const IMAGE_EXTENSIONS = new Set(["png", "jpg", "jpeg", "gif", "svg", "webp", "bmp", "ico"]);
const PREVIEWABLE_EXTENSIONS = new Set(["html", "htm"]);

const elements = {
  landingView: document.getElementById("landing-view"),
  workspaceView: document.getElementById("workspace-view"),
  headerAuthButton: document.getElementById("header-auth-button"),
  headerNewProject: document.getElementById("header-new-project"),
  accountButton: document.getElementById("account-button"),
  userCountValue: document.getElementById("user-count-value"),
  usersPanelCount: document.getElementById("users-panel-count"),
  usersPanelCopy: document.getElementById("users-panel-copy"),
  backendBanner: document.getElementById("backend-banner"),
  projectsGrid: document.getElementById("projects-grid"),
  landingAuthGate: document.getElementById("landing-auth-gate"),
  compileMode: document.getElementById("compile-mode"),
  pageSize: document.getElementById("page-size"),
  pageOrientation: document.getElementById("page-orientation"),
  pageSizeWrap: document.getElementById("page-size-wrap"),
  pageOrientationWrap: document.getElementById("page-orientation-wrap"),
  compileButton: document.getElementById("compile-button"),
  downloadOutputButton: document.getElementById("download-output-button"),
  saveProjectButton: document.getElementById("save-project-button"),
  compileStatus: document.getElementById("compile-status"),
  compileDetail: document.getElementById("compile-detail"),
  previewFrame: document.getElementById("preview-frame"),
  previewEmptyState: document.getElementById("preview-empty-state"),
  projectName: document.getElementById("project-name"),
  tabStrip: document.getElementById("tab-strip"),
  activeFilePath: document.getElementById("active-file-path"),
  activeFileLanguage: document.getElementById("active-file-language"),
  entryFileLabel: document.getElementById("entry-file-label"),
  workspaceStorageLabel: document.getElementById("workspace-storage-label"),
  workspaceSidebar: document.getElementById("workspace-sidebar"),
  workspaceMenuToggle: document.getElementById("workspace-menu-toggle"),
  authModal: document.getElementById("auth-modal"),
  authTitle: document.getElementById("auth-title"),
  authCopy: document.getElementById("auth-copy"),
  authEmail: document.getElementById("auth-email"),
  authPassword: document.getElementById("auth-password"),
  authMessage: document.getElementById("auth-message"),
  authSubmit: document.getElementById("auth-submit"),
  promptModal: document.getElementById("prompt-modal"),
  promptLabel: document.getElementById("prompt-label"),
  promptTitle: document.getElementById("prompt-title"),
  promptCopy: document.getElementById("prompt-copy"),
  promptInput: document.getElementById("prompt-input"),
  promptMessage: document.getElementById("prompt-message"),
  promptSubmit: document.getElementById("prompt-submit"),
  repoModal: document.getElementById("repo-modal"),
  repoInput: document.getElementById("repo-input"),
  repoMessage: document.getElementById("repo-message"),
  repoSubmit: document.getElementById("repo-submit"),
  imageUploadInput: document.getElementById("image-upload-input")
};

const state = {
  backendReachable: false,
  backendMessage: "",
  authMode: "signin",
  route: "projects",
  currentUser: null,
  projects: [],
  activeProjectId: null,
  activeProject: null,
  openFileIds: [],
  activeFileId: null,
  selectedTreeNodeId: null,
  currentOutput: null,
  objectUrls: new Set(),
  saveTimer: null,
  promptHandler: null,
  promptResolver: null,
  userCount: null
};

let supabaseClient = null;
let editor = null;
let suspendEditorSync = false;

function uuid() {
  return crypto.randomUUID();
}

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function normalizePath(path) {
  return path
    .replace(/\\/g, "/")
    .split("/")
    .filter(Boolean)
    .reduce((segments, segment) => {
      if (segment === ".") return segments;
      if (segment === "..") {
        segments.pop();
        return segments;
      }
      segments.push(segment);
      return segments;
    }, [])
    .join("/");
}

function dirname(path) {
  const normalized = normalizePath(path);
  const parts = normalized.split("/");
  parts.pop();
  return parts.join("/");
}

function joinPath(base, relative) {
  const rel = relative.trim();
  if (!rel) return normalizePath(base);
  if (rel.startsWith("/")) return normalizePath(rel.slice(1));
  return normalizePath([base, rel].filter(Boolean).join("/"));
}

function splitRef(ref) {
  const match = ref.match(/^([^?#]*)(.*)$/);
  return {
    path: match ? match[1] : ref,
    suffix: match ? match[2] : ""
  };
}

function isExternalRef(ref) {
  return /^(?:[a-z]+:|\/\/|#)/i.test(ref);
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function getExtension(name = "") {
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
}

function getLanguageMeta(name) {
  const ext = getExtension(name);
  return LANGUAGE_BY_EXTENSION[ext] || { label: "Plain Text", mode: null, mime: "text/plain" };
}

function inferMimeType(node) {
  if (node.mime) return node.mime;
  const ext = getExtension(node.name);
  if (IMAGE_EXTENSIONS.has(ext)) {
    return `image/${ext === "jpg" ? "jpeg" : ext}`;
  }
  return getLanguageMeta(node.name).mime;
}

function isImageNode(node) {
  return IMAGE_EXTENSIONS.has(getExtension(node.name)) || (node.mime || "").startsWith("image/");
}

function fileIcon(node) {
  if (node.type === "folder") return "jstree-folder";
  const ext = getExtension(node.name);
  if (ext === "html" || ext === "htm") return "jstree-file";
  if (ext === "css") return "jstree-file";
  if (ext === "js" || ext === "mjs") return "jstree-file";
  if (ext === "py") return "jstree-file";
  if (isImageNode(node)) return "jstree-file";
  return "jstree-file";
}

function createStarterProject(name = "Untitled Project") {
  const rootId = uuid();
  const assetsId = uuid();
  const htmlId = uuid();
  const cssId = uuid();
  const jsId = uuid();

  return {
    id: uuid(),
    name,
    updatedAt: new Date().toISOString(),
    compileMode: "freestyle",
    pageSize: "A4",
    pageOrientation: "portrait",
    selectedFileId: htmlId,
    openFileIds: [htmlId, cssId, jsId],
    nodes: [
      { id: rootId, parentId: null, type: "folder", name: "root" },
      { id: assetsId, parentId: rootId, type: "folder", name: "assets" },
      {
        id: htmlId,
        parentId: rootId,
        type: "file",
        name: "index.html",
        content: [
          "<!DOCTYPE html>",
          "<html lang=\"en\">",
          "<head>",
          "  <meta charset=\"UTF-8\">",
          "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
          "  <title>HTMLLeaf Project</title>",
          "  <link rel=\"stylesheet\" href=\"styles.css\">",
          "</head>",
          "<body>",
          "  <main class=\"page\">",
          "    <p class=\"eyebrow\">HTMLLeaf</p>",
          "    <h1>Quarterfinal workspace</h1>",
          "    <p>Edit files in the tree, compile to PDF in Freestyle or Paged mode, or switch to App for a live preview.</p>",
          "    <button id=\"demo-button\">Click me</button>",
          "    <p id=\"message\"></p>",
          "    <img src=\"assets/diagram.svg\" alt=\"Starter diagram\" class=\"hero-graphic\">",
          "  </main>",
          "  <script src=\"script.js\"><\/script>",
          "</body>",
          "</html>"
        ].join("\n")
      },
      {
        id: cssId,
        parentId: rootId,
        type: "file",
        name: "styles.css",
        content: [
          ":root { color-scheme: light; }",
          "body { margin: 0; font-family: Georgia, serif; color: #1d2430; background: #f4f0e8; }",
          ".page { max-width: 720px; margin: 56px auto; padding: 0 28px 72px; line-height: 1.7; }",
          ".eyebrow { text-transform: uppercase; letter-spacing: 0.12em; font: 600 12px/1.4 'IBM Plex Sans', sans-serif; color: #0f6c5b; }",
          "h1 { font-size: 42px; line-height: 1.05; margin: 14px 0 18px; }",
          "p { margin: 0 0 16px; }",
          "button { border: 0; background: #0f6c5b; color: white; padding: 12px 18px; border-radius: 999px; font-family: 'IBM Plex Sans', sans-serif; }",
          ".hero-graphic { display: block; width: min(100%, 420px); margin-top: 28px; border: 1px solid #d9d1c0; }"
        ].join("\n")
      },
      {
        id: jsId,
        parentId: rootId,
        type: "file",
        name: "script.js",
        content: [
          "const button = document.getElementById('demo-button');",
          "const message = document.getElementById('message');",
          "",
          "if (button && message) {",
          "  button.addEventListener('click', () => {",
          "    message.textContent = 'The app preview is interactive.';",
          "  });",
          "}"
        ].join("\n")
      },
      {
        id: uuid(),
        parentId: assetsId,
        type: "file",
        name: "diagram.svg",
        mime: "image/svg+xml",
        content: [
          "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"640\" height=\"320\" viewBox=\"0 0 640 320\">",
          "  <rect width=\"640\" height=\"320\" fill=\"#f8f6ef\"/>",
          "  <rect x=\"48\" y=\"56\" width=\"544\" height=\"208\" rx=\"22\" fill=\"#ffffff\" stroke=\"#d9d1c0\"/>",
          "  <circle cx=\"112\" cy=\"118\" r=\"24\" fill=\"#0f6c5b\" opacity=\"0.18\"/>",
          "  <rect x=\"160\" y=\"96\" width=\"140\" height=\"14\" rx=\"7\" fill=\"#d9d1c0\"/>",
          "  <rect x=\"160\" y=\"128\" width=\"260\" height=\"10\" rx=\"5\" fill=\"#ebe6d8\"/>",
          "  <rect x=\"160\" y=\"154\" width=\"220\" height=\"10\" rx=\"5\" fill=\"#ebe6d8\"/>",
          "  <rect x=\"160\" y=\"202\" width=\"120\" height=\"34\" rx=\"17\" fill=\"#0f6c5b\"/>",
          "  <rect x=\"456\" y=\"96\" width=\"96\" height=\"118\" rx=\"18\" fill=\"#eff4f2\" stroke=\"#cfd8d4\"/>",
          "</svg>"
        ].join("\n")
      }
    ]
  };
}

function cloneProject(project) {
  return JSON.parse(JSON.stringify(project));
}

function defaultRoot(project) {
  return project.nodes.find((node) => node.type === "folder" && node.parentId === null);
}

function getNode(project, nodeId) {
  return project.nodes.find((node) => node.id === nodeId) || null;
}

function getChildren(project, parentId) {
  return project.nodes
    .filter((node) => node.parentId === parentId)
    .sort((left, right) => {
      if (left.type !== right.type) return left.type === "folder" ? -1 : 1;
      return left.name.localeCompare(right.name);
    });
}

function getNodePath(project, nodeId) {
  const segments = [];
  let current = getNode(project, nodeId);
  while (current && current.parentId) {
    segments.unshift(current.name);
    current = getNode(project, current.parentId);
  }
  return segments.join("/");
}

function getFileMap(project) {
  const map = new Map();
  project.nodes
    .filter((node) => node.type === "file")
    .forEach((node) => {
      map.set(normalizePath(getNodePath(project, node.id)), node);
    });
  return map;
}

function getSelectedTreeContainer(project) {
  const activeNode = getNode(project, state.activeFileId);
  if (!activeNode) return defaultRoot(project)?.id || null;
  return activeNode.type === "folder" ? activeNode.id : activeNode.parentId;
}

function projectSummary(project) {
  const fileCount = project.nodes.filter((node) => node.type === "file").length;
  const imageCount = project.nodes.filter((node) => isImageNode(node)).length;
  return `${fileCount} files${imageCount ? `, ${imageCount} images` : ""}`;
}

function serializeProject(project) {
  return JSON.stringify(project);
}

function deserializeProject(record) {
  if (!record) return createStarterProject();
  if (typeof record === "string") {
    try {
      const parsed = JSON.parse(record);
      return upgradeProjectShape(parsed);
    } catch {
      const project = createStarterProject("Imported Project");
      const file = project.nodes.find((node) => node.type === "file" && node.name === "index.html");
      file.content = record;
      return project;
    }
  }
  return upgradeProjectShape(record);
}

function upgradeProjectShape(rawProject) {
  const project = cloneProject(rawProject);
  if (!Array.isArray(project.nodes)) {
    return createStarterProject(project.name || "Untitled Project");
  }
  if (!project.id) project.id = uuid();
  if (!project.updatedAt) project.updatedAt = new Date().toISOString();
  if (!project.compileMode) project.compileMode = "freestyle";
  if (!project.pageSize) project.pageSize = "A4";
  if (!project.pageOrientation) project.pageOrientation = "portrait";
  project.nodes = project.nodes.map((node) => ({
    content: "",
    mime: null,
    ...node
  }));
  if (!project.selectedFileId) {
    const firstFile = project.nodes.find((node) => node.type === "file");
    project.selectedFileId = firstFile ? firstFile.id : null;
  }
  if (!Array.isArray(project.openFileIds) || !project.openFileIds.length) {
    project.openFileIds = project.selectedFileId ? [project.selectedFileId] : [];
  }
  return project;
}

function localProjects() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_PROJECTS_KEY) || "[]").map((item) => deserializeProject(item));
  } catch {
    return [];
  }
}

function persistLocalProjects(projects) {
  localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(projects));
}

function saveLastProjectId(id) {
  localStorage.setItem(LOCAL_LAST_PROJECT_KEY, id);
}

function loadLastProjectId() {
  return localStorage.getItem(LOCAL_LAST_PROJECT_KEY);
}

function setBackendBanner(message) {
  state.backendMessage = message;
  elements.backendBanner.textContent = message;
  elements.backendBanner.classList.toggle("hidden", !message);
}

function setCompileStatus(status, detail, kind = "idle") {
  elements.compileStatus.textContent = status;
  elements.compileDetail.textContent = detail;
  elements.compileStatus.dataset.kind = kind;
}

function markProjectDirty() {
  if (!state.activeProject) return;
  state.activeProject.updatedAt = new Date().toISOString();
  renderProjectGrid();
  scheduleAutosave();
}

function scheduleAutosave() {
  clearTimeout(state.saveTimer);
  state.saveTimer = setTimeout(() => {
    saveCurrentProject().catch((error) => {
      setCompileStatus("Save error", error.message, "error");
    });
  }, 900);
}

function cleanupObjectUrls() {
  state.objectUrls.forEach((url) => URL.revokeObjectURL(url));
  state.objectUrls.clear();
}

function rememberUrl(url) {
  if (url && url.startsWith("blob:")) {
    state.objectUrls.add(url);
  }
  return url;
}

function openModal(modal) {
  modal.classList.remove("hidden");
}

function closeModal(modal) {
  modal.classList.add("hidden");
  if (modal === elements.promptModal && state.promptResolver) {
    const resolver = state.promptResolver;
    state.promptResolver = null;
    resolver(null);
  }
}

function setFormMessage(target, message = "", isOk = false) {
  target.textContent = message;
  target.style.color = isOk ? "var(--accent)" : "var(--danger)";
}

function routeTo(route) {
  state.route = route;
  qsa(".top-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.route === route);
  });
  qsa(".route-panel").forEach((panel) => panel.classList.remove("active"));
  const routePanel = document.getElementById(`route-${route}`);
  if (routePanel) routePanel.classList.add("active");
  elements.landingView.classList.remove("hidden");
  elements.workspaceView.classList.add("hidden");
}

function openWorkspace(projectId) {
  if (state.backendReachable && !state.currentUser) {
    requireAuth("Sign in to open project workspaces.");
    return;
  }
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) return;
  state.activeProjectId = projectId;
  state.activeProject = cloneProject(project);
  state.activeFileId = state.activeProject.selectedFileId;
  state.selectedTreeNodeId = state.activeFileId;
  state.openFileIds = [...new Set(state.activeProject.openFileIds || [state.activeFileId])].filter(Boolean);
  state.currentOutput = null;
  elements.previewFrame.src = "about:blank";
  elements.previewEmptyState.classList.remove("hidden");
  elements.downloadOutputButton.disabled = elements.compileMode.value === "app";
  saveLastProjectId(projectId);
  elements.projectName.textContent = state.activeProject.name;
  elements.workspaceStorageLabel.textContent = state.backendReachable && state.currentUser
    ? "Cloud sync active."
    : "Local draft mode.";
  elements.compileMode.value = state.activeProject.compileMode || "freestyle";
  elements.pageSize.value = state.activeProject.pageSize || "A4";
  elements.pageOrientation.value = state.activeProject.pageOrientation || "portrait";
  syncPagedControls();
  elements.landingView.classList.add("hidden");
  elements.workspaceView.classList.remove("hidden");
  renderTree();
  renderTabs();
  activateFile(state.activeFileId || findFirstFileId(state.activeProject));
}

function closeWorkspace() {
  elements.workspaceView.classList.add("hidden");
  elements.landingView.classList.remove("hidden");
  routeTo(state.route);
}

function findFirstFileId(project) {
  const firstFile = project.nodes.find((node) => node.type === "file");
  return firstFile ? firstFile.id : null;
}

function syncPagedControls() {
  const isPaged = elements.compileMode.value === "paged";
  elements.pageSizeWrap.classList.toggle("hidden", !isPaged);
  elements.pageOrientationWrap.classList.toggle("hidden", !isPaged);
  elements.downloadOutputButton.disabled = elements.compileMode.value === "app";
  const title = qs("h3", elements.previewEmptyState);
  const copy = qs("p", elements.previewEmptyState);
  if (elements.compileMode.value === "app") {
    title.textContent = "Compile to open the app preview";
    copy.textContent = "App mode runs the project inside a sandboxed iframe so you can click, scroll, and interact.";
  } else if (elements.compileMode.value === "paged") {
    title.textContent = "Compile to render paged PDF output";
    copy.textContent = "Paged mode captures the document into page-sized PDF boundaries using the selected format and orientation.";
  } else {
    title.textContent = "Compile to render output";
    copy.textContent = "Freestyle creates a direct PDF render, while App opens a sandboxed interactive site preview.";
  }
}

function renderProjectGrid() {
  const projects = [...state.projects].sort((left, right) => new Date(right.updatedAt) - new Date(left.updatedAt));
  elements.projectsGrid.innerHTML = "";
  const gateVisible = state.backendReachable && !state.currentUser;
  elements.landingAuthGate.classList.toggle("hidden", !gateVisible);

  if (!projects.length) {
    const emptyCard = document.createElement("article");
    emptyCard.className = "project-card";
    emptyCard.innerHTML = [
      "<h3>No projects yet</h3>",
      `<p>${gateVisible ? "Sign in to start your synced workspace." : "Create a project or import a public GitHub repository to get started."}</p>`,
      "<div class=\"project-card-footer\"><span>Starter workspace ready</span></div>"
    ].join("");
    elements.projectsGrid.appendChild(emptyCard);
    return;
  }

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    const updated = new Date(project.updatedAt).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    card.innerHTML = [
      `<div><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(projectSummary(project))}</p></div>`,
      `<div class="project-card-footer"><span>${updated}</span><div class="project-card-actions"></div></div>`
    ].join("");
    const actions = qs(".project-card-actions", card);
    const openButton = document.createElement("button");
    openButton.className = "ghost-button compact";
    openButton.textContent = "Open";
    openButton.addEventListener("click", () => openWorkspace(project.id));
    actions.appendChild(openButton);

    const deleteButton = document.createElement("button");
    deleteButton.className = "ghost-button compact";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      if (!confirm(`Delete "${project.name}"?`)) return;
      await deleteProject(project.id);
      renderProjectGrid();
    });
    actions.appendChild(deleteButton);

    elements.projectsGrid.appendChild(card);
  });
}

function renderTree() {
  if (!state.activeProject) return;
  const treeData = state.activeProject.nodes
    .filter((node) => node.parentId !== null || node.type === "folder")
    .map((node) => ({
      id: node.id,
      parent: node.parentId ? node.parentId : "#",
      text: node.parentId === null ? state.activeProject.name : node.name,
      icon: fileIcon(node),
      state: { opened: node.type === "folder" },
      data: node
    }));

  const treeRoot = $("#file-tree");
  treeRoot.off();
  if (treeRoot.jstree(true)) treeRoot.jstree("destroy");
  treeRoot.jstree({
    core: {
      data: treeData,
      multiple: false,
      themes: { dots: false }
    },
    plugins: ["wholerow"]
  });

  treeRoot.on("select_node.jstree", (_, data) => {
    const node = getNode(state.activeProject, data.node.id);
    if (!node) return;
    state.selectedTreeNodeId = node.id;
    if (node.type === "file") activateFile(node.id);
  });

  if (state.activeFileId) {
    treeRoot.one("ready.jstree", () => {
      treeRoot.jstree(true).select_node(state.activeFileId);
    });
  }
}

function renderTabs() {
  elements.tabStrip.innerHTML = "";
  if (!state.activeProject) return;
  state.openFileIds = state.openFileIds.filter((id) => getNode(state.activeProject, id));
  state.openFileIds.forEach((fileId) => {
    const node = getNode(state.activeProject, fileId);
    if (!node) return;
    const tab = document.createElement("div");
    tab.className = `tab-chip${fileId === state.activeFileId ? " active" : ""}`;
    const label = document.createElement("button");
    label.textContent = node.name;
    label.addEventListener("click", () => activateFile(fileId));
    tab.appendChild(label);

    const closeButton = document.createElement("button");
    closeButton.textContent = "x";
    closeButton.setAttribute("aria-label", `Close ${node.name}`);
    closeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      closeTab(fileId);
    });
    tab.appendChild(closeButton);
    elements.tabStrip.appendChild(tab);
  });
}

function closeTab(fileId) {
  state.openFileIds = state.openFileIds.filter((id) => id !== fileId);
  if (state.activeFileId === fileId) {
    const nextId = state.openFileIds[state.openFileIds.length - 1] || findFirstFileId(state.activeProject);
    activateFile(nextId);
  } else {
    renderTabs();
  }
}

function activateFile(fileId) {
  if (!state.activeProject || !fileId) return;
  const node = getNode(state.activeProject, fileId);
  if (!node || node.type !== "file") return;
  state.activeFileId = fileId;
  state.selectedTreeNodeId = fileId;
  state.activeProject.selectedFileId = fileId;
  if (!state.openFileIds.includes(fileId)) state.openFileIds.push(fileId);
  state.activeProject.openFileIds = [...state.openFileIds];
  suspendEditorSync = true;
  if (isImageNode(node)) {
    editor.setOption("readOnly", true);
    editor.setValue([
      `Image asset: ${getNodePath(state.activeProject, fileId)}`,
      "",
      "This file is stored as project media for preview and export.",
      "Reference it from HTML or CSS using its relative path."
    ].join("\n"));
  } else {
    editor.setOption("readOnly", false);
    editor.setValue(node.content || "");
  }
  suspendEditorSync = false;
  const path = getNodePath(state.activeProject, fileId);
  const language = getLanguageMeta(node.name);
  editor.setOption("mode", language.mode);
  elements.activeFilePath.textContent = path || node.name;
  elements.activeFileLanguage.textContent = language.label;
  elements.entryFileLabel.textContent = getEntryFile(state.activeProject)?.name || "None";
  renderTabs();
  const tree = $("#file-tree").jstree(true);
  if (tree) tree.select_node(fileId);
}

function syncEditorToProject() {
  if (!state.activeProject || !state.activeFileId || suspendEditorSync) return;
  const node = getNode(state.activeProject, state.activeFileId);
  if (!node || node.type !== "file" || isImageNode(node)) return;
  node.content = editor.getValue();
  markProjectDirty();
}

function promptForValue({ label, title, copy, value = "", confirmLabel = "Continue" }) {
  elements.promptLabel.textContent = label;
  elements.promptTitle.textContent = title;
  elements.promptCopy.textContent = copy || "";
  elements.promptInput.value = value;
  elements.promptSubmit.textContent = confirmLabel;
  setFormMessage(elements.promptMessage, "");
  openModal(elements.promptModal);
  elements.promptInput.focus();
  return new Promise((resolve) => {
    state.promptResolver = resolve;
  });
}

function resolvePrompt(result) {
  const resolver = state.promptResolver;
  state.promptResolver = null;
  closeModal(elements.promptModal);
  if (resolver) resolver(result);
}

function activeContainerId() {
  const selected = getNode(state.activeProject, state.selectedTreeNodeId);
  if (selected) return selected.type === "folder" ? selected.id : selected.parentId;
  return getSelectedTreeContainer(state.activeProject);
}

async function createNode(type) {
  if (!state.activeProject) return;
  const isFolder = type === "folder";
  const value = await promptForValue({
    label: isFolder ? "Folder" : "File",
    title: isFolder ? "New folder" : "New file",
    copy: isFolder ? "Create a folder in the selected location." : "Include an extension like .html, .css, .js, or .py.",
    value: isFolder ? "new-folder" : "new-file.html",
    confirmLabel: isFolder ? "Create folder" : "Create file"
  });

  if (!value) return;
  const name = value.trim();
  if (!name) return;
  if (!isFolder && !name.includes(".")) {
    setFormMessage(elements.promptMessage, "Files need an extension.");
    return createNode(type);
  }

  const parentId = activeContainerId();
  state.activeProject.nodes.push({
    id: uuid(),
    parentId,
    type,
    name,
    content: isFolder ? "" : "",
    mime: null
  });
  markProjectDirty();
  renderTree();
  const created = state.activeProject.nodes[state.activeProject.nodes.length - 1];
  if (!isFolder) activateFile(created.id);
}

async function renameSelectedNode() {
  if (!state.activeProject) return;
  const currentId = state.selectedTreeNodeId || state.activeFileId || activeContainerId();
  const node = getNode(state.activeProject, currentId);
  if (!node || node.parentId === null) return;
  const nextName = await promptForValue({
    label: "Rename",
    title: `Rename ${node.type}`,
    value: node.name,
    confirmLabel: "Rename"
  });
  if (!nextName) return;
  node.name = nextName.trim();
  markProjectDirty();
  renderTree();
  renderTabs();
  if (node.type === "file") activateFile(node.id);
}

function collectDescendants(project, nodeId) {
  const direct = project.nodes.filter((node) => node.parentId === nodeId);
  return direct.flatMap((node) => [node.id, ...collectDescendants(project, node.id)]);
}

async function deleteSelectedNode() {
  if (!state.activeProject) return;
  const currentId = state.selectedTreeNodeId || state.activeFileId || activeContainerId();
  const node = getNode(state.activeProject, currentId);
  if (!node || node.parentId === null) return;
  if (!confirm(`Delete "${node.name}"?`)) return;
  const doomedIds = new Set([node.id, ...collectDescendants(state.activeProject, node.id)]);
  state.activeProject.nodes = state.activeProject.nodes.filter((item) => !doomedIds.has(item.id));
  state.openFileIds = state.openFileIds.filter((id) => !doomedIds.has(id));
  if (doomedIds.has(state.selectedTreeNodeId)) state.selectedTreeNodeId = null;
  if (doomedIds.has(state.activeFileId)) {
    state.activeFileId = findFirstFileId(state.activeProject);
  }
  markProjectDirty();
  renderTree();
  renderTabs();
  if (state.activeFileId) activateFile(state.activeFileId);
}

async function handleImageUpload(files) {
  if (!state.activeProject || !files.length) return;
  const parentId = activeContainerId();
  const fileReads = Array.from(files).slice(0, DEMO_LIMIT).map((file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({
      id: uuid(),
      parentId,
      type: "file",
      name: file.name,
      mime: file.type || inferMimeType({ name: file.name }),
      content: reader.result
    });
    reader.onerror = reject;
    reader.readAsDataURL(file);
  }));

  const created = await Promise.all(fileReads);
  state.activeProject.nodes.push(...created);
  markProjectDirty();
  renderTree();
}

function updateHeaderAuth() {
  const signedIn = Boolean(state.currentUser);
  elements.headerAuthButton.classList.toggle("hidden", signedIn);
  elements.accountButton.classList.toggle("hidden", !signedIn);
  elements.headerNewProject.classList.toggle("hidden", !signedIn && state.backendReachable);

  if (signedIn) {
    const email = state.currentUser.email || "Signed in";
    elements.accountButton.textContent = email.split("@")[0];
  } else if (!state.backendReachable) {
    elements.headerAuthButton.textContent = "Backend Offline";
  } else {
    elements.headerAuthButton.textContent = "Sign In";
  }
}

function updateProjectSource() {
  state.projects = state.backendReachable && state.currentUser ? state.projects : localProjects();
  renderProjectGrid();
}

async function initSupabase() {
  if (!window.supabase?.createClient) {
    setBackendBanner("Supabase client failed to load. HTMLLeaf is running in local-only mode.");
    return;
  }

  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON, {
      auth: { persistSession: true, autoRefreshToken: true }
    });

    const { error } = await supabaseClient.from("profiles").select("id", { count: "exact", head: true });
    if (error) throw error;

    state.backendReachable = true;
    setBackendBanner("");
    const { data } = await supabaseClient.auth.getSession();
    state.currentUser = data.session?.user || null;
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      state.currentUser = session?.user || null;
      updateHeaderAuth();
      loadProjects().catch(() => {});
      updateUserCount().catch(() => {});
    });
  } catch (error) {
    state.backendReachable = false;
    setBackendBanner("The configured Supabase backend is unreachable, so HTMLLeaf is currently using local draft mode for editing and compile testing.");
    console.warn("Supabase unavailable", error);
  }
}

async function updateUserCount() {
  if (!state.backendReachable || !supabaseClient) {
    elements.userCountValue.textContent = "Offline";
    elements.usersPanelCount.textContent = "Unavailable";
    elements.usersPanelCopy.textContent = "The current Supabase project could not be reached from this deployment.";
    return;
  }

  const { count, error } = await supabaseClient.from("profiles").select("id", { count: "exact", head: true });
  if (error) {
    elements.userCountValue.textContent = "Error";
    elements.usersPanelCount.textContent = "Error";
    elements.usersPanelCopy.textContent = error.message;
    return;
  }
  state.userCount = count;
  const pretty = count.toLocaleString();
  elements.userCountValue.textContent = pretty;
  elements.usersPanelCount.textContent = pretty;
  elements.usersPanelCopy.textContent = "Counts are read from the public profile table created by HTMLLeaf auth.";
}

async function loadProjects() {
  if (state.backendReachable && state.currentUser && supabaseClient) {
    const { data, error } = await supabaseClient
      .from("projects")
      .select("id,name,content,updated_at")
      .eq("user_id", state.currentUser.id)
      .order("updated_at", { ascending: false });

    if (error) {
      setBackendBanner(`Project sync failed: ${error.message}. Falling back to local drafts.`);
      state.backendReachable = false;
      state.projects = localProjects();
    } else {
      state.projects = (data || []).map((row) => {
        const project = deserializeProject(row.content);
        project.id = row.id;
        project.name = row.name || project.name;
        project.updatedAt = row.updated_at || project.updatedAt;
        return project;
      });
    }
  } else {
    state.projects = localProjects();
  }

  updateHeaderAuth();
  renderProjectGrid();
}

async function saveProjectRecord(project) {
  if (state.backendReachable && state.currentUser && supabaseClient) {
    const payload = {
      name: project.name,
      content: serializeProject(project),
      updated_at: new Date().toISOString(),
      user_id: state.currentUser.id
    };

    if (state.projects.some((item) => item.id === project.id)) {
      const { error } = await supabaseClient.from("projects").update(payload).eq("id", project.id).eq("user_id", state.currentUser.id);
      if (error) throw error;
    } else {
      const { data, error } = await supabaseClient.from("projects").insert(payload).select("id").single();
      if (error) throw error;
      project.id = data.id;
    }
    return;
  }

  const local = localProjects();
  const index = local.findIndex((item) => item.id === project.id);
  if (index >= 0) {
    local[index] = cloneProject(project);
  } else {
    local.unshift(cloneProject(project));
  }
  persistLocalProjects(local);
}

async function saveCurrentProject() {
  if (!state.activeProject) return;
  state.activeProject.compileMode = elements.compileMode.value;
  state.activeProject.pageSize = elements.pageSize.value;
  state.activeProject.pageOrientation = elements.pageOrientation.value;
  state.activeProject.openFileIds = [...state.openFileIds];
  state.activeProject.selectedFileId = state.activeFileId;
  state.activeProject.updatedAt = new Date().toISOString();
  await saveProjectRecord(state.activeProject);
  state.activeProjectId = state.activeProject.id;
  saveLastProjectId(state.activeProject.id);

  const existingIndex = state.projects.findIndex((item) => item.id === state.activeProject.id);
  if (existingIndex >= 0) state.projects.splice(existingIndex, 1, cloneProject(state.activeProject));
  else state.projects.unshift(cloneProject(state.activeProject));
  renderProjectGrid();
  elements.workspaceStorageLabel.textContent = state.backendReachable && state.currentUser ? "Cloud sync active." : "Local draft mode.";
}

async function deleteProject(projectId) {
  if (state.backendReachable && state.currentUser && supabaseClient) {
    const { error } = await supabaseClient.from("projects").delete().eq("id", projectId).eq("user_id", state.currentUser.id);
    if (error) throw error;
  } else {
    persistLocalProjects(localProjects().filter((project) => project.id !== projectId));
  }

  state.projects = state.projects.filter((project) => project.id !== projectId);
  if (state.activeProjectId === projectId) {
    state.activeProjectId = null;
    state.activeProject = null;
    closeWorkspace();
  }
}

async function createProject(name) {
  const project = createStarterProject(name);
  await saveProjectRecord(project);
  await loadProjects();
  openWorkspace(project.id);
}

function requireAuth(message = "Sign in to continue.") {
  if (!state.backendReachable) return true;
  if (state.currentUser) return true;
  setFormMessage(elements.authMessage, message);
  openModal(elements.authModal);
  return false;
}

async function submitAuth() {
  if (!supabaseClient || !state.backendReachable) {
    setFormMessage(elements.authMessage, "Supabase is currently unavailable for sign-in.");
    return;
  }
  const email = elements.authEmail.value.trim();
  const password = elements.authPassword.value;
  if (!email || !password) {
    setFormMessage(elements.authMessage, "Enter both email and password.");
    return;
  }

  elements.authSubmit.disabled = true;
  setFormMessage(elements.authMessage, "");
  try {
    let result;
    if (state.authMode === "signin") {
      result = await supabaseClient.auth.signInWithPassword({ email, password });
    } else {
      result = await supabaseClient.auth.signUp({ email, password });
    }
    if (result.error) throw result.error;
    if (state.authMode === "signup" && !result.data?.session) {
      setFormMessage(elements.authMessage, "Account created. Check your email to confirm sign-in.", true);
      return;
    }
    const authedUser = result.data?.user || result.data?.session?.user;
    if (authedUser) {
      await supabaseClient.from("profiles").upsert({ id: authedUser.id });
    }
    closeModal(elements.authModal);
    elements.authPassword.value = "";
    await loadProjects();
    await updateUserCount();
  } catch (error) {
    setFormMessage(elements.authMessage, error.message);
  } finally {
    elements.authSubmit.disabled = false;
  }
}

function setAuthMode(mode) {
  state.authMode = mode;
  qsa("[data-auth-mode]").forEach((button) => button.classList.toggle("active", button.dataset.authMode === mode));
  elements.authTitle.textContent = mode === "signin" ? "Sign in" : "Create account";
  elements.authCopy.textContent = mode === "signin"
    ? "Use email and password to open protected project routes."
    : "Create an account to unlock synced projects and compile gating.";
  elements.authSubmit.textContent = mode === "signin" ? "Sign In" : "Create Account";
  setFormMessage(elements.authMessage, "");
}

function createFrame() {
  elements.previewEmptyState.classList.add("hidden");
  elements.previewFrame.removeAttribute("srcdoc");
  elements.previewFrame.removeAttribute("sandbox");
  elements.previewFrame.src = "about:blank";
}

async function waitForFrameAssets(frame) {
  const doc = frame.contentDocument;
  if (!doc) return;
  const fontsPromise = doc.fonts?.ready || Promise.resolve();
  const images = Array.from(doc.images || []);
  const imagePromises = images.map((image) => {
    if (image.complete) return Promise.resolve();
    return new Promise((resolve) => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
    });
  });
  await fontsPromise;
  await Promise.all(imagePromises);
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

function getEntryFile(project) {
  const preferred = getNode(project, project.selectedFileId);
  if (preferred && PREVIEWABLE_EXTENSIONS.has(getExtension(preferred.name))) return preferred;
  return (
    project.nodes.find((node) => node.type === "file" && /^index\.html?$/i.test(node.name)) ||
    project.nodes.find((node) => node.type === "file" && PREVIEWABLE_EXTENSIONS.has(getExtension(node.name))) ||
    null
  );
}

async function rewriteCss(cssText, baseDir, materializeFile) {
  const urlPattern = /url\(([^)]+)\)/g;
  let result = "";
  let lastIndex = 0;
  for (const match of cssText.matchAll(urlPattern)) {
    const raw = match[1].trim().replace(/^['"]|['"]$/g, "");
    result += cssText.slice(lastIndex, match.index);
    if (isExternalRef(raw) || !raw) {
      result += match[0];
    } else {
      const { path, suffix } = splitRef(raw);
      const url = await materializeFile(joinPath(baseDir, path));
      result += url ? `url("${url}${suffix}")` : match[0];
    }
    lastIndex = match.index + match[0].length;
  }
  result += cssText.slice(lastIndex);

  const importPattern = /@import\s+(?:url\()?['"]([^'"]+)['"]\)?/g;
  let withImports = "";
  lastIndex = 0;
  for (const match of result.matchAll(importPattern)) {
    withImports += result.slice(lastIndex, match.index);
    const ref = match[1];
    if (isExternalRef(ref)) {
      withImports += match[0];
    } else {
      const { path, suffix } = splitRef(ref);
      const url = await materializeFile(joinPath(baseDir, path));
      withImports += url ? `@import url("${url}${suffix}")` : match[0];
    }
    lastIndex = match.index + match[0].length;
  }
  withImports += result.slice(lastIndex);
  return withImports;
}

async function rewriteJs(jsText, baseDir, materializeFile) {
  const patterns = [
    /(import\s+[^'"]*?\sfrom\s*)(['"])([^'"]+)\2/g,
    /(export\s+[^'"]*?\sfrom\s*)(['"])([^'"]+)\2/g,
    /(import\s*\(\s*)(['"])([^'"]+)\2(\s*\))/g
  ];

  let rewritten = jsText;
  for (const pattern of patterns) {
    let next = "";
    let lastIndex = 0;
    for (const match of rewritten.matchAll(pattern)) {
      const ref = match[3];
      next += rewritten.slice(lastIndex, match.index);
      if (isExternalRef(ref)) {
        next += match[0];
      } else {
        const url = await materializeFile(joinPath(baseDir, ref));
        if (!url) {
          next += match[0];
        } else if (match.length === 5) {
          next += `${match[1]}${match[2]}${url}${match[2]}${match[4]}`;
        } else {
          next += `${match[1]}${match[2]}${url}${match[2]}`;
        }
      }
      lastIndex = match.index + match[0].length;
    }
    next += rewritten.slice(lastIndex);
    rewritten = next;
  }
  return rewritten;
}

async function rewriteHtml(htmlText, basePath, materializeFile) {
  const parser = new DOMParser();
  const documentHtml = parser.parseFromString(htmlText, "text/html");
  const baseDir = dirname(basePath);

  for (const style of Array.from(documentHtml.querySelectorAll("style"))) {
    style.textContent = await rewriteCss(style.textContent, baseDir, materializeFile);
  }

  for (const element of Array.from(documentHtml.querySelectorAll("[style]"))) {
    const style = element.getAttribute("style");
    if (style) element.setAttribute("style", await rewriteCss(style, baseDir, materializeFile));
  }

  const attributeTargets = [
    ["link[href]", "href"],
    ["script[src]", "src"],
    ["img[src]", "src"],
    ["source[src]", "src"],
    ["audio[src]", "src"],
    ["video[src]", "src"],
    ["iframe[src]", "src"],
    ["object[data]", "data"]
  ];

  for (const [selector, attribute] of attributeTargets) {
    for (const element of Array.from(documentHtml.querySelectorAll(selector))) {
      const value = element.getAttribute(attribute);
      if (!value || isExternalRef(value)) continue;
      const { path, suffix } = splitRef(value);
      const url = await materializeFile(joinPath(baseDir, path));
      if (url) element.setAttribute(attribute, `${url}${suffix}`);
    }
  }

  for (const anchor of Array.from(documentHtml.querySelectorAll("a[href]"))) {
    const value = anchor.getAttribute("href");
    if (!value || isExternalRef(value)) continue;
    const { path, suffix } = splitRef(value);
    const nodeUrl = await materializeFile(joinPath(baseDir, path));
    if (nodeUrl) anchor.setAttribute("href", `${nodeUrl}${suffix}`);
  }

  for (const sourceElement of Array.from(documentHtml.querySelectorAll("[srcset]"))) {
    const value = sourceElement.getAttribute("srcset");
    if (!value) continue;
    const parts = value.split(",").map((entry) => entry.trim()).filter(Boolean);
    const rewritten = [];
    for (const part of parts) {
      const [rawPath, descriptor] = part.split(/\s+/, 2);
      if (!rawPath || isExternalRef(rawPath)) {
        rewritten.push(part);
        continue;
      }
      const { path, suffix } = splitRef(rawPath);
      const url = await materializeFile(joinPath(baseDir, path));
      rewritten.push(url ? `${url}${suffix}${descriptor ? ` ${descriptor}` : ""}` : part);
    }
    sourceElement.setAttribute("srcset", rewritten.join(", "));
  }

  const doctypeMatch = htmlText.match(/<!doctype[^>]*>/i);
  return `${doctypeMatch ? `${doctypeMatch[0]}\n` : "<!DOCTYPE html>\n"}${documentHtml.documentElement.outerHTML}`;
}

async function buildVirtualWorkspace(project) {
  const fileMap = getFileMap(project);
  const cache = new Map();
  const inProgress = new Set();

  async function materialize(path) {
    const normalized = normalizePath(path);
    if (cache.has(normalized)) return cache.get(normalized);
    const node = fileMap.get(normalized);
    if (!node) return null;
    if (typeof node.content === "string" && node.content.startsWith("data:")) {
      cache.set(normalized, node.content);
      return node.content;
    }
    if (inProgress.has(normalized)) return null;
    inProgress.add(normalized);

    let output;
    if (PREVIEWABLE_EXTENSIONS.has(getExtension(node.name))) {
      const rewritten = await rewriteHtml(node.content || "", normalized, materialize);
      output = rememberUrl(URL.createObjectURL(new Blob([rewritten], { type: "text/html" })));
    } else if (getExtension(node.name) === "css") {
      const rewritten = await rewriteCss(node.content || "", dirname(normalized), materialize);
      output = rememberUrl(URL.createObjectURL(new Blob([rewritten], { type: "text/css" })));
    } else if (["js", "mjs", "cjs"].includes(getExtension(node.name))) {
      const rewritten = await rewriteJs(node.content || "", dirname(normalized), materialize);
      output = rememberUrl(URL.createObjectURL(new Blob([rewritten], { type: "text/javascript" })));
    } else {
      output = rememberUrl(URL.createObjectURL(new Blob([node.content || ""], { type: inferMimeType(node) })));
    }
    cache.set(normalized, output);
    inProgress.delete(normalized);
    return output;
  }

  async function sourceFor(path) {
    const normalized = normalizePath(path);
    const node = fileMap.get(normalized);
    if (!node) return null;
    if (PREVIEWABLE_EXTENSIONS.has(getExtension(node.name))) {
      return rewriteHtml(node.content || "", normalized, materialize);
    }
    return node.content || "";
  }

  return { materialize, sourceFor, fileMap };
}

async function generateFreestylePdf(project, frame, htmlSource) {
  // Keep Freestyle isolated inside an offscreen iframe so the PDF render uses the
  // document's own defaults instead of inheriting the app shell's font styling.
  frame.style.cssText = "position: fixed; left: -99999px; top: -99999px; width: 1280px; height: 10px; border: 0; opacity: 0; pointer-events: none;";
  document.body.appendChild(frame);
  frame.srcdoc = htmlSource;
  await new Promise((resolve, reject) => {
    frame.onload = resolve;
    frame.onerror = reject;
  });
  await waitForFrameAssets(frame);
  const doc = frame.contentDocument;
  const body = doc.body;
  const width = Math.max(body.scrollWidth, doc.documentElement.scrollWidth);
  const height = Math.max(body.scrollHeight, doc.documentElement.scrollHeight);
  frame.style.width = `${Math.max(width, 960)}px`;
  frame.style.height = `${Math.max(height, 720)}px`;
  await new Promise((resolve) => setTimeout(resolve, 120));

  const canvas = await window.html2canvas(body, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    width,
    height,
    windowWidth: width,
    windowHeight: height,
    scrollX: 0,
    scrollY: 0,
    logging: false
  });

  const { jsPDF } = window.jspdf;
  const pxToMm = 25.4 / 96;
  const pdfWidth = width * pxToMm;
  const pdfHeight = height * pxToMm;
  const pdf = new jsPDF({
    orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
    unit: "mm",
    format: [pdfWidth, pdfHeight]
  });
  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdfWidth, pdfHeight);
  return pdf.output("blob");
}

async function generatePagedPdf(project, frame, htmlSource) {
  const page = PAGE_SIZES[elements.pageSize.value] || PAGE_SIZES.A4;
  const orientation = elements.pageOrientation.value;
  const widthMm = orientation === "portrait" ? page.widthMm : page.heightMm;
  const heightMm = orientation === "portrait" ? page.heightMm : page.widthMm;
  const widthPx = Math.round((widthMm / 25.4) * 96);

  frame.style.cssText = `position: fixed; left: -99999px; top: -99999px; width: ${widthPx}px; height: 10px; border: 0; opacity: 0; pointer-events: none;`;
  document.body.appendChild(frame);
  frame.srcdoc = htmlSource;
  await new Promise((resolve, reject) => {
    frame.onload = resolve;
    frame.onerror = reject;
  });
  await waitForFrameAssets(frame);
  const doc = frame.contentDocument;
  doc.documentElement.style.width = `${widthPx}px`;
  doc.body.style.width = `${widthPx}px`;
  doc.body.style.margin = doc.body.style.margin || "0";
  doc.body.style.background = doc.body.style.background || "#ffffff";
  await new Promise((resolve) => setTimeout(resolve, 120));

  const body = doc.body;
  const width = widthPx;
  const height = Math.max(body.scrollHeight, doc.documentElement.scrollHeight);
  frame.style.height = `${Math.max(height, 720)}px`;

  const canvas = await window.html2canvas(body, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    width,
    height,
    windowWidth: width,
    windowHeight: height,
    scrollX: 0,
    scrollY: 0,
    logging: false
  });

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ orientation, unit: "mm", format: [widthMm, heightMm] });
  const pageHeightPx = Math.floor((heightMm / widthMm) * canvas.width);
  let pageIndex = 0;

  for (let offset = 0; offset < canvas.height; offset += pageHeightPx) {
    if (pageIndex > 0) pdf.addPage([widthMm, heightMm], orientation);
    const slice = document.createElement("canvas");
    slice.width = canvas.width;
    slice.height = Math.min(pageHeightPx, canvas.height - offset);
    const context = slice.getContext("2d");
    context.drawImage(canvas, 0, offset, canvas.width, slice.height, 0, 0, canvas.width, slice.height);
    const renderedHeightMm = (slice.height / canvas.width) * widthMm;
    pdf.addImage(slice.toDataURL("image/png"), "PNG", 0, 0, widthMm, renderedHeightMm);
    pageIndex += 1;
  }

  return pdf.output("blob");
}

async function compileProject() {
  if (!state.activeProject) return;
  if (!requireAuth("Sign in to compile from a protected HTMLLeaf workspace.")) return;

  const entryFile = getEntryFile(state.activeProject);
  if (!entryFile) {
    setCompileStatus("Missing entry file", "Add an index.html or another HTML file to compile.", "error");
    return;
  }

  cleanupObjectUrls();
  const workspace = await buildVirtualWorkspace(state.activeProject);
  const entryPath = getNodePath(state.activeProject, entryFile.id);
  const entryUrl = await workspace.materialize(entryPath);
  const htmlSource = await workspace.sourceFor(entryPath);

  if (!entryUrl || !htmlSource) {
    setCompileStatus("Compile error", "The entry file could not be resolved.", "error");
    return;
  }

  const mode = elements.compileMode.value;
  state.activeProject.compileMode = mode;
  state.activeProject.pageSize = elements.pageSize.value;
  state.activeProject.pageOrientation = elements.pageOrientation.value;
  elements.entryFileLabel.textContent = entryFile.name;

  try {
    setCompileStatus("Compiling", mode === "app" ? "Opening sandboxed app preview." : "Rendering PDF preview.", "working");
    createFrame();

    if (mode === "app") {
      const frame = elements.previewFrame;
      frame.sandbox = "allow-scripts allow-forms allow-modals allow-popups allow-downloads";
      frame.src = entryUrl;
      state.currentOutput = { mode, url: entryUrl, blob: null };
      elements.downloadOutputButton.disabled = true;
      setCompileStatus("Compiled", "App preview is live inside a sandboxed iframe.", "ok");
    } else {
      const frame = document.createElement("iframe");
      let pdfBlob;
      try {
        pdfBlob = mode === "freestyle"
          ? await generateFreestylePdf(state.activeProject, frame, htmlSource)
          : await generatePagedPdf(state.activeProject, frame, htmlSource);
      } finally {
        frame.remove();
      }

      const previewUrl = rememberUrl(URL.createObjectURL(pdfBlob));
      const previewFrame = elements.previewFrame;
      previewFrame.removeAttribute("sandbox");
      previewFrame.src = previewUrl;
      state.currentOutput = {
        mode,
        url: previewUrl,
        blob: pdfBlob,
        filename: `${state.activeProject.name.replace(/[^\w.-]+/g, "-").toLowerCase() || "htmlleaf"}.pdf`
      };
      elements.downloadOutputButton.disabled = false;
      const detail = mode === "freestyle"
        ? "Freestyle PDF uses the document as-is with isolated rendering."
        : `Paged PDF respects ${elements.pageSize.value} ${elements.pageOrientation.value} boundaries.`;
      setCompileStatus("Compiled", detail, "ok");
    }
    await saveCurrentProject();
  } catch (error) {
    console.error(error);
    elements.previewEmptyState.classList.remove("hidden");
    setCompileStatus("Compile error", error.message, "error");
  }
}

function downloadOutput() {
  if (!state.currentOutput) return;
  if (state.currentOutput.mode === "app") return;
  const link = document.createElement("a");
  link.href = state.currentOutput.url;
  link.download = state.currentOutput.filename || "htmlleaf.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function parseGitHubUrl(url) {
  const match = url.trim().match(/^https?:\/\/github\.com\/([^/]+)\/([^/#?]+)(?:\/tree\/([^/]+)\/?(.*))?/i);
  if (!match) return null;
  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/i, ""),
    ref: match[3] || "HEAD",
    basePath: normalizePath(match[4] || "")
  };
}

function isBrowserFriendlyPath(path) {
  const ext = getExtension(path);
  return [
    "html", "htm", "css", "js", "mjs", "json", "txt", "md", "py", "yaml", "yml",
    "png", "jpg", "jpeg", "gif", "svg", "webp", "bmp", "ico"
  ].includes(ext);
}

async function githubRequest(path) {
  const response = await fetch(`${GITHUB_API_ROOT}${path}`, {
    headers: {
      Accept: "application/vnd.github+json"
    }
  });
  if (response.status === 403) {
    throw new Error("GitHub API rate limit reached. Please wait and try again.");
  }
  if (!response.ok) {
    throw new Error(`GitHub import failed with ${response.status}.`);
  }
  return response.json();
}

async function importRepository(url) {
  if (state.backendReachable && !state.currentUser) {
    throw new Error("Sign in before importing a repository.");
  }
  const parsed = parseGitHubUrl(url);
  if (!parsed) throw new Error("Paste a public GitHub repository URL.");
  const repoMeta = await githubRequest(`/repos/${parsed.owner}/${parsed.repo}`);
  const ref = parsed.ref === "HEAD" ? repoMeta.default_branch : parsed.ref;
  const tree = await githubRequest(`/repos/${parsed.owner}/${parsed.repo}/git/trees/${encodeURIComponent(ref)}?recursive=1`);
  const entries = (tree.tree || []).filter((entry) => {
    if (entry.type !== "blob" || !isBrowserFriendlyPath(entry.path)) return false;
    return !parsed.basePath || entry.path.startsWith(`${parsed.basePath}/`) || entry.path === parsed.basePath;
  });

  if (!entries.length) {
    throw new Error("No browser-friendly files were found in that repository.");
  }
  if (entries.length > DEMO_LIMIT * 10) {
    throw new Error("This repository is too large for HTMLLeaf's direct import flow. Try a smaller static repo.");
  }

  const project = createStarterProject(`${parsed.repo} import`);
  const root = defaultRoot(project);
  project.nodes = [root];
  project.openFileIds = [];
  project.selectedFileId = null;

  const folders = new Map([["", root.id]]);
  const ensureFolder = (folderPath) => {
    const normalized = normalizePath(folderPath);
    if (folders.has(normalized)) return folders.get(normalized);
    const parentPath = dirname(normalized);
    const parentId = ensureFolder(parentPath);
    const id = uuid();
    project.nodes.push({ id, parentId, type: "folder", name: normalized.split("/").pop() });
    folders.set(normalized, id);
    return id;
  };

  for (const entry of entries) {
    const relativePath = parsed.basePath ? normalizePath(entry.path.slice(parsed.basePath.length)) : entry.path;
    const folderPath = dirname(relativePath);
    const parentId = ensureFolder(folderPath);
    const rawUrl = `https://raw.githubusercontent.com/${parsed.owner}/${parsed.repo}/${encodeURIComponent(ref).replace(/%2F/g, "/")}/${entry.path}`;
    const contentResponse = await fetch(rawUrl);
    if (!contentResponse.ok) continue;
    let content;
    let mime = null;
    if (IMAGE_EXTENSIONS.has(getExtension(entry.path))) {
      const blob = await contentResponse.blob();
      mime = blob.type || inferMimeType({ name: entry.path });
      content = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } else {
      content = await contentResponse.text();
    }
    const node = {
      id: uuid(),
      parentId,
      type: "file",
      name: relativePath.split("/").pop(),
      content,
      mime
    };
    project.nodes.push(node);
    if (!project.selectedFileId && PREVIEWABLE_EXTENSIONS.has(getExtension(node.name))) {
      project.selectedFileId = node.id;
    }
  }

  project.name = repoMeta.name || project.name;
  project.openFileIds = project.selectedFileId ? [project.selectedFileId] : [];
  await saveProjectRecord(project);
  await loadProjects();
  openWorkspace(project.id);
}

function attachEventHandlers() {
  qsa("[data-route]").forEach((button) => {
    button.addEventListener("click", () => routeTo(button.dataset.route));
  });

  document.getElementById("brand-home").addEventListener("click", () => closeWorkspace());
  document.getElementById("header-auth-button").addEventListener("click", () => {
    if (!state.backendReachable) return;
    openModal(elements.authModal);
  });
  document.getElementById("landing-auth-button").addEventListener("click", () => openModal(elements.authModal));
  document.getElementById("hero-open-workspace").addEventListener("click", async () => {
    if (state.projects.length) {
      openWorkspace(state.projects[0].id);
      return;
    }
    if (!requireAuth("Sign in to create your first synced project.")) return;
    await createProject("Untitled Project");
  });
  document.getElementById("new-project-button").addEventListener("click", async () => {
    if (!requireAuth("Sign in to create a new project.")) return;
    const name = await promptForValue({
      label: "Project",
      title: "New project",
      value: "Untitled Project",
      confirmLabel: "Create project"
    });
    if (!name) return;
    await createProject(name.trim());
  });
  document.getElementById("header-new-project").addEventListener("click", () => document.getElementById("new-project-button").click());

  const openRepoModal = () => {
    setFormMessage(elements.repoMessage, "");
    openModal(elements.repoModal);
    elements.repoInput.focus();
  };
  document.getElementById("import-repo-button").addEventListener("click", openRepoModal);
  document.getElementById("hero-import-repo").addEventListener("click", openRepoModal);
  document.getElementById("repo-submit").addEventListener("click", async () => {
    try {
      setFormMessage(elements.repoMessage, "Importing...", true);
      await importRepository(elements.repoInput.value);
      closeModal(elements.repoModal);
      elements.repoInput.value = "";
    } catch (error) {
      setFormMessage(elements.repoMessage, error.message);
    }
  });

  document.getElementById("back-to-projects").addEventListener("click", closeWorkspace);
  document.getElementById("new-file-action").addEventListener("click", () => createNode("file"));
  document.getElementById("new-folder-action").addEventListener("click", () => createNode("folder"));
  document.getElementById("rename-node-action").addEventListener("click", renameSelectedNode);
  document.getElementById("delete-node-action").addEventListener("click", deleteSelectedNode);
  document.getElementById("upload-image-action").addEventListener("click", () => elements.imageUploadInput.click());
  elements.imageUploadInput.addEventListener("change", async (event) => {
    await handleImageUpload(event.target.files);
    event.target.value = "";
  });

  elements.compileMode.addEventListener("change", () => {
    syncPagedControls();
    markProjectDirty();
  });
  elements.compileButton.addEventListener("click", () => compileProject());
  elements.downloadOutputButton.addEventListener("click", downloadOutput);
  elements.saveProjectButton.addEventListener("click", () => saveCurrentProject());
  elements.pageSize.addEventListener("change", markProjectDirty);
  elements.pageOrientation.addEventListener("change", markProjectDirty);

  elements.authSubmit.addEventListener("click", submitAuth);
  qsa("[data-auth-mode]").forEach((button) => {
    button.addEventListener("click", () => setAuthMode(button.dataset.authMode));
  });

  qsa("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => closeModal(document.getElementById(button.dataset.closeModal)));
  });
  qsa(".modal-backdrop").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal(modal);
    });
  });

  elements.promptSubmit.addEventListener("click", () => {
    const value = elements.promptInput.value.trim();
    if (!value) {
      setFormMessage(elements.promptMessage, "Enter a value.");
      return;
    }
    resolvePrompt(value);
  });
  elements.promptInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") elements.promptSubmit.click();
  });

  elements.accountButton.addEventListener("click", async () => {
    if (state.backendReachable && supabaseClient) {
      await supabaseClient.auth.signOut();
      state.currentUser = null;
      await loadProjects();
      updateHeaderAuth();
    }
  });

  elements.workspaceMenuToggle.addEventListener("click", () => {
    elements.workspaceSidebar.classList.toggle("hidden-mobile");
  });
}

function initEditor() {
  editor = window.CodeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: true,
    lineWrapping: false,
    mode: "htmlmixed",
    indentUnit: 2,
    tabSize: 2,
    extraKeys: {
      "Ctrl-S": () => saveCurrentProject(),
      "Cmd-S": () => saveCurrentProject(),
      "Ctrl-Enter": () => compileProject(),
      "Cmd-Enter": () => compileProject()
    }
  });
  editor.on("change", syncEditorToProject);
}

async function boot() {
  initEditor();
  attachEventHandlers();
  setAuthMode("signin");
  routeTo("projects");
  syncPagedControls();
  await initSupabase();
  await updateUserCount();
  await loadProjects();

  if (!state.projects.length && !state.backendReachable) {
    const starter = createStarterProject("Local Draft");
    persistLocalProjects([starter]);
    state.projects = [starter];
    renderProjectGrid();
  }

  const lastProjectId = loadLastProjectId();
  if (lastProjectId && state.projects.some((project) => project.id === lastProjectId)) {
    openWorkspace(lastProjectId);
  }
}

boot().catch((error) => {
  console.error(error);
  setBackendBanner(`HTMLLeaf failed to boot cleanly: ${error.message}`);
});
