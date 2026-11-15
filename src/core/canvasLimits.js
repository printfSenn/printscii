import { LIMITS } from './constants.js';

export function limitScale(width, height, desired) {
  const limit = Math.min(
    LIMITS.maxCanvasSide / width,
    LIMITS.maxCanvasSide / height,
    Math.sqrt(LIMITS.maxCanvasArea / (width * height))
  );
  return Math.max(0.05, Math.min(desired, limit));
}
