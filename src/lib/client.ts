import { startClock } from "./clock";
import { startProgress } from "./progress";
import { startScrollSpy } from "./scroll-spy";
import { entryStagger, isReducedMotion, scrollReveal } from "./motion";

const canAnimate =
  typeof window !== "undefined" &&
  typeof window.requestAnimationFrame === "function" &&
  typeof window.IntersectionObserver === "function";

let stopScrollSpy: () => void = () => {};

function runReveals(): void {
  if (isReducedMotion() || !canAnimate) return;

  requestAnimationFrame(() => {
    const entryTargets = document.querySelectorAll<HTMLElement>("[data-od-reveal='entry']");
    if (entryTargets.length) entryStagger(entryTargets);

    const revealTargets = document.querySelectorAll<HTMLElement>("[data-od-reveal='scroll']");
    if (revealTargets.length) scrollReveal(revealTargets);
  });
}

export function initPage(): void {
  startClock();
  startProgress();

  stopScrollSpy();
  stopScrollSpy = document.body.dataset.spineAnchors === "true" ? startScrollSpy() : () => {};

  runReveals();
}
