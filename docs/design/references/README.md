# Frozen portfolio mockup references — verified exact originals

All three **original approved PNGs** are now committed under this directory. Their pixel content and encoded bytes were not resized, filtered, regenerated, or re-compressed.

| Reference | Native dimensions | Byte length | SHA-256 |
| --- | --- | ---: | --- |
| `01-normal-master.png` | 4608 × 1725 | 4,124,397 | `64c5116914745e6b3677f0ada5bc238a221afd2e963fdf59f5dc07c91a7fdc57` |
| `02-cryo-variant.png` | 2286 × 1338 | 2,221,599 | `015d742ea2d4297eaaf2db61ac476e941f467cac0ca4adb9186f0c19ca8109bd` |
| `03-electro-variant.png` | 2277 × 1338 | 2,341,982 | `2811e80e892d132647fc2b544d7a6af74cd510baef5254a02367f8707e01a841` |

## Verification

From this branch's checkout:

```sh
node scripts/validate-weather-p1.mjs --strict
sha256sum docs/design/references/*.png
```

These checks passed in GitHub Actions on **2026-11-03**, run [41663423056](https://github.com/ikbakk/website-portofolio/actions/runs/41663423056). The first PNG was restored byte-for-byte by that run from two checked Git blobs because a single upload exceeded the connector's request limit. The temporary parts and one-time workflow were subsequently removed; the exact PNG now lives directly in the repository.

## Visual authority

The Normal image is a **wide master**; Cryo and Electro are **narrower theme crops**. They share content structure but not canvas dimensions, so don't assume pixel alignment across them without matched crops. The owner later superseded mockup's illustrative project artwork with a requirement for **actual screenshots**, and deferred Playground mechanics. Never treat fake metrics, focus checkmarks, or illustration screenshots as factual UI data.

Keep these originals in version control for P2 visual-regression comparison; do not substitute an approximation or regenerated image.
