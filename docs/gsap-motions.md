# GSAP Motion Documentation

This document explains the motion system used in this Astro portfolio: where animations are initialized, which files own each motion, and what each animation is meant to communicate.

## Motion philosophy

The site uses GSAP as the single animation layer. CSS provides layout, initial styling, and `will-change` hints, while JavaScript owns interactive and scroll-based motion.

Most animations follow these rules:

- Respect `prefers-reduced-motion` through `isReducedMotion()`.
- Use shared timing/easing tokens from `src/lib/gsap.ts`.
- Use transform and opacity where possible for smoother performance.
- Kill or overwrite existing tweens before starting new interactive tweens.
- Refresh or kill ScrollTrigger during Astro page swaps.

## Core setup

**File:** `src/lib/gsap.ts`

This file is the central GSAP registry and shared config.

### Registered plugins

- `ScrollTrigger` — scroll-driven triggers, progress tracking, section activation, parallax.
- `ScrollToPlugin` — registered for GSAP scroll support, though custom scroll proxy logic is currently used for anchor scrolling.
- `ScrollSmoother` — smooth scroll wrapper and effects support.

### Global ScrollTrigger config

```ts
ScrollTrigger.config({ ignoreMobileResize: true });
```

This avoids excessive ScrollTrigger refreshes caused by mobile browser chrome resizing the viewport while scrolling.

### Shared easings

```ts
out: 'power3.out';
inOut: 'power2.inOut';
back: 'back.out(2)';
```

- `power3.out` gives most UI entrances and hovers a fast start with a soft finish.
- `power2.inOut` is used for smooth anchor scrolling.
- `back.out(2)` gives pressed nav links a small elastic return.

### Shared durations

```ts
fast: 0.18;
base: 0.36;
reveal: 0.62;
slow: 0.9;
```

These keep motion consistent across the site.

### Reduced motion

```ts
isReducedMotion();
```

Returns `true` when the user has `prefers-reduced-motion: reduce`. Most animations skip in that case.

## Initialization flow

**File:** `src/scripts/main.ts`

`initMotion()` is the entry point. It initializes motion in this order:

1. `initScrollSmoother()`
2. `initProgress()`
3. `initNavScroll()`
4. `initTopbarNav()`
5. `initReveals()`
6. `initDialogs()`
7. `initProjectVisuals()`
8. `initContactLinks()`
9. `initButtons()`
10. `initSectionProgress()`
11. `initHeroAnimation()`

On Astro page transitions, `astro:after-swap` calls:

1. `killScrollTriggers()`
2. `clearMotionStyles()`
3. `initMotion()`
4. `refreshScrollTrigger()`

This prevents stale scroll triggers and inline animation styles from leaking between page swaps.

## Page load / hero entrance

**File:** `src/scripts/main.ts`

### Hero copy

Selector:

```css
[data-motion="hero-copy"] > *
```

Motion:

- Starts `18px` lower.
- Starts invisible.
- Animates to natural position and full opacity.
- Duration: `0.72s`.
- Ease: `power3.out`.
- Stagger: `0.08s` per child.

Purpose: creates a sequential editorial entrance for the hero text.

### Hero console

Selector:

```css
[data-motion="hero-console"]
```

Motion:

- Starts `28px` lower.
- Starts invisible.
- Animates to natural position and full opacity.
- Duration: `0.9s`.
- Delay: `0.18s`.
- Ease: `power3.out`.

Purpose: makes the console/card feel like it arrives after the copy, reinforcing visual hierarchy.

## Smooth scrolling

**File:** `src/lib/gsap.ts`

`initScrollSmoother()` creates a `ScrollSmoother` instance:

```ts
smooth: 1.2;
effects: true;
smoothTouch: 0.1;
```

Meaning:

- Desktop scrolling is softened with a `1.2` smoothing value.
- GSAP effects are enabled for smoother/parallax-compatible elements.
- Touch devices receive minimal smoothing to avoid fighting native scrolling.

## Anchor navigation scroll

**File:** `src/scripts/nav.ts`

When a user clicks an anchor link, default browser jumping is prevented and the page scrolls via a GSAP tween.

### How target position is calculated

The target scroll position is:

```ts
target top + current scroll - topbar height - 14px
```

This prevents sections from being hidden behind the fixed topbar.

### Duration logic

```ts
gsap.utils.clamp(0.82, 1.35, distance / 1300);
```

Short jumps take around `0.82s`; long jumps cap at `1.35s`.

### Motion

A proxy object `{ y }` is animated, and `window.scrollTo()` is called on every update.

- Ease: shared `easings.inOut` (`power2.inOut`).
- Adds `body.is-anchor-scrolling` while active.
- Kills any previous active scroll tween before starting a new one.
- Falls back to immediate `window.scrollTo()` for reduced motion or tiny distances.

Purpose: provides consistent section navigation without abrupt jumps.

## Scroll progress and active nav state

There are two related systems:

### Basic progress state

**File:** `src/scripts/progress.ts`

This uses `requestAnimationFrame`, not GSAP tweens, to update:

- `--progress` CSS variable on `<html>`.
- `body.is-scrolled` when scroll is greater than `32px`.
- `aria-current="true"` on nav links based on the current section.

Purpose: lightweight scroll state for CSS and accessibility.

### GSAP section progress / spine progress

**File:** `src/lib/section-progress.ts`

This creates ScrollTriggers for:

1. Overall page progress.
2. Active section tracking.
3. Background parallax.

#### Progress fill animation

Targets:

```css
[data-js='progress-fill']
.spine-line-fill
```

Uses `gsap.quickSetter()` for high-performance updates:

- Topbar progress uses `scaleX`.
- Desktop spine progress uses `scaleY`.
- Mobile spine progress uses `scaleX`.

Purpose: avoids creating a new tween on every scroll update.

#### Section activation

Each section gets a ScrollTrigger:

```ts
start: 'top 35%';
end: 'bottom 35%';
```

When a section enters this zone, the spine marker is updated:

- Current marker gets `.is-current` and `aria-current="true"`.
- Previous markers get `.is-past`.
- Section number/name labels update.

#### Background parallax

For each section background:

```css
.folio-bg
```

ScrollTrigger runs from:

```ts
start: 'top bottom';
end: 'bottom top';
scrub: true;
```

On update:

```ts
y: self.progress * 48;
```

Purpose: moves section backgrounds downward up to `48px` as the section passes through the viewport, creating subtle depth.

## Viewport reveal animations

**File:** `src/scripts/reveals.ts`

Selectors:

```css
.system-item
.method-panel > *
.contact-row
```

Each element starts hidden:

```ts
autoAlpha: 0;
y: 28;
```

`autoAlpha` controls both `opacity` and `visibility`.

### Reveal trigger

```ts
start: 'top 84%';
end: 'bottom 14%';
```

When entering viewport:

- Animates to `autoAlpha: 1`.
- Animates to `y: 0`.
- Duration: `durations.reveal` (`0.62s`).
- Ease: `power3.out`.
- Delay cycles by index: `0`, `0.035`, `0.07`.

When leaving downward:

- Fades out.
- Moves to `y: -14`.
- Duration: `0.28s`.
- Ease: `power2.in`.

When leaving backward/upward:

- Fades out.
- Moves to `y: 18`.
- Duration: `0.2s`.
- Ease: `power2.in`.

Purpose: makes sections feel responsive to scroll direction instead of only appearing once.

## Topbar motions

**File:** `src/scripts/topbar.ts`

### Skip link

Selector:

```css
.skip-link
```

On focus:

- Moves to `y: 0`.
- Duration: `0.18s`.

On blur:

- Moves to `y: -140`.
- Duration: `0.18s`.

Purpose: keeps keyboard skip navigation visually clear when focused.

### Mark hover

Selector:

```css
.topbar-mark
```

On mouse enter:

- Rotates to `-3deg`.

On mouse leave:

- Rotates back to `0deg`.

Purpose: adds a small brand interaction without distracting from navigation.

### Topbar nav links

Selector:

```css
.topbar-nav a[data-nav-target]
```

On pointer enter / focus:

- Moves to `y: -2`.
- Scales to `1.045`.
- Duration: `0.36s`.
- Ease: `power3.out`.

The label `<span>` also animates from `x: -5` to `x: 0`.

On pointer leave / blur:

- Active link settles at `scale: 1.025`.
- Inactive link resets to `scale: 1` and clears transform.

On pointer down:

- Scales from `0.965` to `1.045`.
- Duration: `0.34s`.
- Ease: `back.out(2)`.

When `aria-current` changes:

- New active link animates from `scale: 0.985` to `scale: 1.025` and `y: -1`.
- Inactive link resets to natural state.

Purpose: makes topbar links feel tactile and reinforces the active section.

### Spine marker tooltip

Selector:

```css
.spine-marker
.spine-tip
```

On hover/focus:

- Marker and tooltip scale to `1.05`.
- Tooltip fades to `opacity: 1`.
- Tooltip moves to `x: 0`.

On leave/blur:

- Marker returns to `scale: 1`.
- Tooltip fades to `opacity: 0`.
- Tooltip moves to `x: 4`.

Purpose: gives compact spine markers readable labels on interaction.

### Status dot pulse

Selector:

```css
.status-dot
```

Motion:

- Animates `boxShadow` to `0 0 0 11px transparent`.
- Duration: `1.8s`.
- Ease: `power3.out`.
- Repeats forever with `repeat: -1`.
- Repeat delay: `0.1s`.

Purpose: communicates availability/activity with a subtle pulse.

## Dialog / modal motions

**File:** `src/scripts/dialogs.ts`

Targets:

```css
.modal-card
```

### Open dialog

Starts from:

```ts
opacity: 0;
y: -22;
rotateX: -8;
scaleY: 0.08;
clipPath: 'inset(48% 0% 48% 0%)';
```

Animates to:

```ts
opacity: 1;
y: 0;
rotateX: 0;
scaleY: 1;
clipPath: 'inset(0% 0% 0% 0%)';
```

- Duration: `0.62s`.
- Ease: `power3.out`.
- Clears `transform` and `clipPath` afterward.

Purpose: makes the modal unfold vertically, like a card expanding into view.

### Close dialog

Animates to:

```ts
opacity: 0;
y: -18;
rotateX: 8;
scaleY: 0.08;
clipPath: 'inset(48% 0% 48% 0%)';
```

- Duration: `0.32s`.
- Ease: `power3.in`.
- Calls `dialog.close()` on completion.
- Clears inline styles afterward.

Purpose: reverses the open feeling with a faster exit.

## Hover and focus micro-interactions

**File:** `src/scripts/hover.ts`

### Project visual borders

Selector:

```css
.project-visual
```

On pointer enter:

- Border color becomes `var(--border-strong)`.

On pointer leave:

- Border color returns to `var(--border)`.

Duration: `0.18s`.

### Contact links

Selector:

```css
.contact-link
```

On pointer enter:

- Border color becomes `var(--accent)`.
- Text color becomes `var(--accent)`.

On pointer leave:

- Border color becomes `transparent`.
- Text color becomes `var(--fg)`.

Duration: `0.18s`.

### Buttons

Selector:

```css
.button
```

On pointer enter:

- Moves to `y: -2`.

On pointer leave:

- Returns to `y: 0`.

Duration: `0.18s`.

Purpose: gives controls a consistent lift/response pattern.

## Astro page transition

**File:** `src/pages/index.astro`

The main element uses:

```astro
transition:animate="slide"
```

This is Astro's built-in view transition animation, separate from the GSAP scripts. GSAP is reinitialized after the page swap through the `astro:after-swap` listener in `src/scripts/main.ts`.

## Motion-related CSS

**File:** `src/styles/motion.css`

This file marks GSAP-controlled elements with performance hints:

```css
[data-motion] {
  will-change: transform, opacity;
}
```

It also styles smooth-scroll wrapper elements:

```css
#smooth-wrapper
#smooth-content
```

**File:** `src/styles/components.css`

Some reveal targets receive initial CSS states when `body.will-animate` is present:

```css
body.will-animate [data-od-reveal="entry"],
body.will-animate [data-od-reveal="scroll"] {
  translate-y / opacity / will-change hints
}
```

GSAP still controls the actual reveal animations.

## File map

| Area                 | File                          | Main responsibility                                                   |
| -------------------- | ----------------------------- | --------------------------------------------------------------------- |
| GSAP setup           | `src/lib/gsap.ts`             | Plugin registration, shared durations/easings, reduced motion helpers |
| Entry point          | `src/scripts/main.ts`         | Initializes all motion and handles Astro page swaps                   |
| Smooth anchor scroll | `src/scripts/nav.ts`          | Animated anchor navigation with topbar offset                         |
| Scroll state         | `src/scripts/progress.ts`     | CSS progress variable and active nav state                            |
| Section progress     | `src/lib/section-progress.ts` | Progress fills, spine markers, section parallax                       |
| Reveals              | `src/scripts/reveals.ts`      | ScrollTrigger reveal/hide animations                                  |
| Topbar               | `src/scripts/topbar.ts`       | Skip link, mark, nav links, spine tips, status pulse                  |
| Dialogs              | `src/scripts/dialogs.ts`      | Modal open/close unfolding motion                                     |
| Hover states         | `src/scripts/hover.ts`        | Project, contact, and button micro-interactions                       |
| Astro transition     | `src/pages/index.astro`       | Built-in slide transition on main content                             |

## Quick glossary

- `gsap.to()` — animate from current state to the provided values.
- `gsap.from()` — animate from provided values to current state.
- `gsap.fromTo()` — define both the start and end states explicitly.
- `gsap.set()` — set values instantly with no animation.
- `ScrollTrigger.create()` — run callbacks or scrub values based on scroll position.
- `scrub: true` — ties an animation/update directly to scroll progress.
- `autoAlpha` — GSAP shortcut for opacity plus visibility.
- `quickSetter()` — optimized setter for values updated very frequently, such as scroll progress.
- `overwrite: true` — prevents conflicting tweens on the same target.
- `killTweensOf()` — stops currently running tweens on a target before starting a new one.
