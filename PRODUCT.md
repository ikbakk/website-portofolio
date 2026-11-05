# Muhammad Iqbal Firdaus Portfolio

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Recruiters and hiring teams evaluating frontend and mobile engineering work.
- Potential freelance clients evaluating project fit and ability to deliver.
- Both audiences have equal priority, confirmed by the owner on 22 October 2026.

## Product Purpose

Help visitors understand Iqbal's engineering work, inspect the decisions behind real
projects, and start a relevant conversation or open the resume.

## Positioning

A personal portfolio grounded in Iqbal's actual web, mobile, local-first tooling,
and operational-interface projects. The owner wants it to feel more personal and
less generic. Specific product problems and engineering decisions should provide
the distinction; credentials and outcomes must never be invented.

## Operating Context

- The existing source is an Astro static site with TypeScript, Tailwind CSS and GSAP.
- GitHub source: `ikbakk/website-portofolio`, default branch `main`.
- Vercel project: `ikbak`; intended public origin: `https://ikbak.vercel.app`.
- The last recorded production deployment referenced commit `bb95b7a`; production has not been re-verified during this branch work.
- Project copy identifies Iqbal as a frontend and mobile engineer based in Mataram,
  Indonesia. Availability, experience and relocation details are existing claims,
  not newly independently verified facts.

## Capabilities and Constraints

- Preserve access to project evidence, resume PDF, email, GitHub and LinkedIn.
- Existing project copy and section order may be reorganized and rewritten. This
  permission does not authorize adding unsupported claims.
- Preserve truthful product stages: a prototype or internal alpha is not described
  as a released production product.
- Astro and Tailwind CSS are mandatory, explicitly confirmed by the owner.
- Design for desktop, mobile, keyboard and reduced-motion use.
- The owner selected a Genshin-inspired celestial archive direction on 22 October
  2026. The owner reviewed and accepted the written specification, with Astro and
  Tailwind CSS mandatory. Implementation-plan review is pending.

## Active Homepage Direction (2026-11-03)

The current owner-approved homepage proposal on branch `ikbakk/inspire-portfolio-jmancheta-design` is **Soft Grid / Weather Themes**, with Normal, Cryo and Electro. It replaces the earlier celestial homepage decision for this branch only. See [P1 design brief](docs/design/P1-SOFT-GRID.md). Later continuation requests authorized P2 layout, P3 widgets and the three P4 weather-switch transitions. On 2026-11-06 the owner accepted those transitions for now and requested the next planned work, authorizing P5 readiness checks. Broader motion experiments, identity replacements, merge and deployment remain separate.

## Evidence on Hand

- Profile and contact data: `src/data/site.ts` and the homepage profile component.
- Existing projects: Sungkar Group, Beaconnect, CV Builder and Ward Monitor in
  `src/data/projects.ts` and `src/content/projects/`.
- Real project screenshots: `public/projects/sungkargroup.webp` and
  `public/projects/ward-monitor-dashboard.webp`. The latter depicts prototype data.
- Resume: `public/resume.pdf`.
- Courtside has a static case study and a homepage link, verified against the README of `ikbakk/badminton-club-helper`.
- No personal portrait, testimonials or independently verified business metrics
  have been provided for this redesign.

## Product Principles

- Let real work and specific decisions demonstrate capability.
- Make the owner recognizable through their own projects and operating context.
- Give recruiters and freelance clients equally clear next steps.
- Keep factual claims traceable and distinguish prototypes from production work.
- Make exploration useful on a phone without depending on hover or animation.

## Requested Design Guidance

The owner explicitly requested the `frontend-design` skill from
`anthropics/skills` and the `awwwards` skill from `juliobsz/skills` for design and
art direction. These are design guidance, not claims that the site has won an award.

## Readiness record — 2026-11-06

- Source configuration now declares Astro and `https://ikbak.vercel.app`; obsolete origin/OG findings above were historical. `public/og.jpg`, canonical and sitemap metadata exist.
- Homepage/case-study return paths and Contact links are aligned with Soft Grid. The homepage and all five case studies now share the paper layout and use native navigation; session weather is retained.
- The weather engine is loaded on demand; measured production bundle sizes and generated-link audit are in `docs/design/verification/p5/build-audit.json`.
- Current browser scenarios cover the paper homepage, section tabs and case studies; obsolete Celestial-detail assertions were replaced. Actual execution and remaining verification limits are recorded in `docs/design/P5-VERIFICATION.md`.
- Approved green identity mark, portrait artwork, Playground character art and verified Beaconnect/CV Builder screenshots remain unresolved. Existing honest fallbacks are retained.
- Hosting behavior, field performance, merge and production deployment have not been changed or verified by these local checks.

## Work structure — 2026-11-06

Selected Works is a single column of custom paper links; Tech Stack sits below About in the left column. Projects and Experience have separate accessible tabs, per-view scroll positions and current-weather transitions. The desktop tracks remain 30/40/30 with scrolling in the center. Detail pages reuse that shell with contextual project facts on the right; mobile detail pages condense the repeated profile. See the work-structure verification record for checks and remaining automation limits.
