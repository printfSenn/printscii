import { FONT_STACK, LINE_HEIGHT } from '../core/constants.js';
import { limitScale } from '../core/canvasLimits.js';

function glyphColor(mode, ink, data, gray, i) {
  if (mode === 'color') {
    const p = i * 4;
    return `rgb(${data[p]},${data[p + 1]},${data[p + 2]})`;
  }
  if (mode === 'gray') {
    const g = Math.round(gray[i]);
    return `rgb(${g},${g},${g})`;
  }
  return ink;
}

export function drawGlyphCanvas(canvas, art, style) {
  const { cols, rows, ramp, idx, gray, data } = art;
  const { colorMode, fg, bg, fontPx, scale: wanted, charWidth } = style;

  const cssWidth = cols * fontPx * charWidth;
  const cssHeight = rows * fontPx * LINE_HEIGHT;
  const scale = limitScale(cssWidth, cssHeight, wanted);

  canvas.width = Math.max(1, Math.round(cssWidth * scale));
  canvas.height = Math.max(1, Math.round(cssHeight * scale));
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cellWidth = canvas.width / cols;
  const cellHeight = canvas.height / rows;
  ctx.font = `${fontPx * scale}px ${FONT_STACK}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  let last = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      const glyph = ramp[idx[i]];
      if (glyph === ' ') continue;
      const color = glyphColor(colorMode, fg, data, gray, i);
      if (color !== last) {
        ctx.fillStyle = color;
        last = color;
      }
      ctx.fillText(glyph, x * cellWidth + cellWidth / 2, y * cellHeight + cellHeight / 2);
    }
  }
  return scale;
}
