var package = require('./package.json');
var merge = require('webpack-merge');
var base = require('./webpack.config.factory');

function getProductionConfig(mode) {
  return merge(base.getConfig(mode), {
    mode: 'production',
    devtool: 'none',

    output: {
      filename: '[name].' + mode + '.[contenthash].js',
      publicPath: './',
    },
  });
}

module.exports = [getProductionConfig('vk'), getProductionConfig('uvc')];
