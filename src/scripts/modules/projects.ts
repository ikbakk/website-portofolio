import { gsap, ScrollTrigger } from './core';

export function initProjectFocus() {
  const cursorPreview = document.querySelector<HTMLElement>('[data-project-cursor-preview]');
  const cursorImage = cursorPreview?.querySelector<HTMLImageElement>('[data-project-cursor-image]');
  if (cursorPreview && cursorPreview.parentElement !== document.body) {
    document.body.append(cursorPreview);
  }

  // Replace rows on reinitialization to discard stale direct listeners.
  gsap.utils.toArray<HTMLElement>('[data-project-card]').forEach((entry) => {
    entry.replaceWith(entry.cloneNode(true));
  });

  const entries = gsap.utils.toArray<HTMLElement>('[data-project-card]');
  if (entries.length === 0) return;

  if (cursorPreview)
    gsap.set(cursorPreview, { autoAlpha: 0, xPercent: -50, yPercent: -50, scale: 0.96 });
  const moveX = cursorPreview
    ? gsap.quickTo(cursorPreview, 'x', { duration: 0.28, ease: 'power3.out' })
    : null;
  const moveY = cursorPreview
    ? gsap.quickTo(cursorPreview, 'y', { duration: 0.28, ease: 'power3.out' })
    : null;

  entries.forEach((entry) => {
    gsap.set(entry, { autoAlpha: 0, y: 20 });

    const reveal = gsap.to(entry, {
      autoAlpha: 1,
      y: 0,
      duration: 0.42,
      ease: 'power3.out',
      paused: true,
    });

    ScrollTrigger.create({
      trigger: entry,
      start: 'top 78%',
      once: true,
      onEnter: () => reveal.play(),
    });

    const imageSrc = entry.dataset.projectImageSrc;
    if (cursorPreview && cursorImage && imageSrc && moveX && moveY) {
      // The preview lives under body, outside every row's stacking context.
      const show = () =>
        gsap.to(cursorPreview, { autoAlpha: 1, scale: 1, duration: 0.18, overwrite: 'auto' });
      const hide = () =>
        gsap.to(cursorPreview, { autoAlpha: 0, scale: 0.96, duration: 0.16, overwrite: 'auto' });

      entry.addEventListener('pointerenter', () => {
        if (cursorImage.src !== new URL(imageSrc, window.location.origin).href)
          cursorImage.src = imageSrc;
        show();
      });
      entry.addEventListener('pointermove', (event) => {
        moveX(event.clientX);
        moveY(event.clientY);
      });
      entry.addEventListener('pointerleave', hide);
    }

    const emphasize = () => {
      gsap.to(entry, { x: 8, duration: 0.22, ease: 'power2.out', overwrite: true });
    };
    const reset = () =>
      gsap.to(entry, {
        x: 0,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: true,
      });
    entry.addEventListener('pointerenter', emphasize);
    entry.addEventListener('pointerleave', reset);
    entry.addEventListener('focusin', emphasize);
    entry.addEventListener('focusout', reset);
  });

  ScrollTrigger.refresh();
}
