/**
 * Scroll-spy. On every scroll, find the section currently in view
 * (the one whose top is closest to but past 35% of the viewport),
 * then update the spine markers' is-current / is-past classes and
 * the topbar section indicator.
 */
import { progressHairline } from "./motion";

const SECTION_IDS = ["field-note", "selected-work", "toolkit", "approach", "contact"] as const;
const SECTION_NAMES: Record<(typeof SECTION_IDS)[number], string> = {
  "field-note": "Field note",
  "selected-work": "Selected work",
  "toolkit": "Toolkit",
  "approach": "Approach",
  "contact": "Contact",
};

let ticking = false;
let currentId: (typeof SECTION_IDS)[number] = "field-note";

function findActiveSection(): (typeof SECTION_IDS)[number] {
  if (typeof window === "undefined") return "field-note";
  const probe = window.scrollY + window.innerHeight * 0.35;
  let found: (typeof SECTION_IDS)[number] = "field-note";
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.offsetTop <= probe) found = id;
  }
  return found;
}

function update(): void {
  ticking = false;

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const p = docHeight > 0 ? Math.max(0, Math.min(1, window.scrollY / docHeight)) : 0;
  progressHairline(p);
  document.body.classList.toggle("is-scrolled", window.scrollY > 80);

  const next = findActiveSection();
  if (next === currentId) return;
  currentId = next;
  const idx = SECTION_IDS.indexOf(next);

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

function onAnchorClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null;
  if (!target) return;
  const anchor = target.closest<HTMLAnchorElement>("a[href^='#']");
  if (!anchor) return;
  const id = anchor.getAttribute("href")!.slice(1);
  if (!SECTION_IDS.includes(id as (typeof SECTION_IDS)[number])) return;
  const el = document.getElementById(id);
  if (!el) return;
  event.preventDefault();
  const rect = el.getBoundingClientRect();
  const top = rect.top + window.scrollY - 56;
  window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
  history.replaceState(null, "", `#${id}`);
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
