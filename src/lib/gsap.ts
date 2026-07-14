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
  return ScrollSmoother.create({
    smooth: 1.3,
    effects: true,
    smoothTouch: 0.1,
  });
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

/** Check if user prefers reduced motion. */
export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Kill all ScrollTriggers (for page transitions). */
export function killScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

/** Refresh ScrollTrigger (after DOM changes). */
export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
