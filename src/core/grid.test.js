import test from 'node:test';
import assert from 'node:assert/strict';
import { computeGrid } from './grid.js';

test('square image keeps the requested columns and halves the rows', () => {
  assert.deepEqual(computeGrid(100, 100, 50, 0.5), { cols: 50, rows: 25 });
});

test('very small images never exceed twice their width in columns', () => {
  assert.deepEqual(computeGrid(10, 10, 400, 0.5), { cols: 20, rows: 10 });
});

test('extreme tall images are capped by the row limit', () => {
  const grid = computeGrid(10, 5000, 100, 0.5);
  assert.equal(grid.rows, 1200);
  assert.equal(grid.cols, 5);
});

test('extreme wide images keep at least one row', () => {
  assert.deepEqual(computeGrid(5000, 10, 100, 0.5), { cols: 100, rows: 1 });
});
