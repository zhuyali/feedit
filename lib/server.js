'use strict';

var koa = require('koa');
var path = require('path');
var _ = require('koa-route');
var serve = require('koa-static');
var session = require('koa-session');
var bodyParser = require('koa-bodyparser');

var render = require('./render');
var config = require('./config');
var controller = require('../web/controllers')

exports.init = function() {

  var app = koa();
  app.keys = ['feedit'];
  app.use(session(app));
  app.use(bodyParser());
  app.use(serve(config.publicPath));
  app.use(serve(config.resourcePath));

  app.use(_.get('/feedit', function *() {
    this.body = render(config.loginPath, null);
  }));

  app.use(_.get('/feedit/home', controller.home));

  app.use(_.post('/feedit/login', controller.login));

  app.use(_.post('/feedit/register', controller.register));

  app.use(_.get('/feedit/api', controller.articals));

  app.use(_.get('/feedit/logout', controller.logout));

  app.listen(3000);
}

