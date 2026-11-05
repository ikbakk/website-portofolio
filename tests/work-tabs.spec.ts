import { test, expect } from '@playwright/test';

for (const [theme, label] of [
  ['normal', 'Green Meadow (dendro)'],
  ['cryo', 'Blizzard (cryo)'],
  ['electro', 'Storm (electro)'],
]) {
  test(`work tabs reuse ${theme} without changing the weather`, async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: label, exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-weather', theme);
    await expect(page.locator('[data-weather-stage]')).toBeHidden();
    await page.getByRole('tab', { name: 'Experience', exact: true }).click();
    await expect(page.locator('#tab-experience')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#experience')).toBeVisible();
    await expect(page.locator('#projects')).toBeHidden();
    await expect(page.locator('html')).toHaveAttribute('data-weather', theme);
    await expect(page.locator('[data-weather-stage]')).toBeHidden();
    await expect(page.locator('[data-weather-particles]')).toBeEmpty();
  });
}
test('each work section keeps its desktop scroll position', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1363, height: 720 });
  await page.goto('/');
  const scroller = page.locator('.work-scroll');
  await scroller.evaluate((el) => el.scrollTo(0, el.scrollHeight));
  const position = await scroller.evaluate((el) => el.scrollTop);
  expect(position).toBeGreaterThan(0);
  await page.getByRole('tab', { name: 'Experience', exact: true }).click();
  await expect(scroller).toHaveJSProperty('scrollTop', 0);
  await page.getByRole('tab', { name: 'Projects', exact: true }).click();
  await expect.poll(() => scroller.evaluate((el) => el.scrollTop)).toBe(position);
});
test('deep links, keyboard activation, history and interrupted transitions use the last requested section', async ({
  page,
}) => {
  await page.goto('/#experience');
  const projects = page.getByRole('tab', { name: 'Projects', exact: true });
  const experience = page.getByRole('tab', { name: 'Experience', exact: true });
  await expect(experience).toHaveAttribute('aria-selected', 'true');
  await experience.press('ArrowLeft');
  await expect(projects).toBeFocused();
  await expect(experience).toHaveAttribute('aria-selected', 'true');
  await projects.press('Enter');
  await experience.click();
  await projects.click();
  await expect(projects).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('[data-weather-stage]')).toBeHidden();
  await page.goBack();
  await expect(experience).toHaveAttribute('aria-selected', 'true');
  await page.goForward();
  await expect(projects).toHaveAttribute('aria-selected', 'true');
});
test('project navigation retains weather and returns to its project row', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Blizzard (cryo)', exact: true }).click();
  await page.locator('#project-beaconnect').click();
  await expect(page.locator('h1')).toHaveText('Beaconnect');
  await expect(page.locator('html')).toHaveAttribute('data-weather', 'cryo');
  await page.getByRole('link', { name: 'Back to projects', exact: true }).click();
  await expect(page.locator('#tab-projects')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#project-beaconnect')).toBeInViewport();
  await expect(page.locator('html')).toHaveAttribute('data-weather', 'cryo');
});
test('without JavaScript both work sections are readable', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#experience')).toBeVisible();
    await page.getByRole('link', { name: 'Experience', exact: true }).last().click();
    await expect(page.locator('#experience')).toBeInViewport();
  } finally {
    await context.close();
  }
});
