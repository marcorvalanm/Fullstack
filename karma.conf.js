// Karma configuration for Jasmine + ChromeHeadless using Webpack to bundle ES modules
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: 'src/**/*.spec.js', watched: false }
    ],
    preprocessors: {
      'src/**/*.spec.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [ [ '@babel/preset-env', { targets: { chrome: '100' } } ] ]
              }
            }
          }
        ]
      },
      resolve: { extensions: ['.js'] }
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['ChromeHeadless'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-webpack'
    ],
    client: {
      jasmine: { random: false },
      clearContext: false
    },
    singleRun: false,
    autoWatch: true,
    concurrency: Infinity
  });
};
