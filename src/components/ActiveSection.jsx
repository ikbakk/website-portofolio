import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function ActiveSection() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = new Lenis({ autoRaf: true, anchors: false, smoothWheel: !reducedMotion });
    const sections = [...document.querySelectorAll('.hero, #work, #experience, #contact')];
    const links = [...document.querySelectorAll('.world-map-panel nav a[href^="#"]')];
    const location = document.querySelector('.world-map-location');
    const feature = document.querySelector('[data-scroll-feature]');
    const projects = [...document.querySelectorAll('[data-scroll-project]')];
    const experienceBands = [...document.querySelectorAll('[data-scroll-experience]')];
    let current = null;
    const clamp = (value) => Math.max(0, Math.min(1, value));

    const updateActive = () => {
      document.documentElement.style.setProperty('--hero-scroll', String(lenis.scroll));
      const activationLine = window.innerHeight * 0.6;
      if (!reducedMotion) {
        if (feature) {
          const rect = feature.getBoundingClientRect();
          const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
          feature.style.setProperty('--feature-media-y', `${Math.round(-40 + progress * 80)}px`);
        }
        projects.forEach((project) => {
          const rect = project.getBoundingClientRect();
          const progress = clamp((window.innerHeight * 0.85 - rect.top) / (window.innerHeight * 0.75 + rect.height));
          project.style.setProperty('--line-progress', `${Math.round(progress * 100)}%`);
          project.style.setProperty('--art-travel', `${Math.round(-28 + progress * 56)}px`);
        });
        experienceBands.forEach((band) => {
          const rect = band.getBoundingClientRect();
          const progress = clamp((window.innerHeight * 0.8 - rect.top) / (window.innerHeight * 0.65 + rect.height));
          band.style.setProperty('--band-progress', `${Math.round(progress * 100)}%`);
        });
      }
      const active = [...sections].reverse().find((section) => {
        const heading = section.querySelector('h1, h2');
        return heading && heading.getBoundingClientRect().top <= activationLine;
      }) || sections[0];

      if (active === current) return;
      current = active;
      sections.forEach((section) => section.classList.toggle('is-active', section === active));
      links.forEach((link) => {
        if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      if (location) location.textContent = active.id === 'intro' ? 'Start' : active.id.charAt(0).toUpperCase() + active.id.slice(1);
    };

    const scrollToHash = (hash, immediate = false) => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return false;
      const offset = target.id === 'top' || target.id === 'intro' ? 0 : -16;
      lenis.scrollTo(target, {
        offset,
        duration: 1.05,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        immediate: immediate || reducedMotion,
      });
      return true;
    };

    const onAnchorClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      const hash = link?.getAttribute('href');
      if (!hash || hash.length < 2 || !document.getElementById(hash.slice(1))) return;
      event.preventDefault();
      if (window.location.hash !== hash) window.history.pushState(null, '', hash);
      scrollToHash(hash);
    };

    const onPopState = () => {
      if (window.location.hash) scrollToHash(window.location.hash, true);
      else lenis.scrollTo(0, { immediate: true });
    };
    const onMapToggle = (event) => event.detail.open ? lenis.stop() : lenis.start();

    lenis.on('scroll', updateActive);
    document.addEventListener('world-map-toggle', onMapToggle);
    document.addEventListener('click', onAnchorClick);
    window.addEventListener('popstate', onPopState);
    window.addEventListener('resize', updateActive);
    document.documentElement.classList.add('scroll-ready');
    updateActive();
    return () => {
      lenis.off('scroll', updateActive);
      document.removeEventListener('world-map-toggle', onMapToggle);
      document.removeEventListener('click', onAnchorClick);
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('resize', updateActive);
      document.documentElement.classList.remove('scroll-ready');
      document.documentElement.style.removeProperty('--hero-scroll');
      lenis.destroy();
    };
  }, []);
  return null;
}
