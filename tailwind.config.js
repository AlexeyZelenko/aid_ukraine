/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ukraine-blue': '#0057b7',
        'ukraine-yellow': '#ffd700',
        'ukraine-blue-light': '#4a90e2',
        'ukraine-yellow-light': '#ffeb3b',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}