import { useEffect, useMemo, useRef, useState } from 'react';
import { buildGlyphAtlas, waitForFonts } from './glyphAtlas.js';
import { createWebGLStream } from './webglStream.js';
import { createCanvasStream } from './canvasStream.js';
import { codeTokens } from '../../../data/codeTokens.js';
import { techColor } from '../../../data/techColors.js';
import { buildFlowGeometry, stageAt } from '../../../utils/flowGeometry.js';
import './DevCursor.css';

/**
 * "The Compiler" — a signature cursor for a MERN developer's portfolio.
 *
 * Three layers, one idea:
 *
 *   1. The glyph — a bracketed caret `[›]`. The closing bracket types itself
 *      in when the pointer enters a developer-themed zone, so the cursor
 *      visibly "completes the code" where it matters.
 *   2. The Living Code Stream — syntax fragments written onto a GPU-rendered
 *      layer behind the pointer, drifting with the direction of travel and
 *      dissolving. Drawn with WebGL2 instancing (one draw call for the whole
 *      stream) from a runtime-generated glyph atlas, falling back to a 2D
 *      canvas where WebGL2 is unavailable.
 *   3. The MERN Architecture Navigator — a compact flow diagram that
 *      materialises over developer zones, with a data packet travelling
 *      React → Express → Node → MongoDB.
 *
 * Everything runs on a single requestAnimationFrame loop driven by refs, so
 * pointer movement never triggers a React render.
 */

/* Syntax fragments used by the code stream. These are the real
   technologies from the project and skill data, so the stream always shows
   the stack the portfolio actually describes. */
const TOKENS = codeTokens;

/* Fragment tints — mostly cyan, with occasional green and violet. */
const FRAGMENT_COLORS = ['#00d4ff', '#00d4ff', '#06ffa5', '#7c3aed', '#e2e8f0'];

/** Hard ceiling on live fragments, so a fast flick cannot flood the buffer. */
const MAX_FRAGMENTS = 220;
const TRAVEL_PER_FRAGMENT = 26;

/** Elements that should trigger the architecture navigator. */
const ZONE_SELECTOR = '[data-mern-zone]';

/** Text inputs keep their native caret. */
const TEXT_FIELD_SELECTOR = 'input, textarea, select, [contenteditable="true"]';

const isTextField = (node) =>
  Boolean(node && node.closest && node.closest(TEXT_FIELD_SELECTOR));

/** Probe for WebGL2 on a throwaway canvas, so the real canvas can still
    fall back to a 2D context if WebGL is missing. */
function hasWebGL2() {
  try {
    const probe = document.createElement('canvas');
    const gl = probe.getContext('webgl2');
    if (!gl) return false;
    const lose = gl.getExtension('WEBGL_lose_context');
    if (lose) lose.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function DevCursor() {
  const glyphRef = useRef(null);
  const navRef = useRef(null);
  const packetRef = useRef(null);
  const pathRef = useRef(null);
  const labelRefs = useRef([]);

  /** Where the pointer actually is. */
  const pointer = useRef({ x: -200, y: -200, inside: false, target: null });
  /** Where the glyph currently is — lags the pointer slightly. */
  const pos = useRef({ x: -200, y: -200 });
  /** Live code-stream fragments. */
  const fragments = useRef([]);
  /** Distance travelled since the last fragment was emitted. */
  const travel = useRef(0);
  /** Index of the last token used, so the same one rarely repeats. */
  const lastToken = useRef(-1);
  /** The developer zone the pointer is currently inside, if any. */
  const zone = useRef(null);
  /** Navigator animation state. */
  const flow = useRef({ open: false, phase: 0, length: 1, active: -1 });
  /** The active stream renderer (WebGL, or the 2D fallback). */
  const renderer = useRef(null);
  /** The technology stack of the zone currently under the pointer. */
  const [stack, setStack] = useState([]);

  const [enabled, setEnabled] = useState(false);

  /* The diagram is built from the hovered element's own technology list. */
  const geometry = useMemo(
    () =>
      buildFlowGeometry(
        stack.map((item) => item.label),
        stack.map((item) => item.tone),
      ),
    [stack],
  );
  const geometryRef = useRef(geometry);
  useEffect(() => {
    geometryRef.current = geometry;
  }, [geometry]);

  /* ── Enable only for precise pointers, and never for reduced motion ── */
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      const ok = finePointer.matches && !reduceMotion.matches;
      setEnabled(ok);
      document.documentElement.classList.toggle('dev-cursor', ok);
    };
    sync();

    finePointer.addEventListener('change', sync);
    reduceMotion.addEventListener('change', sync);
    return () => {
      finePointer.removeEventListener('change', sync);
      reduceMotion.removeEventListener('change', sync);
      document.documentElement.classList.remove('dev-cursor');
    };
  }, []);

  /* ── The single animation loop ── */
  useEffect(() => {
    if (!enabled) return undefined;

    const glyph = glyphRef.current;
    const nav = navRef.current;
    const packet = packetRef.current;
    const path = pathRef.current;
    if (!glyph || !nav || !packet || !path) return undefined;

    /* The stream canvas is created imperatively: a canvas can only ever hold
       one context type, and we want to probe for WebGL2 first. */
    let canvas = document.createElement('canvas');

    const attachCanvas = () => {
      canvas.className = 'dev-stream';
      canvas.setAttribute('aria-hidden', 'true');
      document.body.appendChild(canvas);
    };
    attachCanvas();

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cancelled = false;

    const applySize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (renderer.current) renderer.current.resize(width, height, dpr);
    };

    /* Build the atlas once the webfont is ready, then pick a renderer. */
    (async () => {
      await waitForFonts();
      if (cancelled) return;

      const atlas = buildGlyphAtlas(TOKENS);
      const useWebGL = hasWebGL2();

      let stream = useWebGL ? createWebGLStream(canvas, atlas) : null;

      if (!stream) {
        // The canvas may already be bound to a WebGL context, which would
        // make a 2D context impossible. Start again with a clean canvas.
        canvas.remove();
        canvas = document.createElement('canvas');
        attachCanvas();
        stream = createCanvasStream(canvas);
      }

      renderer.current = stream;
      renderer.current.resize(width, height, dpr);
    })();

    flow.current.length = path.getTotalLength() || 1;

    const onResize = () => applySize();
    window.addEventListener('resize', onResize);

    let raf = 0;
    let last = performance.now();

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(48, now - last);
      last = now;

      const p = pointer.current;

      /* ── Follow the pointer ── */
      const prevX = pos.current.x;
      const prevY = pos.current.y;
      // Slight easing gives the trail something to lag behind.
      pos.current.x += (p.x - pos.current.x) * 0.45;
      pos.current.y += (p.y - pos.current.y) * 0.45;

      const dx = pos.current.x - prevX;
      const dy = pos.current.y - prevY;
      const speed = Math.hypot(dx, dy);

      /* ── Living Code Stream ── */
      if (p.inside) {
        travel.current += speed;
        while (travel.current >= TRAVEL_PER_FRAGMENT) {
          travel.current -= TRAVEL_PER_FRAGMENT;
          if (fragments.current.length < MAX_FRAGMENTS) {
            // Avoid repeating the previous token back-to-back.
            let index = Math.floor(Math.random() * TOKENS.length);
            if (index === lastToken.current) index = (index + 1) % TOKENS.length;
            lastToken.current = index;

            const dir = speed > 0.01 ? { x: dx / speed, y: dy / speed } : { x: 0, y: -1 };
            const push = Math.min(0.5, speed / 26);

            fragments.current.push({
              x: pos.current.x + (Math.random() - 0.5) * 16,
              y: pos.current.y + (Math.random() - 0.5) * 16,
              vx: dir.x * push + (Math.random() - 0.5) * 0.22,
              vy: dir.y * push + (Math.random() - 0.5) * 0.22,
              life: 1,
              ttl: 520 + Math.random() * 420,
              token: index,
              text: TOKENS[index],
              color: FRAGMENT_COLORS[(Math.random() * FRAGMENT_COLORS.length) | 0],
              size: 12 + Math.random() * 4,
            });
          }
        }
      }

      /* Update the fragments, then hand them to the renderer. */
      const live = fragments.current;
      for (let i = live.length - 1; i >= 0; i -= 1) {
        const f = live[i];
        f.life -= dt / f.ttl;
        if (f.life <= 0) {
          live.splice(i, 1);
          continue;
        }
        f.vx *= 0.94;
        f.vy = f.vy * 0.94 + 0.012;
        f.x += f.vx;
        f.y += f.vy;
        f.alpha = Math.max(0, f.life);
      }

      if (renderer.current) renderer.current.render(live);

      /* ── The glyph ── */
      const overField = isTextField(p.target);
      glyph.style.transform =
        `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-2px, -2px)`;
      glyph.classList.toggle('is-typing', Boolean(zone.current));
      glyph.classList.toggle('is-hidden', !p.inside || overField);

      /* ── MERN Architecture Navigator ── */
      const state = flow.current;
      const shouldOpen = Boolean(zone.current) && p.inside && !overField;

      if (shouldOpen !== state.open) {
        state.open = shouldOpen;
        nav.classList.toggle('is-open', shouldOpen);
      }

      if (state.open) {
        // Place the diagram beside the pointer, flipping near the edges.
        const flipX = pos.current.x > width - (geometryRef.current.width + 30);
        const flipY = pos.current.y > height - 130;
        nav.style.transform =
          `translate3d(${pos.current.x + (flipX ? -262 : 22)}px, ` +
          `${pos.current.y + (flipY ? -96 : 24)}px, 0)`;

        // Advance the packet along the path.
        state.phase = (state.phase + dt / 4600) % 1;
        const point = path.getPointAtLength(state.phase * state.length);
        packet.setAttribute('transform', `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);

        // Which technology is the packet crossing?
        const active = stageAt(point.x, geometryRef.current.nodes);
        if (active !== state.active) {
          state.active = active;
          labelRefs.current.forEach((el, i) => {
            if (!el) return;
            const node = geometryRef.current.nodes[i];
            if (!node) return;
            el.setAttribute('fill', i === active ? node.tone : 'rgba(148,163,184,0.55)');
            el.setAttribute('font-weight', i === active ? '700' : '500');
          });
        }
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      if (renderer.current) {
        renderer.current.destroy();
        renderer.current = null;
      }
      canvas.remove();
    };
  }, [enabled]);

  /* Keep the packet's path length in step with the current stack. */
  useEffect(() => {
    const path = pathRef.current;
    if (path) flow.current.length = path.getTotalLength() || 1;
    // Force the label colours to be re-applied for the new set of nodes.
    flow.current.active = -1;
  }, [geometry]);

  /* ── Pointer listeners ── */
  useEffect(() => {
    if (!enabled) return undefined;

    const onMove = (e) => {
      const p = pointer.current;
      p.x = e.clientX;
      p.y = e.clientY;
      p.inside = true;
      p.target = e.target;
    };

    const onLeave = () => {
      pointer.current.inside = false;
      zone.current = null;
      flow.current.open = false;
    };

    /* Zone detection: pointerover bubbles, so one listener covers the whole
       document including elements added later. */
    const onOver = (e) => {
      const found = e.target.closest ? e.target.closest(ZONE_SELECTOR) : null;
      zone.current = found;

      const raw = found ? found.getAttribute('data-mern-stack') : null;
      const labels = raw ? raw.split('|').filter(Boolean) : [];
      setStack(prev => {
        if (prev.length === labels.length && prev.every((item, i) => item.label === labels[i])) {
          return prev;
        }
        return labels.map((label) => ({ label, tone: techColor(label) }));
      });
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* The glyph — a bracketed caret that completes itself in zones */}
      <svg
        ref={glyphRef}
        className="dev-glyph"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path className="glyph-bracket" d="M7 3.5 L3 3.5 L3 16.5 L7 16.5" />
          <path className="glyph-caret" d="M9.5 6.5 L13 10 L9.5 13.5" />
          <path className="glyph-close" d="M16 3.5 L18.5 3.5 L18.5 16.5 L16 16.5" />
        </g>
      </svg>

      {/* The Architecture Navigator — built from the hovered element's stack */}
      <div ref={navRef} className="dev-navigator" aria-hidden="true">
        <svg
          width={geometry.width + 12}
          height="58"
          viewBox={`0 0 ${geometry.width + 12} 58`}
        >
          <rect
            x="0"
            y="0"
            width={geometry.width + 12}
            height="56"
            rx="10"
            className="nav-panel"
          />
          <path ref={pathRef} d={geometry.path} className="nav-path" />
          {geometry.nodes.map((node, i) => (
            <circle
              key={`${node.fullLabel}-${i}`}
              cx={node.cx}
              cy={node.cy}
              r="2.6"
              className="nav-node"
              style={{ fill: node.tone }}
            />
          ))}
          <circle ref={packetRef} cx="0" cy="0" r="3.2" className="nav-packet" />
          {geometry.nodes.map((node, i) => (
            <text
              key={`label-${node.fullLabel}-${i}`}
              ref={(el) => { labelRefs.current[i] = el; }}
              x={node.cx}
              y="52"
              textAnchor="middle"
              className="nav-label"
              fontSize="7.5"
              fill="rgba(148,163,184,0.55)"
            >
              {node.label}
            </text>
          ))}
        </svg>
      </div>
    </>
  );
}
