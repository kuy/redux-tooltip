module.exports = function(config) {
  var configuration = {
    basePath: '',
    frameworks: ['mocha-debug', 'mocha', 'sinon'],
    files: [
      'tests/feature/*.js'
    ],
    exclude: [],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-mocha-debug',
      'karma-mocha-reporter',
      'karma-sinon',
      'karma-webpack'
    ],
    preprocessors: {
      'tests/feature/*.js': ['webpack'],
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
              presets: ['react', 'es2015', 'stage-2'],
              plugins: ['babel-plugin-espower']
            }
          },
          {
            test: /\.json$/,
            loader: 'json'
          }
        ]
      },
      node: {
        fs: 'empty'
      }
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
  };

  config.set(configuration);
}
