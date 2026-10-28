import test from 'node:test';
import assert from 'node:assert/strict';
import { buildFlowGeometry, fitLabel, stageAt, MAX_NODES } from './flowGeometry.js';

const TONES = ['#61dafb', '#ffffff', '#8cc84b', '#47a248', '#3178c6'];

test('an empty stack produces an empty diagram', () => {
  const g = buildFlowGeometry([], []);
  assert.deepEqual(g.nodes, []);
  assert.equal(g.path, '');
  assert.equal(g.width, 0);
});

test('each node becomes a step with its own label and tone', () => {
  const g = buildFlowGeometry(['React', 'Express', 'Node.js'], TONES);
  assert.equal(g.nodes.length, 3);
  assert.equal(g.nodes[0].label, 'React');
  assert.equal(g.nodes[0].tone, '#61dafb');
  assert.equal(g.nodes[1].label, 'Express');
  assert.equal(g.nodes[1].tone, '#ffffff');
  assert.equal(g.nodes[2].label, 'Node.js');
});

test('nodes alternate between two rows', () => {
  const g = buildFlowGeometry(['A', 'B', 'C'], TONES);
  assert.equal(g.nodes[0].cy, 38);
  assert.equal(g.nodes[1].cy, 12);
  assert.equal(g.nodes[2].cy, 38);
});

test('the node count is capped', () => {
  const many = Array.from({ length: 12 }, (_, i) => `Tech${i}`);
  const g = buildFlowGeometry(many, TONES);
  assert.equal(g.nodes.length, MAX_NODES);
});

test('a wider stack uses tighter runs so the panel stays compact', () => {
  const narrow = buildFlowGeometry(['A', 'B', 'C'], TONES);
  const wide = buildFlowGeometry(['A', 'B', 'C', 'D', 'E'], TONES);
  assert.ok(wide.runWidth < narrow.runWidth);
  assert.ok(wide.width < narrow.width + 200);
});

test('the path connects every node', () => {
  const g = buildFlowGeometry(['React', 'Express', 'Node.js'], TONES);
  assert.match(g.path, /^M /);
  assert.equal((g.path.match(/H /g) || []).length, g.nodes.length - 1);
  assert.equal((g.path.match(/V /g) || []).length, g.nodes.length - 1);
});

test('node centres increase along the path', () => {
  const g = buildFlowGeometry(['A', 'B', 'C', 'D'], TONES);
  for (let i = 1; i < g.nodes.length; i += 1) {
    assert.ok(g.nodes[i].cx > g.nodes[i - 1].cx);
  }
});

test('a missing tone falls back to the accent', () => {
  const g = buildFlowGeometry(['Unknown'], []);
  assert.equal(g.nodes[0].tone, '#00d4ff');
});

test('long labels are truncated to fit their run', () => {
  const g = buildFlowGeometry(['Tailwind CSS', 'Socket.IO'], TONES);
  assert.ok(g.nodes[0].label.length <= 11);
  // The untruncated name is preserved for the title attribute.
  assert.equal(g.nodes[0].fullLabel, 'Tailwind CSS');
});

test('fitLabel only truncates when needed', () => {
  assert.equal(fitLabel('React', 10), 'React');
  // The result is always exactly maxChars long.
  assert.equal(fitLabel('Framer Motion', 6), 'Frame…');
  assert.equal(fitLabel('Framer Motion', 6).length, 6);
  assert.equal(fitLabel('', 5), '');
});

test('stageAt reports the step the packet is crossing', () => {
  const g = buildFlowGeometry(['A', 'B', 'C'], TONES);
  assert.equal(stageAt(g.nodes[0].cx, g.nodes), 0);
  assert.equal(stageAt(g.nodes[1].cx, g.nodes), 1);
  assert.equal(stageAt(g.nodes[2].cx, g.nodes), 2);
});

test('stageAt changes at the midpoint between two nodes', () => {
  const g = buildFlowGeometry(['A', 'B'], TONES);
  const midpoint = (g.nodes[0].cx + g.nodes[1].cx) / 2;
  assert.equal(stageAt(midpoint - 1, g.nodes), 0);
  assert.equal(stageAt(midpoint + 1, g.nodes), 1);
});

test('stageAt is safe with no nodes', () => {
  assert.equal(stageAt(100, []), 0);
});
