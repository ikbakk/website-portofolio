# Copy audit 001 follow-up

Date: 2026-11-15
Approved findings: 1 and 2

## Revisions

1. Reworked the sections lab's preparation notes into current project notes. It now describes the four projects featured on the home page, identifies Ward Monitor as a prototype, and lists the contact links that are already available. Removed the stale freelance timeline, verification checklist, and “working proposal” label.
2. Rewrote the home page title, description, work introduction, and contact invitation with details from the existing project summaries. Changed the work link to “View the projects.”

During the mobile review, I also increased the hero work link from 7px to 11px so it remains readable at a 390px viewport.

## Verification

- `npm run build`: passed; all 7 static routes generated.
- `npm audit --audit-level=low`: passed; 0 vulnerabilities.
- `git diff --check`: passed.
- Rendered the home page and both lab pages in the local production preview. The home page work link navigated to `/#work`; the theme toggle changed to day and back to night; the world map opened and closed; all three sections lab tabs changed their panels; navigation lab options changed modes; and the map closed with Escape. Browser console showed no errors.
- At 390px wide, `document.documentElement.scrollWidth` was 390px. The hero work link remained visible in the rendered screenshot.

## Vercel deployment configuration

The first deployment after pushing to `main` failed because the Vercel project still selected the Next.js framework preset. Added a root `vercel.json` framework override for Astro, which Vercel documents as the way to override a project's framework preset. The follow-up deployment must confirm this resolves the build failure.
