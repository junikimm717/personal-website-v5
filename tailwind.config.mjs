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
        'primary': '#750014',
        'primary-dark': '#ffb3ff',
        'darkbg': '#212326'
      },
    },
    fontFamily: {
      'sans': 'IBM Plex Sans, sans-serif',
      'mono': 'Roboto Mono, monospace',
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
