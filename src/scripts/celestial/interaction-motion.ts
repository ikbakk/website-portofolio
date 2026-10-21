import { gsap } from 'gsap';

export function initUIFeedback(scope: HTMLElement): () => void {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const timelines = new Map<Element, gsap.core.Timeline>();
  const press = (event: PointerEvent) => {
    if (event.button !== 0 || !(event.target instanceof Element)) return;
    const target = event.target.closest<HTMLElement>('.game-button, [data-project-link]');
    if (!target || !scope.contains(target)) return;
    const effect = target.querySelector('[data-interaction-ripple], [data-selection-flare]');
    if (!effect) return;
    timelines.get(effect)?.kill();
    const timeline = gsap.timeline({ onComplete: () => timelines.delete(effect) });
    timelines.set(effect, timeline);
    if (media.matches) {
      timeline.fromTo(effect, { opacity: 0.22 }, { opacity: 0, duration: 0.16 });
    } else {
      timeline.fromTo(
        effect,
        { opacity: 0.35, scale: 0.65 },
        {
          opacity: 0,
          scale: 1.4,
          duration: 0.35,
          ease: 'power2.out',
        },
      );
    }
  };
  const reset = () => {
    timelines.forEach((timeline, el) => {
      timeline.kill();
      gsap.set(el, { clearProps: 'transform,opacity' });
    });
    timelines.clear();
  };
  const visibility = () => {
    if (document.hidden) reset();
  };
  scope.addEventListener('pointerdown', press);
  document.addEventListener('visibilitychange', visibility);
  media.addEventListener('change', reset);
  return () => {
    reset();
    scope.removeEventListener('pointerdown', press);
    document.removeEventListener('visibilitychange', visibility);
    media.removeEventListener('change', reset);
  };
}
