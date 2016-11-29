'use strict';

var _ = require('xutil');

var model = require('../../common/models');
var render = require('../../lib/render');
var config = require('../../lib/config');
var pagination = require('../../lib/pagination');

var item = model.item;

function *getContext() {
  var context = {};
  var search = this.query.search || '';
  var page = this.query.page || 1;
  var pageSize = this.query.pageSize || config.pageSize;
  var username = this.session.user.username;
  var totalCount = yield item.getTotalCount(username, this.query.search);
  context.pagination = pagination(parseInt(page), Math.ceil(totalCount / pageSize));
  context.pagination.search = search;

  var data = yield item.findByCondition(username, search, page, pageSize);
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
