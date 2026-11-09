const image = new Image();
image.src = '../../assets/art/tifa-2.png';

const canvas = document.querySelector('#physics-canvas');
const stage = document.querySelector('#stage');
const intensity = document.querySelector('#intensity');
const intensityValue = document.querySelector('#intensity-value');
const speed = document.querySelector('#speed');
const springControl = document.querySelector('#spring');
const dampingControl = document.querySelector('#damping');
const phaseControl = document.querySelector('#phase');
const pauseButton = document.querySelector('#pause');
const impulseButton = document.querySelector('#impulse');
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
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
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
  return {
    mask: textureFromCanvas(map),
    height: textureFromCanvas(height),
    heightData: hctx.getImageData(0, 0, height.width, height.height).data,
    direction,
  };
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
    attribute vec2 a_uv;
    attribute vec2 a_weights;
    uniform vec2 u_motion_left;
    uniform vec2 u_motion_right;
    uniform mediump float u_amount;
    varying vec2 v_uv;
    void main() {
      vec2 leftOffset = vec2(u_motion_left.x * 0.48, -u_motion_left.y * 0.55) * a_weights.x;
      vec2 rightOffset = vec2(u_motion_right.x * 0.48, -u_motion_right.y * 0.55) * a_weights.y;
      gl_Position = vec4(a_position + (leftOffset + rightOffset) * u_amount, 0.0, 1.0);
      v_uv = a_uv;
    }
  `);
  const fragment = compile(gl.FRAGMENT_SHADER, `
    precision mediump float;
    varying vec2 v_uv;
    uniform sampler2D u_image;
    uniform sampler2D u_height_left;
    uniform sampler2D u_height_right;
    uniform mediump float u_amount;
    uniform vec2 u_texel;
    vec3 surfaceNormal(sampler2D hmap, vec2 uv) {
      float l = texture2D(hmap, uv - vec2(u_texel.x, 0.0)).r;
      float r = texture2D(hmap, uv + vec2(u_texel.x, 0.0)).r;
      float t = texture2D(hmap, uv - vec2(0.0, u_texel.y)).r;
      float b = texture2D(hmap, uv + vec2(0.0, u_texel.y)).r;
      return normalize(vec3((l - r) * 18.0, (t - b) * 18.0, 0.8));
    }
    void main() {
      vec4 color = texture2D(u_image, v_uv);
      float leftHeight = texture2D(u_height_left, v_uv).r;
      float rightHeight = texture2D(u_height_right, v_uv).r;
      vec3 leftNormal = surfaceNormal(u_height_left, v_uv);
      vec3 rightNormal = surfaceNormal(u_height_right, v_uv);
      vec3 light = normalize(vec3(-0.25, 0.45, 0.86));
      float leftGlint = pow(max(dot(leftNormal, light), 0.0), 16.0) * leftHeight;
      float rightGlint = pow(max(dot(rightNormal, light), 0.0), 16.0) * rightHeight;
      color.rgb += vec3(0.18, 0.075, 0.16) * (leftGlint + rightGlint) * u_amount * 0.16 * color.a;
      gl_FragColor = color;
    }
  `);
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);

  const mesh = createMesh(left.heightData, right.heightData);
  const attributes = [
    ['a_position', mesh.positions, 2],
    ['a_uv', mesh.uvs, 2],
    ['a_weights', mesh.weights, 2],
  ];
  attributes.forEach(([name, values, size]) => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, values, gl.STATIC_DRAW);
    const location = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
  });
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW);

  const textureUnits = [['u_image', imageTexture], ['u_height_left', left.height], ['u_height_right', right.height]];
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

function createMesh(leftHeight, rightHeight) {
  const columns = 160;
  const rows = 240;
  const positions = new Float32Array((columns + 1) * (rows + 1) * 2);
  const uvs = new Float32Array(positions.length);
  const weights = new Float32Array(positions.length);
  const indices = new Uint16Array(columns * rows * 6);
  let vertex = 0;
  for (let y = 0; y <= rows; y += 1) {
    const v = y / rows;
    const py = Math.min(canvas.height - 1, Math.round(v * (canvas.height - 1)));
    for (let x = 0; x <= columns; x += 1) {
      const u = x / columns;
      const px = Math.min(canvas.width - 1, Math.round(u * (canvas.width - 1)));
      const pixel = (py * canvas.width + px) * 4;
      positions[vertex * 2] = u * 2 - 1;
      positions[vertex * 2 + 1] = 1 - v * 2;
      uvs[vertex * 2] = u;
      uvs[vertex * 2 + 1] = v;
      weights[vertex * 2] = (leftHeight[pixel] / 255) * (leftHeight[pixel + 3] / 255);
      weights[vertex * 2 + 1] = (rightHeight[pixel] / 255) * (rightHeight[pixel + 3] / 255);
      vertex += 1;
    }
  }
  let index = 0;
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      const topLeft = y * (columns + 1) + x;
      const topRight = topLeft + 1;
      const bottomLeft = topLeft + columns + 1;
      const bottomRight = bottomLeft + 1;
      indices[index++] = topLeft;
      indices[index++] = bottomLeft;
      indices[index++] = topRight;
      indices[index++] = topRight;
      indices[index++] = bottomLeft;
      indices[index++] = bottomRight;
    }
  }
  return { positions, uvs, weights, indices };
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
      const speedScale = Number(speed.value) / 100;
      const stiffness = Number(springControl.value);
      const damping = Number(dampingControl.value);
      const phase = index === 0 ? 0 : Number(phaseControl.value) * Math.PI / 180;
      const drive = Math.sin(time * .00155 * speedScale + phase) * .24 + pointerKick * (index === 0 ? .72 : -.58);
      side.vy += (drive - side.y * stiffness - side.vy * damping) * elapsed;
      side.vx += ((Math.cos(time * .00115 * speedScale + phase) * .1) - side.x * stiffness * .92 - side.vx * damping) * elapsed;
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
  gl.drawElements(gl.TRIANGLES, 160 * 240 * 6, gl.UNSIGNED_SHORT, 0);
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

function updateControlOutputs() {
  intensityValue.value = `${intensity.value}%`;
  document.querySelector('#speed-value').value = `${(Number(speed.value) / 100).toFixed(1)}×`;
  document.querySelector('#spring-value').value = Number(springControl.value).toFixed(1);
  document.querySelector('#damping-value').value = Number(dampingControl.value).toFixed(1);
  document.querySelector('#phase-value').value = `${phaseControl.value}°`;
}

[intensity, speed, springControl, dampingControl, phaseControl].forEach((control) => {
  control.addEventListener('input', updateControlOutputs);
});
updateControlOutputs();

pauseButton.addEventListener('click', () => {
  paused = !paused;
  pauseButton.textContent = paused ? 'Retomar' : 'Pausar';
  pauseButton.setAttribute('aria-pressed', String(paused));
  status.textContent = paused ? 'Simulação pausada.' : 'Dois lados, dois pequenos balanços.';
  if (paused) {
    sides.forEach((side) => { side.x = 0; side.y = 0; side.vx = 0; side.vy = 0; });
  }
});

impulseButton.addEventListener('click', () => {
  if (reducedMotion.matches) return;
  paused = false;
  pauseButton.textContent = 'Pausar';
  pauseButton.setAttribute('aria-pressed', 'false');
  sides[0].vy -= .85;
  sides[0].vx += .32;
  sides[1].vy += .72;
  sides[1].vx -= .26;
  status.textContent = 'Impulso aplicado; ajuste a resposta nos controles.';
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
