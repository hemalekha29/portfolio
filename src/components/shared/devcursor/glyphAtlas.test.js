import test from 'node:test';
import assert from 'node:assert/strict';
import { packGlyphs } from './glyphAtlas.js';

const cell = (token, width, height = 28) => ({ token, width, height });

test('packGlyphs places every cell on the first row when they fit', () => {
  const { cells, height } = packGlyphs([cell('a', 40), cell('b', 60)], 512);
  assert.equal(cells[0].x, 0);
  assert.equal(cells[1].x, 40);
  assert.equal(cells[0].y, 0);
  assert.equal(cells[1].y, 0);
  assert.equal(height, 28);
});

test('packGlyphs breaks to a new row instead of overflowing the atlas width', () => {
  const { cells, height } = packGlyphs([cell('a', 300), cell('b', 300)], 512);
  assert.equal(cells[0].x, 0);
  assert.equal(cells[0].y, 0);
  assert.equal(cells[1].x, 0, 'the overflowing cell starts a new row');
  assert.equal(cells[1].y, 28, 'the new row sits below the previous row');
  assert.equal(height, 56);
});

test('packGlyphs shares one baseline across a row rather than stacking cells', () => {
  /* Regression: an earlier version advanced the row's y for every cell, so
     each token was placed below the previous one instead of beside it. */
  const { cells } = packGlyphs([cell('a', 30), cell('b', 30), cell('c', 30)], 512);
  const ys = new Set(cells.map((c) => c.y));
  assert.equal(ys.size, 1, 'all three cells share a baseline');
});

test('packGlyphs advances x by the previous cell width within a row', () => {
  const { cells } = packGlyphs([cell('a', 30), cell('b', 45), cell('c', 20)], 512);
  assert.equal(cells[0].x, 0);
  assert.equal(cells[1].x, 30);
  assert.equal(cells[2].x, 75);
});

test('packGlyphs grows the row height to the tallest cell in that row', () => {
  const { cells, height } = packGlyphs(
    [cell('a', 30, 28), cell('b', 30, 44), cell('c', 600, 28)],
    512,
  );
  assert.equal(cells[2].y, 44, 'the next row clears the tallest cell above it');
  assert.equal(height, 72);
});

test('packGlyphs never places a cell beyond the atlas width', () => {
  const widths = [120, 90, 200, 45, 310, 60, 180];
  const cells = widths.map((w) => cell(String(w), w));
  const { cells: packed } = packGlyphs(cells, 512);
  packed.forEach((c) => {
    assert.ok(c.x + c.width <= 512, `"${c.token}" fits within the atlas width`);
  });
});

test('packGlyphs handles an empty token list', () => {
  const { cells, height } = packGlyphs([], 512);
  assert.deepEqual(cells, []);
  assert.equal(height, 0);
});
