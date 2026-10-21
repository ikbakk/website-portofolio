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
- The current production deployment references commit `bb95b7a` in this repository.
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

## Evidence on Hand

- Profile and contact data: `src/data/profile.ts`, `src/data/contact.ts`.
- Existing projects: Sungkar Group, Beaconnect, CV Builder and Ward Monitor in
  `src/data/projects.ts` and `src/content/projects/`.
- Real project screenshots: `public/projects/sungkargroup.png` and
  `public/projects/ward-monitor-dashboard.png`. The latter depicts prototype data.
- Resume: `public/resume.pdf`.
- Additional possible case study: Courtside, verified against the README of
  `ikbakk/badminton-club-helper`. Adding it is a design/content proposal, not a
  change already made to the portfolio.
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

## Known Audit Findings

- Vercel project framework metadata still says Next.js; current source is Astro.
- `astro.config.mjs` uses an old GitHub Pages origin.
- `src/data/seo.ts` and the portfolio contact link use `ikbakk.vercel.app`, which
  differs from the owner-specified `ikbak.vercel.app`.
- The configured `/og.png` is absent from the current public assets.
- README describes removed routes/files and an older version of the implementation.
- The connector's protected-deployment fetch returned 403. This does not establish
  whether unauthenticated public visitors can access the production site.
