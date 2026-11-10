(() => {
  const root = document.documentElement;
  const softwareRenderer = /swiftshader|llvmpipe|softpipe|swrast|lavapipe|software|basic render|gdi generic|\bwarp\b/i;
  const maskedRenderer = /^(?:webgl2?|webkit webgl|angle|unknown)$/i;

  function isAccelerated(gl) {
    if (!gl) return false;
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo || !gl.getExtension('EXT_color_buffer_float')) return false;
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    if (typeof renderer !== 'string' || !renderer.trim() || maskedRenderer.test(renderer.trim())) return false;
    return !softwareRenderer.test(`${renderer} ${vendor || ''}`);
  }

  function disable() {
    const wasActive = !root.classList.contains('motion-static');
    root.classList.add('motion-static');
    if (wasActive) document.dispatchEvent(new Event('crias:motion-disabled'));
  }

  window.criasMotion = Object.freeze({ isAccelerated, disable });

  let gl;
  try {
    gl = document.createElement('canvas').getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      failIfMajorPerformanceCaveat: true,
      powerPreference: 'high-performance'
    });
    if (isAccelerated(gl)) root.classList.remove('motion-static');
  } catch {
    // Keep the default static state when the browser cannot identify the renderer.
  } finally {
    try { gl?.getExtension('WEBGL_lose_context')?.loseContext(); } catch { /* The probe is already unusable. */ }
  }
})();
