import { FileText, Copy, Trash2, Clock, Files } from 'lucide-react';

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ProjectCard({ project, onOpen, onDuplicate, onDelete }) {
  const fileCount = project.nodes?.filter(n => n.type === 'file').length || 0;

  return (
    <article
      className="project-card"
      onClick={() => onOpen(project.id)}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(project.id);
        }
      }}
    >
      <div className="project-card-accent" aria-hidden="true" />
      <div className="project-card-body">
        <div className="project-card-icon">
          <FileText size={22} />
        </div>
        <h3 className="project-card-title" title={project.name}>
          {project.name}
        </h3>
        <div className="project-card-meta">
          <span className="project-card-meta-item">
            <Clock size={14} />
            {formatDate(project.updatedAt)}
          </span>
          <span className="project-card-meta-item">
            <Files size={14} />
            {fileCount} file{fileCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      <div className="project-card-actions">
        <button
          type="button"
          className="project-card-action"
          title="Duplicate"
          aria-label={`Duplicate ${project.name}`}
          onClick={e => onDuplicate(e, project)}
        >
          <Copy size={16} />
        </button>
        <button
          type="button"
          className="project-card-action danger"
          title="Delete"
          aria-label={`Delete ${project.name}`}
          onClick={e => onDelete(e, project.id)}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}
