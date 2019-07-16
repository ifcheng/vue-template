module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/foo/' : '/',
  productionSourceMap: false,
  devServer: {
    proxy: {}
  }
}
