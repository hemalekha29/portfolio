/**
 * Geometry for the MERN Architecture Navigator.
 *
 * The diagram is built from whatever stack the hovered element declares, so
 * the number of steps, their labels, their brand colours and the path they
 * travel along are all derived from the project's real technology list.
 *
 * Kept pure so it can be unit tested without a DOM.
 */

/** Most steps we will ever show — beyond this the diagram gets unreadable. */
export const MAX_NODES = 5;

/** Vertical positions of the alternating steps, in SVG units. */
const ROW_BOTTOM = 38;
const ROW_TOP = 12;

/**
 * Truncate a label so it fits its run without overlapping its neighbours.
 */
export function fitLabel(label, maxChars) {
  if (!label) return '';
  if (label.length <= maxChars) return label;
  return `${label.slice(0, Math.max(1, maxChars - 1))}…`;
}

/**
 * Build the diagram geometry for a list of labelled nodes.
 *
 * @param {string[]} labels
 * @param {string[]} tones   brand colour per node, same order
 * @param {number} [maxNodes]
 * @returns {{
 *   nodes: Array<{label: string, tone: string, cx: number, cy: number, from: number, to: number}>,
 *   path: string,
 *   width: number,
 *   runWidth: number,
 * }}
 */
export function buildFlowGeometry(labels = [], tones = [], maxNodes = MAX_NODES) {
  const count = Math.min(labels.length, maxNodes);

  if (count === 0) {
    return { nodes: [], path: '', width: 0, runWidth: 0 };
  }

  // Wider runs for a short stack, tighter ones when there are more steps.
  const runWidth = count <= 4 ? 44 : 34;
  const gap = count <= 4 ? 22 : 14;
  const width = count * runWidth + (count - 1) * gap;
  const maxChars = Math.max(4, Math.floor(runWidth / 4.2));

  const nodes = labels.slice(0, count).map((label, i) => {
    const from = i * (runWidth + gap);
    return {
      label: fitLabel(label, maxChars),
      fullLabel: label,
      tone: tones[i] || '#00d4ff',
      cx: from + runWidth / 2,
      cy: i % 2 === 0 ? ROW_BOTTOM : ROW_TOP,
      from,
      to: from + runWidth,
    };
  });

  // A staircase: run along the current row, then step to the next.
  let path = `M ${nodes[0].cx} ${nodes[0].cy}`;
  for (let i = 1; i < nodes.length; i += 1) {
    path += ` H ${nodes[i].cx} V ${nodes[i].cy}`;
  }

  return { nodes, path, width, runWidth };
}

/**
 * Which step the travelling packet is currently on.
 *
 * Boundaries sit midway between consecutive node centres, so the stage
 * changes as the packet crosses the gap between two technologies.
 */
export function stageAt(x, nodes = []) {
  let stage = 0;
  for (let i = 1; i < nodes.length; i += 1) {
    const midpoint = (nodes[i - 1].cx + nodes[i].cx) / 2;
    if (x >= midpoint) stage = i;
    else break;
  }
  return stage;
}
