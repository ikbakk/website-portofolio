# P5 readiness pass — 2026-11-06

> **Structural revision queued, 2026-11-06:** The owner subsequently requested single-column styled project links, moving Tech Stack below About, Projects/Experience tabs with current-theme transition effects, and matching detail pages. These revisions take priority before the next P5 run. The results below describe commit `8d28425`, not the subsequent source-only structure edits. See `WORK-STRUCTURE-REVISION.md`; fresh build/browser verification is blocked while the execution environment is unavailable.

The owner accepted the weather transitions for now and requested continuation with other planned work. This pass addresses performance, cross-layout navigation, generated-build regression checks and maintenance of the current test suite. It preserves the accepted 30/40/30 layout and weather choreography. No merge or deployment.

## Changes and evidence

### Initial payload

The homepage previously imported the GSAP weather engine eagerly. `src/scripts/weather/controls.ts` now keeps a small event layer on the initial page, loads the engine on first animated theme selection, coalesces choices made while it loads and falls back to applying the chosen theme if the optional chunk fails. Reduced-motion users can change colors without loading GSAP. The engine's existing bounded timeline, cancellation and cleanup are retained.

The exact baseline commit `2e045a6` was built in an isolated worktree using the same installed dependency tree and runtime as this checkout. The production audit follows entry scripts and their static imports, excluding dynamic imports.

| Initial JavaScript | Before | After |
| --- | ---: | ---: |
| Uncompressed | 85,732 bytes | 14,057 bytes |
| Sum of individually gzipped files | 33,842 bytes | 6,001 bytes |

Raw initial JS is **83.6% smaller**. This is a bundle-size comparison, not Lighthouse, network transfer or field Core Web Vitals. Runtime CPU/GPU and real-device network profiling remain unmeasured. Full machine-readable results, static import graph and baseline findings are in [build-audit.json](verification/p5/build-audit.json).

Inter's Latin variable font is preloaded from its existing local asset. The featured image is marked high priority with asynchronous decoding; the lower project image retains lazy loading. Intrinsic dimensions remain intact. No new dependency or visual asset was added.

### Navigation, metadata and accessibility structure

- Added the real `#profile` target to the identity panel. The case-study Contact links now open the same email as the homepage instead of targeting the removed `#contact` section.
- Return/home links use `data-astro-reload` across the retained Celestial case studies and Soft Grid homepage. This avoids carrying the case-study router lifecycle into the homepage's ordinary module initialization. Case-to-case navigation retains its existing router.
- Added the homepage's Person JSON-LD, sitemap link, social image dimensions and theme color; added `noindex` to the static 404 document. Existing canonical origin remains `https://ikbak.vercel.app`.
- Labelled generic widget/info containers now have a group role. No new content claims or identity changes.
- README and PRODUCT now describe the actual architecture and current evidence. Three pre-existing formatting failures were normalized so the full source formatting check passes; the large Celestial stylesheet diff is formatting-only.

Official references: [Astro view transitions / data-astro-reload](https://docs.astro.build/en/guides/view-transitions/) and [Astro script processing](https://docs.astro.build/en/guides/client-side-scripts/).

### Regression tooling

`npm run audit:build` audits generated HTML, local anchors/assets/CSS URLs, declared image dimensions, one h1 per page, canonical/description/title metadata and the homepage static JS graph. It also prevents accidentally returning to eager loading of the weather engine. It does not crawl external websites, parse arbitrary handwritten HTML, validate asset licensing, or measure browser rendering.

`npm run test:build` includes controlled broken-build fixtures and the actual export; it catches removed anchor targets, missing assets, missing native-navigation boundaries and an eager GSAP import. `verify` includes this step after the build.

Six obsolete Celestial-home test files were removed and their relevant responsibilities migrated into current responsive/accessibility/weather scenarios. The existing case-study route suite remains. Playwright discovery reports **27 scenarios in four files**; Node suites are explicitly excluded from its discovery. Source/format checks and test listing succeeded, but **the 27-scenario Playwright suite and its Axe assertions were not executed here**. This environment permits managed-browser QA instead of starting another browser/server. Run the suite locally or in CI before claiming full P5 automation sign-off. This pass does not claim the complete release gate has passed.

## Executed checks

- `npm run check`: 0 errors, warnings or hints.
- `npm run format:check`: all matched source/test/script files pass.
- `npm run build`: all seven static pages exported successfully.
- `npm run test:build`: 3 passing tests after removing the temporary viewport review file. The audit intentionally detected that extra eighth HTML document while the review fixture was present; the production directory was cleaned before the final passing run.
- `npm run test:widgets`: all 9 tests pass.
- `npx playwright test --list`: 27 scenarios parsed/listed; not an execution result.
- `git diff --check`: clean.
- Final generated audit: **7 HTML pages, 327 local references, zero errors**.

## Managed production-browser checks

The managed preview served the actual `dist/` export using Astro preview; `package.json` was restored to its normal `astro dev` command immediately after starting the QA service.

- Desktop 1363 × 936: columns 376 / 501 / 376 px; document height 936 px. First Cryo selection completed and left a hidden overlay and zero particles.
- Homepage → Sungkar Group → Back to archive: returned to the actual card anchor; subsequent Electro switch and Calm rally both worked (1 hit, best 1).
- All five case-study routes rendered their expected h1. The static 404 document rendered its expected message and native return link worked. Production host status codes and protected/public access were not checked.
- Real 1363 × 720 iframe: document client/scroll heights 720 / 720 px; tracks 376 / 501 / 376 px.
- Real 320 × 800 iframe: document client/scroll widths 305 / 305 px after scrollbar reservation; normal document scrolling. First lazy-loaded Cryo selection worked.
- Real 768 × 1024 iframe: document client/scroll widths 753 / 753 px, identity/work tracks 220 / 473 px with widgets below, normal document scrolling.
- Actual project images loaded with natural dimensions 1828 × 967 and 1440 × 3047. No placeholder screenshots were fabricated.

[Production desktop](verification/p5/desktop.jpg) and [short desktop/phone](verification/p5/responsive.jpg). Temporary review files were removed from the production output.

## Remaining release work

The full Playwright/Axe run in local/CI, physical-device performance profiling, and final artwork acceptance remain open. The existing logo/avatar, Playground character-art gap and missing Beaconnect/CV Builder screenshots are unchanged. Hosting/deployment and merging remain separate owner decisions. Weather polish is explicitly deferred at the owner's request.
