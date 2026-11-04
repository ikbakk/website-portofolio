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
