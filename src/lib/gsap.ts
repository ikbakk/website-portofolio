/**
 * GSAP core registration and shared configuration.
 * Single source of truth for GSAP plugins.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

ScrollTrigger.config({ ignoreMobileResize: true });

/** Initialize ScrollSmoother for smooth scrolling with parallax support. */
export function initScrollSmoother() {
  return (
    ScrollSmoother.get() ??
    ScrollSmoother.create({
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
    })
  );
}

/** Shared easing presets. */
export const easings = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  back: 'back.out(2)',
} as const;

/** Shared duration presets (seconds). */
export const durations = {
  fast: 0.18,
  base: 0.36,
  reveal: 0.62,
  slow: 0.9,
} as const;

/** Reduced motion detection is disabled; always allow motion. */
export function isReducedMotion(): boolean {
  return false;
}

/** Kill all ScrollTriggers and ScrollSmoother (for page transitions/re-init). */
export function killScrollTriggers(): void {
  ScrollSmoother.get()?.kill();
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

/** Refresh ScrollTrigger (after DOM changes). */
export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
