import { ZOOM } from '../../core/constants.js';
import { Segmented } from '../fields/Segmented.jsx';

const VIEW_OPTIONS = [
  { value: 'ascii', label: 'ASCII' },
  { value: 'original', label: 'Original' },
  { value: 'split', label: 'Side by side' }
];

export function PreviewToolbar({ view, onView, fontPx, onZoom, onFit, autoFit, canFit }) {
  return (
    <div className="toolbar">
      <Segmented hideLegend flush name="view" legend="View" options={VIEW_OPTIONS} value={view} onChange={onView} />
      <div className="zoom">
        <b>Zoom</b>
        <button className="btn small" type="button" aria-label="Zoom out" onClick={() => onZoom(fontPx - 1)}>
          -
        </button>
        <input
          type="range"
          min={ZOOM.min}
          max={ZOOM.max}
          step={ZOOM.step}
          value={fontPx}
          aria-label="Zoom"
          onChange={(event) => onZoom(Number(event.target.value))}
        />
        <button className="btn small" type="button" aria-label="Zoom in" onClick={() => onZoom(fontPx + 1)}>
          +
        </button>
        <output>{fontPx}px</output>
        <button
          className="btn small"
          type="button"
          aria-pressed={autoFit}
          title="Keep the whole picture in view"
          disabled={!canFit}
          onClick={onFit}
        >
          Fit
        </button>
      </div>
    </div>
  );
}
