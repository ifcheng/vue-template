const path = require('path')

module.exports = {
  // 路由使用history模式时，publicPath避免使用相对路径
  publicPath: '',
  productionSourceMap: false,
  lintOnSave: false,
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
