# P1 — Reference measurements and visual-diff cautions

Source of truth: `docs/design/references/01-normal-master.png`, `02-cryo-variant.png`, `03-electro-variant.png`, verified against SHA-256 in `references/README.md`.

## Visible proportions, NOT final CSS values

The three concept images **do not share the same canvas width**. Normal is a wide board at **4608 × 1725**, Cryo **2286 × 1338**, Electro **2277 × 1338**.

Looking at the *visible framed interface* rather than the entire image, the approximate desktop ratio of the content columns is **left 16%, center 51%, right 33%** (before gutter compensation). This is an art-direction clue only: the actual CSS needs measurement from a properly aligned image/browser capture in P2, not a guess based on the 4608px canvas. Rough ratio: **1 : 3.2 : 2.1**.

What the approved image actually shows:

- Left panel starts with a green angular mark, portrait illustration, full name, role, location, status, short intro, nav, About and icons; it is narrow but full height.
- Center panel is top-aligned with small `/ work` kicker, Featured Project card, carousel dots, a row of three Selected Works cards, then a Tech Stack band. There is **no hero marketing headline**.
- Right panel stacks Focus checklist, Playground scene, then GitHub Activity at the bottom. The latter mockup contains **illustrative**, not verified, numbers.
- Bottom of the *board* has a narrow seasonal papercut band: rolling green meadow and leaves for Normal, snowbanks and crystals for Cryo, deep violet hills and flowering branches for Electro.
- Fine thin background grid is visible in Normal and subtle in themed variants; don't paint an atmospheric 100%-height landscape.
- The Cryo/Electro references show altered **illustrative** images that should **not** be used as fabricated project screenshots. Actual project imagery may be theme-neutral.
- There is a tiny theme/weather control in the upper-right header area. In P2 it changes theme statically; weather particles belong to P4.

## Fidelity protocol

1. Confirm actual PNG bytes exist and hashes match; run `node scripts/validate-weather-p1.mjs --strict`.
2. Crop the original Normal design board to the framed layout bounds before comparing against a browser screenshot. The 4608px image contains generous side margins.
3. Align content regions **and** normalize scale independently for Cryo and Electro. Never run naive whole-image pixel-diff on unaligned sources.
4. Measure major card bounding boxes, title baselines, column gaps and vertical alignment. Prioritize these before ornament similarity.
5. Review paper-edge SVGs against the bottom strip. If they compete with text or project images, reduce their footprint.
6. Capture mobile layouts after desktop fidelity is established: mobile compositions were not separately supplied as freeze references, so adapt without contradicting content order.

All visuals are mockups, not production UI. Project/streak/Focus numbers and actual avatar/mark remain subject to truthful source/owner approval.