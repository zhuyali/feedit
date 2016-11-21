'use strict';

var config = require('../../lib/config');
var render = require('../../lib/render');
var model = require('../../common/models');

var user = model.user;

function *register() {
  var context = {};
  let data = this.request.body;
  let username = data.username;
  let password = data.password;

  if (!username || !password) {
    context.info = 'Please input username and password';
    return context;
  }

  try {
    let userExists = yield user.findByName(username);
    if (userExists.length === 0) {
      let result = yield user.add(username, password);
      context.info = 'Register Success';
    } else {
      context.info = 'Username already exists';
    }
  } catch(e) {
    context.info = 'Register Failed';
  }

  return context;
}

function *renderRegister() {
  var context = yield register.call(this);
  this.body = render(config.loginPath, context);
}

function *dispatch() {
  yield renderRegister.call(this);
}

module.exports = dispatch;
