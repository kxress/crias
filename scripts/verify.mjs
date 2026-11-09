import assert from 'node:assert/strict';
import { readFile, readdir, rm, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(repo, 'dist');
const fixture = path.join(repo, 'tests', 'fixtures', 'verified-network.json');

function luminance(hex) {
  const channels = hex.replace('#', '').match(/.{2}/g).map((channel) => parseInt(channel, 16) / 255);
  const [r, g, b] = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function assertContrast(text, background, label) {
  const levels = [luminance(text), luminance(background)].sort((a, b) => b - a);
  const ratio = (levels[0] + 0.05) / (levels[1] + 0.05);
  assert.ok(ratio >= 4.5, `${label} contrast is ${ratio.toFixed(2)}:1, below WCAG AA body text.`);
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(entryPath));
    else files.push(entryPath);
  }
  return files;
}

await build();
const publishedHtml = await readFile(path.join(dist, 'index.html'), 'utf8');
const rootHtml = await readFile(path.join(repo, 'index.html'), 'utf8');
const css = await readFile(path.join(dist, 'assets', 'css', 'site.css'), 'utf8');
assert.match(publishedHtml, /lang="pt-BR"/);
assert.match(publishedHtml, /Detalhes de conexão indisponíveis no momento/);
assert.match(publishedHtml, /Canal de contato ainda não confirmado/);
assert.match(publishedHtml, /https:\/\/docs\.netbird\.io\/get-started\/install/);
assert.doesNotMatch(publishedHtml, /data-copy-value=/, 'Unavailable values must have no copy controls.');
assert.match(rootHtml, /lang="pt-BR"/);
assert.match(rootHtml, /href="\.\/site\/assets\/css\/site\.css"/);
assert.match(rootHtml, /src="\.\/site\/assets\/images\/neon-skyline\.webp"/);
assertContrast('#f8f3ff', '#171026', 'primary text on a panel');
assertContrast('#d1c7df', '#171026', 'secondary text on a panel');
assertContrast('#ffe2a9', '#1d1428', 'unavailable-state text');
assertContrast('#76eeff', '#0f0b19', 'hostname');
assertContrast('#140b20', '#76eeff', 'primary-button label');
const animationRules = [...css.matchAll(/animation:\s*([^;]+);/g)].map((match) => match[1]);
const animationPeriods = animationRules.flatMap((rule) => [...rule.matchAll(/([\d.]+)s\b/g)].map((match) => Number(match[1])));
assert.ok(animationPeriods.length >= 5, 'ambient and character motion remain present');
assert.ok(animationPeriods.every((seconds) => seconds >= 2), 'persistent animation periods remain far below the WCAG flash frequency threshold');

const candidates = JSON.parse(await readFile(path.join(repo, 'content', 'operator-candidates.json'), 'utf8'));
const publicFiles = await collectFiles(dist);
const publicText = (await Promise.all(publicFiles.map((file) => readFile(file)))).map((buffer) => buffer.toString('utf8')).join('\n');
for (const candidate of [candidates.managementUrl, ...candidates.servers.map((server) => server.hostname)]) {
  assert.ok(!publicText.includes(candidate), `Candidate leaked into published output: ${candidate}`);
  assert.ok(!rootHtml.includes(candidate), `Candidate leaked into the generated root page: ${candidate}`);
}

const fixtureOutput = path.join(os.tmpdir(), `crias-games-fixture-${process.pid}`);
try {
  await build({ dataPath: fixture, outputPath: fixtureOutput });
  const fixtureHtml = await readFile(path.join(fixtureOutput, 'index.html'), 'utf8');
  assert.match(fixtureHtml, /ops-confirmed\.invalid/);
  assert.match(fixtureHtml, /fixture-one\.example\.invalid/);
  assert.match(fixtureHtml, /a-very-long-test-hostname-to-check-wrapping-without-cutting-the-value\.terraria\.fixture\.example\.invalid/);
  assert.match(fixtureHtml, /test-vanilla-one/);
  assert.match(fixtureHtml, /test-vanilla-long/);
  assert.match(fixtureHtml, /test-mod-alpha/);
  assert.match(fixtureHtml, /Contato de teste/);
  assert.equal((fixtureHtml.match(/<h3 id="game-terraria">/g) ?? []).length, 1, 'records are grouped under one game heading');
  assert.doesNotMatch(publicText, /fixture-one\.example\.invalid|ops-confirmed\.invalid/);

  const invalidFixture = JSON.parse(await readFile(fixture, 'utf8'));
  invalidFixture.servers[0].confirmedAt = null;
  const invalidPath = path.join(os.tmpdir(), `crias-games-unconfirmed-${process.pid}.json`);
  await (await import('node:fs/promises')).writeFile(invalidPath, JSON.stringify(invalidFixture));
  await assert.rejects(build({ dataPath: invalidPath, outputPath: `${fixtureOutput}-invalid` }), /requires operator and date confirmation/);
  await rm(invalidPath, { force: true });
} finally {
  await rm(fixtureOutput, { recursive: true, force: true });
  await rm(`${fixtureOutput}-invalid`, { recursive: true, force: true });
}

for (const assetName of ['arcade-host.webp', 'neon-skyline.webp']) {
  const asset = await stat(path.join(dist, 'assets', 'images', assetName));
  assert.ok(asset.size < 300_000, `${assetName} should stay below 300 KB`);
}

console.log('Local content/build checks passed: unavailable values withheld, verified fixture rendering isolated, required fields validated, and images optimized.');
