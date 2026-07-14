/**
 * Portfolio motion initialization.
 * Entry point that initializes all GSAP-based animations.
 */
import { initScrollSmoother, killScrollTriggers, refreshScrollTrigger, isReducedMotion, gsap } from '../lib/gsap';
import { initNavScroll } from './nav';
import { initProgress } from './progress';
import { initTopbarNav } from './topbar';
import { initReveals } from './reveals';
import { initDialogs } from './dialogs';
import { initProjectVisuals, initContactLinks, initButtons } from './hover';
import { initSectionProgress } from '../lib/section-progress';

function initHeroAnimation(): void {
  if (isReducedMotion()) return;

  gsap.from('[data-motion="hero-copy"] > *', {
    y: 18, opacity: 0, duration: 0.72, ease: 'power3.out', stagger: 0.08,
  });

  gsap.from('[data-motion="hero-console"]', {
    y: 28, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.18,
  });
}

function clearMotionStyles(): void {
  gsap.set(
    '[data-motion], .section-intro > *, .system-item, .method-panel > *, .contact-row, .project-entry, .project-copy > *',
    { clearProps: 'all' },
  );
}

/** Initialize all motion/animation features. */
export function initMotion(): void {
  initScrollSmoother();
  initProgress();
  initNavScroll();
  initTopbarNav();
  initReveals();
  initDialogs();
  initProjectVisuals();
  initContactLinks();
  initButtons();
  initSectionProgress();
  initHeroAnimation();
}

/** Re-initialize after Astro page swap. */
function onPageSwap(): void {
  killScrollTriggers();
  clearMotionStyles();
  initMotion();
  refreshScrollTrigger();
}

// Initialize on load
initMotion();

// Listen for Astro page transitions
document.addEventListener('astro:after-swap', onPageSwap);
