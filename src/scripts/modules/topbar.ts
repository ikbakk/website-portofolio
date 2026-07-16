import { gsap, reducedMotion } from './core';

let navMotionCleanup: (() => void) | undefined;
let statusPulseTween: gsap.core.Tween | undefined;

export function initTopbarNavMotion() {
  navMotionCleanup?.();
  const links = gsap.utils.toArray<HTMLButtonElement>('.topbar-nav button[data-nav-target]');
  if (links.length === 0) return;
  const controller = new AbortController();
  const signal = controller.signal;

  const resetLink = (link: HTMLElement) => {
    const active = link.getAttribute('aria-current') === 'true';
    gsap.to(link, {
      y: active ? -1 : 0,
      scale: active ? 1.025 : 1,
      duration: 0.42,
      ease: 'power3.out',
      overwrite: true,
      clearProps: active ? undefined : 'transform',
    });
  };

  links.forEach((link) => {
    const label = link.querySelector('span');
    const enter = () => {
      if (reducedMotion()) return;
      gsap.killTweensOf([link, label]);
      gsap.to(link, { y: -2, scale: 1.045, duration: 0.36, ease: 'power3.out', overwrite: true });
      if (label) gsap.fromTo(label, { x: -5 }, { x: 0, duration: 0.42, ease: 'power3.out', overwrite: true });
    };
    const leave = () => {
      if (reducedMotion()) return;
      resetLink(link);
    };
    const press = () => {
      if (reducedMotion()) return;
      gsap.fromTo(link, { scale: 0.965 }, { scale: 1.045, duration: 0.34, ease: 'back.out(2)', overwrite: true });
    };
    link.addEventListener('pointerenter', enter, { signal });
    link.addEventListener('pointerleave', leave, { signal });
    link.addEventListener('focus', enter, { signal });
    link.addEventListener('blur', leave, { signal });
    link.addEventListener('pointerdown', press, { signal });
  });

  const observer = new MutationObserver((records) => {
    if (reducedMotion()) return;
    records.forEach((record) => {
      const link = record.target as HTMLElement;
      if (link.getAttribute('aria-current') === 'true') {
        gsap.fromTo(link, { y: 0, scale: 0.985 }, { y: -1, scale: 1.025, duration: 0.48, ease: 'power3.out', overwrite: true });
      } else {
        gsap.to(link, { y: 0, scale: 1, duration: 0.32, ease: 'power3.out', overwrite: true, clearProps: 'transform' });
      }
    });
  });
  links.forEach((link) => observer.observe(link, { attributes: true, attributeFilter: ['aria-current'] }));

  navMotionCleanup = () => {
    observer.disconnect();
    controller.abort();
  };
}

export function initStatusPulse() {
  statusPulseTween?.kill();
  const dots = gsap.utils.toArray<HTMLElement>('.status-dot');
  if (dots.length === 0 || reducedMotion()) return;
  statusPulseTween = gsap.to(dots, {
    boxShadow: '0 0 0 11px transparent',
    duration: 1.8,
    ease: 'power3.out',
    repeat: -1,
    repeatDelay: 0.1,
  });
}
