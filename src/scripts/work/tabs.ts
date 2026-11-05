import { transitionWithCurrentWeather } from '../weather/controls';

type WorkSection = 'projects' | 'experience';
export function mountWorkTabs(root: HTMLElement) {
  const tabs = [...root.querySelectorAll<HTMLAnchorElement>('[data-work-tab]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-work-panel]')];
  const scroller = root.querySelector<HTMLElement>('.work-scroll')!;
  const body = root.querySelector<HTMLElement>('.work-body')!;
  const positions = new Map<WorkSection, number>();
  let active: WorkSection = 'projects';
  let desired: WorkSection = active;
  let revision = 0;
  const events = new AbortController();
  const sectionForHash = (): WorkSection | null => {
    const hash = location.hash.slice(1);
    if (hash === 'experience') return 'experience';
    if (hash === 'projects' || hash === 'work-start' || hash.startsWith('project-'))
      return 'projects';
    return null;
  };
  const revealAnchor = () => {
    const hash = location.hash.slice(1);
    if (!hash.startsWith('project-')) return;
    const anchor = document.getElementById(hash);
    if (anchor && root.contains(anchor)) anchor.scrollIntoView({ block: 'nearest' });
  };
  const show = (section: WorkSection) => {
    positions.set(active, scroller.scrollTop);
    active = section;
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.workPanel !== section;
    });
    tabs.forEach((tab) => {
      const selected = tab.dataset.workTab === section;
      tab.setAttribute('aria-selected', String(selected));
      tab.dataset.selected = String(selected);
      delete tab.dataset.pending;
      tab.tabIndex = selected ? 0 : -1;
    });
    scroller.scrollTop = positions.get(section) ?? 0;
    body.removeAttribute('aria-busy');
    revealAnchor();
  };
  const request = (section: WorkSection, pushHistory = true) => {
    if (section === desired) {
      revealAnchor();
      return;
    }
    desired = section;
    const current = ++revision;
    if (pushHistory) history.pushState(null, '', '#' + section);
    body.setAttribute('aria-busy', 'true');
    tabs.forEach((tab) => {
      tab.dataset.pending = String(tab.dataset.workTab === section);
    });
    transitionWithCurrentWeather(() => {
      if (!events.signal.aborted && current === revision) show(section);
    });
  };
  root.querySelector('[data-work-tabs]')?.setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        request(tab.dataset.workTab as WorkSection);
      },
      { signal: events.signal },
    );
    tab.addEventListener(
      'keydown',
      (event) => {
        if (event.key === ' ') {
          event.preventDefault();
          tab.click();
          return;
        }
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        tabs.forEach((item, i) => {
          item.tabIndex = i === next ? 0 : -1;
        });
        tabs[next].focus();
      },
      { signal: events.signal },
    );
  });
  panels.forEach((panel) => {
    panel.setAttribute('role', 'tabpanel');
    panel.tabIndex = 0;
  });
  const restore = () => {
    const section = sectionForHash();
    if (section) request(section, false);
  };
  window.addEventListener('popstate', restore, { signal: events.signal });
  window.addEventListener('hashchange', restore, { signal: events.signal });
  desired = sectionForHash() ?? 'projects';
  show(desired);
  document.addEventListener('astro:before-swap', () => events.abort(), {
    once: true,
    signal: events.signal,
  });
}
