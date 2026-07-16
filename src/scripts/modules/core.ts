import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

const reduceMotionQuery = '(prefers-reduced-motion: reduce)';

export function reducedMotion() {
  return window.matchMedia(reduceMotionQuery).matches;
}

export function topbarOffset(extraOffset = 0) {
  const topbar = document.querySelector<HTMLElement>('.topbar');
  return (topbar?.offsetHeight || 0) + extraOffset;
}

export function scrollToElement(target: HTMLElement, extraOffset = 0) {
  const targetY = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - topbarOffset(extraOffset),
  );
  window.scrollTo({ top: targetY, behavior: reducedMotion() ? 'auto' : 'smooth' });
}
