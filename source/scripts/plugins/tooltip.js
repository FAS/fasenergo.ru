/**
 * Remove `title` attribute from element (anchor), to prevent appearance of
 * default title tooltip on hover, and assign it to `data-tooltip`
 * which is used by Ekzo `.o-tooltip`. On mouseleave it will set it back.
 * @param {Event} event Event which triggered listener `addEventListener`
 * @return {void}
 * @example
 *   $tooltip.addEventListener('mouseenter', processTooltipTitle)
 *   $tooltip.addEventListener('mouseleave', processTooltipTitle)
 */
const processTooltipTitle = (event) => {
  const $this = event.target
  const title = $this.getAttribute('title')
  const dataTooltip = $this.getAttribute('data-tooltip')

  if (event.type === 'mouseenter') {
    $this._title = title
    $this.setAttribute('title', '')

    if (!dataTooltip) $this.setAttribute('data-tooltip', title)
  }

  if (event.type === 'mouseleave') {
    $this.setAttribute('title', $this._title)
  }
}

// We're selecting here not `js-*` class, because we're actually just
// augmenting regular behaviour, and without this code
// it will work anyway, but just not that good
const SELECTOR = '.o-tooltip'
const $tooltips = document.querySelectorAll(SELECTOR)

// Note that this won't work with dynamically added elements, while
// adding global document listener for such events sounds non-performant
$tooltips.forEach(($tooltip) => {
  $tooltip.addEventListener('mouseenter', processTooltipTitle)
  $tooltip.addEventListener('mouseleave', processTooltipTitle)
})
