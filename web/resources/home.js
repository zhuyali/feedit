'use strict'

$('.item').on('click', function() {

  var url = this.dataset.url;
  var read = $(this).hasClass('true');

  $(this).addClass('true');
  $(this).removeClass('false');
  window.open(url);

  if(!read) {
    $.ajax({
      type: 'get',
      url: '/feedit/api',
      data: {
        type: 'update',
        url: url
      },
      success: function() {}
    });
  }
});

$('.item').hover(function() {
  $(this).find(".remove").fadeIn(300);
}, function() {
   $(this).find(".remove").fadeOut(300);
});

$('.remove').on('click', function() {

  var listEle = $('#list')[0];
  var url = this.parentNode.parentNode.dataset.url;

  event.stopPropagation();
  listEle.removeChild(this.parentNode.parentNode);

  $.ajax({
    type: 'get',
    url: '/feedit/api',
    data: {
      type: 'remove',
      url: url
    },
    success: function() {}
  });

});
