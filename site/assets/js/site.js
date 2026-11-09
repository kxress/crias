(() => {
  const root = document.documentElement;
  const motionButton = document.getElementById('motion-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let manuallyPaused = false;
  let pageHidden = document.visibilityState === 'hidden';

  const resetPointerEffects = () => {
    root.style.setProperty('--cursor-x', '50vw');
    root.style.setProperty('--cursor-y', '30vh');
    document.querySelectorAll('[data-tilt-surface]').forEach((surface) => {
      surface.style.removeProperty('--tilt-x');
      surface.style.removeProperty('--tilt-y');
      surface.style.removeProperty('--spot-x');
      surface.style.removeProperty('--spot-y');
    });
    document.querySelectorAll('[data-character]').forEach((character) => {
      character.style.setProperty('--avoid-x', '0px');
      character.style.setProperty('--avoid-y', '0px');
    });
  };

  const syncMotion = () => {
    resetPointerEffects();
    if (reducedMotion.matches) {
      root.dataset.motion = 'reduced';
      motionButton.disabled = true;
      motionButton.textContent = 'Movimento reduzido pelo sistema';
      motionButton.setAttribute('aria-pressed', 'true');
      motionButton.setAttribute('aria-label', 'Animação decorativa desativada pela preferência de movimento reduzido do sistema');
      return;
    }
    motionButton.disabled = false;
    motionButton.removeAttribute('aria-label');
    if (manuallyPaused) {
      root.dataset.motion = 'paused';
      motionButton.textContent = '▶ Retomar animação';
      motionButton.setAttribute('aria-pressed', 'true');
    } else if (pageHidden) {
      root.dataset.motion = 'suspended';
      motionButton.textContent = '⏸ Pausar animação';
      motionButton.setAttribute('aria-pressed', 'false');
    } else {
      root.dataset.motion = 'active';
      motionButton.textContent = '⏸ Pausar animação';
      motionButton.setAttribute('aria-pressed', 'false');
    }
  };

  motionButton.hidden = false;
  motionButton.addEventListener('click', () => {
    if (reducedMotion.matches) return;
    manuallyPaused = !manuallyPaused;
    syncMotion();
  });
  reducedMotion.addEventListener?.('change', syncMotion);
  document.addEventListener('visibilitychange', () => {
    pageHidden = document.visibilityState === 'hidden';
    syncMotion();
  });

  const characters = [...document.querySelectorAll('[data-character]')];
  if ('IntersectionObserver' in window) {
    const characterObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.classList.toggle('is-visible', entry.isIntersecting);
    }, { threshold: 0.05 });
    characters.forEach((character) => characterObserver.observe(character));
  } else {
    characters.forEach((character) => character.classList.add('is-visible'));
  }

  const setFeedback = (element, message, kind = 'success') => {
    const feedback = element.closest('.server-card, .management-value')?.querySelector('.copy-feedback');
    if (!feedback) return;
    feedback.textContent = message;
    feedback.dataset.kind = kind;
  };

  document.querySelectorAll('[data-copy-value]').forEach((valueElement) => {
    const slot = valueElement.closest('.server-card, .management-value')?.querySelector('.copy-slot');
    if (!slot) return;
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.type = 'button';
    button.textContent = 'Copiar';
    button.setAttribute('aria-label', valueElement.dataset.copyName || 'Copiar valor');
    button.addEventListener('click', async () => {
      const exactValue = valueElement.textContent;
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(exactValue);
        setFeedback(valueElement, 'Copiado.');
      } catch {
        setFeedback(valueElement, 'Não foi possível copiar. Selecione o valor e copie manualmente.', 'error');
      }
    });
    slot.append(button);
  });

  const updateSurface = (surface, event) => {
    const bounds = surface.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const normalizedX = (x / bounds.width - 0.5) * 2;
    const normalizedY = (y / bounds.height - 0.5) * 2;
    surface.style.setProperty('--tilt-x', `${(-normalizedY * 1.1).toFixed(2)}deg`);
    surface.style.setProperty('--tilt-y', `${(normalizedX * 1.1).toFixed(2)}deg`);
    surface.style.setProperty('--spot-x', `${x.toFixed(0)}px`);
    surface.style.setProperty('--spot-y', `${y.toFixed(0)}px`);
  };

  window.addEventListener('pointermove', (event) => {
    if (!finePointer.matches || event.pointerType === 'touch' || root.dataset.motion !== 'active') return;
    root.style.setProperty('--cursor-x', `${event.clientX}px`);
    root.style.setProperty('--cursor-y', `${event.clientY}px`);
    for (const surface of document.querySelectorAll('[data-tilt-surface]')) {
      const bounds = surface.getBoundingClientRect();
      if (event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom) {
        updateSurface(surface, event);
      }
    }
    for (const character of characters) {
      const bounds = character.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const dx = centerX - event.clientX;
      const dy = centerY - event.clientY;
      const distance = Math.hypot(dx, dy);
      const range = 240;
      const strength = Math.max(0, (range - distance) / range);
      const displacement = Math.min(14, strength * 14);
      if (distance > 0) {
        character.style.setProperty('--avoid-x', `${(dx / distance * displacement).toFixed(1)}px`);
        character.style.setProperty('--avoid-y', `${(dy / distance * displacement).toFixed(1)}px`);
      }
    }
  }, { passive: true });

  window.addEventListener('pointerleave', resetPointerEffects);
  window.addEventListener('pointercancel', resetPointerEffects);
  finePointer.addEventListener?.('change', resetPointerEffects);
  syncMotion();
})();
