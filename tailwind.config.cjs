/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "media",
  theme: {
    screens:{
      'twocol': '700px',
    },
    extend: {
      colors: {
        'primary': '#750014',
        'primary-dark': '#ff1423',
        'darkbg': '#212326'
      },
    },
    fontFamily: {
      'sans': 'IBM Plex Sans, IBM Plex Sans KR, sans-serif',
      'mono': 'Roboto Mono, Noto Sans KR, monospace',
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
