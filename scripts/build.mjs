import { copyFile, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.resolve(root, process.env.OUT_DIR || 'dist');
if (out === root || root.startsWith(`${out}${path.sep}`)) throw new Error('Build output must not contain the source repository.');
const data = JSON.parse(await readFile(path.join(root, 'src/data/servers.json'), 'utf8'));
const template = await readFile(path.join(root, 'src/template.html'), 'utf8');
const safe = (text) => String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const readableHostname = (hostname) => safe(hostname).replaceAll('.', '.<wbr>');

const cards = data.games.map((game) => {
  const [artWidth, artHeight] = game.accent === 'terraria' ? [950, 350] : [1600, 900];
  return `
  <article class="game-card game-card--${safe(game.accent)}" aria-labelledby="game-${safe(game.accent)}">
    <img class="game-card__art" src="./assets/art/${safe(game.accent)}-background-1.webp" width="${artWidth}" height="${artHeight}" alt="" aria-hidden="true">
    <div class="game-art" aria-hidden="true"><span class="game-art__logo">${safe(game.name)}</span></div>
    <h3 class="visually-hidden" id="game-${safe(game.accent)}">${safe(game.name)}</h3>
    <ul class="server-list">
      ${game.servers.map((server) => `<li class="server-row">
        <span class="server-row__hostname" id="host-${safe(server.hostname)}">${readableHostname(server.hostname)}</span>
        <span class="server-row__details">${server.detailsUrl ? `<a class="badge badge--${safe(game.accent)} badge--${safe(server.variant.toLowerCase().replace(/\s+/g, '-'))} badge--link" href="${safe(server.detailsUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Detalhes de ${safe(server.variant)} (abre em nova aba)">${safe(server.variant)}</a>` : `<span class="badge badge--${safe(game.accent)} badge--${safe(server.variant.toLowerCase().replace(/\s+/g, '-'))}">${safe(server.variant)}</span>`}${server.edition ? `<span class="server-row__edition">${safe(server.edition)}</span>` : ''}<span>Porta: ${safe(server.port)} / ${safe(server.protocol)}</span></span>
        <button class="copy-button" type="button" data-copy="${safe(server.hostname)}" aria-label="Copiar endereço ${safe(server.hostname)}" hidden><span aria-hidden="true"></span></button>
      </li>`).join('')}
    </ul>
    ${game.mapUrl ? `<a class="game-map" href="${safe(game.mapUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Abrir BlueMap do Minecraft (abre em nova aba)">Ver mapa (BlueMap) <span aria-hidden="true">↗</span></a>` : ''}
  </article>`;
}).join('\n');

const html = template.replaceAll('{{MANAGEMENT_URL}}', safe(data.managementUrl)).replace('{{GAME_CARDS}}', cards);
const emitted = new Set();

async function publish(relativePath, source, content) {
  const target = path.join(out, relativePath);
  const temporary = `${target}.build-${process.pid}.tmp`;
  await mkdir(path.dirname(target), { recursive: true });
  if (source) await copyFile(source, temporary);
  else await writeFile(temporary, content);
  await rename(temporary, target);
  emitted.add(target);
}

async function publishDirectory(source, relativePath) {
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const input = path.join(source, entry.name);
    const output = path.join(relativePath, entry.name);
    if (entry.isDirectory()) await publishDirectory(input, output);
    else if (entry.isFile()) await publish(output, input);
  }
}

async function pruneObsolete(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await pruneObsolete(file);
    else if (!emitted.has(file)) await rm(file);
  }
}

// Keep the live preview available: publish complete files, then HTML, then prune.
await mkdir(out, { recursive: true });
await publish('assets/motion-capability.js', path.join(root, 'src/assets/motion-capability.js'));
await publish('assets/site.css', path.join(root, 'src/assets/site.css'));
await publish('assets/site.js', path.join(root, 'src/assets/site.js'));
await publish('assets/fluid-smoke.js', path.join(root, 'src/assets/fluid-smoke.js'));
await publishDirectory(path.join(root, 'src/assets/art'), 'assets/art');
await publishDirectory(path.join(root, 'src/experiments'), 'experiments');
await publish('index.html', null, html);
await pruneObsolete(out);
console.log(`Built ${path.relative(root, out)} with ${data.games.reduce((n, game) => n + game.servers.length, 0)} server records.`);
