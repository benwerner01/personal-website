$(document).ready(function() {
  $(window).scroll(function () {
    if ($(window).scrollTop() > 50) {
      $('.navigators').addClass('fixed');
      $('.logo').addClass('extended');
      $('.background-tiles').slideDown(200)
      $('#t5').addClass('t5extended')
    }
    if ($(window).scrollTop() < 50) {
      $('.logo').removeClass('extended');
      $('.navigators').addClass('exiting');

      $('#t5').removeClass('t5extended');
      $('.navigators').removeClass('fixed');
      $('.background-tiles').slideUp(200)
    }
  });
});
