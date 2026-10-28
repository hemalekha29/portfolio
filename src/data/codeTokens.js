/**
 * The token pool for the Living Code Stream.
 *
 * Derived from the real project and skill data rather than hard-coded, so the
 * fragments in the stream are the technologies actually used in the work —
 * the stream stays in step with the portfolio automatically.
 */

import { projects } from './projects.jsx';
import { allSkills } from './skills.jsx';
import { buildTokenPool } from '../utils/tokenPool.js';

/** Code symbols, mixed in for texture alongside the technology names. */
const SYMBOLS = [
  '{}', '=>', '()', '</>', 'const', '[]', 'async', 'await', 'req', 'res',
];

/** Every technology named in the project tags and the skill list. */
export const technologies = buildTokenPool({
  projectTags: projects.flatMap((project) => project.tags || []),
  skillNames: allSkills.map((skill) => skill.name),
});

/** The full token pool: real technologies first, then code symbols. */
export const codeTokens = buildTokenPool({
  projectTags: projects.flatMap((project) => project.tags || []),
  skillNames: allSkills.map((skill) => skill.name),
  symbols: SYMBOLS,
});

export default codeTokens;
