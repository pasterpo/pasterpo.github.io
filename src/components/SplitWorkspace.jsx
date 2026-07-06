import { useRef, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import EditorPane from './EditorPane';
import PreviewPane from './PreviewPane';

const SPLIT_STORAGE_KEY = 'cloverleaf-editor-split';
const MIN_RATIO = 0.22;
const MAX_RATIO = 0.78;

function clampRatio(value) {
  return Math.min(MAX_RATIO, Math.max(MIN_RATIO, value));
}

export default function SplitWorkspace() {
  const { state, dispatch } = useApp();
  const containerRef = useRef(null);
  const draggingRef = useRef(false);
  const ratioRef = useRef(state.editorSplitRatio);

  useEffect(() => {
    ratioRef.current = state.editorSplitRatio;
  }, [state.editorSplitRatio]);

  const handlePointerDown = useCallback((e) => {
    if (state.workspaceLayout !== 'split') return;
    draggingRef.current = true;
    e.currentTarget.classList.add('active');
    e.currentTarget.setPointerCapture(e.pointerId);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [state.workspaceLayout]);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const ratio = clampRatio((e.clientX - rect.left) / rect.width);
      ratioRef.current = ratio;
      dispatch({ type: 'SET_EDITOR_SPLIT_RATIO', payload: ratio });
    };

    const handlePointerUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.querySelector('.resize-handle.active')?.classList.remove('active');
      localStorage.setItem(SPLIT_STORAGE_KEY, String(ratioRef.current));
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dispatch]);

  const splitPercent = `${state.editorSplitRatio * 100}%`;

  return (
    <div
      ref={containerRef}
      className={`workspace-split layout-${state.workspaceLayout}`}
      style={state.workspaceLayout === 'split' ? { '--editor-split': splitPercent } : undefined}
    >
      <div className="workspace-editor">
        <EditorPane />
      </div>
      {state.workspaceLayout === 'split' && (
        <div
          className="resize-handle"
          role="separator"
          aria-orientation="vertical"
          aria-valuenow={Math.round(state.editorSplitRatio * 100)}
          aria-valuemin={Math.round(MIN_RATIO * 100)}
          aria-valuemax={Math.round(MAX_RATIO * 100)}
          onPointerDown={handlePointerDown}
        />
      )}
      <div className="workspace-preview">
        <PreviewPane />
      </div>
    </div>
  );
}

export { SPLIT_STORAGE_KEY, clampRatio };
