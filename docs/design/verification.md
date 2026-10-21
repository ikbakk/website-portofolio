# Celestial archive — implementation verification

## Delivered scope

Astro 7 and Tailwind CSS 4 static portfolio, original SVG identity/emblems/ornaments,
responsive scenery, four archive sections, five substantive case studies, themed
404, real resume/contact links and production metadata. Assets and source provenance
are documented in [assets.md](assets.md). The approved reference is a direction and
composition reference; this report makes no claim of pixel-perfect equivalence.

## Production-build verification

Run `bun run verify` after installing dependencies and Chromium. Verified with
Node 24.19.0 and the committed Bun lockfile:

- Astro diagnostics: **0 errors, 0 warnings, 0 hints** across 33 files.
- Formatting check: passed.
- Static build: passed, seven HTML pages plus sitemap.
- Playwright: **23 passed**, against `astro preview`, in 15 seconds.
- Four axe scans: no serious or critical violations in Profile, Projects,
  Experience or Contact. This is automated coverage, not a full accessibility audit.
- No-JavaScript content, five project routes, real PDF signature, keyboard access,
  hash/deep-link/history behavior, reduced motion and repeated Astro navigation pass.
- Responsive checks: 320, 390, 768, 1280 and 1440px; long titles and enlarged text.
  The final action remains reachable above fixed navigation after scrolling.
- Real screenshot dimensions are checked against the declared image dimensions.

The code review found two issues: skip-link activation reset the archive state,
and selection animated the archive heading instead of the incoming dossier. Both
were reproduced by failing browser regressions, fixed, and checked again by the
reviewer. Tween cleanup now includes the dossier transition.

## Visual evidence

`node scripts/capture.mjs` captures production pages after fonts settle with reduced
motion enabled. All four captures were opened and inspected; the capture report
contains no page errors or horizontal overflow. A fresh independent visual review
returned **ship**, with no material visual fixes. Its scope was screenshot fidelity
and supporting CSS, not independently repeated interaction/performance testing.
The one mechanical Impeccable detector run returned an empty findings list.

- [Desktop, 1440px](verification/desktop.webp)
- [Mobile, 390px](verification/mobile.webp)
- [Courtside case study](verification/case.webp)
- [Mobile 404](verification/not-found.webp)
- [Capture metadata](verification/capture-report.json)

## Local performance sample

`node scripts/measure.mjs` measures a cold Chromium page at 390×844, CPU slowed 4×,
150ms network latency and 1.6Mbps download. The saved sample reports **LCP 1,856ms**,
**CLS 0.00232**, and no horizontal overflow. Resource transfers total approximately
262KB, including the mobile scene, two fonts, CSS and JavaScript.

An earlier sample exposed CLS 0.144: late progressive enhancement changed the initial
panel layout and late fonts changed wrapping. A small head script now applies the
whitelisted initial archive state before paint; font preloads and optional display
prevent late font swaps. The static no-JavaScript document still exposes all content.

These are local lab samples, not Lighthouse scores or production field data. Vercel
network/cache behavior and real devices may differ. [Raw sample](verification/performance.json).
On a slow first visit, optional font display may retain a fallback face until the
next navigation rather than moving already visible text.

## Release boundary

Source scenery and the approved reference are archived as high-quality WebP; the share image is JPEG to keep repository transfer sizes bounded. Runtime scene and SVG assets are unchanged.

No production deployment or merge was performed. The GitHub PR is the reviewable
release candidate. Production deployment behavior remains to be checked after the
owner approves it. Missing application screenshots are explicitly labelled original
illustrations; no application UI or outcome metrics were fabricated.
