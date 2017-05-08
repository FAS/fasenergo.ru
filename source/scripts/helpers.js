/**
 * Execute function for each Element
 * @param  {NodeList|Element[]} $elements List of Elements to iterate
 * @param  {Function}           fn        Function to execute
 */
export const forEach = ($elements, fn) => Array.prototype.forEach.call($elements, fn)

/**
 * Append batch of nodes to the end of parent with sinlge DOM redraw
 * @param  {Element}            $parent   Parent to which should be appended children
 * @param  {NodeList|Element[]} $children Children to be appended
 */
export const appendChildren = ($parent, $children) => {
  const $fragment = document.createDocumentFragment()

  forEach($children, ($child) => $fragment.appendChild($child))

  $parent.appendChild($fragment)
}

// =============
// Polyfills
// =============
/* global Element */

// Polyfill `Element.closest` for IE browsers
// @source https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    const matches = (this.document || this.ownerDocument).querySelectorAll(s)
    let i
    let el = this

    do {
      i = matches.length
      while (--i >= 0 && matches.item(i) !== el) {}
    } while ((i < 0) && (el = el.parentElement))

    return el
  }
}

// Polyfill `Element.matches` for older browsers, including IE11 and lower
// @source https://developer.mozilla.org/en/docs/Web/API/Element/matches
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function (s) {
      const matches = (this.document || this.ownerDocument).querySelectorAll(s)
      let i = matches.length

      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1
    }
}
