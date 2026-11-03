# P1 asset manifest — custom only where it adds theme identity

## Existing verified repository assets

- `public/projects/sungkargroup.webp`: real project image candidate. Verify screenshot content and caption at render time.
- `public/projects/ward-monitor-dashboard.webp`: prototype screenshot; never present as production data.
- `public/resume.pdf`: existing resume.
- `public/logo-mark.svg`: current black/cream/orange modular mark, **not** the green symbol shown in the mockup. Do not recolor or replace without review.
- No verified Beaconnect, Rentalin, or drama-stream screenshots were observed in `public/projects/` at P1 audit time. Do not fabricate app screens; use labelled truthful placeholders until actual image files are supplied.

## New, reviewed-as-concept SVG asset slots

| Location | Intended use | Constraint |
| --- | --- | --- |
| `public/weather/normal/edge.svg` | Green layered papercut edge | Place inside or just behind a panel, max subtle visual footprint |
| `public/weather/cryo/edge.svg` | Snowdrift version, same geometry | No animated snowfall in P1/P2 |
| `public/weather/electro/edge.svg` | Violet layered paper edge | No lightning flash in P1/P2 |
| `public/weather/*/corner.svg` | Small theme-specific leaf/crystal/spark | Decorative only, hide from accessibility tree in UI |
| `src/styles/weather-themes.tokens.css` | Static semantic tokens | Not imported until P2 approval |
| `src/theme/weather.config.ts` | Typed theme identifiers and asset paths | Not connected until P2 approval |

The edge SVG files intentionally share the same geometry, so switching themes does not move layout. These are **P1 prototypes** and must be compared with the frozen mockup before any final asset approval.

## Sourcing rules

1. Use actual project screenshots for real work and meaningful alt text. Maintain their aspect ratios using CSS `object-fit`; never distort, invent UIs or recolor screenshots to pretend the app is themed.
2. Prefer `@lucide/astro` for general interface icons if P2 confirms suitability. Existing custom logo and branded technology icons are separate concerns.
3. Playground visual/game logic is postponed to P3; research lightweight open-source interactive options then. No custom pixel character SVG is required in P1.
4. Animated component patterns may be borrowed only after checking license, package footprint, Astro compatibility, accessibility, and theme-ability. Motion belongs to P4.
5. Record for every third-party asset: canonical URL, license, attribution rules, whether modified, and saved version/commit. Do not scrape or reuse copyrighted game assets.

## Anti-drift

No SVG depicting full project screenshots, no gigantic horizon background, no decorating every card with the same ornament. One subtle thematic detail per relevant region is enough.
## Additional horizon-only SVG prototypes

Three theme-specific `horizon.svg` files are provided in `public/weather/{theme}/`. They are intentionally restricted to the bottom edge:
- Normal: green rolling paper hills and a compact leaf sprig.
- Cryo: shallow snowdrifts and a crystal cluster.
- Electro: twilight hills and tiny flowering branches.

These are **new review candidates**, not final-approved decorative artwork. They deliberately differ by theme as the frozen mockups do, while leaving the content columns unchanged. They should be rendered in a small bottom strip rather than as a full-viewport scene.

Use `--weather-horizon` in a background-only decorative layer after P2 approval. Keep that layer `aria-hidden`, and do not obscure navigation, hit targets or text.