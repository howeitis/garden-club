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
        'blossom-deep': '#E07899', // deeper peach blossom for accents
        holly:      '#C41E3A', // holly berry red
        'holly-light': '#F7D7DD', // soft holly berry tint
        hen:        '#A8C8E0', // Delaware Blue Hen light blue
        coral:      '#E8574F', // bright flower coral-red
        sunflower:  '#F4C430', // sunflower yellow
        lavender:   '#C5A8D4', // garden lavender purple
        marigold:   '#F28C28', // marigold orange
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
};
