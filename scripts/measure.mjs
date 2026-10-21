import { spawn } from 'node:child_process';
import { writeFile, mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
const server = spawn(
  process.execPath,
  ['node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', '4402'],
  { stdio: 'ignore' },
);
let browser;
try {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch('http://127.0.0.1:4402/')).ok) break;
    } catch {}
    if (i === 59) throw new Error('Preview failed');
    await new Promise((r) => setTimeout(r, 100));
  }
  browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const session = await page.context().newCDPSession(page);
  await session.send('Network.enable');
  await session.send('Network.setCacheDisabled', { cacheDisabled: true });
  await session.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 150,
    downloadThroughput: 200000,
    uploadThroughput: 93750,
    connectionType: 'cellular4g',
  });
  await session.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript(() => {
    window.__metrics = { lcp: 0, cls: 0, shifts: [] };
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) window.__metrics.lcp = e.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries())
        if (!e.hadRecentInput) {
          window.__metrics.cls += e.value;
          window.__metrics.shifts.push({
            value: e.value,
            time: e.startTime,
            sources: e.sources.map((s) => ({
              node: s.node?.nodeName,
              id: s.node?.id,
              cls: s.node?.getAttribute?.('class'),
              previous: s.previousRect.toJSON(),
              current: s.currentRect.toJSON(),
            })),
          });
        }
    }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto('http://127.0.0.1:4402/', { waitUntil: 'networkidle' });
  const result = await page.evaluate(() => ({
    ...window.__metrics,
    resources: performance
      .getEntriesByType('resource')
      .map((r) => ({ name: r.name.split('/').pop(), bytes: r.transferSize })),
    viewport: { width: innerWidth, height: innerHeight },
    overflow: document.documentElement.scrollWidth > innerWidth,
  }));
  await mkdir('.impeccable/review', { recursive: true });
  await writeFile('.impeccable/review/performance.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result));
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
