import { gsap, ScrollTrigger, reducedMotion } from './modules/core';
import { initProgress } from './modules/progress';
import { initCleanScrollNavigation } from './modules/navigation';
import { initTopbarNavMotion, initStatusPulse } from './modules/topbar';
import { initDialogs } from './modules/dialogs';
import { initProjectFocus } from './modules/projects';
import {
  initBackgroundParallax,
  initCraftHoverGallery,
  initSectionHeaderMotion,
} from './modules/section-motion';
import { initHeroMotion, initViewportReveals } from './modules/reveals';

function initGsap() {
  initTopbarNavMotion();

  if (reducedMotion()) {
    gsap.set(
      '[data-motion], .section-intro > *, .system-item, .method-panel > *, .contact-row, .project-entry, .project-copy > *',
      { clearProps: 'all' },
    );
    return;
  }

  initProjectFocus();
  initStatusPulse();
  initSectionHeaderMotion();
  initCraftHoverGallery();
  initBackgroundParallax();
  initViewportReveals();
  initHeroMotion();
}

export function initPortfolioMotion() {
  initProgress();
  initCleanScrollNavigation();
  initDialogs();
  initGsap();

  document.addEventListener('astro:after-swap', () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    initProgress();
    initCleanScrollNavigation();
    initDialogs();
    initGsap();
    ScrollTrigger.refresh();
  });
}
