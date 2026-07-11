/**
 * Motion. The single source of truth for the GSAP / CSS motion language.
 *
 * One curve, three durations, transform + opacity only. Every timeline
 * in the project pulls its easing and duration from here so the page
 * reads as one motion language, not four.
 *
 * Two layers of reduced-motion protection:
 *   1. global.css has a @media (prefers-reduced-motion: reduce) block
 *      that strips every CSS animation / transition.
 *   2. isReducedMotion() is checked at the top of every runtime API
 *      so GSAP timelines no-op when the user prefers reduced motion.
 */
import { gsap } from "gsap";

/** Easing used by every tween. Equivalent to cubic-bezier(0.23, 1, 0.32, 1). */
export const gsapEasings = {
  out: "power3.out" as const,
  inOut: "power2.inOut" as const,
};

/** Returns true when the user prefers reduced motion. */
export function isReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Stagger-y reveals used on every page enter. Animates `y: 12 -> 0`
 * and `opacity: 0 -> 1` over 500ms with an 80ms index step.
 */
export function entryStagger(elements: ArrayLike<Element> | Element[]): gsap.core.Timeline | null {
  const els = Array.from(elements);
  if (els.length === 0) return null;
  if (isReducedMotion()) {
    gsap.set(els, { y: 0, opacity: 1, clearProps: "transform,opacity" });
    return null;
  }
  return gsap.timeline().fromTo(
    els,
    { y: 12, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: gsapEasings.out,
      stagger: 0.08,
    },
  );
}

/**
 * One-shot scroll reveal. Each element fades in as it crosses 15% of
 * the viewport, with a 60ms source-order stagger. Once visible, the
 * observer is disconnected.
 */
export function scrollReveal(
  elements: ArrayLike<Element> | Element[],
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
): () => void {
  const els = Array.from(elements);
  if (els.length === 0) return () => {};
  if (isReducedMotion()) {
    els.forEach((el) => el.classList.add("is-in-view"));
    return () => {};
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        gsap.fromTo(
          entry.target,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: gsapEasings.out,
            delay: i * 0.06,
            onComplete: () => entry.target.classList.add("is-in-view"),
          },
        );
        io.unobserve(entry.target);
      }
    });
  }, options);
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/**
 * Hover lift. Animates `y: 0 -> -distance` on enter, reverses on leave.
 * Used on .showcase-tile and .lockup where the original artifact used
 * a 180ms y-translate on hover.
 */
export function hoverLift(el: Element, distance: 1 | 2 = 1): () => void {
  if (isReducedMotion()) return () => {};
  const tweenIn = () =>
    gsap.to(el, { y: -distance, duration: 0.18, ease: gsapEasings.out });
  const tweenOut = () =>
    gsap.to(el, { y: 0, duration: 0.18, ease: gsapEasings.out });
  el.addEventListener("mouseenter", tweenIn);
  el.addEventListener("mouseleave", tweenOut);
  el.addEventListener("focusin", tweenIn);
  el.addEventListener("focusout", tweenOut);
  return () => {
    el.removeEventListener("mouseenter", tweenIn);
    el.removeEventListener("mouseleave", tweenOut);
    el.removeEventListener("focusin", tweenIn);
    el.removeEventListener("focusout", tweenOut);
  };
}

/**
 * Update the document --progress custom property. Read by both the
 * topbar hairline (.topbar-progress-fill) and the spine line fill
 * (.spine-line-fill). Single source of truth.
 */
export function progressHairline(progress: number): void {
  const p = Math.max(0, Math.min(1, progress));
  document.documentElement.style.setProperty("--progress", p.toFixed(4));
}

/** Kill every active GSAP tween. Used on astro:before-swap. */
export function killAllTweens(): void {
  gsap.globalTimeline.clear();
}
