import { gsap, reducedMotion } from './core';

export function initDialogs() {
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

  document.querySelectorAll<HTMLElement>('[data-project-open]').forEach((button) => {
    if (button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.addEventListener('click', () => {
      if (projectKicker)
        projectKicker.textContent = `${button.dataset.projectNumber} / ${button.dataset.projectYear}`;
      if (projectTitle) projectTitle.textContent = button.dataset.projectTitle || 'Project detail';
      if (projectMeta) {
        projectMeta.innerHTML = `
          <span class="grid gap-[var(--space-2)] bg-surface p-[var(--space-4)] text-fg-2"><strong class="font-mono text-[var(--text-xs)] uppercase tracking-[var(--tracking-mono)] text-muted">Role</strong>${button.dataset.projectRole || ''}</span>
          <span class="grid gap-[var(--space-2)] bg-surface p-[var(--space-4)] text-fg-2"><strong class="font-mono text-[var(--text-xs)] uppercase tracking-[var(--tracking-mono)] text-muted">Stack</strong>${button.dataset.projectStack || ''}</span>
          <span class="grid gap-[var(--space-2)] bg-surface p-[var(--space-4)] text-fg-2"><strong class="font-mono text-[var(--text-xs)] uppercase tracking-[var(--tracking-mono)] text-muted">Outcome</strong>${button.dataset.projectOutcome || ''}</span>
        `;
      }
      if (projectCopy) {
        const paragraphs = (button.dataset.projectDetails || '').split('\n\n').filter(Boolean);
        projectCopy.innerHTML =
          paragraphs
            .map((text, index) =>
              index === 0
                ? `<p class="m-0 rounded-[var(--radius-md)] border border-border bg-surface p-[var(--space-4)] font-mono text-[var(--text-xs)] uppercase tracking-[var(--tracking-mono)] text-muted">${text}</p>`
                : `<p class="m-0 text-fg-2">${text}</p>`,
            )
            .join('') +
          `<footer class="mt-[var(--space-2)] border-t border-border pt-[var(--space-4)] font-mono text-[var(--text-xs)] uppercase tracking-[var(--tracking-mono)] text-muted">${button.dataset.projectNote || ''}</footer>`;
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
        if (pdfEmpty)
          pdfEmpty.textContent =
            'No PDF is available yet. Add resume.pdf to the public folder, then this viewer will open it in place.';
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
