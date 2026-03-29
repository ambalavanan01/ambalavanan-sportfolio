import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import puppeteer from 'puppeteer';

const distDir = path.resolve('dist');
const port = 4173;

const routes = [
  '/',
  '/resume',
  '/projects/crisis-response-management',
  '/projects/ske-textiles',
  '/projects/e-voting-using-blockchain',
  '/projects/online-quiz-management',
  '/projects/loan-approval-prediction',
  '/projects/youtube-focusmode-browser-extension',
  '/projects/local-retrieval-augmented-generation',
  '/projects/qr-code-generator',
];

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.pdf': 'application/pdf',
};

const server = http.createServer(async (req, res) => {
  try {
    const requestedPath = decodeURIComponent((req.url || '/').split('?')[0]);
    const cleanPath = requestedPath === '/' ? 'index.html' : requestedPath.replace(/^\/+/, '');
    let filePath = path.join(distDir, cleanPath);

    try {
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
    } catch {
      if (!path.extname(filePath)) {
        filePath = path.join(distDir, 'index.html');
      }
    }

    const content = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

const ensureRouteFile = async (route, html) => {
  const routePath = route.replace(/^\/+/, '');
  const normalized = route === '/' ? 'index.html' : path.join(routePath, 'index.html');
  const outPath = path.join(distDir, normalized);
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, html);
};

await new Promise((resolve) => server.listen(port, resolve));

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();

for (const route of routes) {
  const url = `http://127.0.0.1:${port}${route}`;
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.title.length > 0);
  await page.waitForSelector('#root');
  await new Promise((resolve) => setTimeout(resolve, 1200));
  const html = await page.content();
  await ensureRouteFile(route, html);
}

await browser.close();
await new Promise((resolve) => server.close(resolve));
