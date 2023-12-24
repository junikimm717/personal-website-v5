import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://junickim.me',
  integrations: [tailwind(), react(), mdx(), sitemap()],
  vite: {
    ssr: {
      noExternal: ["react-icons"]
    }
  },
  markdown: {
    shikiConfig: {
      experimentalThemes: {
        light: 'min-light',
        dark: 'one-dark-pro'
      }
    },
  }
});
