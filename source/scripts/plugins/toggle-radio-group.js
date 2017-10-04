/**
 * Toggle states in group of radio inputs on second click at same input
 * For instance, first clock will enable input, and second will change its value
 * @param {Event}    event         Event which triggered listener `addEventListener`
 * @param {NodeList} $inputs       List of inputs which should be toggled
 * @param {function} cb            Function to be executed on second click
 * @param {function} [uncheckedCb] Function to be executed on input being unchecked
 * @return {void}
 * @example
 *   toggleRadioGroup(
 *     event,
 *     $inputs,
 *     ($input) => $input.getAttribute('data-order') === 'asc'
 *       ? $input.setAttribute('data-order', 'desc')
 *       : $input.setAttribute('data-order', 'asc'),
 *     ($input) => $input.setAttribute('data-order', 'asc')
 *   )
 */
const toggleRadioGroup = (event, $inputs, cb, uncheckedCb) => $inputs.forEach(($input) => {
  if (!$input.checked) {
    $input._secondClick = false
    uncheckedCb($input)
    return
  }

  if (!$input.contains(event.target)) return
  if ($input._secondClick === undefined || $input._secondClick) cb($input)

  $input._secondClick = true
})

/**
 * Toggle sorters inputs ordering
 * First click will enable default ordering ('asc'), second will
 * start to toggle between `asc` and `desc`
 * @param {Event}  event `addEventListener` event
 * @return {void}
 * @example
 *   <form id='GROUP' class='js-toggle-sorter'>
 *     <label>First <input id='INPUT_1' name='sort' type='radio' data-order='asc' checked></label>
 *     <label>Second <input id='INPUT_2' name='sort' type='radio' data-order='asc'></label>
 *   </form>
 */
const toggleSorters = (event) => {
  const SELECTOR = '.js-toggle-sorter'
  const ORDER_ATTR = 'data-order'

  const $groups = document.querySelectorAll(SELECTOR)

  $groups.forEach(($group) => {
    const $inputs = $group.querySelectorAll(`[${ORDER_ATTR}]`)

    toggleRadioGroup(
      event,
      $inputs,
      ($input) => $input.getAttribute(ORDER_ATTR) === 'asc'
        ? $input.setAttribute(ORDER_ATTR, 'desc')
        : $input.setAttribute(ORDER_ATTR, 'asc'),
      ($input) => $input.setAttribute(ORDER_ATTR, 'asc')
    )
  })
}

// @note We set `true` as last arg to enable capturing
//       and ensure that event fires _before_ all regular listeners
//       which usually collecting data and needs DOM to be changed first
//       See https://www.quirksmode.org/js/events_order.html
document.addEventListener('click', toggleSorters, true)
