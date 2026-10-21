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
test('unknown routes use a useful 404', async ({ page }) => {
  expect((await page.goto('/not-a-real-route'))?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'A little off the map.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Return to profile' })).toHaveAttribute('href', '/');
});
