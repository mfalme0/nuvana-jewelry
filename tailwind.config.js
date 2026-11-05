/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./composables/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./server/**/*.{vue,js,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Botanical design system - authoritative tokens (hex values)
        ground: '#f5efdf',   // --dp-color-ground
        ink: '#1e382c',      // --dp-color-ink
        panel: '#e0e5d3',    // --dp-color-panel
        'warm-field': '#e6cbb8', // --dp-color-warm-field
        accent: '#895440',   // --dp-color-accent
        rule: '#d4d0bd',     // --dp-color-rule
        'ornament-line': '#b5baa4', // --dp-color-ornament-line
        'field-line': '#697961',    // --dp-color-field-line
      },
      fontFamily: {
        // --dp-typography-display = "Botanical Garamond", Georgia, serif
        display: ['"Botanical Garamond"', 'Georgia', 'serif'],
        // --dp-typography-reading = "Botanical Instrument", sans-serif
        reading: ['"Botanical Instrument"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // --dp-typography-body = 16px
        body: ['16px', { lineHeight: '1.5' }],
        // --dp-typography-metadata = 13px
        metadata: ['13px', { lineHeight: '1.5' }],
        // --dp-typography-label = 12px
        label: ['12px', { letterSpacing: '0.12em' }],
      },
      borderWidth: {
        // --dp-border-hairline = 1px
        hairline: '1px',
      },
      borderRadius: {
        // --dp-radius-panel = 34px
        panel: '34px',
        // --dp-radius-panel-narrow = 27px
        'panel-narrow': '27px',
        // --dp-radius-round = 50%
        round: '50%',
      },
      transitionDuration: {
        // --dp-motion-interaction = 0.35s
        interaction: '350ms',
      },
    },
  },
  plugins: [],
}
