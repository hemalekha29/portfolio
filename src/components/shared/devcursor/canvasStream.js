/**
 * 2D canvas fallback for the Living Code Stream.
 *
 * Used when WebGL2 is unavailable. The browser rasterises canvas text on the
 * GPU anyway, so this is still a smooth path — it simply caps the fragment
 * count lower than the WebGL renderer does.
 */

const MAX_FRAGMENTS = 44;

export function createCanvasStream(canvas) {
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;

  return {
    resize(w, h, dpr) {
      width = w;
      height = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    },

    render(fragments) {
      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const count = Math.min(fragments.length, MAX_FRAGMENTS);

      for (let i = 0; i < count; i += 1) {
        const f = fragments[i];
        ctx.globalAlpha = Math.max(0, f.alpha) * 0.85;
        ctx.fillStyle = f.color;
        ctx.font = `600 ${f.size}px 'Fira Code', ui-monospace, monospace`;
        ctx.fillText(f.text, f.x, f.y);
      }

      ctx.globalAlpha = 1;
    },

    destroy() {},
  };
}
