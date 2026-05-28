# Agent Guide

This is a small Astro personal website. Prefer preserving the existing visual
design and prose-first editing flow over adding new abstractions.

## Project Shape

- Framework: Astro 5 with MDX, React islands, Tailwind, sitemap, and Partytown.
- Routes live in `src/pages/`, mostly as `.mdx`.
- English routes are under `src/pages/en/`; Korean routes are under
  `src/pages/ko/`.
- Shared HTML metadata is built in `src/layouts/Layout.astro` using
  `src/lib/seo.ts`.
- The normal content layouts are `src/layouts/MdxPage.astro` and
  `src/layouts/KoMdxPage.astro`; `src/layouts/MinimalMdxPage.astro` is for
  pages that intentionally avoid the normal sidebar frame.

## Design And Refactor Boundaries

- Most MDX content is intentionally ad hoc. Do not turn project, ricing, or
  narrative sections into data-driven cards/components unless explicitly asked.
- Reuse should focus on shell-level pieces: layout frames, prose styling, nav
  styling, SEO helpers, and small utility components.
- Avoid visual redesigns unless requested. Preserve fonts, colors, shadows,
  spacing, breakpoints, and dark-mode behavior.
- `src/components/Imagelist.astro` is the appropriate image reuse boundary for
  MDX pages. Keep page content readable directly in MDX.

## Shell And Styling

- Global CSS is in `src/base.css`; navbar-specific CSS is in `src/navbar.css`.
- `site-panel` is the semantic panel class. `.column` remains as a compatibility
  alias for the same visual treatment.
- `mdx-prose` centralizes the Tailwind Typography class stack. Add
  `mdx-prose-link-hover` only where hover-bold links are intended.
- Navbar list/link styles must stay scoped under `.site-nav` to avoid leaking
  into MDX content.
- `src/components/SiteFrame.astro` owns the shared two-column page shell. Keep
  English and Korean nav markup directly editable in `Body.astro` and
  `KoBody.astro`.

## React Islands

- `src/components/Navbar.tsx` is the main interactive island. CSS breakpoints
  choose mobile vs desktop nav; React only controls mobile open/closed state.
- Keep the mobile dropdown behavior simple. It currently uses `AnimatePresence`
  with `height: 0` to `height: auto` and `0.5s easeInOut`.
- Do not persist the mobile nav open state across route/language changes unless
  the interaction is redesigned and manually checked in browser.
- `src/components/Settings.astro` is a static language switch link, not a React
  island.
- `src/components/Rickroll.tsx` is only for the 404 embed; responsive iframe
  sizing lives in `src/base.css`.

## SEO And Content Metadata

- MDX frontmatter generally includes `layout` and `title`.
- `Layout.astro` also supports `description`, `image`, and `noindex` through
  `buildSeoMetadata`.
- `scripts/check-seo.mjs` validates generated `dist/` output, canonical URLs,
  sitemap links, alternates, robots, and internal links.
- Route alternates are explicitly listed in `src/lib/seo.ts`. Be careful when
  adding or renaming localized routes.

## Verification

Run these after code changes:

```sh
npm run build
npm run check:seo
```

For touched React files, run targeted ESLint, for example:

```sh
npx eslint "src/components/Navbar.tsx" "src/components/Rickroll.tsx"
```

For formatting, prefer checking touched files instead of the whole repo:

```sh
npx prettier --check "path/to/touched-file"
```

Known caveats:

- `npm run build` currently emits an existing Tailwind config ESM warning for
  `tailwind.config.cjs`.
- Repo-wide `npx eslint .` and `npx prettier --check .` include generated or
  vendored files such as `.astro/` and `.cursor/skills/`, so they may fail for
  pre-existing reasons unrelated to a small source change.
