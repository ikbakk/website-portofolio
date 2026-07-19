import { gsap, reducedMotion } from './core';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

let removeProjectDialogListener: (() => void) | undefined;

export function initDialogs() {
  const projectDialog = document.querySelector<HTMLDialogElement>('[data-project-dialog]');
  const pdfDialog = document.querySelector<HTMLDialogElement>('[data-pdf-dialog]');
  const projectTitle = document.querySelector<HTMLElement>('[data-project-title]');
  const projectKicker = document.querySelector<HTMLElement>('[data-project-kicker]');
  const projectNavTitle = document.querySelector<HTMLElement>('[data-project-nav-title]');
  const projectMeta = document.querySelector<HTMLElement>('[data-project-meta]');
  const projectCopy = document.querySelector<HTMLElement>('[data-project-copy]');
  const projectHero = document.querySelector<HTMLElement>('[data-project-hero]');
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
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scaleY: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.52,
        ease: 'power3.out',
        clearProps: 'transform,clipPath',
      },
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

  const openProject = (button: HTMLElement) => {
    const unavailable = 'Not documented for this portfolio entry.';
    if (projectDialog)
      projectDialog.dataset.activeProjectIndex = button.dataset.projectIndex || '0';
    if (projectKicker) projectKicker.textContent = button.dataset.projectNumber || 'Project detail';
    if (projectTitle) projectTitle.textContent = button.dataset.projectTitle || 'Project detail';
    if (projectNavTitle)
      projectNavTitle.textContent = button.dataset.projectTitle || 'Project detail';
    if (projectMeta) {
      projectMeta.innerHTML = `
          <span class="grid gap-[var(--space-2)] bg-surface p-[var(--space-4)] text-fg-2"><strong class="font-mono text-[var(--text-xs)] uppercase tracking-[var(--tracking-mono)] text-muted">Role</strong>${button.dataset.projectRole || unavailable}</span>
          <span class="grid gap-[var(--space-2)] bg-surface p-[var(--space-4)] text-fg-2"><strong class="font-mono text-[var(--text-xs)] uppercase tracking-[var(--tracking-mono)] text-muted">Team</strong>${button.dataset.projectTeam || unavailable}</span>
          <span class="grid gap-[var(--space-2)] bg-surface p-[var(--space-4)] text-fg-2"><strong class="font-mono text-[var(--text-xs)] uppercase tracking-[var(--tracking-mono)] text-muted">Work type</strong>${button.dataset.projectWorkType || unavailable}</span>
        `;
    }
    if (projectHero) {
      const imageSrc = button.dataset.projectImageSrc;
      projectHero.innerHTML = imageSrc
        ? `<figure class="m-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface"><img class="block aspect-[16/9] w-full object-contain" src="${imageSrc}" alt="${button.dataset.projectImageAlt || ''}" /><figcaption class="border-t border-border px-[var(--space-4)] py-[var(--space-3)] font-mono text-[var(--text-xs)] uppercase tracking-[var(--tracking-mono)] text-muted">${button.dataset.projectImageCaption || 'Shareable project capture.'}</figcaption></figure>`
        : '';
      projectHero.hidden = !imageSrc;
    }
    if (projectCopy) {
      const details = (button.dataset.projectDetails || '').split('\n\n').filter(Boolean);
      const caseStudy = JSON.parse(button.dataset.projectCaseStudy || '{}') as Record<
        string,
        string
      >;
      const projectLink =
        button.dataset.projectLinkHref && button.dataset.projectLinkLabel
          ? { href: button.dataset.projectLinkHref, label: button.dataset.projectLinkLabel }
          : undefined;
      const value = (key: string, fallback: string) => caseStudy[key]?.trim() || fallback;
      const section = (label: string, content: string) =>
        `<section class="grid gap-[var(--space-2)] border-t border-border pt-[var(--space-4)]"><h3 class="m-0 font-mono text-[var(--text-xs)] uppercase tracking-[var(--tracking-mono)] text-muted">${label}</h3><p class="m-0 max-w-[65ch] text-fg-2">${content || unavailable}</p></section>`;
      const linkSection = (label: string) =>
        `<section class="grid gap-[var(--space-2)] border-t border-border pt-[var(--space-4)]"><h3 class="m-0 font-mono text-[var(--text-xs)] uppercase tracking-[var(--tracking-mono)] text-muted">${label}</h3><a class="inline-flex w-fit items-center gap-[var(--space-2)] font-mono text-[var(--text-xs)] uppercase tracking-[var(--tracking-mono)] text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent focus-visible:outline-[var(--focus-ring)]" href="${projectLink?.href}" target="_blank" rel="noreferrer">${projectLink?.label}<span aria-hidden="true">↗</span></a></section>`;
      const content: Record<string, string | undefined> = {
        overview: value('overview', details[1] || details[0] || unavailable),
        problem: caseStudy.problem?.trim(),
        responsibilities: value('responsibilities', button.dataset.projectRole || unavailable),
        approach: value('approach', button.dataset.projectNote || unavailable),
        technical: value('technical', button.dataset.projectStack || unavailable),
        constraints: caseStudy.constraints?.trim(),
        comparison: caseStudy.comparison?.trim(),
        results: button.dataset.projectOutcome || unavailable,
        features: caseStudy.features?.trim(),
        next: caseStudy.next?.trim(),
        disclosure: button.dataset.projectDisclosure || unavailable,
      };
      const sections = JSON.parse(button.dataset.projectSections || '[]') as Array<{
        key: string;
        label: string;
      }>;
      projectCopy.innerHTML = sections
        .filter(({ key }) => (key === 'links' ? Boolean(projectLink) : Boolean(content[key])))
        .map(({ key, label }) =>
          key === 'links' ? linkSection(label) : section(label, content[key] as string),
        )
        .join('');
    }
    openDialog(projectDialog);
  };

  removeProjectDialogListener?.();
  const handleProjectOpen = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest<HTMLElement>('[data-project-open]');
    if (button) {
      openProject(button);
      return;
    }
    const step = target.closest<HTMLElement>('[data-project-step]');
    if (!step || !projectDialog) return;
    const projects = Array.from(document.querySelectorAll<HTMLElement>('[data-project-open]'));
    const activeIndex = Number(projectDialog.dataset.activeProjectIndex || 0);
    const direction = step.dataset.projectStep === 'next' ? 1 : -1;
    const nextProject = projects[(activeIndex + direction + projects.length) % projects.length];
    if (!nextProject) return;

    gsap.fromTo(
      step,
      { scale: 0.9, x: direction * -4 },
      { scale: 1, x: 0, duration: 0.28, ease: 'back.out(2)', overwrite: 'auto' },
    );
    const panels = [projectTitle, projectHero, projectMeta, projectCopy].filter(
      Boolean,
    ) as HTMLElement[];
    const state = Flip.getState(panels);
    openProject(nextProject);
    Flip.from(state, { duration: 0.38, ease: 'power3.out', absolute: false, nested: true });
    gsap.fromTo(
      panels,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.32, ease: 'power3.out', stagger: 0.035, overwrite: 'auto' },
    );
  };
  document.addEventListener('click', handleProjectOpen);
  removeProjectDialogListener = () => document.removeEventListener('click', handleProjectOpen);

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
        if (pdfEmpty)
          pdfEmpty.textContent =
            'The resume file could not be loaded. Open it in a new tab instead.';
        if (pdfDialog) pdfDialog.dataset.pdfState = 'missing';
      }
      openDialog(pdfDialog);
    });
  });

  document.querySelectorAll<HTMLElement>('[data-modal-close]').forEach((button) => {
    if (button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.addEventListener('click', () =>
      closeDialog(button.closest<HTMLDialogElement>('dialog')),
    );
  });
}
