module.exports = function(config) {
  config.set({
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
    singleRun: true,
    concurrency: Infinity
  });
}
