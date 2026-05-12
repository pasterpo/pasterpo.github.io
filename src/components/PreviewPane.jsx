import { useRef, useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Download, ZoomIn, ZoomOut, Maximize2, FileText } from 'lucide-react';

export default function PreviewPane() {
  const { state, dispatch, compile } = useApp();
  const iframeRef = useRef(null);
  const [status, setStatus] = useState('Ready');

  const handleCompile = () => {
    setStatus('Compiling...');
    compile();
    setTimeout(() => setStatus('Compiled successfully'), 200);
  };

  // Write compiled HTML to iframe
  useEffect(() => {
    if (state.compiled && state.lastCompiledHtml && iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(state.lastCompiledHtml);
        doc.close();
      }
    }
  }, [state.compiled, state.lastCompiledHtml]);

  const handleZoomIn = () => dispatch({ type: 'SET_PREVIEW_ZOOM', payload: Math.min(state.previewZoom + 0.1, 2) });
  const handleZoomOut = () => dispatch({ type: 'SET_PREVIEW_ZOOM', payload: Math.max(state.previewZoom - 0.1, 0.3) });
  const handleFit = () => dispatch({ type: 'SET_PREVIEW_ZOOM', payload: 1 });

  const handleDownloadPDF = async () => {
    if (!iframeRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).jsPDF;
      const body = iframeRef.current.contentDocument?.body;
      if (!body) return;
      const canvas = await html2canvas(body, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: state.pageOrientation, unit: 'mm', format: state.pageSize.toLowerCase() });
      const pW = pdf.internal.pageSize.getWidth();
      const pH = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pW, pH);
      pdf.save(`${state.activeProject?.name || 'document'}.pdf`);
    } catch (e) {
      console.error('PDF export failed:', e);
    }
  };

  return (
    <div className="preview-pane">
      <div className="preview-header">
        <div className="preview-header-left">
          <button className="btn-recompile" onClick={handleCompile}>
            <Play size={16} />
            Recompile
          </button>
          <select className="preview-mode-select" value={state.compileMode} onChange={e => dispatch({ type: 'SET_COMPILE_MODE', payload: e.target.value })}>
            <option value="freestyle">Freestyle</option>
            <option value="paged">Paged</option>
            <option value="app">App</option>
          </select>
        </div>
        <div className="preview-header-right">
          <button className="preview-action-btn" onClick={handleDownloadPDF} title="Download PDF">
            <Download size={16} />
            <span>PDF</span>
          </button>
        </div>
      </div>

      <div className="preview-status">
        <span>{status}</span>
        <span>{Math.round(state.previewZoom * 100)}%</span>
      </div>

      <div className="preview-zoom-bar">
        <button className="preview-zoom-btn" onClick={handleZoomOut}><ZoomOut size={14} /></button>
        <span className="preview-zoom-label">{Math.round(state.previewZoom * 100)}%</span>
        <button className="preview-zoom-btn" onClick={handleZoomIn}><ZoomIn size={14} /></button>
        <button className="preview-zoom-btn" onClick={handleFit} title="Fit"><Maximize2 size={14} /></button>
      </div>

      {state.compiled ? (
        <div className="preview-frame-container">
          <iframe
            ref={iframeRef}
            title="Preview"
            sandbox="allow-scripts allow-forms allow-modals allow-popups allow-downloads allow-same-origin"
            style={{ transform: `scale(${state.previewZoom})` }}
          />
        </div>
      ) : (
        <div className="preview-empty">
          <FileText size={64} />
          <h3>Compile to see preview</h3>
          <p>Click the green Recompile button or press <kbd>⌘ Enter</kbd> to render your document.</p>
        </div>
      )}
    </div>
  );
}
