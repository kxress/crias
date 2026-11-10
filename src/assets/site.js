const status = document.getElementById('copy-feedback');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
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
  if (!motionIsActive() || card.matches(':focus-within')) {
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
      if (event.pointerType !== 'mouse' || !motionIsActive() || card.matches(':focus-within')) return;
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
      pointerPosition = null;
      resetCardTilt(card);
    });
    card.addEventListener('focusout', () => {
      pointerPosition = null;
      resetCardTilt(card);
    });
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
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) stopPortraitMotion();
  });
  window.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || !motionIsActive() || drag) return;
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
    drag.wheelScale = Math.max(1, Math.min(2.5, drag.wheelScale - event.deltaY * unit * .002));
    drag.portrait.style.setProperty('--portrait-hold-scale', drag.wheelScale.toFixed(3));
    drag.portrait.classList.add('portrait-wheel-zoom');
  }, { passive: false });
  window.addEventListener('pointermove', (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
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
    if (event.pointerType !== 'mouse' || !motionIsActive() || drag) return;
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
    if (!motionIsActive() || event.button !== 0 || event.detail === 0) return;
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
