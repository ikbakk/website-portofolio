/**
 * Scroll-triggered viewport reveals.
 * Elements fade in as they enter the viewport.
 */
import { gsap, ScrollTrigger, easings, durations, isReducedMotion } from '../lib/gsap';

const REVEAL_SELECTORS = [
  '.system-item',
  '.method-panel > *',
  '.contact-row',
].join(', ');

/** Initialize viewport reveal animations. */
export function initReveals(): void {
  if (isReducedMotion()) return;

  const elements = gsap.utils.toArray<HTMLElement>(REVEAL_SELECTORS).filter((el) => !el.closest('dialog'));

  elements.forEach((el, index) => {
    const delay = Math.min(index % 3, 2) * 0.035;

    const show = () => {
      gsap.killTweensOf(el);
      gsap.to(el, { autoAlpha: 1, y: 0, duration: durations.reveal, ease: easings.out, delay, overwrite: true });
    };

    const hide = (y: number, dur = 0.24) => {
      gsap.killTweensOf(el);
      gsap.to(el, { autoAlpha: 0, y, duration: dur, ease: 'power2.in', overwrite: true });
    };

    gsap.set(el, { autoAlpha: 0, y: 28 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 84%',
      end: 'bottom 14%',
      onEnter: show,
      onEnterBack: show,
      onLeave: () => hide(-14, 0.28),
      onLeaveBack: () => hide(18, 0.2),
    });
  });
}
