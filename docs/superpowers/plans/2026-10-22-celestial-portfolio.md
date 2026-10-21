# Celestial Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Implement the accepted celestial archive mockup as an accessible, responsive personal portfolio with original assets and real project evidence.

**Architecture:** Static Astro pages render all meaningful content and links. Tailwind CSS handles layout, responsive behavior and component states; a small CSS token/material layer implements the distinctive surfaces. Original SVG assets and a separately generated scenic background establish the visual world. A progressive TypeScript controller coordinates home-panel selection and existing GSAP animations.

**Tech Stack:** Astro and Tailwind CSS (mandatory), TypeScript, existing GSAP, Bun and existing `bun.lock`; Playwright and axe for browser verification. No React, Svelte, backend, database or WebGL dependency is needed.

**Spec:** `docs/superpowers/specs/2026-10-22-celestial-portfolio-design.md`

## Global Constraints

- Astro and Tailwind CSS are mandatory; retain the existing versions/lockfile unless compatibility requires a documented correction.
- Preserve the accepted reference at `docs/design/celestial-archive-reference.webp`.
- The mockup's external device frame, phone shell and presentation-board caption are excluded from the website.
- No invented levels, stars, skill percentages, experience points, credentials or awards.
- All text is HTML; action elements are real anchors/buttons; SVG artwork remains separate from content.
- Original assets only; no extracted Genshin artwork, characters, logos or game files.
- Long content scrolls naturally; reduced-motion and JavaScript-disabled paths expose complete readable content.
- Generated scenery must contain no UI or text. Preserve source imagery and exact generation prompts.
- No merging or production deployment without owner authorization.

## Review Focus

- An invalid/deep-linked home hash or browser Back must select a deterministic existing section/project (Task 3).
- JavaScript failure must leave the profile, all project summaries, contact links and resume usable (Tasks 3 and 5).
- A long name/title, 320px viewport or zoom must not clip the dossier or collide with navigation (Tasks 3 and 5).
- Astro navigation and reduced motion must not accumulate animation listeners or hide text (Tasks 3 and 5).
- A project without a screenshot must retain a useful case page without a fabricated application image (Tasks 2 and 4).

## File Responsibilities

| Files                                                                                                                      | Responsibility                                                                  |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `public/celestial/*`, `docs/design/assets.md`                                                                              | Original SVGs, responsive scenery, font licenses and asset provenance           |
| `src/styles/global.css`, `src/styles/celestial.css`                                                                        | Tailwind theme bridge, palette, type, materials and animation state rules       |
| `src/data/projects.ts`, `src/data/archive.ts`, `src/data/experience.ts`                                                    | Verified facts, stable project IDs, normalized archive data and resume evidence |
| `src/components/celestial/{Icon,Panel,Action,IdentityMark,Navigation,ProjectSelector,ProfileDossier,ProjectDossier}.astro` | Focused reusable visual/semantic units                                          |
| `src/scripts/celestial/{location,controller,motion}.ts`                                                                    | Whitelisted hash parsing, progressive navigation, GSAP lifecycle                |
| `src/layouts/{BaseLayout,CaseStudyLayout}.astro`, `src/pages/{index,404}.astro`, `src/pages/projects/[id].astro`           | Site shell, semantic content, real case-study routes and 404                    |
| `tests/*.spec.ts`, `playwright.config.ts`                                                                                  | Production-build behavior, accessibility and responsive checks                  |

### Task 1: Build the original asset system and visual primitives

**Files:** Create the celestial asset/style/component files above, initially limited to `Icon`, `Panel`, `Action`, `IdentityMark`. Modify `src/styles/global.css`.

**Interfaces:** `Icon` consumes `name`, optional `label`, `class`; unlabeled icons are decorative. `Panel` exposes a default slot and optional class. `Action` renders an anchor when given `href`, otherwise a button. `IdentityMark` renders separately addressable SVG orbit layers.

- [x] Read the applicable frontend-design/Awwwards references and Impeccable craft floor before UI editing. Generate an original city/sky backdrop inspired by the approved mood, with no foreground UI or text; inspect it before use.
- [x] Author SVG monogram, orbit lines, corner ornaments, navigation icons and project emblems. Use `viewBox`, scoped SVG IDs and themeable colors; avoid stretching ornamental corners. Keep important artwork recognizable at small mobile sizes.
- [x] Create WebP/AVIF desktop and portrait-crop deliveries with explicit dimensions; record original files, generation prompt and conversion command in `docs/design/assets.md`.
- [x] Select licensed self-hosted fonts, starting with Cinzel for display and Source Sans 3 for body; verify actual glyph shapes against the reference before finalizing. Record sources/licenses. Set a real 16–18px body size and legible muted colors.
- [x] Implement Tailwind tokens and material primitives using the spec palette. Build panel shape from CSS plus corner SVGs; use CSS for ivory material and SVG ornaments for controls. Asset files never contain portfolio paragraphs or click handlers.
- [x] Verify both theme backgrounds, visible focus and the mark/panel/button silhouettes in the first desktop/mobile browser pass after Task 3; do not create tests that merely count SVG paths.
- [x] Commit the original assets and primitives.

### Task 2: Normalize verified portfolio content

**Files:** Modify `src/data/projects.ts`, `src/content.config.ts`, `src/data/site.ts`; create `src/data/archive.ts`, `src/data/experience.ts`, `src/content/projects/05.md`; update existing project Markdown where necessary.

**Interfaces:** Add stable `id`, `featured` and `stage` fields to `ProjectSummary` while retaining its existing numeric `slug` as the content ID. IDs: `sungkar-group`, `beaconnect`, `cv-builder`, `ward-monitor`, `courtside`. `stage` is `production | internal-alpha | prototype | local-tool`. Export `archiveProjects`, `featuredProjects` and `getArchiveProject(id: string): ArchiveProject | undefined` from `archive.ts`. `ArchiveProject` exposes id/title/summary/stage/kind/stack/image?/caseHref/contentId.

- [x] Verify actual project stages and capabilities from their current repositories; verify experience directly from `public/resume.pdf`. Do not turn an existing unsupported claim into a new quantified claim.
- [x] Normalize the current project summaries rather than maintaining a second factual copy. Add Courtside, featured with Sungkar Group, Beaconnect and CV Builder; retain Ward Monitor in the full archive.
- [x] Supply short dossier copy and useful case-study content: problem, contribution, decisions, stack, stage, evidence and actual links. If screenshots are unavailable, use the project emblem with an explicit illustration caption.
- [x] Populate experience entries only with facts supported by the resume. Keep contact/resume destinations intact except correcting the portfolio's own origin.
- [x] Validate content through the Astro production build once the routes in Task 4 exist; inspect the resulting five project entries for consistent stages and working links.
- [x] Commit content separately from the shell.

### Task 3: Implement the responsive archive shell and selection behavior

**Files:** Modify `src/pages/index.astro`, `src/layouts/BaseLayout.astro`; create the remaining celestial components and three celestial script modules; create `tests/archive-navigation.spec.ts`, `tests/accessible-shell.spec.ts`, `playwright.config.ts`; update package scripts/development dependencies for browser checks.

**Interfaces:** `SectionId = 'profile' | 'projects' | 'experience' | 'contact'`. `readArchiveLocation(hash: string, knownIds: readonly string[]): { section: SectionId; projectId: string }` defaults to profile/Courtside. Support `#profile`, `#projects`, `#experience`, `#contact`, `#project-<knownId>`; project hashes imply the projects section. Unknown hashes fall back safely. `initArchive(root: HTMLElement): () => void` returns cleanup. `initAmbientMotion(root: HTMLElement): () => void` respects visibility/reduced motion.

- [x] Add focused Playwright checks before enhancement: direct `/#project-courtside`, selection of Sungkar Group, browser Back restoring Courtside, invalid IDs falling back safely, and ordinary Tab/Enter access to navigation. Confirm current implementation fails the new assertions.
- [x] Render the complete home content in Astro: navigation, profile, identity artwork, project selectors/dossiers, full archive, experience and contact. Real hash anchors lead to real content before JavaScript runs.
- [x] Match desktop reference proportions: central identity artifact with right ivory dossier; use both left rail/lower strip only where sufficient width exists. Use an adaptive grid with a defined tablet composition.
- [x] Compose mobile separately: compact header/emblem, full-width profile, project controls and dossier, safe-area-aware bottom navigation with matching content padding. Never require hovering.
- [x] Add enhancement only after controller initialization succeeds. On hash changes, synchronize visible section, project selector and dossier; use `aria-current` on actual links. Avoid fake tab roles and preserve browser navigation semantics.
- [x] Add coordinated dossier transitions and slow optional orbit motion through the existing GSAP runtime. Revert animations/listeners on Astro `before-swap`; initialize on `page-load`; stop ambient motion when hidden or under reduced motion.
- [x] Run the navigation checks plus a JavaScript-disabled browser check asserting all project summaries and the resume/contact links remain usable. Build and capture initial desktop/mobile frames for visual comparison; batch asset/shell corrections from that comparison.
- [x] Commit the working archive shell.

### Task 4: Add case-study routes, themed 404 and release metadata

**Files:** Create `src/layouts/CaseStudyLayout.astro`, `src/pages/projects/[id].astro`, `src/pages/404.astro`, `tests/site-routes.spec.ts`; modify `astro.config.mjs`, `src/data/seo.ts`, `src/data/contact.ts`, `src/layouts/BaseLayout.astro`; create `public/robots.txt`, OG/favicon assets and a generated sitemap route or official Astro sitemap integration.

**Interfaces:** `[id].astro` uses `getStaticPaths()` from `archiveProjects`, reads the matching content ID and renders through `CaseStudyLayout`. All five stable project paths exist. Metadata derives from one origin constant, `https://ikbak.vercel.app`.

- [x] Write route checks requiring five case pages with unique titles, one H1, honest stage labeling, a return-to-archive link and real project URLs. Include the no-screenshot project and a missing route; confirm failure before adding the routes.
- [x] Render substantial case studies with the same celestial navigation/materials and a wider reading layout. Avoid trapping long text in the compact home panel. Preserve project imagery aspect ratios and useful alt text.
- [x] Implement a readable themed 404 and normal return link; make the static preview/test host return 404 for missing paths.
- [x] Unify site/canonical/contact origins; provide unique title/description/canonical/OG metadata, truthful Person/CreativeWork structured data, generated sitemap and robots. Generate an original OG composition from the actual identity assets.
- [x] Open resume in a real PDF destination and provide a download option so browser PDF support is not a prerequisite for access.
- [x] Run route checks and the production build. Remove the obsolete dialog/folio/WeChat code only once references prove it is unreachable; update README to the actual routes, stack and commands.
- [x] Commit routes, metadata and targeted cleanup.

### Task 5: Verify fidelity, accessibility and production behavior

**Files:** Extend `tests/accessible-shell.spec.ts`, create `tests/responsive.spec.ts`; update `package.json`; create `docs/design/verification.md`, `DESIGN.md`, `.impeccable/design.json`.

**Interfaces:** `bun run verify` runs the chosen Astro diagnostic command, relevant formatting check, production build and Playwright suite. Browser tests run against a production build preview, not the development server. Add only diagnostic/browser dependencies needed by these checks.

- [x] Test 390/768/1280/1440px plus 320px overflow safety, long dossier titles and 200% text zoom. Assert content is reachable and fixed navigation does not cover its ending.
- [x] Exercise repeated Astro page navigation, keyboard traversal, project selection/Back, resume access and real contact links. Axe must report zero serious/critical violations. Reduced motion must leave all active content visible and ambient artwork still.
- [x] Capture desktop/mobile and representative case/404 screens after images/fonts settle. Compare the desktop to the accepted reference at matched dimensions, specifically background/materials, panel silhouettes, mark geometry, spatial balance and type; inspect every capture for validity.
- [x] Fix material defects as one batch, rebuild, and take one confirmation capture round. Measure throttled mobile LCP/CLS and page weight; document evidence rather than claiming a score from appearance.
- [x] Run the Impeccable mechanical detector once after the UI is complete; resolve concrete mechanical issues. Conduct a fresh independent review using the applicable skill's evidence packet and address its material findings without reopening unrelated polish.
- [x] Record final tokens/assets/responsive/motion decisions in DESIGN.md and the companion token JSON, plus actual verification commands/results, screenshots and any remaining limitations in verification.md.
- [x] Commit the verified branch and prepare a focused GitHub PR. Keep merge and production deployment for owner approval. If shell Git authentication still prevents push, use the authorized GitHub connector where sufficient; report the exact remaining limitation otherwise.

## Plan Self-Review

All spec sections map to Tasks 1–5. Stable project IDs, route paths, controller signatures and fallback behavior are consistent across tasks. All five Review Focus conditions have explicit browser checks in their owning tasks. Asset primitives use visual evidence instead of tests mirroring their construction. Implementation execution method remains an owner choice; native execution is recommended because asset, shell and fidelity work are closely coupled.
