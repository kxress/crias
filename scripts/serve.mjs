import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(process.env.SITE_DIR || path.join(repo, 'dist'));
const prefixArg = process.argv.indexOf('--prefix');
const prefix = prefixArg >= 0 ? `/${process.argv[prefixArg + 1].replace(/^\/+|\/+$/g, '')}` : '';
const portArg = process.argv.indexOf('--port');
const port = Number(portArg >= 0 ? process.argv[portArg + 1] : process.env.PORT || 4173);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

createServer(async (request, response) => {
  const requestPath = new URL(request.url, 'http://localhost').pathname;
  let relativePath = requestPath;
  if (prefix) {
    if (requestPath !== prefix && requestPath !== `${prefix}/` && !requestPath.startsWith(`${prefix}/`)) {
      response.writeHead(404).end('Not found');
      return;
    }
    relativePath = requestPath.slice(prefix.length) || '/';
  }
  if (relativePath === '/') relativePath = '/index.html';
  const fullPath = path.resolve(root, `.${decodeURIComponent(relativePath)}`);
  if (fullPath !== root && !fullPath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403).end('Forbidden');
    return;
  }
  try {
    const fileStat = await stat(fullPath);
    if (!fileStat.isFile()) throw new Error('Not a file');
    response.writeHead(200, { 'Content-Type': mime[path.extname(fullPath)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(await readFile(fullPath));
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${port}${prefix}/`));
