import { FolderOpen, SearchX, Plus } from 'lucide-react';

const VARIANTS = {
  empty: {
    icon: FolderOpen,
    title: 'No projects yet',
    description:
      'Create your first project to start writing HTML documents with live preview and PDF export in Clover Leaf.',
    showCta: true,
  },
  'no-results': {
    icon: SearchX,
    title: 'No matching projects',
    description: 'Try a different search term or clear the filter to see all projects.',
    showCta: false,
  },
};

export default function EmptyState({ variant = 'empty', onCreateProject }) {
  const { icon: Icon, title, description, showCta } = VARIANTS[variant] ?? VARIANTS.empty;

  return (
    <div className="dashboard-empty">
      <div className="dashboard-empty-icon">
        <Icon size={48} strokeWidth={1.25} />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      {showCta && (
        <button type="button" className="btn-new-project" onClick={onCreateProject}>
          <Plus size={16} />
          Create Your First Project
        </button>
      )}
    </div>
  );
}
