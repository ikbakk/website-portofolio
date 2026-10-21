import { gsap } from 'gsap';

export function stopDossierMotion(element: HTMLElement): void {
  gsap.killTweensOf(element);
  gsap.set(element, { clearProps: 'transform,opacity,clipPath' });
}

export function revealDossier(element: HTMLElement, keyboard = false): void {
  stopDossierMotion(element);
  const gentle = keyboard || matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.fromTo(
    element,
    gentle ? { opacity: 0.8 } : { opacity: 0.7, y: 8, clipPath: 'inset(0 4% 0 0)' },
    {
      opacity: 1,
      ...(gentle ? {} : { y: 0, clipPath: 'inset(0 0% 0 0)' }),
      duration: gentle ? 0.15 : 0.32,
      ease: 'power3.out',
      clearProps: 'transform,opacity,clipPath',
    },
  );
}

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
export function initMobilePanelMotion(root: HTMLElement) {
  const mobile = matchMedia('(max-width: 700px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const content = root.querySelector<HTMLElement>('.main-dossier .dossier-content');
  const frame = root.querySelector<HTMLElement>('.main-dossier [data-panel-frame]');
  const targets = [content, frame].filter((el): el is HTMLElement => Boolean(el));
  const reset = () => {
    gsap.killTweensOf(targets);
    gsap.set(targets, { clearProps: 'transform,opacity' });
  };
  const visibility = () => {
    if (document.hidden) reset();
  };
  mobile.addEventListener('change', reset);
  reduced.addEventListener('change', reset);
  document.addEventListener('visibilitychange', visibility);
  return {
    mobile: () => mobile.matches,
    reveal() {
      reset();
      if (!mobile.matches || document.hidden) return;
      const duration = reduced.matches ? 0.15 : 0.4;
      const timeline = gsap.timeline();
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
      mobile.removeEventListener('change', reset);
      reduced.removeEventListener('change', reset);
      document.removeEventListener('visibilitychange', visibility);
    },
  };
}
