module.exports = function(config) {
  var configuration = {
    basePath: '',
    frameworks: ['mocha-debug', 'mocha', 'browserify'],
    files: [
      'test/features/**/*.js'
    ],
    exclude: [],
    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-mocha-debug',
      'karma-browserify'
    ],
    preprocessors: {
      'test/features/**/*.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: [
        [
          'babelify', {
            presets: ['react', 'es2015', 'stage-2'],
            plugins: ['babel-plugin-espower']
          }
        ]
      ]
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  };

  if(process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
}
