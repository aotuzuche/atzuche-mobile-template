const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// const path = require('path')
const config = require('./conf')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const APP_CONFIG = require('../appConfig.js')
const address = require('address')

const port = APP_CONFIG.port

const baseWebpackConfig = require('./webpack.base.conf')
// 针对生产环境修改配置
const webpackConfig = merge(baseWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',

  output: {
    path: config[process.env.PACKAGE].assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[name].js'),
    publicPath: config[process.env.PACKAGE].assetsPublicPath
  },

  plugins: [
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env.PACKAGE': JSON.stringify(process.env.PACKAGE)
    }),

    // 热更新
    new webpack.HotModuleReplacementPlugin(),

    // 美化本地开发时的终端界面
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `
          本地==> http://localhost:${port}
          路由==> http://${address.ip()}:${port}
          `
        ]
      }
    })
  ],

  devServer: {
    contentBase: __dirname,
    historyApiFallback: true,
    hot: true,
    open: true,
    inline: true,
    quiet: true,
    disableHostCheck: true,
    port: port,
    proxy: {
      '/proxy/*': {
        target: APP_CONFIG.target,
        pathRewrite: {
          '^/proxy/': '/'
        },
        changeOrigin: true,
        secure: false
      }
    }
  }
})

module.exports = webpackConfig
