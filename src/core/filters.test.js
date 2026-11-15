import test from 'node:test';
import assert from 'node:assert/strict';
import { toGrayscale } from './grayscale.js';
import { applySharpen } from './sharpen.js';
import { adjustTone } from './tone.js';
import { applyEdges } from './edges.js';

function close(actual, expected, tolerance = 0.001) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not close to ${expected}`);
}

test('grayscale weights follow Rec. 709', () => {
  const lum = toGrayscale(new Uint8ClampedArray([255, 0, 0, 255, 255, 255, 255, 255]), 2);
  close(lum[0], 0.2126 * 255);
  close(lum[1], 255);
});

test('neutral tone settings leave luminance unchanged', () => {
  const input = new Float32Array([0, 64, 128, 200, 255]);
  const output = adjustTone(input, 0, 0, 1);
  input.forEach((value, i) => close(output[i], value));
});

test('gamma above one brightens midtones', () => {
  const output = adjustTone(new Float32Array([128]), 0, 0, 2);
  assert.ok(output[0] > 160);
});

test('brightness and contrast stay inside the byte range', () => {
  const output = adjustTone(new Float32Array([0, 255]), 100, 100, 1);
  assert.ok(output.every((v) => v >= 0 && v <= 255));
});

test('sharpen with zero amount returns the same buffer', () => {
  const input = new Float32Array([1, 2, 3, 4]);
  assert.equal(applySharpen(input, 2, 2, 0), input);
});

test('sharpen leaves flat areas untouched', () => {
  const input = new Float32Array(9).fill(90);
  applySharpen(input, 3, 3, 2).forEach((v) => close(v, 90));
});

test('sharpen exaggerates both sides of a step', () => {
  const output = applySharpen(new Float32Array([100, 100, 200, 200]), 4, 1, 1);
  close(output[1], 75);
  close(output[2], 225);
});

test('edges are zero on flat images', () => {
  applyEdges(new Float32Array(16).fill(50), 4, 4).forEach((v) => assert.equal(v, 0));
});

test('edges respond to a vertical step', () => {
  const lum = new Float32Array(16);
  for (let y = 0; y < 4; y++) for (let x = 2; x < 4; x++) lum[y * 4 + x] = 255;
  const edge = applyEdges(lum, 4, 4);
  assert.equal(edge[0], 0);
  assert.equal(edge[1], 1);
  assert.equal(edge[2], 1);
  assert.equal(edge[3], 0);
});
