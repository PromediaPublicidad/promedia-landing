/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        promedia: {
          teal: '#167c88',
          dark: '#135c66',
          accent: '#ff6f3c',
        }
      }
    },
  },
  plugins: [],
  plugins: [require('tailwind-scrollbar-hide')],
}