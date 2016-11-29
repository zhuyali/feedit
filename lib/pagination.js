'use strict';

module.exports = function(current, total) {

  var RANGE = 3;
  var data = {
    current: current,
    total: total
  };

  data.previous = (current - 1 > 0) ? current - 1 : current;
  data.next = (current + 1 > total) ? current : current + 1;
  data.start = current - RANGE < 1 ? 1 : current - RANGE;
  data.end = current + RANGE > total ? total : current + RANGE;

  return data;
}
