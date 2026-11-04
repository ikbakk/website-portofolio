# Element emblems

The owner requested Genshin Impact elemental emblems for the static weather/theme controls.

- Green Meadow (`normal`) → Dendro
- Blizzard (`cryo`) → Cryo
- Storm (`electro`) → Electro

SVG path source: `genshin-icon` 1.0.20-alpha2, published by Clément Champouillon, https://www.npmjs.com/package/genshin-icon . The source package is MIT-licensed; its notice is included at `/licenses/genshin-icons-MIT.txt`. Genshin Impact elemental identities belong to miHoYo / HoYoverse.

Only the three path definitions were ported. No React component or package runtime was installed. Changes: explicit static colors for visibility, standalone SVG wrappers, and correction of the upstream Electro viewBox to `0 0 14 14`.

Column paper and pixel ornaments are separate, original project SVGs; they are not game assets.
