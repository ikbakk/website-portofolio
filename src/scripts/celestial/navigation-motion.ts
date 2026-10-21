import { gsap } from 'gsap';

export function initNavigationMotion(scope: HTMLElement) {
  const navs = [...scope.querySelectorAll<HTMLElement>('[data-motion-nav]')];
  const previous = new Map<HTMLElement, string>();
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  const sync = (animate = false, keyboard = false) => {
    for (const nav of navs) {
      if (!nav.offsetWidth) continue;
      const active = nav.querySelector<HTMLElement>('[aria-current="page"]');
      const marker = nav.querySelector<HTMLElement>('[data-nav-indicator]');
      if (!active || !marker) continue;
      const section = active.dataset.sectionLink || '';
      const moved = previous.has(nav) && previous.get(nav) !== section;
      previous.set(nav, section);
      const position = { x: active.offsetLeft, scaleX: active.offsetWidth / 100, opacity: 1 };
      gsap.killTweensOf(marker);
      if (animate && moved && !media.matches && !keyboard) {
        gsap.to(marker, { ...position, duration: 0.25, ease: 'power2.inOut' });
        const icon = active.querySelector('.celestial-icon');
        if (icon) {
          gsap.killTweensOf(icon);
          gsap
            .timeline()
            .to(icon, { rotation: 5, duration: 0.1 })
            .to(icon, { rotation: 0, duration: 0.15, ease: 'power2.out', clearProps: 'transform' });
        }
      } else gsap.set(marker, position);
      nav.dataset.motionReady = 'true';
    }
  };
  const resize = new ResizeObserver(() => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => sync());
  });
  navs.forEach((nav) => resize.observe(nav));
  const preference = () => {
    navs.forEach((nav) => {
      nav.querySelectorAll('.celestial-icon').forEach((icon) => {
        gsap.killTweensOf(icon);
        gsap.set(icon, { clearProps: 'transform' });
      });
    });
    sync();
  };
  media.addEventListener('change', preference);
  return {
    sync,
    dispose() {
      resize.disconnect();
      cancelAnimationFrame(frame);
      media.removeEventListener('change', preference);
      navs.forEach((nav) => {
        const animated = nav.querySelectorAll('[data-nav-indicator], .celestial-icon');
        gsap.killTweensOf(animated);
        gsap.set(animated, { clearProps: 'transform,opacity' });
        delete nav.dataset.motionReady;
      });
    },
  };
}
