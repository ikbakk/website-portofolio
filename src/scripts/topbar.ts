/**
 * Topbar navigation hover/focus animations.
 */
import { gsap, easings, durations, isReducedMotion } from '../lib/gsap';

let navMotionCleanup: (() => void) | undefined;

/** Initialize skip link focus animation. */
function initSkipLink(): void {
  const skipLink = document.querySelector<HTMLElement>('.skip-link');
  if (!skipLink) return;

  const show = () => {
    gsap.killTweensOf(skipLink);
    gsap.to(skipLink, { y: 0, duration: durations.fast, ease: easings.out });
  };

  const hide = () => {
    gsap.killTweensOf(skipLink);
    gsap.to(skipLink, { y: -140, duration: durations.fast, ease: easings.out });
  };

  skipLink.addEventListener('focus', show);
  skipLink.addEventListener('blur', hide);
}

/** Initialize mark hover rotation. */
function initMarkHover(): void {
  const mark = document.querySelector<HTMLElement>('.topbar-mark');
  if (!mark) return;

  mark.addEventListener('mouseenter', () => {
    if (isReducedMotion()) return;
    gsap.to(mark, { rotate: -3, duration: durations.fast, ease: easings.out });
  });

  mark.addEventListener('mouseleave', () => {
    if (isReducedMotion()) return;
    gsap.to(mark, { rotate: 0, duration: durations.fast, ease: easings.out });
  });
}

/** Initialize topbar nav link animations. */
function initTopbarLinks(): void {
  const links = gsap.utils.toArray<HTMLAnchorElement>('.topbar-nav a[data-nav-target]');
  if (links.length === 0) return;

  const controller = new AbortController();
  const signal = controller.signal;

  const resetLink = (link: HTMLElement) => {
    const active = link.getAttribute('aria-current') === 'true';
    gsap.to(link, {
      y: active ? -1 : 0,
      scale: active ? 1.025 : 1,
      duration: durations.base,
      ease: easings.out,
      overwrite: true,
      clearProps: active ? undefined : 'transform',
    });
  };

  links.forEach((link) => {
    const label = link.querySelector('span');

    const enter = () => {
      if (isReducedMotion()) return;
      gsap.killTweensOf([link, label]);
      gsap.to(link, { y: -2, scale: 1.045, duration: durations.base, ease: easings.out, overwrite: true });
      if (label) gsap.fromTo(label, { x: -5 }, { x: 0, duration: durations.base, ease: easings.out, overwrite: true });
    };

    const leave = () => {
      if (isReducedMotion()) return;
      resetLink(link);
    };

    const press = () => {
      if (isReducedMotion()) return;
      gsap.fromTo(link, { scale: 0.965 }, { scale: 1.045, duration: 0.34, ease: easings.back, overwrite: true });
    };

    link.addEventListener('pointerenter', enter, { signal });
    link.addEventListener('pointerleave', leave, { signal });
    link.addEventListener('focus', enter, { signal });
    link.addEventListener('blur', leave, { signal });
    link.addEventListener('pointerdown', press, { signal });
  });

  // Animate on aria-current change
  const observer = new MutationObserver((records) => {
    if (isReducedMotion()) return;
    records.forEach((record) => {
      const link = record.target as HTMLElement;
      if (link.getAttribute('aria-current') === 'true') {
        gsap.fromTo(link, { y: 0, scale: 0.985 }, { y: -1, scale: 1.025, duration: 0.48, ease: easings.out, overwrite: true });
      } else {
        gsap.to(link, { y: 0, scale: 1, duration: 0.32, ease: easings.out, overwrite: true, clearProps: 'transform' });
      }
    });
  });

  links.forEach((link) => observer.observe(link, { attributes: true, attributeFilter: ['aria-current'] }));

  navMotionCleanup = () => {
    observer.disconnect();
    controller.abort();
  };
}

/** Initialize spine marker hover/focus states. */
function initSpineMarkers(): void {
  const markers = gsap.utils.toArray<HTMLElement>('.spine-marker');
  if (markers.length === 0) return;

  markers.forEach((marker) => {
    const tip = marker.querySelector<HTMLElement>('.spine-tip');

    // Hover/focus - show tip
    const showTip = () => {
      if (isReducedMotion()) return;
      gsap.killTweensOf(tip);
      gsap.to([marker, tip], { scale: 1.05, duration: durations.fast, ease: easings.out });
      gsap.to(tip, { opacity: 1, x: 0, duration: durations.fast, ease: easings.out });
    };

    const hideTip = () => {
      if (isReducedMotion()) return;
      gsap.killTweensOf([marker, tip]);
      gsap.to(marker, { scale: 1, duration: durations.fast, ease: easings.out });
      gsap.to(tip, { opacity: 0, x: 4, duration: durations.fast, ease: easings.out });
    };

    marker.addEventListener('pointerenter', showTip);
    marker.addEventListener('pointerleave', hideTip);
    marker.addEventListener('focus', showTip);
    marker.addEventListener('blur', hideTip);
  });
}

/** Initialize status dot pulse animation. */
function initStatusPulse(): void {
  if (isReducedMotion()) return;

  const dots = gsap.utils.toArray<HTMLElement>('.status-dot');
  if (dots.length === 0) return;

  gsap.to(dots, {
    boxShadow: '0 0 0 11px transparent',
    duration: 1.8,
    ease: 'power3.out',
    repeat: -1,
    repeatDelay: 0.1,
  });
}

/** Initialize all topbar animations. */
export function initTopbarNav(): void {
  initSkipLink();
  initMarkHover();
  initTopbarLinks();
  initSpineMarkers();
  initStatusPulse();
}

/** Status dot pulse animation (exported for main.ts). */
export { initStatusPulse };
