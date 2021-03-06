module.exports = api => {
  const cacheDirectory = api.resolve('node_modules/.cache/cache-loader')

  api.chainWebpack(webpackConfig => {
    webpackConfig.module
      .rule('js')
        .test(/\.jsx?$/)
        .include
          .add(api.resolve('src'))
          .add(api.resolve('test'))
          .end()
        .use('cache-loader')
          .loader('cache-loader')
          .options({ cacheDirectory })
          .end()
        .use('babel-loader')
          .loader('babel-loader')

    webpackConfig.module
      .rule('vue')
        .use('vue-loader')
        .tap(options => {
          options.loaders = options.loaders || {}
          options.loaders.js = [
            {
              loader: 'cache-loader',
              options: { cacheDirectory }
            },
            {
              loader: 'babel-loader'
            }
          ]
          return options
        })
  })
}
