import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://junickim.me",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  server: { port: 1434, host: true },
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
  },
  markdown: {
    shikiConfig: {
      experimentalThemes: {
        light: "light-plus",
        dark: "dark-plus",
      },
    },
  },
});
