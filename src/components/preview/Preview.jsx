import { useCallback, useEffect, useRef, useState } from 'react';
import { LINE_HEIGHT, ZOOM } from '../../core/constants.js';
import { clamp } from '../../core/math.js';
import { AsciiView } from './AsciiView.jsx';
import { OriginalView } from './OriginalView.jsx';
import { PreviewToolbar } from './PreviewToolbar.jsx';

const PANE_PADDING_X = 72;
const PANE_PADDING_Y = 66;

export function Preview({ image, output, settings, charWidth }) {
  const [view, setView] = useState('ascii');
  const [fontPx, setFontPx] = useState(ZOOM.initial);
  const [autoFit, setAutoFit] = useState(true);
  const paneRef = useRef(null);
  const live = useRef({ autoFit: true, fit: () => false });

  const { source } = image;
  const { result } = output;
  const fresh = Boolean(source) && output.source === source && Boolean(result);
  const busy = image.loading || output.busy;

  const zoomTo = useCallback((value) => {
    setFontPx(clamp(value, ZOOM.min, ZOOM.max));
  }, []);

  const fit = useCallback(() => {
    const pane = paneRef.current;
    if (!pane || !result || !pane.offsetWidth || !pane.offsetHeight) return false;
    const byWidth = (pane.offsetWidth - PANE_PADDING_X) / (result.cols * charWidth);
    const byHeight = (pane.offsetHeight - PANE_PADDING_Y) / (result.rows * LINE_HEIGHT);
    zoomTo(Math.floor(Math.min(byWidth, byHeight) * 2) / 2);
    return true;
  }, [result, charWidth, zoomTo]);

  useEffect(() => {
    live.current = { autoFit, fit };
  }, [autoFit, fit]);

  useEffect(() => {
    if (autoFit && fresh) fit();
  }, [autoFit, fresh, fit]);

  useEffect(() => {
    const pane = paneRef.current;
    if (!pane || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(() => {
      if (live.current.autoFit) live.current.fit();
    });
    observer.observe(pane, { box: 'border-box' });
    return () => observer.disconnect();
  }, []);

  const onManualZoom = (value) => {
    setAutoFit(false);
    zoomTo(value);
  };

  const onFit = () => {
    setAutoFit(true);
    if (view === 'original') setView('ascii');
    else fit();
  };

  let statsText = '';
  if (fresh) {
    const total = (result.cols * result.rows).toLocaleString();
    statsText = `${result.cols} x ${result.rows} characters, ${total} total`;
    if (result.cols < settings.cols) statsText += ' (limited by image size or shape)';
  }

  return (
    <section className="press" id="preview" aria-label="Preview" tabIndex={-1}>
      <PreviewToolbar
        view={view}
        onView={setView}
        fontPx={fontPx}
        onZoom={onManualZoom}
        onFit={onFit}
        autoFit={autoFit}
        canFit={fresh}
      />
      <div className="stage-wrap">
        <div className="stage" data-view={view} data-ready={Boolean(source)}>
          <div className="empty">
            <h2>Nothing printed yet</h2>
            <p>Drop a picture onto this page, or load the sample to see how it works.</p>
          </div>
          <div className="pane ascii-pane" ref={paneRef} tabIndex={0} aria-label="ASCII result">
            <div className="sheet">
              <AsciiView output={output} fontPx={fontPx} charWidth={charWidth} />
            </div>
          </div>
          <div className="pane orig-pane" aria-label="Original image">
            <figure className="sheet">
              <OriginalView source={source} />
              <figcaption>Original</figcaption>
            </figure>
          </div>
        </div>
        {busy ? (
          <div className="busy" role="status">
            <span className="spinner" />
            <span>{image.loading ? 'Reading image' : 'Printing'}</span>
          </div>
        ) : null}
      </div>
      {output.error ? (
        <p className="error" role="alert">
          {output.error}
        </p>
      ) : null}
      <p className="stats" aria-live="polite">
        {statsText}
      </p>
    </section>
  );
}
