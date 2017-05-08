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
