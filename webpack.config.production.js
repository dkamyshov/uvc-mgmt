var package = require('./package.json');
var merge = require('webpack-merge');
var base = require('./webpack.config');

module.exports = merge(base, {
  mode: 'production',
  devtool: 'none',

  output: {
    filename: '[name].' + package.mode + '.[contenthash].js',
    publicPath: './',
  },
});
