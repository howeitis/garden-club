/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary:    '#2D5F3E',
        background: '#F5F1EB',
        text:       '#3A3A3A',
        accent:     '#7B9E6B',
        blossom:    '#F2AABF', // peach blossom pink
        holly:      '#C41E3A', // holly berry red
        hen:        '#A8C8E0', // Delaware Blue Hen light blue
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
