# Frozen mockup fidelity gate (P1 -> P2)

The owner approved a specific three-theme concept in conversation. This checklist is the **review contract**, not permission to implement P2.

## Before P2 can begin

- [ ] The three original approved high-resolution mockup files are committed under `docs/design/references/`. Do not use cropped, resized, newly generated or approximated replacements as the only source of truth.
- [x] Owner approved `horizon.svg` visual direction for all three themes (2026-11-03). These are the primary decorative assets.
- [ ] Verify their actual placement in browser against the frozen mockup; `edge.svg` and `corner.svg` remain optional, unapproved prototypes. Remove rather than embellish if not needed.
- [ ] Brand logo source and relationship to the existing black/orange `public/logo-mark.svg` are confirmed.
- [ ] P1 art/token/documentation changes receive an explicit owner sign-off.
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