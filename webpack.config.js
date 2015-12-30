'use strict';

var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.(js)$/,
      loader:  'babel',
      exclude: /node_modules/,
    }],
  },
  entry: {
    'simple': './examples/simple/index.js',
    'delay': './examples/delay/index.js',
    'keep': './examples/keep/index.js',
    'remote': './examples/remote/index.js',
    'content': './examples/content/index.js',
    'multiple': './examples/multiple/index.js',
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
