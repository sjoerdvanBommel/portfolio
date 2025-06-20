import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      breakpoints: {
        sm: '44rem',
        md: '64rem',
        lg: '80rem',
        xl: '96rem',
      },
    },
  },

  staticCss: {
    css: [
      {
        properties: {
          background: [
            'linear-gradient(to bottom right, var(--from, var(--primary-10)), var(--to, var(--secondary-11)))',
          ],
          backgroundClip: ['text'],
          WebkitTextFillColor: ['transparent'],
        },
      },
    ],
  },

  // The output directory for your css system
  outdir: 'styled-system',
})
