# Jaymark Ancheta Portfolio Clone

## Source

- URL: https://pafolios.com/jaymark-ancheta
- Source repository: no matching public repository found in the GitHub repository search
- Page author: Pafolios; featured portfolio: Jaymark Ancheta
- License: no reuse license was found in the page source. Keep this as a private local reference unless the image owners confirm public reuse.
- Attribution: creator names remain visible on related portfolio cards; the featured screenshot is identified as Jaymark Ancheta's.

## Technical evidence

- The page is a server-rendered Next.js route. Its source HTML references Next app-router chunks, Tailwind-generated CSS, Geist, and Geist Mono.
- CSS, font subsets, the featured screenshot, and seven related screenshots are stored locally under `assets/pafolios/`.
- The raw page response is kept at `index-original.html`. Extracted related profile data and asset provenance are in `RECON/`.

## Pre-build estimate

- Complexity: L3, content page with client-loaded related portfolios and a themed app shell.
- Mode: faithful static recreation from the route's rendered HTML, CSS, font files, and bundled data.
- Close match: page hierarchy, typography, theme tokens, featured image, related cards, floating navigation, and footer.
- Approximated: the footer's spotlight reveal is retained, while its original 3D tile-burst easter egg and sponsor injection are omitted.
- Not cloned: Pafolios backend, recommendations service, analytics, and other routes beyond outbound navigation.
- Risk: image reuse terms are not stated in the retrieved source. Do not publish the local asset set without confirming permission.

## Run locally

```bash
python3 -m http.server 8123
```

Open `http://localhost:8123/`.

## Changes from source

- Rebuilt the visible route as `index.html` and removed the Next.js runtime and hydration scripts.
- Replaced the loading skeleton for related profiles with the seven records selected by the source bundle's own category/tag ranking logic at the current snapshot date.
- Kept working external links to Jaymark's site and Pafolios navigation.
- Localized the original typefaces and every displayed portfolio screenshot.

## Verification

- Static HTML parsing: all tags closed, no duplicate IDs, all local image paths resolve, and all in-page anchors resolve.
- Source CSS/font URL scan: every font reference resolves to a local file.
- Browser screenshots and click probes were unavailable because this environment has no compatible system browser. No visual or browser-runtime result is claimed.
- The local HTML's primary link, card destinations, and system-theme behavior were reviewed from source and markup; interactive browser behavior remains unverified.
