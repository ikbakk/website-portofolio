# Frozen reference images — uploaded and verified

These are the **exact original design images** recovered from the portfolio conversation. All three PNG files are now present under [references/](references/) and their Git blob SHA values match the source originals. GitHub Actions [run 41663423056](https://github.com/ikbakk/website-portofolio/actions/runs/41663423056) reconstructed the large Normal PNG and passed strict reference validation.

| Image | Native size | SHA-256 |
| --- | --- | --- |
| `01-normal-master.png` | 4608 × 1725 | `64c5116914745e6b3677f0ada5bc238a221afd2e963fdf59f5dc07c91a7fdc57` |
| `02-cryo-variant.png` | 2286 × 1338 | `015d742ea2d4297eaaf2db61ac476e941f467cac0ca4adb9186f0c19ca8109bd` |
| `03-electro-variant.png` | 2277 × 1338 | `2811e80e892d132647fc2b544d7a6af74cd510baef5254a02367f8707e01a841` |

## Verification

Run `node scripts/validate-weather-p1.mjs --strict` and `sha256sum docs/design/references/*.png` in a branch checkout. The expected SHA-256 values appear in the table above. All three original file paths are committed; there is **no remaining manual upload**.

## Fidelity notes from visual inspection

- The **Normal master** is a three-column page with a left profile, center work area and right Focus/Playground/GitHub widgets. A subtle grid, low hills along the lower edge and tiny botanical ornaments are present.
- Cryo and Electro follow the same composition and content but have different native image dimensions and theme palettes; compare **layout proportions**, not raw pixel equality across differently sized source images.
- The mockup uses an illustrated Beaconnect project tile and three stylized Selected Works thumbnails; the owner subsequently **superseded that implementation detail**: P2 must use genuine project screenshots when available. Do not recreate the fake mockup artwork as production screenshots.
- The Playground widget is a layout placeholder until P3. Do not spend P1 making pixel-game SVGs.
- The Focus checklist, GitHub counts and activity percentages are illustrative only. Do not ship as verified personal data.
- A screenshot in the mockup is not evidence of a live product or a published release.

**Gate status:** Source-reference gate complete. P1 visual direction is locked; only the three `horizon.svg` assets are active. The logo treatment needs owner review, and horizon/browser layout placement will be verified in P2 after explicit implementation approval.
