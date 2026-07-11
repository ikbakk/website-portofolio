/**
 * Scroll-spy. On every scroll, find the section currently in view
 * (the one whose top is closest to but past 35% of the viewport),
 * then update the spine markers' is-current / is-past classes and
 * the topbar section indicator. Single-page mode only; the
 * multi-page identity deck skips this.
 *
 * Anchor navigation uses the ScrollSmoother instance from
 * view-transitions.ts so the smooth-scroll effect is consistent
 * with the page's global scroll smoothing. When no smoother is
 * active (reduced motion, /identity page, or initialization race),
 * falls back to instant native scrollTo.
 */
import { isReducedMotion } from "./motion";

const SECTION_IDS = ["page-01", "page-02", "page-03", "page-04", "page-05"] as const;
const SECTION_NAMES: Record<(typeof SECTION_IDS)[number], string> = {
  "page-01": "Field note",
  "page-02": "Selected work",
  "page-03": "Toolkit",
  "page-04": "Approach",
  "page-05": "Contact",
};

let ticking = false;
let currentId: (typeof SECTION_IDS)[number] = "page-01";

function findActiveSection(): (typeof SECTION_IDS)[number] {
  if (typeof window === "undefined") return "page-01";
  const probe = window.scrollY + window.innerHeight * 0.35;
  let found: (typeof SECTION_IDS)[number] = "page-01";
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.offsetTop <= probe) found = id;
  }
  return found;
}

function update(): void {
  ticking = false;

  // Update --progress (ScrollSmoother keeps window.scrollY in sync)
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const p = docHeight > 0 ? Math.max(0, Math.min(1, window.scrollY / docHeight)) : 0;
  document.documentElement.style.setProperty("--progress", p.toFixed(4));
  document.body.classList.toggle("is-scrolled", window.scrollY > 80);

  // Update the active section
  const next = findActiveSection();
  if (next === currentId) return;
  currentId = next;
  const idx = SECTION_IDS.indexOf(next);

  // Update spine markers
  document.querySelectorAll<HTMLElement>(".spine-marker").forEach((marker) => {
    const id = (marker.dataset.spineId || "").replace(/^#/, "");
    const i = SECTION_IDS.indexOf(id as (typeof SECTION_IDS)[number]);
    const isCurrent = id === next;
    const isPast = i >= 0 && idx >= 0 && i < idx;
    marker.classList.toggle("is-current", isCurrent);
    marker.classList.toggle("is-past", isPast);
    if (isCurrent) {
      marker.setAttribute("aria-current", "true");
    } else if (marker.hasAttribute("aria-current")) {
      marker.removeAttribute("aria-current");
    }
  });

  // Update topbar section indicator
  const sectionNo = document.querySelector<HTMLElement>("[data-js='section-no']");
  const sectionName = document.querySelector<HTMLElement>("[data-js='section-name']");
  if (sectionNo) sectionNo.textContent = String(idx + 1).padStart(2, "0");
  if (sectionName) sectionName.textContent = SECTION_NAMES[next];
}

function onScroll(): void {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(update);
}

/**
 * Smooth-scroll to a section via ScrollSmoother. Falls back to
 * native scrollTo when the smoother isn't available (identity page,
 * reduced motion, SSR, or before the smoother initializes).
 */
function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  // 56px = topbar height
  const top = Math.max(0, el.offsetTop - 56);

  const smoother =
    typeof window !== "undefined" ? window.__gsapSmoother : undefined;

  if (smoother && !isReducedMotion()) {
    smoother.scrollTo(top, true);
  } else {
    window.scrollTo({ top, behavior: "auto" });
  }

  history.replaceState(null, "", `#${id}`);
}

function onAnchorClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null;
  if (!target) return;
  const anchor = target.closest<HTMLAnchorElement>("a[href^='#page-']");
  if (!anchor) return;
  const id = anchor.getAttribute("href")!.slice(1);
  if (!SECTION_IDS.includes(id as (typeof SECTION_IDS)[number])) return;
  event.preventDefault();
  scrollToSection(id);
}

/** Start scroll-spy. Idempotent. Returns a teardown fn. */
export function startScrollSpy(): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  document.addEventListener("click", onAnchorClick);
  update();
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    document.removeEventListener("click", onAnchorClick);
  };
}
