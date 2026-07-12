import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const SECTION_IDS = ["field-note", "selected-work", "toolkit", "approach", "contact"] as const;
const SECTION_NAMES: Record<(typeof SECTION_IDS)[number], string> = {
  "field-note": "Field note",
  "selected-work": "Selected work",
  "toolkit": "Toolkit",
  "approach": "Approach",
  contact: "Contact",
};

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let cleanup: () => void = () => {};

function setActiveSection(next: (typeof SECTION_IDS)[number]): void {
  const idx = SECTION_IDS.indexOf(next);

  document.querySelectorAll<HTMLElement>(".spine-marker").forEach((marker) => {
    const id = (marker.dataset.spineId || "").replace(/^#/, "");
    const markerIdx = SECTION_IDS.indexOf(id as (typeof SECTION_IDS)[number]);
    const isCurrent = id === next;
    const isPast = markerIdx >= 0 && markerIdx < idx;

    marker.classList.toggle("is-current", isCurrent);
    marker.classList.toggle("is-past", isPast);

    if (isCurrent) {
      marker.setAttribute("aria-current", "true");
    } else {
      marker.removeAttribute("aria-current");
    }
  });

  const sectionNo = document.querySelector<HTMLElement>("[data-js='section-no']");
  const sectionName = document.querySelector<HTMLElement>("[data-js='section-name']");

  if (sectionNo) sectionNo.textContent = String(idx + 1).padStart(2, "0");
  if (sectionName) sectionName.textContent = SECTION_NAMES[next];
}

function scrollToSection(marker: HTMLElement): void {
  const id = marker.dataset.spineId;
  if (!id || !SECTION_IDS.includes(id as (typeof SECTION_IDS)[number])) return;

  const section = document.getElementById(id);
  if (!section) return;

  const smoother = ScrollSmoother.get();

  if (smoother) {
    const y = smoother.offset(section, "top 48px");
    smoother.scrollTo(y, true);
  } else {
    const y = Math.max(0, section.offsetTop - 56);
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  setActiveSection(id as (typeof SECTION_IDS)[number]);
}

function handleSpineClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null;
  const marker = target?.closest<HTMLElement>("[data-spine-id]");
  if (!marker) return;

  event.preventDefault();
  scrollToSection(marker);
}

function handleSpineKeydown(event: KeyboardEvent): void {
  if (event.key !== "Enter" && event.key !== " ") return;

  const target = event.target as HTMLElement | null;
  const marker = target?.closest<HTMLElement>("[data-spine-id]");
  if (!marker) return;

  event.preventDefault();
  scrollToSection(marker);
}

export function initSectionProgress(): void {
  cleanup();

  const progressFill = document.querySelector<HTMLElement>("[data-js='progress-fill']");
  const spineFill = document.querySelector<HTMLElement>(".spine-line-fill");
  const isMobileSpine = window.matchMedia("(max-width: 960px)");
  const setTopbarProgress = progressFill ? gsap.quickSetter(progressFill, "scaleX") : null;
  const setSpineProgressX = spineFill ? gsap.quickSetter(spineFill, "scaleX") : null;
  const setSpineProgressY = spineFill ? gsap.quickSetter(spineFill, "scaleY") : null;
  const setSpineProgress = (progress: number) => {
    if (isMobileSpine.matches) {
      setSpineProgressY?.(1);
      setSpineProgressX?.(progress);
    } else {
      setSpineProgressX?.(1);
      setSpineProgressY?.(progress);
    }
  };
  const triggers: ScrollTrigger[] = [];
  const panels = SECTION_IDS.map((id) => document.getElementById(id)).filter(
    (section): section is HTMLElement => section !== null,
  );

  document.body.classList.add("has-layered-pins");

  panels.forEach((panel, index) => {
    gsap.set(panel, { zIndex: index + 1 });

    triggers.push(
      ScrollTrigger.create({
        trigger: panel,
        start: "bottom bottom",
        end: "bottom 100px",
        pin: index === panels.length - 1 ? false : true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: index,
      }),
    );
  });

  triggers.push(
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setTopbarProgress?.(self.progress);
        setSpineProgress(self.progress);
        document.body.classList.toggle("is-scrolled", self.scroll() > 80);
      },
    }),
  );

  SECTION_IDS.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;

    triggers.push(
      ScrollTrigger.create({
        trigger: section,
        start: "top 35%",
        end: "bottom 35%",
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      }),
    );
  });

  document.addEventListener("click", handleSpineClick);
  document.addEventListener("keydown", handleSpineKeydown);
  ScrollTrigger.refresh();

  cleanup = () => {
    triggers.forEach((trigger) => trigger.kill());
    panels.forEach((panel) => gsap.set(panel, { clearProps: "zIndex" }));
    document.body.classList.remove("has-layered-pins");
    document.removeEventListener("click", handleSpineClick);
    document.removeEventListener("keydown", handleSpineKeydown);
    cleanup = () => {};
  };
}

export function destroySectionProgress(): void {
  cleanup();
}
