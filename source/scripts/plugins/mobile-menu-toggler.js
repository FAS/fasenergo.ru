/* eslint-env jquery */

// Show or hide mobile menu when clicked

export default $.fn.mobileMenuToggler = function () {
  const $target = this.find('.js-mobile-menu')

  const toggle = () => $target.fadeToggle('fast')

  this.on('click', toggle)

  return this
}
