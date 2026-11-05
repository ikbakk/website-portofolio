import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('real project evidence, resume and contact remain available without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4400/');
    for (const id of ['courtside', 'sungkar-group', 'beaconnect', 'cv-builder', 'ward-monitor'])
      await expect(page.locator(`a[href="/projects/${id}/"]`)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Download resume' })).toHaveAttribute(
      'href',
      '/resume.pdf',
    );
    await expect(page.getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute(
      'href',
      'mailto:ikbakfir@gmail.com',
    );
    await expect(page.getByRole('button', { name: 'Start rally' })).toBeDisabled();
  } finally {
    await context.close();
  }
});

for (const name of ['Green Meadow (dendro)', 'Blizzard (cryo)', 'Storm (electro)']) {
  test(`theme ${name} has no serious or critical accessibility violations`, async ({ page }) => {
    test.setTimeout(45000);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.getByRole('button', { name, exact: true }).click();
    await expect(page.locator('[data-weather-stage]')).toBeHidden();
    const result = await new AxeBuilder({ page }).analyze();
    expect(
      result.violations.filter((v) => ['serious', 'critical'].includes(v.impact || '')),
    ).toEqual([]);
  });
}

test('skip link, keyboard theme choice and native case return keep the homepage interactive', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#content')).toBeFocused();
  for (let i = 0; i < 2; i++) {
    await page.locator('#project-courtside').click();
    await expect(page).toHaveURL(/\/projects\/courtside\/$/);
    await page.getByRole('link', { name: 'Back to projects' }).click();
    await expect(page.locator('#project-courtside')).toBeVisible();
    await page.getByRole('button', { name: 'Blizzard (cryo)', exact: true }).press('Enter');
    await expect(page.locator('html')).toHaveAttribute('data-weather', 'cryo');
    await page.getByRole('checkbox', { name: 'Calm mode' }).check();
    await page.getByRole('button', { name: 'Start rally', exact: true }).click();
    await page.getByRole('button', { name: 'Hit!', exact: true }).click();
    await expect(page.locator('[data-rally-score]')).toContainText('1 hit');
  }
});
