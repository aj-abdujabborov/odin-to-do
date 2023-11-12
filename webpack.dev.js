const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: ['./dist'],
        watchFiles: ['./src/**/*'], // to serve changes to HTML
        }
});