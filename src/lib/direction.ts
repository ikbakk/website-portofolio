/**
 * Mark direction switcher. Persists the user's pick in localStorage
 * under the key `mark-direction` (the canonical key for the design
 * system). Reads on every page load and applies it to body[data-direction]
 * before paint, so the right mark shows on first render.
 */
import { defaultDirection, validDirections } from "../data/marks";

const STORAGE_KEY = "mark-direction";

export type DirectionId = (typeof validDirections)[number];

export function isValidDirection(d: string | null | undefined): d is DirectionId {
  return !!d && (validDirections as ReadonlyArray<string>).includes(d);
}

/** Apply the given direction to the body element. */
export function applyDirection(dir: DirectionId): void {
  if (typeof document === "undefined") return;
  document.body.dataset.direction = dir;
  // Sync all tweaks tiles' aria-pressed state.
  document.querySelectorAll<HTMLElement>(".tweaks-tile").forEach((tile) => {
    const active = tile.dataset.setDirection === dir;
    tile.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

/** Read the saved direction from localStorage. Returns null if none. */
export function readSavedDirection(): DirectionId | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return isValidDirection(v) ? v : null;
  } catch {
    return null;
  }
}

/** Persist the user's pick. Silently no-ops on storage failure. */
export function writeSavedDirection(dir: DirectionId): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, dir);
  } catch {
    /* storage unavailable, ignore */
  }
}

/** Restore the saved pick, or fall back to the default. */
export function restoreDirection(): DirectionId {
  const saved = readSavedDirection();
  const dir = saved ?? defaultDirection;
  applyDirection(dir);
  return dir;
}

/** Read the current body[data-direction] (defaults to the design default). */
export function currentDirection(): DirectionId {
  if (typeof document === "undefined") return defaultDirection;
  const d = document.body.dataset.direction;
  return isValidDirection(d) ? d : defaultDirection;
}

export const directionStorageKey = STORAGE_KEY;
