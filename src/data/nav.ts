/**
 * Nav. The five folios that anchor the page. Each entry maps 1-to-1
 * to a page route and a spine marker.
 *
 *   id     — the page id used in the original artifact (page-01 etc.)
 *   number — the printed folio number on the folio bar (01 / 02 / ...)
 *   name   — the printed section name (Field note / Selected work / ...)
 *   slug   — the URL segment, also the Astro file name
 *   route  — the absolute route, including the leading slash
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
  { id: "page-01", number: "01", name: "Field note",      section: "intro",     slug: "index",     route: "/" },
  { id: "page-02", number: "02", name: "Selected work",   section: "work",      slug: "work",      route: "/work" },
  { id: "page-03", number: "03", name: "Toolkit",         section: "toolkit",   slug: "toolkit",   route: "/toolkit" },
  { id: "page-04", number: "04", name: "Approach",        section: "approach",  slug: "approach",  route: "/approach" },
  { id: "page-05", number: "05", name: "Contact",         section: "contact",   slug: "contact",   route: "/contact" },
] as const;

export const identityRoute = "/identity" as const;
export const identitySlug = "identity" as const;
export const identityFolio: NavFolio = {
  id: "page-00-identity",
  number: "00",
  name: "Identity",
  section: "identity",
  slug: "identity",
  route: identityRoute,
};

export function folioByRoute(route: string): NavFolio | undefined {
  if (route === identityRoute) return identityFolio;
  return folios.find((f) => f.route === route);
}
