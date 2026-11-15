import { computeGrid } from '../core/grid.js';
import { stepDownscale } from './canvasResize.js';

export function resizeToGrid(source, cols, background, charAspect) {
  const size = computeGrid(source.width, source.height, cols, charAspect);
  const canvas = stepDownscale(source, source.width, source.height, size.cols, size.rows, background);
  const data = canvas.getContext('2d').getImageData(0, 0, size.cols, size.rows).data;
  return { cols: size.cols, rows: size.rows, data };
}
