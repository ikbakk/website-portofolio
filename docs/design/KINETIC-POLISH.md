# Kinetic motion and Playground artwork — 2026-11-06

Implemented on the existing feature branch after the owner's approval. Project copy, missing screenshots, portrait and identity assets remain with the owner's desktop/local agent. No production deployment is included.

## Motion direction and budget

Weather selection and work-section changes are the focal sequences. The paper frame remains fixed; incoming content settles back into it. Supporting motion acknowledges presses and game outcomes. There is no ambient animation, scroll hijacking, added dependency or hidden-on-load content. Existing particle caps, lazy GSAP loading, reduced motion and Electro's 1.4-second single-strike cooldown remain.

- **Normal:** a small initial lift, accelerating fall, brief float and heavier exit. Leaf depth, rotation and alternating lateral paths vary the weight; motion is no longer a uniform vertical translation.
- **Cryo:** a short backdraft precedes the diagonal burst, followed by a slower coast. The veil anticipates and accelerates with the wind.
- **Electro:** the existing charge leads into a fast top-to-bottom bolt reveal, a restrained positional recoil and a settling tail. There is one brightness peak, not repeated flashing. Lightning inline styles are cleared on completion/interruption.
- **Work tabs:** the section changes at the existing weather midpoint. Up to four incoming content groups follow with a bounded 25ms stagger and a small `back.out(1.15)` settle. The central frame and tabs do not move. The timeline owns these tweens; cleanup removes transient transform, opacity and will-change styles.
- **Controls:** a one-pixel hover lift, quick compressed press and spring-like release. Reduced motion omits the travel. Project arrows acknowledge the destination with a small diagonal movement.

## Original SVG artwork

`PlaygroundArt.astro` uses the existing theme pigments and paper geometry:

- Badminton: court markings, pixel corners and a racket behind the live canvas. The timing target and shuttle remain functional overlays; game timing/physics are unchanged.
- F1: a paper racing car, track markings and checkered detail behind the reaction lights. Lights-out triggers a bounded anticipation/launch; an early start gets a small stall response. The car's artwork does not determine reaction time.
- Genshin memory: original star-and-fold card backs; revealed cards retain the existing elemental symbols and accessible card labels. A short turn acknowledges reveals.

Artwork is decorative and absent from the accessibility tree; controls/status remain native elements. No generated project screenshots, imitation application captures or unprovided character art were added. Game tab changes get one short unfold, with no idle loops.

## Verification and evidence

- Astro diagnostics: zero errors, warnings and hints.
- Formatting, production build, nine widget/model tests and three generated-build tests pass.
- Export: seven HTML pages, 207 local references and zero audit errors. Initial eager JS is 16,659 bytes raw / 7,273 bytes gzip; the weather engine remains lazy. No new package was added. See `verification/kinetic/build-audit.json`.
- Managed desktop browser at 1363×936: artwork in all three game tabs; calm rally reaches one hit; F1 early start produces the expected response; a memory card reveals its element. Weather and content transitions run in all three themes, commit the intended state, and finish with a hidden overlay. Cryo leaves zero particles; Electro's inline bolt styles and the work-section transient styles are cleared. The desktop document remains 936px tall.
- `verification/kinetic/kinetic-motion.mp4` is a short preview assembled from sampled browser screenshots (12fps), not a real-time performance recording or FPS measurement. It includes weather and content switches in Normal, Cryo and Electro. `elemental-paper-cards.jpg` shows the new card artwork.
- The additional short-desktop/mobile/tablet iframe review could not complete because the managed browser stopped responding. Do not infer new responsive or physical-device coverage from the prior structure pass.
- Added a browser scenario for reduced-motion theme/tab changes and non-animated game feedback. Playwright discovery succeeds, but the full Playwright/Axe suite remains unexecuted in this environment. Reduced-motion behavior was implemented and source-reviewed; it does not have a fresh end-to-end execution result here. Run the suite locally/CI before full P5 sign-off.

Implementation references: [GSAP easing](https://gsap.com/docs/v3/Eases/), [tween/keyframe sequencing](https://gsap.com/docs/v3/GSAP/Tween/). No claim of measured 60fps or completed accessibility certification is made.
