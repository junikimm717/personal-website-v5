import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://junic.kim",
  integrations: [
    react(),
    mdx(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  i18n: {
    locales: ["en", "ko"],
    defaultLocale: "en",
  },
  server: { port: 1434, host: true },
  vite: {
    resolve: {
      noExternal: ["react-icons"],
    },
  },
  markdown: {
    // WHAT why is this not default??
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: {
        light: "light-plus",
        dark: "monokai",
      },
    },
  },
});
