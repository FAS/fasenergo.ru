/* eslint-env jquery */
/* global Element */

import jump from 'jump.js'

/**
 * Wrapper around `jump.js` to ensure that jumping occurs only to existing elements
 * @param {Element|string} target Element to which jump should occur or valid query
 * @return {void}
 */
const jumpSafely = (target) => {
  target = target && typeof target === 'string'
    ? document.querySelector(target)
    : target

  if (!(target instanceof Element)) return

  jump(target)
}

/**
 * Smooth jumps from element, which has `href` with hash
 * @param {Element} $from Element node with `href` attribute containing hash of target
 * @return {void}
 */
const jumpFrom = ($from) => {
  const hash = $from && $from.getAttribute('href').replace(/^.*?(#|$)/, '')
  jumpSafely(`#${hash}`)
}

/**
 * Smooth jumps to hashes from anchors and on page load
 * Add `.js-smooth-jump` class and href with hash on anchor to enable.
 * @see http://callmecavs.com/jump.js/
 * @example
 *   <a class='js-smooth-jump' href='#section'>Link to section</a>
 *   <div id='section'>Test</div>
 */
export default () => {
  // Jump smoothly if url has hash on page load
  // Note, that it won't work for page transitions :(
  jumpSafely(window.location.hash)

  document.addEventListener('click', (e) => {
    const $target = e.target

    document.querySelectorAll('.js-smooth-jump').forEach(($link) =>
      $link.contains($target) && jumpFrom($link)
    )
  })
}
