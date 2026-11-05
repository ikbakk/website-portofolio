import { isWeatherThemeId, type WeatherThemeId } from '../../theme/weather.config';
import type { createWeatherTransitions } from './transitions';

type ContentChange = () => void;
let contentTransition: ((commit: ContentChange) => void) | undefined;

/** Sections use the same lazy engine and overlay as the weather selector. */
export function transitionWithCurrentWeather(commit: ContentChange) {
  if (contentTransition) contentTransition(commit);
  else commit();
}

export function mountWeatherControls() {
  const html = document.documentElement;
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-set-weather]')];
  const events = new AbortController();
  let engine: ReturnType<typeof createWeatherTransitions>;
  let loading: Promise<ReturnType<typeof createWeatherTransitions>> | undefined;
  const initial = html.dataset.weather;
  let pendingTheme: WeatherThemeId = initial && isWeatherThemeId(initial) ? initial : 'normal';
  let pendingContent: ContentChange | undefined;
  let revision = 0;
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const select = (theme: WeatherThemeId) => {
    buttons.forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.setWeather === theme)),
    );
    try {
      sessionStorage.setItem('portfolio-weather', theme);
    } catch {
      /* optional preference */
    }
  };
  const flushContent = () => {
    const commit = pendingContent;
    pendingContent = undefined;
    commit?.();
  };
  const loadEngine = () =>
    (loading ??= import('./transitions')
      .then(({ createWeatherTransitions }) => {
        if (events.signal.aborted) return;
        engine = createWeatherTransitions();
        return engine;
      })
      .catch(() => {
        loading = undefined;
        return undefined;
      }));
  const choose = (theme: WeatherThemeId) => {
    const current = ++revision;
    pendingTheme = theme;
    select(theme);
    flushContent();
    if (engine) {
      engine.request(theme);
      return;
    }
    if (reduced() || document.hidden) {
      html.dataset.weather = theme;
      return;
    }
    if (!loading && theme === html.dataset.weather) return;
    void loadEngine().then((instance) => {
      if (events.signal.aborted || current !== revision) return;
      if (instance) instance.request(pendingTheme);
      else html.dataset.weather = pendingTheme;
    });
  };
  const transitionContent = (commit: ContentChange) => {
    const current = ++revision;
    pendingContent = commit;
    const finish = () => {
      if (pendingContent !== commit || events.signal.aborted) return;
      pendingContent = undefined;
      commit();
    };
    if (reduced() || document.hidden) {
      finish();
      return;
    }
    const run = (instance: ReturnType<typeof createWeatherTransitions>) => {
      if (events.signal.aborted || current !== revision) return;
      if (!instance) {
        finish();
        return;
      }
      instance.request(pendingTheme);
      instance.transitionContent(finish);
    };
    if (engine) run(engine);
    else void loadEngine().then(run);
  };
  contentTransition = transitionContent;
  select(pendingTheme);
  buttons.forEach((button) =>
    button.addEventListener(
      'click',
      () => {
        const theme = button.dataset.setWeather;
        if (theme && isWeatherThemeId(theme)) choose(theme);
      },
      { signal: events.signal },
    ),
  );
  document.addEventListener(
    'astro:before-swap',
    () => {
      events.abort();
      pendingContent = undefined;
      if (contentTransition === transitionContent) contentTransition = undefined;
      engine?.dispose();
    },
    { once: true, signal: events.signal },
  );
}
