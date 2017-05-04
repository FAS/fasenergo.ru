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
