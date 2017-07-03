module.exports = function(config) {
  var configuration = {
    basePath: '',
    frameworks: ['mocha', 'sinon'],
    files: [
      'tests/feature/*.js',
      'examples/*.css'
    ],
    exclude: [],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sinon',
      'karma-webpack',
      'karma-html2js-preprocessor'
    ],
    preprocessors: {
      'tests/feature/*.js': ['webpack'],
      'examples/*.css': ['html2js']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['react', 'es2015', 'stage-2', 'power-assert']
            }
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
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
    phantomjsLauncher: {
      options: {
        viewportSize: {
          width: 800,
          height: 600
        }
      }
    },
    singleRun: false,
    concurrency: Infinity,
  };

  config.set(configuration);
}
