var webpack = require('webpack')
var path = require('path')

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractAPP = new ExtractTextPlugin('[name].css', {allChunks: true})
var extractScoped = new ExtractTextPlugin('[name]_scoped.css')

module.exports = {
  entry: {
    app: './src/app-main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    root: [
      path.resolve('./src')
    ],
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'jquery': path.join(__dirname, 'node_modules/jquery'),
      'moment': path.join(__dirname, 'node_modules/moment'),
      'jquery.ui.widget': path.join(__dirname, 'node_modules/blueimp-file-upload/js/vendor/jquery.ui.widget')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {test: /\.vue$/, loader: 'vue'},
      {test: /\.html$/, loader: 'vue-html'},
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loader: extractAPP.extract('css')},
      {test: /\.scss$/, loader: extractAPP.extract('css!sass')},
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 5000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  vue: {
    loaders: {
      // css: extractScoped.extract('css'),
      // sass: extractScoped.extract('css!sass')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      '_': 'lodash',
      Vue: 'vue',
      'window.Vue': 'vue',
      'moment': 'moment'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    extractAPP,
    extractScoped
  ]
}
