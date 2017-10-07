/**
 * Karma configuration
 * @created 2017-10/12 by Steve Zhao <steve.zhao@travelctm.com>
 */


module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['source-map-support','mocha'],


        // list of files / patterns to load in the browser
        files: [
            {pattern: 'widgets/**/*.js?', included: false},
            {pattern: 'widgets/**/*_spec.js', included: true},
            {pattern: '**/*.map', included: false}
        ],


        // list of files to exclude
        exclude: [
            'app',
            'vendor',
            'node_modules'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'widgets/**/*.js?': [ 'webpack', ],
            'widgets/**/*_spec.js': ['webpack'],
        },
        webpackMiddleware: {
            noInfo: true,
            stats: 'errors-only'
        },
        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                extensions: ['.js', '.jsx']
            },
            //webpack configuration

            module: {
                rules: [
                    {
                        test: /\.js$|\.jsx$/,
                        use: [{
                            loader: "babel-loader",
                            options: {
                                presets: ['react',['es2015', {module: true}]],
                                plugins: [
                                    "transform-class-properties",
                                    "transform-es2015-parameters",
                                    "transform-object-rest-spread",
                                    "lodash"
                                ]
                            }
                        }],
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.js$|\.jsx$/,
                        loader: 'istanbul-instrumenter-loader',
                        options: {esModules: true},
                        enforce: 'post',
                        exclude: /node_modules|.*_spec.js$/,
                    }
                ]
            }
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'coverage-istanbul'],

        coverageIstanbulReporter: {
            reports: [ 'text-summary', 'html' ],
            fixWebpackSourcePaths: true
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: 1,

    })
}
