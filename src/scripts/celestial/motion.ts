import { gsap } from 'gsap';

export function initAmbientMotion(root: HTMLElement): () => void {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let context: gsap.Context | undefined;
  let visible = true;
  const sync = () => {
    context?.revert();
    context = undefined;
    if (media.matches || document.hidden || !visible) return;
    context = gsap.context(() => {
      gsap.to('[data-star]', {
        opacity: 0.55,
        duration: 2.8,
        stagger: { each: 0.7, repeat: -1, yoyo: true },
        ease: 'sine.inOut',
      });
      gsap.to('[data-orbit="outer"]', {
        rotation: 360,
        svgOrigin: '230 230',
        duration: 240,
        repeat: -1,
        ease: 'none',
      });
      gsap.to('[data-orbit="inner"]', {
        rotation: -360,
        svgOrigin: '230 230',
        duration: 320,
        repeat: -1,
        ease: 'none',
      });
    }, root);
  };
  const art = root.querySelector('.identity-art');
  const observer = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? false;
    sync();
  });
  if (art) observer.observe(art);
  media.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
  return () => {
    context?.revert();
    observer.disconnect();
    media.removeEventListener('change', sync);
    document.removeEventListener('visibilitychange', sync);
  };
}

/** Animate only content and the decorative frame; the parchment never moves. */
export function initPanelMotion(root: HTMLElement) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const content = root.querySelector<HTMLElement>('.main-dossier .dossier-content');
  const frame = root.querySelector<HTMLElement>('.main-dossier [data-panel-frame]');
  const targets = [content, frame].filter((el): el is HTMLElement => Boolean(el));
  let timeline: gsap.core.Timeline | undefined;
  const reset = () => {
    timeline?.kill();
    timeline = undefined;
    gsap.killTweensOf(targets);
    gsap.set(targets, { clearProps: 'transform,opacity' });
  };
  const visibility = () => {
    if (document.hidden) reset();
  };
  reduced.addEventListener('change', reset);
  document.addEventListener('visibilitychange', visibility);
  return {
    reveal() {
      reset();
      if (document.hidden) return;
      const duration = reduced.matches ? 0.15 : 0.4;
      timeline = gsap.timeline();
      if (frame) {
        timeline.fromTo(
          frame,
          reduced.matches ? { opacity: 0.4 } : { scale: 0.18, opacity: 0.15 },
          {
            opacity: 1,
            ...(reduced.matches ? {} : { scale: 1 }),
            duration,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          },
        );
      }
      if (content) {
        // Hide content immediately. A delayed fromTo leaves it visible until the
        // fade begins, which looks like a flash after the frame has expanded.
        gsap.set(content, { opacity: 0 });
        timeline.to(
          content,
          {
            opacity: 1,
            duration: reduced.matches ? 0.15 : 0.3,
            ease: 'power2.out',
            clearProps: 'opacity',
          },
          reduced.matches ? '>' : '+=0.15',
        );
      }
    },
    dispose() {
      reset();
      reduced.removeEventListener('change', reset);
      document.removeEventListener('visibilitychange', visibility);
    },
  };
}
