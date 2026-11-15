import test from 'node:test';
import assert from 'node:assert/strict';
import { buildText, mapToChars } from './mapping.js';

const plain = { invert: false, edgeStrength: 0, dither: false };

test('luminance maps linearly onto the ramp', () => {
  const idx = mapToChars(new Float32Array([0, 127.5, 255]), null, 3, 1, ['a', 'b', 'c'], plain);
  assert.deepEqual(Array.from(idx), [0, 1, 2]);
});

test('invert flips the mapping', () => {
  const idx = mapToChars(new Float32Array([0, 255]), null, 2, 1, ['a', 'b', 'c'], {
    ...plain,
    invert: true
  });
  assert.deepEqual(Array.from(idx), [2, 0]);
});

test('edge strength pushes dark pixels toward dense characters', () => {
  const idx = mapToChars(new Float32Array([0]), new Float32Array([1]), 1, 1, ['a', 'b', 'c'], {
    ...plain,
    edgeStrength: 0.5
  });
  assert.equal(idx[0], 1);
});

test('floyd-steinberg keeps the average tone of a flat midtone', () => {
  const size = 20;
  const lum = new Float32Array(size * size).fill(127.5);
  const idx = mapToChars(lum, null, size, size, ['a', 'b'], { ...plain, dither: true });
  const mean = Array.from(idx).reduce((sum, v) => sum + v, 0) / idx.length;
  assert.ok(mean > 0.4 && mean < 0.6, `mean was ${mean}`);
});

test('a single level ramp returns zeros without crashing', () => {
  const idx = mapToChars(new Float32Array([10, 200]), null, 2, 1, ['a'], plain);
  assert.deepEqual(Array.from(idx), [0, 0]);
});

test('buildText joins rows with line breaks', () => {
  const text = buildText(new Uint16Array([0, 1, 1, 0]), 2, 2, ['.', '#']);
  assert.equal(text, '.#\n#.');
});
