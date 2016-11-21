'use strict';

var model = require('../../common/models');

var item = model.item;

function *remove() {
  var username = this.session.user.username;
  var url = decodeURI(this.query.url);
  item.removeByUrl(username, url);
}

function *update() {
  var username = this.session.user.username;
  var url = decodeURI(this.query.url);
  item.updateStatus(username, url);
}

function *add() {
  var username = this.session.user.username;
  var title = decodeURI(this.query.title);
  var url = decodeURI(this.query.url);
  item.add(username, title, url);
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
    }
  } else {
    this.redirect('/feedit/');
  }
}

module.exports = dispatch;

