// Uncomment if you need to support advanced ES6 features in IE11 and below
// import 'babel-polyfill'

import $ from 'jquery'

$(() => {
  console.log('jQuery version is: ' + $().jquery)

  $('html').removeClass('no-js')
})
