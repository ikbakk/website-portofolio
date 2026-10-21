# Celestial motion direction

Owner supplied a fantasy RPG interaction brief. Apply its gold/navy material,
ornate iris reveal and responsive micro feedback to this portfolio's real controls.
This is an original interpretation, not a claim to reproduce official game timings.

- Focal moment: one roughly one-second opening per browser session. An original
  SVG sigil draws, rotates and opens a circular aperture onto the actual screen;
  the identity and dossier settle into place. It can be interrupted immediately.
- Continuity: one shared gold brush tracer per visible navigation bar, 250ms;
  incoming dossier resolves in about320ms. Repeated menu changes overwrite the
  previous motion and never delay the URL or content state change.
- Feedback: 200ms hover illumination, 100ms press compression, a bounded 350ms
  radial ripple, and a short sparkle on the selected project emblem.
- Budget: retain existing GSAP, no new runtime dependency, canvas, video, sound,
  WebGL or scroll-driven effects. A handful of SVG rings/stars and opacity/
  transform animations are sufficient. Keep the home document at100dvh.
- Control: content renders normally without JavaScript. Intro defaults hidden,
  has a hard pre-paint fallback deadline, skips deep links and returning sessions,
  and ends on interaction, hidden document or changed motion preference.
- Reduced motion: skip the opening and ambient movement; keep short opacity-only
  feedback for state changes. Keyboard navigation never tilts or slides content.
- Reading pages: retain their scrolling and reading layout; button feedback may
  apply, but there is no repeated full-screen opening.

Guidance: Impeccable animate/craft floor; GreenSock official gsap-timeline and
gsap-performance skills (https://github.com/greensock/gsap-skills). The existing
Astro lifecycle owns cleanup for all tweens, observers and event listeners.
