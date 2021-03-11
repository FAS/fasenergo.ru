/* eslint-env jquery */

// Show or hide mobile menu when clicked

export default $.fn.mobileMenuToggler = function () {
  const $target = $(".js-mobile-menu").first()

  const toggle = () => $target.fadeToggle('fast')

  this.on('click', toggle)

  return this
}
