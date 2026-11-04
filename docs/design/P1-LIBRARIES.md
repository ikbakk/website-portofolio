# P1 research log — skill and library candidates

**Status:** evaluated candidates only. **No dependency install authorized in P1.**

## Skills present in the repository (from `skills-lock.json`)

- `anthropics/skills/frontend-design`: retain the approved visual direction and reject generic generated layouts.
- `pbakaus/impeccable`: design contract, UI hierarchy and artifact-first visual review. For the homepage the new P1 brief overrides the legacy Celestial DESIGN.md.
- `ibelick/ui-skills/improve-ui`: read-only UI evidence/audit when used according to its skill boundaries. It must not modify product files.
- `greensock/gsap-skills/*`: **P4 only** for GSAP performance, scroller integration and lifecycle.
- `awwwards-animations`: inspiration only, not a requirement to animate.

Confirmed references: https://www.skills.sh/anthropics/skills/frontend-design and https://www.skills.sh/pbakaus/impeccable/impeccable

## Library shortlist and disposition

| Need | Candidate | Decision / reason |
| --- | --- | --- |
| UI icons | `@lucide/astro` (https://lucide.dev/) | **Recommended for P2 evaluation**. Astro component distribution and ISC license; choose named icons per mockup, keep sizes/strokes consistent. |
| Brand/tech icons | Existing local icon assets or a vetted SVG brand source | **Review per icon**, not fake Lucide brand icons. Verify trademark and license. |
| Git activity | GitHub GraphQL contributions calendar + custom heatmap renderer | **P3 proposal**. Real data only, cache server/build-side, show loading/unavailable states; don't ship invented statistics. |
| Playground | Lightweight, accessible open-source interactive snippet/game | **Deferred to P3**. Select based on actual widget dimensions and license, not the other way around. |
| Component motion | Existing GSAP 3 in package.json | **P4**. Do not add overlapping animation engines. |
| Smooth middle scroll | Native `overflow-y:auto` first; Lenis optional | **P4 experiment only**. Keyboard, touch, reduced motion and nested scrollers have priority. |

## Evaluation gates for a dependency

A proposed library passes only if it (a) reproduces the mockup size/spacing and theme tokens, (b) adds no visually foreign controls, (c) supports keyboard/assistive technology, (d) has acceptable license and maintenance, and (e) can be removed or replaced without rewriting the entire three-column layout.

Links: https://github.com/lucide-icons/lucide and https://docs.astro.build/en/guides/view-transitions/

**Rule:** the component library adapts to the frozen design; the frozen design is never redesigned to accommodate a component library.
## Verified notes (2026-11-03)

The official Lucide installation documentation lists `@lucide/astro` as the Astro adapter (https://github.com/lucide-icons/lucide/blob/main/docs/guide/installation.md). Astro's current transition documentation explains that `<ClientRouter />` is opt-in and that normal navigation remains the default (https://docs.astro.build/en/guides/view-transitions/). Therefore **do not add ClientRouter during P2 just to obtain visual motion**; page transitions remain deferred to P4.

Neither package was installed or changed in this P1 review.
## P2 fidelity correction — 2026-11-04

Before installation, the official npm registry reports:

| Package | Version | License | Unpacked package | Reason |
| --- | --- | --- | --- | --- |
| `@lucide/astro` | 1.68.0 | ISC | 3,729,950 bytes | Consistent 24 px UI icons, replacing the unrelated Celestial symbols on the homepage. Named icons render as inline SVG with no client runtime. |
| `@fontsource-variable/inter` | 5.3.0 | OFL-1.1 | 1,909,049 bytes | A wider, heavier UI sans-serif that better matches the frozen reference hierarchy than Source Sans 3. Use its Latin normal subset only; actual shipped WOFF2 size is measured after install/build. |

The visual brief remains authoritative; these dependencies adapt to it. Package archive sizes above are not shipped JavaScript payloads.

Installed the two pinned packages and updated the existing `bun.lock`. The homepage emits one Inter Latin WOFF2 file (48 KiB on disk), and icons render as static inline SVG. Redistributable license notices are retained at `public/licenses/inter-OFL.txt` and `public/licenses/lucide-ISC.txt`. No additional browser JavaScript was introduced.
