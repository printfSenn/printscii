import { LIMITS } from './constants.js';

export function computeGrid(sourceWidth, sourceHeight, cols, charAspect) {
  const ratio = sourceHeight / sourceWidth;
  let c = Math.max(1, Math.min(cols, Math.round(sourceWidth * 2)));
  let r = Math.max(1, Math.round(c * ratio * charAspect));
  if (r > LIMITS.maxRows) {
    r = LIMITS.maxRows;
    c = Math.max(1, Math.min(c, Math.round(r / (ratio * charAspect))));
  }
  return { cols: c, rows: r };
}
