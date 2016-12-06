/**
 * Displays target on `this` click and hides on another.
 *
 * To use, define `js-expand` class on element, which will control toggling of blocks.
 * It's recommended to use `<button>` as controlling elements, since it will keep
 * everything accessible for keyboards out of box.
 * With default settings, set `js-expand__target` on element, which should be expanded.
 * If scoping enabled, with default settings set `js-expand__scope` on any parent, to define
 * scope, within which `js-expand` should search for targets to expand.
 *
 * Individual expand behaviour can be altered by setting following attributes
 * on element, bearing `js-expand`:
 *
 * - data-expand='{{ your query }}':
 *   - `false` or unspecified - toggles targets, defined by `userOptions.defaultTargetQuery` query.
 *   - `your query` — query of a container, which should be expanded on this click.
 *
 * - data-expand-scope='{{ next || true || your query }}':
 *   - `false` or unspecified — selects absolutely all targets defined by `data-expand` query
 *   - `next` — selects all next siblings with defined in `data-expand` query.
 *   - `true` — selects all targets defined by `data-expand` query within scope, defined by closest
 *              container, which defined by `userOptions.defaultScopeQuery` query.
 *   - `your query` — same as `true`, but you can specify specific query of defining scope container.
 *
 * @param {object} [userOptions]                                           Options overrides
 * @param {number} [userOptions.duration]           = 600,                 Slide speed
 * @param {string} [userOptions.easing]             = ''                   Slide easing animation
 * @param {string} [userOptions.activeClass]        = 'is-active'          Class for active button
 * @param {string} [userOptions.expandingClass]     = 'is-expanding'       Classing for expanding target
 * @param {string} [userOptions.collapsingClass]    = 'is-collapsing'      Class for collapsing target
 * @param {string} [userOptions.expandedClass]      = 'is-expanded'        Class for fully expanded target
 * @param {string} [userOptions.defaultScopeQuery]  = '.js-expand__scope'  Default query of container defining scope
 * @param {string} [userOptions.defaultTargetQuery] = '.js-expand__target' Default query of container to be expanded
 *
 * @return {object}             this
 */
export default $.fn.expand = function (userOptions) {
  const options = $.extend({
    duration: 600,
    easing: '',
    activeClass: 'is-active',
    expandingClass: 'is-expanding',
    collapsingClass: 'is-collapsing',
    expandedClass: 'is-expanded',
    defaultScopeQuery: '.js-expand__scope',
    defaultTargetQuery: '.js-expand__target'
  }, userOptions)

  const {
    duration,
    easing,
    activeClass,
    expandingClass,
    expandedClass,
    collapsingClass,
    defaultScopeQuery,
    defaultTargetQuery
  } = options

  return this.each((i, element) => {
    const $this = $(element)
    const targetQuery = $this.data('expand') || defaultTargetQuery
    const expandScope = $this.data('expand-scope')
    const expandScopeQuery = typeof expandScope === 'string' ? expandScope : defaultScopeQuery

    let $targets
    if (expandScope === 'next') {
      $targets = $this.nextAll(targetQuery)
    } else if (expandScope) {
      $targets = $this.closest(expandScopeQuery).find(targetQuery)
    } else {
      $targets = $(targetQuery)
    }

    const isActive = () => $this.hasClass(activeClass)

    const markActive = () => $this.addClass(activeClass)
    const markInactive = () => $this.removeClass(activeClass)
    const markExpandeding = (target) => target.addClass(expandingClass)
    const markExpanded = (target) => target.removeClass(expandingClass) && target.addClass(expandedClass)
    const markCollapsing = (target) => target.removeClass(expandedClass) && target.addClass(collapsingClass)
    const markCollapsed = (target) => target.removeClass(collapsingClass)

    const setBtnState = (target) => target.hasClass(expandingClass) || target.hasClass(expandedClass) ? markActive() : markInactive()
    const setTargetStating = (target) => target.hasClass(expandedClass) ? markCollapsing(target) : markExpandeding(target)
    const setTargetState = (target) => target.is(':visible') ? markExpanded(target) : markCollapsed(target)

    const toggle = (target) => target.slideToggle({
      duration,
      easing,
      start: () => setTargetStating(target) && setBtnState(target),
      complete: () => setTargetState(target)
    })
    const hide = (target) => target.slideUp({
      duration,
      easing,
      start: () => markCollapsing(target) && markInactive(),
      complete: () => markCollapsed(target)
    })

    if (!isActive()) { $targets.each((i, e) => hide($(e))) }
    if (isActive()) { $targets.each((i, e) => markExpanded($(e))) }

    $this.click((event) => {
      event.preventDefault()
      $targets.each((i, e) => toggle($(e)))
    })

  })
}