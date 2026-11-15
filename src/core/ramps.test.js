import test from 'node:test';
import assert from 'node:assert/strict';
import { DETAILED, STANDARD, getRamp, subsample } from './ramps.js';
import { DEFAULTS } from './settings.js';

test('detailed ramp holds 70 characters', () => {
  assert.equal(Array.from(DETAILED).length, 70);
});

test('detailed ramp is sampled from light to dense', () => {
  const ramp = getRamp({ ...DEFAULTS, charset: 'detailed', rampLen: 30 });
  assert.equal(ramp.length, 30);
  assert.equal(ramp[0], ' ');
  assert.equal(ramp[ramp.length - 1], '$');
});

test('full detailed ramp keeps every character', () => {
  const ramp = getRamp({ ...DEFAULTS, charset: 'detailed', rampLen: 70 });
  assert.equal(ramp.length, 70);
});

test('fixed ramps have the expected size', () => {
  assert.equal(getRamp({ ...DEFAULTS, charset: 'standard' }).length, STANDARD.length);
  assert.deepEqual(getRamp({ ...DEFAULTS, charset: 'binary' }), ['0', '1']);
  assert.equal(getRamp({ ...DEFAULTS, charset: 'blocks' }).length, 4);
});

test('custom ramp uses the typed characters and ignores line breaks', () => {
  assert.deepEqual(getRamp({ ...DEFAULTS, charset: 'custom', custom: 'a\nb' }), ['a', 'b']);
});

test('custom ramp with fewer than two characters falls back to standard', () => {
  assert.equal(getRamp({ ...DEFAULTS, charset: 'custom', custom: '' }).length, STANDARD.length);
  assert.equal(getRamp({ ...DEFAULTS, charset: 'custom', custom: 'x' }).length, STANDARD.length);
});

test('subsample never returns fewer than two characters', () => {
  assert.equal(subsample(['a', 'b', 'c', 'd'], 1).length, 2);
});
