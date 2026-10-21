import { test, expect } from '@playwright/test';

test('opening plays once per session and does not replay after reload', async ({ page }) => {
  await page.goto('/');
  const root = page.locator('[data-archive-root]');
  await expect(root).toHaveAttribute('data-intro-state', /running|complete/);
  await expect(root).toHaveAttribute('data-intro-state', 'complete');
  await expect(page.locator('.archive-opening')).toBeHidden();
  await page.reload();
  await expect(root).toHaveAttribute('data-intro-state', 'skipped');
  expect(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight)).toBe(
    true,
  );
});

test('navigation immediately interrupts opening and leaves the requested menu usable', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('[data-archive-ready]')).toBeVisible();
  await page.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page.locator('[data-section="contact"]')).toBeVisible();
  await expect(page.locator('.archive-opening')).toBeHidden();
  await expect(page.getByRole('link', { name: 'Email me', exact: true })).toHaveCSS('opacity', '1');
});

test('rapid menu changes settle on the final state and the nav tracer follows after resize', async ({
  page,
}) => {
  await page.goto('/#projects');
  await expect(page.locator('[data-archive-ready]')).toBeVisible();
  await page.evaluate(() => {
    for (const name of ['experience', 'contact', 'profile', 'projects', 'contact']) {
      (document.querySelector(`.main-nav [data-section-link="${name}"]`) as HTMLElement).click();
    }
  });
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator('[data-section="contact"]')).toHaveCSS('opacity', '1');
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 844 });
    const nav = page.locator(width > 700 ? '.main-nav' : '.constellation-nav');
    if (width <= 700) {
      await expect(async () => {
        const opacity = await nav
          .locator('[aria-current="page"]')
          .evaluate((el) => Number(getComputedStyle(el, '::after').opacity));
        expect(opacity).toBe(1);
      }).toPass();
      continue;
    }
    await expect(nav.locator('[data-nav-indicator]')).toHaveCSS('opacity', '1');
    await expect(async () => {
      const active = await nav.locator('[aria-current="page"]').boundingBox();
      const marker = await nav.locator('[data-nav-indicator]').boundingBox();
      expect(Math.abs(marker!.x - active!.x)).toBeLessThan(2);
      expect(Math.abs(marker!.width - active!.width)).toBeLessThan(2);
    }).toPass();
  }
});

test('button presses emit a bounded ripple and settle cleanly', async ({ page }) => {
  await page.goto('/#profile');
  await expect(page.locator('[data-archive-ready]')).toBeVisible();
  const button = page.locator('.identity-actions .game-button');
  const initialOpacity = await button.evaluate((el) => {
    el.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse', button: 0 }),
    );
    return Number(getComputedStyle(el.querySelector('[data-interaction-ripple]')!).opacity);
  });
  expect(initialOpacity).toBeGreaterThan(0);
  const ripple = button.locator('[data-interaction-ripple]');
  await expect(ripple).toHaveCount(1);
  await expect(ripple).toHaveCSS('opacity', '0');
});

test('reduced motion skips opening and keeps navigation feedback without spatial movement', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('[data-archive-root]')).toHaveAttribute('data-intro-state', 'skipped');
  await page.getByRole('link', { name: 'Experience', exact: true }).click();
  const section = page.locator('[data-section="experience"]');
  await expect(section).toHaveCSS('opacity', '1');
  await expect(section).toHaveCSS('transform', 'none');
  const before = await page
    .locator('[data-orbit]')
    .evaluateAll((els) => els.map((el) => el.getAttribute('transform')));
  await page.waitForTimeout(180);
  expect(
    await page
      .locator('[data-orbit]')
      .evaluateAll((els) => els.map((el) => el.getAttribute('transform'))),
  ).toEqual(before);
});

test('changing motion preference during opening dismisses it and returning from a case does not replay it', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('[data-archive-ready]')).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.archive-opening')).toBeHidden();
  await page.getByRole('link', { name: 'Projects', exact: true }).click();
  await page.getByRole('link', { name: 'Read case study', exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/courtside\/$/);
  await page.getByRole('link', { name: 'Back to archive' }).click();
  await expect(page.locator('[data-archive-root]')).toHaveAttribute('data-intro-state', 'skipped');
  await expect(page.locator('[data-project-dossier="courtside"]')).toBeVisible();
});

test('a failed enhancement bundle cannot leave the opening covering the HTML fallback', async ({
  page,
}) => {
  await page.route('**/_astro/*.js', (route) => route.abort());
  await page.goto('/');
  await expect(page.locator('.archive-opening')).toBeHidden({ timeout: 3000 });
  await expect(page.locator('[data-section="experience"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Ward Monitor', exact: true })).toBeVisible();
});

test('repeated route visits do not redeclare head scripts or accumulate motion errors', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/#project-courtside');
  for (let i = 0; i < 3; i++) {
    await page.getByRole('link', { name: 'Read case study', exact: true }).click();
    await page.getByRole('link', { name: 'Back to archive' }).click();
    await expect(page.locator('[data-project-dossier="courtside"]')).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('click-only activation dismisses the opening synchronously', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-archive-ready]')).toBeVisible();
  const result = await page.evaluate(() => {
    document.documentElement.dataset.opening = 'pending';
    (document.querySelector('.main-nav [data-section-link="contact"]') as HTMLElement).click();
    return { pending: document.documentElement.dataset.opening, section: location.hash };
  });
  expect(result.pending).toBeUndefined();
  expect(result.section).toBe('#contact');
});
