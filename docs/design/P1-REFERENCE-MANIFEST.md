# Frozen reference images — identified, not yet uploaded to GitHub

These are the original design images recovered from the portfolio conversation's local artifact directory. The **exact original bytes** are included in the owner review archive `portfolio-p1-frozen-reference-pack.zip` delivered in chat. They are **not** in this Git repository yet; do not claim otherwise.

| Image | Native size | SHA-256 |
| --- | --- | --- |
| `01-normal-master.png` | 4608 × 1725 | `64c5116914745e6b3677f0ada5bc238a221afd2e963fdf59f5dc07c91a7fdc57` |
| `02-cryo-variant.png` | 2286 × 1338 | `015d742ea2d4297eaaf2db61ac476e941f467cac0ca4adb9186f0c19ca8109bd` |
| `03-electro-variant.png` | 2277 × 1338 | `2811e80e892d132647fc2b544d7a6af74cd510baef5254a02367f8707e01a841` |

## Required handoff

1. Copy the original PNG files from the archive to `docs/design/references/` without resizing or editing. Run `bash scripts/import-p1-references.sh /path/to/portfolio-p1-frozen-reference-pack.zip` from the repository root (or pass a directory containing the three files).
2. Compare `sha256sum docs/design/references/*.png` against the hashes above.
3. Keep the reference files in a separate P1-only commit; no layout or dependency edits.
4. Ask the owner to review the **actual** assets in-context. The written approval for the three weather concepts is not automatic acceptance of these P1 starter ornaments.

## Fidelity notes from visual inspection

- The **Normal master** is a three-column page with a left profile, center work area and right Focus/Playground/GitHub widgets. A subtle grid, low hills along the lower edge and tiny botanical ornaments are present.
- Cryo and Electro follow the same composition and content but have different native image dimensions and theme palettes; compare **layout proportions**, not raw pixel equality across differently sized source images.
- The mockup uses an illustrated Beaconnect project tile and three stylized Selected Works thumbnails; the owner subsequently **superseded that implementation detail**: P2 must use genuine project screenshots when available. Do not recreate the fake mockup artwork as production screenshots.
- The Playground widget is a layout placeholder until P3. Do not spend P1 making pixel-game SVGs.
- The Focus checklist, GitHub counts and activity percentages are illustrative only. Do not ship as verified personal data.
- A screenshot in the mockup is not evidence of a live product or a published release.

**Gate status:** P1 visual direction is approved, with only the three `horizon.svg` assets active. The strict reference-import gate stays blocked until the exact original PNGs are in the repository. Scale/contrast must be verified from P2 browser captures before approving the implementation.
