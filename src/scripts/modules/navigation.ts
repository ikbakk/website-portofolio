import { scrollToElement } from './core';

let cleanScrollCleanup: (() => void) | undefined;

export function initCleanScrollNavigation() {
  cleanScrollCleanup?.();
  const controller = new AbortController();
  const signal = controller.signal;

  document.addEventListener(
    'click',
    (event) => {
      const trigger = (event.target as Element | null)?.closest<HTMLElement>('[data-scroll-target]');
      if (!trigger) return;
      const targetId = trigger.dataset.scrollTarget;
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      scrollToElement(target);
      if (trigger instanceof HTMLButtonElement) trigger.blur();
    },
    { signal },
  );

  cleanScrollCleanup = () => controller.abort();
}
