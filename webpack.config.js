var base = require('./webpack.config.factory');

module.exports = [base.getConfig('vk'), base.getConfig('uvc')];
