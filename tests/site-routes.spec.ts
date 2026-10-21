import { test, expect } from '@playwright/test';
const projects = [
  ['courtside', 'Courtside'],
  ['sungkar-group', 'Sungkar Group'],
  ['beaconnect', 'Beaconnect'],
  ['cv-builder', 'CV Builder'],
  ['ward-monitor', 'Ward Monitor'],
];
for (const [id, title] of projects) {
  test(`case study ${id} has evidence, metadata and return navigation`, async ({ page }) => {
    const response = await page.goto(`/projects/${id}/`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText(title);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://ikbak.vercel.app/projects/${id}/`,
    );
    await expect(page.getByRole('link', { name: 'Back to archive' })).toHaveAttribute(
      'href',
      `/#project-${id}`,
    );
    await expect(page.locator('[data-project-stage]')).toBeVisible();
    expect((await page.locator('article').innerText()).length).toBeGreaterThan(650);
    for (const image of await page.locator('.case-capture img').all()) {
      const dimensions = await image.evaluate((el: HTMLImageElement) => ({
        width: el.naturalWidth,
        height: el.naturalHeight,
        declaredWidth: Number(el.getAttribute('width')),
        declaredHeight: Number(el.getAttribute('height')),
      }));
      expect(dimensions.declaredWidth).toBe(dimensions.width);
      expect(dimensions.declaredHeight).toBe(dimensions.height);
    }
  });
}
for (const [width, height] of [
  [1440, 900],
  [390, 844],
]) {
  test(`project dossier uses the fixed game screen and internal scrolling at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/projects/courtside/');
    await expect(page.locator('body')).toHaveClass(/game-screen/);
    const content = page.locator('.case-dossier .dossier-content');
    const world = page.locator('.case-world');
    const scrollState = await page.evaluate(() => ({
      viewport: window.innerHeight,
      document: document.documentElement.scrollHeight,
      panel: document.querySelector('.case-dossier .dossier-content')!.clientHeight,
      panelContent: document.querySelector('.case-dossier .dossier-content')!.scrollHeight,
    }));
    expect(scrollState.document).toBeLessThanOrEqual(scrollState.viewport + 1);
    expect(scrollState.panelContent).toBeGreaterThan(scrollState.panel);
    await expect(world).toHaveAttribute('data-dossier-more', '');
    await expect
      .poll(() => content.evaluate((el) => getComputedStyle(el, '::after').opacity))
      .toBe('1');
    await content.evaluate((el) => el.scrollTo({ top: el.scrollHeight, behavior: 'instant' }));
    await expect(world).not.toHaveAttribute('data-dossier-more');
    await expect
      .poll(() => content.evaluate((el) => getComputedStyle(el, '::after').opacity))
      .toBe('0');
    await expect.poll(() => content.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    if (width <= 700) {
      await expect(page.locator('.site-header')).toBeHidden();
      await expect(page.locator('.mobile-nav')).toHaveCount(0);
      await expect(page.locator('.constellation-nav')).toBeVisible();
      await expect(page.locator('.mobile-section-title')).toHaveText('Projects');
    }
  });
}
test('unknown routes use a useful 404', async ({ page }) => {
  expect((await page.goto('/not-a-real-route'))?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'A little off the map.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Return to profile' })).toHaveAttribute('href', '/');
});
