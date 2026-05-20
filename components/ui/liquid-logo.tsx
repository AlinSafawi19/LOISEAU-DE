"use client";

import { useEffect, useRef } from "react";
import type React from "react";

const VS = `
attribute vec2 a;
varying vec2 v;
void main() {
  gl_Position = vec4(a, 0.0, 1.0);
  v = vec2(a.x * 0.5 + 0.5, 0.5 - a.y * 0.5);
}`;

// Noise turbulence activated by cursor proximity.
// Every pixel in the cursor region moves in a different noise-driven direction
// so no uniform pump/bulge shape is visible — only organic image distortion.
const FS = `
precision mediump float;
uniform sampler2D u_tex;
uniform vec2  u_mouse;
uniform vec2  u_vel;
uniform float u_press;
uniform float u_dist;
uniform float u_radius;
uniform vec2  u_cover;
uniform float u_aspect;
uniform float u_idle;
uniform float u_time;
uniform float u_chroma;
varying vec2 v;

float h21(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vn(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(h21(i),             h21(i + vec2(1.0, 0.0)), f.x),
    mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

void main() {
  // Gaussian confined to hoverRadius — prevents whole-image wiggle
  float d = length(vec2((v.x - u_mouse.x) * u_aspect, v.y - u_mouse.y));
  float strength = u_press * exp(-d * d / (u_radius * u_radius));

  // Per-pixel noise turbulence: each pixel moves differently → no pump shape
  vec2 flow = u_vel * 0.35;
  float n1 = vn(v * 6.0 + flow + vec2( u_time * 0.20,  u_time * 0.15)) * 2.0 - 1.0;
  float n2 = vn(v * 5.5 - flow + vec2( u_time * 0.17,  u_time * 0.22) + 3.7) * 2.0 - 1.0;
  vec2 offset = vec2(n1, n2) * strength * u_dist;

  // Idle noise
  float n3 = vn(v * 2.5 + vec2( u_time * 0.13,  u_time * 0.09)) * 2.0 - 1.0;
  float n4 = vn(v * 2.2 + vec2(-u_time * 0.11,  u_time * 0.14) + 3.7) * 2.0 - 1.0;
  offset += vec2(n3, n4) * u_idle * 0.018;

  vec2 uv = (v + offset - 0.5) / u_cover + 0.5;

  if (u_chroma > 0.5) {
    float ca = length(offset) * 10.0;
    vec2 cd = length(offset) > 0.001 ? normalize(offset) : vec2(1.0, 0.0);
    gl_FragColor = vec4(
      texture2D(u_tex, uv + cd * ca * 0.006).r,
      texture2D(u_tex, uv).g,
      texture2D(u_tex, uv - cd * ca * 0.006).b,
      texture2D(u_tex, uv).a
    );
  } else {
    gl_FragColor = texture2D(u_tex, uv);
  }
}`;

interface LiquidLogoProps {
  image?: string;
  fit?: "cover" | "contain";
  distortionStrength?: number;
  hoverRadius?: number;
  decayTime?: number;
  useChromaColors?: boolean;
  idleEnabled?: boolean;
  idleStrength?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function LiquidLogo({
  image = "",
  fit = "cover",
  distortionStrength = 0.06,
  hoverRadius = 0.18,
  decayTime = 1400,
  useChromaColors = false,
  idleEnabled = false,
  idleStrength = 1,
  style,
  className = "",
}: LiquidLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const mkShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aLoc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

    const U = {
      mouse:  gl.getUniformLocation(prog, "u_mouse"),
      vel:    gl.getUniformLocation(prog, "u_vel"),
      press:  gl.getUniformLocation(prog, "u_press"),
      dist:   gl.getUniformLocation(prog, "u_dist"),
      radius: gl.getUniformLocation(prog, "u_radius"),
      cover:  gl.getUniformLocation(prog, "u_cover"),
      aspect: gl.getUniformLocation(prog, "u_aspect"),
      idle:   gl.getUniformLocation(prog, "u_idle"),
      time:   gl.getUniformLocation(prog, "u_time"),
      chroma: gl.getUniformLocation(prog, "u_chroma"),
    };
    gl.uniform1f(U.dist,   distortionStrength);
    gl.uniform1f(U.radius, hoverRadius);
    gl.uniform1f(U.chroma, useChromaColors ? 1.0 : 0.0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let cover = { x: 1, y: 1 };
    // raw = actual cursor, smooth = lerped each frame → eliminates discrete jump circles
    let rawMouse  = { x: 0.5, y: 0.5 };
    let smooth    = { x: 0.5, y: 0.5 };
    let springVel = { x: 0, y: 0 };
    let vel       = { x: 0, y: 0 };
    let lastMove  = -Infinity;
    let raf = 0;
    let imgW = 1, imgH = 1, ready = false;
    const t0 = performance.now();

    const updateCover = () => {
      const cAR = canvas.width / canvas.height;
      const iAR = imgW / imgH;
      cover = fit === "cover"
        ? (cAR > iAR ? { x: 1, y: cAR / iAR } : { x: iAR / cAR, y: 1 })
        : (cAR > iAR ? { x: iAR / cAR, y: 1 } : { x: 1, y: cAR / iAR });
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (ready) updateCover();
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const now = performance.now();

      // Spring physics — force scales with distance so it always follows the cursor,
      // but damping keeps motion slow and smooth (no lerp "stuck at center" problem).
      const prevX = smooth.x, prevY = smooth.y;
      springVel.x = springVel.x * 0.82 + (rawMouse.x - smooth.x) * 0.018;
      springVel.y = springVel.y * 0.82 + (rawMouse.y - smooth.y) * 0.018;
      smooth.x += springVel.x;
      smooth.y += springVel.y;

      // Derive velocity direction from smooth delta
      const dx = smooth.x - prevX, dy = smooth.y - prevY;
      const spd = Math.sqrt(dx * dx + dy * dy);
      if (spd > 0.00005) { vel.x = dx / spd; vel.y = dy / spd; }

      // Fade out on fast movement — springVel magnitude reflects raw cursor speed
      const springSpeed = Math.sqrt(springVel.x * springVel.x + springVel.y * springVel.y);
      const speedFade = Math.max(0, 1 - springSpeed * 45);
      const press = Math.max(0, 1 - (now - lastMove) / decayTime) * speedFade;
      const idleRamp = Math.max(0, Math.min(1, (now - lastMove - 1200) / 1200));

      gl.uniform2f(U.mouse,  smooth.x, smooth.y);
      gl.uniform2f(U.vel,    vel.x, vel.y);
      gl.uniform1f(U.press,  press);
      gl.uniform2f(U.cover,  cover.x, cover.y);
      gl.uniform1f(U.aspect, canvas.width / canvas.height);
      gl.uniform1f(U.idle,   idleEnabled ? idleRamp * idleStrength : 0);
      gl.uniform1f(U.time,   (now - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    if (image) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        imgW = img.naturalWidth; imgH = img.naturalHeight;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        ready = true;
        resize();
        loop();
      };
      img.src = image;
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      rawMouse = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
      lastMove = performance.now();
    };

    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
      else if (ready && raf === 0) loop();
    };

    canvas.addEventListener("mousemove", onMove);
    document.addEventListener("visibilitychange", onVisibility);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteTexture(tex);
      gl.deleteProgram(prog);
    };
  }, [image, fit, distortionStrength, hoverRadius, decayTime, useChromaColors, idleEnabled, idleStrength]);

  return (
    <canvas
      ref={canvasRef}
      style={style}
      className={`block w-full h-full ${className}`}
    />
  );
}
