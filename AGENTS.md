# Portfolio Engineering Guide

## Stack and Commands

- Astro 7 with TypeScript strict mode and a single public route: `/`.
- Tailwind CSS v4 is loaded through `@tailwindcss/vite`; its theme bridge and all design tokens live in `src/styles/global.css`. There is no `tailwind.config.*` file.
- GSAP and `ScrollTrigger` power the interactive motion. Do not add a second animation library.
- Bun is the package manager. The runtime requires Node `>=22.12.0`.

```bash
# Install dependencies
bun install

# Start the development server in the background
bun run dev -- --background

# Manage a background Astro server
astro dev status
astro dev logs
astro dev stop

# Verify production output, types, and formatting
bun run build
bunx tsc --noEmit
bun run format:check
```

Run `bun run build`, `bunx tsc --noEmit`, and `bun run format:check` after meaningful code changes. Use `bun run format` only when formatting the intended files is acceptable.

## Application Structure

`src/pages/index.astro` composes the portfolio in this order:

1. `HeroSection`
2. `WorkSection`
3. `CraftSection`
4. `MethodSection`
5. `ContactSection`
6. `PortfolioDialogs`

`src/layouts/BaseLayout.astro` owns global CSS, metadata, the persistent topbar, `<ClientRouter />`, the skip link, and the inline `initPortfolioMotion()` bootstrapping script. Keep page-level composition in `index.astro`; keep shared document chrome in the layout.

Use `.astro` components for server-rendered UI. Add client-side JavaScript only where interaction requires it. Public static assets belong in `public/`; imported build assets belong in `src/assets/`.

## Content and Data

- `src/data/site.ts` is the component-facing data adapter. It combines focused source modules into the props consumed by the sections and dialogs.
- Update the focused modules for their respective concerns: `profile.ts`, `hero.ts`, `projects.ts`, `toolkit.ts`, `approach.ts`, `contact.ts`, and `seo.ts`.
- `src/data/projects.ts` is the canonical project summary source. Preserve its `ProjectSummary` shape and update project metadata, disclosure, and optional image data together.
- `src/content/projects/*.md` and `src/content.config.ts` define the project content collection. Do not assume a markdown field is rendered before tracing its consumer.
- Preserve truthful project claims and disclosure boundaries. Contract work must not expose client data or imply unverified outcomes.

Avoid hardcoding reusable copy in components when it belongs in the data layer. Keep source data immutable (`as const` or readonly structures) where practical.

## Styling

- Use Tailwind utilities and the existing CSS custom properties from `global.css`.
- Reuse semantic tokens such as `bg`, `surface`, `fg`, `accent`, `border`, spacing, radii, typography, and motion tokens instead of introducing raw values in components.
- Maintain the established quiet editorial visual language and responsive utility variants.
- Preserve keyboard-visible focus states, semantic landmarks, descriptive labels, and the skip link.
- Keep the fixed topbar offset in mind for in-page anchors and scroll targets.

## Motion and Interaction

`src/scripts/motion.ts` is the active client entry point. It initializes scrolling, progress, dialogs, project interaction, section motion, reveals, and hero motion. Its modules live under `src/scripts/modules/`:

- `core.ts` owns GSAP registration, reduced-motion detection, and scroll helpers.
- `navigation.ts` owns in-page navigation.
- `progress.ts` owns progress and active-section state.
- `dialogs.ts` owns the project and resume dialogs.
- `projects.ts` owns project-row reveal, focus, and cursor-preview behavior.
- `section-motion.ts`, `reveals.ts`, and `topbar.ts` own their respective animations.

Respect `reducedMotion()` in new animation code. Prefer transforms and opacity, use GSAP's shared instance from `modules/core.ts`, and kill or refresh `ScrollTrigger` instances when lifecycle changes require it. Because `<ClientRouter />` is enabled, preserve the `astro:after-swap` reinitialization path when adding client behavior.

Project rows expose `data-project-*` attributes consumed by `dialogs.ts`. When changing project details, update the component markup and dialog reader together. Keep dialog controls operable by keyboard and retain explicit close controls.

The older top-level files in `src/scripts/` and `src/lib/gsap.ts` are not the layout's active motion path. Do not extend them without first migrating their callers.

## Documentation

- Keep `docs/gsap-motions.md` aligned when changing the active animation system.
- Astro documentation: https://docs.astro.build
- Consult the relevant Astro guide before routing, component, content collection, framework integration, or styling changes.
