const image = new Image();
image.src = '../../assets/art/tifa-2.webp';

const canvas = document.querySelector('#physics-canvas');
const stage = document.querySelector('#stage');
const intensity = document.querySelector('#intensity');
const intensityValue = document.querySelector('#intensity-value');
const pauseButton = document.querySelector('#pause');
const mapsButton = document.querySelector('#show-maps');
const status = document.querySelector('#status');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true });
const sides = [
  { phase: 0, x: 0, y: 0, vx: 0, vy: 0, kick: 0, mask: null, height: null },
  { phase: 2.1, x: 0, y: 0, vx: 0, vy: 0, kick: 0, mask: null, height: null },
];
let uniforms;
let paused = reducedMotion.matches;
let lastTime = 0;
let pointerKick = 0;

function textureFromCanvas(source) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  return texture;
}

function makeShape(path, center, radiusX, radiusY, direction) {
  const map = document.createElement('canvas');
  map.width = canvas.width;
  map.height = canvas.height;
  const ctx = map.getContext('2d');
  ctx.scale(map.width, map.height);
  ctx.beginPath();
  path(ctx);
  ctx.fillStyle = '#fff';
  ctx.fill();

  const height = document.createElement('canvas');
  height.width = canvas.width;
  height.height = canvas.height;
  const hctx = height.getContext('2d');
  hctx.scale(height.width, height.height);
  const gradient = hctx.createRadialGradient(center[0], center[1], 0, center[0], center[1], radiusX);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(.42, '#b6b6b6');
  gradient.addColorStop(1, '#000000');
  hctx.save();
  hctx.translate(center[0], center[1]);
  hctx.scale(1, radiusY / radiusX);
  hctx.translate(-center[0], -center[1]);
  hctx.fillStyle = gradient;
  hctx.fillRect(center[0] - radiusX, center[1] - radiusY, radiusX * 2, radiusY * 2);
  hctx.restore();
  hctx.globalCompositeOperation = 'destination-in';
  hctx.beginPath();
  path(hctx);
  hctx.fillStyle = '#fff';
  hctx.fill();
  return { mask: textureFromCanvas(map), height: textureFromCanvas(height), direction };
}

function compile(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
  return shader;
}

function setup(imageTexture, left, right) {
  const vertex = compile(gl.VERTEX_SHADER, `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_uv = vec2((a_position.x + 1.0) * 0.5, 1.0 - (a_position.y + 1.0) * 0.5);
    }
  `);
  const fragment = compile(gl.FRAGMENT_SHADER, `
    precision mediump float;
    varying vec2 v_uv;
    uniform sampler2D u_image;
    uniform sampler2D u_mask_left;
    uniform sampler2D u_mask_right;
    uniform sampler2D u_height_left;
    uniform sampler2D u_height_right;
    uniform vec2 u_motion_left;
    uniform vec2 u_motion_right;
    uniform float u_amount;
    uniform vec2 u_texel;
    vec2 surfaceNormal(sampler2D hmap, vec2 uv) {
      float l = texture2D(hmap, uv - vec2(u_texel.x, 0.0)).r;
      float r = texture2D(hmap, uv + vec2(u_texel.x, 0.0)).r;
      float t = texture2D(hmap, uv - vec2(0.0, u_texel.y)).r;
      float b = texture2D(hmap, uv + vec2(0.0, u_texel.y)).r;
      return normalize(vec3(l - r, t - b, 0.14)).xy;
    }
    void main() {
      vec4 original = texture2D(u_image, v_uv);
      float ml = texture2D(u_mask_left, v_uv).a;
      float mr = texture2D(u_mask_right, v_uv).a;
      float hl = texture2D(u_height_left, v_uv).r;
      float hr = texture2D(u_height_right, v_uv).r;
      vec2 nl = surfaceNormal(u_height_left, v_uv);
      vec2 nr = surfaceNormal(u_height_right, v_uv);
      vec2 uvL = v_uv + vec2(nl.x * u_motion_left.x, nl.y * u_motion_left.y) * u_amount * u_texel * 840.0 * hl;
      vec2 uvR = v_uv + vec2(nr.x * u_motion_right.x, nr.y * u_motion_right.y) * u_amount * u_texel * 840.0 * hr;
      vec4 movedLeft = texture2D(u_image, clamp(uvL, 0.001, 0.999));
      vec4 movedRight = texture2D(u_image, clamp(uvR, 0.001, 0.999));
      vec4 color = mix(original, movedLeft, ml * 0.82);
      color = mix(color, movedRight, mr * 0.82);
      gl_FragColor = color;
    }
  `);
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const textureUnits = [
    ['u_image', imageTexture], ['u_mask_left', left.mask], ['u_mask_right', right.mask],
    ['u_height_left', left.height], ['u_height_right', right.height],
  ];
  textureUnits.forEach(([name, texture], unit) => {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(gl.getUniformLocation(program, name), unit);
  });
  uniforms = {
    amount: gl.getUniformLocation(program, 'u_amount'),
    texel: gl.getUniformLocation(program, 'u_texel'),
    left: gl.getUniformLocation(program, 'u_motion_left'),
    right: gl.getUniformLocation(program, 'u_motion_right'),
  };
  gl.uniform2f(uniforms.texel, 1 / canvas.width, 1 / canvas.height);
  gl.clearColor(0, 0, 0, 0);
}

function ellipsePath(ctx, points) {
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i += 1) ctx.bezierCurveTo(...points[i]);
  ctx.closePath();
}

function createMaps() {
  const left = makeShape((ctx) => ellipsePath(ctx, [
    [.548, .399], [.529, .411, .521, .432, .533, .453], [.543, .473, .568, .486, .588, .482], [.598, .469, .597, .445, .594, .425], [.59, .408, .573, .398, .548, .399],
  ]), [.563, .445], .058, .043, 1);
  const right = makeShape((ctx) => ellipsePath(ctx, [
    [.626, .385], [.659, .365, .713, .368, .754, .39], [.789, .408, .806, .432, .798, .457], [.79, .481, .752, .496, .714, .488], [.672, .48, .641, .455, .628, .426],
  ]), [.71, .431], .078, .052, -1);
  return { left, right };
}

function render(time) {
  if (!gl || !uniforms) return;
  const elapsed = Math.min(.04, Math.max(0, (time - lastTime) / 1000));
  lastTime = time;
  if (!paused && !reducedMotion.matches) {
    sides.forEach((side, index) => {
      const drive = Math.sin(time * .00155 + side.phase) * .18 + pointerKick * (index === 0 ? .72 : -.58);
      side.vy += (drive - side.y * 8.4 - side.vy * 3.2) * elapsed;
      side.vx += ((Math.cos(time * .00115 + side.phase) * .025) - side.x * 7.7 - side.vx * 3.4) * elapsed;
      side.x = Math.max(-.24, Math.min(.24, side.x + side.vx * elapsed));
      side.y = Math.max(-.28, Math.min(.28, side.y + side.vy * elapsed));
    });
    pointerKick *= Math.exp(-elapsed * 2.5);
  }
  const amount = Number(intensity.value) / 100;
  gl.uniform1f(uniforms.amount, amount);
  gl.uniform2f(uniforms.left, sides[0].x, sides[0].y);
  gl.uniform2f(uniforms.right, sides[1].x, sides[1].y);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  requestAnimationFrame(render);
}

function start() {
  if (!gl) {
    status.textContent = 'WebGL indisponível neste navegador; mostrando a arte estática.';
    canvas.hidden = true;
    return;
  }
  try {
    const { left, right } = createMaps();
    setup(textureFromCanvas(image), left, right);
    document.querySelector('.demo__fallback').hidden = true;
    requestAnimationFrame(render);
  } catch (error) {
    status.textContent = 'Não consegui iniciar a simulação; mostrando a arte estática.';
    console.error('Tifa physics experiment:', error);
    canvas.hidden = true;
  }
}

image.addEventListener('load', start, { once: true });
image.addEventListener('error', () => { status.textContent = 'A arte não carregou; confira se o preview foi iniciado na raiz do projeto.'; }, { once: true });

intensity.addEventListener('input', () => {
  const value = Number(intensity.value);
  intensityValue.value = value < 35 ? 'Sutil' : value < 70 ? 'Visível' : 'Exagerado';
});

pauseButton.addEventListener('click', () => {
  paused = !paused;
  pauseButton.textContent = paused ? 'Retomar' : 'Pausar';
  pauseButton.setAttribute('aria-pressed', String(paused));
  status.textContent = paused ? 'Simulação pausada.' : 'Dois lados, dois pequenos balanços.';
  if (paused) {
    sides.forEach((side) => { side.x = 0; side.y = 0; side.vx = 0; side.vy = 0; });
  }
});

mapsButton.addEventListener('click', () => {
  const visible = stage.classList.toggle('maps-visible');
  mapsButton.textContent = visible ? 'Ocultar mapas' : 'Ver mapas';
  mapsButton.setAttribute('aria-pressed', String(visible));
  status.textContent = visible ? 'Duas áreas independentes, cada uma com seu mapa de altura.' : 'Dois lados, dois pequenos balanços.';
});

stage.addEventListener('pointermove', (event) => {
  if (event.pointerType === 'touch' || reducedMotion.matches) return;
  const bounds = stage.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;
  if (x > .34 && x < .72 && y > .38 && y < .52) pointerKick = Math.min(.8, pointerKick + .16);
}, { passive: true });

reducedMotion.addEventListener('change', () => {
  paused = reducedMotion.matches;
  if (!paused) requestAnimationFrame(render);
});
