/* eslint-disable */

$('#header .menu').click(function () {
  $('#header .topmenu').slideToggle(400)
  $(this).toggleClass('open')
})

$('.tov_slider').owlCarousel({
  loop: true,
  margin: 0,
	 items: 1,
  nav: true,
  navText: false,
  dots: true

})

$('.slider_mini').owlCarousel({
  loop: false,
  margin: 0,
  nav: true,
  navText: false,
  dots: true,
  responsive: {
    0: {
      items: 1,
      nav: true
    },
    500: {
      items: 2,
      nav: true
    },
    700: {
      items: 3,
      nav: true
    },
    1000: {
      items: 4,
      nav: true
    }
  }
})

$('#mini1 .slide').click(function () {
  $('#mini1 .slide').removeClass('active')
  $(this).addClass('active')
  $('#gen1 .sl_item').removeClass('active').eq($(this).parent().index()).addClass('active')
  return false
})

$('#mini2 .slide').click(function () {
  $('#mini2 .slide').removeClass('active')
  $(this).addClass('active')
  $('#gen2 .sl_item').removeClass('active').eq($(this).parent().index()).addClass('active')
  return false
})
