import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('content and project routes remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4400/');
  for (const name of ['Courtside', 'Sungkar Group', 'Beaconnect', 'CV Builder', 'Ward Monitor']) {
    await expect(page.getByRole('heading', { name, exact: true }).first()).toBeVisible();
  }
  await expect(
    page.getByRole('link', { name: 'Open resume', exact: true }).first(),
  ).toHaveAttribute('href', '/resume.pdf');
  await expect(page.locator('a[href="mailto:ikbakfir@gmail.com"]').first()).toBeVisible();
  await context.close();
});

for (const hash of ['profile', 'projects', 'experience', 'contact']) {
  test(`${hash} has no serious or critical accessibility violations`, async ({ page }) => {
    test.setTimeout(45000);
    await page.goto('/#' + hash);
    await expect(page.locator(`[data-section="${hash}"]`)).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter((v) => ['serious', 'critical'].includes(v.impact || '')),
    ).toEqual([]);
  });
}

test('reduced motion and repeated page navigation preserve visible content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#project-courtside');
  await expect(page.getByRole('heading', { name: 'Courtside', exact: true })).toBeVisible();
  for (let i = 0; i < 2; i++) {
    await page
      .locator('[data-project-dossier="courtside"]')
      .getByRole('link', { name: 'Read case study' })
      .click();
    await expect(page).toHaveURL(/\/projects\/courtside\/$/);
    await page.getByRole('link', { name: 'Back to archive' }).click();
    await expect(page.locator('[data-project-dossier="courtside"]')).toBeVisible();
  }
  const transforms = () =>
    page
      .locator('[data-orbit]')
      .evaluateAll((els) => els.map((el) => el.getAttribute('transform')));
  const before = await transforms();
  await page.waitForTimeout(200);
  expect(await transforms()).toEqual(before);
});
