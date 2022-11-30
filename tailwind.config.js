const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{html,js,jsx,ts,tsx}',
    './components/**/*.{html,js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Mono', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        error: {
          light: colors.red[300],
          main: colors.red[500],
          dark: colors.red[900]
        },
        success: {
          light: colors.green[300],
          main: colors.green[500],
          dark: colors.green[900]
        }
      }
    },
  },
  plugins: []
}
