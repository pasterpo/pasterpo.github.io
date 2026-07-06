import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

export default function ToastContainer() {
  const { state, dispatch } = useApp();

  if (state.toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite" aria-relevant="additions">
      {state.toasts.map(toast => {
        const Icon = ICONS[toast.type] || Info;
        return (
          <div key={toast.id} className={`toast toast-${toast.type}`} role="status">
            <Icon size={18} className="toast-icon" />
            <span className="toast-message">{toast.message}</span>
            <button
              type="button"
              className="toast-dismiss"
              aria-label="Dismiss"
              onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: toast.id })}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
