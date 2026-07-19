import { gsap, ScrollTrigger } from './core';

export function initBackgroundParallax() {
  gsap.utils.toArray<HTMLElement>('[data-folio-bg]').forEach((layer) => {
    const section = layer.closest<HTMLElement>('[data-section]');
    if (!section) return;
    gsap.to(layer, {
      y: 48,
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
    });
  });
}

export function initCraftHoverGallery() {
  gsap.utils.toArray<HTMLElement>('[data-craft-item]').forEach((item) => {
    const description = item.querySelector<HTMLElement>('[data-craft-description]');
    if (!description) return;

    gsap.set(description, { autoAlpha: 0, y: 20 });

    const show = () => {
      gsap.to(item, {
        backgroundColor: '#101010',
        duration: 0.22,
        ease: 'power2.out',
        overwrite: true,
      });
      gsap.to(description, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: 'power3.out',
        overwrite: true,
      });
    };
    const hide = () => {
      gsap.to(item, {
        backgroundColor: '#1a1a1a',
        duration: 0.22,
        ease: 'power2.out',
        overwrite: true,
      });
      gsap.to(description, {
        autoAlpha: 0,
        y: 20,
        duration: 0.22,
        ease: 'power2.in',
        overwrite: true,
      });
    };

    item.addEventListener('pointerenter', show);
    item.addEventListener('pointerleave', hide);
    item.addEventListener('focusin', show);
    item.addEventListener('focusout', hide);
  });
}

export function initSectionHeaderMotion() {
  gsap.utils.toArray<HTMLElement>('[data-section]').forEach((section) => {
    const pin = section.querySelector<HTMLElement>('.folio-pin');
    const number = pin?.querySelector<HTMLElement>('span');
    if (!pin || !number) return;
    const scaleNumber = gsap.quickTo(number, 'scale', { duration: 0.18, ease: 'power3.out' });
    ScrollTrigger.create({
      trigger: section,
      start: 'top 72%',
      end: 'bottom 38%',
      scrub: true,
      onUpdate: (self) => {
        const eased = gsap.parseEase('power3.out')(self.progress);
        scaleNumber(1 + eased * 0.1);
      },
      onLeaveBack: () => scaleNumber(1),
    });
  });

  gsap.to('.folio-dark .section-intro', {
    y: -80,
    ease: 'none',
    scrollTrigger: { trigger: '.folio-dark', start: 'top bottom', end: 'bottom top', scrub: true },
  });
}
