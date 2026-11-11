const status = document.getElementById('copy-feedback');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const compactLayout = window.matchMedia('(max-width: 760px)');
let announceTimer = 0;
let announceRevealTimer = 0;

const motionIsActive = () => !reducedMotion.matches && !document.documentElement.classList.contains('motion-static');
const resetCardTilt = (card) => {
  ['--card-tilt-x', '--card-tilt-y', '--card-spot-x', '--card-spot-y', '--card-brightness', '--card-glare-opacity'].forEach((name) => card.style.removeProperty(name));
};
const clearPointerEffects = () => {
  document.querySelectorAll('.game-card').forEach(resetCardTilt);
};

document.addEventListener('crias:motion-disabled', clearPointerEffects);
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) clearPointerEffects();
});

function setCardTilt(card, x, y) {
  if (!motionIsActive() || (card.matches(':has(:focus-visible)') && !card.matches(':hover'))) {
    resetCardTilt(card);
    return;
  }
  const rect = card.getBoundingClientRect();
  const normalizedX = Math.max(-1, Math.min(1, (x - rect.left - rect.width / 2) / (rect.width / 2)));
  const normalizedY = Math.max(-1, Math.min(1, (y - rect.top - rect.height / 2) / (rect.height / 2)));
  const magnitude = Math.hypot(normalizedX, normalizedY);
  card.style.setProperty('--card-tilt-x', `${(normalizedX * 12).toFixed(2)}deg`);
  card.style.setProperty('--card-tilt-y', `${(-normalizedY * 12).toFixed(2)}deg`);
  card.style.setProperty('--card-spot-x', `${((normalizedX + 1) * 50).toFixed(1)}%`);
  card.style.setProperty('--card-spot-y', `${((normalizedY + 1) * 50).toFixed(1)}%`);
  card.style.setProperty('--card-brightness', (1.08 - normalizedY * .24).toFixed(2));
  card.style.setProperty('--card-glare-opacity', (.55 + Math.min(.3, magnitude * .2)).toFixed(2));
}

if (finePointer.matches && !document.documentElement.classList.contains('motion-static')) {
  document.querySelectorAll('.game-card').forEach((card) => {
    let pointerPosition = null;
    let framePending = false;
    const trackPointer = (event) => {
      if (event.pointerType !== 'mouse' || !motionIsActive() || (card.matches(':has(:focus-visible)') && !card.matches(':hover'))) return;
      pointerPosition = { x: event.clientX, y: event.clientY };
      if (framePending) return;
      framePending = true;
      requestAnimationFrame(() => {
        framePending = false;
        if (pointerPosition) setCardTilt(card, pointerPosition.x, pointerPosition.y);
      });
    };
    card.addEventListener('pointerenter', trackPointer, { passive: true });
    card.addEventListener('pointermove', trackPointer, { passive: true });
    card.addEventListener('pointerleave', () => {
      pointerPosition = null;
      resetCardTilt(card);
    });
    card.addEventListener('focusin', () => {
      if (card.matches(':hover') && pointerPosition) {
        setCardTilt(card, pointerPosition.x, pointerPosition.y);
        return;
      }
      pointerPosition = null;
      resetCardTilt(card);
    });
    card.addEventListener('focusout', () => {
      if (card.matches(':hover') && pointerPosition) {
        setCardTilt(card, pointerPosition.x, pointerPosition.y);
        return;
      }
      pointerPosition = null;
      resetCardTilt(card);
    });
  });
}

// Tiny DOM sparks are only created after the shared renderer probe has confirmed
// hardware acceleration. The page stays quiet on software-rendered devices.
if (finePointer.matches && motionIsActive() && window.criasMotion?.isAccelerated) {
  const particleStyle = (particle, { x, y, dx, dy, size, duration, opacity, color }) => {
    particle.style.left = `${x.toFixed(1)}px`;
    particle.style.top = `${y.toFixed(1)}px`;
    particle.style.setProperty('--particle-dx', `${dx.toFixed(1)}px`);
    particle.style.setProperty('--particle-dy', `${dy.toFixed(1)}px`);
    particle.style.setProperty('--particle-size', `${size.toFixed(1)}px`);
    particle.style.setProperty('--particle-duration', `${duration.toFixed(2)}s`);
    particle.style.setProperty('--particle-opacity', opacity.toFixed(2));
    if (color) particle.style.setProperty('--particle-color', color);
  };
  const makeParticle = (layer, options) => {
    const maxParticles = layer.classList.contains('pointer-particles') ? 192 : 128;
    if (layer.childElementCount >= maxParticles) layer.firstElementChild?.remove();
    const particle = document.createElement('i');
    particle.className = `neon-particle neon-particle--${options.kind}`;
    particle.setAttribute('aria-hidden', 'true');
    particleStyle(particle, options);
    particle.addEventListener('animationend', () => particle.remove(), { once: true });
    layer.append(particle);
  };
  const random = (min, max) => min + Math.random() * (max - min);
  const makePanelSpark = (layer, panel) => {
    // Particle coordinates are local to the panel layer, so use the panel's
    // untransformed border-box dimensions rather than its tilted viewport box.
    const width = panel.offsetWidth;
    const height = panel.offsetHeight;
    const edge = Math.floor(Math.random() * 4);
    const x = edge === 1 ? width : edge === 3 ? 0 : random(0, width);
    const y = edge === 0 ? 0 : edge === 2 ? height : random(0, height);
    const spread = random(-22, 22);
    const distance = random(16, 54);
    const vector = [
      { dx: spread, dy: -distance },
      { dx: distance, dy: spread },
      { dx: spread, dy: distance },
      { dx: -distance, dy: spread }
    ][edge];
    const dim = Math.random() < .52;
    makeParticle(layer, {
      x, y, ...vector,
      kind: dim ? 'dim' : 'bright',
      size: dim ? random(1, 2) : random(1.4, 3),
      duration: dim ? random(1.5, 2.6) : random(.75, 1.35),
      opacity: dim ? random(.35, .65) : random(.75, 1)
    });
    if (!dim && Math.random() < .35) {
      makeParticle(layer, {
        x: x + random(-5, 5), y: y + random(-5, 5),
        dx: vector.dx * .55, dy: vector.dy * .55,
        kind: 'dim', size: random(1, 1.8), duration: random(1.4, 2.4), opacity: random(.3, .55)
      });
    }
  };

  const emitters = [...document.querySelectorAll('.panel.join, .panel.directory')].map((panel) => {
    const layer = document.createElement('div');
    layer.className = 'panel-particles';
    layer.setAttribute('aria-hidden', 'true');
    panel.prepend(layer);
    let timer = 0;
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = 0;
      layer.replaceChildren();
    };
    const hasCyanBorder = () => getComputedStyle(panel).getPropertyValue('--panel-neon').trim().toLowerCase() === '#12edff';
    const update = () => {
      const active = motionIsActive() && hasCyanBorder() && (panel.matches(':hover') || panel.matches(':has(:focus-visible)'));
      if (!active) {
        stop();
        return;
      }
      if (timer) return;
      timer = window.setInterval(() => {
        if (!motionIsActive() || !hasCyanBorder() || (!panel.matches(':hover') && !panel.matches(':has(:focus-visible)'))) {
          stop();
          return;
        }
        makePanelSpark(layer, panel);
        makePanelSpark(layer, panel);
        makePanelSpark(layer, panel);
      }, 45);
    };
    panel.addEventListener('pointerenter', update, { passive: true });
    panel.addEventListener('pointerleave', update, { passive: true });
    panel.addEventListener('focusin', update);
    panel.addEventListener('focusout', () => requestAnimationFrame(update));
    return { layer, stop };
  });

  const pointerLayer = document.createElement('div');
  pointerLayer.className = 'pointer-particles';
  pointerLayer.setAttribute('aria-hidden', 'true');
  document.body.append(pointerLayer);
  let lastPointer = null;
  let lastEmission = 0;
  window.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse' || !motionIsActive()) return;
    const now = performance.now();
    const previous = lastPointer;
    lastPointer = { x: event.clientX, y: event.clientY };
    if (!previous || now - lastEmission < 16) return;
    const dx = event.clientX - previous.x;
    const dy = event.clientY - previous.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 6) return;
    lastEmission = now;
    const tail = random(10, 28);
    const travelX = -dx / distance * tail + random(-8, 8);
    const travelY = -dy / distance * tail + random(-8, 8);
    const colorShift = (Math.sin(now * .0018 + (event.clientX / window.innerWidth) * 3.2) + 1) * .5;
    const smokePink = [.88, .035, .56];
    const smokeCyan = [.01, .62, .96];
    const smokeColor = `rgb(${smokePink.map((channel, index) => Math.round((channel * (1 - colorShift) + smokeCyan[index] * colorShift) * 255)).join(' ')})`;
    const dim = Math.random() < .55;
    makeParticle(pointerLayer, {
      x: event.clientX, y: event.clientY,
      dx: travelX, dy: travelY,
      kind: dim ? 'dim' : 'bright',
      size: dim ? random(1, 1.8) : random(1.5, 2.8),
      duration: dim ? random(1.3, 2.2) : random(.7, 1.25),
      opacity: dim ? random(.28, .55) : random(.7, .95),
      color: smokeColor
    });
    if (Math.random() < .85) {
      makeParticle(pointerLayer, {
        x: event.clientX + random(-4, 4), y: event.clientY + random(-4, 4),
        dx: travelX * .65 + random(-5, 5), dy: travelY * .65 + random(-5, 5),
        kind: dim ? 'bright' : 'dim',
        size: random(1, 2), duration: random(1.1, 1.9), opacity: random(.35, .7), color: smokeColor
      });
    }
  }, { passive: true });

  const removeParticles = () => {
    emitters.forEach(({ stop, layer }) => { stop(); layer.remove(); });
    pointerLayer.replaceChildren();
    pointerLayer.remove();
  };
  document.addEventListener('crias:motion-disabled', removeParticles, { once: true });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) removeParticles();
  });
}

// Preserve the gradient's current phase on exit, then ease it to rest slowly.
// Re-entering during that ease resumes the same forward-moving loop phase.
const heroCopy = document.querySelector('.hero__copy');
const chromeTitle = document.querySelector('.wordmark__chrome');
if (heroCopy && chromeTitle) {
  let gradientReturnFrame = 0;
  let gradientReturnTimer = 0;
  let gradientTrackingFrame = 0;
  let lastChromePhase = 0;
  const trackChromePhase = () => {
    gradientTrackingFrame = 0;
    if (!heroCopy.matches(':hover') || !motionIsActive()) return;
    lastChromePhase = parseFloat(getComputedStyle(chromeTitle).getPropertyValue('--chrome-shift')) || 0;
    gradientTrackingFrame = requestAnimationFrame(trackChromePhase);
  };
  const cancelGradientReturn = () => {
    if (gradientReturnFrame) cancelAnimationFrame(gradientReturnFrame);
    if (gradientReturnTimer) clearTimeout(gradientReturnTimer);
    gradientReturnFrame = 0;
    gradientReturnTimer = 0;
  };
  const clearGradientInlineState = () => {
    cancelGradientReturn();
    if (gradientTrackingFrame) cancelAnimationFrame(gradientTrackingFrame);
    gradientTrackingFrame = 0;
    lastChromePhase = 0;
    ['animation', '--chrome-shift', '--chrome-resume-delay'].forEach((name) => chromeTitle.style.removeProperty(name));
  };
  heroCopy.addEventListener('pointerenter', (event) => {
    if (event.pointerType !== 'mouse' || !finePointer.matches || !motionIsActive()) return;
    const phase = parseFloat(getComputedStyle(chromeTitle).getPropertyValue('--chrome-shift')) || 0;
    cancelGradientReturn();
    lastChromePhase = phase;
    chromeTitle.style.removeProperty('animation');
    chromeTitle.style.removeProperty('--chrome-shift');
    chromeTitle.style.setProperty('--chrome-resume-delay', `-${(phase / 100 * 2.8).toFixed(3)}s`);
    if (!gradientTrackingFrame) gradientTrackingFrame = requestAnimationFrame(trackChromePhase);
  }, { passive: true });
  heroCopy.addEventListener('pointerleave', (event) => {
    if (event.pointerType !== 'mouse' || !finePointer.matches || !motionIsActive()) return;
    const phase = lastChromePhase || parseFloat(getComputedStyle(chromeTitle).getPropertyValue('--chrome-shift')) || 0;
    if (gradientTrackingFrame) cancelAnimationFrame(gradientTrackingFrame);
    gradientTrackingFrame = 0;
    cancelGradientReturn();
    chromeTitle.style.setProperty('animation', 'none');
    chromeTitle.style.setProperty('--chrome-shift', `${phase}%`);
    getComputedStyle(chromeTitle).getPropertyValue('--chrome-shift');
    gradientReturnFrame = requestAnimationFrame(() => {
      gradientReturnFrame = 0;
      if (heroCopy.matches(':hover') || !motionIsActive()) return clearGradientInlineState();
      chromeTitle.style.setProperty('--chrome-shift', '0%');
      gradientReturnTimer = window.setTimeout(() => {
        gradientReturnTimer = 0;
        if (!heroCopy.matches(':hover')) clearGradientInlineState();
      }, 1000);
    });
  }, { passive: true });
  document.addEventListener('crias:motion-disabled', clearGradientInlineState, { once: true });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) clearGradientInlineState();
  });
}

// Portraits stay pointer-inert so their padded transparent canvases never cover
// links or copy controls. Sample their alpha only when the pointer is nearby.
if (finePointer.matches && !document.documentElement.classList.contains('motion-static')) {
  const portraits = [...document.querySelectorAll('.character, .footer-character')].reverse();
  const masks = new WeakMap();
  const wiggles = new WeakMap();
  const jumps = new WeakMap();
  const returnFrames = new Map();
  const activeAnimations = new Set();
  let hovered = null;
  let pointer = null;
  let pointerFrame = 0;
  let drag = null;
  let dragFrame = 0;
  let suppressClickPoint = null;
  let suppressClickTimer = 0;

  function alphaMask(image) {
    if (masks.has(image)) return masks.get(image);
    if (!image.complete || !image.naturalWidth || !image.naturalHeight) return null;
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = Math.max(1, Math.round(128 * image.naturalHeight / image.naturalWidth));
    try {
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return null;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const mask = { width: canvas.width, height: canvas.height, data: context.getImageData(0, 0, canvas.width, canvas.height).data };
      masks.set(image, mask);
      return mask;
    } catch {
      // A failed or unavailable canvas must not turn transparent margins into hit areas.
      masks.set(image, null);
      return null;
    }
  }

  function pointInPortrait(portrait, x, y) {
    const rect = portrait.getBoundingClientRect();
    if (!rect.width || !rect.height || x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return false;
    const style = getComputedStyle(portrait);
    const width = parseFloat(style.width);
    const height = parseFloat(style.height);
    if (!width || !height) return false;

    // Undo both the billboard's individual transforms and the portrait's own
    // transform, including any currently running wiggle or jump.
    const rotation = style.rotate === 'none' ? 0 : parseFloat(style.rotate);
    const translation = style.translate === 'none' ? [0, 0] : style.translate.split(' ').map((value) => parseFloat(value) || 0);
    const scale = style.scale === 'none' ? [1, 1] : style.scale.split(' ').map(Number);
    const matrix = new DOMMatrix().translate(translation[0], translation[1] ?? 0).rotate(rotation).scale(scale[0], scale[1] ?? scale[0])
      .multiply(new DOMMatrix(style.transform === 'none' ? undefined : style.transform));
    const corners = [[0, 0], [width, 0], [0, height], [width, height]]
      .map(([cornerX, cornerY]) => matrix.transformPoint(new DOMPoint(cornerX, cornerY)));
    const minX = Math.min(...corners.map((point) => point.x));
    const minY = Math.min(...corners.map((point) => point.y));
    const local = matrix.inverse().transformPoint(new DOMPoint(x - rect.left + minX, y - rect.top + minY));
    if (local.x < 0 || local.x >= width || local.y < 0 || local.y >= height) return false;
    if (portrait.classList.contains('window')) return true;
    if (style.maskImage !== 'none' && local.y / height >= (portrait.classList.contains('footer-character--marie') ? .86 : .90)) return false;

    const mask = alphaMask(portrait);
    if (!mask) return false;
    const fit = Math.min(width / portrait.naturalWidth, height / portrait.naturalHeight);
    const imageWidth = portrait.naturalWidth * fit;
    const imageHeight = portrait.naturalHeight * fit;
    const imageX = local.x - (width - imageWidth) / 2;
    const imageY = local.y - (style.objectPosition.includes('bottom') ? height - imageHeight : 0);
    if (imageX < 0 || imageY < 0 || imageX >= imageWidth || imageY >= imageHeight) return false;
    const pixelX = Math.min(mask.width - 1, Math.floor(imageX / imageWidth * mask.width));
    const pixelY = Math.min(mask.height - 1, Math.floor(imageY / imageHeight * mask.height));
    return mask.data[(pixelY * mask.width + pixelX) * 4 + 3] >= 32;
  }

  function portraitAt(x, y) {
    const target = document.elementFromPoint(x, y);
    if (!target || target.closest('.panel, .hero__copy, .footer-signature, a, button, input, select, textarea, summary, [contenteditable]')) return null;
    return portraits.find((portrait) => pointInPortrait(portrait, x, y)) || null;
  }

  function react(portrait, keyframes, duration, kind, animations) {
    animations.get(portrait)?.cancel();
    const animation = portrait.animate(keyframes, { duration, composite: 'add' });
    animation.id = `portrait-${kind}`;
    animations.set(portrait, animation);
    activeAnimations.add(animation);
    const forget = () => {
      activeAnimations.delete(animation);
      if (animations.get(portrait) === animation) animations.delete(portrait);
    };
    animation.onfinish = forget;
    animation.oncancel = forget;
  }

  function clearHover() {
    hovered = null;
    pointer = null;
    document.documentElement.classList.remove('portrait-hovered');
  }

  function finishDrag(event, animateReturn = true) {
    if (!drag || (event && event.pointerId !== drag.pointerId)) return;
    const session = drag;
    drag = null;
    session.portrait.classList.remove('portrait-dragging');
    session.portrait.classList.remove('portrait-wheel-zoom');
    session.portrait.style.removeProperty('--portrait-hold-scale');
    session.collage?.classList.remove('portrait-collage-dragging');
    document.documentElement.classList.remove('portrait-drag-active');
    document.documentElement.classList.remove('portrait-press-active');
    if (session.moved && animateReturn && motionIsActive()) {
      const portrait = session.portrait;
      const started = performance.now();
      const duration = 460;
      portrait.classList.add('portrait-returning');
      const returnToOrigin = (now) => {
        if (!returnFrames.has(portrait)) return;
        const progress = Math.min(1, (now - started) / duration);
        const eased = 1 - (1 - progress) ** 3;
        const x = session.currentX * (1 - eased);
        const y = session.currentY * (1 - eased);
        portrait.style.setProperty('--portrait-drag-x', `${x}px`);
        portrait.style.setProperty('--portrait-drag-y', `${y}px`);
        if (progress < 1) returnFrames.set(portrait, requestAnimationFrame(returnToOrigin));
        else {
          returnFrames.delete(portrait);
          portrait.classList.remove('portrait-returning');
          portrait.style.removeProperty('--portrait-drag-x');
          portrait.style.removeProperty('--portrait-drag-y');
        }
      };
      returnFrames.set(portrait, requestAnimationFrame(returnToOrigin));
    } else {
      session.portrait.classList.remove('portrait-returning');
      if (session.moved) {
        session.portrait.style.removeProperty('--portrait-drag-x');
        session.portrait.style.removeProperty('--portrait-drag-y');
      }
    }
    if ((session.moved || session.scrolled) && event?.type === 'pointerup') {
      suppressClickPoint = { x: event.clientX, y: event.clientY };
      clearTimeout(suppressClickTimer);
      suppressClickTimer = window.setTimeout(() => { suppressClickPoint = null; }, 250);
    }
  }

  function stopPortraitMotion() {
    if (pointerFrame) cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    pointer = null;
    if (dragFrame) cancelAnimationFrame(dragFrame);
    dragFrame = 0;
    finishDrag(null, false);
    document.documentElement.classList.remove('portrait-press-active');
    returnFrames.forEach((frame, portrait) => {
      cancelAnimationFrame(frame);
      portrait.classList.remove('portrait-returning');
      portrait.style.removeProperty('--portrait-drag-x');
      portrait.style.removeProperty('--portrait-drag-y');
    });
    returnFrames.clear();
    clearTimeout(suppressClickTimer);
    suppressClickPoint = null;
    clearHover();
    activeAnimations.forEach((animation) => animation.cancel());
    activeAnimations.clear();
  }

  document.addEventListener('crias:motion-disabled', stopPortraitMotion);
  compactLayout.addEventListener('change', (event) => {
    if (event.matches) stopPortraitMotion();
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) stopPortraitMotion();
  });
  window.addEventListener('pointerdown', (event) => {
    if (compactLayout.matches || event.pointerType !== 'mouse' || event.button !== 0 || !motionIsActive() || drag) return;
    const portrait = portraitAt(event.clientX, event.clientY);
    if (!portrait) return;
    const returnFrame = returnFrames.get(portrait);
    if (returnFrame) cancelAnimationFrame(returnFrame);
    returnFrames.delete(portrait);
    portrait.classList.remove('portrait-returning');
    const existingX = parseFloat(getComputedStyle(portrait).getPropertyValue('--portrait-drag-x')) || 0;
    const existingY = parseFloat(getComputedStyle(portrait).getPropertyValue('--portrait-drag-y')) || 0;
    drag = {
      portrait,
      collage: portrait.closest('.hero__collage, .footer-collage'),
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
      scrolled: false,
      wheelScale: 1,
      initialX: existingX,
      initialY: existingY,
      currentX: existingX,
      currentY: existingY,
      targetX: existingX,
      targetY: existingY
    };
    document.documentElement.classList.add('portrait-press-active');
    try { document.documentElement.setPointerCapture(event.pointerId); } catch { /* Window listeners still cover the drag. */ }
  });
  window.addEventListener('selectstart', (event) => { if (drag) event.preventDefault(); });
  window.addEventListener('wheel', (event) => {
    if (!drag || !motionIsActive() || event.deltaY === 0) return;
    event.preventDefault();
    drag.scrolled = true;
    const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1;
    drag.wheelScale = Math.max(1, Math.min(4, drag.wheelScale - event.deltaY * unit * .002));
    drag.portrait.style.setProperty('--portrait-hold-scale', drag.wheelScale.toFixed(3));
    drag.portrait.classList.add('portrait-wheel-zoom');
  }, { passive: false });
  window.addEventListener('pointermove', (event) => {
    if (compactLayout.matches || !drag || event.pointerId !== drag.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(deltaX, deltaY) >= 4) {
      drag.moved = true;
      wiggles.get(drag.portrait)?.cancel();
      jumps.get(drag.portrait)?.cancel();
      if (hovered === drag.portrait) clearHover();
      drag.portrait.classList.add('portrait-dragging');
      drag.collage?.classList.add('portrait-collage-dragging');
      document.documentElement.classList.add('portrait-drag-active');
      drag.portrait.style.setProperty('--portrait-drag-x', '0px');
      drag.portrait.style.setProperty('--portrait-drag-y', '0px');
    }
    if (!drag.moved) return;
    drag.targetX = drag.initialX + deltaX;
    drag.targetY = drag.initialY + deltaY;
    if (!dragFrame) {
      const followPointer = () => {
        dragFrame = 0;
        if (!drag?.moved || !motionIsActive()) return;
        const dx = drag.targetX - drag.currentX;
        const dy = drag.targetY - drag.currentY;
        drag.currentX = Math.abs(dx) < .45 ? drag.targetX : drag.currentX + dx * .42;
        drag.currentY = Math.abs(dy) < .45 ? drag.targetY : drag.currentY + dy * .42;
        drag.portrait.style.setProperty('--portrait-drag-x', `${drag.currentX}px`);
        drag.portrait.style.setProperty('--portrait-drag-y', `${drag.currentY}px`);
        if (Math.abs(drag.targetX - drag.currentX) >= .45 || Math.abs(drag.targetY - drag.currentY) >= .45) dragFrame = requestAnimationFrame(followPointer);
      };
      dragFrame = requestAnimationFrame(followPointer);
    }
    event.preventDefault();
  });
  window.addEventListener('pointerup', (event) => finishDrag(event, true));
  window.addEventListener('pointercancel', (event) => finishDrag(event, true));
  window.addEventListener('dragstart', (event) => { if (drag) event.preventDefault(); });
  window.addEventListener('pointermove', (event) => {
    if (compactLayout.matches || event.pointerType !== 'mouse' || !motionIsActive() || drag) return;
    pointer = { x: event.clientX, y: event.clientY };
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      if (!pointer || !motionIsActive()) return;
      const portrait = portraitAt(pointer.x, pointer.y);
      if (portrait === hovered) return;
      hovered = portrait;
      document.documentElement.classList.toggle('portrait-hovered', Boolean(portrait));
      if (portrait) react(portrait, [
        { transform: 'rotate(0deg)', easing: 'ease-in-out' },
        { transform: 'rotate(-7deg)', offset: .25, easing: 'ease-in-out' },
        { transform: 'rotate(6deg)', offset: .55, easing: 'ease-in-out' },
        { transform: 'rotate(-2deg)', offset: .8, easing: 'ease-in-out' },
        { transform: 'rotate(0deg)' }
      ], 720, 'wiggle', wiggles);
    });
  }, { passive: true });
  window.addEventListener('pointerout', (event) => {
    if (!event.relatedTarget) clearHover();
  });
  window.addEventListener('scroll', clearHover, { passive: true });
  window.addEventListener('click', (event) => {
    if (suppressClickPoint) {
      const suppress = Math.hypot(event.clientX - suppressClickPoint.x, event.clientY - suppressClickPoint.y) <= 3;
      suppressClickPoint = null;
      clearTimeout(suppressClickTimer);
      if (suppress) return;
    }
    if (compactLayout.matches || !motionIsActive() || event.button !== 0 || event.detail === 0) return;
    const portrait = portraitAt(event.clientX, event.clientY);
    if (!portrait) return;
    react(portrait, [
      { transform: 'translateY(0) scale(1, 1)', easing: 'ease-in' },
      { transform: 'translateY(3%) scale(1.1, .93)', offset: .15, easing: 'cubic-bezier(.18,.75,.32,1)' },
      { transform: 'translateY(-23px) scale(.96, 1.06)', offset: .43, easing: 'cubic-bezier(.55,0,.8,.5)' },
      { transform: 'translateY(1%) scale(1.08, .95)', offset: .72, easing: 'ease-out' },
      { transform: 'translateY(-4px) scale(.98, 1.02)', offset: .87, easing: 'ease-in-out' },
      { transform: 'translateY(0) scale(1, 1)' }
    ], 760, 'jump', jumps);
  });
}

function announce(message, state) {
  if (!status) return;
  clearTimeout(announceTimer);
  clearTimeout(announceRevealTimer);
  status.textContent = '';
  delete status.dataset.state;
  const footer = document.querySelector('.footer-signature');
  const footerTop = footer?.getBoundingClientRect().top ?? window.innerHeight;
  const footerClearance = footerTop >= 0 && footerTop < window.innerHeight
    ? Math.max(0, window.innerHeight - footerTop + 12 - 14)
    : 0;
  status.style.setProperty('--copy-toast-lift', `${footerClearance}px`);
  announceRevealTimer = window.setTimeout(() => {
    status.textContent = message;
    status.dataset.state = state;
    announceTimer = window.setTimeout(() => {
      status.textContent = '';
      delete status.dataset.state;
      announceTimer = 0;
    }, 2800);
  }, 30);
}

async function copyText(value) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return true;
  }
  const field = document.createElement('textarea');
  const previousFocus = document.activeElement;
  field.value = value;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.append(field);
  field.select();
  field.setSelectionRange(0, value.length);
  let copied = false;
  try {
    copied = document.execCommand('copy');
  } finally {
    field.remove();
    previousFocus?.focus?.({ preventScroll: true });
  }
  if (!copied) throw new Error('Copy unavailable');
  return true;
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await copyText(button.dataset.copy);
      announce('Copiado!', 'success');
    } catch {
      announce('Não foi possível copiar. Selecione e copie o endereço manualmente.', 'error');
    }
  });
});
