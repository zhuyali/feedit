'use strict';

var path = require('path');
var nunjucks = require('nunjucks');

module.exports = function(name, context) {

  var relViewsPath = path.join(__dirname, '..', 'web/views');
  
  var env = nunjucks.configure(relViewsPath);

  return env.render(name, context);
}
