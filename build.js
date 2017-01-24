require('shelljs/global')

var path = require('path')
var webpack = require('webpack')
var webpackConfig = require('./webpack.build.config')

copyStatic()

webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  console.log('[webpack:dev]', stats.toString({
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }))
  copyDistToPublic()
})

function copyStatic() {
  var staticPath = path.resolve(__dirname, 'dist/static')
  // rm('-rf', staticPath)
  mkdir('-p', staticPath)
  cp('-R', 'static/', staticPath)
}

function copyDistToPublic() {
  var publicPath = path.resolve(__dirname, '../information/app/static/public')

  console.log('copying dist to', publicPath)

  // rm('-rf', publicPath)
  // mkdir('-p', publicPath)
  cp('-R', 'dist/', publicPath)

  console.log('done', publicPath)
}
