# Source reconnaissance

## Direct source

The supplied route returned server-rendered HTML with the page title, breadcrumb, featured profile, screenshot, footer, and floating navigation. The response identifies Next.js app-router chunks and references two generated stylesheets and two preloaded Geist font subsets. The stylesheet bundles contain the site's light and dark tokens and responsive utilities.

The featured screenshot is served as `1200 × 1600`; the original page declares a `1200 × 750` image box and uses `object-cover`. The local recreation retains that source layout behavior. Related portfolio thumbnails are `1200 × 1600` and use the source's `3:4` cards with top alignment.

## Related profiles

The original related-portfolios component scores category matches at 10 points, tag matches at 2 points, adds 1 for featured entries, and adds 0.5 for items from the last 30 days. The seven local related cards were selected from the bundled source records using that method and the current snapshot date, 2026-11-09. Their names, descriptions, destinations, dates, and image paths are recorded in `related-portfolios.json` and `asset-manifest.json`.

## Limits

The site's bundled source is not a public repository. The browser reconnaissance script could not launch because no compatible system browser is installed. The static source and assets provide strong structure and style evidence, but there are no reference screenshots, post-hydration captures, or browser interaction records. The 3D footer easter egg is therefore excluded; the page's regular navigation, related links, system theme, and pointer spotlight remain represented.

## Rights

No image reuse license is stated in the retrieved page source. The local images are retained for this private reference build with names and source links preserved in the page or manifest. Confirm permission before publishing the copied image assets.
