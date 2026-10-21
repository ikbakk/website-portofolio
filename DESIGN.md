---
name: Iqbal Celestial Archive
description: An original celestial archive for frontend and mobile engineering work.
colors:
  sky: '#14263d'
  midnight: '#0c1829'
  ivory: '#f2ebdd'
  gold: '#cbb88f'
  ink: '#25354b'
  muted-ink: '#5c6574'
  parchment-light: '#f8f2e6'
  parchment-shade: '#eae2d1'
  panel-border: '#c4ad81'
  action-ink: '#24364c'
  action-light: '#fff8e7'
  action-shade: '#e8d9b9'
  action-dark-top: '#21364b'
  action-dark-bottom: '#101e30'
  action-dark-text: '#f7eedb'
  focus: '#e7c477'
typography:
  display:
    fontFamily: "'Newsreader Variable', Georgia, serif"
    fontSize: 'clamp(34px, 5vw, 58px)'
    fontWeight: 550
    lineHeight: 1.12
    letterSpacing: '-0.025em'
  headline:
    fontFamily: "'Newsreader Variable', Georgia, serif"
    fontSize: '34px'
    fontWeight: 550
    lineHeight: 1.12
  title:
    fontFamily: "'Newsreader Variable', Georgia, serif"
    fontSize: '32px'
    fontWeight: 550
    lineHeight: 1.12
    letterSpacing: '-0.025em'
  body:
    fontFamily: "'Source Sans 3 Variable', sans-serif"
    fontSize: '17px'
    fontWeight: 400
    lineHeight: 1.5
  reading:
    fontFamily: "'Source Sans 3 Variable', sans-serif"
    fontSize: '18px'
    fontWeight: 400
    lineHeight: 1.65
  action:
    fontFamily: "'Newsreader Variable', Georgia, serif"
    fontSize: '18px'
    fontWeight: 500
    lineHeight: 1.2
  label:
    fontFamily: "'Source Sans 3 Variable', sans-serif"
    fontSize: '14px'
    fontWeight: 400
    lineHeight: 1.5
rounded:
  dossier: '15px 5px 15px 5px'
  dossier-inner: '9px 3px 9px 3px'
  dossier-mobile: '12px 4px 12px 4px'
  action: '5px 22px 5px 22px'
  emblem: '50%'
  archive-link: '3px'
  capture: '4px'
spacing:
  action: '9px 19px'
  action-compact: '7px 13px'
  panel: '30px'
  panel-home: '34px 35px 26px'
  panel-mobile: '32px 24px 28px'
  gap-small: '12px'
  gap-medium: '20px'
  gap-large: '24px'
components:
  button-light:
    backgroundColor: 'linear-gradient({colors.action-light}, {colors.action-shade})'
    textColor: '{colors.action-ink}'
    typography: '{typography.action}'
    rounded: '{rounded.action}'
    padding: '{spacing.action}'
  button-dark:
    backgroundColor: 'linear-gradient({colors.action-dark-top}, {colors.action-dark-bottom})'
    textColor: '{colors.action-dark-text}'
    typography: '{typography.action}'
    rounded: '{rounded.action}'
    padding: '{spacing.action}'
  dossier:
    backgroundColor: 'linear-gradient(115deg, {colors.parchment-light}, {colors.parchment-shade})'
    textColor: '{colors.ink}'
    rounded: '{rounded.dossier}'
    padding: '{spacing.panel}'
  project-emblem:
    backgroundColor: 'radial-gradient(ellipse at 50% 65%, #4c677b9c, #0e2035bd 72%)'
    textColor: '#dbc59a'
    rounded: '{rounded.emblem}'
    width: '72px'
    height: '72px'
  archive-link:
    rounded: '{rounded.archive-link}'
    padding: '7px 10px'
    typography: '{typography.label}'
---

# Design System: Iqbal Celestial Archive

## Overview

**Creative North Star: "The Celestial Archive"**

An original celestial archive gives real engineering work the atmosphere of a carefully kept dossier. Desaturated midnight scenery, pale orbital geometry and warm ivory reading surfaces form a calm, luminous world inspired by the approved Genshin reference. Its visual vocabulary is original: the `I` monogram, project emblems, constellation geometry and corner ornaments are authored SVG assets.

The ornament frames selectable, readable content. Source Sans 3 supports practical information, while Newsreader gives names, headings and actions an archival character. Project stages remain explicit; decorative stars never become invented ratings, levels or performance claims.

**Key Characteristics:**

- Atmospheric blue scenery behind warm ivory dossiers.
- Fine pale-gold geometry, inset borders and asymmetric corners.
- Original SVG identity and project symbols.
- Readable text, real links and restrained motion.

## Colors

The primary accent is pale gold; midnight blues and parchment neutrals supply the material contrast. Frontmatter records the actual CSS values, including component gradient endpoints.

### Primary

- **Pale Gold** (`gold`): shared ornaments and celestial strokes; the brighter focus color remains a functional keyboard indicator.

### Neutral

- **Celestial Sky** (`sky`) and **Midnight** (`midnight`): environment fallback, dark framing and themed surfaces.
- **Warm Ivory** (`ivory`): text on the sky and the shared light material reference.
- **Parchment Light / Shade**: dossier gradient, paired with the muted gold panel border.
- **Archive Ink** (`ink`) and **Muted Ink** (`muted-ink`): dark reading palette. Components also use observed slate variations for secondary details.
- **Light / Dark Action Materials**: dedicated gradient endpoints and text colors preserve the two action variants.

**The Reading Surface Rule.** Put extended reading on parchment with dark ink; keep environmental glows and texture subordinate to text.

## Typography

**Display Font:** Newsreader Variable, with Georgia and serif fallbacks.

**Body Font:** Source Sans 3 Variable, with sans-serif fallback.

**Emblem Font:** Cinzel Variable is loaded and reserved for identity use. The shipped monogram is SVG path geometry, not live Cinzel text.

Newsreader has a literary, open character; Source Sans 3 keeps metadata and longer technical explanations direct. Both reading fonts are self-hosted Latin variable WOFF2 files with optional font display. License copies live in `public/celestial/licenses/`.

### Hierarchy

- **Display:** case-study title, using the frontmatter display token.
- **Headline:** section heading; reduces to 31px on mobile.
- **Title:** project dossier heading; reduces to 29px on mobile.
- **Profile name:** Newsreader (550), `clamp(28px, 2.4vw, 36px)`; mobile uses 30px with 1.08 line height.
- **Body:** default information text, using the body token.
- **Reading:** case prose uses the reading token with a maximum measure of 72ch; mobile reduces to 17px.
- **Label:** project metadata, archive links and secondary details; normal sentence case.
- **Action:** Newsreader at medium weight; compact project actions use 15px, then 14px on mobile.

**The Identity Type Rule.** Reserve Cinzel for identity; use Newsreader and Source Sans 3 for readable interface text.

## Layout

The environment is fixed, full bleed and noninteractive; the page scrolls naturally above it. Header and archive containers cap at 1600px. Wide layouts use 40px side padding and a three-column archive grid: 108px selector rail, a flexible identity region, and a 390–510px dossier. The default gap is 22px, increasing to 40px from 1600px.

At 1250px and below, padding drops to 28px and the grid tightens. At 1000px and below, the rail disappears and a two-column composition remains; the project strip supplies selection. At 700px and below, content stacks, the identity shrinks to at most 255px, and the dossier spans the available width with 17px outer gutters. Actions move into the profile. The project strip scrolls horizontally with readable titles.

Mobile navigation is fixed to the bottom, includes safe-area padding, and has compensating footer clearance. The minimum supported canvas is 320px. Case-study shells cap at 1040px, with more generous reading padding and a single prose column. Use existing gaps and panel spacing rather than imposing an unrelated spacing scale.

## Elevation & Depth

Depth combines scenery, translucent scrims, parchment gradients, inset strokes and restrained shadows. The panel's shadow separates it from the scene; button insets suggest a crafted rim. Original SVG orbital layers sit behind the monogram. The dossier's scenery watermark is only 0.045 opacity.

### Shadow Vocabulary

- **Dossier:** `0 14px 44px #040b1726`.
- **Light action:** `inset 0 0 0 3px #fff9eb70, 0 4px 12px #02091526`.
- **Dark action:** `inset 0 0 0 3px #293b4d, 0 4px 12px #02091526`.
- **Selected emblem:** `inset 0 0 0 4px #203246, inset 0 0 0 5px #eedab3, 0 3px 18px #e6cd913b`.

## Shapes

Dossiers use asymmetric rounded corners with a finer inset border at 7px. They are rounded, not polygon-clipped. Small corner SVGs preserve ornamental proportions. Buttons reverse the corner emphasis into elongated opposing curves. Project emblems are circular; active selectors add small diamonds above and below the rim. Thin strokes, diamonds, rings and four-point stars form the shared geometry.

## Components

### Buttons

Crafted light and dark action surfaces use the frontmatter variants. A thin exterior border, an inset outline and a right arrow complete the shape. Standard actions have a minimum height of 44px; compact case-study actions use 38px. Hover lifts by 2px and brightens the inset, press moves down 1px, and keyboard focus uses a 2px gold outline offset by 5px. Arrow motion is a small 3px translation.

### Cards / Containers

The dossier is the canonical reading surface, with warm gradient, double border and four original corners. Base padding is the panel token; home and mobile variants have their own recorded padding. Case pages increase padding with `clamp(30px, 5vw, 68px)`. Keep real project screenshots separate from the decorative scene.

### Navigation

Newsreader labels accompany original SVG icons. Active items brighten, gain an icon glow, a fine gradient underline and a diamond marker. Desktop navigation is horizontal; mobile navigation becomes a persistent bottom row. State is conveyed by `aria-current` as well as visual treatment.

### Archive Links

Compact project links use a thin muted-gold border and small radius. Hover and selection fill the link with dark blue (`#243b50`) and warm light text (`#fff1d8`), with a 1px upward shift. They are links, not form filters.

### Project Emblems

Circular project selectors use inset rings over a radial blue material. Hover enlarges the emblem to 1.07; selected emblems brighten and gain two diamond points. Keep the original tourism, badminton, connection, document and monitor SVG motifs and visible names. Rail, strip and dossier illustration sizes are purposeful variants.

### Identity and Motion

The original `I` monogram is layered separately from SVG orbits and stars. Ambient outer and inner rotations take 240 and 320 seconds in opposite directions, with linear easing. They stop when offscreen, the document is hidden, or reduced motion is requested. Dossier changes reveal from opacity 0.65 and a 6px offset over 0.32 seconds with GSAP `power3.out`. Reduced motion disables CSS transitions and animations and bypasses the reveal. Navigation remains useful without JavaScript.

## Do's and Don'ts

### Do:

- **Do** use original SVG symbols and the authored monogram for celestial identity.
- **Do** keep parchment text selectable, readable and clear of decorative geometry.
- **Do** preserve visible labels, keyboard focus, selected-state semantics and reduced-motion behavior.
- **Do** use actual application captures and explicit project-stage labels.

### Don't:

- **Don't** substitute extracted game assets or a screenshot of the approved reference for the interface.
- **Don't** turn stars or emblems into unsupported levels, ratings, metrics or awards.
- **Don't** replace the reading fonts with ornamental identity typography.
- **Don't** trap long content inside a fixed-height game screen or let bottom navigation cover it.
