# P1 preflight — verified against branch source on 2026-11-03

## Read-only audit

- `src/pages/index.astro` currently has the three-column J. Mancheta experiment, **but** its right column is `Right now / Toolbox / Elsewhere` rather than the frozen `Focus / Playground / GitHub Activity`. Center also says `Project archive` rather than `Selected Works`, and the Tech Stack strip is missing. This is **P2 implementation work**, not a P1 documentation bug.
- `src/layouts/BaseLayout.astro` still mounts Celestial background images, header, navigation, opening effect, footer, and controller for the homepage. **P2 must explicitly decouple the homepage from these** while retaining working case-study routes. Do not just overlay new CSS on top of the old game-screen layout.
- `src/styles/celestial.css` contains extensive legacy selectors. Preserve for legacy routes until the new layout is isolated. New weather tokens are intentionally not imported.
- `src/data/archive.ts` uses existing project records and truthful stage labels. Do not replace its project data with the demo titles, metrics or checklist shown in the mockup.
- `public/projects/` currently has `sungkargroup.webp` and `ward-monitor-dashboard.webp` only. Beaconnect, Rentalin and Drama Stream screenshots shown in the mockup are not yet available as verified repository assets.
- The current black/cream/orange logo in `public/logo-mark.svg` differs from the green monogram in the frozen design. Brand identity approval is still required.
- All three original reference images are committed byte-for-byte in [docs/design/references/](references/) with SHA-256 checks recorded in [P1-REFERENCE-MANIFEST.md](P1-REFERENCE-MANIFEST.md). GitHub Actions [run 41663423056](https://github.com/ikbakk/website-portofolio/actions/runs/41663423056) passed strict reference validation.

## Tokens and ornaments — technical checks

- `src/theme/weather.config.ts` declares exactly Normal, Cryo, Electro and references only the three approved `horizon.svg` assets under `public/weather/`.
- CSS variables cover background, surface, border, grid, accent, text, focus and ornament for each weather mode.
- Electro has dark `color-scheme` and light foreground. Cryo and Normal use a darker semantic `--weather-primary-ink` for small text rather than the bright accent color.
- All SVGs have a `viewBox` and static vector elements. The owner selected the three `horizon.svg` variants as the active **bottom-edge** decorative direction; `edge.svg` and `corner.svg` are older unapproved experiments and have been removed from the active config/tokens.
- **No build/test run claimed**: this is a connector-side GitHub commit, not a checked-out and built site. The first P2 implementation commit must run Astro typecheck, build, format check, and browser screenshot comparison.

## Proposed P2 sequence, after explicit approval

1. Read all three now-committed original reference PNGs and prepare matched-viewport screenshot baselines.
2. Create a homepage-specific shell isolated from Celestial global/layout behavior; retain legacy case routes.
3. Match macro geometry in Normal at the reference viewport before adding any decoration.
4. Populate truthful project content and actual screenshots; document missing assets.
5. Apply theme tokens and restrained ornaments without shifting the composition.
6. Capture desktop/mobile and all three themes; iterate until owner approves. **Do not deploy or merge.**

## Approval state

- Frozen concept: approved.
- P1 documentation and starter tokens: committed.
- Exact mockup PNGs in GitHub: **done; strict validation succeeded**.
- SVG family reviewed for thematic correspondence: **done**. True in-browser placement/scale review: **pending P2**.
- P1 design direction: **locked**, see [decision record](P1-SIGNOFF.md). The binary-reference gate is complete. Remaining P2 prerequisites: owner authorization and specific logo treatment review. Browser fidelity verification is planned within P2.
