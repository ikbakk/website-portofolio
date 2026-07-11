/**
 * The four identity marks, in render order.
 *
 *   id        — body[data-direction] value (a / b / c / d)
 *   name      — printed name (Speak / Seal / Field / Dialogue)
 *   tagline   — short one-line description
 *   description — longer one-sentence read for the identity page
 *   palette   — list of tokens (token name + hex) used by the mark
 *   prompt    — copy-paste model prompt for a raster render
 *   model     — recommended image model + aspect
 *
 * The actual SVG geometry lives in the Mark.astro component, which
 * switches on `mark.id`. This file holds the *description* of each
 * direction; the component holds the *form*.
 */
export interface Swatch {
  token: string;
  hex: string;
  note?: string;
}

export interface Mark {
  id: "a" | "b" | "c" | "d";
  name: string;
  tagline: string;
  description: string;
  palette: Swatch[];
  prompt: string;
  model: string;
  aspect: string;
}

export const marks: ReadonlyArray<Mark> = [
  {
    id: "a",
    name: "Speak",
    tagline: "A single green dot inside an empty speech bubble. The most restrained mark in the system / it reads as a quiet invitation to talk, not a logo shouting for attention.",
    description: "The safest reading. A green outline + one dot. Use as the favicon / social card avatar.",
    palette: [
      { token: "--accent", hex: "#07c160" },
      { token: "--bg",     hex: "#ededed" },
      { token: "--fg",     hex: "#1a1a1a" },
    ],
    model: "flux-pro-ultra",
    aspect: "1:1",
    prompt:
      "Minimalist editorial brand mark on a flat muted light gray (#ededed) background. A single rounded speech bubble outline in saturated WeChat green (#07c160) with a 2.5px stroke and no fill, small tail at the bottom-left. One WeChat green filled circle inside the bubble, slightly off-center to the left. Pure flat vector. No gradients, no shadows, no glow, no 3D, no emboss. Centered in frame with generous negative space. Reference: Swiss design, Massimo Vignelli, Muji, WeChat.",
  },
  {
    id: "b",
    name: "Seal",
    tagline: "A square hanko in WeChat green with a reverse-out italic monogram. References Chinese chops, but in the brand's signature green rather than the traditional vermillion / a deliberate signal that the system is the brand, not the cliche.",
    description: "The most original. Solid green square + reverse-out italic letter. Use on the resume header.",
    palette: [
      { token: "--accent", hex: "#07c160" },
      { token: "--on-accent", hex: "#ffffff" },
    ],
    model: "flux-pro-ultra",
    aspect: "1:1",
    prompt:
      "Minimalist editorial brand mark on a flat muted light gray (#ededed) background. A solid filled square in saturated WeChat green (#07c160) with slightly rounded corners (2px radius). A single large italic serif letter in pure white (#ffffff) sits at the optical center of the square. Newsreader / Iowan Old Style style, italic, weight 500, optical size around 60pt. Pure flat vector. No gradients, no shadows, no glow, no 3D, no emboss. Centered in frame with generous negative space. Reference: Chinese chops, Massimo Vignelli, modernized WeChat, late-1990s Wired magazine, Pentagram partner marks.",
  },
  {
    id: "c",
    name: "Field",
    tagline: "A pure typographic mark. A single Newsreader italic letter carries the entire brand; the wordmark simply spells out the rest. The most editorial direction in the system / and the hardest to fake.",
    description: "The most editorial. A single italic letter is the mark. Use as the in-corner mark of the portfolio.",
    palette: [
      { token: "--fg", hex: "#1a1a1a" },
      { token: "--bg", hex: "#ededed" },
    ],
    model: "ideogram-v3-fal",
    aspect: "1:1",
    prompt:
      "A single large italic serif letter f in dark ink (#1a1a1a) on a flat muted light gray (#ededed) background. The letter is the entire mark / no other geometry, no symbol, no decoration. Newsreader / Iowan Old Style style, italic, regular weight 400, optical size around 60pt. The letter sits on the optical center of the canvas with generous negative space on all sides. Pure flat vector. No gradients, no shadows, no glow, no 3D. Reference: editorial monograph covers (Knopf, New Directions), Massimo Vignelli, late-1990s Faber & Faber.",
  },
  {
    id: "d",
    name: "Dialogue",
    tagline: "Two interlocking speech forms / one filled, one outlined / offset diagonally. References the chat-app heritage of the design system, but reads as two voices in conversation rather than a single brand shouting.",
    description: "The most communicative. Two bubbles, one filled, one outlined. Use as the section marker for Selected work.",
    palette: [
      { token: "--accent", hex: "#07c160" },
      { token: "--fg",     hex: "#1a1a1a" },
      { token: "--bg",     hex: "#ededed" },
    ],
    model: "flux-pro-ultra",
    aspect: "1:1",
    prompt:
      "Minimalist editorial brand mark on a flat muted light gray (#ededed) background. Two overlapping rounded speech bubble forms offset diagonally by 8px: the upper-left one is a solid filled WeChat green (#07c160) bubble with a small tail at the bottom-left, the lower-right one is the same bubble shape but rendered as a 2px dark ink (#1a1a1a) outline with no fill and a small tail at the bottom-right. The two bubbles overlap at the center by about a quarter of their width. No gradients, no shadows, no glow, no 3D, no emboss. Centered with generous negative space. Reference: Massimo Vignelli, modernized WeChat, late-1990s Wired magazine, Pentagram partner marks.",
  },
] as const;

export const defaultDirection: Mark["id"] = "a";
export const validDirections = marks.map((m) => m.id);

export function markById(id: string): Mark | undefined {
  return marks.find((m) => m.id === id);
}
