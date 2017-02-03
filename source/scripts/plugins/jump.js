/* eslint-env jquery */

import jump from 'jump.js'

/**
 * Smooth jumps for anchors, which leads to hashtags.
 * Use `.js-smooth-jump` class on anchor to enable.
 *
 * @source http://callmecavs.com/jump.js/
 *
 * @return void
 *
 * @example
 *   <a class='js-smooth-jump' href='#section'>Link to section</a>
 *   <div id='section'>Test</div>
 */
export default () => {
  const jumpToHash = (target) => {
    const hrefHash = target && target.attr('href').replace(/^.*?(#|$)/, '')
    const hash = hrefHash || window.location.hash.substring(1)

    if (hash) {
      jump(`#${hash}`)
    }
  }

  // Jump smoothly if on loaded page exists hash
  // Note, that it won't work for page transitions :(
  jumpToHash()

  // Jump smoothly on click
  $('.js-smooth-jump').on('click', function (e) {
    e.preventDefault
    jumpToHash($(this))
  })
}
