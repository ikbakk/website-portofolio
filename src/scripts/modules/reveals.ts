import { gsap, ScrollTrigger } from './core';

export function initViewportReveals() {
  const selectors = [
    '.section-intro > *',
    '.system-item',
    '.method-panel > *',
    '.contact-row',
    '.project-page.is-active .project-entry',
    '.project-page.is-active .project-copy > *',
  ].join(', ');
  const elements = gsap.utils.toArray<HTMLElement>(selectors).filter((el) => !el.closest('dialog'));

  elements.forEach((el, index) => {
    const delay = Math.min(index % 3, 2) * 0.035;
    const show = () => {
      gsap.killTweensOf(el);
      gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.62, ease: 'power3.out', delay, overwrite: true });
    };
    const hide = (y: number, duration = 0.24) => {
      gsap.killTweensOf(el);
      gsap.to(el, { autoAlpha: 0, y, duration, ease: 'power2.in', overwrite: true });
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

export function initHeroMotion() {
  gsap.from('[data-motion="hero-copy"] > *', { y: 18, opacity: 0, duration: 0.72, ease: 'power3.out', stagger: 0.08 });
  gsap.from('[data-motion="hero-console"]', { y: 28, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.18 });
}
