const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')

const common = {
  entry: [
    path.resolve(__dirname, 'client')
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.jsx', '.js', '']
  },
  module: {
    loaders: [
      {
        test:/\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}

//config for dev setup
const devConfig = {
  devtool: 'source-maps'
}

const prodConfig = {
  devtool: 'source-maps',
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     beautify: false,
  //     comments: false,
  //     compress: {
  //       warnings: false
  //     },
  //     mangle: {
  //       except: ['$'],
  //       screw_ie8: true,
  //       keep_fnames: true
  //     }
  //   })
  // ]
}

const target = process.env.npm_lifecycle_event
switch (target) {
case 'dev':
  module.exports = merge(common, devConfig)
  break
default:
  module.exports = merge(common, prodConfig)
  break
}
