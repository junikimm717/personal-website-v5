/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    screens:{
      'twocol': '700px',
    },
    extend: {
      colors: {
        'main': '#750014',
        'main-dark': '#ff1423',
      },
    },
    fontFamily: {
      'sans': 'IBM Plex Sans, sans-serif',
      'mono': 'Roboto Mono, monospace',
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
