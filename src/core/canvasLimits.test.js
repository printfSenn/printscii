import test from 'node:test';
import assert from 'node:assert/strict';
import { limitScale } from './canvasLimits.js';

test('small canvases keep the requested scale', () => {
  assert.equal(limitScale(1000, 1000, 4), 4);
});

test('huge canvases are scaled down to stay inside browser limits', () => {
  const scale = limitScale(10000, 10000, 4);
  assert.ok(scale < 4);
  assert.ok(scale >= 0.05);
  assert.ok(10000 * scale * 10000 * scale <= 120000000 + 1);
});
