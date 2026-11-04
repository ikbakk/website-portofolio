# P1 — Soft Grid / Weather Themes (active homepage design contract)

Status: **P1 design decisions locked; exact frozen PNG files committed and verified; P2 implementation authorized by the owner’s 2026-11-04 continuation request; final visual acceptance pending**. The owner approved the three visual directions and the core layout, but this commit does not approve P2 implementation.

## Current visual authority

1. The owner-approved **three-theme frozen mockup** from the portfolio design conversation is the visual authority. The exact original images are committed under [docs/design/references/](references/) and their hashes are listed in [the reference manifest](P1-REFERENCE-MANIFEST.md); the strict source check passed in [GitHub Actions run 41663423056](https://github.com/ikbakk/website-portofolio/actions/runs/41663423056). Do not substitute AI-regenerated compositions or infer exact measurements from written prose.
2. This document records immutable composition rules for P1. The theme values in `src/styles/weather-themes.tokens.css` define the three approved color directions.
3. `DESIGN.md` still documents the historical Celestial experience; it is **not the governing homepage design** for this branch. Existing case-study routes remain untouched until explicitly scoped.

## Frozen desktop composition

| Area | Content (top-to-bottom) | Constraint |
| --- | --- | --- |
| Left / identity | Profile image or approved avatar, name, role, location, availability, brief bio, About Me, navigation, social links | Not a pagination rail. A small personal introduction belongs here, **not** in the center. |
| Center / work | Featured Project, Selected Works, Tech Stack | **No standalone hero**. A small `/ work` section label is acceptable. Real project imagery and honest stage labels. |
| Right / personal widgets | Focus, Playground slot, GitHub Activity **at bottom** | Playful, but legible. The Playground is a reserved slot; its mini-game and library decision are deferred. |

The **same content, card geometry, typography, spacing and order** appear in Normal, Cryo and Electro. Only approved theme colors, surface materials, light ornament assets and future effects change. The background is nearly blank with a subtle fine grid; large full-viewport mountains, floating trees, game UI chrome and generic dashboard rearrangements are prohibited.

## Art direction locked

- **Normal / Green Meadow** is default: `#269B43` accent, `#F7F8F2` background, `#17482C` dark functional ink.
- **Cryo / Blizzard**: `#50A9D1` accent, `#F0F7FA` background, `#20536C` functional ink.
- **Electro / Storm**: `#A178EE` accent, `#201A35` background, `#E8DDFB` readable light ink. Dark panels must remain readable.
- Papercut is the **primary material language**, pixel details are small and secondary. No copyrighted Genshin or motorsport logos, game assets or copied interface patterns.
- Approved weather artwork is a **narrow bottom horizon strip**, anchored behind the three columns; do not place its landscape inside project cards. `edge.svg` and `corner.svg` prototypes are excluded from P2. The decorative horizon must never dominate the page.
- Theme selection is user-driven (not live weather). Theme changes are **static** in P2. Falling snow, lightning, trails, cursor replacements, GSAP and Lenis belong to **P4**.

## P1 scope

Included: theme tokens and identifiers, static ornamental SVG prototypes, sourcing/licensing rules, truthful image inventory, and a repeatable fidelity/approval checklist.

Excluded: replacing `index.astro`, altering `BaseLayout.astro`, importing the new tokens, installing dependencies, implementing a mini-game, any animated behavior, smooth scroll, GitHub GraphQL, deployment, or merging to `main`.

### Not yet final

- Approved mockup image bytes are committed and SHA-256 verified; preserve them unchanged.
- Final card dimensions, typography scale and responsive breakpoints must be **measured from the approved reference and browser captures**, not guessed.
- The published `public/logo-mark.svg` currently uses black/cream/orange, whereas this approved theme is green; the actual logo to ship needs an explicit brand asset review before replacing any identity.
- The owner approved the `horizon.svg` motif family, recorded in [P1-SIGNOFF.md](P1-SIGNOFF.md). The six `edge.svg`/`corner.svg` experiments are inactive. Exact scale/contrast inside Astro still requires browser verification during P2.

See [asset inventory](P1-ASSETS.md), [library decisions](P1-LIBRARIES.md), and [fidelity gate](P1-FIDELITY-GATE.md).
## Contrast implementation note (P1 audit)

The visible accent is **not automatically an accessible text or button color**. Approximate computed WCAG 2.x contrast against white:
- Normal primary `#269B43`: **3.59:1**.
- Cryo primary `#50A9D1`: **2.65:1**.
- Electro primary `#A178EE`: **3.26:1** (on white; Electro is dark).

Keep accent tokens unchanged for fidelity. Use `--weather-action-bg` / `--weather-action-text` for filled buttons and `--weather-primary-ink` for readable text labels; verify actual UI combinations in the browser during P2. Decorative strokes and heatmap cells have different requirements from text. No theme should depend solely on color to signal a state.

An approved reference uses thin **bottom-edge** meadow, ice and violet paper landscapes. This is a narrow exception to the minimal background rule; it is not permission for a large illustrated page background.
