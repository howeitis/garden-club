/** @type {import('tailwindcss').Config} */
// Heritage palette drawn directly from the club's watercolor logo:
// deep gate-green ironwork, antique-gold scrollwork, peach-blossom pink,
// holly berry red, and sage foliage on a warm ivory ground.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary:    '#2A5434', // deep gate green
        background: '#FAF7F0', // warm ivory
        text:       '#33322C', // warm ink
        accent:     '#7A9367', // sage foliage
        gold:       '#8F7433', // antique-gold scrollwork — primary accent
        'gold-soft': '#C9AE6A', // lighter gold for rules on dark grounds
        blossom:    '#D9A0AE', // dusty peach-blossom pink
        'blossom-deep': '#A65868', // deep blossom for text on light grounds
        holly:      '#8E3B45', // refined holly-berry burgundy
        'holly-light': '#F2E4E2', // soft holly tint
        hen:        '#A9BFCE', // muted slate blue
        coral:      '#B96A57', // muted terracotta
        sunflower:  '#C9A24B', // antique gold, light
        lavender:   '#A79BB8', // muted garden lavender
        marigold:   '#A87B2F', // deep ochre gold
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
        // Legacy token — the cursive wordmark was retired in the design
        // refresh; anything still using font-script renders the heading serif.
        script: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        label: '0.24em', // small-caps eyebrow labels
      },
    },
  },
  plugins: [],
};
