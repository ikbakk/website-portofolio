# Celestial archive asset register

All emblems, corner ornaments, the monogram and orbit geometry are original SVG artwork authored for this portfolio. No Genshin game files are used.

## Vector sources

- `public/celestial/symbols.svg`: original icon/emblem sprite, individual named symbols.
- `public/celestial/monogram.svg`: original layered I monogram.
- `public/celestial/court.svg`: illustrative badminton court diagram, not an app screenshot.
- `src/components/celestial/IdentityMark.astro`: separate orbital geometry layers.
- Panel material and button surfaces are CSS; text is always real HTML.

## Scenic background

Archived source (WebP quality 90, converted from the original generated PNG): `docs/design/assets/celestial-city.webp`. Generated with imagegen using the accepted mockup only as a reference for the environment's art direction. Source dimensions: 1586 by 992 pixels. Delivery: WebP, with separate desktop and portrait crop sources. Source resolution reflects the actual returned asset, not the requested resolution.

Exact generation prompt:

> Use case: illustration-story. Create an original premium fantasy RPG environment BACKGROUND ASSET for a personal portfolio interface. Reference image is only an art-direction reference for the distant scenery; REMOVE every interface element, frame, circle, monogram, gold orbit, text, logo, icon and button. Output ONLY a scenic painting in landscape aspect ratio about 16:10, 2560x1600 or higher. Hand-painted anime game environment aesthetic, sophisticated atmospheric perspective. Deep midnight navy starry sky occupies upper 70 percent with soft painterly scattered clouds near edges. In bottom 30 percent a distant beautiful white-stone coastal city with classical arches, slender towers, terraces and waterfalls floating on misty high cliffs, serene ocean at very bottom. Moonlit desaturated blue, tiny warm windows, ivory stone in soft moonlight, muted teal haze, very restrained gold light. Center upper-middle must be calm dark navy to support a separately drawn monogram later; right side fairly quiet because a UI panel will cover it. Most architectural interest along lower left edge, not middle. Broad elegant composition, high detailed painting quality, no people, no recognizable existing game landmarks, no giant moon, no bright central light. Entire canvas contains environment scenery only. Absolutely no text or any user interface. No frame or border. This will be used as a CSS background behind live HTML and SVG.

Conversion:

```sh
ffmpeg -i docs/design/assets/celestial-city.webp -c:v libwebp -quality 86 public/celestial/celestial-city.webp
ffmpeg -i docs/design/assets/celestial-city.webp -vf 'crop=650:992:100:0,scale=780:-1' -c:v libwebp -quality 85 public/celestial/celestial-city-mobile.webp
```

## Fonts and project captures

Newsreader, Cinzel and Source Sans 3 are self-hosted through Fontsource packages under SIL Open Font License. Their package license files are retained in installed dependencies. Newsreader supplies the reference's readable serif titles; Cinzel is reserved for the identity label. Source Sans 3 supplies legible body text.

Existing screenshots are retained at `docs/design/assets/sungkargroup-source.png` and `docs/design/assets/ward-monitor-source.png`. Optimized WebP deliveries live in `public/projects/`. Ward Monitor depicts prototype/synthetic patient data. Projects without an actual screenshot use the original emblem with an illustration label.

Standalone icon exports are in `public/celestial/icons/`; regenerate with `bun run assets:svg` after building. `constellation.svg` exports the actual rendered orbit geometry. Font redistribution notices are in `public/celestial/licenses/`.

The opening sigil, circular SVG aperture, navigation brush tracer and selection flare are original inline SVG geometry authored for this portfolio. No extracted game animation assets are used.
