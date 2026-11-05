import { isWeatherThemeId, type WeatherThemeId } from '../../theme/weather.config';
import type { createWeatherTransitions } from './transitions';

/** Keep GSAP and the weather engine out of the initial homepage download. */
export function mountWeatherControls() {
  const html = document.documentElement;
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-set-weather]')];
  const events = new AbortController();
  let engine: ReturnType<typeof createWeatherTransitions>;
  let loading: Promise<void> | undefined;
  let pending: WeatherThemeId = 'normal';
  const select = (theme: WeatherThemeId) =>
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.setWeather === theme));
    });
  buttons.forEach((button) =>
    button.addEventListener(
      'click',
      () => {
        const theme = button.dataset.setWeather;
        if (!theme || !isWeatherThemeId(theme)) return;
        pending = theme;
        select(theme);
        if (engine) {
          engine.request(theme);
          return;
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          html.dataset.weather = theme;
          return;
        }
        if (!loading && theme === html.dataset.weather) return;
        loading ??= import('./transitions')
          .then(({ createWeatherTransitions }) => {
            if (events.signal.aborted) return;
            engine = createWeatherTransitions();
            if (engine) engine.request(pending);
            else html.dataset.weather = pending;
          })
          .catch(() => {
            // Theme selection remains usable if the optional animation chunk cannot load.
            if (!events.signal.aborted) html.dataset.weather = pending;
            loading = undefined;
          });
      },
      { signal: events.signal },
    ),
  );
  document.addEventListener(
    'astro:before-swap',
    () => {
      events.abort();
      engine?.dispose();
    },
    { once: true, signal: events.signal },
  );
}
