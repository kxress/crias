import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, rm } from 'node:fs/promises';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tempRoot = path.join(os.tmpdir(), `crias-browser-check-${process.pid}`);
const chromeCandidates = [
  process.env.CHROMIUM_PATH,
  process.env.USERPROFILE ? path.join(process.env.USERPROFILE, 'scoop', 'apps', 'chromium', 'current', 'chrome.exe') : '',
  process.env.PROGRAMFILES ? path.join(process.env.PROGRAMFILES, 'Google', 'Chrome', 'Application', 'chrome.exe') : ''
].filter(Boolean);
const chromePath = chromeCandidates.find((candidate) => existsSync(candidate));
if (!chromePath) throw new Error('Local Chromium was not found. Set CHROMIUM_PATH and rerun this check.');

async function freePort() {
  const server = net.createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  await new Promise((resolve) => server.close(resolve));
  return port;
}

async function waitUntil(check, message) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const result = await check();
      if (result) return result;
    } catch { /* server or page is still starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(message);
}

async function startPreview(siteDir, prefix = '') {
  const port = await freePort();
  const args = [path.join(repo, 'scripts', 'serve.mjs'), '--port', String(port)];
  if (prefix) args.push('--prefix', prefix);
  const previewProcess = spawn(globalThis.process.execPath, args, {
    env: { ...globalThis.process.env, SITE_DIR: siteDir },
    stdio: 'ignore',
    windowsHide: true
  });
  const base = `http://127.0.0.1:${port}${prefix ? `/${prefix}` : ''}/`;
  await waitUntil(async () => (await fetch(base)).ok, `Preview failed to start at ${base}`);
  return { base, process: previewProcess };
}

class Devtools {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result);
      }
    });
  }

  async send(method, params = {}) {
    const id = this.nextId++;
    const result = new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
    this.socket.send(JSON.stringify({ id, method, params }));
    return result;
  }

  async evaluate(expression) {
    const response = await this.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description ?? response.exceptionDetails.text);
    return response.result.value;
  }

  async navigate(url) {
    await this.send('Page.navigate', { url });
    await waitUntil(async () => (await this.evaluate('document.readyState')) === 'complete', `Page did not load: ${url}`);
  }
}

async function openBrowser() {
  const port = await freePort();
  const profile = path.join(tempRoot, 'chrome-profile');
  const args = [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-extensions',
    '--remote-allow-origins=*', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank'
  ];
  const chromeProcess = spawn(chromePath, args, { stdio: 'ignore', windowsHide: true });
  const version = await waitUntil(async () => {
    const response = await fetch(`http://127.0.0.1:${port}/json/version`);
    return response.ok ? response.json() : null;
  }, 'Chromium remote debugging did not start.');
  const targetResponse = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
  if (!targetResponse.ok) throw new Error(`Unable to create Chromium page (HTTP ${targetResponse.status}).`);
  const target = await targetResponse.json();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  const devtools = new Devtools(socket);
  await devtools.send('Page.enable');
  await devtools.send('Runtime.enable');
  return { devtools, process: chromeProcess, version: version.Browser };
}

const { serverCount } = await build();
assert.equal(serverCount, 0, 'production build starts with an empty verified directory');
await rm(tempRoot, { recursive: true, force: true });
await mkdir(tempRoot, { recursive: true });

const fixtureSite = path.join(tempRoot, 'fixture-site');
await build({ dataPath: path.join(repo, 'tests', 'fixtures', 'verified-network.json'), outputPath: fixtureSite });
const rootPreview = await startPreview(path.join(repo, 'dist'));
const sourceRootPreview = await startPreview(repo);
const subpathPreview = await startPreview(path.join(repo, 'dist'), 'crias-games');
const fixturePreview = await startPreview(fixtureSite);
const { devtools, process: chrome, version } = await openBrowser();

try {
  await devtools.send('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.__mediaQueries = [];
    const originalMatchMedia = window.matchMedia.bind(window);
    window.matchMedia = (query) => { const result = originalMatchMedia(query); window.__mediaQueries.push(result); return result; };
  ` });
  await devtools.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await devtools.navigate(rootPreview.base);
  const documentFacts = await devtools.evaluate(`(() => ({
    title: document.title,
    h1Count: document.querySelectorAll('main h1').length,
    mainCount: document.querySelectorAll('main').length,
    sectionOrder: [...document.querySelectorAll('main section')].map((section) => section.id),
    jsControlVisible: !document.querySelector('#motion-toggle').hidden,
    sourceCandidateAbsent: !document.documentElement.innerHTML.includes('netbird.kress.wtf'),
    emptyState: document.querySelector('.directory-empty')?.textContent.includes('Detalhes de conexão indisponíveis'),
    fonts: getComputedStyle(document.body).fontFamily
  }))()`);
  assert.equal(documentFacts.h1Count, 1);
  assert.equal(documentFacts.mainCount, 1);
  assert.deepEqual(documentFacts.sectionOrder, ['inicio', 'como-entrar', 'servidores']);
  assert.equal(documentFacts.jsControlVisible, true);
  assert.equal(documentFacts.sourceCandidateAbsent, true);
  assert.equal(documentFacts.emptyState, true);

  await devtools.send('Emulation.setEmulatedMedia', { features: [{ name: 'hover', value: 'hover' }, { name: 'pointer', value: 'fine' }] });
  const surfacePoint = await devtools.evaluate(`(() => { const rect = document.querySelector('.content-panel').getBoundingClientRect(); return { x: rect.left + 120, y: Math.min(rect.top + 60, innerHeight - 10) }; })()`);
  await devtools.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: surfacePoint.x, y: surfacePoint.y });
  const surfaceEffect = await devtools.evaluate(`(() => ({ light: document.querySelector('.content-panel').style.getPropertyValue('--spot-x'), tilt: document.querySelector('.content-panel').style.getPropertyValue('--tilt-y') }))()`);
  assert.ok(surfaceEffect.light, 'fine-pointer light responds to movement');
  assert.ok(surfaceEffect.tilt, 'interface surface receives a subtle tilt value');
  const characterPoint = await devtools.evaluate(`(() => { const rect = document.querySelector('[data-character]').getBoundingClientRect(); return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 - 160 }; })()`);
  await devtools.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: characterPoint.x, y: characterPoint.y });
  const characterAvoidance = await devtools.evaluate("document.querySelector('[data-character]').style.getPropertyValue('--avoid-y')");
  assert.notEqual(characterAvoidance, '0px', 'character billboard gently avoids a nearby pointer');
  await devtools.evaluate("window.dispatchEvent(new PointerEvent('pointerleave'))");
  const pointerReset = await devtools.evaluate(`(() => ({ avoid: document.querySelector('[data-character]').style.getPropertyValue('--avoid-y'), tilt: document.querySelector('.content-panel').style.getPropertyValue('--tilt-y') }))()`);
  assert.equal(pointerReset.avoid, '0px');
  assert.equal(pointerReset.tilt, '');

  await devtools.evaluate(`document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, document.documentElement.scrollHeight);`);
  await waitUntil(async () => (await devtools.evaluate("!document.querySelector('[data-character]').classList.contains('is-visible')")) === true, 'Offscreen character did not pause.');
  assert.equal(await devtools.evaluate("getComputedStyle(document.querySelector('.character-billboard')).animationName"), 'none');
  await devtools.evaluate('window.scrollTo(0, 0)');
  await waitUntil(async () => (await devtools.evaluate("document.querySelector('[data-character]').classList.contains('is-visible')")) === true, 'Character animation did not resume when it returned onscreen.');
  await devtools.evaluate(`Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => window.__visibilityOverride ?? 'visible' }); window.__visibilityOverride = 'hidden'; document.dispatchEvent(new Event('visibilitychange'));`);
  await waitUntil(async () => (await devtools.evaluate('document.documentElement.dataset.motion')) === 'suspended', 'Hidden page did not suspend ambient motion.');
  await devtools.evaluate(`window.__visibilityOverride = 'visible'; document.dispatchEvent(new Event('visibilitychange'));`);
  await waitUntil(async () => (await devtools.evaluate('document.documentElement.dataset.motion')) === 'active', 'Visible page did not restore ambient motion.');

  for (const [width, height] of [[320, 740], [360, 800], [390, 844], [680, 900], [720, 960], [768, 1024], [1024, 768], [1440, 1000], [1920, 1080]]) {
    await devtools.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width <= 680 });
    const metrics = await devtools.evaluate(`(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
      main: Math.ceil(document.querySelector('main').getBoundingClientRect().right),
      hero: Math.ceil(document.querySelector('.hero__copy').getBoundingClientRect().right),
      buttons: [...document.querySelectorAll('.button, .motion-toggle')].filter((button) => !button.hidden).map((button) => ({ w: button.getBoundingClientRect().width, h: button.getBoundingClientRect().height }))
    }))()`);
    assert.ok(metrics.document <= width, `horizontal page overflow at ${width}px (${metrics.document}px)`);
    assert.ok(metrics.main <= width + 1, `main content overflows at ${width}px`);
    assert.ok(metrics.hero <= width + 1, `hero copy overflows at ${width}px`);
    assert.ok(metrics.buttons.every((button) => button.w >= 24 && button.h >= 24), `control target under 24px at ${width}px`);
  }

  await devtools.navigate(sourceRootPreview.base);
  const rootEntry = await devtools.evaluate(`(() => ({
    path: location.pathname,
    language: document.documentElement.lang,
    css: [...document.styleSheets].some((sheet) => sheet.href?.endsWith('/site/assets/css/site.css')),
    image: document.querySelector('.scene__skyline').naturalWidth
  }))()`);
  assert.equal(rootEntry.path, '/');
  assert.equal(rootEntry.language, 'pt-BR');
  assert.equal(rootEntry.css, true, 'generated repository-root entry resolves its local assets');
  assert.ok(rootEntry.image > 0, 'generated repository-root entry loads its scenery');

  await devtools.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await devtools.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }).then(async (screenshot) => {
    await (await import('node:fs/promises')).writeFile(path.join(tempRoot, 'mobile.png'), Buffer.from(screenshot.data, 'base64'));
  });

  await devtools.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await waitUntil(async () => (await devtools.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches")) === true, 'Chromium did not apply reduced-motion emulation.');
  await devtools.evaluate(`window.__mediaQueries.find((query) => query.media === '(prefers-reduced-motion: reduce)')?.dispatchEvent(new Event('change'))`);
  const reduced = await devtools.evaluate(`(() => ({ motion: document.documentElement.dataset.motion, disabled: document.querySelector('#motion-toggle').disabled, animation: getComputedStyle(document.querySelector('.scene__grid')).animationName }))()`);
  assert.equal(reduced.motion, 'reduced');
  assert.equal(reduced.disabled, true);
  assert.equal(reduced.animation, 'none');

  await devtools.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await waitUntil(async () => (await devtools.evaluate("!matchMedia('(prefers-reduced-motion: reduce)').matches")) === true, 'Chromium did not clear reduced-motion emulation.');
  await devtools.evaluate(`window.__mediaQueries.find((query) => query.media === '(prefers-reduced-motion: reduce)')?.dispatchEvent(new Event('change'))`);
  await devtools.evaluate("document.querySelector('#motion-toggle').click()");
  assert.equal(await devtools.evaluate('document.documentElement.dataset.motion'), 'paused');
  await devtools.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await waitUntil(async () => (await devtools.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches")) === true, 'Chromium did not reapply reduced-motion emulation.');
  await devtools.evaluate(`window.__mediaQueries.find((query) => query.media === '(prefers-reduced-motion: reduce)')?.dispatchEvent(new Event('change'))`);
  await devtools.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await waitUntil(async () => (await devtools.evaluate("!matchMedia('(prefers-reduced-motion: reduce)').matches")) === true, 'Chromium did not remove reduced-motion emulation.');
  await devtools.evaluate(`window.__mediaQueries.find((query) => query.media === '(prefers-reduced-motion: reduce)')?.dispatchEvent(new Event('change'))`);
  assert.equal(await devtools.evaluate('document.documentElement.dataset.motion'), 'paused', 'manual pause survives a reduced-motion preference change');
  await devtools.evaluate("document.querySelector('#motion-toggle').click()");
  assert.equal(await devtools.evaluate('document.documentElement.dataset.motion'), 'active');

  await devtools.send('Page.navigate', { url: subpathPreview.base });
  await waitUntil(async () => (await devtools.evaluate('document.readyState')) === 'complete', 'Subpath preview did not load.');
  const subpathFacts = await devtools.evaluate(`(() => ({ path: location.pathname, image: document.querySelector('.scene__skyline').naturalWidth, css: [...document.styleSheets].some((sheet) => sheet.href?.endsWith('/assets/css/site.css')) }))()`);
  assert.equal(subpathFacts.path, '/crias-games/');
  assert.ok(subpathFacts.image > 0, 'relative scenery asset loads at a repository subpath');
  assert.equal(subpathFacts.css, true, 'relative CSS loads at a repository subpath');

  await devtools.navigate(fixturePreview.base);
  const fixtureFacts = await devtools.evaluate(`(() => ({
    hosts: [...document.querySelectorAll('.server-card__host')].map((host) => host.textContent),
    labels: [...document.querySelectorAll('.server-card .copy-button')].map((button) => button.getAttribute('aria-label')),
    liveRegions: document.querySelectorAll('[aria-live="polite"]').length
  }))()`);
  assert.equal(fixtureFacts.hosts.length, 3);
  assert.equal(fixtureFacts.hosts[1], 'a-very-long-test-hostname-to-check-wrapping-without-cutting-the-value.terraria.fixture.example.invalid');
  assert.equal(fixtureFacts.labels.length, 3);
  assert.equal(new Set(fixtureFacts.labels).size, fixtureFacts.labels.length, 'same variants have individually identifiable copy names');
  assert.ok(fixtureFacts.liveRegions >= 3);
  await devtools.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await devtools.evaluate(`document.documentElement.style.scrollBehavior = 'auto'; document.querySelector('#servidores').scrollIntoView({ block: 'start' });`);
  await devtools.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }).then(async (screenshot) => {
    await (await import('node:fs/promises')).writeFile(path.join(tempRoot, 'fixture-directory.png'), Buffer.from(screenshot.data, 'base64'));
  });
  for (const width of [320, 390, 720]) {
    await devtools.send('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 1, mobile: width <= 680 });
    const recordMetrics = await devtools.evaluate(`(() => { const host = document.querySelectorAll('.server-card__host')[1]; return { viewport: innerWidth, document: document.documentElement.scrollWidth, hostWidth: host.clientWidth, hostScroll: host.scrollWidth, cardRight: Math.ceil(host.closest('.server-card').getBoundingClientRect().right) }; })()`);
    assert.ok(recordMetrics.document <= width, `long fixture hostname caused page overflow at ${width}px`);
    assert.ok(recordMetrics.hostScroll <= recordMetrics.hostWidth + 1, `long fixture hostname is clipped at ${width}px`);
    assert.ok(recordMetrics.cardRight <= width + 1, `fixture server card overflows at ${width}px`);
  }

  await devtools.evaluate(`Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (value) => { window.__copied = value; } } });
    document.documentElement.style.scrollBehavior = 'auto';
    const button = document.querySelector('.server-card .copy-button'); button.focus(); button.scrollIntoView({ block: 'center' });`);
  await devtools.send('Page.bringToFront');
  await devtools.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 });
  await devtools.send('Input.dispatchKeyEvent', { type: 'char', key: 'Enter', code: 'Enter', text: '\r' });
  await devtools.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 });
  await waitUntil(async () => (await devtools.evaluate('document.querySelector(".server-card .copy-feedback").textContent')) === 'Copiado.', 'Copy success feedback did not appear.');
  const copied = await devtools.evaluate(`({ value: window.__copied, host: document.querySelector('.server-card__host').textContent, focus: document.activeElement === document.querySelector('.server-card .copy-button') })`);
  assert.equal(copied.value, copied.host, 'hostname copy contains no port or extra text');
  assert.equal(copied.focus, true, 'copy leaves focus on its button');
  await devtools.evaluate("document.querySelector('.management-value .copy-button').click()");
  await waitUntil(async () => (await devtools.evaluate('window.__copied')) === 'https://ops-confirmed.invalid', 'Management URL copy did not copy the complete displayed URL.');
  assert.equal(await devtools.evaluate('document.querySelector(".management-value .copy-feedback").textContent'), 'Copiado.');
  await devtools.evaluate("document.querySelector('.server-card .copy-button').click()");
  await waitUntil(async () => (await devtools.evaluate('window.__copied')) === 'fixture-one.example.invalid', 'Repeated copy did not work.');

  await devtools.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await devtools.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
  await devtools.evaluate(`(() => { document.documentElement.style.scrollBehavior = 'auto'; const button = document.querySelectorAll('.server-card .copy-button')[1]; window.scrollTo(0, Math.max(0, button.getBoundingClientRect().top + scrollY - innerHeight / 2)); })()`);
  const touchPoint = await devtools.evaluate(`(() => { const button = document.querySelectorAll('.server-card .copy-button')[1]; const rect = button.getBoundingClientRect(); return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, visible: rect.top >= 0 && rect.bottom <= innerHeight, scrollY, innerHeight }; })()`);
  assert.equal(touchPoint.visible, true, `touch target is brought into the viewport: ${JSON.stringify(touchPoint)}`);
  await devtools.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: touchPoint.x, y: touchPoint.y, id: 1 }] });
  await devtools.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [], changedTouches: [{ x: touchPoint.x, y: touchPoint.y, id: 1 }] });
  await waitUntil(async () => (await devtools.evaluate('window.__copied')) === 'a-very-long-test-hostname-to-check-wrapping-without-cutting-the-value.terraria.fixture.example.invalid', 'Touch activation did not copy the second hostname.');
  await devtools.send('Emulation.setTouchEmulationEnabled', { enabled: false });
  await devtools.evaluate(`Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('denied'); } } }); document.querySelector('.management-value .copy-button').focus(); document.querySelector('.management-value .copy-button').click();`);
  await waitUntil(async () => (await devtools.evaluate('document.querySelector(".management-value .copy-feedback").textContent')).includes('manualmente'), 'Manual-copy failure feedback did not appear.');
  const recovery = await devtools.evaluate(`({
    focus: document.activeElement === document.querySelector('.management-value .copy-button'),
    selectable: getComputedStyle(document.querySelector('.management-value code')).userSelect,
    exact: document.querySelector('.management-value code').textContent
  })`);
  assert.equal(recovery.focus, true);
  assert.equal(recovery.selectable, 'text');
  assert.equal(recovery.exact, 'https://ops-confirmed.invalid');

  await devtools.send('Emulation.setScriptExecutionDisabled', { value: true });
  await devtools.send('Page.navigate', { url: rootPreview.base });
  await waitUntil(async () => (await devtools.evaluate('document.readyState')) === 'complete', 'No-script production page did not load.');
  const noScript = await devtools.evaluate(`(() => ({
    heading: document.querySelector('h1')?.textContent.trim(),
    empty: !!document.querySelector('.directory-empty'),
    motionHidden: document.querySelector('#motion-toggle').hidden,
    copyButtons: document.querySelectorAll('.copy-button').length
  }))()`);
  assert.equal(noScript.heading, 'CRIAS GAMES');
  assert.equal(noScript.empty, true);
  assert.equal(noScript.motionHidden, true);
  assert.equal(noScript.copyButtons, 0);
  await devtools.send('Emulation.setScriptExecutionDisabled', { value: false });

  await devtools.send('Network.enable');
  await devtools.send('Network.setBlockedURLs', { urls: ['*arcade-host.webp', '*neon-skyline.webp'] });
  await devtools.navigate(rootPreview.base);
  const failedAssets = await devtools.evaluate(`({ title: document.title, heading: document.querySelector('h1')?.textContent.trim(), imageMissing: document.querySelector('.scene__skyline').naturalWidth === 0 })`);
  assert.equal(failedAssets.heading, 'CRIAS GAMES');
  assert.equal(failedAssets.imageMissing, true);

  console.log(`Chromium ${version}: responsive (including 720 CSS px as the 200% zoom reflow width), subpath, reduced-motion, pause, keyboard/touch copy, copy recovery, no-JavaScript, and failed-asset checks passed.`);
  console.log(`Desktop fixture directory and mobile screenshots saved under ${tempRoot}`);
} finally {
  devtools.socket.close();
  chrome.kill();
  for (const preview of [rootPreview, sourceRootPreview, subpathPreview, fixturePreview]) preview.process.kill();
}
