import { test, expect } from '@playwright/test';
for (const width of [320, 390, 768, 1280, 1440]) {
  test(`profile and contact fit ${width}px with reachable navigation`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    );
    await page
      .locator(width <= 700 ? '.mobile-nav' : '.main-nav')
      .getByRole('link', { name: 'Contact', exact: true })
      .click();
    await expect(page.locator('[data-section="contact"]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    );
    const email = page.getByRole('link', { name: 'Email me', exact: true });
    await email.scrollIntoViewIfNeeded();
    const box = await email.boundingBox();
    expect(box!.y + box!.height).toBeLessThan(width <= 700 ? 922 : 1001);
  });
}
test('long titles and enlarged text remain inside the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto('/#project-courtside');
  await page
    .locator('[data-project-dossier="courtside"] h2')
    .evaluate((el) => (el.textContent = 'A much longer project title that must wrap naturally'));
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
    true,
  );
  await expect(page.locator('[data-project-dossier="courtside"] h2')).toBeVisible();
});
