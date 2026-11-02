# P1 — Soft Grid / Weather Themes (active homepage design contract)

Status: **P1 foundation committed; visual/final P1 approval pending**. The owner approved the three visual directions and the core layout, but this commit does not approve P2 implementation.

## Current visual authority

1. The owner-approved **three-theme frozen mockup** from the portfolio design conversation is the visual authority. Capture the actual approved high-resolution images under \`docs/design/references/\` before any P2 layout work. **This repository currently does not contain those frozen images.** Do not substitute AI-regenerated compositions or infer exact measurements from written prose.
2. This document records immutable composition rules for P1. The theme values in \`src/styles/weather-themes.tokens.css\` define the three approved color directions.
3. \`DESIGN.md\` still documents the historical Celestial experience; it is **not the governing homepage design** for this branch. Existing case-study routes remain untouched until explicitly scoped.

## Frozen desktop composition

| Area | Content (top-to-bottom) | Constraint |
| --- | --- | --- |
| Left / identity | Profile image or approved avatar, name, role, location, availability, brief bio, About Me, navigation, social links | Not a pagination rail. A small personal introduction belongs here, **not** in the center. |
| Center / work | Featured Project, Selected Works, Tech Stack | **No standalone hero**. A small \`/ work\` section label is acceptable. Real project imagery and honest stage labels. |
| Right / personal widgets | Focus, Playground slot, GitHub Activity **at bottom** | Playful, but legible. The Playground is a reserved slot; its mini-game and library decision are deferred. |

The **same content, card geometry, typography, spacing and order** appear in Normal, Cryo and Electro. Only approved theme colors, surface materials, light ornament assets and future effects change. The background is nearly blank with a subtle fine grid; large full-viewport mountains, floating trees, game UI chrome and generic dashboard rearrangements are prohibited.

## Art direction locked

- **Normal / Green Meadow** is default: \`#269B43\` accent, \`#F7F8F2\` background, \`#17482C\` dark functional ink.
- **Cryo / Blizzard**: \`#50A9D1\` accent, \`#F0F7FA\` background, \`#20536C\` functional ink.
- **Electro / Storm**: \`#A178EE\` accent, \`#201A35\` background, \`#E8DDFB\` readable light ink. Dark panels must remain readable.
- Papercut is the **primary material language**, pixel details are small and secondary. No copyrighted Genshin or motorsport logos, game assets or copied interface patterns.
- Theme ornament should stay inside/at edges of the panels and widgets; it must not dominate the document.
- Theme selection is user-driven (not live weather). Theme changes are **static** in P2. Falling snow, lightning, trails, cursor replacements, GSAP and Lenis belong to **P4**.

## P1 scope

Included: theme tokens and identifiers, static ornamental SVG prototypes, sourcing/licensing rules, truthful image inventory, and a repeatable fidelity/approval checklist.

Excluded: replacing \`index.astro\`, altering \`BaseLayout.astro\`, importing the new tokens, installing dependencies, implementing a mini-game, any animated behavior, smooth scroll, GitHub GraphQL, deployment, or merging to \`main\`.

### Not yet final

- Approved mockup image bytes need to be stored in the repository before visual implementation begins.
- Final card dimensions, typography scale and responsive breakpoints must be **measured from the approved reference and browser captures**, not guessed.
- The published \`public/logo-mark.svg\` currently uses black/cream/orange, whereas this approved theme is green; the actual logo to ship needs an explicit brand asset review before replacing any identity.
- The SVG ornaments in \`public/weather\` are deliberately **small starter assets**, not a claim that final papercut fidelity has already been achieved. P1 final requires visual sign-off on the ornaments in-context.

See [asset inventory](P1-ASSETS.md), [library decisions](P1-LIBRARIES.md), and [fidelity gate](P1-FIDELITY-GATE.md).