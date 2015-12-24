'use strict';

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
    'example': './example/index.js',
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].bundle.js',
    publicPath: '/build'
  },
};
