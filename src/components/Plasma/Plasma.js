import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './Plasma.scss';

const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// Layered sine fields warped by time + pointer, mapped onto a 3-stop palette
// that fades into the page background.
const FRAGMENT = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uBg;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform float uIntensity;

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / min(uRes.x, uRes.y);
  vec2 m = (uMouse - 0.5) * vec2(uRes.x / min(uRes.x, uRes.y), uRes.y / min(uRes.x, uRes.y));
  float t = uTime * 0.12;

  // pointer gently pulls the field toward it
  float md = length(p - m);
  p += (m - p) * 0.18 * exp(-md * 2.2);

  float v = 0.0;
  v += sin(p.x * 2.4 + t * 1.3);
  v += sin((p.y * 2.1 + t) * 1.1);
  v += sin((p.x * 1.6 + p.y * 1.9 + t * 0.8) * 1.2);
  vec2 c = p + 0.6 * vec2(sin(t * 0.7), cos(t * 0.9));
  v += sin(length(c) * 3.2 - t * 1.6);
  v = v * 0.25;

  float a = 0.5 + 0.5 * sin(v * 3.14159);
  float b = 0.5 + 0.5 * cos(v * 3.14159 + t);
  vec3 col = mix(uC1, uC2, a);
  col = mix(col, uC3, b * 0.55);

  // soft ribbons + pointer glow
  float ribbon = smoothstep(0.35, 1.0, a * b + 0.25 * sin(v * 8.0 + t * 2.0));
  float glow = exp(-md * 3.0) * 0.35;
  float mask = clamp(ribbon * uIntensity + glow * uIntensity, 0.0, 1.0);

  // fade toward the edges & bottom so content stays readable
  float vignette = smoothstep(1.25, 0.2, length((uv - vec2(0.5, 0.62)) * vec2(1.1, 1.4)));
  mask *= vignette;

  gl_FragColor = vec4(mix(uBg, col, mask), 1.0);
}
`;

function cssColor(name) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const hex = raw.replace('#', '');
  const full = hex.length === 3 ? hex.split('').map((h) => h + h).join('') : hex;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return [0, 0, 0];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function readPalette() {
  const intensity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--plasma-intensity'));
  return {
    bg: cssColor('--color-bg'),
    c1: cssColor('--plasma-1'),
    c2: cssColor('--plasma-2'),
    c3: cssColor('--plasma-3'),
    intensity: Number.isNaN(intensity) ? 0.6 : intensity,
  };
}

const lerp = (a, b, t) => a + (b - a) * t;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function Plasma() {
  const canvasRef = useRef(null);
  // `target` is what the current theme wants; the render loop eases toward it
  const paletteRef = useRef(null);
  const redrawRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const target = readPalette();
    if (!paletteRef.current) {
      paletteRef.current = { target, current: JSON.parse(JSON.stringify(target)) };
    } else {
      paletteRef.current.target = target;
    }
    if (redrawRef.current) redrawRef.current();
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas && canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) return undefined;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return undefined;
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const u = (name) => gl.getUniformLocation(program, name);
    const uniforms = {
      res: u('uRes'), time: u('uTime'), mouse: u('uMouse'), bg: u('uBg'),
      c1: u('uC1'), c2: u('uC2'), c3: u('uC3'), intensity: u('uIntensity'),
    };

    const applyPalette = (snap) => {
      const palette = paletteRef.current;
      const k = snap ? 1 : 0.08;
      ['bg', 'c1', 'c2', 'c3'].forEach((key) => {
        palette.current[key] = palette.current[key].map((v, i) => lerp(v, palette.target[key][i], k));
      });
      palette.current.intensity = lerp(palette.current.intensity, palette.target.intensity, k);
      gl.uniform3fv(uniforms.bg, palette.current.bg);
      gl.uniform3fv(uniforms.c1, palette.current.c1);
      gl.uniform3fv(uniforms.c2, palette.current.c2);
      gl.uniform3fv(uniforms.c3, palette.current.c3);
      gl.uniform1f(uniforms.intensity, palette.current.intensity);
    };

    // render at reduced resolution — the effect is soft, so this is invisible and much cheaper
    const SCALE = 0.45;
    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * SCALE));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.res, canvas.width, canvas.height);
    };
    resize();

    const target = { x: 0.7, y: 0.6 };
    const mouse = { x: 0.7, y: 0.6 };
    const onMove = (e) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight;
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const start = performance.now();
    const draw = (now) => {
      applyPalette(reduceMotion);
      mouse.x += (target.x - mouse.x) * 0.04;
      mouse.y += (target.y - mouse.y) * 0.04;
      gl.uniform1f(uniforms.time, reduceMotion ? 12 : (now - start) / 1000);
      gl.uniform2f(uniforms.mouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduceMotion) frame = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    frame = requestAnimationFrame(draw);
    // the animated loop picks up palette changes on its own; the static
    // (reduced-motion) render needs an explicit redraw
    redrawRef.current = () => {
      if (reduceMotion) requestAnimationFrame(draw);
    };

    return () => {
      redrawRef.current = null;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div className="plasma" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="plasma-grain" />
      <div className="plasma-grid" />
    </div>
  );
}
