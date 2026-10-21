import { test, expect } from '@playwright/test';

for (const [width, height] of [
  [1440, 900],
  [1280, 720],
  [390, 844],
  [320, 568],
  [844, 390],
]) {
  test(`archive stays inside one game screen at ${width}×${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await expect(page.locator('[data-archive-ready]')).toBeVisible();
    await expect(page.locator('.project-rail, .project-strip')).toHaveCount(0);
    await expect(page.locator('a[href="#projects"]:visible')).toHaveCount(1);
    for (const section of ['Profile', 'Projects', 'Experience', 'Contact']) {
      await page.getByRole('link', { name: section, exact: true }).click();
      if (section === 'Projects') {
        const link = page.getByRole('link', { name: 'Read case study', exact: true });
        await link.scrollIntoViewIfNeeded();
        const box = await link.boundingBox();
        const panel = await page.locator('.main-dossier .dossier-content').boundingBox();
        expect(box!.y).toBeGreaterThanOrEqual(panel!.y);
        expect(box!.y + box!.height).toBeLessThanOrEqual(panel!.y + panel!.height + 1);
      }
      const size = await page.evaluate(() => ({
        doc: document.documentElement.scrollHeight,
        body: document.body.getBoundingClientRect().height,
        viewport: innerHeight,
        width: document.documentElement.scrollWidth,
      }));
      expect(size.doc).toBeLessThanOrEqual(size.viewport + 1);
      expect(size.body).toBeLessThanOrEqual(size.viewport + 1);
      expect(size.width).toBeLessThanOrEqual(width + 1);
    }
    const resume = page.getByRole('link', { name: 'Download resume (PDF)', exact: true });
    await resume.scrollIntoViewIfNeeded();
    const box = await resume.boundingBox();
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y + box!.height).toBeLessThanOrEqual(height);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });
}

test('long experience and case study content scroll inside their dossiers', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 667 });
  await page.goto('/#experience');
  const resume = page.getByRole('link', { name: 'Download full resume (PDF)' });
  await resume.scrollIntoViewIfNeeded();
  expect(
    await page.locator('.main-dossier .dossier-content').evaluate((el) => el.scrollTop),
  ).toBeGreaterThan(0);
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await page.goto('/projects/courtside/');
  const caseContent = page.locator('.case-dossier .dossier-content');
  await expect(page.locator('body')).toHaveClass(/game-screen/);
  await expect
    .poll(() => caseContent.evaluate((el) => el.scrollHeight > el.clientHeight))
    .toBe(true);
  await caseContent.evaluate((el) => el.scrollTo({ top: el.scrollHeight, behavior: 'instant' }));
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

test('overflowing projects show a scroll cue that clears at the panel end', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#projects');
  const cue = page.locator('.dossier-scroll-hint');
  const content = page.locator('.main-dossier .dossier-content');
  await expect(cue).toHaveCSS('opacity', '1');
  await expect
    .poll(() => content.evaluate((el) => getComputedStyle(el, '::after').opacity))
    .toBe('1');
  await page.locator('[data-scroll-end]').scrollIntoViewIfNeeded();
  await expect(cue).toHaveCSS('opacity', '0');
  await expect(content).toHaveCSS('opacity', '1');
  await expect
    .poll(() => content.evaluate((el) => getComputedStyle(el, '::after').opacity))
    .toBe('0');
});
