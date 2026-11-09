import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), process.env.PREVIEW_ROOT || '../dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const server = createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url, 'http://localhost');
    const originalPath = requestUrl.pathname;
    const pathname = decodeURIComponent(originalPath)
      .replace(/^\/crias-games(?=\/|$)/, '');
    const relativePath = pathname.replace(/^\/+/, '') || 'index.html';
    const requestedFile = path.join(root, relativePath);
    const requestedStat = await stat(requestedFile);
    if (requestedStat.isDirectory() && !originalPath.endsWith('/')) {
      res.writeHead(301, { location: `${originalPath}/${requestUrl.search}` });
      res.end();
      return;
    }
    const file = requestedStat.isDirectory() ? path.join(requestedFile, 'index.html') : requestedFile;
    if (!file.startsWith(root) || !(await stat(file)).isFile()) throw new Error('Not found');
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});
const port = Number(process.env.PORT) || 4173;
server.listen(port, () => console.log(`Preview at http://localhost:${port}`));
