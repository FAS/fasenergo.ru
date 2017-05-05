export const forEach = ($items, fn) => Array.prototype.forEach.call($items, fn)

// Replace inner content of parent node with new children
export const replaceChildren = ($parent, $children) => {
  const $fragment = document.createDocumentFragment()

  forEach($children, ($child) => $fragment.appendChild($child))

  $parent.innerHTML = ''
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
