import { test, expect } from '@playwright/test';

for (const width of [390, 1440]) {
  test(`case back uses frame then content fade at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/projects/courtside/');
    await page.evaluate(() => {
      document.addEventListener(
        'astro:after-swap',
        () => {
          const samples: {
            time: number;
            opacity: number;
            frame: string;
            transform: string;
            clip: string;
            top: number;
          }[] = [];
          Reflect.set(window, '__panelSamples', samples);
          const start = performance.now();
          const sample = () => {
            const content = document.querySelector('.main-dossier .dossier-content')!;
            const frame = document.querySelector('[data-panel-frame]')!;
            const active = document.querySelector('[data-project-dossier="courtside"]')!;
            samples.push({
              time: performance.now() - start,
              opacity: Number(getComputedStyle(content).opacity),
              frame: getComputedStyle(frame).transform,
              transform: getComputedStyle(active).transform,
              clip: getComputedStyle(active).clipPath,
              top: document.querySelector('.main-dossier')!.getBoundingClientRect().top,
            });
            if (performance.now() - start < 950) requestAnimationFrame(sample);
          };
          requestAnimationFrame(sample);
        },
        { once: true },
      );
    });
    await page.getByRole('link', { name: 'Back to archive', exact: true }).click();
    await expect(page).toHaveURL(/#project-courtside$/);
    await page.waitForTimeout(1000);
    const samples = await page.evaluate(() => Reflect.get(window, '__panelSamples'));
    expect(samples.length).toBeGreaterThan(5);
    expect(samples[0].frame).not.toBe('none');
    expect(samples[0].opacity).toBe(0);
    const pause = samples.find((s: { time: number }) => s.time > 425 && s.time < 520);
    expect(pause).toBeTruthy();
    expect(pause.frame).toBe('none');
    expect(pause.opacity).toBe(0);
    expect(samples.some((s: { opacity: number }) => s.opacity > 0 && s.opacity < 1)).toBe(true);
    expect(samples.at(-1).opacity).toBe(1);
    for (const s of samples) {
      expect(s.transform).toBe('none');
      expect(s.clip).toBe('none');
      expect(s.top).toBe(samples[0].top);
    }
  });
}
