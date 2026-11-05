import { test, expect } from '@playwright/test';
for (const width of [320, 390, 768, 1280, 1440]) {
  test(`Soft Grid stays readable and uses the intended scroll area at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 936 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toBeVisible();
    const before = await page.evaluate(() => ({
      viewport: innerHeight,
      height: document.documentElement.scrollHeight,
      overflow: document.documentElement.scrollWidth > innerWidth,
      widths: [...document.querySelector('.home-grid')!.children].map(
        (el) => el.getBoundingClientRect().width,
      ),
      profileTop: document.querySelector('.profile')!.getBoundingClientRect().top,
    }));
    expect(before.overflow).toBe(false);
    if (width > 1100) {
      const total = before.widths.reduce((n, w) => n + w, 0);
      expect(before.widths.map((w) => Math.round((w / total) * 100))).toEqual([30, 40, 30]);
      expect(before.height).toBeLessThanOrEqual(before.viewport + 1);
      await page.locator('.work-scroll').evaluate((el) => el.scrollTo(0, el.scrollHeight));
      expect(await page.locator('.work-scroll').evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
      expect(await page.evaluate(() => window.scrollY)).toBe(0);
      expect(await page.locator('.profile').evaluate((el) => el.getBoundingClientRect().top)).toBe(
        before.profileTop,
      );
    } else expect(before.height).toBeGreaterThan(before.viewport);
    await expect(page.getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute(
      'href',
      'mailto:ikbakfir@gmail.com',
    );
  });
}

test('long project titles and enlarged type do not create horizontal overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  await page.locator('.featured h3').evaluate((el) => {
    el.textContent = 'A longer project title that wraps onto several lines';
  });
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
