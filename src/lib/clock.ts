/**
 * Live clock. Fills the .js-local-slot (timezone-only) and
 * .js-clock-slot (weekday + time + tz) elements with the user's
 * timezone. The tick is throttled to 30s and pauses when the tab is
 * hidden.
 */
type Slot = HTMLElement;

let timer: number | null = null;
let timeZone = "local";

function detectTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "local";
  } catch {
    return "local";
  }
}

function formatCity(tz: string): string {
  return tz.split("/").pop()?.replace(/_/g, " ") || "";
}

function tick(): void {
  if (typeof document === "undefined") return;
  const now = new Date();

  // Marginalia slots: show just the city name (or the static fallback).
  document.querySelectorAll<Slot>(".js-local-slot").forEach((el) => {
    el.textContent = formatCity(timeZone);
  });

  // Colophon clock slot: weekday + HH:MM + tz. Throttled to 30s.
  const colophonClock = document.querySelector<Slot>(".js-clock-slot");
  if (colophonClock) {
    try {
      const fmt = new Intl.DateTimeFormat([], {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      colophonClock.textContent = `${fmt.format(now)} / ${timeZone}`;
    } catch {
      colophonClock.textContent = "offline";
    }
  }
}

/** Start the clock. Idempotent. */
export function startClock(): () => void {
  if (typeof document === "undefined") return () => {};
  if (timer !== null) return stopClock;
  timeZone = detectTimeZone();
  tick();

  const intervalMs = 30_000;
  timer = window.setInterval(tick, intervalMs);

  // Re-tick immediately when the tab regains focus so the user sees
  // the current time, not whatever was painted 30s ago.
  const onVisibility = () => {
    if (document.visibilityState === "visible") tick();
  };
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    stopClock();
    document.removeEventListener("visibilitychange", onVisibility);
  };
}

/** Stop the clock. */
export function stopClock(): void {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}
