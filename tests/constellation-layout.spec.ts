import { test, expect } from '@playwright/test';

for (const [width, height] of [
  [390, 844],
  [320, 568],
]) {
  test(`mobile constellation surrounds the identity at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/#profile');
    const nav = page.locator('.constellation-nav');
    await expect(nav).toBeVisible();
    await expect(page.locator('.mobile-nav')).toHaveCount(0);
    const mark = await page.locator('.identity-art').boundingBox();
    const center = mark!.x + mark!.width / 2;
    for (const [name, left] of [
      ['Profile', true],
      ['Projects', true],
      ['Experience', false],
      ['Contact', false],
    ] as const) {
      const link = nav.getByRole('link', { name, exact: true });
      const box = await link.boundingBox();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(left ? box!.x + box!.width < center : box!.x > center).toBe(true);
      await link.click();
      await expect(link).toHaveAttribute('aria-current', 'page');
    }
  });
}

test('desktop allocates the majority to content and centers active markers', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/#projects');
  const grid = await page.locator('.archive-grid').boundingBox();
  const dossier = await page.locator('.main-dossier').boundingBox();
  expect(dossier!.width / grid!.width).toBeGreaterThan(0.65);
  for (const link of await page.locator('.main-nav .nav-item').all()) {
    await link.click();
    const icon = await link.locator('.celestial-icon').boundingBox();
    const dot = await link.locator('.nav-active').boundingBox();
    expect(Math.abs(icon!.x + icon!.width / 2 - dot!.x - dot!.width / 2)).toBeLessThan(1);
  }
});
