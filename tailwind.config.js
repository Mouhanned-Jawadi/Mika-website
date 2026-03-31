/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          ivory: '#fffaf6',
          blush: '#f7d9dd',
          berry: '#b24366',
          rose: '#8f3552',
          gold: '#c69967',
          ink: '#2d1f29',
          muted: '#6d5a66',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 35px -20px rgba(143, 53, 82, 0.35)',
        glow: '0 12px 25px -12px rgba(178, 67, 102, 0.5)',
      },
    },
  },
  plugins: [],
}

