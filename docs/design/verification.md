# Celestial archive — implementation verification

## Delivered scope

Astro 7 and Tailwind CSS 4 static portfolio, original SVG identity/emblems/ornaments,
responsive scenery, four archive sections, five substantive case studies, themed
404, real resume/contact links and production metadata. Assets and source provenance
are documented in [assets.md](assets.md). The approved reference is a direction and
composition reference; this report makes no claim of pixel-perfect equivalence.

## Game screen revision — 22 October 2026

The home shell now occupies exactly `100dvh` with no document scroll. Only the
keyboard-accessible dossier can scroll, with an overflow cue and end detection.
Projects is the only project shortcut; the rail and strip are removed. The left
area carries identity/resume; the bottom desktop bar carries location and social
links. Text is darker on an opaque ivory panel; navigation has dark backing and
larger, brighter labels. Case-study reading pages retain their existing layout.

Seven new browser regressions cover all four tabs at 1440×900, 1280×720,
390×844, 320×568 and 844×390, internal scroll/link reachability, normal case-study
scrolling, and the overflow cue. Two core checks failed before implementation.
Final captures include Projects on mobile and the compact landscape view.

- [Mobile Projects with internal scroll](verification/projects-mobile.webp)
- [Landscape screen](verification/landscape.webp)

## Production-build verification

Run `bun run verify` after installing dependencies and Chromium. Verified with
Node 24.19.0 and the committed Bun lockfile:

- Astro diagnostics: **0 errors, 0 warnings, 0 hints** across 33 files.
- Formatting check: passed.
- Static build: passed, seven HTML pages plus sitemap.
- Playwright: **30 passed**, against `astro preview`, in 10.3 seconds.
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

## Initial redesign performance sample (before the game screen revision)

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

No production deployment or merge was performed. The follow-up GitHub PR is the reviewable
release candidate for this revision. Production deployment behavior remains to be checked after the
owner approves it. Missing application screenshots are explicitly labelled original
illustrations; no application UI or outcome metrics were fabricated.

## Interactive motion revision

Original SVG opening plays once per session and can be dismissed by pointer, keyboard or click-only activation. A shared navigation tracer, dossier reveal, button ripple and project flare respond immediately to state changes. Reduced motion skips the opening and uses opacity-only feedback. Cleanup covers Astro navigation, visibility and preference changes.

Production build and Astro diagnostics pass with zero errors, warnings or hints. **39 browser regressions pass**, including failed-bundle fallback, repeated route visits, rapid menu changes and click-only interruption. The independent code reviewer reported no critical or important findings. Desktop and mobile captures show no page errors or overflow.

The current cold mobile lab sample reports **LCP 1,716ms and CLS 0**, with no overflow, using the same throttled setup described above. This is a local sample, not production field data.

[Motion recording](verification/celestial-motion.mp4) · [Motion capture report](verification/motion-capture-report.json) · [Current lab sample](verification/motion-performance.json).
