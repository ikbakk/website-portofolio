import { test, expect } from '@playwright/test';

for (const [width, height] of [
  [1363, 936],
  [1363, 720],
  [320, 800],
]) {
  test(`project list and moved technology stack remain reachable at ${width} by ${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const rows = page.locator('.project-list .project-row');
    await expect(rows).toHaveCount(4);
    const boxes = await rows.evaluateAll((elements) =>
      elements.map((el) => {
        const rect = el.getBoundingClientRect();
        return { left: rect.left, top: rect.top, bottom: rect.bottom, width: rect.width };
      }),
    );
    for (let i = 1; i < boxes.length; i++) {
      expect(Math.abs(boxes[i].left - boxes[0].left)).toBeLessThan(1);
      expect(Math.abs(boxes[i].width - boxes[0].width)).toBeLessThan(1);
      expect(boxes[i].top).toBeGreaterThanOrEqual(boxes[i - 1].bottom);
    }
    await expect(
      page.locator('.profile #about').getByRole('heading', { name: 'Tech Stack', exact: true }),
    ).toBeVisible();
    await expect(
      page.locator('.work').getByRole('heading', { name: 'Tech Stack', exact: true }),
    ).toHaveCount(0);
    await expect(page.locator('#project-courtside')).toHaveAttribute(
      'href',
      '/projects/courtside/',
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    if (width > 1100) {
      const profile = page.locator('.profile');
      expect(await profile.evaluate((el) => el.scrollHeight <= el.clientHeight + 1)).toBe(true);
      const download = await page.getByRole('link', { name: 'Download resume' }).boundingBox();
      const frame = await profile.boundingBox();
      expect(download!.y + download!.height).toBeLessThanOrEqual(frame!.y + frame!.height);
    }
  });
}
