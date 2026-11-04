# P2 static homepage — implementation and verification

Date: 2026-11-04 (Asia/Makassar)
Branch: `ikbakk/inspire-portfolio-jmancheta-design`

## Result

The owner requested continuation of the unfinished portfolio work in this conversation. The locked P1 reference set was verified first. P2 now implements an isolated Astro homepage with the approved identity / work / personal-widgets composition and static Normal, Cryo and Electro switching. This report records implementation evidence, not owner visual acceptance.

The existing Celestial case-study layout and its source files remain unchanged. New homepage code does not import its opening/controller/motion scripts. No runtime dependency or package version was added.

## Checks completed

| Check | Result |
| --- | --- |
| `node scripts/validate-weather-p1.mjs --strict` | Passed; all three original image hashes match |
| `npm run check` | Passed; 48 files, zero errors, warnings or hints |
| `npm run build` | Passed; seven pages generated, case-study routes and sitemap retained |
| Prettier for changed implementation files | Passed |
| Repository-wide format check | Existing failures in `celestial.css`, `weather-themes.tokens.css`, `weather.config.ts`, and `scripts/validate-weather-p1.mjs`; these files were not reformatted in this change |
| Static theme switching | Normal, Cryo, Electro selected in browser; same desktop column geometry observed |
| Keyboard theme activation | Enter activates Electro and updates its pressed state |
| Experience disclosure | Opens and exposes the existing experience records |
| Case-study navigation | Sungkar Group case opens, and Back to archive resolves to the corresponding project ID |
| Small viewport overflow | At 320 px iframe width, document client/scroll widths both 305 px after reserving the browser scrollbar; at 768 px both 753 px |

Dependencies were installed with `npm install --legacy-peer-deps` because the existing TypeScript 6 / `@astrojs/check` peer requirements conflict under npm's default resolver. The checked-in dependency and Bun lock files were preserved. The existing Playwright suite was not run: its homepage expectations target the retired Celestial screen, and this environment's browser checks use the managed preview instead. Full automated regression and accessibility audits remain outstanding.

## Visual evidence

Browser review used the managed development preview, not a deployed site. Screenshots include development browser chrome/tooling where visible.

- [Normal](verification/p2/normal.jpg), [Cryo](verification/p2/cryo.jpg), [Electro](verification/p2/electro.jpg): final desktop implementation at the browser's approximately 1363 × 936 viewport.
- [Reference-size desktop](verification/p2/desktop-1536.jpg): homepage rendered in a 1536 × 1024 iframe and displayed at 80% so the whole review area fits the browser. The restrained bottom horizon is visible. This is a scaled visual capture, not a native-resolution pixel diff.
- [Phone and tablet](verification/p2/responsive.jpg): actual 320 × 850 and 768 × 850 iframe viewports; captured after the horizontal-overflow fix, before the final sidebar spacing reduction.
- [Phone project cards](verification/p2/responsive-work.jpg): Projects anchor navigation and stacked cards at 320 px.

Temporary iframe review pages were removed before the final build. No synthetic browser resize API or alternate browser runner was used.

## Deliberate differences and remaining work

- **Identity:** preserve `public/logo-mark.svg`. The green mark and illustrated portrait in the mockup do not have approved source assets; the avatar uses neutral IF initials. Replacing these still needs an owner decision.
- **Project content:** Sungkar Group is featured because a genuine screenshot is available. Beaconnect and CV Builder retain labelled missing-image placeholders; Ward Monitor uses the existing prototype screenshot. Courtside remains reachable. Rentalin and Drama Stream from illustrative reference content were not fabricated as new project records.
- **Widgets:** Focus, Playground and GitHub Activity are visibly preview/unconnected. There are no invented completion counts, contribution totals or working-game claims. This necessarily differs from the fully illustrated mockup.
- **Typography/icons:** the existing Source Sans 3 and existing SVG icon component are reused. Tech names are readable text chips; brand artwork was not invented or newly sourced. The UI follows the reference's composition and theme directions; exact typography/illustration fidelity is not claimed.
- **Layout:** desktop columns follow approximately 1 : 3.2 : 2.1. The middle-width layout places widgets below both columns; phone order remains profile, work, widgets. Native document scrolling keeps all content reachable. No P4 smooth-scrolling implementation is included.
- **Acceptance:** native-resolution reference overlay comparison, complete keyboard/accessibility regression, and final owner visual sign-off remain open. The responsive iframe checks verify CSS reflow and overflow, not device-specific touch behavior.

P3 live widgets and P4 motion were not implemented. No pull request, main merge or deployment was performed.


## Owner revision — 30 / 40 / 30 and center-only scrolling

The owner’s final ratio request on 2026-11-04 supersedes the prior 1 : 3.2 : 2.1 composition. Desktop widths (above 1100 px) now use 30 / 40 / 30 after the two fixed gutters. At the 1363 × 936 browser viewport, measured tracks were approximately 375.97 / 501.30 / 375.98 px.

The document and both outer columns stay stationary; a labelled, keyboard-focusable center region owns vertical scrolling. Its top and bottom have pointer-transparent static blue gradients and a blue scrollbar. Project cards stack inside the narrower work column. Experience moved from a sidebar disclosure into the center so opening long content cannot overflow the fixed profile. The Home link returns to the top of this region; project and experience anchors stay reachable. At 1100 px and below, the existing responsive document flow is retained.

Browser PageDown verification observed center scrollTop > 0 while page scrollY remained 0 and left/right column tops remained approximately 53.55 px. Document height equalled viewport height (936 px); the center content was 2501 px in an 838 px scroll viewport. [Updated layout capture](verification/p2/ratio-30-40-30.jpg) supersedes earlier geometry screenshots. Short desktop viewports use a more compact profile treatment.


## Scroll-edge correction — blurred fades, not blue

The owner clarified that the intended reference was the original J. Mancheta inspiration’s blurred scroll fade. The source was traced through https://jmfolio.vercel.app/projects/portfolio to https://www.jmancheta.cloud and the public repository https://github.com/jm-commitz/jmfolio. Direct inspection of `components/ui/ScrollColumn.tsx` showed opacity and soft blur as content crosses the top edge. The custom domain could not be retrieved by web search; this finding is based on source inspection, not a claimed live visual comparison.

Our implementation adapts that soft fade/blur treatment to both requested edges of the center column using a 48 px masked backdrop blur and theme-neutral surface tint. This confines the effect to the edge instead of fading an entire partially visible project card. There is no copied React component or added animation dependency. The former blue overlays and blue scrollbar color are removed; 30 / 40 / 30 proportions and center-only desktop scrolling remain unchanged. The effect follows the current panel color in Normal, Cryo and Electro. Without backdrop-filter support the neutral masked fade remains usable.

Browser verification at 1363 × 936 confirmed `backdrop-filter: blur(4px)`, a white surface tint (35% alpha) in Normal, center scrollTop 670, document scrollY 0, and unchanged 375.97 / 501.30 / 375.98 px columns. [Blurred edge capture](verification/p2/blurred-scroll-edges.jpg) supersedes the earlier blue-edge screenshot. Build and changed-file formatting checks passed.


## Frozen-mockup fidelity correction — keeping 30 / 40 / 30

The owner reported that the implemented visuals still differed from the frozen boards and explicitly reiterated **30 / 40 / 30**. The original references were visually inspected again. Their older column proportions were not restored.

| Visual issue | Correction |
| --- | --- |
| Oversized stacked featured card | Compact side-by-side image/copy; actual measured height 177 px at the reviewed desktop viewport |
| Selected projects in one tall column | Restored three equal cards in a row, approximately 145.77 px each inside the existing center track |
| Two-column sidebar navigation | Restored vertical Home, Projects, Experience, Approach, Contact order |
| Narrow reading type and faint symbols | Inter Latin UI font with heavier headings; consistent Lucide Astro UI icons |
| Flat panels | Subtle warm/icy/violet materials, thin themed borders and paper-like inset highlights/shadows |
| Widget blocks without reference structure | Checklist-shaped empty Focus rows, three Playground interest labels, framed artwork placeholder, seven-row empty calendar with weekday labels and profile footer |
| Large missing-image blocks | Compact image-ratio placeholders with an image symbol and explicit pending label |
| Social text pills | Accessible icon-sized links, including the original GitHub symbol and labelled resume download |

Measured desktop tracks remain **375.97 / 501.30 / 375.98 px** at a 1363 × 936 viewport, with document height 936 px. Only the center scroll region overflows on desktop. Neutral blurred edges are preserved.

### Review evidence

- [Normal](verification/p2/fidelity-normal.jpg)
- [Cryo](verification/p2/fidelity-cryo.jpg)
- [Electro](verification/p2/fidelity-electro.jpg)
- [Short desktop and phone](verification/p2/fidelity-responsive.jpg): real 1363 × 720 and 320 × 800 iframe viewports. At 720 px, the social links end at 665.95 px within the profile panel ending at 678 px; the final GitHub footer ends at 664.98 px within its panel ending at 677.98 px. Phone document client/scroll widths both equal 305 px after scrollbar reservation.

Typecheck passed for 49 files with zero errors, warnings or hints. Production build and formatting checks passed. The temporary review page was removed. Added source dependencies are pinned and recorded in `P1-LIBRARIES.md`; Bun remains the canonical lockfile. No new browser runtime, main merge or deployment.

### Still different from the concept

This correction improves structure and styling; it is **not an exact visual match or owner sign-off**. The approved green logo and portrait illustration are still unavailable as separate identity assets. The Playground illustration/characters and verified Beaconnect/CV Builder screenshots are missing. Widget data remains unconnected. Project content differs from illustrative concept titles because only the real existing project records are presented. Tech labels remain text chips rather than a fully sourced set of brand logos. Inter is a deliberate closer UI font choice; the raster mockup does not identify its original typeface. These gaps must remain visible in review rather than being disguised as completed assets.


## Elemental selector and pixel / paper column ornaments — 2026-11-04

The owner requested actual Genshin elemental logos in the weather controls and more theme-specific pixel/paper ornamentation. The selector now maps Green Meadow to **Dendro**, Blizzard to **Cryo**, and Storm to **Electro**. Its three buttons use local crisp SVG emblems, accessible theme/element names, pressed state, tooltips and visible keyboard focus. The original `normal` theme ID remains unchanged.

Six original vector decorations form the new column family: a folded-paper corner and a layered low paper strip per theme. Meadow uses leaves, green paper layers and pixel sprouts; Blizzard uses snowdrifts, faceted ice and pixel snow; Storm uses violet folds, pixel lightning and flowering branches. A reusable component renders corner/footer decorations for each column. Decorations are non-interactive and excluded from assistive output. Narrow and short screens get smaller edge details; work content retains bottom padding and the GitHub link reserves room above its paper edge.

The explicit owner request authorizes these element emblems and new column ornaments despite the earlier P1 restrictions. Existing experimental `edge.svg` / `corner.svg` assets are still unused. The SVG emblem source and MIT notice are retained; no package, React runtime, animation, weather simulation or dependency was added.

Browser review confirmed all three theme switches, keyboard Enter activation, six ornament wrappers, pointer-events none, document scrollY 0 while the center scroll position changes, and unchanged 375.97 / 501.30 / 375.98 px tracks (30 / 40 / 30) at 1363 × 936. The document remains exactly one viewport tall. Neutral blurred scroll edges remain active.

- [Meadow / Dendro](verification/p2/ornaments-normal.jpg)
- [Blizzard / Cryo](verification/p2/ornaments-cryo.jpg)
- [Storm / Electro](verification/p2/ornaments-electro.jpg)

Astro diagnostics passed for 50 files with zero errors, warnings or hints; production build and changed-file formatting passed. The artwork and identity gaps recorded in the previous review remain separate from this update. No PR, merge or deployment.
