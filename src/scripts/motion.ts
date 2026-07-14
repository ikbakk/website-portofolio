import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const reduceMotionQuery = '(prefers-reduced-motion: reduce)';

let progressCleanup: (() => void) | undefined;
let navCleanup: (() => void) | undefined;
let navMotionCleanup: (() => void) | undefined;
let activeScrollTween: gsap.core.Tween | undefined;
let activeScrollProxy: { y: number } | undefined;
let statusPulseTween: gsap.core.Tween | undefined;

function reducedMotion() {
  return window.matchMedia(reduceMotionQuery).matches;
}

function initProgress() {
  progressCleanup?.();
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
  const navLinks = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-target]'));
  let frame = 0;
  const update = () => {
    frame = 0;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / max));
    document.documentElement.style.setProperty('--progress', progress.toFixed(4));
    document.body.classList.toggle('is-scrolled', window.scrollY > 32);
    let current = sections[0]?.id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.38) current = section.id;
    }
    navLinks.forEach((link) => {
      const active = link.dataset.navTarget === current;
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };
  const requestUpdate = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(update);
  };
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  progressCleanup = () => {
    if (frame) window.cancelAnimationFrame(frame);
    window.removeEventListener('scroll', requestUpdate);
    window.removeEventListener('resize', requestUpdate);
  };
  update();
}

function currentScrollY() {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function scrollToElement(target: HTMLElement, extraOffset = 14) {
  const topbar = document.querySelector<HTMLElement>('.topbar');
  const offset = (topbar?.offsetHeight || 0) + extraOffset;
  const startY = currentScrollY();
  const targetY = Math.max(0, target.getBoundingClientRect().top + startY - offset);
  const distance = Math.abs(targetY - startY);
  const duration = gsap.utils.clamp(0.82, 1.35, distance / 1300);

  activeScrollTween?.kill();
  activeScrollProxy = { y: startY };
  gsap.killTweensOf(window);

  if (reducedMotion() || distance < 2) {
    window.scrollTo(0, targetY);
    return;
  }

  document.body.classList.add('is-anchor-scrolling');
  activeScrollTween = gsap.to(activeScrollProxy, {
    y: targetY,
    duration,
    ease: 'power2.inOut',
    overwrite: true,
    onUpdate: () => {
      if (!activeScrollProxy) return;
      window.scrollTo(0, activeScrollProxy.y);
    },
    onComplete: () => {
      window.scrollTo(0, targetY);
      document.body.classList.remove('is-anchor-scrolling');
      activeScrollTween = undefined;
      activeScrollProxy = undefined;
    },
    onInterrupt: () => {
      document.body.classList.remove('is-anchor-scrolling');
      activeScrollTween = undefined;
      activeScrollProxy = undefined;
    },
  });
}

function initNavOffset() {
  navCleanup?.();
  const controller = new AbortController();
  const onClick = (event: MouseEvent) => {
    const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    if (href === '#') return;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    scrollToElement(target);
    if (history.replaceState) history.replaceState(null, '', href);
  };
  document.addEventListener('click', onClick, { capture: true, passive: false, signal: controller.signal });
  navCleanup = () => controller.abort();
}


function initTopbarNavMotion() {
  navMotionCleanup?.();
  const links = gsap.utils.toArray<HTMLAnchorElement>('.topbar-nav a[data-nav-target]');
  if (links.length === 0) return;
  const controller = new AbortController();
  const signal = controller.signal;
  const resetLink = (link: HTMLElement) => {
    const active = link.getAttribute('aria-current') === 'true';
    gsap.to(link, {
      y: active ? -1 : 0,
      scale: active ? 1.025 : 1,
      duration: 0.42,
      ease: 'power3.out',
      overwrite: true,
      clearProps: active ? undefined : 'transform',
    });
  };

  links.forEach((link) => {
    const label = link.querySelector('span');
    const enter = () => {
      if (reducedMotion()) return;
      gsap.killTweensOf([link, label]);
      gsap.to(link, { y: -2, scale: 1.045, duration: 0.36, ease: 'power3.out', overwrite: true });
      if (label) gsap.fromTo(label, { x: -5 }, { x: 0, duration: 0.42, ease: 'power3.out', overwrite: true });
    };
    const leave = () => {
      if (reducedMotion()) return;
      resetLink(link);
    };
    const press = () => {
      if (reducedMotion()) return;
      gsap.fromTo(link, { scale: 0.965 }, { scale: 1.045, duration: 0.34, ease: 'back.out(2)', overwrite: true });
    };
    link.addEventListener('pointerenter', enter, { signal });
    link.addEventListener('pointerleave', leave, { signal });
    link.addEventListener('focus', enter, { signal });
    link.addEventListener('blur', leave, { signal });
    link.addEventListener('pointerdown', press, { signal });
  });

  const observer = new MutationObserver((records) => {
    if (reducedMotion()) return;
    records.forEach((record) => {
      const link = record.target as HTMLElement;
      if (link.getAttribute('aria-current') === 'true') {
        gsap.fromTo(link, { y: 0, scale: 0.985 }, { y: -1, scale: 1.025, duration: 0.48, ease: 'power3.out', overwrite: true });
      } else {
        gsap.to(link, { y: 0, scale: 1, duration: 0.32, ease: 'power3.out', overwrite: true, clearProps: 'transform' });
      }
    });
  });
  links.forEach((link) => observer.observe(link, { attributes: true, attributeFilter: ['aria-current'] }));
  navMotionCleanup = () => {
    observer.disconnect();
    controller.abort();
  };
}

function initViewportReveals() {
  const selectors = [
    '.section-intro > *',
    '.system-item',
    '.method-panel > *',
    '.contact-row',
    '.project-page.is-active .project-entry',
    '.project-page.is-active .project-copy > *',
  ].join(', ');
  const elements = gsap.utils.toArray<HTMLElement>(selectors).filter((el) => !el.closest('dialog'));
  elements.forEach((el, index) => {
    const delay = Math.min(index % 3, 2) * 0.035;
    const show = () => {
      gsap.killTweensOf(el);
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 0.62,
        ease: 'power3.out',
        delay,
        overwrite: true,
      });
    };
    const hide = (y: number, duration = 0.24) => {
      gsap.killTweensOf(el);
      gsap.to(el, {
        autoAlpha: 0,
        y,
        duration,
        ease: 'power2.in',
        overwrite: true,
      });
    };

    gsap.set(el, { autoAlpha: 0, y: 28 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 84%',
      end: 'bottom 14%',
      onEnter: show,
      onEnterBack: show,
      onLeave: () => hide(-14, 0.28),
      onLeaveBack: () => hide(18, 0.2),
    });
  });
}

function initDialogs() {
  const projectDialog = document.querySelector<HTMLDialogElement>('[data-project-dialog]');
  const pdfDialog = document.querySelector<HTMLDialogElement>('[data-pdf-dialog]');
  const projectTitle = document.querySelector<HTMLElement>('[data-project-title]');
  const projectKicker = document.querySelector<HTMLElement>('[data-project-kicker]');
  const projectMeta = document.querySelector<HTMLElement>('[data-project-meta]');
  const projectCopy = document.querySelector<HTMLElement>('[data-project-copy]');
  const pdfFrame = document.querySelector<HTMLIFrameElement>('[data-pdf-frame]');
  const pdfEmpty = document.querySelector<HTMLElement>('[data-pdf-empty]');

  const openDialog = (dialog?: HTMLDialogElement | null) => {
    if (!dialog || dialog.open) return;
    dialog.showModal();
    const card = dialog.querySelector<HTMLElement>('.modal-card');
    if (!card || reducedMotion()) return;
    gsap.killTweensOf(card);
    gsap.fromTo(
      card,
      { opacity: 0, y: -22, rotateX: -8, scaleY: 0.08, clipPath: 'inset(48% 0% 48% 0%)' },
      { opacity: 1, y: 0, rotateX: 0, scaleY: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.52, ease: 'power3.out', clearProps: 'transform,clipPath' },
    );
  };

  const closeDialog = (dialog?: HTMLDialogElement | null) => {
    if (!dialog || !dialog.open) return;
    const card = dialog.querySelector<HTMLElement>('.modal-card');
    if (!card || reducedMotion()) {
      dialog.close();
      return;
    }
    gsap.killTweensOf(card);
    gsap.to(card, {
      opacity: 0,
      y: -18,
      rotateX: 8,
      scaleY: 0.08,
      clipPath: 'inset(48% 0% 48% 0%)',
      duration: 0.32,
      ease: 'power3.in',
      onComplete: () => {
        dialog.close();
        gsap.set(card, { clearProps: 'all' });
      },
    });
  };

  [projectDialog, pdfDialog].forEach((dialog) => {
    if (!dialog || dialog.dataset.backdropBound === 'true') return;
    dialog.dataset.backdropBound = 'true';
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDialog(dialog);
    });
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      closeDialog(dialog);
    });
  });

  document.querySelectorAll<HTMLElement>('[data-project-open]').forEach((button) => {
    if (button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.addEventListener('click', () => {
      if (projectKicker) projectKicker.textContent = `${button.dataset.projectNumber} / ${button.dataset.projectYear}`;
      if (projectTitle) projectTitle.textContent = button.dataset.projectTitle || 'Project detail';
      if (projectMeta) {
        projectMeta.innerHTML = `
          <span><strong>Role</strong>${button.dataset.projectRole || ''}</span>
          <span><strong>Stack</strong>${button.dataset.projectStack || ''}</span>
          <span><strong>Outcome</strong>${button.dataset.projectOutcome || ''}</span>
        `;
      }
      if (projectCopy) {
        const paragraphs = (button.dataset.projectDetails || '').split('\n\n').filter(Boolean);
        projectCopy.innerHTML = paragraphs.map((text) => `<p>${text}</p>`).join('') + `<footer>${button.dataset.projectNote || ''}</footer>`;
      }
      openDialog(projectDialog);
    });
  });

  document.querySelectorAll<HTMLElement>('[data-pdf-open]').forEach((button) => {
    if (button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.addEventListener('click', async () => {
      const src = button.dataset.pdfSrc || '/resume.pdf';
      if (pdfDialog) pdfDialog.dataset.pdfState = 'loading';
      if (pdfEmpty) pdfEmpty.textContent = 'Checking for the PDF...';
      try {
        const response = await fetch(src, { method: 'HEAD', cache: 'no-store' });
        if (!response.ok) throw new Error(`PDF returned ${response.status}`);
        if (pdfFrame && pdfFrame.getAttribute('src') !== src) pdfFrame.src = src;
        if (pdfDialog) pdfDialog.dataset.pdfState = 'ready';
      } catch {
        if (pdfFrame) pdfFrame.src = 'about:blank';
        if (pdfEmpty) pdfEmpty.textContent = 'No PDF is available yet. Add resume.pdf to the public folder, then this viewer will open it in place.';
        if (pdfDialog) pdfDialog.dataset.pdfState = 'missing';
      }
      openDialog(pdfDialog);
    });
  });

  document.querySelectorAll<HTMLElement>('[data-modal-close]').forEach((button) => {
    if (button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.addEventListener('click', () => closeDialog(button.closest<HTMLDialogElement>('dialog')));
  });
}

function initProjectFocus() {
  const pager = document.querySelector<HTMLElement>('[data-project-pager]');
  const pages = gsap.utils.toArray<HTMLElement>('[data-project-page]');
  const buttons = gsap.utils.toArray<HTMLButtonElement>('[data-project-page-button]');
  const entries = gsap.utils.toArray<HTMLElement>('[data-project-card]');
  if (!pager || pages.length === 0 || entries.length === 0) return;

  let activePage = 0;
  let activeEntry = 0;
  let lastDirection = 1;
  const clampPage = gsap.utils.clamp(0, pages.length - 1);

  const setEntryFocus = (index: number) => {
    activeEntry = gsap.utils.clamp(0, entries.length - 1, index);
    entries.forEach((entry, entryIndex) => {
      const entryPage = Math.floor(entryIndex / 3);
      const active = entryIndex === activeEntry;
      const visible = entryPage === activePage;
      entry.classList.toggle('is-focused', active && visible);
      entry.classList.toggle('is-muted', !active && visible);
      entry.setAttribute('aria-current', active && visible ? 'true' : 'false');
    });
  };

  const moveToFirstEntryOfPage = (pageIndex: number) => {
    const firstEntry = entries[pageIndex * 3];
    if (!firstEntry) return;
    window.requestAnimationFrame(() => scrollToElement(firstEntry, 92));
  };

  const setPage = (nextIndex: number, shouldScrollToFirstEntry = false) => {
    const nextPage = clampPage(nextIndex);
    if (nextPage === activePage) return;
    const previous = pages[activePage];
    const next = pages[nextPage];
    lastDirection = nextPage > activePage ? 1 : -1;
    activePage = nextPage;

    buttons.forEach((button, index) => {
      button.setAttribute('aria-current', index === activePage ? 'true' : 'false');
      gsap.to(button, {
        x: index === activePage ? 0 : -lastDirection * 4,
        skewX: index === activePage ? 0 : -lastDirection * 5,
        scale: index === activePage ? 1.08 : 1,
        duration: 0.42,
        ease: 'back.out(1.7)',
        clearProps: index === activePage ? 'x,skewX' : 'scale',
      });
    });

    gsap.killTweensOf([previous, next]);
    gsap.set(previous, { position: 'absolute', autoAlpha: 1 });
    gsap.set(next, { autoAlpha: 1, xPercent: lastDirection * 12, skewX: lastDirection * 4, filter: 'blur(8px)', scale: 0.985, position: 'relative' });
    next.classList.add('is-active');
    gsap.to(previous, {
      autoAlpha: 0,
      xPercent: -lastDirection * 8,
      skewX: -lastDirection * 3,
      filter: 'blur(8px)',
      scale: 0.985,
      duration: 0.34,
      ease: 'power3.in',
      onComplete: () => previous?.classList.remove('is-active'),
    });
    gsap.to(next, {
      autoAlpha: 1,
      xPercent: 0,
      skewX: 0,
      filter: 'blur(0px)',
      scale: 1,
      duration: 0.62,
      ease: 'power3.out',
      clearProps: 'transform,filter,opacity,visibility',
      onComplete: () => {
        if (shouldScrollToFirstEntry) moveToFirstEntryOfPage(activePage);
      },
    });
    setEntryFocus(activePage * 3);
  };

  pages.forEach((page, index) => {
    page.classList.toggle('is-active', index === activePage);
    gsap.set(page, { autoAlpha: index === activePage ? 1 : 0 });
  });
  setEntryFocus(0);

  buttons.forEach((button) => {
    if (button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.addEventListener('click', () => setPage(Number(button.dataset.pageIndex || 0), true));
  });

  entries.forEach((entry, index) => {
    if (entry.dataset.hoverFocusBound === 'true') return;
    entry.dataset.hoverFocusBound = 'true';
    entry.addEventListener('pointerenter', () => setEntryFocus(index));
    entry.addEventListener('focusin', () => setEntryFocus(index));
  });
}

function initBackgroundParallax() {
  gsap.utils.toArray<HTMLElement>('[data-section]').forEach((section) => {
    gsap.to(section, {
      '--folio-bg-y': '48px',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.7,
      },
    });
  });
}

function initSectionHeaderMotion() {
  gsap.utils.toArray<HTMLElement>('[data-section]').forEach((section) => {
    const pin = section.querySelector<HTMLElement>('.folio-pin');
    const number = pin?.querySelector<HTMLElement>('span');
    if (!pin || !number) return;
    const scaleNumber = gsap.quickTo(number, 'scale', { duration: 0.18, ease: 'power3.out' });
    ScrollTrigger.create({
      trigger: section,
      start: 'top 72%',
      end: 'bottom 38%',
      scrub: true,
      onUpdate: (self) => {
        const eased = gsap.parseEase('power3.out')(self.progress);
        scaleNumber(1 + eased * 0.1);
      },
      onLeaveBack: () => scaleNumber(1),
    });
  });
}

function initStatusPulse() {
  statusPulseTween?.kill();
  const dots = gsap.utils.toArray<HTMLElement>('.status-dot');
  if (dots.length === 0) return;
  statusPulseTween = gsap.to(dots, {
    boxShadow: '0 0 0 11px transparent',
    duration: 1.8,
    ease: 'power3.out',
    repeat: -1,
    repeatDelay: 0.1,
  });
}

function initGsap() {
  initTopbarNavMotion();
  if (reducedMotion()) {
    gsap.set('[data-motion], .section-intro > *, .system-item, .method-panel > *, .contact-row, .project-entry, .project-copy > *', { clearProps: 'all' });
    return;
  }
  initProjectFocus();
  initStatusPulse();
  initSectionHeaderMotion();
  initBackgroundParallax();
  initViewportReveals();
  gsap.from('[data-motion="hero-copy"] > *', { y: 18, opacity: 0, duration: 0.72, ease: 'power3.out', stagger: 0.08 });
  gsap.from('[data-motion="hero-console"]', { y: 28, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.18 });
  gsap.to('.folio-dark .section-intro', {
    y: -80,
    ease: 'none',
    scrollTrigger: { trigger: '.folio-dark', start: 'top bottom', end: 'bottom top', scrub: true },
  });
}

export function initPortfolioMotion() {
  initProgress();
  initNavOffset();
  initDialogs();
  initGsap();
  document.addEventListener('astro:after-swap', () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    initProgress();
    initNavOffset();
    initDialogs();
    initGsap();
    ScrollTrigger.refresh();
  });
}
