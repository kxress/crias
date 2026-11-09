import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const templatePath = path.join(repo, 'site', 'index.template.html');
const assetsPath = path.join(repo, 'site', 'assets');
const defaultDataPath = path.join(repo, 'content', 'verified-network.json');
const defaultOutputPath = path.join(repo, 'dist');
const protocolSet = new Set(['TCP', 'UDP']);
const gameAccent = { Terraria: '#75e7ff', Minecraft: '#92e5b1', Hytale: '#b8a1ff' };

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

function hasConfirmation(entry) {
  return typeof entry.confirmedBy === 'string' && entry.confirmedBy.trim().length > 0
    && typeof entry.confirmedAt === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(entry.confirmedAt);
}

function validateNetworkData(data) {
  if (!data || !data.management || !data.invitationContact || !Array.isArray(data.servers)) {
    throw new Error('verified-network.json must define management, invitationContact, and servers.');
  }

  if (data.management.value !== null) {
    if (!hasConfirmation(data.management)) throw new Error('Management URL requires operator and date confirmation.');
    const url = new URL(data.management.value);
    if (url.protocol !== 'https:') throw new Error('Management URL must use HTTPS.');
  }

  if (data.invitationContact.value !== null) {
    if (!hasConfirmation(data.invitationContact)) throw new Error('Invitation contact requires operator and date confirmation.');
    if (typeof data.invitationContact.label !== 'string' || !data.invitationContact.label.trim()) {
      throw new Error('A confirmed invitation contact requires a visible label.');
    }
    if (!/^(mailto:|https:\/\/)/i.test(data.invitationContact.value)) {
      throw new Error('Invitation contact must be a mailto or HTTPS URL.');
    }
  }

  const ids = new Set();
  for (const [index, record] of data.servers.entries()) {
    const fields = ['id', 'game', 'variant', 'hostname'];
    if (fields.some((key) => typeof record[key] !== 'string' || !record[key].trim())) {
      throw new Error(`Server ${index + 1} requires id, game, variant, and hostname.`);
    }
    if (ids.has(record.id)) throw new Error(`Duplicate server id: ${record.id}`);
    ids.add(record.id);
    if (!Number.isInteger(record.port) || record.port < 1 || record.port > 65535) {
      throw new Error(`Server ${record.id} requires a valid numeric port.`);
    }
    if (!protocolSet.has(record.protocol)) throw new Error(`Server ${record.id} requires TCP or UDP protocol.`);
    if (!hasConfirmation(record)) throw new Error(`Server ${record.id} requires operator and date confirmation.`);
  }
  return data;
}

function renderManagement(data) {
  if (data.management.value === null) {
    return {
      status: '<p class="unavailable-inline"><span aria-hidden="true">◎</span> Configuração indisponível enquanto aguarda confirmação do operador.</p>',
      value: ''
    };
  }
  const url = escapeHtml(data.management.value);
  return {
    status: '<p class="verified-inline"><span aria-hidden="true">✓</span> Endereço confirmado pelo operador da rede.</p>',
    value: `<div class="management-value"><span>Management URL:</span><code data-copy-value="${url}" data-copy-name="URL de gerenciamento do NetBird">${url}</code><span class="copy-slot"></span><span class="copy-feedback" aria-live="polite" aria-atomic="true"></span><span class="copy-hint">Sem JavaScript, selecione e copie o texto manualmente.</span></div>`
  };
}

function renderInvitation(data) {
  if (data.invitationContact.value === null) {
    return '<p class="unavailable-inline"><span aria-hidden="true">✉</span> Canal de contato ainda não confirmado.</p>';
  }
  const value = escapeHtml(data.invitationContact.value);
  const label = escapeHtml(data.invitationContact.label);
  return `<p class="verified-inline"><span aria-hidden="true">✓</span> Contato confirmado: <a href="${value}">${label}</a>. O convite continua sendo manual.</p>`;
}

function renderServers(records) {
  if (records.length === 0) {
    return '<div class="directory-empty"><span class="directory-empty__icon" aria-hidden="true">⌁</span><h3>Detalhes de conexão indisponíveis no momento</h3><p>Os dados só aparecem aqui depois que o operador da rede confirma host, porta, protocolo e variante. Não há indicação de disponibilidade ao vivo.</p></div>';
  }

  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.game)) groups.set(record.game, []);
    groups.get(record.game).push(record);
  }

  return [...groups.entries()].map(([game, groupRecords]) => {
    const accent = gameAccent[game] ?? '#d9a1ff';
    const cards = groupRecords.map((record) => {
      const gameName = escapeHtml(record.game);
      const variant = escapeHtml(record.variant);
      const hostname = escapeHtml(record.hostname);
      const id = escapeHtml(record.id);
      const copyName = escapeHtml(`Copiar host de ${record.game}, ${record.variant}: ${record.hostname}`);
      return `<li class="server-card" data-server-id="${id}">
        <div class="server-card__top"><span class="server-card__variant">${variant}</span><span class="copy-slot"></span></div>
        <code class="server-card__host" data-copy-value="${hostname}" data-copy-name="${copyName}">${hostname}</code>
        <dl class="server-card__details"><div><dt>Jogo</dt><dd>${gameName}</dd></div><div><dt>Porta</dt><dd>${record.port}</dd></div><div><dt>Protocolo</dt><dd>${record.protocol}</dd></div></dl>
        <span class="copy-feedback" aria-live="polite" aria-atomic="true"></span>
      </li>`;
    }).join('\n');
    return `<section class="game-group" style="--game-accent:${accent}" aria-labelledby="game-${escapeHtml(game.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-'))}">
      <h3 id="game-${escapeHtml(game.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-'))}">${escapeHtml(game)}</h3>
      <ul class="server-list">${cards}</ul>
    </section>`;
  }).join('\n');
}

export async function build({ dataPath = defaultDataPath, outputPath = defaultOutputPath } = {}) {
  const data = validateNetworkData(JSON.parse(await readFile(dataPath, 'utf8')));
  const template = await readFile(templatePath, 'utf8');
  const management = renderManagement(data);
  const renderTemplate = (assetPrefix) => template
    .replaceAll('{{ASSET_PREFIX}}', assetPrefix)
    .replace('{{MANAGEMENT_STATUS}}', management.status)
    .replace('{{MANAGEMENT_URL_CONTENT}}', management.value)
    .replace('{{INVITATION_CONTACT_STATUS}}', renderInvitation(data))
    .replace('{{SERVER_DIRECTORY}}', renderServers(data.servers));
  const output = renderTemplate('./assets');
  const rootPreview = renderTemplate('./site/assets');

  if (output.includes('{{') || rootPreview.includes('{{')) throw new Error('An unrendered template token remains.');
  const target = path.resolve(outputPath);
  const repoRelative = path.relative(repo, target);
  const tempRoot = path.resolve(os.tmpdir());
  const tempRelative = path.relative(tempRoot, target);
  const insideRepo = repoRelative && !repoRelative.startsWith('..') && !path.isAbsolute(repoRelative);
  const insideTemp = tempRelative && !tempRelative.startsWith('..') && !path.isAbsolute(tempRelative);
  if ((!insideRepo && !insideTemp) || target === repo || target === tempRoot) {
    throw new Error('Build output must be a child of the repository or the operating-system temp directory.');
  }
  await rm(target, { recursive: true, force: true });
  await mkdir(target, { recursive: true });
  await writeFile(path.join(target, 'index.html'), output, 'utf8');
  await cp(assetsPath, path.join(target, 'assets'), { recursive: true });
  if (path.resolve(dataPath) === defaultDataPath && target === defaultOutputPath) {
    await writeFile(path.join(repo, 'index.html'), rootPreview, 'utf8');
  }
  return { outputPath: target, serverCount: data.servers.length };
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const dataIndex = args.indexOf('--data');
  const outputIndex = args.indexOf('--out');
  const dataPath = dataIndex >= 0 ? path.resolve(args[dataIndex + 1]) : defaultDataPath;
  const outputPath = outputIndex >= 0 ? path.resolve(args[outputIndex + 1]) : defaultOutputPath;
  const result = await build({ dataPath, outputPath });
  console.log(`Built ${result.outputPath} with ${result.serverCount} verified server record(s).`);
}
