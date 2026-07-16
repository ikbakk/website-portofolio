import { gsap, ScrollTrigger } from './core';

export function initProjectFocus() {
  const horizontal = document.querySelector<HTMLElement>('[data-project-horizontal]');
  const track = document.querySelector<HTMLElement>('[data-project-track]');
  const entries = gsap.utils.toArray<HTMLElement>('[data-project-card]');
  if (!horizontal || !track || entries.length === 0) return;

  const animateEntry = (entry: HTMLElement, active: boolean) => {
    const shot = entry.querySelector<HTMLElement>('.project-shot');
    const copy = entry.querySelector<HTMLElement>('.project-copy');

    entry.classList.toggle('is-focused', active);
    entry.classList.toggle('is-muted', !active);
    entry.setAttribute('aria-current', active ? 'true' : 'false');

    gsap.to(entry, {
      opacity: active ? 1 : 0.62,
      y: active ? -4 : 0,
      filter: active ? 'saturate(1.08) contrast(1.02)' : 'saturate(0.72) contrast(0.94)',
      borderTopColor: active ? 'var(--accent)' : 'var(--border)',
      duration: active ? 0.36 : 0.24,
      ease: active ? 'power3.out' : 'power2.out',
      overwrite: true,
    });

    if (shot) {
      gsap.to(shot, {
        opacity: active ? 1 : 0.74,
        scale: active ? 1.012 : 1,
        filter: active
          ? 'grayscale(0) saturate(1.3) contrast(1.04)'
          : 'grayscale(0.32) saturate(0.68)',
        borderColor: active ? 'var(--accent)' : 'var(--border)',
        duration: 0.36,
        ease: 'power3.out',
        overwrite: true,
      });
    }

    if (copy) gsap.to(copy, { opacity: active ? 1 : 0.76, duration: 0.24, overwrite: true });
  };

  const setEntryFocus = (index: number) => {
    entries.forEach((entry, entryIndex) => animateEntry(entry, entryIndex === index));
  };

  const getDistance = () => Math.max(0, track.scrollWidth - horizontal.clientWidth);

  const setupVerticalHorizontalScroll = () => {
    if (window.matchMedia('(max-width: 899px)').matches) {
      gsap.set(track, { clearProps: 'transform' });
      entries.forEach((entry) => animateEntry(entry, true));
      return;
    }

    if (getDistance() <= 0) {
      entries.forEach((entry) => animateEntry(entry, true));
      return;
    }

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontal,
        start: 'top top+=128',
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: 0.8,
        snap:
          entries.length > 1
            ? {
                snapTo: 1 / (entries.length - 1),
                duration: { min: 0.18, max: 0.34 },
                delay: 0.08,
                ease: 'power2.out',
              }
            : false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: 2,
        onUpdate: (self) => {
          const index = Math.round(self.progress * (entries.length - 1));
          setEntryFocus(index);
        },
      },
    });

    entries.forEach((entry, index) => {
      entry.addEventListener('pointerenter', () => setEntryFocus(index));
      entry.addEventListener('focusin', () => setEntryFocus(index));
    });

    setEntryFocus(0);
    ScrollTrigger.refresh();
    return tween;
  };

  setupVerticalHorizontalScroll();
}
