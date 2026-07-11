/**
 * Re-export of the design tokens for runtime use.
 *
 * Components that need to *read* a token at runtime (for example
 * computing a color-mix value, or driving an SVG attribute) import
 * from here. The CSS in global.css remains the source of truth for
 * what the browser actually paints.
 */
export const tokens = {
  bg:            "var(--bg)",
  surface:       "var(--surface)",
  surface2:      "var(--surface-2)",
  fg:            "var(--fg)",
  muted:         "var(--muted)",
  border:        "var(--border)",
  borderStrong:  "var(--border-strong)",
  accent:        "var(--accent)",
  accentHover:   "var(--accent-hover)",
  accentActive:  "var(--accent-active)",
  accentQuiet:   "var(--accent-quiet)",
  danger:        "var(--danger)",
  warn:          "var(--warn)",

  fontDisplay:   "var(--font-display)",
  fontBody:      "var(--font-body)",
  fontMono:      "var(--font-mono)",

  text: {
    xs:    "var(--text-xs)",
    sm:    "var(--text-sm)",
    base:  "var(--text-base)",
    lg:    "var(--text-lg)",
    xl:    "var(--text-xl)",
    xxl:   "var(--text-2xl)",
    xxxl:  "var(--text-3xl)",
    display: "var(--text-display)",
  },

  motion: {
    fast:   "var(--motion-fast)",
    base:   "var(--motion-base)",
    reveal: "var(--motion-reveal)",
    ease:   "var(--ease-out)",
  },
} as const;

export type Tokens = typeof tokens;
