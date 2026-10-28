import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTokenPool, MAX_TOKEN_LENGTH } from './tokenPool.js';

test('technologies from projects and skills are both included', () => {
  const pool = buildTokenPool({
    projectTags: ['React', 'MongoDB'],
    skillNames: ['TypeScript', 'Prisma'],
  });
  assert.ok(pool.includes('React'));
  assert.ok(pool.includes('MongoDB'));
  assert.ok(pool.includes('TypeScript'));
  assert.ok(pool.includes('Prisma'));
});

test('duplicates are removed, keeping the first occurrence', () => {
  const pool = buildTokenPool({
    projectTags: ['React', 'Node.js'],
    skillNames: ['React', 'Node.js'],
  });
  assert.equal(pool.filter((t) => t === 'React').length, 1);
  assert.equal(pool.filter((t) => t === 'Node.js').length, 1);
  assert.equal(pool.length, 2);
});

test('over-long tokens are excluded so the stream stays readable', () => {
  const pool = buildTokenPool({
    projectTags: ['React', 'Auth & Authorization', 'Workflow Automation'],
    skillNames: [],
  });
  assert.ok(pool.includes('React'));
  assert.ok(!pool.includes('Auth & Authorization'));
  assert.ok(!pool.includes('Workflow Automation'));
});

test('the length limit is configurable', () => {
  const pool = buildTokenPool({
    projectTags: ['Tailwind CSS', 'Node.js'],
    skillNames: [],
    maxLength: 20,
  });
  assert.ok(pool.includes('Tailwind CSS'));
});

test('symbols come after the technologies', () => {
  const pool = buildTokenPool({
    projectTags: ['React'],
    skillNames: [],
    symbols: ['{}', '=>'],
  });
  assert.equal(pool[0], 'React');
  assert.ok(pool.indexOf('{}') > pool.indexOf('React'));
});

test('a symbol that is already a technology is not repeated', () => {
  const pool = buildTokenPool({
    projectTags: ['React'],
    skillNames: [],
    symbols: ['React', '{}'],
  });
  assert.equal(pool.filter((t) => t === 'React').length, 1);
  assert.equal(pool.length, 2);
});

test('blank and missing values are ignored', () => {
  const pool = buildTokenPool({
    projectTags: ['React', '', '   ', null, undefined],
    skillNames: [],
  });
  assert.deepEqual(pool, ['React']);
});

test('an empty input yields an empty pool', () => {
  assert.deepEqual(buildTokenPool(), []);
  assert.deepEqual(buildTokenPool({ projectTags: [], skillNames: [] }), []);
});

test('the default maximum length is exported and sensible', () => {
  assert.equal(MAX_TOKEN_LENGTH, 14);
});
