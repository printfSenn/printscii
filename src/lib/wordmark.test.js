import test from 'node:test';
import assert from 'node:assert/strict';
import { ROW_COUNT, WORD, glyphRows, wordmarkRows } from './wordmark.js';

test('every glyph has six rows of equal width', () => {
  for (const letter of new Set(WORD)) {
    const rows = glyphRows(letter);
    assert.equal(rows.length, ROW_COUNT, letter);
    assert.ok(rows.every((row) => Array.from(row).length === Array.from(rows[0]).length), letter);
  }
});

test('wordmark spells PRINTSCII in six equally wide rows', () => {
  assert.equal(WORD.join(''), 'PRINTSCII');
  const rows = wordmarkRows();
  assert.equal(rows.length, ROW_COUNT);
  assert.ok(rows.every((row) => Array.from(row).length === Array.from(rows[0]).length));
});

test('wordmark only uses block and box drawing characters', () => {
  assert.ok(wordmarkRows().every((row) => /^[█╗╔╝╚═║ ]+$/.test(row)));
});

