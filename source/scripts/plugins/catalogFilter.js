import debounce from 'lodash/debounce'
import { filter, includes, replaceChildren } from '../helpers'

const $filtersContainer = document.getElementById('js-catalog-filters')
const $filters = $filtersContainer.querySelectorAll('input')
const $itemsContainer = document.getElementById('js-catalog')
const $items = $itemsContainer.querySelectorAll('.js-catalog-item')
const isFilter = ($el) => includes($filters, $el)

const getFilterState = () => {
  const state = Object.keys($filters).reduce((state, key) => {
    const $filter = $filters[key]
    const name = $filter.name
    const value = isNaN(+$filter.value) ? $filter.value : +$filter.value

    // Assume everything not checkbox is text or number
    if ($filter.type !== 'checkbox') {
      state[name] = value
    // Everything else is a checkbox, so we have to ensure that it's checked
    } else if ($filter.checked) {
      if (!Array.isArray(state[name])) {
        state[name] = []
      }
      state[name].push(value)
    }

    return state
  }, {})

  return state
}

const filterItems = () => {
  const state = getFilterState()
  const $filteredItems = filter($items, ($item) => {
    const item = JSON.parse($item.getAttribute('data-item-data'))

    if (state.filterPriceFrom && item.price < state.filterPriceFrom) { return }
    if (state.filterPriceTo && item.price > state.filterPriceTo) { return }
    if (state.filterEngine && !state.filterEngine.includes(item.engineBrand)) { return }
    if (state.filterMode && !state.filterMode.includes(item.mode)) { return }
    if (state.filterNoise && state.filterNoise.some((n) => item.noise > n)) { return }
    if (state.filterPhases && !state.filterPhases.includes(item.phases)) { return }

    return true
  })

  replaceChildren($itemsContainer, $filteredItems)
}

if ($filtersContainer) {
  $filtersContainer.addEventListener('click', (e) => {
    // Ensure that we clicked into filter's input
    isFilter(e.target) && filterItems()
  })
  $filtersContainer.addEventListener('input', debounce(filterItems, 700))
}
