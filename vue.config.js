const path = require('path')

module.exports = {
  // 如果路由使用的是 history 模式，publicPath 应为绝对路径
  publicPath: './',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    open: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        img: path.join(__dirname, 'src/assets/img')
      }
    }
  }
}
