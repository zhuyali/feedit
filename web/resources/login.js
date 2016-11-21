'use strict';

var login = function() {
  $('#login')[0].action = "/feedit/login";
  $('#login')[0].submit();
};

var register = function() {
  $('#login')[0].action = "/feedit/register";
  $('#login')[0].submit();
};

