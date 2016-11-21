'use strict';

function *logout() {
  this.session = null;
  this.redirect('/feedit');
}

function *dispatch() {
  yield logout.call(this);
}

module.exports = dispatch;
