# Frozen mockup fidelity gate (P1 -> P2)

The owner approved a specific three-theme concept in conversation. Original reference files have now been identified and checksummed; see [P1-REFERENCE-MANIFEST.md](P1-REFERENCE-MANIFEST.md). They have now been copied into GitHub and verified, including the larger Normal master restored by an isolated workflow. This checklist is the **review contract**, not permission to implement P2.

## Before P2 can begin

- [x] All three original high-resolution mockups are committed under `docs/design/references/`, with exact SHA-256 and Git blob SHA verified.
- [x] Strict reference-validation script passed in GitHub Actions on 2026-11-03 (run 41663423056).
- [x] Owner approved `horizon.svg` visual direction for all three themes (2026-11-03). These are the primary decorative assets.
- [x] Reviewed SVG family and limited active art to `horizon.svg`. The experimental `edge.svg` and `corner.svg` must not be consumed by P2.
- [ ] Verify horizon placement and scaling in browser against native frozen mockup screenshots during P2 visual regression; do not claim this was performed in P1.
- [ ] Brand logo source and relationship to the existing black/orange `public/logo-mark.svg` are confirmed.
- [x] P1 design and asset-sourcing direction approved; see [P1-SIGNOFF.md](P1-SIGNOFF.md). This does not waive missing source PNGs, logo treatment decision, or P2 approval.
- [ ] If adding dependencies in P2, list package, version, license, weight and reason for each before installing.

## P2 screenshot comparisons (future work, not done yet)

Use the same viewport/resolution, scroll position, font load state, and theme for both reference and browser screenshot. Capture desktop at **1536 x 1024** initially plus at least one narrower desktop and mobile viewport; if source mockup resolution differs, use the native reference resolution too.

Audit in priority order:
1. **Macro geometry:** sidebar/center/right placement, column proportions, gaps, panel alignment, project size, vertical rhythm.
2. **Information hierarchy:** left is personal, middle begins with Featured Project (no hero), right is Focus -> Playground -> GitHub Activity at the bottom.
3. **Visual styling:** type weight, line breaks, neutral surface, palette, border, radii, paper depth, subtle grid.
4. **Real imagery:** approved/verified screenshots; no fabricated widgets, fake contribution counts or progress.
5. **Ornaments:** unobtrusive edges/corners, not large landscapes outside panels. Three themes must remain compositionally identical.
6. **Behavioral robustness:** touch, keyboard, overflow, 320px min width, focus visibility, readable contrast and reduced-motion preferences.

When an implementation differs, record issue + screenshot evidence + adjustment. **No "close enough" sign-off on a different composition.** Keep P2 a separately approved stage and do not merge to main or deploy.

## Explicitly deferred

P3: Focus state, Playground mechanics, GitHub data and widgets.
P4: rain/snow/lightning, cursor trail, page transitions, GSAP, Lenis, smooth scroll.
P5: performance and full regression suite.

An approved aesthetic does not imply that arbitrary demo counts, status, tasks or project stages are factual.