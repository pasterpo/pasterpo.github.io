const SUPABASE_URL = "https://nutdsgzbjgvmipngxohx.supabase.co";
const SUPABASE_ANON = "sb_publishable_zbTO3ascamLZ2SOPorktlA_fcTUiFYo";
const LOCAL_PROJECTS_KEY = "htmlleaf-local-projects-v2";
const LOCAL_LAST_PROJECT_KEY = "htmlleaf-last-project-id";
const LOCAL_TOOL_DRAFT_KEY = "htmlleaf-tool-draft-v1";
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
const PROJECT_PRESET_META = {
  blank: {
    title: "Blank workspace",
    defaultName: "Untitled Project"
  },
  app: {
    title: "App playground",
    defaultName: "Interactive App"
  },
  report: {
    title: "Report layout",
    defaultName: "Web Report"
  },
  docs: {
    title: "Docs site",
    defaultName: "Docs Site"
  }
};
const PRODUCT_DATA = window.HTMLLEAF_PRODUCT_DATA || {};
const TOOL_EXAMPLE = PRODUCT_DATA.toolExample || { html: "", css: "", js: "" };
const DIFF_EXAMPLE = PRODUCT_DATA.diffExample || { left: "", right: "" };
const TEMPLATE_LIBRARY = Array.isArray(PRODUCT_DATA.templateLibrary) ? PRODUCT_DATA.templateLibrary : [];
const SIDEBAR_PANEL_LABELS = {
  files: "Files",
  assets: "Assets",
  search: "Search",
  outline: "Outline",
  comments: "Comments",
  history: "History",
  tools: "Tools",
  settings: "Settings"
};
const SNIPPETS_BY_FAMILY = {
  html: [
    {
      title: "Section Block",
      detail: "A clean content section with heading and paragraph copy.",
      content: [
        "<section class=\"content-section\">",
        "  <h2>Section title</h2>",
        "  <p>Write a clear supporting paragraph here.</p>",
        "</section>"
      ].join("\n")
    },
    {
      title: "Card Grid",
      detail: "Three feature cards for product or document layouts.",
      content: [
        "<section class=\"card-grid\">",
        "  <article class=\"card\">",
        "    <h3>First block</h3>",
        "    <p>Describe the first item.</p>",
        "  </article>",
        "  <article class=\"card\">",
        "    <h3>Second block</h3>",
        "    <p>Describe the second item.</p>",
        "  </article>",
        "  <article class=\"card\">",
        "    <h3>Third block</h3>",
        "    <p>Describe the third item.</p>",
        "  </article>",
        "</section>"
      ].join("\n")
    },
    {
      title: "Data Table",
      detail: "A starter table for schedules, reports, or documentation.",
      content: [
        "<table>",
        "  <thead>",
        "    <tr><th>Label</th><th>Value</th><th>Notes</th></tr>",
        "  </thead>",
        "  <tbody>",
        "    <tr><td>Row one</td><td>Value</td><td>Details</td></tr>",
        "    <tr><td>Row two</td><td>Value</td><td>Details</td></tr>",
        "  </tbody>",
        "</table>"
      ].join("\n")
    }
  ],
  css: [
    {
      title: "Surface Tokens",
      detail: "Neutral color tokens and spacing variables.",
      content: [
        ":root {",
        "  --bg: #f4f6f8;",
        "  --surface: #ffffff;",
        "  --text: #18212b;",
        "  --muted: #61707f;",
        "  --border: #d8dee6;",
        "  --accent: #0f6c5b;",
        "}"
      ].join("\n")
    },
    {
      title: "Responsive Grid",
      detail: "A flexible grid for cards or mixed content.",
      content: [
        ".grid {",
        "  display: grid;",
        "  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));",
        "  gap: 20px;",
        "}"
      ].join("\n")
    },
    {
      title: "Print Page Rules",
      detail: "Useful print defaults for paged PDF output.",
      content: [
        "@media print {",
        "  body {",
        "    color: #111111;",
        "    background: #ffffff;",
        "  }",
        "",
        "  .page-break {",
        "    break-before: page;",
        "  }",
        "}"
      ].join("\n")
    }
  ],
  javascript: [
    {
      title: "Query + Click",
      detail: "Bind a click action and update text in the DOM.",
      content: [
        "const button = document.querySelector('[data-action]');",
        "const output = document.querySelector('[data-output]');",
        "",
        "if (button && output) {",
        "  button.addEventListener('click', () => {",
        "    output.textContent = 'Updated from JavaScript.';",
        "  });",
        "}"
      ].join("\n")
    },
    {
      title: "Async Fetch",
      detail: "A small async data-loading helper.",
      content: [
        "async function loadJson(url) {",
        "  const response = await fetch(url);",
        "  if (!response.ok) throw new Error(`Request failed: ${response.status}`);",
        "  return response.json();",
        "}"
      ].join("\n")
    },
    {
      title: "App Init",
      detail: "A lightweight startup function for interactive previews.",
      content: [
        "function initApp() {",
        "  console.log('HTMLLeaf app preview ready');",
        "}",
        "",
        "document.addEventListener('DOMContentLoaded', initApp);"
      ].join("\n")
    }
  ],
  python: [
    {
      title: "Main Entry",
      detail: "Simple Python script entrypoint.",
      content: [
        "def main():",
        "    print('Hello from HTMLLeaf Python')",
        "",
        "",
        "if __name__ == '__main__':",
        "    main()"
      ].join("\n")
    },
    {
      title: "Utility Function",
      detail: "Starter function with clear arguments and return value.",
      content: [
        "def summarize(name, count):",
        "    return f'{name}: {count}'"
      ].join("\n")
    }
  ],
  generic: [
    {
      title: "Comment Block",
      detail: "A neutral scaffold for notes or TODOs.",
      content: [
        "/*",
        "  Context:",
        "  Next step:",
        "  Notes:",
        "*/"
      ].join("\n")
    }
  ]
};

const elements = {
  landingView: document.getElementById("landing-view"),
  landingHero: document.getElementById("landing-hero"),
  workspaceView: document.getElementById("workspace-view"),
  headerAuthButton: document.getElementById("header-auth-button"),
  headerNewProject: document.getElementById("header-new-project"),
  accountButton: document.getElementById("account-button"),
  userCountValue: document.getElementById("user-count-value"),
  usersPanelCount: document.getElementById("users-panel-count"),
  usersPanelCopy: document.getElementById("users-panel-copy"),
  backendBanner: document.getElementById("backend-banner"),
  dashboardStats: document.getElementById("dashboard-stats"),
  dashboardRecent: document.getElementById("dashboard-recent"),
  projectsGrid: document.getElementById("projects-grid"),
  projectSearchInput: document.getElementById("project-search-input"),
  projectSortSelect: document.getElementById("project-sort-select"),
  toolModeSelect: document.getElementById("tool-mode-select"),
  toolPageSize: document.getElementById("tool-page-size"),
  toolPageOrientation: document.getElementById("tool-page-orientation"),
  toolPageSizeWrap: document.getElementById("tool-page-size-wrap"),
  toolPageOrientationWrap: document.getElementById("tool-page-orientation-wrap"),
  toolHtmlInput: document.getElementById("tool-html-input"),
  toolCssInput: document.getElementById("tool-css-input"),
  toolJsInput: document.getElementById("tool-js-input"),
  toolStatus: document.getElementById("tool-status"),
  toolDetail: document.getElementById("tool-detail"),
  toolStats: document.getElementById("tool-stats"),
  toolPreviewFrame: document.getElementById("tool-preview-frame"),
  toolRunButton: document.getElementById("tool-run-button"),
  toolLoadExampleButton: document.getElementById("tool-load-example"),
  toolClearButton: document.getElementById("tool-clear-button"),
  toolOpenWorkspaceButton: document.getElementById("tool-open-workspace-button"),
  toolDownloadHtmlButton: document.getElementById("tool-download-html-button"),
  toolDownloadPdfButton: document.getElementById("tool-download-pdf-button"),
  toolImportHtmlButton: document.getElementById("tool-import-html-button"),
  toolHtmlFileInput: document.getElementById("tool-html-file-input"),
  templateSearchInput: document.getElementById("template-search-input"),
  templateCategorySelect: document.getElementById("template-category-select"),
  templatesGrid: document.getElementById("templates-grid"),
  templatePreviewTitle: document.getElementById("template-preview-title"),
  templatePreviewMeta: document.getElementById("template-preview-meta"),
  templatePreviewNotes: document.getElementById("template-preview-notes"),
  templatePreviewFrame: document.getElementById("template-preview-frame"),
  templateUseButton: document.getElementById("template-use-button"),
  diffLeftInput: document.getElementById("diff-left-input"),
  diffRightInput: document.getElementById("diff-right-input"),
  diffSummary: document.getElementById("diff-summary"),
  diffResults: document.getElementById("diff-results"),
  diffCompareButton: document.getElementById("diff-compare-button"),
  diffSwapButton: document.getElementById("diff-swap-button"),
  diffLoadExampleButton: document.getElementById("diff-load-example-button"),
  diffCopySummaryButton: document.getElementById("diff-copy-summary-button"),
  diffLeftUploadButton: document.getElementById("diff-left-upload-button"),
  diffRightUploadButton: document.getElementById("diff-right-upload-button"),
  diffLeftClearButton: document.getElementById("diff-left-clear-button"),
  diffRightClearButton: document.getElementById("diff-right-clear-button"),
  diffLeftFileInput: document.getElementById("diff-left-file-input"),
  diffRightFileInput: document.getElementById("diff-right-file-input"),
  landingAuthGate: document.getElementById("landing-auth-gate"),
  compileMode: document.getElementById("compile-mode"),
  pageSize: document.getElementById("page-size"),
  pageOrientation: document.getElementById("page-orientation"),
  pageSizeWrap: document.getElementById("page-size-wrap"),
  pageOrientationWrap: document.getElementById("page-orientation-wrap"),
  compileButton: document.getElementById("compile-button"),
  downloadHtmlButton: document.getElementById("download-html-button"),
  downloadPdfButton: document.getElementById("download-pdf-button"),
  saveProjectButton: document.getElementById("save-project-button"),
  compileStatus: document.getElementById("compile-status"),
  compileDetail: document.getElementById("compile-detail"),
  previewFrame: document.getElementById("preview-frame"),
  previewEmptyState: document.getElementById("preview-empty-state"),
  previewFrameWrap: document.getElementById("preview-frame-wrap"),
  previewRefreshButton: document.getElementById("preview-refresh-button"),
  previewFitButton: document.getElementById("preview-fit-button"),
  previewZoomOutButton: document.getElementById("preview-zoom-out-button"),
  previewZoomInButton: document.getElementById("preview-zoom-in-button"),
  previewZoomLabel: document.getElementById("preview-zoom-label"),
  pdfRender: document.getElementById("pdf-render"),
  editorWrapToggle: document.getElementById("editor-wrap-toggle"),
  editorFormatButton: document.getElementById("editor-format-button"),
  editorBadges: document.getElementById("editor-badges"),
  workspaceResizer: document.getElementById("workspace-resizer"),
  projectName: document.getElementById("project-name"),
  tabStrip: document.getElementById("tab-strip"),
  activeFilePath: document.getElementById("active-file-path"),
  activeFileLanguage: document.getElementById("active-file-language"),
  entryFileLabel: document.getElementById("entry-file-label"),
  workspaceStorageLabel: document.getElementById("workspace-storage-label"),
  workspaceSidebar: document.getElementById("workspace-sidebar"),
  workspaceMenuToggle: document.getElementById("workspace-menu-toggle"),
  renameProjectAction: document.getElementById("rename-project-action"),
  fileTreeSearch: document.getElementById("file-tree-search"),
  assetsPanel: document.getElementById("assets-panel"),
  workspaceSearchInput: document.getElementById("workspace-search-input"),
  workspaceSearchResults: document.getElementById("workspace-search-results"),
  outlinePanel: document.getElementById("outline-panel"),
  commentsFileLabel: document.getElementById("comments-file-label"),
  commentCurrentLineButton: document.getElementById("comment-current-line-button"),
  commentInput: document.getElementById("comment-input"),
  commentsPanel: document.getElementById("comments-panel"),
  historyPanel: document.getElementById("history-panel"),
  snippetPanel: document.getElementById("snippet-panel"),
  activityPanel: document.getElementById("activity-panel"),
  recentFilesPanel: document.getElementById("recent-files-panel"),
  projectNameInput: document.getElementById("project-name-input"),
  entryFileSelect: document.getElementById("entry-file-select"),
  settingsCompileMode: document.getElementById("settings-compile-mode"),
  settingsPageSize: document.getElementById("settings-page-size"),
  settingsPageOrientation: document.getElementById("settings-page-orientation"),
  applySettingsButton: document.getElementById("apply-settings-button"),
  workspacePanelLabel: document.getElementById("workspace-panel-label"),
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
  commandPaletteButton: document.getElementById("command-palette-button"),
  commandPaletteModal: document.getElementById("command-palette-modal"),
  commandPaletteInput: document.getElementById("command-palette-input"),
  commandPaletteResults: document.getElementById("command-palette-results"),
  imageUploadInput: document.getElementById("image-upload-input"),
  heroOpenTools: document.getElementById("hero-open-tools")
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
  compiled: false,
  lastCompiledHtml: "",
  lastCompiledFileName: "document.html",
  lastCompiledMode: "freestyle",
  editorWrapEnabled: false,
  sidebarPanel: "files",
  treeFilter: "",
  projectSearchQuery: "",
  projectSort: "recent",
  templateSearchQuery: "",
  templateCategory: "all",
  selectedTemplateId: TEMPLATE_LIBRARY[0]?.id || "",
  workspaceSearchQuery: "",
  diffSummaryText: "",
  previewZoom: 1,
  editorPaneWidth: null,
  objectUrls: new Set(),
  saveTimer: null,
  panelRefreshTimer: null,
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
    entryFileId: htmlId,
    selectedFileId: htmlId,
    openFileIds: [htmlId, cssId, jsId],
    recentFileIds: [htmlId, cssId, jsId],
    comments: [],
    historySnapshots: [],
    activityLog: [
      createActivityEntry("Project created", "Starter HTML, CSS, JavaScript, and asset files are ready.", "system")
    ],
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
  if (!project.entryFileId) project.entryFileId = project.selectedFileId || null;
  if (!Array.isArray(project.recentFileIds)) project.recentFileIds = [];
  if (!Array.isArray(project.comments)) project.comments = [];
  if (!Array.isArray(project.historySnapshots)) project.historySnapshots = [];
  if (!Array.isArray(project.activityLog)) project.activityLog = [];
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

function buildPresetProject(presetKey, name = "") {
  const label = name || ({
    blank: "Blank Workspace",
    app: "App Playground",
    report: "Report Workspace",
    docs: "Docs Workspace"
  }[presetKey] || "Untitled Project");
  const project = createStarterProject(label);
  const filesByName = Object.fromEntries(project.nodes.filter((node) => node.type === "file").map((node) => [node.name, node]));
  const htmlFile = filesByName["index.html"];
  const cssFile = filesByName["styles.css"];
  const jsFile = filesByName["script.js"];

  if (presetKey === "app") {
    htmlFile.content = [
      "<!DOCTYPE html>",
      "<html lang=\"en\">",
      "<head>",
      "  <meta charset=\"UTF-8\">",
      "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      "  <title>App Playground</title>",
      "  <link rel=\"stylesheet\" href=\"styles.css\">",
      "</head>",
      "<body>",
      "  <div class=\"app-shell\">",
      "    <aside class=\"app-sidebar\">",
      "      <h1>HTMLLeaf App</h1>",
      "      <button class=\"nav-link\" data-view=\"overview\">Overview</button>",
      "      <button class=\"nav-link\" data-view=\"insights\">Insights</button>",
      "      <button class=\"nav-link\" data-view=\"settings\">Settings</button>",
      "    </aside>",
      "    <main class=\"app-main\">",
      "      <section class=\"panel\">",
      "        <p class=\"eyebrow\">Interactive preview</p>",
      "        <h2 id=\"panel-title\">Overview</h2>",
      "        <p id=\"panel-copy\">Switch sections and see the preview update like a small product surface.</p>",
      "      </section>",
      "    </main>",
      "  </div>",
      "  <script src=\"script.js\"><\/script>",
      "</body>",
      "</html>"
    ].join("\n");
    cssFile.content = [
      ":root { color-scheme: light; --bg: #eef2f6; --surface: #ffffff; --text: #17212b; --muted: #61707f; --accent: #0f6c5b; --border: #d9e1e8; }",
      "body { margin: 0; font-family: 'IBM Plex Sans', sans-serif; background: var(--bg); color: var(--text); }",
      ".app-shell { min-height: 100vh; display: grid; grid-template-columns: 220px 1fr; }",
      ".app-sidebar { background: #17212b; color: white; padding: 28px 20px; display: flex; flex-direction: column; gap: 12px; }",
      ".app-sidebar h1 { font-size: 1.05rem; margin: 0 0 14px; }",
      ".nav-link { border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.06); color: white; padding: 12px 14px; border-radius: 12px; text-align: left; }",
      ".app-main { padding: 34px; }",
      ".panel { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 28px; max-width: 760px; box-shadow: 0 18px 36px rgba(20,31,41,0.08); }",
      ".eyebrow { text-transform: uppercase; letter-spacing: 0.12em; font: 600 12px/1.4 'IBM Plex Sans', sans-serif; color: var(--accent); margin: 0 0 12px; }",
      "h2 { margin: 0 0 14px; font-size: clamp(1.9rem, 4vw, 3rem); }",
      "p { line-height: 1.7; color: var(--muted); }"
    ].join("\n");
    jsFile.content = [
      "const views = {",
      "  overview: { title: 'Overview', copy: 'Switch sections and see the preview update like a small product surface.' },",
      "  insights: { title: 'Insights', copy: 'Use this workspace to prototype dashboards, product pages, and micro apps.' },",
      "  settings: { title: 'Settings', copy: 'App mode is sandboxed, so you can test interactions safely in HTMLLeaf.' }",
      "};",
      "",
      "const title = document.getElementById('panel-title');",
      "const copy = document.getElementById('panel-copy');",
      "document.querySelectorAll('[data-view]').forEach((button) => {",
      "  button.addEventListener('click', () => {",
      "    const view = views[button.dataset.view];",
      "    if (!view || !title || !copy) return;",
      "    title.textContent = view.title;",
      "    copy.textContent = view.copy;",
      "  });",
      "});"
    ].join("\n");
  } else if (presetKey === "report") {
    htmlFile.content = [
      "<!DOCTYPE html>",
      "<html lang=\"en\">",
      "<head>",
      "  <meta charset=\"UTF-8\">",
      "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      "  <title>Report Workspace</title>",
      "  <link rel=\"stylesheet\" href=\"styles.css\">",
      "</head>",
      "<body>",
      "  <main class=\"report\">",
      "    <header class=\"report-header\">",
      "      <p class=\"eyebrow\">Executive Summary</p>",
      "      <h1>Quarterly Product Report</h1>",
      "      <p class=\"lede\">A polished starting point for PDF-first work in Freestyle or Paged mode.</p>",
      "    </header>",
      "    <section class=\"report-grid\">",
      "      <article class=\"report-card\"><h2>Highlights</h2><p>Summarize the key outcomes from this reporting period.</p></article>",
      "      <article class=\"report-card\"><h2>Risks</h2><p>Capture the main constraints, blockers, or dependencies.</p></article>",
      "      <article class=\"report-card\"><h2>Next Steps</h2><p>List the concrete actions planned after this report.</p></article>",
      "    </section>",
      "  </main>",
      "</body>",
      "</html>"
    ].join("\n");
    cssFile.content = [
      "body { margin: 0; font-family: Georgia, serif; color: #17212b; background: #f3efe7; }",
      ".report { max-width: 880px; margin: 0 auto; padding: 64px 36px 80px; }",
      ".report-header { margin-bottom: 36px; }",
      ".eyebrow { text-transform: uppercase; letter-spacing: 0.14em; font: 600 12px/1.3 'IBM Plex Sans', sans-serif; color: #0f6c5b; margin: 0 0 14px; }",
      "h1 { margin: 0; font-size: clamp(2.6rem, 4vw, 4rem); line-height: 1.03; }",
      ".lede { font-size: 1.1rem; line-height: 1.8; color: #4a5662; margin-top: 16px; }",
      ".report-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }",
      ".report-card { background: #ffffff; border: 1px solid #d7d2c6; border-radius: 18px; padding: 22px; box-shadow: 0 12px 26px rgba(20,31,41,0.06); }",
      ".report-card h2 { margin: 0 0 12px; font-size: 1.1rem; }",
      ".report-card p { margin: 0; line-height: 1.7; color: #5d6975; }"
    ].join("\n");
    jsFile.content = "console.log('Report preset loaded');";
  } else if (presetKey === "docs") {
    htmlFile.content = [
      "<!DOCTYPE html>",
      "<html lang=\"en\">",
      "<head>",
      "  <meta charset=\"UTF-8\">",
      "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      "  <title>Docs Workspace</title>",
      "  <link rel=\"stylesheet\" href=\"styles.css\">",
      "</head>",
      "<body>",
      "  <div class=\"docs-shell\">",
      "    <nav class=\"docs-nav\">",
      "      <h1>HTMLLeaf Docs</h1>",
      "      <a href=\"#intro\">Introduction</a>",
      "      <a href=\"#setup\">Setup</a>",
      "      <a href=\"#api\">API</a>",
      "    </nav>",
      "    <main class=\"docs-content\">",
      "      <section id=\"intro\"><p class=\"eyebrow\">Introduction</p><h2>Write clear project documentation.</h2><p>Use headings and sections to build a searchable, structured documentation page.</p></section>",
      "      <section id=\"setup\"><h2>Setup</h2><p>Add install steps, local dev notes, and required environment values.</p></section>",
      "      <section id=\"api\"><h2>API</h2><p>Document routes, options, response shapes, and examples.</p></section>",
      "    </main>",
      "  </div>",
      "</body>",
      "</html>"
    ].join("\n");
    cssFile.content = [
      "body { margin: 0; font-family: 'IBM Plex Sans', sans-serif; background: #f5f7f9; color: #17212b; }",
      ".docs-shell { min-height: 100vh; display: grid; grid-template-columns: 240px 1fr; }",
      ".docs-nav { background: #ffffff; border-right: 1px solid #d9e1e8; padding: 28px 20px; position: sticky; top: 0; height: 100vh; }",
      ".docs-nav h1 { margin: 0 0 18px; font-size: 1rem; }",
      ".docs-nav a { display: block; padding: 10px 0; color: #465563; text-decoration: none; }",
      ".docs-content { padding: 40px 44px 60px; max-width: 920px; }",
      ".docs-content section { background: #ffffff; border: 1px solid #d9e1e8; border-radius: 18px; padding: 24px; margin-bottom: 20px; }",
      ".eyebrow { text-transform: uppercase; letter-spacing: 0.12em; font-size: 12px; font-weight: 600; color: #0f6c5b; margin: 0 0 10px; }",
      "h2 { margin: 0 0 12px; font-size: 1.6rem; }",
      "p { margin: 0; line-height: 1.72; color: #61707f; }"
    ].join("\n");
    jsFile.content = "console.log('Docs preset loaded');";
  }

  project.compileMode = presetKey === "app" ? "app" : "freestyle";
  project.entryFileId = htmlFile.id;
  project.selectedFileId = htmlFile.id;
  project.openFileIds = [htmlFile.id, cssFile.id, jsFile.id];
  project.recentFileIds = [htmlFile.id, cssFile.id, jsFile.id];
  project.activityLog.unshift(createActivityEntry("Preset loaded", `${label} started from the ${presetKey} preset.`, "system"));
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

function timestampLabel(value) {
  const date = new Date(value);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function createActivityEntry(title, detail, kind = "note", at = new Date().toISOString()) {
  return { id: uuid(), title, detail, kind, at };
}

function updateWorkspacePanelLabel() {
  elements.workspacePanelLabel.textContent = SIDEBAR_PANEL_LABELS[state.sidebarPanel] || "Files";
}

function setSidebarPanel(panel) {
  state.sidebarPanel = SIDEBAR_PANEL_LABELS[panel] ? panel : "files";
  qsa("[data-sidebar-panel]").forEach((button) => {
    button.classList.toggle("active", button.dataset.sidebarPanel === state.sidebarPanel);
  });
  qsa("[data-sidebar-panel-view]").forEach((section) => {
    section.classList.toggle("active", section.dataset.sidebarPanelView === state.sidebarPanel);
  });
  updateWorkspacePanelLabel();
}

function recordProjectActivity(title, detail, kind = "note") {
  if (!state.activeProject) return;
  if (!Array.isArray(state.activeProject.activityLog)) state.activeProject.activityLog = [];
  state.activeProject.activityLog.unshift(createActivityEntry(title, detail, kind));
  state.activeProject.activityLog = state.activeProject.activityLog.slice(0, 36);
  renderActivityPanel();
}

function setEmptyPanel(target, message) {
  target.innerHTML = `<div class="sidebar-empty">${escapeHtml(message)}</div>`;
}

function countWords(value) {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  return parts.length;
}

function getTemplateById(templateId) {
  return TEMPLATE_LIBRARY.find((template) => template.id === templateId) || null;
}

function defaultToolDraft() {
  return {
    html: TOOL_EXAMPLE.html || "",
    css: TOOL_EXAMPLE.css || "",
    js: TOOL_EXAMPLE.js || "",
    mode: "freestyle",
    pageSize: "A4",
    pageOrientation: "portrait"
  };
}

function persistToolDraft() {
  const payload = {
    html: elements.toolHtmlInput.value,
    css: elements.toolCssInput.value,
    js: elements.toolJsInput.value,
    mode: elements.toolModeSelect.value,
    pageSize: elements.toolPageSize.value,
    pageOrientation: elements.toolPageOrientation.value
  };
  localStorage.setItem(LOCAL_TOOL_DRAFT_KEY, JSON.stringify(payload));
}

function loadToolDraft() {
  try {
    const parsed = JSON.parse(localStorage.getItem(LOCAL_TOOL_DRAFT_KEY) || "null");
    return parsed && typeof parsed === "object" ? { ...defaultToolDraft(), ...parsed } : defaultToolDraft();
  } catch {
    return defaultToolDraft();
  }
}

function ensureStandaloneDocument(htmlSource) {
  const source = (htmlSource || "").trim();
  if (!source) {
    return [
      "<!DOCTYPE html>",
      "<html lang=\"en\">",
      "<head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>HTMLLeaf Tool</title></head>",
      "<body></body>",
      "</html>"
    ].join("");
  }
  if (/<html[\s>]/i.test(source)) return source;
  return [
    "<!DOCTYPE html>",
    "<html lang=\"en\">",
    "<head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>HTMLLeaf Tool</title></head>",
    `<body>${source}</body>`,
    "</html>"
  ].join("");
}

function injectInlineDocumentParts(htmlSource, cssText = "", jsText = "") {
  const parser = new DOMParser();
  const doc = parser.parseFromString(ensureStandaloneDocument(htmlSource), "text/html");
  if (!doc.head) {
    const head = doc.createElement("head");
    doc.documentElement.insertBefore(head, doc.body || null);
  }
  if (cssText.trim()) {
    const style = doc.createElement("style");
    style.textContent = cssText;
    doc.head.appendChild(style);
  }
  if (jsText.trim()) {
    const script = doc.createElement("script");
    script.textContent = jsText;
    doc.body.appendChild(script);
  }
  return doc;
}

function applyPagedStylesToDoc(doc, pageSize, orientation) {
  const page = PAGE_SIZES[pageSize] || PAGE_SIZES.A4;
  const widthMm = orientation === "portrait" ? page.widthMm : page.heightMm;
  const heightMm = orientation === "portrait" ? page.heightMm : page.widthMm;
  const style = doc.createElement("style");
  style.textContent = [
    `@page { size: ${pageSize} ${orientation}; margin: 0; }`,
    "html { background: #e8ebef; }",
    `body { max-width: ${widthMm}mm; min-height: ${heightMm}mm; margin: 18px auto !important; background: #ffffff; box-shadow: 0 0 0 1px rgba(23,33,43,0.08); }`
  ].join("\n");
  doc.head.appendChild(style);
}

function buildStandaloneDocument({ html, css = "", js = "", mode = "freestyle", pageSize = "A4", pageOrientation = "portrait" }) {
  const doc = injectInlineDocumentParts(html, css, js);
  if (mode === "paged") {
    applyPagedStylesToDoc(doc, pageSize, pageOrientation);
  }
  return `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
}

function setToolStatus(status, detail, kind = "idle") {
  elements.toolStatus.textContent = status;
  elements.toolDetail.textContent = detail;
  elements.toolStatus.dataset.kind = kind;
}

function syncToolModeControls() {
  const isPaged = elements.toolModeSelect.value === "paged";
  const isApp = elements.toolModeSelect.value === "app";
  elements.toolPageSizeWrap.classList.toggle("hidden", !isPaged);
  elements.toolPageOrientationWrap.classList.toggle("hidden", !isPaged);
  elements.toolDownloadPdfButton.disabled = isApp;
}

function computeToolStats(html, css, js) {
  const source = `${html}\n${css}\n${js}`;
  const parser = new DOMParser();
  const doc = parser.parseFromString(ensureStandaloneDocument(html), "text/html");
  return [
    `${source ? source.split("\n").length : 0} lines`,
    `${countWords(source || "")} words`,
    `${doc.querySelectorAll("section,article,main").length} sections`,
    `${doc.querySelectorAll("a").length} links`,
    `${doc.querySelectorAll("img").length} images`
  ];
}

function renderToolStats() {
  const stats = computeToolStats(elements.toolHtmlInput.value, elements.toolCssInput.value, elements.toolJsInput.value);
  elements.toolStats.innerHTML = stats.map((item) => `<span class="project-metric">${escapeHtml(item)}</span>`).join("");
}

function populateToolWorkbench(draft) {
  elements.toolHtmlInput.value = draft.html || "";
  elements.toolCssInput.value = draft.css || "";
  elements.toolJsInput.value = draft.js || "";
  elements.toolModeSelect.value = draft.mode || "freestyle";
  elements.toolPageSize.value = draft.pageSize || "A4";
  elements.toolPageOrientation.value = draft.pageOrientation || "portrait";
  syncToolModeControls();
  renderToolStats();
}

function loadToolExample() {
  populateToolWorkbench(defaultToolDraft());
  persistToolDraft();
  runToolWorkbench();
}

function clearToolWorkbench() {
  populateToolWorkbench({ html: "", css: "", js: "", mode: "freestyle", pageSize: "A4", pageOrientation: "portrait" });
  persistToolDraft();
  elements.toolPreviewFrame.srcdoc = "";
  setToolStatus("Cleared", "Tool inputs were cleared. Paste fresh HTML to continue.", "ok");
}

function toolProjectName() {
  const parser = new DOMParser();
  const doc = parser.parseFromString(ensureStandaloneDocument(elements.toolHtmlInput.value), "text/html");
  const title = doc.querySelector("title")?.textContent?.trim();
  return title || "Tool Draft";
}

async function runToolWorkbench() {
  const html = elements.toolHtmlInput.value;
  const css = elements.toolCssInput.value;
  const js = elements.toolJsInput.value;
  const mode = elements.toolModeSelect.value;
  const pageSize = elements.toolPageSize.value;
  const pageOrientation = elements.toolPageOrientation.value;
  if (!html.trim()) {
    setToolStatus("Missing HTML", "Add some HTML to preview and export from the public tools suite.", "error");
    return;
  }
  const compiledHtml = buildStandaloneDocument({ html, css, js, mode, pageSize, pageOrientation });
  const frame = elements.toolPreviewFrame;
  frame.onload = async () => {
    await waitForFrameAssets(frame);
    setToolStatus("Ready", mode === "app" ? "App preview is live and interactive." : "Document preview rendered successfully.", "ok");
  };
  frame.srcdoc = compiledHtml;
  renderToolStats();
  persistToolDraft();
  setToolStatus("Rendering", "Preparing preview from the current tool inputs.", "working");
}

function downloadTextFile(fileName, content, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(anchor.href), 2000);
}

function downloadToolHtml() {
  const html = buildStandaloneDocument({
    html: elements.toolHtmlInput.value,
    css: elements.toolCssInput.value,
    js: elements.toolJsInput.value,
    mode: elements.toolModeSelect.value,
    pageSize: elements.toolPageSize.value,
    pageOrientation: elements.toolPageOrientation.value
  });
  const safeName = toolProjectName().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "htmlleaf-tool";
  downloadTextFile(`${safeName}.html`, html, "text/html;charset=utf-8");
  setToolStatus("Downloaded", `${safeName}.html was saved from the public tool workbench.`, "ok");
}

function downloadToolPdf() {
  if (elements.toolModeSelect.value === "app") {
    setToolStatus("PDF blocked", "App mode is interactive preview only. Switch to Freestyle or Paged for PDF export.", "error");
    return;
  }
  const iframeDoc = elements.toolPreviewFrame.contentDocument || elements.toolPreviewFrame.contentWindow?.document;
  if (!iframeDoc?.body) {
    setToolStatus("Preview missing", "Run the tool first so a document exists for PDF export.", "error");
    return;
  }
  const button = elements.toolDownloadPdfButton;
  button.disabled = true;
  button.textContent = "Generating...";
  setToolStatus("Exporting", "Generating PDF from the tool preview.", "working");
  try {
    let styleMarkup = "";
    iframeDoc.querySelectorAll("style,link[rel='stylesheet']").forEach((styleEl) => {
      styleMarkup += styleEl.outerHTML;
    });
    elements.pdfRender.innerHTML = styleMarkup + iframeDoc.body.innerHTML;
    const width = elements.pdfRender.scrollWidth;
    const height = elements.pdfRender.scrollHeight;
    elements.pdfRender.style.width = `${width}px`;
    setTimeout(() => {
      window.html2canvas(elements.pdfRender, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width,
        height,
        windowWidth: width,
        windowHeight: height,
        scrollX: 0,
        scrollY: 0,
        logging: false
      }).then((canvas) => {
        elements.pdfRender.innerHTML = "";
        elements.pdfRender.style.width = "";
        const jsPDF = window.jspdf.jsPDF;
        const pxToMm = 25.4 / 96;
        const pdfWidth = width * pxToMm;
        const pdfHeight = height * pxToMm;
        const pdf = new jsPDF({
          orientation: pdfWidth > pdfHeight ? "l" : "p",
          unit: "mm",
          format: [pdfWidth, pdfHeight]
        });
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.97), "JPEG", 0, 0, pdfWidth, pdfHeight);
        const safeName = toolProjectName().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "htmlleaf-tool";
        pdf.save(`${safeName}.pdf`);
        button.disabled = false;
        button.textContent = "PDF";
        setToolStatus("Downloaded", `${safeName}.pdf was generated from the tool preview.`, "ok");
      }).catch((error) => {
        elements.pdfRender.innerHTML = "";
        elements.pdfRender.style.width = "";
        button.disabled = false;
        button.textContent = "PDF";
        setToolStatus("PDF error", error.message, "error");
      });
    }, 250);
  } catch (error) {
    elements.pdfRender.innerHTML = "";
    elements.pdfRender.style.width = "";
    button.disabled = false;
    button.textContent = "PDF";
    setToolStatus("PDF error", error.message, "error");
  }
}

async function openToolInWorkspace() {
  if (state.backendReachable && !state.currentUser && !requireAuth("Sign in to turn this tool draft into a synced project.")) return;
  const project = createStarterProject(toolProjectName());
  const filesByName = Object.fromEntries(project.nodes.filter((node) => node.type === "file").map((node) => [node.name, node]));
  filesByName["index.html"].content = elements.toolHtmlInput.value || TOOL_EXAMPLE.html;
  filesByName["styles.css"].content = elements.toolCssInput.value || "";
  filesByName["script.js"].content = elements.toolJsInput.value || "";
  project.compileMode = elements.toolModeSelect.value;
  project.pageSize = elements.toolPageSize.value;
  project.pageOrientation = elements.toolPageOrientation.value;
  project.activityLog.unshift(createActivityEntry("Created from tools", "A public tools draft was sent into the full workspace.", "system"));
  await saveProjectRecord(project);
  await loadProjects();
  openWorkspace(project.id);
}

function buildTemplateProject(templateId, name = "") {
  const template = getTemplateById(templateId);
  if (!template) return createStarterProject(name || "Template Workspace");
  const project = createStarterProject(name || template.title);
  const filesByName = Object.fromEntries(project.nodes.filter((node) => node.type === "file").map((node) => [node.name, node]));
  filesByName["index.html"].content = template.html;
  filesByName["styles.css"].content = template.css;
  filesByName["script.js"].content = template.js || "";
  project.compileMode = template.mode || "freestyle";
  project.pageSize = template.pageSize || "A4";
  project.pageOrientation = template.pageOrientation || "portrait";
  const rootId = defaultRoot(project)?.id || null;
  if (rootId) {
    project.nodes.push({
      id: uuid(),
      parentId: rootId,
      type: "file",
      name: "README.md",
      mime: "text/markdown",
      content: [
        `# ${template.title}`,
        "",
        template.summary,
        "",
        "## Notes",
        ...(template.notes || []).map((note) => `- ${note}`)
      ].join("\n")
    });
  }
  project.activityLog.unshift(createActivityEntry("Template loaded", `${template.title} opened as a structured starter.`, "system"));
  return project;
}

function renderTemplateCategoryOptions() {
  const categories = ["all", ...new Set(TEMPLATE_LIBRARY.map((template) => template.category).filter(Boolean))];
  elements.templateCategorySelect.innerHTML = categories.map((category) => {
    const label = category === "all" ? "All Categories" : category;
    return `<option value="${escapeHtml(category)}">${escapeHtml(label)}</option>`;
  }).join("");
  elements.templateCategorySelect.value = state.templateCategory;
}

function filteredTemplates() {
  const search = state.templateSearchQuery.trim().toLowerCase();
  return TEMPLATE_LIBRARY.filter((template) => {
    const categoryMatch = state.templateCategory === "all" || template.category === state.templateCategory;
    if (!categoryMatch) return false;
    if (!search) return true;
    const haystack = `${template.title} ${template.category} ${template.summary} ${(template.tags || []).join(" ")}`.toLowerCase();
    return haystack.includes(search);
  });
}

function renderTemplatePreview(templateId) {
  const template = getTemplateById(templateId);
  if (!template) {
    elements.templatePreviewTitle.textContent = "Choose a template";
    elements.templatePreviewMeta.textContent = "Pick any template to inspect its structure and create a project from it.";
    elements.templatePreviewNotes.innerHTML = "";
    elements.templatePreviewFrame.srcdoc = "";
    return;
  }
  elements.templatePreviewTitle.textContent = template.title;
  elements.templatePreviewMeta.textContent = `${template.category} | ${(template.tags || []).join(" | ")} | ${template.mode}`;
  elements.templatePreviewNotes.innerHTML = (template.notes || []).map((note) => `<p>${escapeHtml(note)}</p>`).join("");
  elements.templatePreviewFrame.srcdoc = buildStandaloneDocument({
    html: template.html,
    css: template.css,
    js: template.js || "",
    mode: template.mode || "freestyle",
    pageSize: template.pageSize || "A4",
    pageOrientation: template.pageOrientation || "portrait"
  });
  elements.templateUseButton.dataset.templateId = template.id;
}

function renderTemplateGallery() {
  renderTemplateCategoryOptions();
  const templates = filteredTemplates();
  if (!templates.length) {
    elements.templatesGrid.innerHTML = "<article class=\"template-card\"><h3>No templates found</h3><p>Try a different keyword or switch back to all categories.</p></article>";
    renderTemplatePreview("");
    return;
  }
  if (!templates.some((template) => template.id === state.selectedTemplateId)) state.selectedTemplateId = templates[0].id;
  elements.templatesGrid.innerHTML = templates.map((template) => [
    `<article class="template-card${template.id === state.selectedTemplateId ? " active" : ""}" data-template-card="${template.id}">`,
    `  <p class="eyebrow">${escapeHtml(template.category)}</p>`,
    `  <h3>${escapeHtml(template.title)}</h3>`,
    `  <p>${escapeHtml(template.summary)}</p>`,
    `  <div class="template-tags">${(template.tags || []).map((tag) => `<span class="project-metric">${escapeHtml(tag)}</span>`).join("")}</div>`,
    `  <div class="template-card-footer"><span>${escapeHtml(template.mode)}</span><button class="ghost-button compact" type="button" data-template-open="${template.id}">Preview</button></div>`,
    "</article>"
  ].join("")).join("");
  qsa("[data-template-card]").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedTemplateId = card.dataset.templateCard;
      renderTemplateGallery();
      renderTemplatePreview(state.selectedTemplateId);
    });
  });
  qsa("[data-template-open]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.selectedTemplateId = button.dataset.templateOpen;
      renderTemplateGallery();
      renderTemplatePreview(state.selectedTemplateId);
    });
  });
  renderTemplatePreview(state.selectedTemplateId || templates[0].id);
}

async function useSelectedTemplate() {
  const template = getTemplateById(elements.templateUseButton.dataset.templateId || state.selectedTemplateId);
  if (!template) return;
  if (state.backendReachable && !state.currentUser && !requireAuth("Sign in to create a project from this template.")) return;
  const name = await promptForValue({
    label: "Project",
    title: "Use template",
    copy: template.summary,
    value: template.title,
    confirmLabel: "Create project"
  });
  if (!name) return;
  const project = buildTemplateProject(template.id, name.trim());
  await saveProjectRecord(project);
  await loadProjects();
  openWorkspace(project.id);
}

function tokenizeDiffText(value) {
  return value.split(/(\s+|[^\w\s])/g).filter((token) => token !== "");
}

function buildLcsMatrix(left, right) {
  const table = Array.from({ length: left.length + 1 }, () => Array(right.length + 1).fill(0));
  for (let i = left.length - 1; i >= 0; i -= 1) {
    for (let j = right.length - 1; j >= 0; j -= 1) {
      table[i][j] = left[i] === right[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }
  return table;
}

function buildTokenMarkup(leftText, rightText, side) {
  const leftTokens = tokenizeDiffText(leftText);
  const rightTokens = tokenizeDiffText(rightText);
  const table = buildLcsMatrix(leftTokens, rightTokens);
  const pieces = [];
  let i = 0;
  let j = 0;
  while (i < leftTokens.length && j < rightTokens.length) {
    if (leftTokens[i] === rightTokens[j]) {
      pieces.push({ type: "same", value: leftTokens[i] });
      i += 1;
      j += 1;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      if (side === "left") pieces.push({ type: "remove", value: leftTokens[i] });
      i += 1;
    } else {
      if (side === "right") pieces.push({ type: "add", value: rightTokens[j] });
      j += 1;
    }
  }
  while (i < leftTokens.length) {
    if (side === "left") pieces.push({ type: "remove", value: leftTokens[i] });
    i += 1;
  }
  while (j < rightTokens.length) {
    if (side === "right") pieces.push({ type: "add", value: rightTokens[j] });
    j += 1;
  }
  return pieces.map((piece) => {
    const className = piece.type === "same" ? "diff-token-same" : piece.type === "add" ? "diff-token-add" : "diff-token-remove";
    return `<span class="${className}">${escapeHtml(piece.value)}</span>`;
  }).join("");
}

function computeLineDiff(leftText, rightText) {
  const leftLines = leftText ? leftText.replace(/\r/g, "").split("\n") : [];
  const rightLines = rightText ? rightText.replace(/\r/g, "").split("\n") : [];
  const tooLarge = leftLines.length * rightLines.length > 120000;
  const maxLines = tooLarge ? 220 : Math.max(leftLines.length, rightLines.length);
  const left = leftLines.slice(0, maxLines);
  const right = rightLines.slice(0, maxLines);
  const table = buildLcsMatrix(left, right);
  const operations = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] === right[j]) {
      operations.push({ type: "same", leftLine: i + 1, rightLine: j + 1, leftText: left[i], rightText: right[j] });
      i += 1;
      j += 1;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      operations.push({ type: "remove", leftLine: i + 1, rightLine: null, leftText: left[i], rightText: "" });
      i += 1;
    } else {
      operations.push({ type: "add", leftLine: null, rightLine: j + 1, leftText: "", rightText: right[j] });
      j += 1;
    }
  }
  while (i < left.length) {
    operations.push({ type: "remove", leftLine: i + 1, rightLine: null, leftText: left[i], rightText: "" });
    i += 1;
  }
  while (j < right.length) {
    operations.push({ type: "add", leftLine: null, rightLine: j + 1, leftText: "", rightText: right[j] });
    j += 1;
  }

  const merged = [];
  for (let index = 0; index < operations.length; index += 1) {
    const current = operations[index];
    const next = operations[index + 1];
    if (current.type === "remove" && next?.type === "add") {
      merged.push({
        type: "change",
        leftLine: current.leftLine,
        rightLine: next.rightLine,
        leftText: current.leftText,
        rightText: next.rightText
      });
      index += 1;
      continue;
    }
    if (current.type === "add" && next?.type === "remove") {
      merged.push({
        type: "change",
        leftLine: next.leftLine,
        rightLine: current.rightLine,
        leftText: next.leftText,
        rightText: current.rightText
      });
      index += 1;
      continue;
    }
    merged.push(current);
  }

  return {
    truncated: tooLarge || leftLines.length > maxLines || rightLines.length > maxLines,
    items: merged
  };
}

function renderDiffSummaryItems(items, truncated) {
  const summary = {
    same: items.filter((item) => item.type === "same").length,
    add: items.filter((item) => item.type === "add").length,
    remove: items.filter((item) => item.type === "remove").length,
    change: items.filter((item) => item.type === "change").length
  };
  state.diffSummaryText = [
    `Unchanged lines: ${summary.same}`,
    `Added lines: ${summary.add}`,
    `Removed lines: ${summary.remove}`,
    `Changed lines: ${summary.change}`,
    truncated ? "Comparison was truncated for performance." : "Full comparison completed."
  ].join(" | ");
  elements.diffSummary.innerHTML = [
    `<article class="diff-summary-card"><strong>${summary.same}</strong><span>Unchanged</span></article>`,
    `<article class="diff-summary-card"><strong>${summary.add}</strong><span>Added</span></article>`,
    `<article class="diff-summary-card"><strong>${summary.remove}</strong><span>Removed</span></article>`,
    `<article class="diff-summary-card"><strong>${summary.change}</strong><span>Changed</span></article>`
  ].join("");
}

function renderDiffResults(items, truncated) {
  if (!items.length) {
    elements.diffResults.innerHTML = "<article class=\"diff-block\"><h3>No differences</h3><p>The two versions are identical.</p></article>";
    state.diffSummaryText = "No differences detected.";
    return;
  }
  renderDiffSummaryItems(items, truncated);
  elements.diffResults.innerHTML = items.slice(0, 80).map((item) => {
    if (item.type === "same") {
      return [
        `<article class="diff-block same">`,
        `  <div class="diff-block-header"><span>Line ${item.leftLine}</span><strong>Unchanged</strong></div>`,
        `  <pre class="diff-code">${escapeHtml(item.leftText || "(blank line)")}</pre>`,
        "</article>"
      ].join("");
    }
    if (item.type === "add") {
      return [
        `<article class="diff-block add">`,
        `  <div class="diff-block-header"><span>Right ${item.rightLine}</span><strong>Added</strong></div>`,
        `  <pre class="diff-code diff-code-add">${escapeHtml(item.rightText || "(blank line)")}</pre>`,
        "</article>"
      ].join("");
    }
    if (item.type === "remove") {
      return [
        `<article class="diff-block remove">`,
        `  <div class="diff-block-header"><span>Left ${item.leftLine}</span><strong>Removed</strong></div>`,
        `  <pre class="diff-code diff-code-remove">${escapeHtml(item.leftText || "(blank line)")}</pre>`,
        "</article>"
      ].join("");
    }
    return [
      `<article class="diff-block change">`,
      `  <div class="diff-block-header"><span>Left ${item.leftLine} / Right ${item.rightLine}</span><strong>Changed</strong></div>`,
      "  <div class=\"diff-change-grid\">",
      `    <div><span class="diff-side-label">Before</span><pre class="diff-code diff-code-remove">${buildTokenMarkup(item.leftText, item.rightText, "left")}</pre></div>`,
      `    <div><span class="diff-side-label">After</span><pre class="diff-code diff-code-add">${buildTokenMarkup(item.leftText, item.rightText, "right")}</pre></div>`,
      "  </div>",
      "</article>"
    ].join("");
  }).join("");
}

function compareDiffInputs() {
  const left = elements.diffLeftInput.value;
  const right = elements.diffRightInput.value;
  if (!left.trim() && !right.trim()) {
    elements.diffSummary.innerHTML = "";
    elements.diffResults.innerHTML = "<article class=\"diff-block\"><h3>Add content to compare</h3><p>Paste or import two versions of a file to inspect the changes.</p></article>";
    state.diffSummaryText = "";
    return;
  }
  const result = computeLineDiff(left, right);
  renderDiffResults(result.items, result.truncated);
}

function loadDiffExample() {
  elements.diffLeftInput.value = DIFF_EXAMPLE.left || "";
  elements.diffRightInput.value = DIFF_EXAMPLE.right || "";
  compareDiffInputs();
}

function clearDiffPane(side = "left") {
  if (side === "left") elements.diffLeftInput.value = "";
  if (side === "right") elements.diffRightInput.value = "";
  compareDiffInputs();
}

function swapDiffInputs() {
  const left = elements.diffLeftInput.value;
  elements.diffLeftInput.value = elements.diffRightInput.value;
  elements.diffRightInput.value = left;
  compareDiffInputs();
}

async function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

async function importToolHtmlFile(file) {
  if (!file) return;
  const content = await readTextFile(file);
  elements.toolHtmlInput.value = content;
  persistToolDraft();
  renderToolStats();
  setToolStatus("Imported", `${file.name} was loaded into the HTML tool editor.`, "ok");
}

async function importDiffFile(side, file) {
  if (!file) return;
  const content = await readTextFile(file);
  if (side === "left") elements.diffLeftInput.value = content;
  else elements.diffRightInput.value = content;
  compareDiffInputs();
}

function renderEditorBadges() {
  if (!state.activeProject) {
    elements.editorBadges.innerHTML = "";
    return;
  }
  const activeNode = getNode(state.activeProject, state.activeFileId);
  const source = activeNode && !isImageNode(activeNode) ? editor.getValue() : "";
  const lines = source ? source.split("\n").length : 0;
  const words = source ? countWords(source) : 0;
  const fileCount = state.activeProject.nodes.filter((node) => node.type === "file").length;
  const badges = [
    `${fileCount} files`,
    `${state.openFileIds.length} tabs`,
    `${lines} lines`,
    words ? `${words} words` : "0 words",
    `Mode: ${elements.compileMode.value}`
  ];
  elements.editorBadges.innerHTML = badges.map((label) => `<span class="editor-badge">${escapeHtml(label)}</span>`).join("");
}

function updatePreviewZoom() {
  const zoom = Math.max(0.5, Math.min(2, state.previewZoom || 1));
  state.previewZoom = zoom;
  elements.previewFrame.style.transform = `scale(${zoom})`;
  elements.previewFrame.style.width = `${100 / zoom}%`;
  elements.previewFrame.style.height = `${100 / zoom}%`;
  elements.previewZoomLabel.textContent = `${Math.round(zoom * 100)}%`;
}

function setPreviewZoom(nextZoom) {
  state.previewZoom = nextZoom;
  updatePreviewZoom();
}

function refreshPreview() {
  if (!state.compiled || !state.lastCompiledHtml) {
    setCompileStatus("Refresh skipped", "Compile once before refreshing the preview.", "error");
    return;
  }
  const frame = elements.previewFrame;
  frame.removeAttribute("src");
  frame.srcdoc = state.lastCompiledHtml;
  setCompileStatus("Preview refreshed", "The current compiled output was reloaded in place.", "ok");
}

function applyWorkspaceEditorWidth() {
  if (!state.editorPaneWidth) {
    elements.workspaceView.style.removeProperty("--editor-pane-width");
    return;
  }
  elements.workspaceView.style.setProperty("--editor-pane-width", `${state.editorPaneWidth}px`);
}

function beginWorkspaceResize(event) {
  if (window.innerWidth <= 980) return;
  event.preventDefault();
  const shellRect = elements.workspaceView.getBoundingClientRect();
  const sidebarWidth = elements.workspaceSidebar.getBoundingClientRect().width;
  const minWidth = 360;
  const maxWidth = Math.max(minWidth, shellRect.width - sidebarWidth - 10 - 360);

  const onMove = (moveEvent) => {
    const next = moveEvent.clientX - shellRect.left - sidebarWidth;
    state.editorPaneWidth = Math.max(minWidth, Math.min(maxWidth, next));
    applyWorkspaceEditorWidth();
  };

  const onUp = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
  };

  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
}

function snapshotProjectForHistory(project) {
  const copy = cloneProject(project);
  copy.historySnapshots = [];
  return serializeProject(copy);
}

function createHistorySnapshot(reason) {
  if (!state.activeProject) return;
  if (!Array.isArray(state.activeProject.historySnapshots)) state.activeProject.historySnapshots = [];
  const data = snapshotProjectForHistory(state.activeProject);
  if (state.activeProject.historySnapshots[0]?.data === data) return;
  state.activeProject.historySnapshots.unshift({
    id: uuid(),
    reason,
    at: new Date().toISOString(),
    data
  });
  state.activeProject.historySnapshots = state.activeProject.historySnapshots.slice(0, 12);
}

function currentTextFile(node) {
  return node && node.type === "file" && !isImageNode(node) ? node : null;
}

function scheduleWorkspaceRefresh() {
  clearTimeout(state.panelRefreshTimer);
  state.panelRefreshTimer = setTimeout(() => {
    renderAssetsPanel();
    renderWorkspaceSearch();
    renderOutlinePanel();
    renderCommentsPanel();
    renderHistoryPanel();
    renderSnippetPanel();
    renderActivityPanel();
    renderRecentFilesPanel();
    renderSettingsPanel();
    renderEditorBadges();
  }, 120);
}

function getSnippetFamily(name = "") {
  const extension = getExtension(name);
  if (extension === "css") return "css";
  if (["js", "mjs", "cjs", "ts", "jsx", "tsx"].includes(extension)) return "javascript";
  if (extension === "py") return "python";
  if (["html", "htm"].includes(extension)) return "html";
  return "generic";
}

function insertSnippet(content, title) {
  if (!state.activeProject || !state.activeFileId) return;
  const activeNode = getNode(state.activeProject, state.activeFileId);
  if (!activeNode || isImageNode(activeNode)) return;
  editor.replaceRange(`${content}\n`, editor.getCursor());
  setCompileStatus("Inserted snippet", `${title} was added to ${activeNode.name}.`, "ok");
  recordProjectActivity("Inserted snippet", `${title} was inserted into ${activeNode.name}.`, "edit");
  scheduleWorkspaceRefresh();
}

function renderSnippetPanel() {
  if (!state.activeProject || !state.activeFileId) {
    setEmptyPanel(elements.snippetPanel, "Open a file to see quick insert blocks.");
    return;
  }
  const activeNode = getNode(state.activeProject, state.activeFileId);
  if (!activeNode || isImageNode(activeNode)) {
    setEmptyPanel(elements.snippetPanel, "Snippets are available for text files only.");
    return;
  }
  const family = getSnippetFamily(activeNode.name);
  const snippets = SNIPPETS_BY_FAMILY[family] || SNIPPETS_BY_FAMILY.generic;
  elements.snippetPanel.innerHTML = `<div class="snippet-list">${snippets.map((snippet) => [
    "<article class=\"snippet-card\">",
    `  <h4>${escapeHtml(snippet.title)}</h4>`,
    `  <p>${escapeHtml(snippet.detail)}</p>`,
    "  <div class=\"snippet-card-actions\">",
    `    <span class="activity-badge">${escapeHtml((family || "generic").toUpperCase())}</span>`,
    `    <button class="ghost-button compact" data-snippet-title="${escapeHtml(snippet.title)}">Insert</button>`,
    "  </div>",
    "</article>"
  ].join("")).join("")}</div>`;
  qsa("[data-snippet-title]", elements.snippetPanel).forEach((button, index) => {
    button.addEventListener("click", () => insertSnippet(snippets[index].content, snippets[index].title));
  });
}

function findLineNumber(source, predicate) {
  const lines = source.split("\n");
  for (let index = 0; index < lines.length; index += 1) {
    if (predicate(lines[index])) return index;
  }
  return 0;
}

function buildOutlineItems(node) {
  if (!node || !PREVIEWABLE_EXTENSIONS.has(getExtension(node.name))) return [];
  const source = node.id === state.activeFileId ? editor.getValue() : (node.content || "");
  const doc = new DOMParser().parseFromString(source || "", "text/html");
  const headingItems = Array.from(doc.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((element) => {
    const text = element.textContent.replace(/\s+/g, " ").trim();
    const tag = element.tagName.toLowerCase();
    const line = findLineNumber(source, (entry) => entry.toLowerCase().includes(`<${tag}`) && (!text || entry.includes(text.slice(0, 18))));
    return {
      label: text || tag.toUpperCase(),
      level: Number(tag.slice(1)),
      line,
      meta: tag.toUpperCase()
    };
  });
  const landmarks = Array.from(doc.querySelectorAll("main,section[id],article[id],nav[id],header[id],footer[id]"))
    .slice(0, 8)
    .map((element) => {
      const tag = element.tagName.toLowerCase();
      const marker = element.id || element.getAttribute("aria-label") || tag;
      const line = findLineNumber(source, (entry) => entry.toLowerCase().includes(`<${tag}`) && (!element.id || entry.includes(element.id)));
      return {
        label: marker,
        level: 1,
        line,
        meta: "LANDMARK"
      };
    });
  return [...landmarks, ...headingItems].slice(0, 24);
}

function renderOutlinePanel() {
  if (!state.activeProject) {
    setEmptyPanel(elements.outlinePanel, "Open a project to generate an outline.");
    return;
  }
  const activeNode = getNode(state.activeProject, state.activeFileId);
  const sourceNode = activeNode && PREVIEWABLE_EXTENSIONS.has(getExtension(activeNode.name))
    ? activeNode
    : getEntryFile(state.activeProject);
  if (!sourceNode) {
    setEmptyPanel(elements.outlinePanel, "Add an HTML file to generate an outline.");
    return;
  }
  const items = buildOutlineItems(sourceNode);
  if (!items.length) {
    setEmptyPanel(elements.outlinePanel, "Add headings like h1-h6 or named sections to build a document outline.");
    return;
  }
  elements.outlinePanel.innerHTML = `<div class="outline-list">${items.map((item) => [
    `<button class="outline-item" data-outline-line="${item.line}" data-level="${item.level}" type="button">`,
    `  <strong>${escapeHtml(item.label)}</strong>`,
    `  <small>${escapeHtml(sourceNode.name)} | ${escapeHtml(item.meta)} | line ${item.line + 1}</small>`,
    "</button>"
  ].join("")).join("")}</div>`;
  qsa("[data-outline-line]", elements.outlinePanel).forEach((button) => {
    button.addEventListener("click", () => {
      if (state.activeFileId !== sourceNode.id) activateFile(sourceNode.id);
      const line = Number(button.dataset.outlineLine) || 0;
      editor.focus();
      editor.setCursor({ line, ch: 0 });
      editor.scrollIntoView({ line, ch: 0 }, 120);
      setCompileStatus("Outline jump", `Moved to line ${line + 1} in ${sourceNode.name}.`, "ok");
    });
  });
}

function renderActivityPanel() {
  if (!state.activeProject || !Array.isArray(state.activeProject.activityLog) || !state.activeProject.activityLog.length) {
    setEmptyPanel(elements.activityPanel, "Activity will appear here as you edit, import, save, and compile.");
    return;
  }
  elements.activityPanel.innerHTML = `<div class="activity-list">${state.activeProject.activityLog.map((entry) => [
    "<article class=\"activity-item\">",
    `  <h4>${escapeHtml(entry.title)}</h4>`,
    `  <p>${escapeHtml(entry.detail)}</p>`,
    "  <div class=\"activity-meta\">",
    `    <span class="activity-badge">${escapeHtml((entry.kind || "note").toUpperCase())}</span>`,
    `    <time datetime="${escapeHtml(entry.at)}">${escapeHtml(timestampLabel(entry.at))}</time>`,
    "  </div>",
    "</article>"
  ].join("")).join("")}</div>`;
}

function projectMetrics(project) {
  return {
    fileCount: project.nodes.filter((node) => node.type === "file").length,
    imageCount: project.nodes.filter((node) => isImageNode(node)).length,
    commentCount: Array.isArray(project.comments) ? project.comments.filter((item) => !item.resolved).length : 0,
    snapshotCount: Array.isArray(project.historySnapshots) ? project.historySnapshots.length : 0
  };
}

function renderDashboardPanels() {
  const allProjects = [...state.projects];
  const totalFiles = allProjects.reduce((sum, project) => sum + projectMetrics(project).fileCount, 0);
  const totalComments = allProjects.reduce((sum, project) => sum + projectMetrics(project).commentCount, 0);
  const totalSnapshots = allProjects.reduce((sum, project) => sum + projectMetrics(project).snapshotCount, 0);
  const stats = [
    `${allProjects.length} projects`,
    `${totalFiles} files`,
    `${totalComments} open comments`,
    `${totalSnapshots} snapshots`,
    state.backendReachable && state.currentUser ? "Cloud sync" : "Local drafts"
  ];
  elements.dashboardStats.innerHTML = stats.map((item) => `<span class="project-metric">${escapeHtml(item)}</span>`).join("");

  if (!allProjects.length) {
    setEmptyPanel(elements.dashboardRecent, "Create or import a project to build a recent activity list.");
    return;
  }
  const recent = [...allProjects]
    .sort((left, right) => new Date(right.updatedAt) - new Date(left.updatedAt))
    .slice(0, 5);
  elements.dashboardRecent.innerHTML = `<div class="recent-project-list">${recent.map((project) => {
    const metrics = projectMetrics(project);
    return [
      `<button class="recent-project-item" type="button" data-open-project="${project.id}">`,
      `  <strong>${escapeHtml(project.name)}</strong>`,
      `  <small>${escapeHtml(`${metrics.fileCount} files · ${metrics.commentCount} comments`)}</small>`,
      "</button>"
    ].join("");
  }).join("")}</div>`;
  qsa("[data-open-project]", elements.dashboardRecent).forEach((button) => {
    button.addEventListener("click", () => openWorkspace(button.dataset.openProject));
  });
}

function filteredProjects() {
  const query = state.projectSearchQuery.trim().toLowerCase();
  let projects = [...state.projects];
  if (query) {
    projects = projects.filter((project) => {
      const fileNames = project.nodes.filter((node) => node.type === "file").map((node) => node.name).join(" ");
      const comments = (project.comments || []).map((item) => item.text || "").join(" ");
      const haystack = `${project.name} ${fileNames} ${comments}`.toLowerCase();
      return haystack.includes(query);
    });
  }

  projects.sort((left, right) => {
    if (state.projectSort === "alpha") return left.name.localeCompare(right.name);
    if (state.projectSort === "files") return projectMetrics(right).fileCount - projectMetrics(left).fileCount;
    if (state.projectSort === "comments") return projectMetrics(right).commentCount - projectMetrics(left).commentCount;
    return new Date(right.updatedAt) - new Date(left.updatedAt);
  });
  return projects;
}

async function copyTextValue(value, successMessage) {
  try {
    await navigator.clipboard.writeText(value);
    setCompileStatus("Copied", successMessage, "ok");
  } catch {
    setCompileStatus("Copy failed", "Clipboard access was blocked in this browser.", "error");
  }
}

function insertTextAtCursor(value, detail) {
  if (!state.activeProject || !state.activeFileId) return;
  const activeNode = getNode(state.activeProject, state.activeFileId);
  if (!currentTextFile(activeNode)) {
    setCompileStatus("Insert blocked", "Open a text file before inserting content.", "error");
    return;
  }
  editor.replaceRange(value, editor.getCursor());
  setCompileStatus("Inserted", detail, "ok");
}

function renderAssetsPanel() {
  if (!state.activeProject) {
    setEmptyPanel(elements.assetsPanel, "Open a project to browse uploaded assets.");
    return;
  }
  const assets = state.activeProject.nodes.filter((node) => node.type === "file" && isImageNode(node));
  if (!assets.length) {
    setEmptyPanel(elements.assetsPanel, "Upload images to build an asset library for the current project.");
    return;
  }
  elements.assetsPanel.innerHTML = `<div class="asset-grid">${assets.map((asset) => {
    const path = getNodePath(state.activeProject, asset.id);
    return [
      "<article class=\"asset-card\">",
      `  <img src="${escapeHtml(asset.content || "")}" alt="${escapeHtml(asset.name)}">`,
      `  <strong>${escapeHtml(asset.name)}</strong>`,
      `  <small>${escapeHtml(path)}</small>`,
      "  <div class=\"asset-actions\">",
      `    <button class="ghost-button compact" type="button" data-copy-asset="${asset.id}">Copy Path</button>`,
      `    <button class="ghost-button compact" type="button" data-insert-asset="${asset.id}">Insert</button>`,
      "  </div>",
      "</article>"
    ].join("");
  }).join("")}</div>`;
  qsa("[data-copy-asset]", elements.assetsPanel).forEach((button) => {
    button.addEventListener("click", async () => {
      const path = getNodePath(state.activeProject, button.dataset.copyAsset);
      await copyTextValue(path, `${path} copied to the clipboard.`);
    });
  });
  qsa("[data-insert-asset]", elements.assetsPanel).forEach((button) => {
    button.addEventListener("click", () => {
      const path = getNodePath(state.activeProject, button.dataset.insertAsset);
      insertTextAtCursor(path, `${path} inserted into the current file.`);
    });
  });
}

function renderRecentFilesPanel() {
  if (!state.activeProject) {
    setEmptyPanel(elements.recentFilesPanel, "Open a project to track recently visited files.");
    return;
  }
  const recentIds = (state.activeProject.recentFileIds || []).filter((id) => getNode(state.activeProject, id));
  if (!recentIds.length) {
    setEmptyPanel(elements.recentFilesPanel, "Recent files will appear here as you move around the workspace.");
    return;
  }
  elements.recentFilesPanel.innerHTML = `<div class="recent-file-list">${recentIds.slice(0, 8).map((fileId) => {
    const node = getNode(state.activeProject, fileId);
    const path = getNodePath(state.activeProject, fileId) || node.name;
    return [
      `<button class="recent-file-item" type="button" data-recent-file="${fileId}">`,
      `  <strong>${escapeHtml(node.name)}</strong>`,
      `  <small>${escapeHtml(path)}</small>`,
      "</button>"
    ].join("");
  }).join("")}</div>`;
  qsa("[data-recent-file]", elements.recentFilesPanel).forEach((button) => {
    button.addEventListener("click", () => activateFile(button.dataset.recentFile));
  });
}

function renderSettingsPanel() {
  if (!state.activeProject) {
    elements.projectNameInput.value = "";
    elements.entryFileSelect.innerHTML = "";
    elements.entryFileSelect.disabled = true;
    return;
  }
  elements.projectNameInput.value = state.activeProject.name || "";
  const previewableFiles = state.activeProject.nodes.filter((node) => node.type === "file" && PREVIEWABLE_EXTENSIONS.has(getExtension(node.name)));
  if (!previewableFiles.length) {
    elements.entryFileSelect.innerHTML = "<option value=\"\">No HTML entry files found</option>";
    elements.entryFileSelect.disabled = true;
  } else {
    elements.entryFileSelect.disabled = false;
    elements.entryFileSelect.innerHTML = previewableFiles.map((node) => {
      const path = getNodePath(state.activeProject, node.id) || node.name;
      const selected = (state.activeProject.entryFileId || getEntryFile(state.activeProject)?.id) === node.id ? " selected" : "";
      return `<option value="${node.id}"${selected}>${escapeHtml(path)}</option>`;
    }).join("");
  }
  elements.settingsCompileMode.value = state.activeProject.compileMode || "freestyle";
  elements.settingsPageSize.value = state.activeProject.pageSize || "A4";
  elements.settingsPageOrientation.value = state.activeProject.pageOrientation || "portrait";
}

function nextProjectName(originalName) {
  const existing = new Set(state.projects.map((project) => project.name.toLowerCase()));
  let attempt = `${originalName} Copy`;
  let counter = 2;
  while (existing.has(attempt.toLowerCase())) {
    attempt = `${originalName} Copy ${counter}`;
    counter += 1;
  }
  return attempt;
}

async function duplicateProject(projectId) {
  const source = state.projects.find((project) => project.id === projectId);
  if (!source) return;
  const duplicate = upgradeProjectShape(cloneProject(source));
  duplicate.id = uuid();
  duplicate.name = nextProjectName(source.name);
  duplicate.updatedAt = new Date().toISOString();
  duplicate.activityLog = [
    createActivityEntry("Duplicated project", `${source.name} was copied into a new workspace.`, "system"),
    ...(duplicate.activityLog || [])
  ].slice(0, 36);
  await saveProjectRecord(duplicate);
  await loadProjects();
  openWorkspace(duplicate.id);
  setCompileStatus("Project duplicated", `${duplicate.name} is ready for editing.`, "ok");
}

function downloadProjectBundle(projectId) {
  const project = state.activeProject && (!projectId || state.activeProject.id === projectId)
    ? state.activeProject
    : state.projects.find((entry) => entry.id === projectId);
  if (!project) return;
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    project: cloneProject(project)
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = rememberUrl(URL.createObjectURL(blob));
  const anchor = document.createElement("a");
  const safeName = project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "htmlleaf-project";
  anchor.href = url;
  anchor.download = `${safeName}.htmlleaf.json`;
  anchor.click();
  if (state.activeProjectId === project.id) {
    recordProjectActivity("Downloaded backup", `${project.name} was exported as a project backup.`, "export");
  }
  setCompileStatus("Backup ready", `${project.name} was downloaded as a JSON backup.`, "ok");
}

function nextSiblingName(project, parentId, originalName) {
  const siblings = getChildren(project, parentId).map((node) => node.name.toLowerCase());
  const dotIndex = originalName.lastIndexOf(".");
  const base = dotIndex > 0 ? originalName.slice(0, dotIndex) : originalName;
  const ext = dotIndex > 0 ? originalName.slice(dotIndex) : "";
  let attempt = `${base} copy${ext}`;
  let counter = 2;
  while (siblings.includes(attempt.toLowerCase())) {
    attempt = `${base} copy ${counter}${ext}`;
    counter += 1;
  }
  return attempt;
}

function duplicateSubtree(project, node, parentId, nameOverride = "") {
  const duplicateId = uuid();
  const duplicate = {
    ...cloneProject(node),
    id: duplicateId,
    parentId,
    name: nameOverride || node.name
  };
  project.nodes.push(duplicate);
  if (node.type === "folder") {
    getChildren(project, node.id).forEach((child) => {
      duplicateSubtree(project, cloneProject(child), duplicateId);
    });
  }
  return duplicate;
}

function duplicateSelectedNode() {
  if (!state.activeProject) return;
  const currentId = state.selectedTreeNodeId || state.activeFileId || activeContainerId();
  const node = getNode(state.activeProject, currentId);
  if (!node || node.parentId === null) return;
  const copyName = nextSiblingName(state.activeProject, node.parentId, node.name);
  const duplicate = duplicateSubtree(state.activeProject, node, node.parentId, copyName);
  markProjectDirty();
  recordProjectActivity("Duplicated node", `${node.name} was copied as ${duplicate.name}.`, "edit");
  renderTree();
  if (duplicate.type === "file") activateFile(duplicate.id);
}

function setSelectedAsEntry() {
  if (!state.activeProject) return;
  const currentId = state.selectedTreeNodeId || state.activeFileId;
  const node = getNode(state.activeProject, currentId);
  if (!node || node.type !== "file" || !PREVIEWABLE_EXTENSIONS.has(getExtension(node.name))) {
    setCompileStatus("Entry blocked", "Select an HTML file to set it as the compile entry.", "error");
    return;
  }
  state.activeProject.entryFileId = node.id;
  elements.entryFileLabel.textContent = node.name;
  renderSettingsPanel();
  markProjectDirty();
  recordProjectActivity("Updated entry file", `${node.name} is now the compile entry file.`, "edit");
  setCompileStatus("Entry updated", `${node.name} is now the active compile entry.`, "ok");
}

async function applyProjectSettings() {
  if (!state.activeProject) return;
  const nextName = elements.projectNameInput.value.trim() || state.activeProject.name;
  state.activeProject.name = nextName;
  state.activeProject.entryFileId = elements.entryFileSelect.value || state.activeProject.entryFileId;
  state.activeProject.compileMode = elements.settingsCompileMode.value;
  state.activeProject.pageSize = elements.settingsPageSize.value;
  state.activeProject.pageOrientation = elements.settingsPageOrientation.value;
  elements.projectName.textContent = nextName;
  elements.compileMode.value = state.activeProject.compileMode;
  elements.pageSize.value = state.activeProject.pageSize;
  elements.pageOrientation.value = state.activeProject.pageOrientation;
  syncPagedControls();
  elements.entryFileLabel.textContent = getEntryFile(state.activeProject)?.name || "None";
  markProjectDirty();
  recordProjectActivity("Applied settings", `${nextName} project settings were updated.`, "settings");
  await saveCurrentProject({ statusMessage: true });
}

function collectSearchResults(query) {
  if (!state.activeProject) return [];
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const results = [];
  state.activeProject.nodes
    .filter((node) => currentTextFile(node))
    .forEach((node) => {
      const content = node.id === state.activeFileId ? editor.getValue() : (node.content || "");
      const lines = content.split("\n");
      lines.forEach((line, index) => {
        if (!line.toLowerCase().includes(needle)) return;
        results.push({
          fileId: node.id,
          fileName: getNodePath(state.activeProject, node.id) || node.name,
          line: index,
          preview: line.trim() || "(blank line)"
        });
      });
    });
  return results.slice(0, 80);
}

function jumpToFileLine(fileId, line) {
  if (!state.activeProject) return;
  if (state.activeFileId !== fileId) activateFile(fileId);
  editor.focus();
  editor.setCursor({ line, ch: 0 });
  editor.scrollIntoView({ line, ch: 0 }, 140);
}

function renderWorkspaceSearch() {
  const query = state.workspaceSearchQuery.trim();
  if (!query) {
    setEmptyPanel(elements.workspaceSearchResults, "Search across your project to find text in any file.");
    return;
  }
  const results = collectSearchResults(query);
  if (!results.length) {
    setEmptyPanel(elements.workspaceSearchResults, `No matches for "${query}".`);
    return;
  }
  elements.workspaceSearchResults.innerHTML = `<div class="search-results-list">${results.map((result) => [
    `<button class="search-result" type="button" data-search-file-id="${result.fileId}" data-search-line="${result.line}">`,
    `  <h4>${escapeHtml(result.fileName)}</h4>`,
    `  <p>Line ${result.line + 1}</p>`,
    `  <code>${escapeHtml(result.preview)}</code>`,
    "</button>"
  ].join("")).join("")}</div>`;
  qsa("[data-search-file-id]", elements.workspaceSearchResults).forEach((button) => {
    button.addEventListener("click", () => {
      jumpToFileLine(button.dataset.searchFileId, Number(button.dataset.searchLine) || 0);
      setCompileStatus("Search jump", `Opened ${button.querySelector("h4")?.textContent || "result"}.`, "ok");
    });
  });
}

function renderCommentsPanel() {
  if (!state.activeProject) {
    elements.commentsFileLabel.textContent = "No file selected";
    setEmptyPanel(elements.commentsPanel, "Open a project to add comments.");
    return;
  }
  if (!Array.isArray(state.activeProject.comments)) state.activeProject.comments = [];
  const activeNode = getNode(state.activeProject, state.activeFileId);
  const fileNode = currentTextFile(activeNode);
  elements.commentsFileLabel.textContent = fileNode ? (getNodePath(state.activeProject, fileNode.id) || fileNode.name) : "No text file selected";
  const comments = fileNode
    ? state.activeProject.comments.filter((item) => item.fileId === fileNode.id)
    : [];
  if (!comments.length) {
    setEmptyPanel(elements.commentsPanel, "No comments yet for this file. Add one from the current editor line.");
    return;
  }
  elements.commentsPanel.innerHTML = `<div class="comments-items">${comments.map((comment) => [
    `<article class="comment-card${comment.resolved ? " resolved" : ""}">`,
    `  <h4>${escapeHtml(comment.title || `Line ${comment.line + 1}`)}</h4>`,
    `  <p>${escapeHtml(comment.text)}</p>`,
    "  <div class=\"comment-card-actions\">",
    `    <span class="activity-badge">${escapeHtml(comment.resolved ? "RESOLVED" : `LINE ${comment.line + 1}`)}</span>`,
    `    <span>${escapeHtml(timestampLabel(comment.createdAt))}</span>`,
    "  </div>",
    "  <div class=\"comment-card-actions\">",
    `    <button class="ghost-button compact" type="button" data-comment-jump="${comment.id}">Jump</button>`,
    `    <button class="ghost-button compact" type="button" data-comment-toggle="${comment.id}">${comment.resolved ? "Reopen" : "Resolve"}</button>`,
    "  </div>",
    "</article>"
  ].join("")).join("")}</div>`;
  qsa("[data-comment-jump]", elements.commentsPanel).forEach((button) => {
    button.addEventListener("click", () => {
      const comment = state.activeProject.comments.find((item) => item.id === button.dataset.commentJump);
      if (!comment) return;
      jumpToFileLine(comment.fileId, comment.line);
      setCompileStatus("Comment jump", `Moved to line ${comment.line + 1}.`, "ok");
    });
  });
  qsa("[data-comment-toggle]", elements.commentsPanel).forEach((button) => {
    button.addEventListener("click", () => toggleCommentState(button.dataset.commentToggle));
  });
}

function addCurrentLineComment() {
  if (!state.activeProject || !state.activeFileId) return;
  const activeNode = getNode(state.activeProject, state.activeFileId);
  const fileNode = currentTextFile(activeNode);
  const text = elements.commentInput.value.trim();
  if (!fileNode) {
    setCompileStatus("Comment blocked", "Comments can only be attached to text files.", "error");
    return;
  }
  if (!text) {
    setCompileStatus("Comment blocked", "Write a comment before adding it.", "error");
    return;
  }
  if (!Array.isArray(state.activeProject.comments)) state.activeProject.comments = [];
  const cursor = editor.getCursor();
  state.activeProject.comments.unshift({
    id: uuid(),
    fileId: fileNode.id,
    line: cursor.line,
    title: `${fileNode.name} line ${cursor.line + 1}`,
    text,
    resolved: false,
    createdAt: new Date().toISOString()
  });
  state.activeProject.comments = state.activeProject.comments.slice(0, 120);
  elements.commentInput.value = "";
  recordProjectActivity("Added comment", `Comment added on ${fileNode.name} line ${cursor.line + 1}.`, "review");
  renderCommentsPanel();
  scheduleAutosave();
}

function toggleCommentState(commentId) {
  if (!state.activeProject || !Array.isArray(state.activeProject.comments)) return;
  const comment = state.activeProject.comments.find((item) => item.id === commentId);
  if (!comment) return;
  comment.resolved = !comment.resolved;
  recordProjectActivity(comment.resolved ? "Resolved comment" : "Reopened comment", `${comment.title} was ${comment.resolved ? "resolved" : "reopened"}.`, "review");
  renderCommentsPanel();
  scheduleAutosave();
}

function renderHistoryPanel() {
  if (!state.activeProject || !Array.isArray(state.activeProject.historySnapshots) || !state.activeProject.historySnapshots.length) {
    setEmptyPanel(elements.historyPanel, "History snapshots appear here after meaningful saves and compiles.");
    return;
  }
  elements.historyPanel.innerHTML = `<div class="history-list">${state.activeProject.historySnapshots.map((snapshot) => [
    "<article class=\"history-card\">",
    `  <h4>${escapeHtml(snapshot.reason)}</h4>`,
    `  <p>${escapeHtml(new Date(snapshot.at).toLocaleString())}</p>`,
    "  <div class=\"history-card-actions\">",
    `    <span class="activity-badge">SNAPSHOT</span>`,
    `    <button class="ghost-button compact" type="button" data-history-restore="${snapshot.id}">Restore</button>`,
    "  </div>",
    "</article>"
  ].join("")).join("")}</div>`;
  qsa("[data-history-restore]", elements.historyPanel).forEach((button) => {
    button.addEventListener("click", () => restoreHistorySnapshot(button.dataset.historyRestore));
  });
}

async function restoreHistorySnapshot(snapshotId) {
  if (!state.activeProject) return;
  const snapshot = (state.activeProject.historySnapshots || []).find((item) => item.id === snapshotId);
  if (!snapshot) return;
  if (!confirm(`Restore snapshot "${snapshot.reason}" from ${new Date(snapshot.at).toLocaleString()}?`)) return;
  const previousHistory = [...(state.activeProject.historySnapshots || [])];
  const restored = deserializeProject(snapshot.data);
  restored.id = state.activeProject.id;
  restored.historySnapshots = previousHistory;
  restored.activityLog = Array.isArray(restored.activityLog) ? restored.activityLog : [];
  state.activeProject = upgradeProjectShape(restored);
  state.activeProjectId = restored.id;
  elements.projectName.textContent = state.activeProject.name;
  renderTree();
  renderTabs();
  activateFile(state.activeProject.selectedFileId || findFirstFileId(state.activeProject));
  recordProjectActivity("Restored snapshot", `${snapshot.reason} was restored.`, "history");
  renderHistoryPanel();
  await saveCurrentProject({ statusMessage: true });
}

function getCommandPaletteCommands() {
  return [
    { title: "New file", detail: "Create a new file in the selected folder.", action: () => createNode("file") },
    { title: "New folder", detail: "Create a new folder in the selected location.", action: () => createNode("folder") },
    { title: "Rename project", detail: "Rename the current project.", action: () => renameActiveProject() },
    { title: "Duplicate project", detail: "Create a copy of the current project workspace.", action: () => duplicateProject(state.activeProjectId) },
    { title: "Download project backup", detail: "Download a JSON backup of the current project.", action: () => downloadProjectBundle(state.activeProjectId) },
    { title: "Rename selected node", detail: "Rename the selected file or folder.", action: () => renameSelectedNode() },
    { title: "Duplicate selected node", detail: "Copy the current file or folder in the tree.", action: () => duplicateSelectedNode() },
    { title: "Delete selected node", detail: "Delete the selected file or folder.", action: () => deleteSelectedNode() },
    { title: "Set selected file as entry", detail: "Make the selected HTML file the compile entry.", action: () => setSelectedAsEntry() },
    { title: "Save project", detail: "Save the active project.", action: () => saveCurrentProject({ logActivity: true, statusMessage: true }) },
    { title: "Compile project", detail: "Run the current compile mode.", action: () => compileProject() },
    { title: "Refresh preview", detail: "Reload the current compiled preview in place.", action: () => refreshPreview() },
    { title: "Preview fit", detail: "Reset preview zoom to 100%.", action: () => setPreviewZoom(1) },
    { title: "Preview zoom in", detail: "Increase the preview zoom level.", action: () => setPreviewZoom(state.previewZoom + 0.1) },
    { title: "Preview zoom out", detail: "Decrease the preview zoom level.", action: () => setPreviewZoom(state.previewZoom - 0.1) },
    { title: "Download HTML", detail: "Download the selected text file.", action: () => downloadHTML() },
    { title: "Download PDF", detail: "Export the current compiled PDF.", action: () => downloadPDF() },
    { title: "Open files panel", detail: "Switch the left rail to files.", action: () => setSidebarPanel("files") },
    { title: "Open assets panel", detail: "Switch the left rail to uploaded assets.", action: () => setSidebarPanel("assets") },
    { title: "Open search panel", detail: "Switch the left rail to project search.", action: () => setSidebarPanel("search") },
    { title: "Open outline panel", detail: "Switch the left rail to document outline.", action: () => setSidebarPanel("outline") },
    { title: "Open comments panel", detail: "Switch the left rail to comments.", action: () => setSidebarPanel("comments") },
    { title: "Open history panel", detail: "Switch the left rail to snapshots.", action: () => setSidebarPanel("history") },
    { title: "Open tools panel", detail: "Switch the left rail to tools.", action: () => setSidebarPanel("tools") },
    { title: "Open settings panel", detail: "Switch the left rail to project settings.", action: () => setSidebarPanel("settings") },
    { title: "Apply project settings", detail: "Save the current settings panel values.", action: () => applyProjectSettings() },
    { title: "Toggle wrap", detail: "Turn editor line wrapping on or off.", action: () => toggleEditorWrap() },
    { title: "Format current file", detail: "Run the built-in formatter for the active file.", action: () => formatCurrentFile() },
    { title: "Add comment on current line", detail: "Create a review note on the editor cursor line.", action: () => addCurrentLineComment() }
  ];
}

function renderCommandPalette(query = "") {
  const needle = query.trim().toLowerCase();
  const commands = getCommandPaletteCommands().filter((command) => {
    if (!needle) return true;
    return `${command.title} ${command.detail}`.toLowerCase().includes(needle);
  });
  if (!commands.length) {
    setEmptyPanel(elements.commandPaletteResults, "No commands match this search.");
    return;
  }
  elements.commandPaletteResults.innerHTML = commands.map((command, index) => [
    `<button class="palette-command" type="button" data-command-index="${index}">`,
    `  <strong>${escapeHtml(command.title)}</strong>`,
    `  <small>${escapeHtml(command.detail)}</small>`,
    "</button>"
  ].join("")).join("");
  qsa("[data-command-index]", elements.commandPaletteResults).forEach((button) => {
    button.addEventListener("click", async () => {
      closeModal(elements.commandPaletteModal);
      await commands[Number(button.dataset.commandIndex)].action();
    });
  });
}

function openCommandPalette(initialQuery = "") {
  openModal(elements.commandPaletteModal);
  elements.commandPaletteInput.value = initialQuery;
  renderCommandPalette(initialQuery);
  elements.commandPaletteInput.focus();
}

function updateWrapButton() {
  elements.editorWrapToggle.textContent = state.editorWrapEnabled ? "Wrap On" : "Wrap Off";
}

function toggleEditorWrap() {
  state.editorWrapEnabled = !state.editorWrapEnabled;
  editor.setOption("lineWrapping", state.editorWrapEnabled);
  updateWrapButton();
  setCompileStatus("Editor updated", `Line wrapping is now ${state.editorWrapEnabled ? "on" : "off"}.`, "ok");
}

function formatCurrentFile() {
  if (!state.activeProject || !state.activeFileId) return;
  const activeNode = getNode(state.activeProject, state.activeFileId);
  if (!activeNode || isImageNode(activeNode)) return;
  const source = editor.getValue();
  const extension = getExtension(activeNode.name);
  let formatted = source;

  if (extension === "html" || extension === "htm") {
    formatted = source
      .replace(/>\s*</g, ">\n<")
      .replace(/<(\/?)(body|head|main|section|article|div|header|footer|aside|nav|ul|ol|li|table|tr|tbody|thead|script|style)([^>]*)>/gi, "\n<$1$2$3>")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  } else if (extension === "css") {
    formatted = source
      .replace(/\s*{\s*/g, " {\n  ")
      .replace(/;\s*/g, ";\n  ")
      .replace(/\s*}\s*/g, "\n}\n")
      .replace(/\n\s+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  } else if (["js", "mjs", "cjs", "ts", "jsx", "tsx"].includes(extension)) {
    formatted = source
      .replace(/;\s*/g, ";\n")
      .replace(/\{\s*/g, "{\n")
      .replace(/\}\s*/g, "}\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  } else {
    formatted = source.replace(/\t/g, "  ");
  }

  if (formatted && formatted !== source) {
    editor.setValue(formatted);
    setCompileStatus("Formatted", `${activeNode.name} was reformatted for readability.`, "ok");
    recordProjectActivity("Formatted file", `${activeNode.name} was normalized for readability.`, "edit");
  }
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
  elements.landingHero.classList.toggle("hidden", route !== "projects");
  elements.landingView.classList.remove("hidden");
  elements.workspaceView.classList.add("hidden");
  if (route === "templates") renderTemplateGallery();
  if (route === "tools") renderToolStats();
  if (route === "diff") compareDiffInputs();
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
  state.compiled = false;
  state.lastCompiledHtml = "";
  state.lastCompiledMode = state.activeProject.compileMode || "freestyle";
  state.lastCompiledFileName = "document.html";
  state.treeFilter = "";
  state.workspaceSearchQuery = "";
  state.sidebarPanel = "files";
  state.previewZoom = 1;
  elements.previewFrame.src = "about:blank";
  elements.previewFrame.removeAttribute("srcdoc");
  elements.previewEmptyState.classList.remove("hidden");
  saveLastProjectId(projectId);
  elements.projectName.textContent = state.activeProject.name;
  elements.workspaceStorageLabel.textContent = state.backendReachable && state.currentUser
    ? "Cloud sync active."
    : "Local draft mode.";
  elements.fileTreeSearch.value = "";
  elements.workspaceSearchInput.value = "";
  elements.commentInput.value = "";
  elements.compileMode.value = state.activeProject.compileMode || "freestyle";
  elements.pageSize.value = state.activeProject.pageSize || "A4";
  elements.pageOrientation.value = state.activeProject.pageOrientation || "portrait";
  syncPagedControls();
  applyWorkspaceEditorWidth();
  updatePreviewZoom();
  setSidebarPanel(state.sidebarPanel);
  elements.landingView.classList.add("hidden");
  elements.workspaceView.classList.remove("hidden");
  renderTree();
  renderAssetsPanel();
  renderWorkspaceSearch();
  renderActivityPanel();
  renderSnippetPanel();
  renderOutlinePanel();
  renderCommentsPanel();
  renderHistoryPanel();
  renderRecentFilesPanel();
  renderSettingsPanel();
  renderEditorBadges();
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
  elements.downloadPdfButton.disabled = elements.compileMode.value === "app";
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
  const projects = filteredProjects();
  elements.projectsGrid.innerHTML = "";
  elements.projectSearchInput.value = state.projectSearchQuery;
  elements.projectSortSelect.value = state.projectSort;
  const gateVisible = state.backendReachable && !state.currentUser;
  elements.landingAuthGate.classList.toggle("hidden", !gateVisible);
  renderDashboardPanels();

  if (!projects.length) {
    const emptyCard = document.createElement("article");
    emptyCard.className = "project-card";
    emptyCard.innerHTML = [
      `<h3>${state.projectSearchQuery ? "No matching projects" : "No projects yet"}</h3>`,
      `<p>${state.projectSearchQuery ? "Try a different name or clear the current project search." : (gateVisible ? "Sign in to start your synced workspace." : "Create a project or import a public GitHub repository to get started.")}</p>`,
      "<div class=\"project-card-footer\"><span>Starter workspace ready</span></div>"
    ].join("");
    elements.projectsGrid.appendChild(emptyCard);
    return;
  }

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    const fileCount = project.nodes.filter((node) => node.type === "file").length;
    const commentCount = Array.isArray(project.comments) ? project.comments.filter((item) => !item.resolved).length : 0;
    const snapshotCount = Array.isArray(project.historySnapshots) ? project.historySnapshots.length : 0;
    const updated = new Date(project.updatedAt).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    card.innerHTML = [
      "<div class=\"project-card-top\">",
      `  <div><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(projectSummary(project))}</p></div>`,
      "  <div class=\"project-card-metrics\">",
      `    <span class="project-metric">${fileCount} files</span>`,
      `    <span class="project-metric">${commentCount} comments</span>`,
      `    <span class="project-metric">${snapshotCount} snapshots</span>`,
      "  </div>",
      "</div>",
      `<div class="project-card-footer"><span>${updated}</span><div class="project-card-actions"></div></div>`
    ].join("");
    const actions = qs(".project-card-actions", card);
    const openButton = document.createElement("button");
    openButton.className = "ghost-button compact";
    openButton.textContent = "Open";
    openButton.addEventListener("click", () => openWorkspace(project.id));
    actions.appendChild(openButton);

    const duplicateButton = document.createElement("button");
    duplicateButton.className = "ghost-button compact";
    duplicateButton.textContent = "Duplicate";
    duplicateButton.addEventListener("click", () => duplicateProject(project.id));
    actions.appendChild(duplicateButton);

    const exportButton = document.createElement("button");
    exportButton.className = "ghost-button compact";
    exportButton.textContent = "Backup";
    exportButton.addEventListener("click", () => downloadProjectBundle(project.id));
    actions.appendChild(exportButton);

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

function visibleTreeIds(project, query) {
  if (!query) return new Set(project.nodes.map((node) => node.id));
  const normalizedQuery = query.toLowerCase();
  const visible = new Set();
  project.nodes.forEach((node) => {
    const path = node.parentId === null ? project.name : getNodePath(project, node.id);
    const haystack = `${node.name} ${path}`.toLowerCase();
    if (!haystack.includes(normalizedQuery)) return;
    let current = node;
    while (current) {
      visible.add(current.id);
      current = current.parentId ? getNode(project, current.parentId) : null;
    }
  });
  return visible;
}

function renderTree() {
  if (!state.activeProject) return;
  const visibleIds = visibleTreeIds(state.activeProject, state.treeFilter);
  const filteredNodes = state.activeProject.nodes.filter((node) => visibleIds.has(node.id));
  if (!filteredNodes.length) {
    $("#file-tree").off();
    if ($("#file-tree").jstree(true)) $("#file-tree").jstree("destroy");
    setEmptyPanel(document.getElementById("file-tree"), `No files match "${state.treeFilter}".`);
    return;
  }
  const treeData = state.activeProject.nodes
    .filter((node) => visibleIds.has(node.id))
    .filter((node) => node.parentId !== null || node.type === "folder")
    .map((node) => ({
      id: node.id,
      parent: node.parentId ? node.parentId : "#",
      text: node.parentId === null ? state.activeProject.name : node.name,
      icon: fileIcon(node),
      state: { opened: node.type === "folder" || Boolean(state.treeFilter) },
      data: node
    }));

  const treeRoot = $("#file-tree");
  treeRoot.off();
  if (treeRoot.jstree(true)) treeRoot.jstree("destroy");
  treeRoot.html("");
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
      if (state.treeFilter) treeRoot.jstree(true).open_all();
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
  state.activeProject.recentFileIds = [fileId, ...(state.activeProject.recentFileIds || []).filter((id) => id !== fileId)].slice(0, 10);
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
  scheduleWorkspaceRefresh();
  const tree = $("#file-tree").jstree(true);
  if (tree) tree.select_node(fileId);
}

function syncEditorToProject() {
  if (!state.activeProject || !state.activeFileId || suspendEditorSync) return;
  const node = getNode(state.activeProject, state.activeFileId);
  if (!node || node.type !== "file" || isImageNode(node)) return;
  node.content = editor.getValue();
  scheduleWorkspaceRefresh();
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
  recordProjectActivity(isFolder ? "Created folder" : "Created file", `${name} was added to the workspace.`, "edit");
  renderTree();
  const created = state.activeProject.nodes[state.activeProject.nodes.length - 1];
  if (!isFolder) activateFile(created.id);
}

async function renameActiveProject() {
  if (!state.activeProject) return;
  const nextName = await promptForValue({
    label: "Project",
    title: "Rename project",
    value: state.activeProject.name,
    confirmLabel: "Rename project"
  });
  if (!nextName) return;
  state.activeProject.name = nextName.trim();
  elements.projectName.textContent = state.activeProject.name;
  elements.projectNameInput.value = state.activeProject.name;
  markProjectDirty();
  recordProjectActivity("Renamed project", `Project is now named ${state.activeProject.name}.`, "edit");
  renderProjectGrid();
  renderTree();
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
  const previousName = node.name;
  node.name = nextName.trim();
  markProjectDirty();
  recordProjectActivity("Renamed node", `${previousName} is now ${node.name}.`, "edit");
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
  recordProjectActivity("Deleted node", `${node.name} was removed from the workspace.`, "edit");
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
  recordProjectActivity("Uploaded assets", `${created.length} image ${created.length === 1 ? "file" : "files"} added to the project.`, "asset");
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

  if (state.backendReachable && !state.currentUser) {
    elements.compileButton.textContent = "Sign In to Compile";
  } else {
    elements.compileButton.textContent = "Compile";
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

async function saveCurrentProject(options = {}) {
  if (!state.activeProject) return;
  const { logActivity = false, statusMessage = false, snapshotReason = "" } = options;
  state.activeProject.compileMode = elements.compileMode.value;
  state.activeProject.pageSize = elements.pageSize.value;
  state.activeProject.pageOrientation = elements.pageOrientation.value;
  state.activeProject.openFileIds = [...state.openFileIds];
  state.activeProject.selectedFileId = state.activeFileId;
  state.activeProject.updatedAt = new Date().toISOString();
  if (snapshotReason) createHistorySnapshot(snapshotReason);
  if (logActivity) {
    recordProjectActivity("Saved project", `${state.activeProject.name} was saved to ${state.backendReachable && state.currentUser ? "cloud sync" : "local drafts"}.`, "save");
  }
  await saveProjectRecord(state.activeProject);
  state.activeProjectId = state.activeProject.id;
  saveLastProjectId(state.activeProject.id);

  const existingIndex = state.projects.findIndex((item) => item.id === state.activeProject.id);
  if (existingIndex >= 0) state.projects.splice(existingIndex, 1, cloneProject(state.activeProject));
  else state.projects.unshift(cloneProject(state.activeProject));
  renderProjectGrid();
  elements.workspaceStorageLabel.textContent = state.backendReachable && state.currentUser ? "Cloud sync active." : "Local draft mode.";
  renderHistoryPanel();
  if (statusMessage) {
    setCompileStatus("Saved", `${state.activeProject.name} was saved successfully.`, "ok");
  }
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
  const project = buildPresetProject("blank", name);
  await saveProjectRecord(project);
  await loadProjects();
  openWorkspace(project.id);
  recordProjectActivity("Opened workspace", `${project.name} is ready for editing.`, "system");
}

async function createProjectFromPreset(presetKey, name = "") {
  const project = buildPresetProject(presetKey, name);
  await saveProjectRecord(project);
  await loadProjects();
  openWorkspace(project.id);
  recordProjectActivity("Opened workspace", `${project.name} is ready for editing.`, "system");
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
  const preferred = getNode(project, project.entryFileId || project.selectedFileId);
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

function injectPagedMode(htmlSource) {
  const page = PAGE_SIZES[elements.pageSize.value] || PAGE_SIZES.A4;
  const orientation = elements.pageOrientation.value;
  const widthMm = orientation === "portrait" ? page.widthMm : page.heightMm;
  const heightMm = orientation === "portrait" ? page.heightMm : page.widthMm;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlSource, "text/html");
  const style = doc.createElement("style");
  style.textContent = [
    `@page { size: ${elements.pageSize.value} ${orientation}; margin: 0; }`,
    "html { background: #e8ebef; }",
    `body { max-width: ${widthMm}mm; min-height: ${heightMm}mm; margin: 18px auto !important; background: #ffffff; box-shadow: 0 0 0 1px rgba(23,33,43,0.08); }`
  ].join("\n");
  doc.head.appendChild(style);
  return `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
}

async function buildCompiledSource(project, entryFile, mode) {
  cleanupObjectUrls();
  const workspace = await buildVirtualWorkspace(project);
  const entryPath = getNodePath(project, entryFile.id);
  const htmlSource = await workspace.sourceFor(entryPath);
  if (!htmlSource) return null;
  return mode === "paged" ? injectPagedMode(htmlSource) : htmlSource;
}

async function compileProject() {
  if (!state.activeProject) return;
  if (!requireAuth("Sign in to compile from a protected HTMLLeaf workspace.")) return;

  const entryFile = getEntryFile(state.activeProject);
  if (!entryFile) {
    setCompileStatus("Missing entry file", "Add an index.html or another HTML file to compile.", "error");
    return;
  }

  const mode = elements.compileMode.value;
  state.activeProject.compileMode = mode;
  state.activeProject.pageSize = elements.pageSize.value;
  state.activeProject.pageOrientation = elements.pageOrientation.value;
  elements.entryFileLabel.textContent = entryFile.name;

  setCompileStatus("Compiling", mode === "app" ? "Opening sandboxed preview." : "Rendering preview from the compiled document.", "working");
  elements.previewEmptyState.classList.add("hidden");

  setTimeout(async () => {
    try {
      const compiledHtml = await buildCompiledSource(state.activeProject, entryFile, mode);
      if (!compiledHtml) throw new Error("The entry file could not be resolved.");

      const frame = elements.previewFrame;
      frame.onload = async () => {
        state.compiled = true;
        state.lastCompiledHtml = compiledHtml;
        state.lastCompiledMode = mode;
        state.lastCompiledFileName = entryFile.name;
        elements.downloadPdfButton.disabled = mode === "app";
        const detail = mode === "app"
          ? "App preview is interactive inside a sandboxed iframe."
          : mode === "paged"
            ? `Preview compiled with ${elements.pageSize.value} ${elements.pageOrientation.value} framing.`
            : "Preview compiled from the document as-is.";
        setCompileStatus("Compiled", detail, "ok");
        updatePreviewZoom();
        recordProjectActivity("Compiled project", `${entryFile.name} compiled in ${mode} mode.`, "compile");
        renderEditorBadges();
        scheduleAutosave();
      };

      frame.removeAttribute("src");
      frame.sandbox = mode === "app"
        ? "allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-downloads"
        : "allow-scripts allow-same-origin";
      frame.srcdoc = compiledHtml;
      await saveCurrentProject({ snapshotReason: `Compiled ${mode}` });
    } catch (error) {
      console.error(error);
      state.compiled = false;
      elements.previewEmptyState.classList.remove("hidden");
      setCompileStatus("Compile error", error.message, "error");
      recordProjectActivity("Compile error", error.message, "error");
      scheduleAutosave();
    }
  }, 80);
}

function downloadHTML() {
  if (!state.activeProject) return;
  const activeNode = getNode(state.activeProject, state.activeFileId);
  const fallbackEntry = getEntryFile(state.activeProject);
  const targetNode = activeNode && !isImageNode(activeNode) ? activeNode : fallbackEntry;
  if (!targetNode) {
    alert("No downloadable text file is selected.");
    return;
  }
  const fileName = targetNode.name || "document.html";
  const source = targetNode.id === state.activeFileId && !isImageNode(targetNode)
    ? editor.getValue()
    : (targetNode.content || state.lastCompiledHtml || "");
  const mimeType = `${inferMimeType(targetNode) || "text/plain"};charset=utf-8`;
  const blob = new Blob([source], { type: mimeType });
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(anchor.href), 2000);
  recordProjectActivity("Downloaded file", `${fileName} was downloaded from the active workspace.`, "export");
  scheduleAutosave();
}

function downloadPDF() {
  if (!state.compiled) {
    alert("Please compile first.");
    return;
  }
  if (state.lastCompiledMode === "app") {
    alert("App mode is an interactive preview, not a PDF export.");
    return;
  }

  const button = elements.downloadPdfButton;
  button.disabled = true;
  button.textContent = "Generating...";
  setCompileStatus("Exporting", "Generating PDF from the compiled preview.", "working");

  try {
    const iframeDoc = elements.previewFrame.contentDocument || elements.previewFrame.contentWindow?.document;
    let styleMarkup = "";
    const styleEls = iframeDoc.querySelectorAll("style,link[rel='stylesheet']");
    styleEls.forEach((styleEl) => {
      styleMarkup += styleEl.outerHTML;
    });

    elements.pdfRender.innerHTML = styleMarkup + (iframeDoc.body ? iframeDoc.body.innerHTML : "");
    const width = elements.pdfRender.scrollWidth;
    const height = elements.pdfRender.scrollHeight;
    elements.pdfRender.style.width = `${width}px`;

    setTimeout(() => {
      window.html2canvas(elements.pdfRender, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width,
        height,
        windowWidth: width,
        windowHeight: height,
        scrollX: 0,
        scrollY: 0,
        logging: false
      }).then((canvas) => {
        elements.pdfRender.innerHTML = "";
        elements.pdfRender.style.width = "";
        const jsPDF = window.jspdf.jsPDF;
        const pxToMm = 25.4 / 96;
        const pdfWidth = width * pxToMm;
        const pdfHeight = height * pxToMm;
        const pdf = new jsPDF({
          orientation: pdfWidth > pdfHeight ? "l" : "p",
          unit: "mm",
          format: [pdfWidth, pdfHeight]
        });
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.97), "JPEG", 0, 0, pdfWidth, pdfHeight);
        const fileName = (state.lastCompiledFileName.replace(/\.html?$/i, "") || "document") + ".pdf";
        pdf.save(fileName);
        button.disabled = false;
        button.textContent = "PDF";
        setCompileStatus("Compiled", `PDF saved: ${fileName}`, "ok");
        recordProjectActivity("Exported PDF", `${fileName} was generated from the compiled preview.`, "export");
        scheduleAutosave();
      }).catch((error) => {
        elements.pdfRender.innerHTML = "";
        elements.pdfRender.style.width = "";
        button.disabled = false;
        button.textContent = "PDF";
        alert(`PDF error: ${error.message}`);
        setCompileStatus("Compile error", error.message, "error");
        recordProjectActivity("PDF export error", error.message, "error");
        scheduleAutosave();
      });
    }, 300);
  } catch (error) {
    elements.pdfRender.innerHTML = "";
    elements.pdfRender.style.width = "";
    button.disabled = false;
    button.textContent = "PDF";
    alert(`PDF error: ${error.message}`);
    setCompileStatus("Compile error", error.message, "error");
    recordProjectActivity("PDF export error", error.message, "error");
    scheduleAutosave();
  }
}

function parseGitHubUrl(url) {
  const cleanUrl = url.trim().replace(/\/+$/, "");
  const match = cleanUrl.match(/^https?:\/\/github\.com\/([^/]+)\/([^/#?]+)(?:\/tree\/([^/]+)\/?(.*))?/i);
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
  }).slice(0, DEMO_LIMIT * 10);

  if (!entries.length) {
    throw new Error("No browser-friendly files were found in that repository.");
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

  project.name = parsed.basePath ? `${repoMeta.name} / ${parsed.basePath.split("/").pop()}` : (repoMeta.name || project.name);
  project.openFileIds = project.selectedFileId ? [project.selectedFileId] : [];
  project.activityLog = [
    createActivityEntry("Imported repository", `${entries.length} browser-friendly files were imported from ${parsed.owner}/${parsed.repo}.`, "import"),
    ...project.activityLog
  ].slice(0, 36);
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
  elements.heroOpenTools.addEventListener("click", () => routeTo("tools"));
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
  qsa("[data-project-preset]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!requireAuth("Sign in to create a new project.")) return;
      const presetKey = button.dataset.projectPreset;
      const meta = PROJECT_PRESET_META[presetKey] || PROJECT_PRESET_META.blank;
      const name = await promptForValue({
        label: "Project",
        title: meta.title,
        copy: "Start from a structured workspace preset and rename it any time.",
        value: meta.defaultName,
        confirmLabel: "Create project"
      });
      if (!name) return;
      await createProjectFromPreset(presetKey, name.trim());
    });
  });
  elements.projectSearchInput.addEventListener("input", (event) => {
    state.projectSearchQuery = event.target.value;
    renderProjectGrid();
  });
  elements.projectSortSelect.addEventListener("change", (event) => {
    state.projectSort = event.target.value;
    renderProjectGrid();
  });
  elements.toolRunButton.addEventListener("click", runToolWorkbench);
  elements.toolLoadExampleButton.addEventListener("click", loadToolExample);
  elements.toolClearButton.addEventListener("click", clearToolWorkbench);
  elements.toolOpenWorkspaceButton.addEventListener("click", openToolInWorkspace);
  elements.toolDownloadHtmlButton.addEventListener("click", downloadToolHtml);
  elements.toolDownloadPdfButton.addEventListener("click", downloadToolPdf);
  elements.toolImportHtmlButton.addEventListener("click", () => elements.toolHtmlFileInput.click());
  elements.toolHtmlFileInput.addEventListener("change", async (event) => {
    await importToolHtmlFile(event.target.files?.[0]);
    event.target.value = "";
  });
  [elements.toolHtmlInput, elements.toolCssInput, elements.toolJsInput].forEach((field) => {
    field.addEventListener("input", () => {
      persistToolDraft();
      renderToolStats();
    });
  });
  [elements.toolModeSelect, elements.toolPageSize, elements.toolPageOrientation].forEach((field) => {
    field.addEventListener("change", () => {
      syncToolModeControls();
      persistToolDraft();
      renderToolStats();
    });
  });
  elements.templateSearchInput.addEventListener("input", (event) => {
    state.templateSearchQuery = event.target.value;
    renderTemplateGallery();
  });
  elements.templateCategorySelect.addEventListener("change", (event) => {
    state.templateCategory = event.target.value;
    renderTemplateGallery();
  });
  elements.templateUseButton.addEventListener("click", useSelectedTemplate);
  elements.diffCompareButton.addEventListener("click", compareDiffInputs);
  elements.diffLoadExampleButton.addEventListener("click", loadDiffExample);
  elements.diffSwapButton.addEventListener("click", swapDiffInputs);
  elements.diffCopySummaryButton.addEventListener("click", async () => {
    if (!state.diffSummaryText) {
      compareDiffInputs();
    }
    if (!state.diffSummaryText) return;
    await copyTextValue(state.diffSummaryText, "Diff summary copied to the clipboard.");
    const original = elements.diffCopySummaryButton.textContent;
    elements.diffCopySummaryButton.textContent = "Copied";
    setTimeout(() => {
      elements.diffCopySummaryButton.textContent = original;
    }, 1200);
  });
  elements.diffLeftUploadButton.addEventListener("click", () => elements.diffLeftFileInput.click());
  elements.diffRightUploadButton.addEventListener("click", () => elements.diffRightFileInput.click());
  elements.diffLeftClearButton.addEventListener("click", () => clearDiffPane("left"));
  elements.diffRightClearButton.addEventListener("click", () => clearDiffPane("right"));
  elements.diffLeftFileInput.addEventListener("change", async (event) => {
    await importDiffFile("left", event.target.files?.[0]);
    event.target.value = "";
  });
  elements.diffRightFileInput.addEventListener("change", async (event) => {
    await importDiffFile("right", event.target.files?.[0]);
    event.target.value = "";
  });
  [elements.diffLeftInput, elements.diffRightInput].forEach((field) => {
    field.addEventListener("input", compareDiffInputs);
  });

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
  elements.renameProjectAction.addEventListener("click", renameActiveProject);
  qsa("[data-sidebar-panel]").forEach((button) => {
    button.addEventListener("click", () => setSidebarPanel(button.dataset.sidebarPanel));
  });
  elements.fileTreeSearch.addEventListener("input", (event) => {
    state.treeFilter = event.target.value.trim();
    renderTree();
  });
  elements.workspaceSearchInput.addEventListener("input", (event) => {
    state.workspaceSearchQuery = event.target.value;
    renderWorkspaceSearch();
  });
  elements.commentCurrentLineButton.addEventListener("click", addCurrentLineComment);
  elements.commentInput.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      addCurrentLineComment();
    }
  });
  elements.commandPaletteButton.addEventListener("click", () => openCommandPalette());
  elements.commandPaletteInput.addEventListener("input", (event) => renderCommandPalette(event.target.value));
  elements.previewRefreshButton.addEventListener("click", refreshPreview);
  elements.previewFitButton.addEventListener("click", () => setPreviewZoom(1));
  elements.previewZoomOutButton.addEventListener("click", () => setPreviewZoom(state.previewZoom - 0.1));
  elements.previewZoomInButton.addEventListener("click", () => setPreviewZoom(state.previewZoom + 0.1));
  elements.workspaceResizer.addEventListener("mousedown", beginWorkspaceResize);
  document.getElementById("new-file-action").addEventListener("click", () => createNode("file"));
  document.getElementById("new-folder-action").addEventListener("click", () => createNode("folder"));
  document.getElementById("rename-node-action").addEventListener("click", renameSelectedNode);
  document.getElementById("duplicate-node-action").addEventListener("click", duplicateSelectedNode);
  document.getElementById("delete-node-action").addEventListener("click", deleteSelectedNode);
  document.getElementById("set-entry-action").addEventListener("click", setSelectedAsEntry);
  document.getElementById("upload-image-action").addEventListener("click", () => elements.imageUploadInput.click());
  elements.applySettingsButton.addEventListener("click", applyProjectSettings);
  elements.imageUploadInput.addEventListener("change", async (event) => {
    await handleImageUpload(event.target.files);
    event.target.value = "";
  });

  elements.compileMode.addEventListener("change", () => {
    syncPagedControls();
    renderEditorBadges();
    markProjectDirty();
  });
  elements.editorWrapToggle.addEventListener("click", toggleEditorWrap);
  elements.editorFormatButton.addEventListener("click", formatCurrentFile);
  elements.compileButton.addEventListener("click", () => compileProject());
  elements.downloadHtmlButton.addEventListener("click", downloadHTML);
  elements.downloadPdfButton.addEventListener("click", downloadPDF);
  elements.saveProjectButton.addEventListener("click", () => saveCurrentProject({ logActivity: true, statusMessage: true, snapshotReason: "Manual save" }));
  elements.pageSize.addEventListener("change", () => {
    renderEditorBadges();
    markProjectDirty();
  });
  elements.pageOrientation.addEventListener("change", () => {
    renderEditorBadges();
    markProjectDirty();
  });

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

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openCommandPalette();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 980) {
      elements.workspaceView.style.removeProperty("--editor-pane-width");
    } else {
      applyWorkspaceEditorWidth();
    }
  });
}

function initEditor() {
  editor = window.CodeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: true,
    lineWrapping: state.editorWrapEnabled,
    mode: "htmlmixed",
    indentUnit: 2,
    tabSize: 2,
    extraKeys: {
      "Ctrl-S": () => saveCurrentProject({ logActivity: true, statusMessage: true, snapshotReason: "Manual save" }),
      "Cmd-S": () => saveCurrentProject({ logActivity: true, statusMessage: true, snapshotReason: "Manual save" }),
      "Ctrl-Enter": () => compileProject(),
      "Cmd-Enter": () => compileProject(),
      "Ctrl-Shift-F": () => formatCurrentFile(),
      "Cmd-Shift-F": () => formatCurrentFile(),
      "Ctrl-K": () => openCommandPalette(),
      "Cmd-K": () => openCommandPalette()
    }
  });
  editor.on("change", syncEditorToProject);
  updateWrapButton();
}

async function boot() {
  initEditor();
  attachEventHandlers();
  setAuthMode("signin");
  routeTo("projects");
  syncPagedControls();
  updatePreviewZoom();
  populateToolWorkbench(loadToolDraft());
  if (elements.toolHtmlInput.value.trim()) {
    runToolWorkbench();
  }
  renderTemplateCategoryOptions();
  renderTemplateGallery();
  if (!elements.diffLeftInput.value && !elements.diffRightInput.value) {
    loadDiffExample();
  }
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
