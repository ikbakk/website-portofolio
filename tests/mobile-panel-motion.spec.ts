import { test, expect } from '@playwright/test';

for (const [width, height] of [
  [390, 844],
  [320, 568],
]) {
  test(`mobile title sits above monogram without a top bar at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/#projects');
    await expect(page.locator('.site-header')).toBeHidden();
    const title = page.locator('.mobile-section-title');
    await expect(title).toHaveText('Projects');
    const titleBox = await title.boundingBox();
    const mark = await page.locator('.identity-art').boundingBox();
    expect(titleBox!.y + titleBox!.height).toBeLessThanOrEqual(mark!.y + 1);
    expect(Math.abs(titleBox!.x + titleBox!.width / 2 - mark!.x - mark!.width / 2)).toBeLessThan(1);
    await expect(page.locator('.constellation-nav .nav-active')).toHaveCount(4);
    await page.getByRole('link', { name: 'Contact', exact: true }).click();
    await expect(title).toHaveText('Contact');
  });
}

test('mobile underlines close locally, then reveal content after the frame and 150ms pause', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#profile');
  const panel = page.locator('.main-dossier');
  const before = await panel.boundingBox();
  const phases = await page.evaluate(async () => {
    const nav = document.querySelector('.constellation-nav')!;
    (nav.querySelector('[data-section-link="contact"]') as HTMLElement).click();
    const frame = document.querySelector('.main-dossier [data-panel-frame]')!;
    const content = document.querySelector('.main-dossier .dossier-content')!;
    const initial = {
      frame: getComputedStyle(frame).transform,
      contentTransform: getComputedStyle(content).transform,
      contentOpacity: Number(getComputedStyle(content).opacity),
    };
    await new Promise((r) => setTimeout(r, 160));
    const oldLine = getComputedStyle(
      nav.querySelector('[data-section-link="profile"]')!,
      '::after',
    );
    const newLine = getComputedStyle(
      nav.querySelector('[data-section-link="contact"]')!,
      '::after',
    );
    const outgoingDot = getComputedStyle(
      nav.querySelector('[data-section-link="profile"] .nav-active')!,
    );
    const activeDot = getComputedStyle(
      nav.querySelector('[data-section-link="contact"] .nav-active')!,
    );
    const transition = {
      lines: [Number(oldLine.opacity), Number(newLine.opacity)],
      dots: [Number(outgoingDot.opacity), Number(activeDot.opacity)],
    };
    await new Promise((r) => setTimeout(r, 260));
    const afterFrameDuringPause = {
      frameTransform: getComputedStyle(frame).transform,
      contentOpacity: Number(getComputedStyle(content).opacity),
    };
    await new Promise((r) => setTimeout(r, 100));
    const beforeFade = Number(getComputedStyle(content).opacity);
    await new Promise((r) => setTimeout(r, 80));
    const duringFade = Number(getComputedStyle(content).opacity);
    await new Promise((r) => setTimeout(r, 400));
    const afterFade = Number(getComputedStyle(content).opacity);
    return { initial, transition, afterFrameDuringPause, beforeFade, duringFade, afterFade };
  });
  expect(phases.initial.frame).not.toBe('none');
  expect(phases.initial.contentTransform).toBe('none');
  expect(phases.initial.contentOpacity).toBe(0);
  expect(phases.transition.lines[0]).toBeGreaterThan(0);
  expect(phases.transition.lines[0]).toBeLessThan(1);
  expect(phases.transition.lines[1]).toBeGreaterThan(0);
  expect(phases.transition.lines[1]).toBeLessThan(1);
  expect(phases.transition.dots[0]).toBeGreaterThan(0);
  expect(phases.transition.dots[0]).toBeLessThan(1);
  expect(phases.transition.dots[1]).toBeGreaterThan(0);
  expect(phases.transition.dots[1]).toBeLessThan(1);
  expect(phases.afterFrameDuringPause.frameTransform).toBe('none');
  expect(phases.afterFrameDuringPause.contentOpacity).toBe(0);
  expect(phases.beforeFade).toBe(0);
  expect(phases.duringFade).toBeGreaterThan(0);
  expect(phases.duringFade).toBeLessThan(1);
  expect(phases.afterFade).toBe(1);
  expect(await panel.boundingBox()).toEqual(before);
  await expect(panel.locator('[data-panel-frame]')).toHaveCSS('transform', 'none');
  await expect(panel.locator('.dossier-content')).toHaveCSS('opacity', '1');
  await expect(panel.locator('.dossier-content')).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(panel.locator('[data-panel-frame]')).toHaveCSS('transform', 'none');
  await expect(panel.locator('.dossier-content')).toHaveCSS('opacity', '1');
});
