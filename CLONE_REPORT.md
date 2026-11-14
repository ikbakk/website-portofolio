# Jaymark Ancheta · Clone report

## Conclusion

- Complexity: L3 content route with client-rendered related portfolios.
- Mode: faithful static recreation based on the route's rendered HTML, source CSS, local fonts, and bundled portfolio data.
- Estimated fidelity: strong structure and styling match from source evidence; browser comparison is unverified.
- Best use: local reference or a starting point for a portfolio redesign. Confirm asset rights before public deployment.

## Comparison

| Dimension | Source | Local recreation | Result |
|---|---|---|---|
| Information architecture | Breadcrumb, profile/date, Visit site, related portfolios, floating navigation, footer | Same visible hierarchy and seven source-selected related profiles | Close structural match |
| Visual language | Geist, Tailwind utility styles, HSL light/dark variables, rounded image/cards | Local source CSS, Geist files, original screenshots, same utility classes | High source-level match; no screenshot diff |
| Motion and interactions | Hover states, responsive links, footer pointer spotlight, 3D tile-burst easter egg | Links, system theme, hover states, pointer spotlight | Tile-burst omitted |
| Responsive behavior | Source CSS defines one/two/four-column related cards and responsive footer/nav spacing | Source CSS reused directly | Breakpoints not browser verified |
| Content | Jaymark profile page plus category-related profiles | Original profile copy and source data retained | Exact main content; related list is a static snapshot |
| Functional boundary | Next runtime, routing, recommendations, and remote site navigation | Static local HTML with external links to original routes | Backend and live recommendation behavior omitted |

## Scores (0-5)

- Source evidence: 3
- Structure fidelity: 4
- Visual fidelity: 4
- Motion/interactions: 2
- Responsive behavior: 3
- Functional completeness: 3
- Content fidelity: 5
- Rights/deployment risk: 2
- Overall: 3.3 / 5

## Known gaps

- Browser screenshots at 1440, 768, and 390 widths were not captured because the environment has no compatible system browser.
- The source's 3D footer tile burst and dynamic sponsor mixing are omitted.
- The source's related-profile logic is represented as the seven-item snapshot selected on 2026-11-09, not a live recommendation feed.
- The portfolio screenshot and related portfolio images do not have a reuse license stated in the page source.
