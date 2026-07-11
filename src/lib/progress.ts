/**
 * Scroll progress. A single rAF loop that updates the document
 * --progress custom property (0 to 1) on every scroll. Read by both
 * the topbar hairline and the spine line fill so the two stay in
 * sync without a layout thrash.
 */
import { progressHairline } from "./motion";

let ticking = false;

function recompute(): void {
  ticking = false;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const p = docHeight > 0 ? Math.max(0, Math.min(1, window.scrollY / docHeight)) : 0;
  progressHairline(p);
  document.body.classList.toggle("is-scrolled", window.scrollY > 80);
}

function onScroll(): void {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(recompute);
}

/** Start tracking scroll. Idempotent. Returns a teardown fn. */
export function startProgress(): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  recompute();
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}
