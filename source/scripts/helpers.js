/**
 * Collect Elements into single fragment.
 * Result can be used for various operations without causing additional reflows
 * @param  {NodeList|Element[]} $elements Elements to be collected into single fragment
 * @return {DocumentFragment} Collected into fragment elements
 */
export const fragment = ($elements) => {
  const $fragment = document.createDocumentFragment()

  $elements.forEach(($e) => $fragment.appendChild($e))

  return $fragment
}

/**
 * Prepend batch of Elements to the beginning of parent with single page reflow
 * @param  {Element}            $parent   Parent to which should be appended children
 * @param  {NodeList|Element[]} $children Children to be appended
 */
export const prependChildren = ($parent, $children) => $parent.insertBefore(fragment($children), $parent.firstChild)

/**
 * Append batch of Elements to the end of parent with single page reflow
 * @param  {Element}            $parent   Parent to which should be appended children
 * @param  {NodeList|Element[]} $children Children to be appended
 */
export const appendChildren = ($parent, $children) => $parent.appendChild(fragment($children))
