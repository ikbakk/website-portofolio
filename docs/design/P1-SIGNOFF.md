# P1 decision record — Soft Grid / Weather Themes

Date: 2026-11-03

## Agreed / frozen

- Three-column desktop composition: **left identity/profile**, **middle Featured Project → Selected Works → Tech Stack**, **right Focus → Playground → GitHub Activity**. No standalone hero, no relocation of content between themes.
- Theme variants: Normal (Green Meadow), Cryo (Blizzard), Electro (Storm).
- Weather changes **presentation**. It must not reorder cards or change factual content. Normal is default.
- Footer-only small SVG horizons are the approved decorative direction, with corresponding green, ice and violet visual treatment.
- Actual screenshots for project artwork, reusable icon libraries for UI, and curated external interactions for Playground/animation in later stages. Do not design custom SVG screenshots or a custom pixel game in P1.
- No unverified activity counts, invented project screenshots, fake public statuses, or design library dependencies inserted merely to reproduce demo content.
- Existing `public/logo-mark.svg` is not a match for the green mark in the master. Preserve current identity in source until explicit logo treatment is chosen.
- `edge.svg` / `corner.svg` are experimental leftovers, not approved active ornaments.

## Technical P1 artifact state

- `src/styles/weather-themes.tokens.css` and `src/theme/weather.config.ts` are isolated and not imported into the active Astro layout.
- Three approved `horizon.svg` files are committed; no runtime animations or dependencies were introduced.
- All three **exact original PNGs** are committed in `docs/design/references/` and validated against approved SHA-256 values in [GitHub Actions run 41663423056](https://github.com/ikbakk/website-portofolio/actions/runs/41663423056). No manual transfer is required.
- P1 SVG shape review: layouts/ornament motifs match the low-edge direction of frozen mockups. A browser-based overlay/scale review is still required in P2.
- Existing Celestial shell remains. P2 must isolate homepage shell first, preserving case-study pages.

## Lock and authorization

**P1 design decisions locked; reference image import complete and verified.** Browser layout/horizon placement is the first P2 visual QA gate, not a claimed P1 implementation result. The final logo treatment still needs confirmation because the earlier logo asset differs from the frozen mockup.

**P2 code changes are not authorized by this record.** The strict reference check already passed. Receive explicit user approval before P2; keep all changes in the feature branch. Do not create PR, merge, push to main, or deploy without permission.
