# Iqbal / Soft Grid portfolio

Muhammad Iqbal Firdaus's frontend and mobile engineering portfolio. The homepage uses a paper-inspired three-column layout with Meadow, Cryo and Electro themes. Static project case studies retain their existing Celestial presentation.

## Run locally

Astro 7, Tailwind CSS 4, TypeScript 6 and GSAP. Use Node 22.12+ and Bun; no API keys are required.

```sh
bun install --frozen-lockfile
bun run dev
```

| Command | Purpose |
| --- | --- |
| `bun run check` | Astro and TypeScript diagnostics |
| `bun run format:check` | Source, script and test formatting |
| `bun run build` | Refresh verified GitHub data and export seven static pages to `dist/` |
| `bun run preview` | Serve the production export |
| `bun run audit:build` | Audit generated local links, fragments, assets, metadata and initial JS sizes |
| `bun run test:build` | Build-audit regression tests; run after building |
| `bun run test:widgets` | Pure game/data rules and GitHub cache failure handling |
| `bun run test` | Playwright production-browser suite |
| `bun run verify` | Widget tests, diagnostics, formatting, build, artifact tests and browser suite |
| `bun run data:github` | Refresh the build-cached public GitHub contribution snapshot |

For local browser tests, install Chromium once with `bunx playwright install chromium`. In managed Work sessions, browser QA uses the supported preview/browser workflow instead of launching this local Playwright server. Test discovery alone is not an executed browser-suite pass.

## Routes and behavior

- `/`: identity/about/navigation on the left, work and experience in the center, Focus/Playground/GitHub on the right.
- Desktop widths above 1100px use **30 / 40 / 30** tracks and only the center scrolls. Smaller viewports use document scrolling.
- `/#profile`, `/#projects`, `/#experience`, `/#about` and `/#project-{id}` are real anchor targets. Contact opens email.
- `/projects/{id}/`: Courtside, Sungkar Group, Beaconnect, CV Builder and Ward Monitor. Return links use native navigation across the homepage/case-study layout boundary.
- `/404.html`: useful not-found content with `noindex`; the production host must serve unknown paths with a 404 status.
- `/resume.pdf`: ordinary PDF download.

Weather transitions run only on user selection. Their GSAP engine is fetched on the first animated theme change. Reduced motion can switch colors without downloading it; a failed animation chunk falls back to theme selection. A new choice cancels the previous sequence. The visual direction and **30/40/30** layout remain the same in each theme.

The three local mini-games are a timing rally with Calm mode, F1 reaction lights and element matching. Scores are local to the open page. The Focus meter reflects curated project milestones, not visitor task tracking.

GitHub activity is real public data for `ikbakk`, validated and cached at build time. The updater reuses a recent valid snapshot, preserves the last good one on a failed refresh and shows an unavailable state if none exists. A static deployment needs rebuilding to update the displayed date; there is no scheduled refresh or browser token.

Meaningful content, project links, resume and contact are rendered without JavaScript. Missing portrait/identity art and application screenshots remain explicit gaps, not fabricated project evidence.

## Source map

- `src/components/home/`, `src/components/widgets/`: Soft Grid UI and themed controls.
- `src/layouts/HomeLayout.astro`: homepage metadata and lightweight enhancement entry.
- `src/scripts/weather/`: on-demand weather controller and bounded animation engine.
- `src/lib/`, `src/scripts/widgets/`: game rules, contribution validation and widget rendering.
- `src/styles/home.css`, `paper-controls.css`, `widgets.css`, `weather-transition.css`: current homepage styles.
- `src/theme/weather.config.ts`, `src/styles/weather-themes.tokens.css`: theme definitions.
- `src/data/projects.ts`, `archive.ts`, `experience.ts`: factual content and stable route IDs.
- `src/content/projects/`: case-study prose.
- `src/components/celestial/`, `src/scripts/celestial/`: retained case-study UI and motion.
- `public/weather/`, `public/licenses/`: sourced elemental emblems and original paper ornaments with provenance.

## Verification and release

See [PRODUCT.md](PRODUCT.md), [the active design contract](docs/design/P1-SOFT-GRID.md), [P3](docs/design/P3-VERIFICATION.md), [weather transitions](docs/design/P4-WEATHER-TRANSITIONS.md) and [P5 readiness](docs/design/P5-VERIFICATION.md). Historical Celestial documents remain references for the existing case studies.

The configured public origin is `https://ikbak.vercel.app`, consistently used by canonical, sitemap and social metadata. `vercel.json` selects Astro, `bun run build` and `dist/`. No merge or deployment is implied by local verification or a feature-branch commit.
