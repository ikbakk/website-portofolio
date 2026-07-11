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

const entryStaggerAvailable =
  typeof window !== "undefined" &&
  typeof window.requestAnimationFrame === "function" &&
  typeof window.IntersectionObserver === "function";

let stopScrollSpy: () => void = () => {};

function refreshOnLoad(): void {
  restoreDirection();
  startClock();
  startProgress();

  if (document.body.dataset.spineAnchors === "true") {
    stopScrollSpy();
    stopScrollSpy = startScrollSpy();
  } else {
    stopScrollSpy();
  }

  if (!isReducedMotion() && entryStaggerAvailable) {
    document.body.classList.add("will-animate");
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
    document.body.classList.remove("will-animate");
  }

  bindTweaksTiles();
  bindTweaksToggle();
}

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

  restoreDirection();

  doc.addEventListener("astro:before-swap", () => {
    killAllTweens();
    stopScrollSpy();
  });
  doc.addEventListener("astro:page-load", refreshOnLoad);

  refreshOnLoad();

  return () => {
    doc.removeEventListener("astro:page-load", refreshOnLoad);
  };
}

export function getCurrentDirection(): string {
  return currentDirection();
}
