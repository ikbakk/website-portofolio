# Original frozen visual references — pending binary upload

The three **exact** PNGs approved by the portfolio owner have been identified in the conversation's artifact workspace. They are not invented or regenerated. Upload the originals to **this directory** before beginning P2. The GitHub connector used for the P1 preparation cannot ingest the binary PNGs from the local artifact workspace; do not claim otherwise.

| File | Native dimensions | SHA-256 |
| --- | --- | --- |
| \`01-normal-master.png\` | 4608 × 1725 | \`64c5116914745e6b3677f0ada5bc238a221afd2e963fdf59f5dc07c91a7fdc57\` |
| \`02-cryo-variant.png\` | 2286 × 1338 | \`015d742ea2d4297eaaf2db61ac476e941f467cac0ca4adb9186f0c19ca8109bd\` |
| \`03-electro-variant.png\` | 2277 × 1338 | \`2811e80e892d132647fc2b544d7a6af74cd510baef5254a02367f8707e01a841\` |

**Do not** mistake the three files for three independent page designs: the first is a wider master crop from the agreed comparison board and the other two are narrower theme crops. They are different canvases and cannot be used for naive pixel overlays without cropping/alignment. Preserve their dimensions and provenance; use semantic/region-specific comparisons in addition to screenshots.

A separate file bundle \`portfolio-P1-frozen-references.zip\` was prepared for the owner. Its paths are already organized beneath \`docs/design/references/\`.

After upload, run:

\`\`\`sh
sha256sum docs/design/references/{01-normal-master,02-cryo-variant,03-electro-variant}.png
node scripts/validate-weather-p1.mjs
\`\`\`

Only after verification can this checkpoint be considered fulfilled.