import { Link } from 'react-router-dom';
import BrandLogo from './brand/BrandLogo';
import { ArrowLeft, BookOpen, FolderOpen, Code2, Play, Download, Columns, Keyboard } from 'lucide-react';

const SECTIONS = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'quick-start', label: 'Quick start' },
  { id: 'projects', label: 'Projects' },
  { id: 'editor', label: 'Editor & files' },
  { id: 'compile', label: 'Compile & preview' },
  { id: 'export', label: 'Export' },
  { id: 'layouts', label: 'Layout modes' },
  { id: 'shortcuts', label: 'Keyboard shortcuts' },
];

const SHORTCUTS = [
  { keys: '⌘ Enter', action: 'Compile the active project' },
  { keys: '⌘ S', action: 'Save (handled automatically via local storage)' },
  { keys: '⌘ B', action: 'Toggle the sidebar' },
  { keys: '⌘ \\', action: 'Cycle layout: split → editor → preview' },
  { keys: '⌘ ⇧ E', action: 'Download compiled HTML' },
];

export default function HelpPage() {
  return (
    <div className="help-page">
      <header className="help-header">
        <div className="help-header-left">
          <Link to="/" className="help-back" title="Back to dashboard">
            <ArrowLeft size={18} />
            <span>Dashboard</span>
          </Link>
        </div>
        <BrandLogo size="md" />
        <div className="help-header-right">
          <BookOpen size={18} />
          <span>Help</span>
        </div>
      </header>

      <div className="help-layout">
        <nav className="help-nav" aria-label="Help sections">
          <p className="help-nav-title">On this page</p>
          <ul>
            {SECTIONS.map(s => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="help-content">
          <section id="welcome" className="help-section">
            <h1>Welcome to Clover Leaf</h1>
            <p className="help-lead">
              Clover Leaf is an HTML document studio. Write multi-file projects with a live editor,
              compile to preview, and export your work as HTML or PDF — all in the browser.
            </p>
            <div className="help-callout">
              <p>Projects are stored locally in your browser. No account required.</p>
            </div>
          </section>

          <section id="quick-start" className="help-section">
            <h2>Quick start</h2>
            <ol className="help-steps">
              <li>From the dashboard, click <strong>New Project</strong> and give it a name.</li>
              <li>Edit <code>index.html</code>, <code>styles.css</code>, and <code>script.js</code> in the file tree.</li>
              <li>Press <kbd>⌘ Enter</kbd> or click <strong>Compile</strong> in the toolbar.</li>
              <li>Review the rendered output in the preview pane.</li>
              <li>Export as PDF from the preview header when you are ready.</li>
            </ol>
          </section>

          <section id="projects" className="help-section">
            <h2><FolderOpen size={20} /> Projects</h2>
            <p>
              The dashboard shows all your projects as cards. Search by name, sort by last modified
              or alphabetically, and open any project with a click.
            </p>
            <ul className="help-list">
              <li><strong>New Project</strong> — creates a starter template with HTML, CSS, and JS files.</li>
              <li><strong>Duplicate</strong> — copies a project including its full file tree.</li>
              <li><strong>Delete</strong> — permanently removes a project from local storage.</li>
              <li><strong>Rename</strong> — click the project name in the editor toolbar to rename.</li>
            </ul>
          </section>

          <section id="editor" className="help-section">
            <h2><Code2 size={20} /> Editor &amp; files</h2>
            <p>
              The sidebar file tree lets you organize files and folders. Double-click a file or folder
              name to rename it. Use the <strong>+</strong> buttons to add new files or folders.
            </p>
            <ul className="help-list">
              <li>Open files appear as tabs above the editor.</li>
              <li>Syntax highlighting adapts to the file extension (HTML, CSS, JS, JSON, Markdown, and more).</li>
              <li>The <strong>Search</strong> panel finds text across all project files.</li>
              <li>Changes save automatically to local storage as you type.</li>
            </ul>
          </section>

          <section id="compile" className="help-section">
            <h2><Play size={20} /> Compile &amp; preview</h2>
            <p>
              Compiling resolves your entry file (<code>index.html</code> by default) and inlines
              linked local CSS and JavaScript so the preview renders as a single document.
            </p>
            <ul className="help-list">
              <li><strong>Freestyle</strong> — standard flowing HTML layout.</li>
              <li><strong>Paged</strong> — page-oriented output (for print-style documents).</li>
              <li><strong>App</strong> — full-viewport app layout.</li>
            </ul>
            <p>
              Use the zoom controls below the preview header to scale the rendered page.
              External URLs in <code>link</code> and <code>script</code> tags are left unchanged.
            </p>
          </section>

          <section id="export" className="help-section">
            <h2><Download size={20} /> Export</h2>
            <ul className="help-list">
              <li><strong>PDF</strong> — click PDF in the preview header after compiling. Page size and orientation can be set in the sidebar Settings panel.</li>
              <li><strong>HTML</strong> — use File → Download HTML in the toolbar to save the compiled output.</li>
            </ul>
          </section>

          <section id="layouts" className="help-section">
            <h2><Columns size={20} /> Layout modes</h2>
            <p>
              Click the layout icon in the toolbar (or View → Cycle Layout) to switch between:
            </p>
            <ul className="help-list">
              <li><strong>Split view</strong> — editor and preview side by side. Drag the center divider to resize.</li>
              <li><strong>Editor only</strong> — focus on writing code.</li>
              <li><strong>Preview only</strong> — focus on the rendered output.</li>
            </ul>
            <p>Your preferred split ratio is remembered between sessions.</p>
          </section>

          <section id="shortcuts" className="help-section">
            <h2><Keyboard size={20} /> Keyboard shortcuts</h2>
            <table className="help-shortcuts-table">
              <thead>
                <tr>
                  <th>Shortcut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {SHORTCUTS.map(row => (
                  <tr key={row.keys}>
                    <td><kbd>{row.keys}</kbd></td>
                    <td>{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <footer className="help-footer">
            <p>Clover Leaf — write HTML with clarity.</p>
            <Link to="/">← Back to dashboard</Link>
          </footer>
        </article>
      </div>
    </div>
  );
}
