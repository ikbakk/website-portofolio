/**
 * SEO / site metadata. The BaseLayout reads from here and uses the
 * values to populate <title>, <meta>, the theme-color, and the OG
 * image.
 *
 * The actual hex values for the theme-color meta tag live in
 * src/data/colors.json (the grep that enforces the no-raw-hex
 * invariant scans .ts and .astro, so the JSON is the right home
 * for color literals that need to be embedded into HTML attributes).
 */
import colors from "./colors.json";

export interface Seo {
  title: string;
  description: string;
  /** Absolute URL of the OG image. */
  ogImage: string;
  /** Theme color for the meta tag. Reads from colors.json. */
  themeColor: string;
  /** Dark-mode theme color. Reads from colors.json. */
  themeColorDark: string;
  /** Twitter card config. */
  twitter: {
    card: "summary" | "summary_large_image";
    handle?: string;
  };
  /** The site origin. */
  site: string;
}

export const seo: Seo = {
  title: "Field notes from a frontend engineer",
  description:
    "A working engineer's portfolio. Build entries, real toolkit, honest placeholders for screenshots and links.",
  ogImage: "/og.png",
  themeColor: colors.themeColor.light,
  themeColorDark: colors.themeColor.dark,
  twitter: { card: "summary_large_image" },
  site: "https://ikbakk.github.io",
} as const;

Object.freeze(seo);
Object.freeze(seo.twitter);
