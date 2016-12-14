/* eslint-env jquery */

/**
 * Toggle display of inner menus of Sidebar
 *
 * To use, define as shown in example `js-*` classes on elements you want to control.
 * This lib does does handle only states, while animations should be done with your own CSS.
 *
 * Note, that for simplicity currently script will search for '.js-drawer__nav' which is directly ahead
 * of '.js-drawer' . If you need different discovery method, current code should be altered.
 *
 * @param {object} [userOptions]                                       Options overrides
 * @param {string} [userOptions.activeClass]   = 'drawer-is-active'    Class for active controlling element
 * @param {string} [userOptions.expandedClass] = 'is-expanded'         Class for fully expanded target
 * @param {string} [userOptions.query]         = '.js-drawer'          Query of `this`
 * @param {string} [userOptions.navQuery]      = '.js-drawer__nav'     Query of element with target nav items
 * @param {string} [userOptions.bgQuery]       = '.js-drawer__bg'      Query of drawer bg
 * @param {string} [userOptions.overlayQuery]  = '.js-drawer__overlay' Query of overlay
 * @param {string} [userOptions.closeQuery]    = '.js-drawer__close'   Query of element which will close query
 *
 * @return {object} `this`
 *
 * @example
 *   <div>
 *     <ul>
 *       <li>
 *
 *         <a href='js-drawer'>Nav item</a>
 *
 *         <ul class='js-drawer__nav'>
 *           <li>Subnav item</li>
 *         </ul>
 *
 *       </li>
 *     </ul>
 *
 *     <div class='Drawer__overlay js-drawer__overlay js-drawer__close'></div>
 *     <div class='Drawer__bg js-drawer__bg'></div>
 *   </div>
 */
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
    const $nav = $this.nextAll(navQuery)
    const $otherNavs = $(navQuery).not($nav)
    const $bg = $(bgQuery)
    const $overlay = $(overlayQuery)
    // Note that any `<a>` or `<button>` element will also close drawer
    const $closer = $(`${closeQuery}, a, button`).not($all)

    const isActive = () => $this.hasClass(activeClass)
    const isAnyActive = () => $all.hasClass(activeClass)

    const markActive = () => $others.removeClass(activeClass) && $this.addClass(activeClass)
    const markInactive = () => $this.removeClass(activeClass)
    const markExpanded = () => $otherNavs.removeClass(expandedClass) && $nav.addClass(expandedClass) && $bg.addClass(expandedClass) && $overlay.addClass(expandedClass)
    const markCollapsed = () => isAnyActive() ? $nav.removeClass(expandedClass) : $nav.removeClass(expandedClass) && $bg.removeClass(expandedClass) && $overlay.removeClass(expandedClass)

    const toggle = (isActive) => isActive ? markInactive() && markCollapsed() : markActive() && markExpanded()
    const close = () => markInactive() && markCollapsed()

    $this.click((event) => {
      event.preventDefault()
      toggle(isActive())
    })

    $closer.click((event) => close())
    // Close on `Esc` button press
    $(document).keyup((event) => event.keyCode === 27 && close())
  })
}
