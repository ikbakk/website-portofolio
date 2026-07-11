/**
 * View transitions glue. The Astro <ClientRouter /> fires
 * astro:before-swap and astro:page-load on every navigation; we use
 * them to (1) kill any in-flight GSAP tweens before the swap and
 * (2) re-run the page-enter motion + scroll-reveal observers after
 * the new page is in the DOM.
 */
import { killAllTweens, entryStagger, scrollReveal, isReducedMotion } from "./motion";
import { restoreDirection, currentDirection, applyDirection } from "./direction";
import { startClock } from "./clock";
import { startProgress } from "./progress";
import { startScrollSpy } from "./scroll-spy";

type DocWithEvents = Document & {
  addEventListener(name: string, cb: EventListener): void;
};

// True when GSAP and IntersectionObserver are both available.
// If not (older browser, server-side, etc), we skip the entry tween
// and let the elements render at full opacity.
const entryStaggerAvailable =
  typeof window !== "undefined" &&
  typeof window.requestAnimationFrame === "function" &&
  typeof window.IntersectionObserver === "function";

let stopScrollSpy: () => void = () => {};

function refreshOnLoad(): void {
  // Make sure the body direction matches localStorage on every page load.
  // The direction module is idempotent.
  restoreDirection();

  // Re-run the live clock. startClock is idempotent.
  startClock();

  // Re-attach the scroll-progress listener. startProgress is idempotent.
  startProgress();

  // Start (or restart) scroll-spy only on the home page, where the
  // spine uses #page-NN anchors. On /identity the spine links are
  // real routes and scroll-spy is skipped.
  if (document.body.dataset.spineAnchors === "true") {
    stopScrollSpy();
    stopScrollSpy = startScrollSpy();
  } else {
    stopScrollSpy();
  }

  // Only mark the page as will-animate when GSAP can actually run.
  // This hides [data-od-reveal] elements via CSS so the entry tween
  // can fade them in. If motion is reduced, the elements stay
  // visible (no class added, no CSS hide).
  if (!isReducedMotion() && entryStaggerAvailable) {
    document.body.classList.add("will-animate");
    // Defer one frame so the initial hide paints before the tween starts.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const entryTargets = document.querySelectorAll<HTMLElement>("[data-od-reveal='entry']");
        if (entryTargets.length) entryStagger(entryTargets);

        const revealTargets = document.querySelectorAll<HTMLElement>("[data-od-reveal='scroll']");
        if (revealTargets.length) scrollReveal(revealTargets);

        document.body.classList.remove("will-animate");
      });
    });
  } else {
    // Reduced motion: ensure elements are visible (no class).
    document.body.classList.remove("will-animate");
  }

  // Re-bind tweaks tile clicks (the original artifact binds these
  // on DOMContentLoaded; with view transitions the bindings are
  // re-applied here on every page load).
  bindTweaksTiles();
  bindTweaksToggle();
}

/** Re-bind every .tweaks-tile so clicks update the body direction. */
function bindTweaksTiles(): void {
  document.querySelectorAll<HTMLButtonElement>(".tweaks-tile").forEach((tile) => {
    if (tile.dataset.bound === "1") return;
    tile.dataset.bound = "1";
    tile.addEventListener("click", () => {
      const dir = tile.dataset.setDirection;
      if (dir && (dir === "a" || dir === "b" || dir === "c" || dir === "d")) {
        applyDirection(dir);
        try {
          localStorage.setItem("mark-direction", dir);
        } catch {
          /* ignore */
        }
      }
    });
  });
}

function bindTweaksToggle(): void {
  const toggle = document.getElementById("tweaks-toggle");
  const panel = document.getElementById("tweaks-panel");
  if (!toggle || !panel) return;
  if (toggle.dataset.bound === "1") return;
  toggle.dataset.bound = "1";
  toggle.addEventListener("click", () => {
    const isOpen = !panel.hasAttribute("hidden");
    if (isOpen) {
      panel.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
    } else {
      panel.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
}

export function attachViewTransitions(): () => void {
  if (typeof document === "undefined") return () => {};
  const doc = document as DocWithEvents;

  // Make sure the body has the right direction at first paint, even
  // before astro:page-load has fired.
  restoreDirection();

  doc.addEventListener("astro:before-swap", () => {
    killAllTweens();
    stopScrollSpy();
  });
  doc.addEventListener("astro:page-load", refreshOnLoad);

  // Initial paint: run the refresh once so things like the clock and
  // tweaks bindings are wired up.
  refreshOnLoad();

  return () => {
    doc.removeEventListener("astro:page-load", refreshOnLoad);
  };
}

/** Read the current direction off the body for use at render time. */
export function getCurrentDirection(): string {
  return currentDirection();
}
