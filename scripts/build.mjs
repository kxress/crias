import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.resolve(root, process.env.OUT_DIR || 'dist');
const data = JSON.parse(await readFile(path.join(root, 'src/data/servers.json'), 'utf8'));
const template = await readFile(path.join(root, 'src/template.html'), 'utf8');
const safe = (text) => String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const readableHostname = (hostname) => safe(hostname).replaceAll('.', '.<wbr>');

const cards = data.games.map((game) => {
  const [artWidth, artHeight] = game.accent === 'terraria' ? [1774, 887] : [1672, 941];
  return `
  <article class="game-card game-card--${safe(game.accent)}" aria-labelledby="game-${safe(game.accent)}">
    <div class="game-art game-art--${safe(game.accent)}" aria-hidden="true"><img class="game-art__image" src="./assets/art/${safe(game.accent)}-scene.webp" width="${artWidth}" height="${artHeight}" alt=""><span class="game-art__logo">${safe(game.name)}</span></div>
    <h3 class="visually-hidden" id="game-${safe(game.accent)}">${safe(game.name)}</h3>
    <ul class="server-list">
      ${game.servers.map((server) => `<li class="server-row">
        <span class="server-row__hostname" id="host-${safe(server.hostname)}">${readableHostname(server.hostname)}</span>
        <span class="server-row__details"><span class="badge badge--${safe(game.accent)} badge--${safe(server.variant.toLowerCase().replace(/\s+/g, '-'))}">${safe(server.variant)}</span><span>Porta: ${safe(server.port)}${server.protocol === 'UDP' ? ' / UDP' : ''}</span></span>
        <button class="copy-button" type="button" data-copy="${safe(server.hostname)}" aria-label="Copiar endereço ${safe(server.hostname)}" hidden><span aria-hidden="true"></span></button>
      </li>`).join('')}
    </ul>
    ${game.accent === 'minecraft' ? '<div class="game-landscape game-landscape--minecraft" aria-hidden="true"><span>▟ ▙ ▟</span></div>' : ''}
    ${game.accent === 'hytale' ? '<div class="game-landscape game-landscape--hytale" aria-hidden="true"><img src="./assets/art/hytale-scene.webp" width="1672" height="941" alt=""></div>' : ''}
  </article>`;
}).join('\n');

const html = template.replaceAll('{{MANAGEMENT_URL}}', safe(data.managementUrl)).replace('{{GAME_CARDS}}', cards);
await rm(out, { recursive: true, force: true });
await mkdir(path.join(out, 'assets/art'), { recursive: true });
await writeFile(path.join(out, 'index.html'), html);
await cp(path.join(root, 'src/assets/site.css'), path.join(out, 'assets/site.css'));
await cp(path.join(root, 'src/assets/site.js'), path.join(out, 'assets/site.js'));
await cp(path.join(root, 'src/assets/art'), path.join(out, 'assets/art'), { recursive: true });
await cp(path.join(root, 'src/experiments'), path.join(out, 'experiments'), { recursive: true });
console.log(`Built ${path.relative(root, out)} with ${data.games.reduce((n, game) => n + game.servers.length, 0)} server records.`);
