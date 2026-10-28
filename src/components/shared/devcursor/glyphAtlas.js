/**
 * Runtime glyph atlas for the Living Code Stream.
 *
 * WebGL can't draw text directly, so each syntax token is rendered once into
 * an offscreen 2D canvas, that canvas is uploaded as a texture, and every
 * fragment samples its own cell. The whole stream then draws in a single
 * instanced draw call.
 *
 * Tokens vary in width — "{}" is narrow, "useState" is wide — so the layout
 * packs each token into a measured cell rather than a fixed grid. A fixed
 * grid would let long tokens bleed into their neighbours' cells.
 *
 * The atlas is padded to a power-of-two size so mipmaps work, which matters
 * because the glyphs are drawn at a fraction of their atlas size.
 */

const FONT_STACK = "'Fira Code', ui-monospace, monospace";
/* Baked close to the size the glyphs are actually drawn at (11-16px), so
   the mip chain has a crisp level to sample instead of a heavily
   minified 40px raster. */
const FONT_SIZE = 22;
const PADDING = 3;
const ATLAS_WIDTH = 512;

const nextPowerOfTwo = (value) => {
  let pow = 1;
  while (pow < value) pow *= 2;
  return pow;
};

/**
 * Shelf-pack measured cells into rows.
 *
 * Every cell in a row shares one baseline; the next row starts below the
 * tallest cell of the last. Pure, so it can be unit tested.
 *
 * @param {Array<{token: string, width: number, height: number}>} cells
 * @param {number} atlasWidth
 * @returns {{cells: Array, height: number}}
 */
export function packGlyphs(cells, atlasWidth = ATLAS_WIDTH) {
  const rows = [];
  let row = { y: 0, height: 0, used: 0 };

  cells.forEach((cell) => {
    if (row.used + cell.width > atlasWidth && row.used > 0) {
      rows.push(row);
      row = { y: row.y + row.height, height: 0, used: 0 };
    }
    cell.x = row.used;
    cell.y = row.y;
    row.used += cell.width;
    row.height = Math.max(row.height, cell.height);
  });
  if (row.used > 0) rows.push(row);

  const height = rows.reduce((max, r) => Math.max(max, r.y + r.height), 0);
  return { cells, height };
}

/**
 * Build the atlas for a list of tokens.
 *
 * @param {string[]} tokens
 * @returns {{
 *   canvas: HTMLCanvasElement,
 *   rects: number[][],
 *   aspects: number[],
 *   width: number,
 *   height: number,
 * }}
 *   `rects` holds [u0, v0, u1, v1] texture coordinates per token; `aspects`
 *   holds each token's width/height ratio so the renderer can draw an
 *   undistorted quad.
 */
export function buildGlyphAtlas(tokens) {
  const measure = document.createElement('canvas').getContext('2d');
  measure.font = `600 ${FONT_SIZE}px ${FONT_STACK}`;

  // Measure every token and work out the cell it needs.
  const measured = tokens.map((token) => {
    const width = Math.ceil(measure.measureText(token).width) + PADDING * 2;
    return { token, width, height: FONT_SIZE + PADDING * 2 };
  });

  const { cells, height: contentHeight } = packGlyphs(measured);

  const canvas = document.createElement('canvas');
  canvas.width = ATLAS_WIDTH;
  canvas.height = nextPowerOfTwo(contentHeight);

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `600 ${FONT_SIZE}px ${FONT_STACK}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';

  const rects = [];
  const aspects = [];

  cells.forEach((cell) => {
    ctx.fillText(cell.token, cell.x + cell.width / 2, cell.y + cell.height / 2);
    rects.push([
      cell.x / canvas.width,
      cell.y / canvas.height,
      (cell.x + cell.width) / canvas.width,
      (cell.y + cell.height) / canvas.height,
    ]);
    aspects.push(cell.width / cell.height);
  });

  return { canvas, rects, aspects, width: canvas.width, height: canvas.height };
}

/**
 * Wait for the webfont to be ready before the atlas is rasterised, otherwise
 * the tokens would be baked with the fallback monospace face.
 */
export async function waitForFonts() {
  if (!document.fonts || !document.fonts.ready) return;
  try {
    await document.fonts.load(`600 ${FONT_SIZE}px ${FONT_STACK}`);
    await document.fonts.ready;
  } catch {
    /* A failed font load is not fatal — the fallback face is used. */
  }
}
