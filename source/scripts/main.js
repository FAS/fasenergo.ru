// Uncomment if you need to support advanced ES6 features in IE11 and below
// import 'babel-polyfill'

import $ from 'jquery'
import './plugins/scroll-on-click'
import './plugins/expand'
import './plugins/drawer'
import jump from './plugins/jump'

$(() => {
  console.log('jQuery version is: ' + $().jquery)

  $('html').removeClass('no-js')

  jump()

  // Zoom target with scroll only on click
  // Used primary for iframes
  $('.js-scroll-on-click').scrollOnClick()

  $('.js-expand').expand()

  $('.js-drawer').drawer()
})
