/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,css}", "*.{html,js,css}"],
  theme: {
    extend: {
      colors: {
        "light-dark": "#242424",
        "dark": "#151515",
        "white": "#ffffff",
        "light-green": "#4de29e",
        "dark-green": "#2d7252",
      },
      fontFamily: {
        "Space-Grotesk": ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}