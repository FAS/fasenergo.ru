/* eslint-env jquery */

// Toggle display of inner menus of Sidebar

export default $.fn.drawer = function (userOptions) {
  const options = $.extend({
    activeClass: 'drawer-is-active',
    expandedClass: 'is-expanded',
    query: '.js-drawer',
    navQuery: '.js-drawer__nav',
    bgQuery: '.js-drawer__bg',
    overlayQuery: '.js-drawer__overlay',
    closeQuery: '.js-drawer__close'
  }, userOptions)

  const {
    activeClass,
    expandedClass,
    query,
    navQuery,
    bgQuery,
    overlayQuery,
    closeQuery
  } = options

  return this.each((i, element) => {
    const $this = $(element)
    const $all = $(query)
    const $others = $(query).not($this)
    const $nav = $this.next(navQuery)
    const $otherNavs = $(navQuery).not($nav)
    const $bg = $(bgQuery)
    const $overlay = $(overlayQuery)
    const $closer = $(`${closeQuery}, a, button`).not($all)

    const isActive = () => $this.hasClass(activeClass)
    const isAnyActive = () => $all.hasClass(activeClass)

    const markActive = () => $others.removeClass(activeClass) && $this.addClass(activeClass)
    const markInactive = () => $this.removeClass(activeClass)
    const markExpanded = () => $otherNavs.removeClass(expandedClass) && $nav.addClass(expandedClass) && $bg.addClass(expandedClass) && $overlay.addClass(expandedClass)
    const markCollapsed = () => isAnyActive() ? $nav.removeClass(expandedClass) : $nav.removeClass(expandedClass) && $bg.removeClass(expandedClass) && $overlay.removeClass(expandedClass)

    const toggle = (isActive) => isActive ? markInactive() && markCollapsed() : markActive() && markExpanded()
    const close = () =>  markInactive() && markCollapsed()

    $this.click((event) => {
      event.preventDefault()
      toggle(isActive())
    })

    $closer.click((event) => close())
  })
}
