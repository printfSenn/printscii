import test from 'node:test';
import assert from 'node:assert/strict';
import { runPipeline } from './pipeline.js';
import { DEFAULTS } from './settings.js';

function gradientGrid(cols, rows) {
  const data = new Uint8ClampedArray(cols * rows * 4);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const v = Math.round((x / (cols - 1)) * 255);
      const p = (y * cols + x) * 4;
      data[p] = v;
      data[p + 1] = v;
      data[p + 2] = v;
      data[p + 3] = 255;
    }
  }
  return { cols, rows, data };
}

const standard = { ...DEFAULTS, charset: 'standard', preset: 'low', rampLen: 10, invert: false };

test('a horizontal gradient maps to a rising ramp', () => {
  const result = runPipeline(gradientGrid(16, 2), standard);
  const lines = result.text.split('\n');
  assert.equal(lines.length, 2);
  assert.equal(lines[0].length, 16);
  assert.equal(lines[0][0], ' ');
  assert.equal(lines[0][15], '@');
  const indexes = Array.from(result.idx.slice(0, 16));
  assert.deepEqual(indexes, [...indexes].sort((a, b) => a - b));
});

test('invert reverses the gradient', () => {
  const result = runPipeline(gradientGrid(16, 1), { ...standard, invert: true });
  assert.equal(result.text[0], '@');
  assert.equal(result.text[15], ' ');
});

test('every option together still produces a full grid', () => {
  const result = runPipeline(gradientGrid(32, 8), {
    ...DEFAULTS,
    sharpness: 80,
    edges: true,
    dither: true,
    contrast: 30,
    brightness: -20,
    gamma: 1.4
  });
  assert.equal(result.idx.length, 32 * 8);
  assert.equal(result.text.split('\n').length, 8);
  assert.ok(result.text.split('\n').every((line) => line.length === 32));
});

test('result exposes the ramp used', () => {
  const result = runPipeline(gradientGrid(4, 1), { ...DEFAULTS, charset: 'binary' });
  assert.deepEqual(result.ramp, ['0', '1']);
});
