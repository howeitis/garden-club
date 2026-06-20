/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary:    '#2D5F3E', // forest green — AA on white (7.45:1) & cream (6.62:1)
        background: '#F5F1EB', // cream page background
        // Charcoal body text. Darkened from #3A3A3A so the muted opacity tiers
        // (text-text/65 and up) clear WCAG AA 4.5:1 over the cream background.
        text:       '#262626',

        // ── Bright fills / borders / badges (decorative; not for body text) ──
        accent:     '#7B9E6B', // sage green
        blossom:    '#F2AABF', // peach blossom pink
        'blossom-deep': '#E07899', // deeper peach blossom for fills/icons
        holly:      '#C41E3A', // holly berry red — AA as text (5.19:1 on cream)
        'holly-light': '#F7D7DD', // soft holly berry tint
        hen:        '#A8C8E0', // Delaware Blue Hen light blue
        coral:      '#E8574F', // bright flower coral-red
        sunflower:  '#F4C430', // sunflower yellow
        lavender:   '#C5A8D4', // garden lavender purple
        marigold:   '#F28C28', // marigold orange

        // ── AA-safe text variants (≥4.5:1 on cream) for colored labels ──
        'blossom-light': '#F7C9D6', // pink eyebrows on the dark green hero/footer (5.07:1 on primary)
        rose:            '#B23A5B', // deep rose — pink-toned text on light backgrounds (5.11:1)
        'accent-deep':   '#4C7A3A', // sage-green text on light backgrounds (4.50:1)
        'marigold-deep': '#A85A12', // marigold-orange text on light backgrounds (4.51:1)
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
