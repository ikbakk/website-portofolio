import { test, expect } from '@playwright/test';

test('deep link selects a project; selection and browser Back stay synchronized', async ({
  page,
}) => {
  await page.goto('/#project-courtside');
  await expect(page.locator('[data-project-dossier="courtside"]')).toBeVisible();
  await page
    .locator('.archive-project-list')
    .getByRole('link', { name: 'Sungkar Group', exact: true })
    .click();
  await expect(page).toHaveURL(/#project-sungkar-group$/);
  await expect(page.locator('[data-project-dossier="sungkar-group"]')).toBeVisible();
  await expect(page.locator('[data-project-dossier="courtside"]')).toBeHidden();
  await page.goBack();
  await expect(page.locator('[data-project-dossier="courtside"]')).toBeVisible();
});

test('invalid project IDs fall back to an existing profile and project', async ({ page }) => {
  await page.goto('/#project-does-not-exist');
  await expect(page.locator('[data-section="profile"]')).toBeVisible();
  await expect(page.locator('[data-project-dossier="courtside"]')).toBeHidden();
});

test('navigation is reachable by keyboard and a resume is a real PDF', async ({
  page,
  request,
}) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.locator('.main-nav').getByRole('link', { name: 'Experience', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-section="experience"]')).toBeVisible();
  const pdf = await request.get('/resume.pdf');
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 4).toString()).toBe('%PDF');
});

test('skip link preserves the current archive selection', async ({ page }) => {
  await page.goto('/#experience');
  await expect(page.locator('[data-archive-ready]')).toBeVisible();
  await expect(page.locator('[data-section="experience"]')).toBeVisible();
  await page.getByRole('link', { name: 'Skip to content' }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.locator('#content')).toBeFocused();
  await expect(page.locator('[data-section="experience"]')).toBeVisible();
});

test('project selection animates the incoming dossier', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#projects');
  await expect(page.locator('[data-archive-ready]')).toBeVisible();
  const opacity = await page.evaluate(() => {
    (
      document.querySelector(
        '.archive-project-list a[data-project-link="sungkar-group"]',
      ) as HTMLElement
    ).click();
    return Number(
      getComputedStyle(document.querySelector('.main-dossier .dossier-content')!).opacity,
    );
  });
  expect(opacity).toBeLessThan(1);
  await expect(page.locator('.main-dossier .dossier-content')).toHaveCSS('opacity', '1');
});
