window.HTMLLEAF_PRODUCT_DATA = {
  toolExample: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Launch Brief</title>
</head>
<body>
  <main class="launch-shell">
    <section class="hero">
      <p class="eyebrow">HTMLLeaf Tool Demo</p>
      <h1>Build once. Export as PDF or run like a mini site.</h1>
      <p class="hero-copy">This sample uses the public tools tab. Switch between Freestyle, Paged, and App mode to test the same source in different outputs.</p>
      <div class="hero-actions">
        <button data-action>Show live message</button>
        <span data-output>Waiting for interaction.</span>
      </div>
    </section>
    <section class="grid">
      <article>
        <h2>PDF-ready layout</h2>
        <p>Create reports, guides, invoices, or printable one-pagers from the same HTML source.</p>
      </article>
      <article>
        <h2>Interactive preview</h2>
        <p>Switch to App mode to scroll, click, and test lightweight website behavior immediately.</p>
      </article>
      <article>
        <h2>Workspace bridge</h2>
        <p>Send your draft into the full HTMLLeaf workspace whenever it grows beyond a single document.</p>
      </article>
    </section>
  </main>
</body>
</html>`,
    css: `:root {
  --bg: #eff4f6;
  --surface: #ffffff;
  --border: #d8e0e6;
  --text: #17212b;
  --muted: #5d6b79;
  --accent: #0f6c5b;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: linear-gradient(180deg, #f5f8fa 0%, #edf2f5 100%);
  color: var(--text);
  font-family: "IBM Plex Sans", system-ui, sans-serif;
}

.launch-shell {
  width: min(960px, calc(100% - 40px));
  margin: 32px auto;
}

.hero,
.grid article {
  border: 1px solid var(--border);
  border-radius: 24px;
  background: var(--surface);
  box-shadow: 0 12px 30px rgba(23, 33, 43, 0.06);
}

.hero {
  padding: 34px;
}

.hero h1 {
  margin: 12px 0;
  font-size: clamp(2.1rem, 4vw, 3.5rem);
  line-height: 1;
}

.hero-copy {
  color: var(--muted);
  max-width: 62ch;
  line-height: 1.65;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 600;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.hero-actions button {
  border: 0;
  background: var(--accent);
  color: #ffffff;
  border-radius: 999px;
  padding: 12px 18px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  margin-top: 22px;
}

.grid article {
  padding: 24px;
}

.grid p,
[data-output] {
  color: var(--muted);
  line-height: 1.6;
}
`,
    js: `const button = document.querySelector("[data-action]");
const output = document.querySelector("[data-output]");

if (button && output) {
  button.addEventListener("click", () => {
    output.textContent = "Live app mode confirmed. Your HTML is interactive.";
  });
}`
  },
  diffExample: {
    left: `<!DOCTYPE html>
<section class="announcement">
  <h1>Quarterly Update</h1>
  <p>HTMLLeaf is now focused on writing-first authoring and practical PDF export.</p>
  <ul>
    <li>Workspace comments</li>
    <li>GitHub import</li>
    <li>Live preview modes</li>
  </ul>
</section>`,
    right: `<!DOCTYPE html>
<section class="announcement refined">
  <h1>Quarterly Product Update</h1>
  <p>HTMLLeaf now focuses on writing-first authoring, professional layout tools, and clearer export flows.</p>
  <ul>
    <li>Workspace comments and snapshots</li>
    <li>GitHub import with project assets</li>
    <li>Live preview, PDF tools, and template presets</li>
  </ul>
  <footer>Prepared for product review.</footer>
</section>`
  },
  templateLibrary: [
    {
      id: "product-launch",
      title: "Product Launch",
      category: "Marketing",
      summary: "A sharp product landing page with a hero, proof points, and conversion-ready sections.",
      tags: ["Landing", "App", "Marketing"],
      mode: "app",
      pageSize: "A4",
      pageOrientation: "portrait",
      notes: [
        "Great starting point for launch pages, waitlists, or feature announcements.",
        "Uses gentle interaction so it works in App mode without heavy frameworks."
      ],
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Northstar Launch</title>
</head>
<body>
  <main class="launch-page">
    <section class="launch-hero">
      <p class="eyebrow">New release</p>
      <h1>Ship a cleaner publishing workflow for your entire team.</h1>
      <p class="hero-copy">Northstar helps teams turn structured notes into polished public pages and printable documents without losing version control.</p>
      <div class="hero-actions">
        <button data-plan>See plan</button>
        <a href="#features">Explore features</a>
      </div>
    </section>
    <section class="signal-row">
      <article><strong>4x faster</strong><span>handoff from draft to shareable output</span></article>
      <article><strong>12 teams</strong><span>already using the rollout workflow</span></article>
      <article><strong>Single source</strong><span>for PDF, docs, and live preview</span></article>
    </section>
    <section class="feature-grid" id="features">
      <article>
        <h2>Authoring surface</h2>
        <p>Write in structured sections, keep assets close, and preview everything without changing tools.</p>
      </article>
      <article>
        <h2>Review cycle</h2>
        <p>Comments, history snapshots, and fast compare flows keep revisions clear.</p>
      </article>
      <article>
        <h2>Output ready</h2>
        <p>Convert the same source into polished PDF exports or interactive browser views.</p>
      </article>
    </section>
    <section class="pricing-note">
      <div>
        <p class="eyebrow">For teams</p>
        <h2>Move from scattered docs to one publishing system.</h2>
      </div>
      <p data-output>Choose the sections that matter most and adapt the copy to your product voice.</p>
    </section>
  </main>
</body>
</html>`,
      css: `:root {
  --bg: #edf2f4;
  --surface: #ffffff;
  --surface-soft: #f5f8f9;
  --border: #d6dee5;
  --text: #16222c;
  --muted: #5c6b77;
  --accent: #0f6c5b;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  background:
    radial-gradient(circle at top left, rgba(15, 108, 91, 0.07), transparent 30%),
    linear-gradient(180deg, #f8fbfc 0%, var(--bg) 100%);
  color: var(--text);
}

.launch-page {
  width: min(1100px, calc(100% - 48px));
  margin: 28px auto 56px;
}

.launch-hero,
.signal-row article,
.feature-grid article,
.pricing-note {
  border: 1px solid var(--border);
  border-radius: 26px;
  background: var(--surface);
  box-shadow: 0 12px 30px rgba(22, 34, 44, 0.05);
}

.launch-hero {
  padding: 42px;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 700;
}

.launch-hero h1 {
  font-size: clamp(2.6rem, 5vw, 4.5rem);
  line-height: 0.96;
  margin: 14px 0 18px;
  max-width: 12ch;
}

.hero-copy,
.feature-grid p,
.pricing-note p,
.signal-row span {
  color: var(--muted);
  line-height: 1.65;
}

.hero-copy {
  max-width: 62ch;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 22px;
}

.hero-actions button,
.hero-actions a {
  text-decoration: none;
  border-radius: 999px;
  padding: 13px 18px;
  border: 1px solid var(--border);
  color: var(--text);
  background: var(--surface-soft);
}

.hero-actions button {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
}

.signal-row,
.feature-grid {
  display: grid;
  gap: 18px;
  margin-top: 22px;
}

.signal-row {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.signal-row article,
.feature-grid article,
.pricing-note {
  padding: 24px;
}

.signal-row strong {
  display: block;
  font-size: 1.5rem;
}

.feature-grid {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.pricing-note {
  margin-top: 22px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-end;
}

@media (max-width: 760px) {
  .signal-row {
    grid-template-columns: 1fr;
  }

  .pricing-note {
    flex-direction: column;
    align-items: stretch;
  }
}`,
      js: `const planButton = document.querySelector("[data-plan]");
const output = document.querySelector("[data-output]");

if (planButton && output) {
  planButton.addEventListener("click", () => {
    output.textContent = "Plan updated: capture intent, review together, publish once.";
  });
}`
    },
    {
      id: "docs-handbook",
      title: "Docs Handbook",
      category: "Documentation",
      summary: "A documentation shell with sticky navigation, section anchors, and clean reading density.",
      tags: ["Docs", "Guide", "App"],
      mode: "app",
      pageSize: "A4",
      pageOrientation: "portrait",
      notes: [
        "Use this for API notes, onboarding handbooks, or product manuals.",
        "The layout is intentionally reading-friendly and works well on desktop and mobile."
      ],
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ops Handbook</title>
</head>
<body>
  <div class="docs-shell">
    <aside class="docs-nav">
      <p class="eyebrow">Handbook</p>
      <a href="#overview">Overview</a>
      <a href="#setup">Setup</a>
      <a href="#review">Review</a>
      <a href="#release">Release</a>
    </aside>
    <main class="docs-content">
      <section id="overview">
        <p class="eyebrow">Overview</p>
        <h1>Release workflow for fast-moving product teams</h1>
        <p>The handbook keeps setup, review, and release notes in one place so every stakeholder can work from the same document.</p>
      </section>
      <section id="setup">
        <h2>1. Setup the workspace</h2>
        <p>Define the source files, image assets, and preview mode you need before writing detailed content.</p>
        <pre><code>root/
  index.html
  styles.css
  assets/
  notes.md</code></pre>
      </section>
      <section id="review">
        <h2>2. Review content</h2>
        <p>Use comments and compare views to keep feedback attached to the right file or section.</p>
      </section>
      <section id="release">
        <h2>3. Release output</h2>
        <p>Render a clean PDF for distribution, or open the same source as an interactive preview for internal review.</p>
      </section>
    </main>
  </div>
</body>
</html>`,
      css: `:root {
  --bg: #f4f7f9;
  --surface: #ffffff;
  --border: #d7dee5;
  --text: #17212b;
  --muted: #5f6b79;
  --accent: #0f6c5b;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: "IBM Plex Sans", system-ui, sans-serif;
}

.docs-shell {
  width: min(1180px, calc(100% - 48px));
  margin: 24px auto;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 18px;
}

.docs-nav,
.docs-content section {
  border: 1px solid var(--border);
  border-radius: 24px;
  background: var(--surface);
  box-shadow: 0 10px 24px rgba(23, 33, 43, 0.05);
}

.docs-nav {
  padding: 22px;
  position: sticky;
  top: 24px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.docs-nav a {
  color: var(--muted);
  text-decoration: none;
  padding: 9px 10px;
  border-radius: 10px;
}

.docs-nav a:hover {
  background: #f0f5f5;
  color: var(--text);
}

.docs-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.docs-content section {
  padding: 28px;
}

.docs-content h1 {
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1;
  margin: 10px 0 16px;
}

.docs-content p,
.docs-content li,
.docs-content code {
  color: var(--muted);
  line-height: 1.7;
}

pre {
  overflow: auto;
  background: #f6f8fa;
  border-radius: 16px;
  border: 1px solid #e1e8ee;
  padding: 16px;
}

.eyebrow {
  margin: 0;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  font-size: 0.78rem;
}

@media (max-width: 860px) {
  .docs-shell {
    grid-template-columns: 1fr;
  }

  .docs-nav {
    position: static;
  }
}`,
      js: `document.querySelectorAll(".docs-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".docs-nav a").forEach((entry) => entry.classList.remove("active"));
    link.classList.add("active");
  });
});`
    },
    {
      id: "invoice-studio",
      title: "Invoice Studio",
      category: "Business",
      summary: "A printable invoice starter with service rows, totals, and signature areas.",
      tags: ["Invoice", "PDF", "Paged"],
      mode: "paged",
      pageSize: "Letter",
      pageOrientation: "portrait",
      notes: [
        "Works especially well in paged mode for invoices, receipts, or statement exports.",
        "Replace the sample totals and client information with your real billing data."
      ],
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>
</head>
<body>
  <main class="invoice-sheet">
    <header class="invoice-header">
      <div>
        <p class="eyebrow">Invoice</p>
        <h1>Northline Studio</h1>
        <p>45 Market Street, Pune</p>
      </div>
      <div class="invoice-meta">
        <p><strong>Invoice #</strong> NL-2026-014</p>
        <p><strong>Date</strong> April 27, 2026</p>
        <p><strong>Due</strong> May 10, 2026</p>
      </div>
    </header>
    <section class="invoice-block split">
      <div>
        <h2>Bill To</h2>
        <p>Acme Product Team<br>11 River Park<br>Mumbai, India</p>
      </div>
      <div>
        <h2>From</h2>
        <p>Northline Studio<br>rudra@northline.example<br>+91 90000 00000</p>
      </div>
    </section>
    <table class="invoice-table">
      <thead>
        <tr><th>Service</th><th>Hours</th><th>Rate</th><th>Total</th></tr>
      </thead>
      <tbody>
        <tr><td>HTMLLeaf design direction</td><td>18</td><td>$60</td><td>$1080</td></tr>
        <tr><td>Workspace restructuring</td><td>14</td><td>$60</td><td>$840</td></tr>
        <tr><td>Template system</td><td>10</td><td>$60</td><td>$600</td></tr>
      </tbody>
    </table>
    <section class="invoice-totals">
      <p><span>Subtotal</span><strong>$2520</strong></p>
      <p><span>Tax</span><strong>$0</strong></p>
      <p class="grand"><span>Total Due</span><strong>$2520</strong></p>
    </section>
    <footer class="invoice-footer">
      <p>Thank you for the opportunity to support this release.</p>
      <p>Payment terms: bank transfer within 14 days.</p>
    </footer>
  </main>
</body>
</html>`,
      css: `body {
  margin: 0;
  background: #f0f3f6;
  color: #16212b;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
}

.invoice-sheet {
  width: min(820px, calc(100% - 48px));
  margin: 28px auto;
  background: #ffffff;
  border: 1px solid #d6dee5;
  border-radius: 28px;
  box-shadow: 0 12px 26px rgba(22, 33, 43, 0.06);
  padding: 34px;
}

.invoice-header,
.split,
.invoice-totals p {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.invoice-header {
  align-items: flex-start;
  padding-bottom: 22px;
  border-bottom: 1px solid #e1e7ec;
}

.eyebrow {
  margin: 0;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #0f6c5b;
  font-weight: 700;
}

.invoice-header h1 {
  margin: 10px 0 8px;
  font-size: 2.1rem;
}

.invoice-meta p,
.invoice-block p,
.invoice-footer p {
  margin: 6px 0;
  color: #5f6b79;
  line-height: 1.6;
}

.invoice-block {
  padding: 22px 0;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
}

.invoice-table th,
.invoice-table td {
  padding: 14px 12px;
  border-bottom: 1px solid #e5ebef;
  text-align: left;
}

.invoice-table th {
  color: #5f6b79;
  font-size: 0.84rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.invoice-totals {
  width: min(320px, 100%);
  margin-left: auto;
  margin-top: 24px;
}

.invoice-totals p {
  margin: 0;
  padding: 10px 0;
}

.invoice-totals .grand {
  border-top: 1px solid #d6dee5;
  margin-top: 6px;
  padding-top: 14px;
  font-size: 1.08rem;
}

.invoice-footer {
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid #e1e7ec;
}

@media (max-width: 720px) {
  .invoice-header,
  .split {
    flex-direction: column;
  }
}`,
      js: `console.log("Invoice template ready for paged export.");`
    },
    {
      id: "research-report",
      title: "Research Report",
      category: "Reports",
      summary: "A report layout with an executive summary, findings, and recommendation blocks.",
      tags: ["Report", "PDF", "A4"],
      mode: "paged",
      pageSize: "A4",
      pageOrientation: "portrait",
      notes: [
        "Good for internal product updates, audits, and strategic reports.",
        "Headings are tuned for an outline-friendly structure."
      ],
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Research Report</title>
</head>
<body>
  <main class="report-shell">
    <header class="report-header">
      <p class="eyebrow">Research Report</p>
      <h1>HTMLLeaf user workflow audit</h1>
      <p>Prepared for the product team to guide structure, tooling, and navigation priorities.</p>
    </header>
    <section class="report-card">
      <h2>Executive Summary</h2>
      <p>Users want a calmer professional shell, stronger tools outside the main workspace, and clearer pathways for exporting, comparing, and starting from templates.</p>
    </section>
    <section class="report-grid">
      <article class="report-card">
        <h2>Finding 1</h2>
        <p>The landing experience feels too close to a single workspace launcher rather than a broader suite.</p>
      </article>
      <article class="report-card">
        <h2>Finding 2</h2>
        <p>Projects need better affordances for duplication, sorting, and understanding what each workspace contains.</p>
      </article>
      <article class="report-card">
        <h2>Finding 3</h2>
        <p>Users benefit from public tools that solve narrow problems before they commit to a full project structure.</p>
      </article>
    </section>
    <section class="report-card">
      <h2>Recommendations</h2>
      <ol>
        <li>Add a public tools suite for fast conversion and preview tasks.</li>
        <li>Ship a template library with strong starting points for common deliverables.</li>
        <li>Support compare and review flows outside the editor for faster validation.</li>
      </ol>
    </section>
  </main>
</body>
</html>`,
      css: `body {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  background: #edf0f3;
  color: #1b2430;
}

.report-shell {
  width: min(860px, calc(100% - 48px));
  margin: 30px auto;
}

.report-header,
.report-card {
  background: #ffffff;
  border: 1px solid #d9dfe6;
  border-radius: 24px;
  box-shadow: 0 10px 24px rgba(27, 36, 48, 0.05);
}

.report-header {
  padding: 36px;
}

.eyebrow {
  margin: 0;
  color: #0f6c5b;
  font-size: 0.78rem;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.report-header h1 {
  margin: 10px 0 14px;
  font-size: 2.8rem;
  line-height: 0.98;
}

.report-header p,
.report-card p,
.report-card li {
  color: #596672;
  line-height: 1.7;
}

.report-card {
  padding: 26px;
  margin-top: 18px;
}

.report-card h2 {
  margin-top: 0;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
}

.report-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

ol {
  padding-left: 20px;
}`,
      js: `console.log("Report template loaded");`
    },
    {
      id: "studio-portfolio",
      title: "Studio Portfolio",
      category: "Portfolio",
      summary: "A visual portfolio starter with selected projects, profile copy, and a contact block.",
      tags: ["Portfolio", "App", "Creative"],
      mode: "app",
      pageSize: "A4",
      pageOrientation: "portrait",
      notes: [
        "Useful for creative studios, freelancers, or case-study driven product pages.",
        "Swap the project cards with real screenshots and case notes."
      ],
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Studio Portfolio</title>
</head>
<body>
  <main class="portfolio-shell">
    <section class="portfolio-hero">
      <p class="eyebrow">Independent studio</p>
      <h1>Design systems, launch surfaces, and document experiences.</h1>
      <p>We help teams reshape product surfaces that feel calm, useful, and easy to trust.</p>
    </section>
    <section class="portfolio-grid">
      <article>
        <span>01</span>
        <h2>Release notes dashboard</h2>
        <p>Structured updates for product and operations teams.</p>
      </article>
      <article>
        <span>02</span>
        <h2>Editorial microsite</h2>
        <p>Long-form reading surfaces with clean hierarchy and asset handling.</p>
      </article>
      <article>
        <span>03</span>
        <h2>Interactive case review</h2>
        <p>A browser-based workspace for reviewing change proposals and summaries.</p>
      </article>
    </section>
    <section class="portfolio-footer">
      <div>
        <h2>Open to selective work</h2>
        <p>Current focus: product shells, tools, and technical publishing interfaces.</p>
      </div>
      <a href="mailto:hello@example.com">hello@example.com</a>
    </section>
  </main>
</body>
</html>`,
      css: `body {
  margin: 0;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  background: linear-gradient(180deg, #f6f7f8 0%, #ebeef1 100%);
  color: #17212b;
}

.portfolio-shell {
  width: min(1120px, calc(100% - 48px));
  margin: 24px auto 44px;
}

.portfolio-hero,
.portfolio-grid article,
.portfolio-footer {
  background: #ffffff;
  border: 1px solid #d9dfe5;
  border-radius: 28px;
  box-shadow: 0 10px 24px rgba(23, 33, 43, 0.05);
}

.portfolio-hero {
  padding: 42px;
}

.eyebrow {
  margin: 0;
  color: #0f6c5b;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.portfolio-hero h1 {
  max-width: 10ch;
  margin: 16px 0;
  font-size: clamp(2.4rem, 4vw, 4.4rem);
  line-height: 0.96;
}

.portfolio-hero p,
.portfolio-grid p,
.portfolio-footer p {
  color: #5f6b79;
  line-height: 1.7;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 20px;
}

.portfolio-grid article {
  padding: 24px;
}

.portfolio-grid span {
  font-size: 0.84rem;
  color: #0f6c5b;
}

.portfolio-footer {
  margin-top: 20px;
  padding: 28px;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-end;
}

.portfolio-footer a {
  color: #17212b;
  text-decoration: none;
  border: 1px solid #d9dfe5;
  border-radius: 999px;
  padding: 12px 16px;
}

@media (max-width: 820px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}`,
      js: `console.log("Portfolio template active");`
    },
    {
      id: "resume-sheet",
      title: "Resume Sheet",
      category: "Career",
      summary: "A single-page resume starter with strong typographic hierarchy and printable spacing.",
      tags: ["Resume", "Paged", "Career"],
      mode: "paged",
      pageSize: "A4",
      pageOrientation: "portrait",
      notes: [
        "Designed to stay readable when printed or exported to PDF.",
        "Keep achievements specific and swap placeholders with measurable outcomes."
      ],
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume</title>
</head>
<body>
  <main class="resume-shell">
    <header class="resume-header">
      <div>
        <h1>Rudra Jadhav</h1>
        <p>Product-focused builder for structured web tools and publishing workflows.</p>
      </div>
      <div>
        <p>rj@example.com</p>
        <p>Pune, India</p>
        <p>htmlleaf.dev</p>
      </div>
    </header>
    <section>
      <h2>Experience</h2>
      <article>
        <h3>Founder, HTMLLeaf</h3>
        <p class="meta">2025 - Present</p>
        <p>Shaped the product direction for a browser-based HTML authoring workspace with export, preview, and review tools.</p>
      </article>
      <article>
        <h3>Product Builder</h3>
        <p class="meta">Independent</p>
        <p>Designed editor surfaces, dashboards, and document tooling for structured digital experiences.</p>
      </article>
    </section>
    <section class="split">
      <div>
        <h2>Skills</h2>
        <p>HTML, CSS, JavaScript, UI systems, product writing, workflow design</p>
      </div>
      <div>
        <h2>Highlights</h2>
        <p>Multi-file workspace design, PDF export workflows, template systems, review utilities</p>
      </div>
    </section>
  </main>
</body>
</html>`,
      css: `body {
  margin: 0;
  background: #eef1f4;
  color: #17212b;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
}

.resume-shell {
  width: min(820px, calc(100% - 48px));
  margin: 26px auto;
  background: #ffffff;
  border: 1px solid #d8dee5;
  border-radius: 26px;
  box-shadow: 0 12px 24px rgba(23, 33, 43, 0.05);
  padding: 34px;
}

.resume-header,
.split {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.resume-header {
  padding-bottom: 18px;
  border-bottom: 1px solid #e4e9ee;
}

.resume-header h1 {
  margin: 0 0 8px;
  font-size: 2.5rem;
}

section {
  margin-top: 24px;
}

h2 {
  margin: 0 0 12px;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #0f6c5b;
}

h3 {
  margin: 0;
}

p,
.meta {
  color: #5d6a77;
  line-height: 1.6;
}

.meta {
  margin: 6px 0;
}

@media (max-width: 720px) {
  .resume-header,
  .split {
    flex-direction: column;
  }
}`,
      js: `console.log("Resume template loaded");`
    },
    {
      id: "event-program",
      title: "Event Program",
      category: "Events",
      summary: "A clear event program layout with agenda cards, keynote highlights, and registration notes.",
      tags: ["Program", "Event", "PDF"],
      mode: "paged",
      pageSize: "Letter",
      pageOrientation: "portrait",
      notes: [
        "Works well for meetups, internal summits, and workshop handouts.",
        "Use paged mode to preserve spacing across print exports."
      ],
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Program</title>
</head>
<body>
  <main class="program-shell">
    <header class="program-hero">
      <p class="eyebrow">Community Summit</p>
      <h1>Product Systems Day 2026</h1>
      <p>Schedule, speakers, and workshop rooms for the full-day event.</p>
    </header>
    <section class="agenda-grid">
      <article>
        <span>09:00</span>
        <h2>Registration + breakfast</h2>
        <p>Lobby and partner showcase</p>
      </article>
      <article>
        <span>10:00</span>
        <h2>Opening keynote</h2>
        <p>Why product systems need calmer interfaces</p>
      </article>
      <article>
        <span>13:00</span>
        <h2>Workshop tracks</h2>
        <p>Tools, documents, and collaborative reviews</p>
      </article>
    </section>
    <section class="program-notes">
      <h2>Room Notes</h2>
      <ul>
        <li>Main hall for keynote sessions</li>
        <li>Studio 2 for hands-on workshops</li>
        <li>Quiet review room for office hours</li>
      </ul>
    </section>
  </main>
</body>
</html>`,
      css: `body {
  margin: 0;
  background: #eff3f5;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  color: #17212b;
}

.program-shell {
  width: min(840px, calc(100% - 48px));
  margin: 26px auto;
}

.program-hero,
.agenda-grid article,
.program-notes {
  border: 1px solid #d7dee5;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(23, 33, 43, 0.05);
}

.program-hero,
.program-notes,
.agenda-grid article {
  padding: 28px;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #0f6c5b;
  font-size: 0.78rem;
  font-weight: 700;
}

.program-hero h1 {
  margin: 10px 0 12px;
  font-size: 2.7rem;
  line-height: 1;
}

.program-hero p,
.agenda-grid p,
.program-notes li {
  color: #5f6b79;
  line-height: 1.65;
}

.agenda-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  margin-top: 18px;
}

.agenda-grid span {
  color: #0f6c5b;
  font-size: 0.82rem;
}

.program-notes {
  margin-top: 18px;
}`,
      js: `console.log("Event program ready");`
    },
    {
      id: "newsletter-brief",
      title: "Newsletter Brief",
      category: "Marketing",
      summary: "A publication-style newsletter layout for product updates, changelogs, and editorial roundups.",
      tags: ["Newsletter", "Freestyle", "Editorial"],
      mode: "freestyle",
      pageSize: "A4",
      pageOrientation: "portrait",
      notes: [
        "Use this when you want a polished internal update without a full app-like shell.",
        "The layout works well in both PDF exports and lightweight browser sharing."
      ],
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter</title>
</head>
<body>
  <main class="newsletter-shell">
    <header>
      <p class="eyebrow">Weekly Brief</p>
      <h1>HTMLLeaf release notes and product highlights</h1>
      <p>Structured updates for the people shipping, reviewing, and supporting the product.</p>
    </header>
    <section class="newsletter-grid">
      <article>
        <h2>What shipped</h2>
        <p>Projects, templates, tools, and compare views now live in one calmer product shell.</p>
      </article>
      <article>
        <h2>What changed</h2>
        <p>The editor now sits inside a broader suite instead of acting as the only public surface.</p>
      </article>
      <article>
        <h2>What is next</h2>
        <p>Backend-connected project history, stronger auth, and richer publishing workflows.</p>
      </article>
    </section>
  </main>
</body>
</html>`,
      css: `body {
  margin: 0;
  background: #f5f7f9;
  color: #17212b;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
}

.newsletter-shell {
  width: min(920px, calc(100% - 48px));
  margin: 26px auto;
  background: #ffffff;
  border: 1px solid #d7dee5;
  border-radius: 26px;
  box-shadow: 0 12px 24px rgba(23, 33, 43, 0.05);
  padding: 32px;
}

.eyebrow {
  margin: 0;
  color: #0f6c5b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  font-weight: 700;
}

header h1 {
  margin: 10px 0 12px;
  font-size: clamp(2.1rem, 4vw, 3.6rem);
  line-height: 1;
}

header p,
.newsletter-grid p {
  color: #5f6b79;
  line-height: 1.68;
}

.newsletter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  margin-top: 20px;
}

.newsletter-grid article {
  border: 1px solid #e1e7ec;
  border-radius: 20px;
  padding: 22px;
  background: #fbfcfd;
}`,
      js: `console.log("Newsletter brief active");`
    },
    {
      id: "cafe-menu",
      title: "Cafe Menu",
      category: "Business",
      summary: "A clean menu layout for cafes, events, or hospitality one-pagers.",
      tags: ["Menu", "PDF", "Print"],
      mode: "paged",
      pageSize: "A4",
      pageOrientation: "portrait",
      notes: [
        "Print-friendly by default for menus, event menus, or pop-up cards.",
        "Swap categories and pricing lines with your own items."
      ],
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cafe Menu</title>
</head>
<body>
  <main class="menu-shell">
    <header class="menu-header">
      <p class="eyebrow">Seasonal Menu</p>
      <h1>River Street Cafe</h1>
      <p>Fresh plates, house coffee, and small desserts made daily.</p>
    </header>
    <section class="menu-columns">
      <article>
        <h2>Breakfast</h2>
        <p><span>Avocado toast</span><strong>$8</strong></p>
        <p><span>Scrambled eggs + herbs</span><strong>$7</strong></p>
        <p><span>Granola bowl</span><strong>$6</strong></p>
      </article>
      <article>
        <h2>Drinks</h2>
        <p><span>House filter coffee</span><strong>$3</strong></p>
        <p><span>Cold brew</span><strong>$4</strong></p>
        <p><span>Seasonal tea</span><strong>$3</strong></p>
      </article>
    </section>
  </main>
</body>
</html>`,
      css: `body {
  margin: 0;
  background: #f3efe8;
  color: #2d261f;
  font-family: Georgia, "Times New Roman", serif;
}

.menu-shell {
  width: min(860px, calc(100% - 48px));
  margin: 28px auto;
  background: #fffdf8;
  border: 1px solid #e6dccf;
  border-radius: 30px;
  box-shadow: 0 12px 28px rgba(45, 38, 31, 0.05);
  padding: 32px;
}

.menu-header {
  text-align: center;
  padding-bottom: 24px;
  border-bottom: 1px solid #ece2d6;
}

.eyebrow {
  margin: 0;
  color: #7b5c2f;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.76rem;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  font-weight: 700;
}

.menu-header h1 {
  margin: 10px 0 8px;
  font-size: 3rem;
}

.menu-header p,
.menu-columns p {
  color: #705f4f;
  line-height: 1.7;
}

.menu-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.menu-columns article {
  border: 1px solid #ece2d6;
  border-radius: 22px;
  padding: 22px;
}

.menu-columns p {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin: 12px 0;
}

@media (max-width: 720px) {
  .menu-columns {
    grid-template-columns: 1fr;
  }
}`,
      js: `console.log("Cafe menu template active");`
    },
    {
      id: "saas-dashboard",
      title: "SaaS Dashboard",
      category: "Product",
      summary: "A compact product dashboard shell with KPI cards, tasks, and release activity.",
      tags: ["Dashboard", "App", "Product"],
      mode: "app",
      pageSize: "A4",
      pageOrientation: "landscape",
      notes: [
        "A useful base for internal dashboards, QA views, or admin surfaces.",
        "Small UI interactions are already wired for App mode."
      ],
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard</title>
</head>
<body>
  <main class="dashboard-shell">
    <section class="dashboard-top">
      <div>
        <p class="eyebrow">Overview</p>
        <h1>Release operations</h1>
      </div>
      <button data-refresh>Refresh metrics</button>
    </section>
    <section class="kpi-grid">
      <article><span>Open tasks</span><strong data-kpi="tasks">18</strong></article>
      <article><span>Approved reviews</span><strong data-kpi="reviews">12</strong></article>
      <article><span>Ready exports</span><strong data-kpi="exports">7</strong></article>
    </section>
    <section class="dashboard-grid">
      <article class="panel">
        <h2>Next actions</h2>
        <ul>
          <li>Finalize template gallery copy</li>
          <li>Review PDF output spacing</li>
          <li>Confirm user auth migration plan</li>
        </ul>
      </article>
      <article class="panel">
        <h2>Recent release note</h2>
        <p data-status>Metrics are stable. Review cycle is on track.</p>
      </article>
    </section>
  </main>
</body>
</html>`,
      css: `body {
  margin: 0;
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  background: #eef2f5;
  color: #17212b;
}

.dashboard-shell {
  width: min(1120px, calc(100% - 48px));
  margin: 24px auto;
}

.dashboard-top,
.kpi-grid article,
.panel {
  background: #ffffff;
  border: 1px solid #d7dee5;
  border-radius: 24px;
  box-shadow: 0 10px 24px rgba(23, 33, 43, 0.05);
}

.dashboard-top {
  padding: 28px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
}

.dashboard-top button {
  border: 0;
  border-radius: 999px;
  padding: 12px 18px;
  background: #0f6c5b;
  color: #ffffff;
}

.eyebrow {
  margin: 0;
  color: #0f6c5b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  font-weight: 700;
}

.dashboard-top h1 {
  margin: 10px 0 0;
  font-size: 2.6rem;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 18px;
}

.kpi-grid article,
.panel {
  padding: 24px;
}

.kpi-grid span,
.panel p,
.panel li {
  color: #5d6a77;
  line-height: 1.6;
}

.kpi-grid strong {
  display: block;
  margin-top: 10px;
  font-size: 2rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 18px;
  margin-top: 18px;
}

@media (max-width: 860px) {
  .kpi-grid,
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}`,
      js: `const refreshButton = document.querySelector("[data-refresh]");
const status = document.querySelector("[data-status]");
const metrics = {
  tasks: document.querySelector("[data-kpi='tasks']"),
  reviews: document.querySelector("[data-kpi='reviews']"),
  exports: document.querySelector("[data-kpi='exports']")
};

if (refreshButton && status) {
  refreshButton.addEventListener("click", () => {
    if (metrics.tasks) metrics.tasks.textContent = "16";
    if (metrics.reviews) metrics.reviews.textContent = "14";
    if (metrics.exports) metrics.exports.textContent = "9";
    status.textContent = "Metrics refreshed for the latest release cycle.";
  });
}`
    }
  ]
};
