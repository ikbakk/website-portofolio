# Work structure revision — 2026-11-06

The owner requested:
1. A single-column project list with styling consistent with the custom paper buttons.
2. Tech Stack at the bottom of About in the left column.
3. Separate Projects and Experience views, with transitions using the currently active weather effect.
4. Matching project detail pages.
5. Prioritize the necessary work first.

This supersedes the relevant frozen content arrangement. It does not change the 30/40/30 tracks, actual project evidence, theme colors, or existing weather choreography.

## Priority 1 — source prepared, not runtime-verified

- Selected Works now renders one vertical list. Each row reuses PaperControl, including its selected-theme hover, press and focus styling.
- Sungkar Group remains the distinct Featured Project. Beaconnect, CV Builder, Ward Monitor and Courtside are all ordinary project rows; Courtside's former small side link becomes the fourth row. Existing project IDs and destination routes remain intact.
- Rows use genuine screenshots where available and explicitly labelled image fallbacks otherwise. There is no fake application artwork.
- The same seven existing technology labels now live in a shared static data file and render at the bottom of About. The center no longer renders Tech Stack.
- A separate stylesheet scopes the list/stack rules. Short desktop layouts use two navigation columns to reserve room for the moved stack while retaining all existing navigation and keeping the left column non-scrollable.
- Added browser checks for row alignment, stack placement and short-screen left-column clipping.

The execution environment and browser were unavailable during this change. Source was read and edited through the repository connector. **Astro check, Prettier, build, automated browser tests and screenshots have not been run for this revision.** The 720px desktop profile is a specific review target before accepting the moved stack. The earlier P5 results apply only to the previous commit.

## Priority 2 — implement together after structural verification

### Projects / Experience tabs

Use two paper-styled tabs at the top of the center column, above its independent scrolling area. Projects is the default. Each view preserves its own scroll position. Tab state must support keyboard operation, direct #experience links, #project-{id} returns, and browser Back/Forward. Without JavaScript, both sections remain readable through ordinary anchors.

The theme control chooses weather; the content tab chooses a section. Selecting Experience under Cryo must play the Cryo effect and reveal Experience at its midpoint, while the chosen theme remains Cryo. Selecting Projects under Electro must use the Electro sequence, with the existing flash cooldown and reduced-motion alternative.

Refactor the current weather engine to expose a shared transition/midpoint callback. Keep one overlay and one active sequence. Coalesce rapid selections and prevent obsolete callbacks from changing the visible section. Do not copy particles/timelines into a second component, eagerly download GSAP, or add a new animation library. Initial/deep-link restoration should reveal content immediately.

### Project detail pages

Replace the retained Celestial detail layout with the same paper controls, weather tokens, column ornaments and typography. Preserve actual project prose, screenshots, stage disclosures, canonicals and structured data. Keep one h1 for the project title. On narrow screens, prioritize the project reading area over repeating a full profile panel.

Return to Projects and the originating row, with the chosen weather retained across navigation. Central scrolling/fades and mobile document scrolling must remain coherent. Do not silently leave the existing detail-route tests asserting the retired Celestial layout.

## Priority 3 — P5 rerun

After the structural/detail changes: run Astro diagnostics, formatting, production build, widget and build-artifact suites; update and execute the browser scenarios for the new tabs/detail layout. Check 320px mobile, 768px tablet, 1363px desktop at 720px and 936px heights, all three themes, keyboard navigation, no-JavaScript reading, deep links, interrupted transitions and return navigation.

Update bundle measurements after the final structure stabilizes. Previously measured sizes are not proof of this revision's runtime behavior. No merge, deployment, final visual acceptance or P5 sign-off is implied.
