import { test, expect } from '@playwright/test';

for (const [theme, name] of [
  ['normal', 'Green Meadow (dendro)'],
  ['cryo', 'Blizzard (cryo)'],
  ['electro', 'Storm (electro)'],
]) {
  test(`${theme} completes its transition and removes all temporary particles`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    if (theme === 'normal') {
      await page.getByRole('button', { name: 'Blizzard (cryo)', exact: true }).click();
      await expect(page.locator('html')).toHaveAttribute('data-weather', 'cryo');
      await expect(page.locator('[data-weather-stage]')).toBeHidden();
    }
    await page.getByRole('button', { name, exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-weather', theme);
    await expect(page.locator('[data-weather-stage]')).toBeHidden();
    await expect(page.locator('.weather-particle')).toHaveCount(0);
  });
}

test('the weather engine loads on demand and rapid selections settle on the last choice', async ({
  page,
}) => {
  const requested: string[] = [];
  page.on('request', (request) => requested.push(request.url()));
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(requested.some((url) => /\/gsap\.[^/]+\.js/.test(url))).toBe(false);
  await page.getByRole('button', { name: 'Blizzard (cryo)', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-weather', 'cryo');
  expect(requested.some((url) => /\/gsap\.[^/]+\.js/.test(url))).toBe(true);
  await page.getByRole('button', { name: 'Storm (electro)', exact: true }).click();
  await page.getByRole('button', { name: 'Green Meadow (dendro)', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-weather', 'normal');
  await expect(page.locator('[data-weather-stage]')).toBeHidden();
  await expect(page.locator('.weather-particle')).toHaveCount(0);
});

test('a failed optional weather bundle preserves theme selection and visible project content', async ({
  page,
}) => {
  await page.route('**/transitions.*.js', (route) => route.abort());
  await page.goto('/');
  await page.getByRole('button', { name: 'Storm (electro)', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-weather', 'electro');
  await expect(page.getByRole('heading', { name: 'Featured Project' })).toBeVisible();
  await expect(page.locator('[data-weather-stage]')).toBeHidden();
});
