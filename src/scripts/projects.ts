/**
 * Project listing interactions and page transitions.
 */
import { gsap, easings, durations, isReducedMotion } from '../lib/gsap';

let projectCleanup: (() => void) | undefined;

function setFocusedProject(entry: HTMLElement): void {
  const page = entry.closest<HTMLElement>('[data-project-page]');
  if (!page) return;

  const entries = gsap.utils.toArray<HTMLElement>('[data-project-card]', page);

  entries.forEach((item) => {
    const focused = item === entry;
    item.classList.toggle('is-focused', focused);
    item.classList.toggle('is-muted', !focused);
  });

  if (isReducedMotion()) return;

  gsap.to(entries, {
    x: (index, target) => (target === entry ? 8 : 0),
    opacity: (index, target) => (target === entry ? 1 : 0.58),
    duration: durations.base,
    ease: easings.out,
    overwrite: true,
  });
}

function activatePage(nextIndex: number, pages: HTMLElement[], buttons: HTMLElement[]): void {
  const currentPage = pages.find((page) => page.classList.contains('is-active'));
  const nextPage = pages[nextIndex];
  if (!nextPage || nextPage === currentPage) return;

  buttons.forEach((button, index) => {
    button.setAttribute('aria-current', index === nextIndex ? 'true' : 'false');
  });

  const showNextPage = () => {
    pages.forEach((page) => page.classList.toggle('is-active', page === nextPage));

    const entries = gsap.utils.toArray<HTMLElement>('[data-project-card]', nextPage);
    entries.forEach((entry, index) => {
      entry.classList.toggle('is-focused', index === 0);
      entry.classList.toggle('is-muted', index !== 0);
    });

    if (isReducedMotion()) {
      gsap.set(pages, { clearProps: 'all' });
      return;
    }

    gsap.fromTo(
      nextPage,
      { autoAlpha: 0, y: 24, rotateX: -3 },
      {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        duration: durations.reveal,
        ease: easings.out,
        clearProps: 'transform,opacity,visibility',
      },
    );

    gsap.fromTo(
      entries,
      { autoAlpha: 0, y: 18 },
      {
        autoAlpha: 1,
        y: 0,
        duration: durations.reveal,
        ease: easings.out,
        stagger: 0.055,
        delay: 0.08,
        clearProps: 'transform,opacity,visibility',
      },
    );
  };

  if (!currentPage || isReducedMotion()) {
    showNextPage();
    return;
  }

  gsap.to(currentPage, {
    autoAlpha: 0,
    y: -18,
    rotateX: 3,
    duration: 0.24,
    ease: 'power2.in',
    onComplete: showNextPage,
  });
}

/** Initialize project listing focus and pagination motion. */
export function initProjects(): void {
  projectCleanup?.();

  const pager = document.querySelector<HTMLElement>('[data-project-pager]');
  if (!pager) return;

  const controller = new AbortController();
  const signal = controller.signal;
  const pages = gsap.utils.toArray<HTMLElement>('[data-project-page]', pager);
  const buttons = gsap.utils.toArray<HTMLElement>('[data-project-page-button]', pager);

  pages.forEach((page) => {
    const active = page.classList.contains('is-active');
    const entries = gsap.utils.toArray<HTMLElement>('[data-project-card]', page);

    gsap.set(page, { autoAlpha: active ? 1 : 0 });

    entries.forEach((entry, index) => {
      entry.classList.toggle('is-focused', active && index === 0);
      entry.classList.toggle('is-muted', active && index !== 0);

      entry.addEventListener('pointerenter', () => setFocusedProject(entry), { signal });
      entry.addEventListener('focus', () => setFocusedProject(entry), { signal });
    });
  });

  buttons.forEach((button) => {
    button.addEventListener(
      'click',
      () => {
        const nextIndex = Number(button.dataset.pageIndex || 0);
        activatePage(nextIndex, pages, buttons);
      },
      { signal },
    );
  });

  projectCleanup = () => {
    controller.abort();
    projectCleanup = undefined;
  };
}
