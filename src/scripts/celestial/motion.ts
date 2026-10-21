import { gsap } from 'gsap';

export function stopDossierMotion(element: HTMLElement): void {
  gsap.killTweensOf(element);
  gsap.set(element, { clearProps: 'transform,opacity' });
}

export function revealDossier(element: HTMLElement): void {
  gsap.killTweensOf(element);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.fromTo(
    element,
    { opacity: 0.65, y: 6 },
    { opacity: 1, y: 0, duration: 0.32, ease: 'power3.out', clearProps: 'transform,opacity' },
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
