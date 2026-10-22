'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.join(__dirname, 'public');
const TYPES = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.png':'image/png', '.svg':'image/svg+xml', '.ico':'image/x-icon' };
function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow:'GET, HEAD' }); return res.end(); }
    let pathname;
    try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
    catch { res.writeHead(400); return res.end('Bad request'); }
    if (pathname === '/health') { res.writeHead(200, { 'Content-Type':'application/json' }); return res.end(req.method === 'HEAD' ? undefined : '{"status":"ok"}'); }
    // Only publish files intentionally copied into public/. Never expose source or configuration.
    if (pathname.includes('\\') || pathname.includes('\0') || pathname.split('/').some(p => p.startsWith('.'))) { res.writeHead(404); return res.end('Not found'); }
    const file = path.resolve(ROOT, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(ROOT + path.sep)) { res.writeHead(404); return res.end('Not found'); }
    fs.stat(file, (err, stat) => {
      if (err || !stat.isFile()) { res.writeHead(404); return res.end('Not found'); }
      res.writeHead(200, { 'Content-Type':TYPES[path.extname(file)] || 'application/octet-stream', 'Content-Length':stat.size, 'Cache-Control':'no-cache' });
      if (req.method === 'HEAD') return res.end();
      const stream = fs.createReadStream(file); stream.on('error', () => res.destroy()); stream.pipe(res);
    });
  });
}
if (require.main === module) {
  const port = Number(process.env.SERVER_PORT || process.env.PORT || 8080);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid SERVER_PORT / PORT');
  createServer().listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));
}
module.exports = { createServer };
