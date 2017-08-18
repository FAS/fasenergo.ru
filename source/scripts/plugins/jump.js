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
  const jumpToHash = (link) => {
    const hrefHash = link && link.getAttribute('href').replace(/^.*?(#|$)/, '')
    const hash = hrefHash || window.location.hash.substring(1)
    const target = document.getElementById(hash)

    if (target) jump(target)
  }

  // Jump smoothly if on loaded page exists hash
  // Note, that it won't work for page transitions :(
  jumpToHash()

  const $smoothLinks = document.querySelectorAll('.js-smooth-jump')

  document.addEventListener('click', (e) => {
    const $target = e.target

    $smoothLinks.forEach(($l) => $l.contains($target) && jumpToHash($l))
  })
}
