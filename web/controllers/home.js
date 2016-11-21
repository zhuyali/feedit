'use strict';

var _ = require('xutil');

var model = require('../../common/models');
var render = require('../../lib/render');
var config = require('../../lib/config');

var item = model.item;

function *getContext() {
  var context = {};
  var totalCount = item.getTotalCount(this.query.search);
  var search = this.query.search || '';
  var page = this.query.page || 1;
  var username = this.session.user.username;

  var data = yield item.findByCondition(username, search, page);
  context.pageCount = Math.ceil(totalCount / config.pageSize);
  var res = [];
  data.forEach(function(_data) {
    var temp = {};
    temp.url = _data.url;
    temp.title = _data.title;
    temp.read = _data.read;
    temp.create_at = _.moment(_data.create_at).format('YYYY-MM-DD HH:mm:ss');
    res.push(temp);
  });
  context.items = res;
  return context;
}

function *renderHome() {
  var context = yield getContext.call(this);
  this.body = render(config.homePath, context);
}

function *dispatch() {
  if(this.session.user) {
    yield renderHome.call(this);
  } else {
    this.redirect('/feedit/');
  }
}

module.exports = dispatch;
