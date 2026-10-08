/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#0D0D0D',
        border: '#1A1A1A',
        cyan: '#00FFD1',
        purple: '#7B61FF',
        red: '#FF4D6D',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'equalizer': 'equalizer 0.5s ease-in-out infinite alternate',
        'pulse-border': 'pulse-border 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        equalizer: {
          '0%': { height: '10%' },
          '100%': { height: '100%' },
        },
        'pulse-border': {
          '0%, 100%': { borderColor: '#00FFD1', opacity: '1' },
          '50%': { borderColor: '#7B61FF', opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
