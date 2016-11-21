'use strict';

var cryptp = require('crypto');

var config = require('../../lib/config');
var render = require('../../lib/render');
var model = require('../../common/models');

var user = model.user;

function *login() {
  var context = {};
  let data = this.request.body;
  let username = data.username;
  let password = data.password;

  var md5 = crypto.createHash('md5');
  md5.update(password);
  var safePassword = md5.digest('hex');

  if (!username || !password) {
    context.info = 'Please input username and password';
    return context;
  }

  try {
    let result = yield user.findByName(username);
    if (result[0].password === safePassword) {
      context.info = 'Login Success';
      var session = {};
      session.username = data.username;
      this.session.user = session;
      this.redirect('/feedit/home');
    } else {
      context.info = 'Wrong Password';
    }
  } catch(e) {
    context.info = 'User not exists';
  }

  return context;
}

function *renderLogin() {
  var context = yield login.call(this);
  this.body = render(config.loginPath, context);
}

function *dispatch() {
  yield renderLogin.call(this);
}

module.exports = dispatch;
