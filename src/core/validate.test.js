import test from 'node:test';
import assert from 'node:assert/strict';
import { baseName, validateFile } from './validate.js';

test('png and jpeg files are accepted', () => {
  assert.equal(validateFile({ name: 'a.PNG', type: 'image/png', size: 10 }), '');
  assert.equal(validateFile({ name: 'b.jpeg', type: 'image/jpeg', size: 10 }), '');
  assert.equal(validateFile({ name: 'c.jpg', type: '', size: 10 }), '');
});

test('other types are rejected with a clear message', () => {
  assert.match(validateFile({ name: 'a.gif', type: 'image/gif', size: 10 }), /not supported/);
  assert.match(validateFile({ name: 'a.png', type: 'image/webp', size: 10 }), /not supported/);
  assert.match(validateFile({ name: 'notes.txt', type: 'text/plain', size: 10 }), /not supported/);
});

test('empty and oversized files are rejected', () => {
  assert.match(validateFile({ name: 'a.png', type: 'image/png', size: 0 }), /empty/);
  assert.match(
    validateFile({ name: 'a.png', type: 'image/png', size: 10 * 1024 * 1024 + 1 }),
    /maximum size is 10 MB/
  );
});

test('file names become safe export names', () => {
  assert.equal(baseName('My Photo (1).jpg'), 'My-Photo-1');
  assert.equal(baseName('...'), 'printscii');
  assert.equal(baseName(undefined), 'printscii');
});
