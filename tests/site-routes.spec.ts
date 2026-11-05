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
    await expect(page.getByRole('link', { name: 'Back to projects' })).toHaveAttribute(
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
  [1363, 720],
  [768, 1024],
  [390, 844],
]) {
  test(`paper case study keeps reading and navigation reachable at ${width} by ${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/projects/courtside/');
    await expect(page.getByRole('heading', { name: 'Project details', exact: true })).toBeVisible();
    const layout = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      overflow: document.documentElement.scrollWidth > innerWidth,
      widths: [...document.querySelector('.home-grid')!.children].map(
        (el) => el.getBoundingClientRect().width,
      ),
    }));
    expect(layout.overflow).toBe(false);
    if (width > 1100) {
      const total = layout.widths.reduce((n, w) => n + w, 0);
      expect(layout.widths.map((w) => Math.round((w / total) * 100))).toEqual([30, 40, 30]);
      expect(layout.height).toBeLessThanOrEqual(height + 1);
      await page.locator('.work-scroll').evaluate((el) => el.scrollTo(0, el.scrollHeight));
      expect(await page.locator('.work-scroll').evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
      expect(await page.evaluate(() => scrollY)).toBe(0);
      expect(
        await page
          .locator('.detail-sidebar')
          .evaluate((el) => el.scrollHeight <= el.clientHeight + 1),
      ).toBe(true);
    } else {
      expect(layout.height).toBeGreaterThan(height);
      if (width <= 740)
        await expect(page.locator('.project-detail-page .profile .about')).toBeHidden();
    }
    await page.getByRole('link', { name: 'Back to projects', exact: true }).click();
    await expect(page.locator('#project-courtside')).toBeVisible();
    await expect(page.locator('#tab-projects')).toHaveAttribute('aria-selected', 'true');
  });
}
test('unknown routes use a useful 404', async ({ page }) => {
  expect((await page.goto('/not-a-real-route'))?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'A little off the map.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Return to profile' })).toHaveAttribute('href', '/');
});
