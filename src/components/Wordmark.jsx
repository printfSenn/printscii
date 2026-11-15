import { wordmarkRows } from '../lib/wordmark.js';
import { CELL, rowShapes, wordmarkSize } from '../lib/wordmarkGeometry.js';

const ROWS = wordmarkRows();
const SHAPES = ROWS.map((row, index) => rowShapes(row, index));
const SIZE = wordmarkSize(ROWS);

export function Wordmark({ printed }) {
  return (
    <svg
      className="wordmark"
      viewBox={`0 0 ${SIZE.width} ${SIZE.height}`}
      style={{ aspectRatio: `${SIZE.width} / ${SIZE.height}` }}
      aria-hidden="true"
      focusable="false"
    >
      {SHAPES.slice(0, printed).map((shape, row) => (
        <g key={row}>
          <path className="wm-line" d={shape.d} />
          {shape.blocks.map((block) => (
            <rect
              key={block.x}
              className="wm-block"
              x={block.x - 0.25}
              y={block.y - 0.25}
              width={block.width + 0.5}
              height={CELL.height + 0.5}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
