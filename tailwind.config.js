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
        },
        primary: {
          light: colors.sky[400],
          main: colors.sky[500],
          dark: colors.sky[800]
        },
        secondary: {
          light: colors.orange[500],
          main: colors.orange[600],
          dark: colors.orange[700]
        },
        dark: {
          light: colors.slate[400],
          main: colors.slate[600],
          dark: colors.slate[900]
        }
      },
      borderRadius: {
        circle: '50%'
      }
    }
  },
  plugins: []
}
