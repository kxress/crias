const html = document.documentElement;
const toggle = document.getElementById('motion-toggle');
const status = document.getElementById('copy-feedback');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
let manuallyPaused = false;
let pointerTrail = null;

const motionIsActive = () => !manuallyPaused && !reducedMotion.matches;
const clearPointerTrail = () => pointerTrail?.replaceChildren();
const resetCardTilt = (card) => {
  ['--card-tilt-x', '--card-tilt-y', '--card-spot-x', '--card-spot-y'].forEach((name) => card.style.removeProperty(name));
};
const clearPointerEffects = () => {
  clearPointerTrail();
  document.querySelectorAll('.game-card').forEach(resetCardTilt);
};

if (toggle) {
  toggle.hidden = false;
  const syncMotion = () => {
    const paused = manuallyPaused || reducedMotion.matches;
    html.classList.toggle('motion-paused', paused);
    if (paused) clearPointerEffects();
    toggle.setAttribute('aria-pressed', String(manuallyPaused));
    toggle.textContent = manuallyPaused ? '▶ Retomar animação' : '⏸ Pausar animação';
    toggle.disabled = reducedMotion.matches;
    toggle.title = reducedMotion.matches ? 'Animação reduzida pela preferência do sistema' : '';
  };
  toggle.addEventListener('click', () => { manuallyPaused = !manuallyPaused; syncMotion(); });
  reducedMotion.addEventListener('change', syncMotion);
  syncMotion();
}

if (finePointer.matches) {
  pointerTrail = document.createElement('div');
  pointerTrail.className = 'pointer-trail';
  pointerTrail.setAttribute('aria-hidden', 'true');
  document.body.append(pointerTrail);

  let pointerX = 0;
  let pointerY = 0;
  let framePending = false;
  let lastPuffAt = -Infinity;

  window.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse' || !motionIsActive()) return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (framePending) return;
    framePending = true;

    requestAnimationFrame(() => {
      framePending = false;
      if (!motionIsActive()) return clearPointerTrail();
      const now = performance.now();
      if (now - lastPuffAt < 48) return;
      lastPuffAt = now;
      while (pointerTrail.childElementCount >= 12) pointerTrail.firstElementChild?.remove();

      const puff = document.createElement('span');
      puff.className = 'pointer-trail__puff';
      const size = 22 + Math.random() * 24;
      puff.style.cssText = `left:${pointerX}px;top:${pointerY}px;width:${size}px;height:${size}px;--drift-x:${(Math.random() - .5) * 44}px;--drift-y:${-18 - Math.random() * 48}px;--trail-hue:${Math.random() < .5 ? 190 : 315}`;
      pointerTrail.append(puff);
      puff.addEventListener('animationend', () => puff.remove(), { once: true });
    });
  }, { passive: true });
}

function setCardTilt(card, x, y) {
  if (!motionIsActive() || card.matches(':focus-within')) {
    resetCardTilt(card);
    return;
  }
  const rect = card.getBoundingClientRect();
  const normalizedX = Math.max(-1, Math.min(1, (x - rect.left - rect.width / 2) / (rect.width / 2)));
  const normalizedY = Math.max(-1, Math.min(1, (y - rect.top - rect.height / 2) / (rect.height / 2)));
  const magnitude = Math.hypot(normalizedX, normalizedY) || 1;
  const limit = Math.min(1, 1 / magnitude);
  card.style.setProperty('--card-tilt-x', `${(normalizedX * limit * 2).toFixed(2)}deg`);
  card.style.setProperty('--card-tilt-y', `${(-normalizedY * limit * 2).toFixed(2)}deg`);
  card.style.setProperty('--card-spot-x', `${((normalizedX + 1) * 50).toFixed(1)}%`);
  card.style.setProperty('--card-spot-y', `${((normalizedY + 1) * 50).toFixed(1)}%`);
}

if (finePointer.matches) {
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

function announce(message, state) {
  if (!status) return;
  status.textContent = message;
  status.dataset.state = state;
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
