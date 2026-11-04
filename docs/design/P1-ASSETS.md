# P1 asset manifest — confirmed design direction

## Existing verified repository assets

- `public/projects/sungkargroup.webp`: real project screenshot candidate, verify caption and crop in P2.
- `public/projects/ward-monitor-dashboard.webp`: prototype screenshot; do not suggest live production metrics.
- `public/resume.pdf`: existing resume.
- `public/logo-mark.svg`: black/cream/orange logo from earlier version. **Not** the approved green logo artwork shown in the frozen normal mockup. Do not replace without specific owner decision.
- Missing verified screenshots: Beaconnect, Rentalin and Drama Stream mockup illustrations are **not** shippable as pretend evidence. Use actual images when provided or accurately labelled placeholders.

## Approved decorative SVG family: bottom horizons only

| Normal / Green Meadow | Cryo / Blizzard | Electro / Storm |
| --- | --- | --- |
| `public/weather/normal/horizon.svg` | `public/weather/cryo/horizon.svg` | `public/weather/electro/horizon.svg` |
| Low green paper hills and short leaf sprig near footer | Shallow snowdrifts and small frost crystals at lower left | Layered violet hills with small flowering branches |

**Approved 2026-11-03:** the owner accepted the three `horizon.svg` illustrations as the *visual direction*. This does **not** prove pixel-level placement in an Astro browser capture. Apply them as a restrained decorative strip at the bottom behind content, not over cards or click targets.

The typed theme configuration `src/theme/weather.config.ts` exposes only `horizon`. `--weather-horizon` is the canonical CSS asset token and `--weather-ornament` is an alias to the same approved horizon, for compatibility during P2. Neither is imported by the current homepage yet.

## Explicitly excluded from P2 until new approval

- `public/weather/{normal,cryo,electro}/{edge,corner}.svg`: these six earlier experimental SVGs remain in the repository solely as historical prototypes. **Do not apply or consume them** in the P2 layout.
- Any custom SVG representation of the project cards, Playground, or a full-screen illustrated backdrop.
- Decorative icons that can be sourced from a vetted icon set.

## Sourcing rules

1. Actual project screenshots/images come from the project's real UI. Respect ratio and legibility with `object-fit`. Don't present conceptual artwork as deployed product screenshots.
2. Prefer a consistent vetted icon library for normal UI symbols; verify Astro API and license before adding a dependency.
3. Playground is a placeholder until P3. Its interactive library/mini-game is selected by fitting the reserved dimensions, not by changing the frozen layout.
4. GSAP effects and optional component-animation sources are P4 only. Respect reduced motion.
5. Record canonical source URL, license, attribution requirements, version and local modifications for every third-party asset.

## Layout constraints

- Weather horizon art does not affect the three-column DOM order, panel heights, content padding or theme switch geometry.
- Do not duplicate the landscape on every panel.
- Keep ornaments non-interactive and outside screen-reader output.
- Overlay, crop, scale and stacking order must be reviewed at native reference sizes and actual browser widths. No browser verification has happened in P1.


## Owner-requested additions — 2026-11-04

- `public/weather/elements/{dendro,cryo,electro}.svg`: static Genshin elemental emblems ported from the MIT-licensed `genshin-icon` 1.0.20-alpha2 path definitions; upstream notice is in `public/licenses/genshin-icons-MIT.txt`. These are the explicit exception requested by the owner, not new portfolio brand marks. Provenance/modifications are recorded in `public/weather/elements/README.md`.
- `public/weather/{normal,cryo,electro}/column-foot.svg`: original, small layered paper landscapes with pixel accents, leaves / ice / violet flower branches.
- `public/weather/{normal,cryo,electro}/column-corner.svg`: original folded-paper details with leaf / crystal / lightning motifs and pixel flecks.
- `ThemeOrnament.astro` renders reusable decorative, screen-reader-hidden, pointer-transparent wrappers. Theme variables choose each original SVG family, keeping layout and content independent of the art.

The owner’s latest request supersedes the previous horizon-only restriction for the new column assets. Historical `edge.svg` and `corner.svg` remain unused. No generated bitmap artwork or fake project/game screenshots were introduced.
