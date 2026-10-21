import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const output = process.argv[2] || '.impeccable/review';
const server = spawn(
  process.execPath,
  ['node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', '4401'],
  { stdio: 'ignore' },
);
let browser;
try {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch('http://127.0.0.1:4401/');
      if (r.ok) break;
    } catch {}
    if (i === 59) throw new Error('Preview did not start');
    await new Promise((r) => setTimeout(r, 100));
  }
  await mkdir(output, { recursive: true });
  browser = await chromium.launch();
  const reports = [];
  for (const [name, width, height, path] of [
    ['desktop', 1440, 1000, '/'],
    ['mobile', 390, 1000, '/'],
    ['case', 1440, 1000, '/projects/courtside/'],
    ['not-found', 390, 1000, '/404.html'],
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('http://127.0.0.1:4401' + path);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${output}/${name}.png`, fullPage: true });
    reports.push({
      name,
      width,
      height,
      errors,
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    });
    await page.close();
  }
  await writeFile(`${output}/capture-report.json`, JSON.stringify(reports, null, 2));
  console.log(JSON.stringify(reports));
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
