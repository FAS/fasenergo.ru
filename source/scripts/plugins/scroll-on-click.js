/* eslint-env jquery */

// Zoom target with scroll only on click

export default $.fn.scrollOnClick = function () {
  const $target = this.find('.js-scroll-on-click__target')

  const enablePointerEvents = () => $target.css('pointer-events', 'auto')
  const disablePointerEvents = () => $target.css('pointer-events', 'none')

  // disable pointer events unless target is clicked
  disablePointerEvents()
  this.on('click', enablePointerEvents)
  this.on('mouseleave', disablePointerEvents)

  return this
}
