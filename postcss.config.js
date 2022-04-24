const plugins = ['tailwindcss']

if (process.env.NODE_ENV === 'production') {
  plugins.push([
    '@fullhuman/postcss-purgecss',
    {
      content: [
        './pages/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}'
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    }
  ])
}

plugins.push('postcss-preset-env')

module.exports = { plugins }