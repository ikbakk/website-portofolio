# Iqbal / Celestial archive

A personal portfolio for Muhammad Iqbal Firdaus. The interface takes inspiration
from fantasy RPG character menus: original celestial artwork, SVG project emblems,
an ivory dossier and a navigable archive of real projects.

## Stack

Astro 7, Tailwind CSS 4, TypeScript 6 and GSAP. Astro renders static HTML;
progressive TypeScript enhances project selection. There is no application backend.

TypeScript 6 is intentional: the programmatic API required by `astro check` is not
available in the TypeScript 7 native compiler used in the previous repository.

## Run locally

Use Node 22.12+ (Node 24 tested) and Bun. There are no environment keys to fill in.

```sh
bun install --frozen-lockfile
bunx playwright install chromium
bun run dev
```

| Command             | Purpose                                            |
| ------------------- | -------------------------------------------------- |
| `bun run build`     | Build static pages into `dist/`                    |
| `bun run preview`   | Preview the production build                       |
| `bun run check`     | Astro and TypeScript diagnostics                   |
| `bun run test`      | Browser tests against the production build         |
| `bun run verify`    | Diagnostics, formatting, build and browser suite   |
| `bun run assets:og` | Regenerate the 1200x630 social image               |
| `bun run capture`   | Capture desktop/mobile/case/404 production screens |
| `bun run format`    | Format source and documentation                    |

## Routes and behavior

- `/`: Profile, Projects, Experience and Contact.
- `/#project-courtside` (and other stable IDs): directly select a project.
- `/projects/{id}/`: static case studies for Courtside, Sungkar Group, Beaconnect,
  CV Builder and Ward Monitor.
- `/404.html`: themed not-found page; the static host must serve it with a 404 status
  for missing paths.
- `/resume.pdf`: the existing resume, reachable as an ordinary link and download.

The home archive occupies one `100dvh` screen. Only its keyboard-accessible dossier
scrolls; case studies retain normal page scrolling. Projects are selected inside
the Projects navigation tab. The former left rail and bottom project strip are removed.

The home page contains all meaningful content without JavaScript. Enhancement
switches visible panels, synchronizes URL/history, and runs optional ambient motion.
Reduced motion disables the ambient/selection animation. Project emblems are normal
links, not hover-only controls.

## Source map

- `src/components/celestial/`: reusable panel, actions, navigation and SVG rendering.
- `src/styles/`: Tailwind bridge and celestial materials/responsive composition.
- `src/data/projects.ts`: canonical factual project summaries.
- `src/data/archive.ts`: normalized archive view and stable route IDs.
- `src/data/experience.ts`: experience transcribed from the existing resume.
- `src/content/projects/`: long-form case studies.
- `src/scripts/celestial/`: selection/history logic and scoped GSAP lifecycle.
- `public/celestial/`: original SVG sprite, monogram, court diagram and WebP scenery.
- `docs/design/assets/`: source imagery, kept outside the public build.
- `docs/design/assets.md`: asset provenance and generation/conversion instructions.

No artwork or interface files were extracted from Genshin Impact. Project emblems
are original illustrations; missing app screenshots are not replaced by fake UI.

## Deployment

The intended production origin is `https://ikbak.vercel.app`. `vercel.json` selects
Astro, `bun run build`, and `dist/`. Canonicals, sitemap and sharing metadata use
the same origin from `src/data/site.ts`.

Keep deployment and branch merging as separate owner-approved actions.

## Design and verification

- [Product record](PRODUCT.md)
- [Visual system](DESIGN.md)
- [Approved specification](docs/superpowers/specs/2026-10-22-celestial-portfolio-design.md)
- [Implementation plan](docs/superpowers/plans/2026-10-22-celestial-portfolio.md)
- [Verification evidence](docs/design/verification.md)
