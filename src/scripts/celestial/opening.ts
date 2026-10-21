import { gsap } from 'gsap';

/** One short visual entrance. Native navigation is never gated by it. */
export function initOpening(root: HTMLElement): () => void {
  const html = document.documentElement;
  const body = root.closest('body')!;
  const overlay = body.querySelector<HTMLElement>('[data-opening]');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const remaining = Number(html.dataset.openingDeadline || 0) - performance.now();
  if (!overlay || html.dataset.opening !== 'pending' || remaining < 300 || media.matches) {
    delete html.dataset.opening;
    delete html.dataset.openingDeadline;
    root.dataset.introState = 'skipped';
    return () => {};
  }

  root.dataset.introState = 'running';
  const sigil = overlay.querySelector('[data-opening-sigil]');
  const strokes = overlay.querySelectorAll('[data-opening-stroke]');
  const core = overlay.querySelector('[data-opening-core]');
  const aperture = overlay.querySelector('[data-aperture]');
  const identity = root.querySelector('.identity-art');
  const dossier = root.querySelector('.main-dossier .dossier-content');
  const navigation = body.querySelectorAll('.nav-item');
  let timeline: gsap.core.Timeline | undefined;
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    timeline?.kill();
    gsap.set([identity, dossier, ...navigation].filter(Boolean), {
      clearProps: 'transform,opacity,clipPath',
    });
    delete html.dataset.opening;
    delete html.dataset.openingDeadline;
    root.dataset.introState = 'complete';
  };
  const hidden = () => {
    if (document.hidden) finish();
  };
  const preference = () => {
    if (media.matches) finish();
  };
  document.addEventListener('pointerdown', finish, true);
  document.addEventListener('keydown', finish, true);
  document.addEventListener('click', finish, true);
  document.addEventListener('visibilitychange', hidden);
  media.addEventListener('change', preference);

  timeline = gsap.timeline({ defaults: { ease: 'power2.out' }, onComplete: finish });
  timeline.fromTo(
    strokes,
    { strokeDasharray: 1, strokeDashoffset: 1 },
    {
      strokeDashoffset: 0,
      duration: 0.36,
      stagger: 0.035,
    },
    0,
  );
  timeline.fromTo(
    core,
    { scale: 0.8, opacity: 0.4, svgOrigin: '150 150' },
    {
      scale: 1,
      opacity: 1,
      duration: 0.3,
    },
    0.08,
  );
  timeline.fromTo(
    sigil,
    { rotation: -24, scale: 0.9 },
    {
      rotation: 66,
      scale: 2.4,
      opacity: 0,
      duration: 0.7,
      transformOrigin: '50% 50%',
    },
    0.3,
  );
  timeline.to(aperture, { attr: { r: Math.hypot(innerWidth, innerHeight) }, duration: 0.65 }, 0.3);
  if (identity)
    timeline.fromTo(
      identity,
      { opacity: 0.55, scale: 0.94 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        clearProps: 'transform,opacity',
      },
      0.35,
    );
  if (dossier)
    timeline.fromTo(
      dossier,
      { opacity: 0.65, x: 12, clipPath: 'inset(0 7% 0 0)' },
      {
        opacity: 1,
        x: 0,
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.4,
        clearProps: 'transform,opacity,clipPath',
      },
      0.5,
    );
  timeline.fromTo(
    navigation,
    { opacity: 0.65 },
    {
      opacity: 1,
      duration: 0.25,
      stagger: 0.025,
      clearProps: 'opacity',
    },
    0.6,
  );
  // Slow connections get a shortened entrance rather than a late loading screen.
  timeline.timeScale(Math.max(1, timeline.duration() / ((remaining - 30) / 1000)));
  return () => {
    finish();
    document.removeEventListener('pointerdown', finish, true);
    document.removeEventListener('keydown', finish, true);
    document.removeEventListener('click', finish, true);
    document.removeEventListener('visibilitychange', hidden);
    media.removeEventListener('change', preference);
  };
}
