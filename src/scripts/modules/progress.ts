let progressCleanup: (() => void) | undefined;

export function initProgress() {
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
