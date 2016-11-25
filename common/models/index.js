'use strict';

var mongoose = require('mongoose');

var config = require('../../lib/config');

exports.user = require('./user');
exports.item = require('./item');

var connectWithRetry = function() {
  return mongoose.connect(config.database, function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }
  });
};
connectWithRetry();
