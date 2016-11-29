'use strict';

var path = require('path');

exports.database = 'mongodb://localhost/feedit';

exports.publicPath = path.resolve(__dirname, '..','web/public');
exports.resourcePath = path.resolve(__dirname, '..', 'web/resources');
exports.viewsPath = path.resolve(__dirname, '..', 'web/views');
exports.loginPath = 'login/index.html';
exports.homePath = 'home/index.html';
exports.pageSize = 20;
