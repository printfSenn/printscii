import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULTS, normalizeSettings, pipelineKey } from './settings.js';
import { applyCharset, applyPreset } from './presets.js';

test('bad input falls back to defaults', () => {
  assert.deepEqual(normalizeSettings(null), { ...DEFAULTS });
  assert.deepEqual(normalizeSettings('nope'), { ...DEFAULTS });
  assert.deepEqual(normalizeSettings({ cols: 'wide', fg: 'red', charset: 'emoji' }), { ...DEFAULTS });
});

test('numeric settings are clamped and rounded', () => {
  const out = normalizeSettings({ cols: 9999, contrast: -500, gamma: 0.01, sharpness: 12.6 });
  assert.equal(out.cols, 400);
  assert.equal(out.contrast, -100);
  assert.equal(out.gamma, 0.2);
  assert.equal(out.sharpness, 13);
});

test('colors must be six digit hex values', () => {
  const out = normalizeSettings({ fg: '#ABCDEF', bg: '#fff' });
  assert.equal(out.fg, '#abcdef');
  assert.equal(out.bg, DEFAULTS.bg);
});

test('custom characters are limited to 64', () => {
  const out = normalizeSettings({ custom: 'x'.repeat(200) });
  assert.equal(Array.from(out.custom).length, 64);
});

test('pipeline key ignores settings that only affect painting', () => {
  const base = { ...DEFAULTS };
  assert.equal(pipelineKey(base), pipelineKey({ ...base, fg: '#000000', colorMode: 'color' }));
  assert.notEqual(pipelineKey(base), pipelineKey({ ...base, cols: 200 }));
  assert.notEqual(pipelineKey(base), pipelineKey({ ...base, bg: '#000000' }));
});

test('ultra preset switches on edges and sharpening', () => {
  const out = applyPreset({ ...DEFAULTS }, 'ultra');
  assert.equal(out.edges, true);
  assert.equal(out.sharpness, 40);
  assert.equal(out.preset, 'ultra');
});

test('leaving ultra clears the edge and sharpen boosts', () => {
  const ultra = applyPreset({ ...DEFAULTS }, 'ultra');
  const high = applyPreset(ultra, 'high');
  assert.equal(high.edges, false);
  assert.equal(high.sharpness, 0);
  assert.equal(high.rampLen, 70);
});

test('unknown preset leaves settings alone', () => {
  const settings = { ...DEFAULTS };
  assert.equal(applyPreset(settings, 'mega'), settings);
});

test('choosing a character set updates the matching preset', () => {
  assert.equal(applyCharset({ ...DEFAULTS }, 'standard').preset, 'low');
  assert.equal(applyCharset({ ...DEFAULTS }, 'detailed').rampLen, 70);
  assert.equal(applyCharset({ ...DEFAULTS }, 'blocks').preset, '');
});
