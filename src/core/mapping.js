import { clamp } from './math.js';

export function mapToChars(lum, edge, width, height, ramp, options) {
  const levels = ramp.length;
  const count = width * height;
  const idx = new Uint16Array(count);
  if (levels < 2) return idx;

  const work = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    let v = lum[i] / 255;
    if (options.invert) v = 1 - v;
    if (edge) v += edge[i] * options.edgeStrength;
    work[i] = clamp(v, 0, 1);
  }

  if (!options.dither) {
    for (let i = 0; i < count; i++) idx[i] = Math.round(work[i] * (levels - 1));
    return idx;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const wanted = clamp(work[i], 0, 1);
      const level = Math.round(wanted * (levels - 1));
      idx[i] = level;
      const error = wanted - level / (levels - 1);
      if (x + 1 < width) work[i + 1] += (error * 7) / 16;
      if (y + 1 < height) {
        if (x > 0) work[i + width - 1] += (error * 3) / 16;
        work[i + width] += (error * 5) / 16;
        if (x + 1 < width) work[i + width + 1] += error / 16;
      }
    }
  }
  return idx;
}

export function buildText(idx, width, height, ramp) {
  const lines = new Array(height);
  for (let y = 0; y < height; y++) {
    let line = '';
    const base = y * width;
    for (let x = 0; x < width; x++) line += ramp[idx[base + x]];
    lines[y] = line;
  }
  return lines.join('\n');
}
