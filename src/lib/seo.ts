export type SiteLanguage = "en" | "ko";

export interface SeoInput {
  title?: string;
  description?: string;
  image?: string;
  lang: SiteLanguage;
  pathname: string;
  noindex?: boolean;
}

export interface AlternateLink {
  hreflang: string;
  href: string;
}

export const SITE_ORIGIN = "https://junic.kim";
export const SITE_NAME = "Juni Kim";

const LOCALES: Record<SiteLanguage, string> = {
  en: "en_US",
  ko: "ko_KR",
};

const ROUTE_ALTERNATES: Record<string, Partial<Record<SiteLanguage, string>>> = {
  "/": { en: "/en/", ko: "/ko/" },
  "/en/": { en: "/en/", ko: "/ko/" },
  "/ko/": { en: "/en/", ko: "/ko/" },
  "/en/dev/": { en: "/en/dev/", ko: "/ko/dev/" },
  "/ko/dev/": { en: "/en/dev/", ko: "/ko/dev/" },
  "/en/dev/setup/": { en: "/en/dev/setup/", ko: "/ko/dev/setup/" },
  "/ko/dev/setup/": { en: "/en/dev/setup/", ko: "/ko/dev/setup/" },
  "/en/ricing/": { en: "/en/ricing/", ko: "/ko/ricing/" },
  "/ko/ricing/": { en: "/en/ricing/", ko: "/ko/ricing/" },
};

export function buildSeoMetadata(input: SeoInput) {
  const pathname = normalizePath(input.pathname);
  const title = input.title?.trim() || SITE_NAME;
  const description = input.description?.trim();
  const canonicalUrl = absoluteUrl(pathname);
  const imageUrl = input.image ? absoluteUrl(input.image) : undefined;

  return {
    title,
    description,
    canonicalUrl,
    imageUrl,
    siteName: SITE_NAME,
    locale: LOCALES[input.lang],
    robots: input.noindex ? "noindex, nofollow" : "index, follow",
    twitterCard: imageUrl ? "summary_large_image" : "summary",
    alternates: alternateLinks(pathname),
  };
}

function alternateLinks(pathname: string): AlternateLink[] {
  const routes = ROUTE_ALTERNATES[pathname];
  if (!routes?.en || !routes?.ko) return [];

  return [
    { hreflang: "en", href: absoluteUrl(routes.en) },
    { hreflang: "ko", href: absoluteUrl(routes.ko) },
    { hreflang: "x-default", href: absoluteUrl(routes.en) },
  ];
}

function normalizePath(pathname: string) {
  if (!pathname || pathname === "/") return "/";
  if (pathname === "/404" || pathname === "/404/") return "/404.html";

  const [pathOnly] = pathname.split(/[?#]/);
  if (pathOnly.endsWith("/")) return pathOnly;
  if (pathOnly.includes(".")) return pathOnly;
  return `${pathOnly}/`;
}

function absoluteUrl(pathnameOrUrl: string) {
  return new URL(pathnameOrUrl, SITE_ORIGIN).toString();
}
