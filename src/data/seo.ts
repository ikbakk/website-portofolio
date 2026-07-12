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
  title: "Muhammad Iqbal Firdaus — Frontend & Mobile Engineer",
  description:
    "Portfolio of Muhammad Iqbal Firdaus, a Frontend Engineer and Mobile Engineer in Mataram, Indonesia, working with React, Next.js, Astro, Flutter, REST APIs, IoT dashboards, and technical SEO.",
  ogImage: "/og.png",
  themeColor: colors.themeColor.light,
  themeColorDark: colors.themeColor.dark,
  twitter: { card: "summary_large_image" },
  site: "https://ikbakk.vercel.app",
} as const;

Object.freeze(seo);
Object.freeze(seo.twitter);
