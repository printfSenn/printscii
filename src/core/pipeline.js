import { toGrayscale } from './grayscale.js';
import { applySharpen } from './sharpen.js';
import { adjustTone } from './tone.js';
import { applyEdges } from './edges.js';
import { getRamp } from './ramps.js';
import { mapToChars, buildText } from './mapping.js';

export function runPipeline(grid, settings) {
  const { cols, rows, data } = grid;
  const count = cols * rows;

  let lum = toGrayscale(data, count);
  lum = applySharpen(lum, cols, rows, settings.sharpness / 20);
  lum = adjustTone(lum, settings.contrast, settings.brightness, settings.gamma);

  const edge = settings.edges ? applyEdges(lum, cols, rows) : null;
  const ramp = getRamp(settings);
  const idx = mapToChars(lum, edge, cols, rows, ramp, {
    invert: settings.invert,
    edgeStrength: settings.edgeStrength / 100,
    dither: settings.dither
  });

  return {
    cols,
    rows,
    ramp,
    idx,
    gray: lum,
    text: buildText(idx, cols, rows, ramp)
  };
}
