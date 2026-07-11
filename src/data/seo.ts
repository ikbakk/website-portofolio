/**
 * SEO / site metadata. The BaseLayout reads from here and uses the
 * values to populate <title>, <meta>, the theme-color, and the OG
 * image.
 */
export interface Seo {
  title: string;
  description: string;
  /** Absolute URL of the OG image. */
  ogImage: string;
  /** Light-mode theme color; the dark-mode variant is set in head. */
  themeColor: string;
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
  themeColor: "#ededed",
  twitter: { card: "summary_large_image" },
  site: "https://ikbakk.github.io",
} as const;

Object.freeze(seo);
Object.freeze(seo.twitter);
