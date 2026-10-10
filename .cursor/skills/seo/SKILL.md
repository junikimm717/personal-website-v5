---
name: seo
description: Maintain crawler, previewer, and AI freshness signals for this Astro site. Use when adding or renaming routes, changing SEO metadata, sitemaps, redirects, or llms.txt, or when debugging stale search, social, or AI caches.
---

# Site SEO And Freshness

HTML on Netlify already revalidates (`Cache-Control: public, max-age=0, must-revalidate` plus ETags). Stale Google, Slack, LinkedIn, Discord, and AI copies come from missing change signals or from old URLs that 302/404 instead of 301.

## Always Keep

- `SITE_UPDATED_AT` in `src/lib/seo.ts` feeds:
  - sitemap `<lastmod>` via `astro.config.mjs`
  - `og:updated_time` in `src/layouts/Layout.astro`
  - JSON-LD `WebPage.dateModified` in the same layout
- `public/llms.txt` tells AI crawlers to prefer sitemap lastmod over cached copies.
- Do not remove those fields to "clean up" head markup.
- Do not invent a second lastmod source unless asked. Deploy time is enough for this site.

## When Adding Or Renaming A Route

1. Add the page under `src/pages/en/` and/or `src/pages/ko/`.
2. If both languages exist, add the pair to `ROUTE_ALTERNATES` in `src/lib/seo.ts`.
3. List the canonical path in `public/llms.txt`.
4. If the English page could be requested without `/en` (for example `/dev/setup` or `/mop`), add a **301** in `netlify.toml`:
   - one-segment: `/mop` → `/en/mop/`
   - nested: `/dev/*` → `/en/dev/:splat` **and** `/dev` → `/en/dev/`
5. Never use 302 for those aliases. 302 keeps the old URL in indexes.
6. Leave `/` language negotiation as 302 (`Language = ["ko"]` → `/ko/`, otherwise `/en/`).

## Checks

After SEO, route, redirect, or `llms.txt` edits:

```sh
npm run build
npm run check:seo
```

`scripts/check-seo.mjs` requires sitemap lastmod, `og:updated_time`, JSON-LD `dateModified`, canonicals, alternates, robots, and internal links.

## What Not To Do

- Do not cache-bust `og:url` or the canonical with query strings.
- Do not add `no-store` cache headers; they do not refresh third-party unfurl caches.
- Do not 301 `/` to a single language. That fights the Accept-Language 302.
- After deploy, Slack/LinkedIn/Facebook may still hold an unfurl until their debugger is refreshed. That is their cache, not a missing site header.
