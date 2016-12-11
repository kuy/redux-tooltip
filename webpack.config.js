'use strict';

var webpack = require('webpack');

var config = {
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
  entry: {
    'simple': './examples/simple/index.js',
    'origin': './examples/origin/index.js',
    'place': './examples/place/index.js',
    'delay': './examples/delay/index.js',
    'keep': './examples/keep/index.js',
    'remote': './examples/remote/index.js',
    'content': './examples/content/index.js',
    'multiple': './examples/multiple/index.js',
    'style': './examples/style/index.js'
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].bundle.js',
    publicPath: '/build'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'shared',
      filename: 'shared.js',
    }),
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') }
  }), new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      sourceMap: false
  }));
}

module.exports = config;
