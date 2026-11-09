const html = document.documentElement;
const toggle = document.getElementById('motion-toggle');
const status = document.getElementById('copy-feedback');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let manuallyPaused = false;

if (toggle) {
  toggle.hidden = false;
  const syncMotion = () => {
    const paused = manuallyPaused || reducedMotion.matches;
    html.classList.toggle('motion-paused', paused);
    toggle.setAttribute('aria-pressed', String(manuallyPaused));
    toggle.textContent = manuallyPaused ? '▶ Retomar animação' : '⏸ Pausar animação';
    toggle.disabled = reducedMotion.matches;
    toggle.title = reducedMotion.matches ? 'Animação reduzida pela preferência do sistema' : '';
  };
  toggle.addEventListener('click', () => { manuallyPaused = !manuallyPaused; syncMotion(); });
  reducedMotion.addEventListener('change', syncMotion);
  syncMotion();
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
