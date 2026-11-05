# P3 — functional widgets

Owner authorization: “Bagus, sekarang kita bisa masuk tahap selanjutnya” after the custom paper controls, 2026-11-04. Implemented on `ikbakk/inspire-portfolio-jmancheta-design`; no PR, merge or deployment.

## Result

- **Focus:** a curated, read-only portfolio roadmap in `src/data/focus.ts`, derived from completed theme/controls work, this widget implementation and the still-planned weather effects. Native meter calculates 2 of 3 milestones. These are project milestones, not invented personal habits or visitor-editable tasks.
- **GitHub:** verified public contribution data for `ikbakk`, covering 12 calendar weeks (84 slots, future dates empty). The snapshot through 4 November contains 342 contributions across 40 active days, with a best streak of 15 days **within the displayed interval**. Every displayed day, count and level is validated before replacing the cache; displayed statistics are calculated from those days. No token is shipped.
- **Playground:** three compact toys matching the existing interest tabs: badminton timing rally (plus non-timed Calm mode), F1 lights-out reaction test with early-start detection, and a six-card Genshin element matching game. Kontra supplies the canvas game loop; the DOM/controller and pure game rules are separated. Local scores last only while the page is open. No analytics, remote scores or account state.
- **Controls:** existing themed PaperControl component handles tabs, actions and cards; keyboard tab navigation follows Arrow keys/Home/End. Status messages announce results. Reduced motion defaults to Calm mode. Timers and rally loops stop when switching games, hiding/leaving the page, losing focus or leaving the viewport. Gameplay starts explicitly.

## Data operation

`npm run data:github` refreshes `public/data/github-activity.json`. Production build runs the same updater before Astro, reusing a verified snapshot less than one hour old. Source: [github-contributions-api](https://github.com/grubersjoe/github-contributions-api), public endpoint documented in `P1-LIBRARIES.md`. This is **build-cached**, not real-time browser fetching. A static deployment needs a rebuild to update the visible data. On timeout/network/validation failure, preserve the last verified snapshot and show its date; if no verified snapshot exists, show an unavailable message and the profile link. Snapshots older than 24 hours at build time receive a cached label. The displayed date remains visible as a static build ages.

## Verification

- `npm run test:widgets`: **9 passing** Node tests covering actual/future calendar cells, computed totals/streaks, missing/duplicate/invalid days, corrupted cached data, rally scoring/misses/Calm mode, reaction early starts/timing, memory rules/completion, and real updater execution under simulated network failure (last-good bytes preserved; first-run unavailable fallback).
- `npm run check`: **zero errors, warnings or hints**.
- `npm run build`: successful static export of all seven pages; temporary viewport review route removed.
- Changed source/config files pass Prettier. Whole-repository `format:check` still reports pre-existing formatting in `src/styles/celestial.css`, `src/styles/weather-themes.tokens.css` and `scripts/validate-weather-p1.mjs`; no formatting-only edits made to those files.
- Managed browser QA: rally return in Calm mode, F1 jump start, actual elapsed reaction result, keyboard ArrowRight between games, card reveal/mismatch, theme switching and cancellation/reset of pending F1 timer on game change.
- Desktop 1363 × 936: tracks **376 / 501 / 376 px** (30 / 40 / 30); document client/scroll height **936 / 936**. Center scroll region **828 / 1174 px**. Side panels do not scroll.
- Short desktop 1363 × 720: document client/scroll height **720 / 720**; Focus **153 / 153**, Playground **211 / 211**, activity **220 / 220 px** client/scroll heights.
- Phone 320 × 800 iframe: document client/scroll widths both **305 px** after scrollbar reservation. Focus, Playground and activity client/scroll heights equal **180**, **277**, **301 px** respectively. Normal document scrolling is retained on mobile.
- Existing legacy Playwright suite was not run here: this environment uses managed-browser QA rather than launching another browser/server. Node tests are excluded from Playwright discovery and included in `verify` separately.

## Evidence and remaining work

[Meadow](verification/p3/normal.jpg), [Cryo](verification/p3/cryo.jpg), [Electro](verification/p3/electro.jpg), [short desktop and phone](verification/p3/responsive.jpg). The responsive evidence uses real iframe viewport dimensions, not a simulated CSS breakpoint. Dev toolbar visible at the bottom is preview-only.

P4 weather/ambient effects and page-level motion remain deferred. Original green identity mark, portrait artwork, Playground character illustration, and verified Beaconnect/CV Builder screenshots are still missing. This P3 behavior update does not resolve those artwork gaps or assert an exact mockup match. Existing approved pixel/paper ornaments, elemental selector, center fades and 30/40/30 desktop layout are retained.
