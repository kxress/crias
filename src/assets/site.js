const status = document.getElementById('copy-feedback');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
let announceTimer = 0;
let announceRevealTimer = 0;

const motionIsActive = () => !reducedMotion.matches;
const resetCardTilt = (card) => {
  ['--card-tilt-x', '--card-tilt-y', '--card-spot-x', '--card-spot-y', '--card-brightness', '--card-glare-opacity'].forEach((name) => card.style.removeProperty(name));
};
const clearPointerEffects = () => {
  document.querySelectorAll('.game-card').forEach(resetCardTilt);
};

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
  card.style.setProperty('--card-tilt-x', `${(normalizedX * 6).toFixed(2)}deg`);
  card.style.setProperty('--card-tilt-y', `${(-normalizedY * 6).toFixed(2)}deg`);
  card.style.setProperty('--card-spot-x', `${((normalizedX + 1) * 50).toFixed(1)}%`);
  card.style.setProperty('--card-spot-y', `${((normalizedY + 1) * 50).toFixed(1)}%`);
  card.style.setProperty('--card-brightness', (1.08 - normalizedY * .24).toFixed(2));
  card.style.setProperty('--card-glare-opacity', (.55 + Math.min(.3, magnitude * .2)).toFixed(2));
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
  clearTimeout(announceTimer);
  clearTimeout(announceRevealTimer);
  status.textContent = '';
  delete status.dataset.state;
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
