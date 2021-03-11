import 'babel-polyfill'
import './plugins/analytics/onerror'
import './polyfill'

import $ from 'jquery'
import analytics from './plugins/analytics/listners'
import './plugins/mangoCallback'
import './plugins/scroll-on-click'
import './plugins/toggle-radio-group'
import './plugins/expand'
import './plugins/drawer'
import './plugins/catalogFilter'
import './plugins/mailchimp'
import './plugins/tooltip'
import './plugins/mobile-menu-toggler'
import photoSwiper from './plugins/photoswiper'
import jump from './plugins/jump'

$(() => {
  console.log('jQuery version is: ' + $().jquery)

  $('html').removeClass('no-js')
  analytics()
  jump()
  $('.js-scroll-on-click').scrollOnClick()
  $('.js-expand').expand()
  $('.js-drawer').drawer()
  $('.js-mobile-menu-btn').mobileMenuToggler()
  photoSwiper()

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
    const srcset = $this.data('srcset')
    const $scope = $this.closest('.js-photos-block')
    const $photoMain = $scope.find('.js-photos-block__main')
    const $photoThumbs = $scope.find('.js-photos-block__thumbs')
    const $photoMainImg = $photoMain.find('img')

    $photoMain.find('a').attr('href', photoUrl)
    $photoMainImg.attr('src', photoUrl)

    $photoMainImg.attr('srcset', srcset || '')
    $photoThumbs.find('a.is-active').removeClass('is-active')
    $this.addClass('is-active')
  })
})
