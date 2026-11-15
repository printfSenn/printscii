import test from 'node:test';
import assert from 'node:assert/strict';
import { CELL, rowShapes, shadowPath, wordmarkSize } from './wordmarkGeometry.js';
import { wordmarkRows } from './wordmark.js';

test('every non block character in the wordmark has a drawing', () => {
  const chars = new Set(wordmarkRows().join('').split(''));
  chars.delete('█');
  chars.delete(' ');
  for (const char of chars) {
    assert.notEqual(shadowPath(char, 0, 0), '', char);
  }
});

test('spaces and unknown characters draw nothing', () => {
  assert.equal(shadowPath(' ', 0, 0), '');
  assert.equal(shadowPath('x', 0, 0), '');
});

test('neighbouring blocks merge into one run', () => {
  const shapes = rowShapes('██╗  ██', 2);
  assert.equal(shapes.blocks.length, 2);
  assert.equal(shapes.blocks[0].width, CELL.width * 2);
  assert.equal(shapes.blocks[0].y, CELL.height * 2);
  assert.equal(shapes.blocks[1].x, CELL.width * 5);
  assert.notEqual(shapes.d, '');
});

test('size matches the grid of cells', () => {
  const rows = wordmarkRows();
  const size = wordmarkSize(rows);
  assert.equal(size.height, rows.length * CELL.height);
  assert.equal(size.width, Array.from(rows[0]).length * CELL.width);
});
