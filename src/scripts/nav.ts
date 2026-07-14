/**
 * Navigation scroll handling.
 * Handles anchor clicks and smooth scrolling to targets.
 */
import { gsap } from '../lib/gsap';
import { easings, durations, isReducedMotion } from '../lib/gsap';

let activeScrollTween: gsap.core.Tween | undefined;
let activeScrollProxy: { y: number } | undefined;
let navCleanup: (() => void) | undefined;

function getScrollY(): number {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function getTopbarOffset(): number {
  const topbar = document.querySelector<HTMLElement>('.topbar');
  return (topbar?.offsetHeight || 0) + 14;
}

/** Scroll to a target element with offset for topbar. */
export function scrollToTarget(target: HTMLElement): void {
  const offset = getTopbarOffset();
  const startY = getScrollY();
  const targetY = Math.max(0, target.getBoundingClientRect().top + startY - offset);
  const distance = Math.abs(targetY - startY);
  const duration = gsap.utils.clamp(0.82, 1.35, distance / 1300);

  activeScrollTween?.kill();
  activeScrollProxy = { y: startY };
  gsap.killTweensOf(window);

  if (isReducedMotion() || distance < 2) {
    window.scrollTo(0, targetY);
    return;
  }

  document.body.classList.add('is-anchor-scrolling');
  activeScrollTween = gsap.to(activeScrollProxy, {
    y: targetY,
    duration,
    ease: easings.inOut,
    overwrite: true,
    onUpdate: () => {
      if (activeScrollProxy) window.scrollTo(0, activeScrollProxy.y);
    },
    onComplete: () => {
      window.scrollTo(0, targetY);
      document.body.classList.remove('is-anchor-scrolling');
      activeScrollTween = undefined;
      activeScrollProxy = undefined;
    },
    onInterrupt: () => {
      document.body.classList.remove('is-anchor-scrolling');
      activeScrollTween = undefined;
      activeScrollProxy = undefined;
    },
  });
}

/** Initialize navigation anchor click handling. */
export function initNavScroll(): void {
  navCleanup?.();

  const controller = new AbortController();
  const onClick = (event: MouseEvent) => {
    const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href') || '';
    if (href === '#') return;

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    scrollToTarget(target);
    if (history.replaceState) history.replaceState(null, '', href);
  };

  document.addEventListener('click', onClick, { capture: true, passive: false, signal: controller.signal });

  navCleanup = () => controller.abort();
}
