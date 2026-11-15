export const CELL = Object.freeze({ width: 12, height: 20, gap: 3 });

export function shadowPath(char, x0, y0) {
  const { width: w, height: h, gap: g } = CELL;
  const l = x0;
  const r = x0 + w;
  const t = y0;
  const b = y0 + h;
  const cx = x0 + w / 2;
  const cy = y0 + h / 2;
  switch (char) {
    case '═':
      return `M${l} ${cy - g}H${r}M${l} ${cy + g}H${r}`;
    case '║':
      return `M${cx - g} ${t}V${b}M${cx + g} ${t}V${b}`;
    case '╗':
      return `M${l} ${cy - g}H${cx + g}V${b}M${l} ${cy + g}H${cx - g}V${b}`;
    case '╔':
      return `M${cx - g} ${b}V${cy - g}H${r}M${cx + g} ${b}V${cy + g}H${r}`;
    case '╝':
      return `M${l} ${cy + g}H${cx + g}V${t}M${l} ${cy - g}H${cx - g}V${t}`;
    case '╚':
      return `M${cx - g} ${t}V${cy + g}H${r}M${cx + g} ${t}V${cy - g}H${r}`;
    default:
      return '';
  }
}

export function rowShapes(row, rowIndex) {
  const blocks = [];
  let d = '';
  let col = 0;
  for (const char of row) {
    const x = col * CELL.width;
    const y = rowIndex * CELL.height;
    if (char === '█') {
      const last = blocks[blocks.length - 1];
      if (last && last.x + last.width === x) last.width += CELL.width;
      else blocks.push({ x, y, width: CELL.width });
    } else {
      d += shadowPath(char, x, y);
    }
    col += 1;
  }
  return { blocks, d };
}

export function wordmarkSize(rows) {
  const cols = Math.max(...rows.map((row) => Array.from(row).length));
  return { width: cols * CELL.width, height: rows.length * CELL.height };
}
