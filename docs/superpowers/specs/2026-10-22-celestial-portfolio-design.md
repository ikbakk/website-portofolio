# Celestial archive portfolio: design specification

Status: written specification reviewed and accepted by the owner; implementation
plan review pending. Astro and Tailwind CSS are mandatory.

## Goal and approved reference

Redesign `ikbak.vercel.app` for Muhammad Iqbal Firdaus. Recruiters and freelance
clients have equal priority. Use Astro and Tailwind CSS with TypeScript. The owner
rejected four conventional portfolio directions and explicitly chose UI inspired
by Genshin Impact. The accepted reference is
`docs/design/celestial-archive-reference.webp`.

The owner emphasized faithful implementation and actual SVG assets. The reference
is a visual target, not a full-page background image. Literal image-pixel identity
cannot hold across different viewport sizes, font rendering and dynamic content;
preserve composition, materials, proportions, icon language and interaction quality.

## Visual system

- A desaturated midnight-blue celestial environment behind an ivory profile panel.
- Restrained pale-gold strokes, clipped panel corners, thin double borders,
  constellation lines and carefully placed star ornaments.
- Original project emblems and a large original `I` monogram as the identity artifact.
- Legible display serif for names/headings and humanist sans for body/navigation.
  Self-hosted fonts must be selected with their actual licenses during implementation.
- Initial token targets: sky `#14263D`, deep sky `#0C1829`, ivory `#F2EBDD`,
  gold `#CBB88F`, dark ink `#25354B`, muted ink `#5C6574`.
  Adjust tokens to sampled reference colors and measured contrast during the build.
- Texture and glows remain subordinate to readable content. No invented levels,
  stars, skill percentages, experience points, credentials or awards.

## Asset architecture

| Asset | Format | Implementation contract |
|---|---|---|
| Celestial city, clouds and sky | Generated raster, WebP/AVIF delivery | Original scene without UI, text, logos or baked panel decorations; desktop/mobile crops; responsive delivery |
| Panel outlines and corner ornaments | SVG plus CSS | Small reusable pieces with `viewBox`; stretchable body/borders preserve corner proportions |
| Ivory panel material | CSS with optional small texture | Keep panel text selectable; material must remain legible when imagery is disabled |
| Gold/ivory action controls | HTML/CSS plus SVG ornaments | Real anchors/buttons, native focus/press behavior; labels never baked into assets |
| Profile, project, experience, contact icons | SVG | Original coherent stroke geometry; inherited color; clear active/disabled states |
| Project emblems | SVG | Tourism, badminton, connection and document motifs; original designs |
| Central `I` monogram and orbital geometry | SVG | Separate layers for mark, rings and stars; decorative layers excluded from accessibility tree |
| Real project captures | Existing/new verified raster screenshots | Display actual application imagery separately from the fantasy interface |
| OG image and favicon | Raster OG, SVG favicon | Derived from the new original identity, with correct origin metadata |

Asset directories: `public/celestial/` for authored images/SVGs and
`src/components/celestial/` for reusable accessible components. Keep raster sources
and exact generation prompts traceable. Do not extract Genshin game assets or
ship the approved mockup as the functional interface. No whole-panel SVG containing
product text, foreign objects or scripted interactions.

## Desktop composition

- Full-bleed atmospheric environment. The composition occupies the browser viewport;
  the mockup's external device frame, phone shell and presentation-board caption are
  excluded from the website.
- Visible top navigation: Profile, Projects, Experience, Contact. Each combines a
  small emblem with a readable label and visible active indicator.
- Left project rail: four original circular project emblems with accessible names.
- Center: identity monogram and restrained orbital lines, role, View projects and
  Open resume controls.
- Right: ivory profile dossier with name, role, location and concise factual details;
  a selected-project preview below. Preserve the reference's balance between the
  central emblem and readable dossier.
- The lower project archive shown in the reference may complement the rail at wide
  widths. At smaller desktop widths, retain one project selector to avoid collision.
- Long content scrolls naturally. Do not trap scrolling in a fixed-height game screen.

## Content and navigation

- Profile presents the owner and offers work/resume access immediately.
- Projects opens the archive, updating the highlighted emblem and project dossier.
  Selection is encoded in the URL so it survives refresh and browser navigation.
- Every published project gets a readable case-study route with problem, contribution,
  decisions, stack, project stage, evidence and real links. Reuse the celestial shell
  while providing more reading space than the compact home dossier.
- Proposed home selection: Courtside, Sungkar Group, Beaconnect and CV Builder.
  Preserve Ward Monitor as an additional archive entry and case study.
- Courtside is supported by its actual repository. Verify current capabilities before
  writing new case-study claims. Existing alpha/prototype stages remain explicit.
- Experience uses only verified resume content. Omit unsupported employment dates
  or claims rather than inventing game statistics.
- Contact exposes actual email/GitHub/LinkedIn links; the resume remains a real PDF
  link with a download option. A themed 404 offers a clear route back to the archive.
- SSR content and real links provide a useful experience before JavaScript runs.
  No backend, login or database is required for this portfolio redesign.

## Responsive behavior

- Desktop preserves the center identity artifact and right-hand ivory dossier.
- Tablet reduces the monogram and combines project selectors before text becomes narrow.
- Mobile uses a compact header, smaller identity emblem, full-width dossier, clear
  work/resume actions and one project dossier below; persistent bottom navigation
  respects safe-area insets and never covers the final content.
- Mobile project selectors are horizontal buttons, not tiny desktop rail replicas.
- Test representative widths 390, 768, 1280 and 1440 pixels, plus 320px overflow safety.
  Longer names, project titles and keyboard zoom must not clip or overlap ornaments.

## Interaction and motion

- Signature: selecting a project illuminates its emblem and transitions the dossier
  content with a brief coordinated crossfade/translation. Use GSAP's existing runtime;
  clean up page-specific animation on Astro navigation.
- Orbit layers may rotate extremely slowly when visible; page-hidden and reduced-motion
  modes stop ambient motion. No required wait, fake loading sequence or scroll hijacking.
- Button press, hover and visible keyboard focus share a restrained gold/ivory language.
- Reduced-motion and JavaScript-disabled paths expose complete readable content.

## Acceptance evidence

- Compare screenshot captures against the accepted reference using identical viewport
  dimensions; inspect background, panel silhouette, central mark, spacing and text hierarchy.
- Verify desktop and mobile composition, keyboard navigation, URL/back behavior, project
  selection, resume download, contact links, case pages and 404 on a production build.
- Check contrast, reduced motion, image delivery, layout shift, console errors and overflow.
- Fix the existing wrong site origins and missing share image as part of release preparation.
- Document observed performance. Do not claim a measured score or pixel-identical match
  without the corresponding evidence.

## Scope and review boundary

This document records the accepted visual direction and a concrete implementation
contract. It does not yet authorize merging or production deployment. The
owner accepted this written specification. The separate implementation plan is the
next review boundary before code work.
