# P2 coding agent handoff (do NOT execute before approval)

## Read first
1. `docs/design/P1-SOFT-GRID.md`
2. `docs/design/references/README.md` and actual three PNG files after their hashes are verified
3. `docs/design/P1-ASSETS.md`, `P1-LIBRARIES.md`, `P1-FIDELITY-GATE.md`
4. `src/styles/weather-themes.tokens.css`, `src/theme/weather.config.ts`
5. The incumbent `src/pages/index.astro`, `src/layouts/BaseLayout.astro`, `src/styles/global.css` / `celestial.css`
6. `PRODUCT.md` and relevant frontend-design/impeccable skills already present in `.agents/skills/`

## Gate
**Stop unless P1 has explicit owner approval AND separate P2 execution approval.** Existing mockup direction approval does not approve final assets or authorize a redesign commit.

## Scope after approval

- Implement homepage as reusable Astro components styled with Tailwind 4 + semantic CSS tokens.
- Render the approved three columns, matching the high-resolution approved reference. Center starts directly with Featured Project, then Selected Works and Tech Stack. Left contains profile/about/socials. Right contains Focus, a reserved Playground and GitHub activity below.
- Use real project images already in `public/projects/`. Request/collect genuine assets for projects with missing screenshots; don't reconstruct fake apps from the mockup.
- Theme picker switches normal/cryo/electro **statically** (colors, ornaments, surface treatments). A `data-weather` attribute is one possible implementation. No animated weather, cursor trail or motion effects.
- Replace or isolate old Celestial page-specific layout/background/intro scripts for the new homepage, without breaking case-study routes or route metadata.
- Keep Focus and Playground visibly present but **non-fake**: e.g. clearly labeled preview, not fabricated task completion, accounts, or functional game UI. True behavior is P3.
- GitHub Activity must use real fetched data in P3; until then use a skeleton/empty UI clearly labelled as unconnected. No invented totals.
- Use a suitable icon library only if it can match the mockup. Validate each dependency/version/license prior to install.
- Provide screenshots at reference size and common device viewports, a comparison report, keyboard tests and accessibility basics.

## Explicitly forbidden in P2
Animations, ScrollTrigger, Lenis, weather simulation, cursor replacements, interactive games, production GitHub data integration, new deployment, main merge, and redesigning the frozen mockup to match a library.

## Required deliverables
Rendered screenshot evidence per theme, responsive screenshots, list of deliberate deviations (with reasons), build/check/test results, and a **separate owner approval** before P3/P4.