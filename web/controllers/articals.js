'use strict';

var model = require('../../common/models');

var item = model.item;

function *query() {
  var username = this.session.user.username;
  var url = devodeURI(this.query.url);
  try {
    let result = yield item.findByUrl(username, url);
    if (result.length === 0) {
      this.body = {success: false}
    } else {
      this.body = {success: true}
    }
  } catch(e) {
    this.body = {success: false}
  }
}

function *remove() {
  var username = this.session.user.username;
  var url = decodeURI(this.query.url);
  try {
    let result = yield item.removeByUrl(username, url);
    this.body = {success: true}
  } catch(e) {
    this.body = {success: false}
  }
}

function *update() {
  var username = this.session.user.username;
  var url = decodeURI(this.query.url);
  try {
    let result = yield item.updateStatus(username, url);
    this.body = {success: true}
  } catch(e) {
    this.body = {success: false}
  }
}

function *add() {
  var username = this.session.user.username;
  var title = decodeURI(this.query.title);
  var url = decodeURI(this.query.url);
  try {
    let result = yield item.findByUrl(username, url);
    if (result.length === 0) {
      let result = yield item.add(username, title, url);
    }
    this.body = {success: true};
  } catch(e) {
    this.body = {success: false};
  }
}

function *dispatch() {
  if (this.session.user) {
    switch(this.query.type)
    {
      case 'add':
        yield add.call(this);
        break;
      case 'remove':
        yield remove.call(this);
        break;
      case 'update':
        yield update.call(this);
        break;
      case 'query':
        yield query.call(this);
        break;
    }
  } else {
    this.redirect('/feedit/');
  }
}

module.exports = dispatch;

