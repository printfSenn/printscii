import { clamp } from './math.js';

export function applySharpen(lum, width, height, amount) {
  if (amount <= 0) return lum;
  const out = new Float32Array(lum.length);
  for (let y = 0; y < height; y++) {
    const above = Math.max(0, y - 1) * width;
    const below = Math.min(height - 1, y + 1) * width;
    const row = y * width;
    for (let x = 0; x < width; x++) {
      const left = Math.max(0, x - 1);
      const right = Math.min(width - 1, x + 1);
      const blur =
        (lum[above + left] + 2 * lum[above + x] + lum[above + right] +
          2 * lum[row + left] + 4 * lum[row + x] + 2 * lum[row + right] +
          lum[below + left] + 2 * lum[below + x] + lum[below + right]) / 16;
      const i = row + x;
      out[i] = clamp(lum[i] + amount * (lum[i] - blur), 0, 255);
    }
  }
  return out;
}
