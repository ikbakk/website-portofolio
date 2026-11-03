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
- Three **exact original PNGs** are checksummed and available in the conversation archive `portfolio-p1-frozen-reference-pack.zip`, but **their bytes are not in this repository yet**. The GitHub chat connector cannot read local binary files. [Import instructions](references/README.md), [import helper](../../scripts/import-p1-references.sh).
- P1 SVG shape review: layouts/ornament motifs match the low-edge direction of frozen mockups. A browser-based overlay/scale review is still required in P2.
- Existing Celestial shell remains. P2 must isolate homepage shell first, preserving case-study pages.

## Lock and authorization

**Design decisions locked / P1 content frozen.** Only missing source-binary import and in-browser visual verification remain operational prerequisites; this record does not claim those are complete.

**P2 code changes are not authorized by this record.** Before P2, original PNG hashes must pass `node scripts/validate-weather-p1.mjs --strict`. After images are imported, receive explicit user approval to start P2. Keep changes in the feature branch; don't create PR, merge, push to main or deploy without permission.
