import { spawn } from 'node:child_process';
import { mkdir, rename, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
const output = process.argv[2] || '.impeccable/review/motion';
const server = spawn(
  process.execPath,
  ['node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', '4403'],
  { stdio: 'ignore' },
);
let browser;
try {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch('http://127.0.0.1:4403/')).ok) break;
    } catch {}
    if (i === 59) throw new Error('Preview failed');
    await new Promise((r) => setTimeout(r, 100));
  }
  await mkdir(output, { recursive: true });
  browser = await chromium.launch();
  const report = [];
  for (const [name, width, height] of [
    ['desktop', 1440, 900],
    ['mobile', 390, 844],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: 'no-preference',
      recordVideo: {
        dir: output + '/raw',
        size: name === 'desktop' ? { width: 960, height: 600 } : { width, height },
      },
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('http://127.0.0.1:4403/', { waitUntil: 'domcontentloaded' });
    await page.locator('[data-archive-ready]').waitFor();
    const state = await page.locator('[data-archive-root]').getAttribute('data-intro-state');
    if (state === 'running') {
      await page.waitForTimeout(100);
      await page.screenshot({ path: `${output}/${name}-opening.png` });
    }
    await page.waitForFunction(
      () =>
        document.querySelector('[data-archive-root]')?.getAttribute('data-intro-state') ===
        'complete',
    );
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${output}/${name}-settled.png` });
    if (name === 'desktop') {
      const button = page.locator('.identity-actions .game-button');
      await button.hover();
      await page.waitForTimeout(220);
      const box = await button.boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.waitForTimeout(100);
      await page.mouse.move(300, 120);
      await page.mouse.up();
      await page.waitForTimeout(300);
    }
    await page.getByRole('link', { name: 'Projects', exact: true }).click();
    await page.waitForTimeout(400);
    await page
      .locator('.archive-project-list')
      .getByRole('link', { name: 'Sungkar Group', exact: true })
      .click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${output}/${name}-projects.png` });
    await page.getByRole('link', { name: 'Experience', exact: true }).click();
    await page.waitForTimeout(400);
    await page.getByRole('link', { name: 'Contact', exact: true }).click();
    await page.waitForTimeout(400);
    report.push({
      name,
      width,
      height,
      intro: state,
      errors,
      overflow: await page.evaluate(
        () =>
          document.documentElement.scrollHeight > innerHeight ||
          document.documentElement.scrollWidth > innerWidth,
      ),
    });
    const video = page.video();
    await context.close();
    if (video) await rename(await video.path(), output + '/' + name + '-motion.webm');
  }
  await writeFile(output + '/capture-report.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
