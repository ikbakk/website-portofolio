# P1 decision log — frozen design and theme ornaments

## Confirmed by the owner (2026-11-03)

1. The high-resolution frozen **Soft Grid, Paper Landscape + Pixel Accents** mockup is the visual authority. The three-column composition must not drift.
2. Weather modes: **Normal / Green Meadow** default, **Cryo / Blizzard**, **Electro / Storm**. Same layout across modes.
3. **Approved visual assets:** three new `public/weather/{normal,cryo,electro}/horizon.svg` files (owner response: "sata suka svg baru itu niceee"). This is approval for the visual direction/assets, **not** approval of final browser placement, animated effects, or P1 as a whole.
4. Do not design custom SVG project screenshots or custom pixel-playground visuals in P1. Use real project screenshots and existing icon libraries; interactive playground/library choice is deferred.
5. Keep the page background minimal. Bottom-edge landscape is narrow, subordinate to content. No full-height scenic backdrop.
6. Motion, weather particles, cursor effects, GSAP, and smooth-scrolling are deferred to P4.

## Open decisions (do not guess)

- **Logo:** existing `public/logo-mark.svg` is black/cream/orange, whereas the frozen mockup depicts a green symbol. Decide whether to use the existing identity recolored, or supply the approved green mark. Do not generate a third design unprompted.
- **Profile image:** source portrait/illustration or a deliberate non-personal fallback must be accepted before shipping.
- **Other SVGs:** `edge.svg` and `corner.svg` were experiments, **not approved**. They can be omitted in P2 if the horizon already supplies the thematic decoration.
- **Reference PNGs:** the three original assets are present in a handoff ZIP but not committed to the GitHub branch; transfer them, preserve their checksums, and use the strict validator.

## Release gate

P1 is **not fully locked** until the reference images are checked into GitHub, logo choice is resolved, and the owner signs off. P2 may not begin on this decision log alone.
