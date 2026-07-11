# Field notes from a frontend engineer

> A working engineer's portfolio. Three projects, a real toolkit, and a
> short note on how I work. Bound to the WeChat token system so the
> page reads like a quiet working canvas instead of a marketing
> template.

A pixel-exact Astro 5 + Tailwind v4 + GSAP clone of the source artifact
`frontend-engineer-portfolio.html` / `identity.html`, with the chrome
(topbar, spine, tweaks panel, view transitions, motion language) and
the data layer (12 frozen TS modules) split into testable pieces.

## Stack

| Layer        | Choice                                                                 | Why                                                                    |
| ------------ | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Framework    | Astro 5 (`^7.0.7` in this repo)                                         | Multi-page is cleaner than one giant scroll; `<ClientRouter />` for cross-page motion |
| Styling      | Tailwind CSS v4 via `@tailwindcss/vite` + `@theme` block                | The 49 design tokens live in `:root`; Tailwind utilities compose on top |
| Motion       | GSAP 3.15                                                              | One timeline per surface, `prefers-reduced-motion` honored in CSS + runtime |
| Fonts        | `@fontsource-variable/{newsreader, ibm-plex-sans, jetbrains-mono}`      | Self-hosted, no Google CDN                                             |
| Language     | TypeScript (strict)                                                    | All components, layouts, data, and config                              |
| Data layer   | 12 plain TS modules under `src/data/`                                  | One file per concern; components take props, never hardcode strings   |
| Images       | Astro `<Image />` (configured for future project screenshots)          | Today's slots are honest `data-state="empty"` placeholders             |

## Routes

The portfolio is a single page; the identity deck is its own route.

| Path        | Page                  | What it is                                  |
| ----------- | --------------------- | ------------------------------------------- |
| `/`         | All 5 folios as sections of one page | Field note -> Selected work -> Toolkit -> Approach -> Contact -> Colophon |
| `/identity` | identity deck         | 4 mark directions + apply section           |

The home page is one long scroll with five `<article id="page-0N">` sections
linked by anchor. The spine markers are `<a href="#page-0N">` and the
scroll-spy script (src/lib/scroll-spy.ts) updates the active marker as the
user scrolls. The topbar's mark uses `href="#page-01"` so it scrolls back
to the top instead of reloading. The tweaks panel still links to
`/identity` for the full mark directions deck.

## Source tree

```
portfolio/
├── astro.config.mjs                    # vite: { plugins: [tailwindcss()] }
├── tailwind.config.ts                  # theme.extend mirrors the 49 :root vars
├── tsconfig.json                       # @/* path alias
├── package.json
├── public/
│   ├── favicon.svg / favicon.ico
│   └── (resume.pdf goes here)
├── src/
│   ├── assets/projects/                # future 01.webp, 02.webp, 03.webp
│   ├── content/projects/               # Astro content collection
│   │   ├── config.ts                   # Zod schema (number, year, title)
│   │   ├── 01.md
│   │   ├── 02.md
│   │   └── 03.md
│   ├── data/                           # PURE DATA, no JSX/HTML/classes
│   │   ├── profile.ts
│   │   ├── nav.ts
│   │   ├── marks.ts
│   │   ├── hero.ts
│   │   ├── projects.ts
│   │   ├── toolkit.ts
│   │   ├── approach.ts
│   │   ├── contact.ts
│   │   ├── colophon.ts
│   │   ├── tokens.ts
│   │   ├── seo.ts
│   │   └── colors.json                 # theme-color hex literals (grep-exempt)
│   ├── lib/                            # runtime utilities
│   │   ├── motion.ts                   # gsapEasings, entryStagger, scrollReveal, hoverLift, progressHairline, killAllTweens
│   │   ├── direction.ts                # mark-direction localStorage reader/writer
│   │   ├── clock.ts                    # live timezone + clock ticker
│   │   ├── progress.ts                 # rAF scroll tracker
│   │   ├── scroll-spy.ts               # in-page section -> active spine marker
│   │   └── view-transitions.ts         # GSAP ↔ ClientRouter glue
│   ├── components/                     # presentational, props only
│   │   ├── Topbar.astro
│   │   ├── Spine.astro
│   │   ├── Folio.astro
│   │   ├── FolioBar.astro
│   │   ├── FolioNumber.astro
│   │   ├── ProjectEntry.astro
│   │   ├── ProjectScreenshot.astro
│   │   ├── ToolkitItem.astro
│   │   ├── ContactRow.astro
│   │   ├── Colophon.astro
│   │   ├── SkipLink.astro
│   │   ├── Mark.astro                  # 4 mark variants; switches on body[data-direction]
│   │   └── TweaksPanel.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── styles/
│   │   ├── global.css                  # 49 :root tokens + @theme bridge + base reset
│   │   ├── components.css              # portfolio + tweaks + folio layout
│   │   └── identity.css                # identity page + showcase + swatch chips
│   └── pages/
│       ├── index.astro                # the entire portfolio (5 sections)
│       └── identity.astro             # 4 mark directions deck
└── README.md
```

## Data layer discipline

Every visible string in an `.astro` file comes from a prop or
`import { ... } from '../data/...'`. Grep your own output:

```bash
# raw hex outside global.css / colors.json
grep -rEn '#[0-9a-fA-F]{3,8}' src --include='*.astro' --include='*.ts' --include='*.tsx' | grep -v 'global.css'
# -> 0 matches

# inline style attributes
grep -rEn 'style="' src --include='*.astro' --include='*.tsx'
# -> 0 matches

# em dashes / en dashes / scrollIntoView
grep -rEn '—|–|scrollIntoView' src
# -> 0 matches

# duplicate data-od-id
grep -rhoE 'data-od-id="[^"]+"' src | sort | uniq -d
# -> 0 duplicates

# localStorage key for mark direction is the canonical "mark-direction"
grep -rn 'mark-direction' src/lib
# -> STORAGE_KEY = "mark-direction"
```

Each `data/*.ts` file exports a frozen object (`as const` plus
`Object.freeze` is fine, or a typed `const`). Astro content collections
in `src/content/projects/` use a Zod schema in
`src/content.config.ts`.

## Motion language

One curve, three durations, transform + opacity only.

| Token                         | Source            | Use                                          |
| ----------------------------- | ----------------- | -------------------------------------------- |
| `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` | original | every transition and every GSAP tween        |
| `--motion-fast: 180ms`        | original          | hover, focus, state toggle                   |
| `--motion-base: 320ms`        | original          | topbar background swap, spine marker scale   |
| `--motion-reveal: 500ms`      | original          | entry stagger, scroll reveal                 |

`src/lib/motion.ts` exports:

- `gsapEasings.out = 'power3.out'` (GSAP's `power3.out` is
  `cubic-bezier(0.23, 1, 0.32, 1)` — the same curve)
- `entryStagger(elements)` — `y: 12 -> 0` + `opacity: 0 -> 1` over
  500ms with 80ms index step
- `scrollReveal(elements)` — `IntersectionObserver` + one-shot GSAP
  tween, 60ms source-order stagger
- `hoverLift(el, distance)` — 180ms `y: 0 -> -distance`
- `progressHairline(progress)` — `scaleX: progress` on topbar hairline
  and spine fill (both read `--progress`)
- `isReducedMotion()` — `true` if the user prefers reduced motion;
  every function short-circuits

`prefers-reduced-motion` is honored in two places:

1. `global.css` has a `@media (prefers-reduced-motion: reduce)` block
   that strips every CSS animation / transition.
2. `isReducedMotion()` in `motion.ts` makes every GSAP timeline a
   no-op. Belt and braces.

View transitions are wired by `<ClientRouter />` in the head, but only
`/identity` triggers a real page swap; the home page is one long scroll:

- `astro:before-swap` calls `killAllTweens()` to avoid memory leaks
- `astro:page-load` re-runs the entry stagger and IntersectionObserver
  setup, and (re)starts the scroll-spy listener
- On the home page, the spine markers are `<a href="#page-0N">` anchors
  and the scroll-spy (`src/lib/scroll-spy.ts`) updates the active marker
  as the user scrolls between sections
- On `/identity`, the spine markers are real Astro routes, so the
  multi-page navigation kicks in instead

## Behavior preserved

These details are easy to lose in a clone; all preserved:

1. **Topbar scroll-aware state.** `.topbar.is-scrolled` adds background
   tint + border-bottom at `scrollY > 80`.
2. **Topbar progress hairline.** 1px bar at the bottom of the topbar
   that scales from `scaleX(0)` to `scaleX(1)` as the document scrolls.
   Same `--progress` also drives the spine line fill.
3. **Topbar section indicator.** `01 / Field note` on the right. The
   number is accent green; the name is fg.
4. **Spine markers.** Past = filled with `--fg`; current = filled with
   `--accent` and scaled to 1.18; future = outlined. Tooltip fades in
   on hover/focus. Click navigates.
5. **Active marker** has `aria-current="true"`. Server-rendered on
   first paint.
6. **Spine line fill** scales with `--progress`. Same value as the
   topbar hairline.
7. **Status dot pulse** in the topbar. Stops on
   `prefers-reduced-motion: reduce`.
8. **Live local clock** in the colophon + the hero marginalia. Uses
   `Intl.DateTimeFormat`. Tick interval 30s; pauses via
   `document.visibilityState`.
9. **Notebook grid background** on every `page-inner`. 32px vertical,
   `--fg` at 4% mix, masked to fade 0 to 70% of page height.
10. **Folio number** in the bottom-right of each `page-inner`:
    `01 / field note` in mono, `--text-xs`, `--muted`.
    `pointer-events: none`.
11. **Screenshot slots** with `data-state="empty"`. When an `<img>`
    lands inside, the state flips to `"filled"`. `"loading"` shows a
    small CSS spinner.
12. **Tweaks panel** in the bottom-right. 4 tiles, one per mark
    direction. Click sets `body[data-direction]` and writes to
    `localStorage['mark-direction']`.
13. **`data-od-id`** on every top-level inspectable element. The
    original IDs are preserved (`page-01`, `page-02`, ... `page-05`,
    `folio-01` ... `folio-05`, `topbar`, `spine`, `tweaks`, etc.).
14. **`role="banner"`** on topbar, **`role="contentinfo"`** on colophon,
    **`aria-label`** on every nav and spine marker,
    **`aria-current="true"`** on the active marker.
15. **Skip link** as the first child of `<body>`, targets `#main`.
16. **Theme-color meta** for both light and dark.
17. **View transitions.** `<ClientRouter />` in the head;
    `transition:persist` on `Topbar`, `Spine`, `TweaksPanel`.
18. **GSAP + ClientRouter glue.** `astro:page-load` re-runs entry
    stagger; `astro:before-swap` kills active tweens.

## Commands

```bash
# install
bun install

# dev (background)
bunx astro dev --background

# build
bunx astro build

# preview the built site
bunx astro preview

# typecheck
bunx tsc --noEmit
```

The dev server runs on `http://localhost:4321` by default. Astro 5+
ships a `astro dev --background` mode for long-running watchers.

## Acceptance gate

All 10 checks pass (see the brief in `.source/portfolio-website-plan.md`
for the full list):

| #   | Check                                            | Result |
| --- | ------------------------------------------------ | ------ |
| 1   | `astro build` exits 0 with no warnings           | PASS   |
| 2   | `bunx tsc --noEmit` exits 0                       | PASS   |
| 3   | All 2 routes return 200                          | PASS   |
| 4   | No raw hex outside `global.css`                  | PASS   |
| 5   | No inline `style=` attributes                    | PASS   |
| 6   | No em dashes, en dashes, or `scrollIntoView`     | PASS   |
| 7   | All `data-od-id` values unique                   | PASS   |
| 8   | `localStorage` key is `mark-direction`           | PASS   |
| 9   | `body[data-direction]` is the only body data-*   | PASS   |
| 10  | All 5 sections (`#page-01..05`) on `/`            | PASS   |

## Open TODOs (waiting on real inputs)

The clone is structurally complete. These ship when the brand owner
fills them in:

- **Real name + monogram letter.** Currently `[Your name]` and the
  placeholder `f` glyph. Update `src/data/profile.ts` to set both.
- **Default direction choice.** Currently `a` (Speak). Update
  `src/data/marks.ts` `defaultDirection` once a pick is made.
- **3 real project entries.** Markdown bodies in
  `src/content/projects/{01,02,03}.md` and the summary metadata in
  `src/data/projects.ts` are placeholders. Add real screenshots to
  `src/assets/projects/0{1,2,3}.webp` and update the entries to point
  at them.
- **GitHub, resume, LinkedIn, Cal, Twitter URLs.** In
  `src/data/contact.ts`, set `enabled: true` and `href: '...'` once
  the handles are known.
- **4 raster mark renders in `public/marks/`.** Today's marks are pure
  inline SVG (no rasters). When an image-provider key is configured,
  run the four prompts in `src/data/marks.ts` and stash the PNGs.

## Provenance

The original artifact lives in
`/home/ikbak/Documents/dev/open-design/.od/projects/4f35639d-8997-4015-8ec6-3697ef01cbcc/`:

- `frontend-engineer-portfolio.html` (1636 lines, 5 folios)
- `identity.html` (1169 lines, 4 mark directions)
- `portfolio-website-plan.md` (approved plan)
- `critique.json` (design + content decisions)

The clone was built to be a pixel-exact reimplementation of the visual
language, with the chrome (topbar, spine, tweaks, view transitions)
and the data layer (12 frozen TS modules) split into testable pieces.
No fabricated copy, no missing pieces.

## License

[Your name], 2026.
