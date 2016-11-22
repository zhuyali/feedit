'use strict';

var mongoose = require('mongoose');

var config = require('../../lib/config');

var db = mongoose.connect(config.database);
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
});

userSchema.statics.findByName = function(username) {
  let context = this;
  return new Promise(function(resolve, reject) {
    context.find({
      username: username
    }, function(err, data) {
      if (err) {
        console.log(err + '================');
        reject(err);
      } else {
        resolve(data);
      }
    })
  });
};

userSchema.statics.add = function(username, password) {
  let context = this;
  return new Promise(function(resolve, reject) {
    context.create({
      username: username,
      password: password
    }, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  });
};

mongoose.model('User', userSchema);
var User = mongoose.model('User');

module.exports = User;

