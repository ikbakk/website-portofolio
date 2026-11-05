import gsap from 'gsap';
import { isWeatherThemeId, type WeatherThemeId } from '../../theme/weather.config';

/** One bounded sequence per user choice; no idle particle loop or page-load animation. */
export function createWeatherTransitions() {
  const html = document.documentElement;
  const stage = document.querySelector<HTMLElement>('[data-weather-stage]');
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-set-weather]')];
  if (!stage || !buttons.length) return;
  const veil = stage.querySelector<HTMLElement>('[data-weather-veil]')!;
  const particles = stage.querySelector<HTMLElement>('[data-weather-particles]')!;
  const charge = stage.querySelector<HTMLElement>('[data-weather-charge]')!;
  const lightning = stage.querySelector<SVGElement>('[data-weather-lightning]')!;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const events = new AbortController();
  const initial = html.dataset.weather;
  let requested: WeatherThemeId = initial && isWeatherThemeId(initial) ? initial : 'normal';
  let sequence: gsap.core.Timeline | undefined;
  let lastLightning = -Infinity;
  let pendingContent: (() => void) | undefined;
  const flushContent = () => {
    const commit = pendingContent;
    pendingContent = undefined;
    commit?.();
  };

  const selectButtons = (theme: WeatherThemeId) =>
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.setWeather === theme));
    });
  const commit = (theme: WeatherThemeId) => {
    html.dataset.weather = theme;
  };
  const clear = () => {
    sequence?.kill();
    sequence = undefined;
    particles.replaceChildren();
    gsap.set([veil, charge, lightning], { clearProps: 'all' });
    stage.hidden = true;
    delete stage.dataset.kind;
    delete html.dataset.weatherTransition;
    flushContent();
  };
  const settle = () => {
    commit(requested);
    clear();
  };
  const particle = (kind: string, size: number, symbol?: string) => {
    const el = document.createElement('span');
    el.className = `weather-particle ${kind}`;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    if (symbol) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', symbol === 'weather-crystal' ? '0 0 32 32' : '0 0 48 64');
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttribute('href', '#' + symbol);
      svg.append(use);
      el.append(svg);
    }
    particles.append(el);
    return el;
  };
  const random = gsap.utils.random;

  const meadow = (
    tl: gsap.core.Timeline,
    w: number,
    h: number,
    compact: boolean,
    midpoint: () => void,
  ) => {
    gsap.set(veil, { y: -h * 1.5, opacity: 1 });
    tl.to(veil, { y: h * 1.1, duration: 2.05, ease: 'sine.inOut' }, 0);
    tl.call(midpoint, [], 0.87);
    const count = compact ? 30 : 62;
    for (let i = 0; i < count; i++) {
      const depth = i % 3;
      const size = random(12, 22) + depth * 10;
      const leaf = particle('weather-leaf', size, i % 2 ? 'weather-leaf-a' : 'weather-leaf-b');
      const face = leaf.firstElementChild!;
      leaf.style.color = ['#5b8440', '#8eaf55', '#b5ca72', '#6a984c'][i % 4];
      const x = ((i + random(-0.3, 0.3)) / count) * w;
      const sway = random(35, 90) * (i % 2 ? 1 : -1);
      const start = random(0, 0.28);
      const duration = random(1.55, 1.98) - depth * 0.06;
      gsap.set(leaf, { x, y: -size * 2, opacity: 0 });
      gsap.set(face, {
        rotation: random(-160, 160),
        rotationY: random(-60, 60),
        transformPerspective: 500,
      });
      tl.to(leaf, { opacity: [0.45, 0.7, 0.95][depth], duration: 0.16 }, start);
      tl.to(leaf, { y: h + size * 2, duration, ease: 'none' }, start);
      tl.to(
        leaf,
        {
          keyframes: [
            { x: x + sway, duration: duration * 0.35 },
            { x: x - sway * 0.35, duration: duration * 0.35 },
            { x: x + sway * 0.65, duration: duration * 0.3 },
          ],
          ease: 'sine.inOut',
        },
        start,
      );
      tl.to(
        face,
        {
          rotation: `+=${random(80, 220) * (i % 2 ? 1 : -1)}`,
          rotationY: `+=${random(180, 340)}`,
          rotationX: random(-65, 65),
          duration,
          ease: 'sine.inOut',
        },
        start,
      );
      tl.to(leaf, { opacity: 0, duration: 0.18 }, start + duration - 0.18);
    }
  };

  const blizzard = (
    tl: gsap.core.Timeline,
    w: number,
    h: number,
    compact: boolean,
    midpoint: () => void,
  ) => {
    gsap.set(veil, { x: w * 1.45, y: -h * 0.35, opacity: 1 });
    tl.to(veil, { x: -w * 1.45, y: h * 0.4, duration: 1.5, ease: 'power2.inOut' }, 0);
    tl.call(midpoint, [], 0.69);
    const count = compact ? 52 : 100;
    for (let i = 0; i < count; i++) {
      const depth = i % 3;
      const crystal = i % 7 === 0;
      const flake = particle(
        crystal ? 'weather-snow-crystal' : 'weather-snow-dot',
        crystal ? random(15, 27) : random(2, 5) + depth * 2,
        crystal ? 'weather-crystal' : undefined,
      );
      flake.style.color = depth === 2 ? '#80b6cf' : '#eefaff';
      if (!crystal) flake.style.backgroundColor = ['#eefaff', '#b4dceb', '#87bdd5'][depth];
      const x = random(w * 0.2, w * 1.5);
      const y = random(-h * 0.7, h * 0.85);
      const duration = random(0.85, 1.25) - depth * 0.06;
      const start = random(0, 0.3);
      gsap.set(flake, { x, y, opacity: 0, rotation: random(-45, 45) });
      tl.to(flake, { opacity: [0.38, 0.65, 0.95][depth], duration: 0.1 }, start);
      tl.to(
        flake,
        {
          x: x - w * 1.65,
          y: y + h * 0.8,
          rotation: `+=${random(40, 150)}`,
          duration,
          ease: 'power1.in',
        },
        start,
      );
      tl.to(flake, { opacity: 0, duration: 0.16 }, start + duration - 0.16);
    }
    for (let i = 0; i < (compact ? 7 : 13); i++) {
      const streak = particle('weather-snow-streak', random(65, 170));
      streak.style.height = '2px';
      const x = random(w, w * 1.6),
        y = random(-h * 0.3, h * 0.7);
      gsap.set(streak, { x, y, rotation: -28, opacity: 0 });
      tl.to(streak, { opacity: 0.45, duration: 0.1 }, i * 0.025);
      tl.to(streak, { x: x - w * 2, y: y + h * 0.9, duration: 0.95, ease: 'power2.in' }, i * 0.025);
      tl.to(streak, { opacity: 0, duration: 0.12 }, 0.8 + i * 0.025);
    }
  };

  const electro = (tl: gsap.core.Timeline, midpoint: () => void) => {
    // A single strike; rapid repeated selection degrades to a gentle color fade.
    lastLightning = performance.now();
    tl.to(charge, { opacity: 0.25, duration: 0.18, ease: 'power2.in' }, 0);
    tl.to(lightning, { opacity: 1, duration: 0.035, ease: 'none' }, 0.18);
    tl.to(charge, { opacity: 0.8, duration: 0.045, ease: 'none' }, 0.18);
    tl.call(midpoint, [], 0.23);
    tl.to(lightning, { opacity: 0, duration: 0.3, ease: 'power3.out' }, 0.23);
    tl.to(charge, { opacity: 0, duration: 0.6, ease: 'power2.out' }, 0.23);
  };

  const animate = (theme: WeatherThemeId, midpoint: () => void) => {
    if (document.hidden) {
      midpoint();
      clear();
      return;
    }
    stage.hidden = false;
    html.dataset.weatherTransition = theme;
    const reduced =
      motion.matches || (theme === 'electro' && performance.now() - lastLightning < 1400);
    stage.dataset.kind = reduced ? 'reduced' : theme;
    const tl = gsap.timeline({ onComplete: clear });
    sequence = tl;
    if (reduced) {
      midpoint();
      gsap.set(veil, { opacity: 0.15 });
      tl.to(veil, { opacity: 0, duration: 0.18, ease: 'none' });
    } else {
      const w = window.innerWidth,
        h = window.innerHeight;
      if (theme === 'normal') meadow(tl, w, h, w < 741, midpoint);
      else if (theme === 'cryo') blizzard(tl, w, h, w < 741, midpoint);
      else electro(tl, midpoint);
    }
  };
  const request = (theme: WeatherThemeId) => {
    if (theme === requested) return;
    clear();
    requested = theme;
    selectButtons(theme);
    if (theme === html.dataset.weather) return;
    animate(theme, () => commit(theme));
  };
  const transitionContent = (commitContent: () => void) => {
    settle();
    pendingContent = commitContent;
    animate(requested, flushContent);
  };
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.hidden) settle();
    },
    { signal: events.signal },
  );
  window.addEventListener('resize', settle, { signal: events.signal });
  window.addEventListener('pagehide', settle, { signal: events.signal });
  motion.addEventListener('change', settle, { signal: events.signal });
  document.addEventListener(
    'astro:before-swap',
    () => {
      settle();
      events.abort();
    },
    { once: true, signal: events.signal },
  );
  return {
    request,
    transitionContent,
    dispose: () => {
      settle();
      events.abort();
    },
  };
}
