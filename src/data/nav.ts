/**
 * Nav. The five folios that anchor the page. Each entry maps 1-to-1
 * to a page route and a spine marker.
 *
 *   id      -  the page id used in the original artifact (field-note etc.)
 *   number  -  the printed folio number on the folio bar (01 / 02 / ...)
 *   name    -  the printed section name (Field note / Selected work / ...)
 *   slug    -  the URL segment, also the Astro file name
 *   route   -  the absolute route, including the leading slash
 */
export interface NavFolio {
  id: string;
  number: string;
  name: string;
  section: string;
  slug: string;
  route: string;
}

export const folios: ReadonlyArray<NavFolio> = [
  { id: "field-note", number: "01", name: "Field note",      section: "intro",     slug: "index",     route: "/" },
  { id: "selected-work", number: "02", name: "Selected work",   section: "work",      slug: "work",      route: "/work" },
  { id: "toolkit", number: "03", name: "Toolkit",         section: "toolkit",   slug: "toolkit",   route: "/toolkit" },
  { id: "approach", number: "04", name: "Approach",        section: "approach",  slug: "approach",  route: "/approach" },
  { id: "contact", number: "05", name: "Contact",         section: "contact",   slug: "contact",   route: "/contact" },
] as const;

export function folioByRoute(route: string): NavFolio | undefined {
  return folios.find((f) => f.route === route);
}
