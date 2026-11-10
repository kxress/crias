(() => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!finePointer.matches || reducedMotion.matches) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'fluid-smoke';
  canvas.setAttribute('aria-hidden', 'true');
  const layerHost = document.querySelector('main') || document.body;
  layerHost.append(canvas);

  const gl = canvas.getContext('webgl2', {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false
  });
  if (!gl || !gl.getExtension('EXT_color_buffer_float')) {
    canvas.remove();
    return;
  }

  const linearFiltering = Boolean(gl.getExtension('OES_texture_float_linear'));
  const filter = linearFiltering ? gl.LINEAR : gl.NEAREST;
  const vertexSource = `#version 300 es
    precision highp float;
    layout(location = 0) in vec2 aPosition;
    out vec2 vUv;
    void main() {
      vUv = aPosition * 0.5 + 0.5;
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }`;

  const shaders = {
    splat: `#version 300 es
      precision highp float;
      in vec2 vUv;
      uniform sampler2D uTarget;
      uniform float uAspect;
      uniform vec2 uPoint;
      uniform vec3 uColor;
      uniform float uRadius;
      out vec4 outColor;
      void main() {
        vec2 p = vUv - uPoint;
        p.x *= uAspect;
        vec3 dye = exp(-dot(p, p) / uRadius) * uColor;
        outColor = vec4(texture(uTarget, vUv).rgb + dye, 1.0);
      }`,
    advection: `#version 300 es
      precision highp float;
      in vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 uTexelSize;
      uniform float uDt;
      uniform float uDissipation;
      out vec4 outColor;
      void main() {
        vec2 back = vUv - uDt * texture(uVelocity, vUv).xy * uTexelSize;
        outColor = texture(uSource, back) / (1.0 + uDissipation * uDt);
      }`,
    curl: `#version 300 es
      precision highp float;
      in vec2 vUv;
      uniform sampler2D uVelocity;
      uniform vec2 uTexelSize;
      out vec4 outColor;
      void main() {
        vec2 l = texture(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).xy;
        vec2 r = texture(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).xy;
        vec2 t = texture(uVelocity, vUv + vec2(0.0, uTexelSize.y)).xy;
        vec2 b = texture(uVelocity, vUv - vec2(0.0, uTexelSize.y)).xy;
        outColor = vec4(0.5 * (r.y - l.y - t.x + b.x), 0.0, 0.0, 1.0);
      }`,
    vorticity: `#version 300 es
      precision highp float;
      in vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform vec2 uTexelSize;
      uniform float uCurlStrength;
      uniform float uDt;
      out vec4 outColor;
      void main() {
        float l = abs(texture(uCurl, vUv - vec2(uTexelSize.x, 0.0)).x);
        float r = abs(texture(uCurl, vUv + vec2(uTexelSize.x, 0.0)).x);
        float t = abs(texture(uCurl, vUv + vec2(0.0, uTexelSize.y)).x);
        float b = abs(texture(uCurl, vUv - vec2(0.0, uTexelSize.y)).x);
        vec2 force = 0.5 * vec2(r - l, t - b);
        force /= length(force) + 0.00001;
        force *= uCurlStrength * texture(uCurl, vUv).x;
        force.y *= -1.0;
        vec2 velocity = texture(uVelocity, vUv).xy + force * uDt;
        outColor = vec4(velocity, 0.0, 1.0);
      }`,
    divergence: `#version 300 es
      precision highp float;
      in vec2 vUv;
      uniform sampler2D uVelocity;
      uniform vec2 uTexelSize;
      out vec4 outColor;
      void main() {
        vec2 c = texture(uVelocity, vUv).xy;
        float l = texture(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).x;
        float r = texture(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).x;
        float t = texture(uVelocity, vUv + vec2(0.0, uTexelSize.y)).y;
        float b = texture(uVelocity, vUv - vec2(0.0, uTexelSize.y)).y;
        if (vUv.x < uTexelSize.x) l = -c.x;
        if (vUv.x > 1.0 - uTexelSize.x) r = -c.x;
        if (vUv.y < uTexelSize.y) b = -c.y;
        if (vUv.y > 1.0 - uTexelSize.y) t = -c.y;
        outColor = vec4(0.5 * (r - l + t - b), 0.0, 0.0, 1.0);
      }`,
    clear: `#version 300 es
      precision highp float;
      in vec2 vUv;
      uniform sampler2D uTexture;
      uniform float uValue;
      out vec4 outColor;
      void main() { outColor = uValue * texture(uTexture, vUv); }`,
    pressure: `#version 300 es
      precision highp float;
      in vec2 vUv;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      uniform vec2 uTexelSize;
      out vec4 outColor;
      void main() {
        float l = texture(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
        float r = texture(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
        float t = texture(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
        float b = texture(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
        float d = texture(uDivergence, vUv).x;
        outColor = vec4((l + r + t + b - d) * 0.25, 0.0, 0.0, 1.0);
      }`,
    gradient: `#version 300 es
      precision highp float;
      in vec2 vUv;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      uniform vec2 uTexelSize;
      out vec4 outColor;
      void main() {
        float l = texture(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
        float r = texture(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
        float t = texture(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
        float b = texture(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
        vec2 velocity = texture(uVelocity, vUv).xy - 0.5 * vec2(r - l, t - b);
        outColor = vec4(velocity, 0.0, 1.0);
      }`,
    display: `#version 300 es
      precision highp float;
      in vec2 vUv;
      uniform sampler2D uDye;
      uniform vec2 uTexelSize;
      out vec4 outColor;
      void main() {
        vec3 color = texture(uDye, vUv).rgb;
        vec3 leftColor = texture(uDye, vUv - vec2(uTexelSize.x, 0.0)).rgb;
        vec3 rightColor = texture(uDye, vUv + vec2(uTexelSize.x, 0.0)).rgb;
        vec3 topColor = texture(uDye, vUv + vec2(0.0, uTexelSize.y)).rgb;
        vec3 bottomColor = texture(uDye, vUv - vec2(0.0, uTexelSize.y)).rgb;
        float dx = length(rightColor) - length(leftColor);
        float dy = length(topColor) - length(bottomColor);
        vec3 normal = normalize(vec3(dx, dy, length(uTexelSize)));
        color *= clamp(normal.z + 0.7, 0.7, 1.0);
        float alpha = clamp(max(color.r, max(color.g, color.b)), 0.0, 0.86);
        outColor = vec4(color, alpha);
      }`
  };

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(message || 'Fluid shader compilation failed');
    }
    return shader;
  }

  function createProgram(source) {
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, source));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || 'Fluid shader link failed');
    }
    program.uniforms = new Map();
    return program;
  }

  function uniform(program, name) {
    if (!program.uniforms.has(name)) program.uniforms.set(name, gl.getUniformLocation(program, name));
    return program.uniforms.get(name);
  }

  function bindTexture(program, name, texture, unit) {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(uniform(program, name), unit);
  }

  const rgbaFormat = { internalFormat: gl.RGBA16F, format: gl.RGBA };

  function chooseFormat(candidates) {
    for (const candidate of candidates) {
      const texture = gl.createTexture();
      const framebuffer = gl.createFramebuffer();
      if (!texture || !framebuffer) continue;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, candidate.internalFormat, 4, 4, 0, candidate.format, gl.HALF_FLOAT, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      const supported = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
      gl.deleteFramebuffer(framebuffer);
      gl.deleteTexture(texture);
      if (supported) return candidate;
    }
    return rgbaFormat;
  }

  const velocityFormat = chooseFormat([
    { internalFormat: gl.RG16F, format: gl.RG },
    rgbaFormat
  ]);
  const scalarFormat = chooseFormat([
    { internalFormat: gl.R16F, format: gl.RED },
    { internalFormat: gl.RG16F, format: gl.RG },
    rgbaFormat
  ]);

  function createTarget(width, height, format = rgbaFormat, textureFilter = filter) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, textureFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, textureFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, format.internalFormat, width, height, 0, format.format, gl.HALF_FLOAT, null);
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      throw new Error('Fluid framebuffer is incomplete');
    }
    return { texture, framebuffer, width, height, texelX: 1 / width, texelY: 1 / height };
  }

  function createDoubleTarget(width, height, format = rgbaFormat, textureFilter = filter) {
    const pair = { read: createTarget(width, height, format, textureFilter), write: createTarget(width, height, format, textureFilter) };
    pair.swap = () => { [pair.read, pair.write] = [pair.write, pair.read]; };
    return pair;
  }

  function destroyTarget(target) {
    if (!target) return;
    gl.deleteFramebuffer(target.framebuffer);
    gl.deleteTexture(target.texture);
  }

  const programs = {};
  let vao;
  let velocity;
  let dye;
  let divergence;
  let curl;
  let pressure;
  let pixelRatio = 1;
  let width = 1;
  let height = 1;
  let raf = 0;
  let lastFrame = 0;
  let lastInput = 0;
  let pointer = null;
  let running = false;

  try {
    for (const [name, source] of Object.entries(shaders)) programs[name] = createProgram(source);
    vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  } catch {
    canvas.remove();
    return;
  }

  function draw(program, target, setup) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.framebuffer : null);
    gl.viewport(0, 0, target ? target.width : canvas.width, target ? target.height : canvas.height);
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    setup();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function setTexelSize(program, target) {
    gl.uniform2f(uniform(program, 'uTexelSize'), target.texelX, target.texelY);
  }

  function resolution(base) {
    const aspect = width / height;
    return aspect > 1
      ? [Math.max(1, Math.round(base * aspect)), base]
      : [base, Math.max(1, Math.round(base / aspect))];
  }

  function resize() {
    const oldTargets = [velocity?.read, velocity?.write, dye?.read, dye?.write, divergence, curl, pressure?.read, pressure?.write];
    oldTargets.forEach(destroyTarget);
    width = window.innerWidth;
    height = window.innerHeight;
    const deviceScale = Math.min(window.devicePixelRatio || 1, 1);
    const pixelBudgetScale = Math.sqrt(500000 / Math.max(1, width * height));
    pixelRatio = Math.min(deviceScale, 0.6, pixelBudgetScale);
    canvas.width = Math.max(1, Math.round(width * pixelRatio));
    canvas.height = Math.max(1, Math.round(height * pixelRatio));
    const [simWidth, simHeight] = resolution(64);
    const [dyeWidth, dyeHeight] = resolution(384);
    velocity = createDoubleTarget(simWidth, simHeight, velocityFormat);
    dye = createDoubleTarget(dyeWidth, dyeHeight);
    divergence = createTarget(simWidth, simHeight, scalarFormat, gl.NEAREST);
    curl = createTarget(simWidth, simHeight, scalarFormat, gl.NEAREST);
    pressure = createDoubleTarget(simWidth, simHeight, scalarFormat, gl.NEAREST);
    clearSimulation();
  }

  function clearTarget(target) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
    gl.viewport(0, 0, target.width, target.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  function clearSimulation() {
    [velocity?.read, velocity?.write, dye?.read, dye?.write, divergence, curl, pressure?.read, pressure?.write].forEach(clearTarget);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  function applySplat(x, y, dx, dy, color) {
    const aspect = width / height;
    const radius = aspect > 1 ? 0.002 * aspect : 0.002;
    draw(programs.splat, velocity.write, () => {
      bindTexture(programs.splat, 'uTarget', velocity.read.texture, 0);
      gl.uniform1f(uniform(programs.splat, 'uAspect'), aspect);
      gl.uniform2f(uniform(programs.splat, 'uPoint'), x, y);
      gl.uniform3f(uniform(programs.splat, 'uColor'), dx, dy, 0);
      gl.uniform1f(uniform(programs.splat, 'uRadius'), radius);
    });
    velocity.swap();
    draw(programs.splat, dye.write, () => {
      bindTexture(programs.splat, 'uTarget', dye.read.texture, 0);
      gl.uniform1f(uniform(programs.splat, 'uAspect'), aspect);
      gl.uniform2f(uniform(programs.splat, 'uPoint'), x, y);
      gl.uniform3f(uniform(programs.splat, 'uColor'), color[0], color[1], color[2]);
      gl.uniform1f(uniform(programs.splat, 'uRadius'), radius);
    });
    dye.swap();
  }

  function advect(target, source, dissipation, dt) {
    draw(programs.advection, target.write, () => {
      bindTexture(programs.advection, 'uVelocity', velocity.read.texture, 0);
      bindTexture(programs.advection, 'uSource', source.read.texture, 1);
      setTexelSize(programs.advection, velocity.read);
      gl.uniform1f(uniform(programs.advection, 'uDt'), dt);
      gl.uniform1f(uniform(programs.advection, 'uDissipation'), dissipation);
    });
    target.swap();
  }

  function step(dt) {
    gl.disable(gl.BLEND);
    draw(programs.curl, curl, () => {
      bindTexture(programs.curl, 'uVelocity', velocity.read.texture, 0);
      setTexelSize(programs.curl, velocity.read);
    });
    draw(programs.vorticity, velocity.write, () => {
      bindTexture(programs.vorticity, 'uVelocity', velocity.read.texture, 0);
      bindTexture(programs.vorticity, 'uCurl', curl.texture, 1);
      setTexelSize(programs.vorticity, velocity.read);
      gl.uniform1f(uniform(programs.vorticity, 'uCurlStrength'), 3);
      gl.uniform1f(uniform(programs.vorticity, 'uDt'), dt);
    });
    velocity.swap();
    draw(programs.divergence, divergence, () => {
      bindTexture(programs.divergence, 'uVelocity', velocity.read.texture, 0);
      setTexelSize(programs.divergence, velocity.read);
    });
    draw(programs.clear, pressure.write, () => {
      bindTexture(programs.clear, 'uTexture', pressure.read.texture, 0);
      gl.uniform1f(uniform(programs.clear, 'uValue'), 0.1);
    });
    pressure.swap();
    for (let iteration = 0; iteration < 6; iteration += 1) {
      draw(programs.pressure, pressure.write, () => {
        bindTexture(programs.pressure, 'uPressure', pressure.read.texture, 0);
        bindTexture(programs.pressure, 'uDivergence', divergence.texture, 1);
        setTexelSize(programs.pressure, velocity.read);
      });
      pressure.swap();
    }
    draw(programs.gradient, velocity.write, () => {
      bindTexture(programs.gradient, 'uPressure', pressure.read.texture, 0);
      bindTexture(programs.gradient, 'uVelocity', velocity.read.texture, 1);
      setTexelSize(programs.gradient, velocity.read);
    });
    velocity.swap();
    advect(velocity, velocity, 2, dt);
    advect(dye, dye, 3.5, dt);
  }

  function render() {
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    draw(programs.display, null, () => {
      bindTexture(programs.display, 'uDye', dye.read.texture, 0);
      setTexelSize(programs.display, dye.read);
    });
    gl.disable(gl.BLEND);
  }

  function tick(now) {
    if (reducedMotion.matches) {
      stopAndClear();
      return;
    }
    const dt = Math.min((now - (lastFrame || now - 16.67)) / 1000, 0.0333);
    lastFrame = now;
    if (pointer?.moved) {
      const colorShift = (Math.sin(now * 0.0018 + pointer.x * 3.2) + 1) * 0.5;
      const pink = [0.88, 0.035, 0.56];
      const cyan = [0.01, 0.62, 0.96];
      const color = pink.map((channel, index) => channel * (1 - colorShift) + cyan[index] * colorShift);
      applySplat(pointer.x, pointer.y, pointer.dx * 7200, pointer.dy * 7200, color);
      pointer.dx = 0;
      pointer.dy = 0;
      pointer.moved = false;
    }
    step(dt);
    render();
    if (now - lastInput < 2400) {
      raf = window.requestAnimationFrame(tick);
    } else {
      running = false;
      raf = 0;
      lastFrame = 0;
    }
  }

  function wake() {
    lastInput = performance.now();
    if (running) return;
    running = true;
    lastFrame = 0;
    raf = window.requestAnimationFrame(tick);
  }

  function stopAndClear() {
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
    running = false;
    pointer = null;
    lastFrame = 0;
    clearSimulation();
  }

  try {
    resize();
  } catch {
    canvas.remove();
    return;
  }

  window.addEventListener('resize', resize, { passive: true });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) stopAndClear();
  });
  window.addEventListener('pointermove', (event) => {
    if ((event.pointerType !== 'mouse' && event.pointerType !== 'pen') || reducedMotion.matches) return;
    const x = Math.max(0, Math.min(1, event.clientX / width));
    const y = 1 - Math.max(0, Math.min(1, event.clientY / height));
    if (!pointer) pointer = { x, y, dx: 0, dy: 0, moved: true };
    else {
      let dx = x - pointer.x;
      let dy = y - pointer.y;
      if (width / height < 1) dx *= width / height;
      if (width / height > 1) dy /= width / height;
      pointer.dx = Math.max(-0.3, Math.min(0.3, pointer.dx + dx));
      pointer.dy = Math.max(-0.3, Math.min(0.3, pointer.dy + dy));
      pointer.x = x;
      pointer.y = y;
      pointer.moved = true;
    }
    wake();
  }, { passive: true });

})();
