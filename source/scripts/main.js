import 'babel-polyfill'
import './plugins/analyticsOnerror'
import './polyfill'

import $ from 'jquery'
import analytics from './plugins/analytics'
import './plugins/mangoCallback'
import './plugins/scroll-on-click'
import './plugins/expand'
import './plugins/drawer'
import './plugins/catalogFilter'
import './plugins/mailchimp'
import jump from './plugins/jump'

$(() => {
  console.log('jQuery version is: ' + $().jquery)

  $('html').removeClass('no-js')
  analytics()
  jump()
  $('.js-scroll-on-click').scrollOnClick()
  $('.js-expand').expand()
  $('.js-drawer').drawer()

  /**
   * Switcher of photos on Product page
   *
   * @legacy This is old code from old Fasenergo. This is not how you should write new code!
   *         It has been slightly altered to extract data from `data-big-image` instead of
   *         relaying on href content.
   *         This code should be swapped with better slider whenever possible
   */
  $('.js-photos-block__thumbs').on('click', 'a', function (e) {
    e.preventDefault()

    const $this = $(this)
    const photoUrl = this.href
    const $scope = $this.closest('.js-photos-block')
    const $photoMain = $scope.find('.js-photos-block__main')
    const $photoThumbs = $scope.find('.js-photos-block__thumbs')

    $photoMain.find('a').attr('href', photoUrl)
    $photoMain.find('img').attr('src', photoUrl)
    $photoThumbs.find('a.is-active').removeClass('is-active')
    $this.addClass('is-active')
  })
})
