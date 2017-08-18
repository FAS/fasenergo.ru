/* eslint-env jquery */

import jump from 'jump.js'

/**
 * Smooth jumps to hashes from anchors and on page load
 * Add `.js-smooth-jump` class and href with hash on anchor to enable.
 * @source http://callmecavs.com/jump.js/
 * @return {void}
 * @example
 *   <a class='js-smooth-jump' href='#section'>Link to section</a>
 *   <div id='section'>Test</div>
 */
export default () => {
  const $smoothLinks = document.querySelectorAll('.js-smooth-jump')

  /**
   * Wrapper around `jump.js` to ensure that jumping occurs only to existing elements
   * @param {Node|string} target Element to which jump should occur or valid query
   * @return {void}
   */
  const jumpSafely = (target) => {
    if (!target) return

    // We hit the query, let's ensure queried element exists on page
    if (typeof target === 'string') {
      const $targets = document.querySelectorAll(target)
      const $target = $targets[0]

      if ($target) jump($target)
      return
    }

    // Otherwise we received node, jump to it
    jump(target)
  }

  /**
   * Smooth jumps from element, which has `href` with hash
   * @return {void}
   */
  const jumpFrom = (target) => {
    const hrefHash = target && target.getAttribute('href').replace(/^.*?(#|$)/, '')
    jumpSafely(`#${hrefHash}`)
  }

  // Jump smoothly if url has hash on page load
  // Note, that it won't work for page transitions :(
  jumpSafely(window.location.hash)

  document.addEventListener('click', (e) => {
    const $target = e.target
    $smoothLinks.forEach(($l) => $l.contains($target) && jumpFrom($l))
  })
}
