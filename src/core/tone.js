import { clamp } from './math.js';

export function adjustTone(lum, contrast, brightness, gamma) {
  const out = new Float32Array(lum.length);
  const c = contrast * 2.55;
  const factor = (259 * (c + 255)) / (255 * (259 - c));
  const inverseGamma = 1 / gamma;
  const shift = brightness * 2.55;
  for (let i = 0; i < lum.length; i++) {
    let v = Math.pow(lum[i] / 255, inverseGamma) * 255;
    v = factor * (v - 128) + 128 + shift;
    out[i] = clamp(v, 0, 255);
  }
  return out;
}
