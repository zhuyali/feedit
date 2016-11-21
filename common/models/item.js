'use strict';

var mongoose = require('mongoose');

var config = require('../../lib/config');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
  username: {
    type: String
  },
  title: {
    type: String
  },
  url: {
    type: String
  },
  read: {
    type: Boolean,
    default: false
  },
  create_at: {
    type: Date,
    default: Date.now
  }
});

itemSchema.statics.findByCondition = function(username, search, page) {
  var page = page || 1;
  let start = (page - 1) * config.pageSize;
  let limit = config.pageSize;
  let context = this;
  return new Promise(function(resolve, reject) {
    context
      .find(search ? {'$where': '!!~this.title.toLowerCase().indexOf("' + search + '")'} : {})
      .where('username').equals(username)
      .skip(start)
      .limit(limit)
      .sort({'create_at': -1})
      .exec(function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
  });
};

itemSchema.statics.updateStatus = function(username, url) {
  let context = this;
  return new Promise(function(resolve, reject) {
    context
      .update({
        username: username,
        url: url
      },
        {$set:{read: 'true'}},
        function(err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
  });
};

itemSchema.statics.getTotalCount = function(username, search) {
  let context = this;
  return new Promise(function(resolve, reject) {
    context
      .find({username: username})
      .count(search ? {'$where': '!!~this.title.toLowerCase().indexOf("' + search + '")'} : {})
      .exec(function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
  });
};

itemSchema.statics.removeByUrl = function(username, url) {
  let context = this;
  return new Promise(function(resolve, reject) {
    context.remove({
      username: username,
      url: url
    }, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
};

itemSchema.statics.add = function(username, title, url) {
  let context = this;
  return new Promise(function(resolve, reject) {
    context.create({
      username: username,
      title: title.toLowerCase(),
      url: url
    }, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  });
};

mongoose.model('Item', itemSchema);
var Item = mongoose.model('Item');

module.exports = Item;


