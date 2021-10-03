module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['components', 'pages', 'providers', 'shared', 'themes', 'utilities']
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
  }
}
