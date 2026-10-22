import { initOpening } from './opening';
import { initNavigationMotion } from './navigation-motion';
import { initUIFeedback } from './interaction-motion';
import { readArchiveLocation } from './location';
import { initAmbientMotion, initPanelMotion } from './motion';

export function initArchive(root: HTMLElement, entering = false): () => void {
  const dossiers = [...root.querySelectorAll<HTMLElement>('[data-project-dossier]')];
  const knownIds = dossiers.map((el) => el.dataset.projectDossier!);
  const sections = [...root.querySelectorAll<HTMLElement>('[data-section]')];
  const navMotion = initNavigationMotion(root.closest('body')!);
  const stopFeedback = initUIFeedback(root.closest('body')!);
  const panelMotion = initPanelMotion(root);
  let previous = '';
  const update = (keyboard = false) => {
    const state = readArchiveLocation(location.hash, knownIds);
    const key = state.section + state.projectId;
    if (key === previous) return;
    const wasReady = Boolean(previous);
    previous = key;
    sections.forEach((el) => {
      el.hidden = el.dataset.section !== state.section;
    });
    dossiers.forEach((el) => {
      el.hidden = el.dataset.projectDossier !== state.projectId;
    });
    root.querySelectorAll<HTMLElement>('[data-project-area]').forEach((el) => {
      el.hidden = state.section !== 'projects';
    });
    document.querySelectorAll<HTMLElement>('[data-section-link]').forEach((el) => {
      if (el.dataset.sectionLink === state.section) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
    root.querySelectorAll<HTMLElement>('[data-project-link]').forEach((el) => {
      if (el.dataset.projectLink === state.projectId) el.setAttribute('aria-current', 'true');
      else el.removeAttribute('aria-current');
    });
    document.querySelectorAll<HTMLElement>('[data-current-title]').forEach((title) => {
      title.textContent = state.section.charAt(0).toUpperCase() + state.section.slice(1);
    });
    navMotion.sync(wasReady, keyboard);
    root.dataset.activeSection = state.section;
    root.dataset.archiveReady = 'true';
    root
      .querySelector<HTMLElement>('.main-dossier .dossier-content')
      ?.scrollTo({ top: 0, behavior: 'instant' });
    if (wasReady || entering) panelMotion.reveal();
  };
  const click = (event: MouseEvent) => {
    if (event.target instanceof Element && event.target.closest('.skip-link')) {
      event.preventDefault();
      document.getElementById('content')?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const target =
      event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>('a[data-navigation]')
        : null;
    if (
      !target ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const url = new URL(target.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    event.preventDefault();
    if (location.hash !== url.hash) history.pushState(null, '', url.hash);
    update(event.detail === 0);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const historyUpdate = () => update(true);
  window.addEventListener('hashchange', historyUpdate);
  window.addEventListener('popstate', historyUpdate);
  update();
  const stopMotion = initAmbientMotion(root);
  const stopOpening = initOpening(root);
  // Dismiss the opening before a click starts the destination panel's motion.
  document.addEventListener('click', click, true);
  const scroller = root.querySelector<HTMLElement>('.main-dossier .dossier-content');
  const end = scroller?.querySelector('[data-scroll-end]');
  const scrollObserver = new IntersectionObserver(
    ([entry]) => {
      root.toggleAttribute('data-dossier-more', !entry.isIntersecting);
    },
    { root: scroller, threshold: 1 },
  );
  if (end) scrollObserver.observe(end);
  return () => {
    stopOpening();
    panelMotion.dispose();
    navMotion.dispose();
    stopFeedback();
    stopMotion();
    scrollObserver.disconnect();
    document.removeEventListener('click', click, true);
    window.removeEventListener('hashchange', historyUpdate);
    window.removeEventListener('popstate', historyUpdate);
  };
}

function initCaseStudy(root: HTMLElement, entering = false): () => void {
  const panelMotion = initPanelMotion(root);
  if (entering) panelMotion.reveal();
  const content = root.querySelector<HTMLElement>('.case-dossier .dossier-content');
  const end = content?.querySelector('[data-scroll-end]');
  const scrollObserver = new IntersectionObserver(
    ([entry]) => root.toggleAttribute('data-dossier-more', !entry.isIntersecting),
    { root: content, threshold: 1 },
  );
  if (end) scrollObserver.observe(end);
  const stopMotion = initAmbientMotion(root);
  const stopFeedback = initUIFeedback(document.body);
  return () => {
    panelMotion.dispose();
    scrollObserver.disconnect();
    stopMotion();
    stopFeedback();
  };
}

let cleanup: (() => void) | undefined;
let activeBody: HTMLElement | undefined;
function boot(entering = false) {
  if (activeBody === document.body && cleanup) return;
  cleanup?.();
  activeBody = document.body;
  const root = document.querySelector<HTMLElement>('[data-archive-root]');
  const caseStudy = document.querySelector<HTMLElement>('.case-world');
  cleanup = root
    ? initArchive(root, entering)
    : caseStudy
      ? initCaseStudy(caseStudy, entering)
      : initUIFeedback(document.body);
}
document.addEventListener('astro:before-swap', () => {
  cleanup?.();
  cleanup = undefined;
  activeBody = undefined;
});
// Start on the incoming DOM before Astro's page-load event, avoiding a visible
// content flash and any competing full-page transition.
document.addEventListener('astro:after-swap', () => boot(true));
document.addEventListener('astro:page-load', () => boot());
boot();
