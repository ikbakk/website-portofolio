/**
 * Hover/focus interactive state animations.
 * All interactive elements animate via GSAP.
 */
import { gsap, easings, durations, isReducedMotion } from '../lib/gsap';

/** Initialize project visual hover animations. */
export function initProjectVisuals(): void {
  const visuals = gsap.utils.toArray<HTMLElement>('.project-visual');
  if (visuals.length === 0) return;

  visuals.forEach((visual) => {
    const enter = () => {
      if (isReducedMotion()) return;
      gsap.to(visual, { borderColor: 'var(--border-strong)', duration: durations.fast, ease: easings.out });
    };

    const leave = () => {
      if (isReducedMotion()) return;
      gsap.to(visual, { borderColor: 'var(--border)', duration: durations.fast, ease: easings.out });
    };

    visual.addEventListener('pointerenter', enter);
    visual.addEventListener('pointerleave', leave);
  });
}

/** Initialize contact link hover animations. */
export function initContactLinks(): void {
  const links = gsap.utils.toArray<HTMLElement>('.contact-link');
  if (links.length === 0) return;

  links.forEach((link) => {
    const enter = () => {
      if (isReducedMotion()) return;
      gsap.to(link, { borderColor: 'var(--accent)', color: 'var(--accent)', duration: durations.fast, ease: easings.out });
    };

    const leave = () => {
      if (isReducedMotion()) return;
      gsap.to(link, { borderColor: 'transparent', color: 'var(--fg)', duration: durations.fast, ease: easings.out });
    };

    link.addEventListener('pointerenter', enter);
    link.addEventListener('pointerleave', leave);
  });
}

/** Initialize button hover animations. */
export function initButtons(): void {
  const buttons = gsap.utils.toArray<HTMLElement>('.button');
  if (buttons.length === 0) return;

  buttons.forEach((button) => {
    const enter = () => {
      if (isReducedMotion()) return;
      gsap.to(button, { y: -2, duration: durations.fast, ease: easings.out });
    };

    const leave = () => {
      if (isReducedMotion()) return;
      gsap.to(button, { y: 0, duration: durations.fast, ease: easings.out });
    };

    button.addEventListener('pointerenter', enter);
    button.addEventListener('pointerleave', leave);
  });
}
