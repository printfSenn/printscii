export const LIMITS = Object.freeze({
  maxFileBytes: 10 * 1024 * 1024,
  maxSourceSide: 2000,
  maxRows: 1200,
  minCols: 40,
  maxCols: 400,
  maxCanvasSide: 16000,
  maxCanvasArea: 120000000
});

export const LINE_HEIGHT = 1.1;

export const FALLBACK_CHAR_WIDTH = 0.6;

export const FONT_STACK =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, "DejaVu Sans Mono", "Liberation Mono", monospace';

export const ZOOM = Object.freeze({ min: 1, max: 24, step: 0.5, initial: 8 });
