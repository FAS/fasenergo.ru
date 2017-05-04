export const each = ($items, fn) => Array.prototype.forEach.call($items, fn)
export const filter = ($items, fn) => Array.prototype.filter.call($items, fn)
export const includes = ($items, $item) => Array.prototype.includes.call($items, $item)

// Replace inner content of parent node with new children
export const replaceChildren = ($parent, $children) => {
  const $fragment = document.createDocumentFragment()

  each($children, ($child) => $fragment.appendChild($child))

  $parent.innerHTML = ''
  $parent.appendChild($fragment)
}

// Polyfill Element.closest for IE browsers
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest

/* global Element */
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
