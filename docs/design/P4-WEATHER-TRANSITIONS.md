# Weather switch transitions — 2026-11-05

The owner requested a full-site falling-leaf transition into Normal, a diagonal right-to-left Blizzard transition into Cryo, and a purple lightning flash before switching into Electro. The owner approved the researched direction with “Oke lanjutkan”. This authorizes these weather-switch sequences; it does not authorize unrelated ambient loops, scroll animation, merge or deployment.

## Motion direction and implementation

Focal moment: the selected element crosses the entire viewport and carries the theme change. The three columns stay still. Feedback: the selected button updates immediately; the theme commits at a deliberate point inside the effect. Budget: one temporary DOM/SVG layer, existing GSAP, transforms and opacity, no additional dependency, canvas, sound, shader or automatic page-load sequence.

| Theme | Sequence | Theme commit |
| --- | --- | --- |
| Normal | Paper leaves fall top-to-bottom with independent lateral sway, face rotation and three depth/opacity/size bands. A soft green light band travels with them. Roughly 2.1–2.3 seconds including the last leaves. | 0.87 seconds |
| Cryo | A diagonal frost veil, snow crystals/dots and wind streaks sweep from upper right toward lower left. Foreground flakes carry a muted blue edge for visibility on the light UI. Roughly 1.5 seconds. | 0.69 seconds |
| Electro | A short violet charge, one original branching SVG strike with layered core/color/halo, and a fading violet afterglow. 0.83 seconds. | 0.23 seconds, at the flash peak |

Desktop particle limits are 62 leaves or 100 snow particles plus 13 wind streaks. At widths below 741px these become 30 leaves or 52 snow particles plus seven streaks. SVG symbols are original code-native artwork matching the existing paper/pixel ornaments; research demos were used for movement principles, not copied source or artwork.

`WeatherTransition.astro` owns decorative shapes and the hidden, pointer-transparent overlay. `weather-transition.css` owns material styling. `src/scripts/weather/transitions.ts` owns the scoped timeline and lifecycle. The old instant theme listener was replaced, rather than adding another competing listener. Static theme definitions remain separate.

## Interruption and accessibility

- Latest requested theme wins. A new request kills the prior timeline and removes its particles; reselecting the requested theme does not restart it. Returning to the currently rendered theme clears an uncommitted sequence immediately.
- A completed sequence removes particles, inline animation properties and transition metadata, and hides the layer. Nothing runs as an idle weather loop.
- Reduced motion commits the theme immediately with a short, low-opacity veil fade; no particle or lightning sequence. CSS also hides spatial effects for the actual OS preference. Repeated Electro choices within 1.4 seconds use that gentle fade to avoid accumulating flashes.
- Resize, document hidden, pagehide and changed motion preference settle to the latest requested theme and clean up the sequence. Astro before-swap disposes listeners via AbortController.
- Overlay is aria-hidden and pointer-events none. Existing buttons retain native keyboard activation and pressed state. Reading, scrolling and game controls are not blocked.

## Research

- [Diaco — Autumn falling leaves](https://codepen.io/MAW/pen/KdmwMb): independent fall, sway and face rotation. Its legacy GSAP API and looping behavior were not carried into this implementation.
- [Carter Rink / Codrops — Immersive 3D Weather Visualization](https://tympanus.net/codrops/2025/09/18/creating-an-immersive-3d-weather-visualization-with-react-three-fiber/): drift/tumbling and a bounded lightning lighting event. Adapted to the existing flat paper UI instead of adding React Three Fiber.
- [Wakana — Lightning demo](https://codepen.io/wakana-k/pen/NWJbemr): visual reference for branching strike and separate glow.
- [GSAP Timeline](https://gsap.com/docs/v3/GSAP/Timeline/): bounded sequencing and precise callback positioning.
- [web.dev animation performance](https://web.dev/articles/animations-guide): transform/opacity movement, bounded compositing and avoiding per-frame layout properties.

## Verification

Managed-browser checks verified:

- Normal and Cryo travel through the viewport, commit their target theme, complete, hide the layer and leave zero particles behind.
- Electro displays the branching purple strike and commits the theme during the flash.
- Rapid Electro → Cryo → Normal selection ends with Normal selected/rendered, hidden overlay and zero particles, with no prior effect left running.
- A temporary reduced-motion fixture using the actual homepage and a controlled matchMedia result produced immediate Electro selection with kind `reduced`, zero particles and no strike animation. It was removed before the final build.
- Keyboard Enter starts the Electro transition.
- 1363 × 720 desktop retains **376 / 501 / 376 px** tracks and document client/scroll heights **720 / 720 px**.
- A real 320 × 800 phone iframe has client/scroll widths **305 / 305 px** after scrollbar reservation. Cryo uses exactly **59** particles/streaks and the overlay computes pointer-events `none`.
- Temporary review routes and timeline diagnostics were removed. Screenshots are visual samples, not a frame-rate benchmark; physical-device GPU performance has not been profiled.

Final Astro diagnostics, scoped Prettier and production build results are recorded with this change. Existing whole-repository formatting failures from P3 remain unrelated. Legacy Playwright browser suites were not launched in this managed-browser environment.

Evidence: [Normal](verification/p4/normal.jpg), [Cryo](verification/p4/cryo.jpg), [Electro](verification/p4/electro.jpg), [responsive viewports](verification/p4/responsive.jpg). No merge or deployment.
