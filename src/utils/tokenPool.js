/**
 * Token pool derivation for the Living Code Stream.
 *
 * Kept pure and separate from the data layer so it can be unit tested
 * without importing the JSX data files.
 */

/** Longest token we allow — anything longer reads as noise at stream size. */
export const MAX_TOKEN_LENGTH = 14;

/**
 * Build the stream token pool from the technologies actually used in the
 * portfolio, plus a handful of code symbols for texture.
 *
 * @param {object} options
 * @param {string[]} options.projectTags  every technology tag across the projects
 * @param {string[]} options.skillNames   every skill name
 * @param {string[]} [options.symbols]    code symbols to mix in
 * @param {number} [options.maxLength]    longest permitted token
 * @returns {string[]} de-duplicated pool, technologies first
 */
export function buildTokenPool({
  projectTags = [],
  skillNames = [],
  symbols = [],
  maxLength = MAX_TOKEN_LENGTH,
} = {}) {
  const technologies = [...new Set([...projectTags, ...skillNames])]
    .filter((name) => typeof name === 'string' && name.trim().length > 0)
    .map((name) => name.trim())
    .filter((name) => name.length <= maxLength);

  // Symbols go last so the technologies are the most likely to be seen.
  const seen = new Set(technologies);
  const extras = symbols.filter((symbol) => {
    if (seen.has(symbol)) return false;
    seen.add(symbol);
    return true;
  });

  return [...technologies, ...extras];
}
