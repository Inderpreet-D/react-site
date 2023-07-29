const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  eslint: {
    dirs: [
      'components',
      'lib',
      'pages',
      'providers',
      'shared',
      'themes',
      'utilities'
    ]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.plugins = [
      ...config.plugins,
      new webpack.ProvidePlugin({
        React: 'react'
      })
    ]
    return config
  },
  redirects: async () => {
    return [
      {
        source: '/toadvillage',
        destination: '/mtg/toadvillage',
        permanent: true
      }
    ]
  }
})
