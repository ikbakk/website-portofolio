/**
 * Portfolio motion initialization.
 * Entry point that initializes all GSAP-based animations.
 */
import {
  initScrollSmoother,
  killScrollTriggers,
  refreshScrollTrigger,
  isReducedMotion,
  gsap,
} from '../lib/gsap';
import { initNavScroll } from './nav';
import { initProgress } from './progress';
import { initTopbarNav } from './topbar';
import { initReveals } from './reveals';
import { initDialogs } from './dialogs';
import { initProjectVisuals, initContactLinks, initButtons } from './hover';
import { initProjects } from './projects';
import { initSectionProgress } from '../lib/section-progress';

let lifecycleBound = false;

function initHeroAnimation(): void {
  if (isReducedMotion()) return;

  gsap.killTweensOf('[data-motion="hero-copy"] > *, [data-motion="hero-console"]');

  gsap.from('[data-motion="hero-copy"] > *', {
    y: 18,
    opacity: 0,
    duration: 0.72,
    ease: 'power3.out',
    stagger: 0.08,
    clearProps: 'transform,opacity',
  });

  gsap.from('[data-motion="hero-console"]', {
    y: 28,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    delay: 0.18,
    clearProps: 'transform,opacity',
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
  killScrollTriggers();
  clearMotionStyles();

  initScrollSmoother();
  initProgress();
  initNavScroll();
  initTopbarNav();
  initReveals();
  initDialogs();
  initProjectVisuals();
  initProjects();
  initContactLinks();
  initButtons();
  initSectionProgress();
  initHeroAnimation();
  refreshScrollTrigger();
}

function teardownMotion(): void {
  killScrollTriggers();
  clearMotionStyles();
}

/** Bind once so bundled Astro scripts still reinitialize after ClientRouter swaps. */
function bindMotionLifecycle(): void {
  if (lifecycleBound) return;
  lifecycleBound = true;

  document.addEventListener('astro:before-swap', teardownMotion);
  document.addEventListener('astro:page-load', initMotion);
}

bindMotionLifecycle();
