'use strict';

var koa = require('koa');
var path = require('path');
var _ = require('koa-route');
var serve = require('koa-static');
var session = require('koa-session');
var bodyParser = require('koa-bodyparser');
var child_process = require('child_process');

var render = require('./render');
var config = require('./config');
var controller = require('../web/controllers')

exports.init = function(port) {

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

  app.listen(port, function() {
    var server_url = `http://localhost:${port}/feedit`;
    console.log(`server start: ${server_url}`);
    child_process.exec(`open ${server_url}`);
  });}

