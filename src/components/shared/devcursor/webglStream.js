/**
 * WebGL2 renderer for the Living Code Stream.
 *
 * Every visible syntax fragment is one instance of a single unit quad. All
 * instances are uploaded to one interleaved buffer and drawn in a single
 * `drawArraysInstanced` call, so the whole stream costs one draw call per
 * frame regardless of how many fragments are alive.
 *
 * Returns null if WebGL2 is unavailable — the caller then falls back to the
 * 2D canvas renderer.
 */

const VERTEX_SHADER = `#version 300 es
precision highp float;

layout(location = 0) in vec2 a_position;   // unit quad, -0.5 .. 0.5
layout(location = 1) in vec2 a_offset;     // centre, in CSS pixels
layout(location = 2) in vec2 a_size;       // width & height, in CSS pixels
layout(location = 3) in float a_alpha;     // 0 .. 1
layout(location = 4) in vec4 a_uv;         // atlas cell
layout(location = 5) in vec3 a_color;      // rgb 0..1

uniform vec2 u_resolution;

out vec2 v_uv;
out float v_alpha;
out vec3 v_color;

void main() {
  vec2 px = a_position * a_size + a_offset;
  vec2 clip = (px / u_resolution) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);

  v_uv = mix(a_uv.xy, a_uv.zw, a_position + 0.5);
  v_alpha = a_alpha;
  v_color = a_color;
}`;

const FRAGMENT_SHADER = `#version 300 es
precision mediump float;

in vec2 v_uv;
in float v_alpha;
in vec3 v_color;

uniform sampler2D u_atlas;

out vec4 out_color;

void main() {
  float coverage = texture(u_atlas, v_uv).a;
  if (coverage < 0.02) discard;
  out_color = vec4(v_color, coverage * v_alpha);
}`;

/** Floats per instance: offset(2) size(2) alpha(1) uv(4) colour(3). */
const FLOATS_PER_INSTANCE = 12;
const MAX_INSTANCES = 256;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile failed: ${log}`);
  }
  return shader;
}

function createProgram(gl) {
  const program = gl.createProgram();
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link failed: ${log}`);
  }
  return program;
}

/** '#00d4ff' -> [0, 1, 1] */
function hexToRgb(hex) {
  const value = hex.replace('#', '');
  return [
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255,
  ];
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{canvas: HTMLCanvasElement, rects: number[][], aspects: number[]}} atlas
 * @returns {{resize: Function, render: Function, destroy: Function} | null}
 */
export function createWebGLStream(canvas, atlas) {
  const gl = canvas.getContext('webgl2', {
    alpha: true,
    antialias: true,
    premultipliedAlpha: false,
    depth: false,
    stencil: false,
  });
  if (!gl) return null;

  let program;
  try {
    program = createProgram(gl);
  } catch {
    return null;
  }

  gl.useProgram(program);

  /* ── Unit quad ── */
  const quadBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -0.5, -0.5,
      0.5, -0.5,
      -0.5, 0.5,
      0.5, 0.5,
    ]),
    gl.STATIC_DRAW,
  );
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  /* ── Per-instance data ── */
  const instanceData = new Float32Array(MAX_INSTANCES * FLOATS_PER_INSTANCE);
  const instanceBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, instanceData.byteLength, gl.DYNAMIC_DRAW);

  const stride = FLOATS_PER_INSTANCE * 4;
  const attributes = [
    { location: 1, size: 2, offset: 0 },   // offset
    { location: 2, size: 2, offset: 8 },   // size
    { location: 3, size: 1, offset: 16 },  // alpha
    { location: 4, size: 4, offset: 20 },  // uv
    { location: 5, size: 3, offset: 36 },  // colour
  ];

  attributes.forEach(({ location, size, offset }) => {
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, stride, offset);
    gl.vertexAttribDivisor(location, 1);
  });

  /* ── Atlas texture ── */
  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    atlas.canvas,
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.generateMipmap(gl.TEXTURE_2D);

  const uResolution = gl.getUniformLocation(program, 'u_resolution');
  const uAtlas = gl.getUniformLocation(program, 'u_atlas');
  gl.uniform1i(uAtlas, 0);

  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.disable(gl.DEPTH_TEST);

  /** Pre-converted colours, so the hot loop never parses hex. */
  const colourCache = new Map();
  const toRgb = (hex) => {
    if (!colourCache.has(hex)) colourCache.set(hex, hexToRgb(hex));
    return colourCache.get(hex);
  };

  return {
    resize(width, height, dpr) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, width, height);
    },

    /**
     * @param {Array<{x:number,y:number,size:number,alpha:number,token:number,color:string}>} fragments
     *   `size` is the glyph height in CSS pixels.
     */
    render(fragments) {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const count = Math.min(fragments.length, MAX_INSTANCES);
      if (count === 0) return;

      for (let i = 0; i < count; i += 1) {
        const f = fragments[i];
        const uv = atlas.rects[f.token] || atlas.rects[0];
        const aspect = atlas.aspects[f.token] || 1;
        const rgb = toRgb(f.color);
        const base = i * FLOATS_PER_INSTANCE;

        instanceData[base] = f.x;
        instanceData[base + 1] = f.y;
        // The cell is wider than the glyph it holds, so the quad is sized from
        // the token's own aspect ratio to avoid distorting it.
        instanceData[base + 2] = f.size * aspect;
        instanceData[base + 3] = f.size;
        instanceData[base + 4] = f.alpha;
        instanceData[base + 5] = uv[0];
        instanceData[base + 6] = uv[1];
        instanceData[base + 7] = uv[2];
        instanceData[base + 8] = uv[3];
        instanceData[base + 9] = rgb[0];
        instanceData[base + 10] = rgb[1];
        instanceData[base + 11] = rgb[2];
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, instanceData, 0, count * FLOATS_PER_INSTANCE);

      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count);
    },

    destroy() {
      gl.deleteBuffer(quadBuffer);
      gl.deleteBuffer(instanceBuffer);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
    },
  };
}
