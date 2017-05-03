import debounce from 'lodash/debounce'
import { filter, replaceChildren } from '../helpers'

const $filters = document.querySelectorAll('.js-catalog-filter')
const $itemsContainer = document.getElementById('js-catalog')
const $items = document.querySelectorAll('[data-catalog-filter-item]')

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

  // console.log(state)
  return state
}

const filterItems = () => {
  const state = getFilterState()
  const $filteredItems = filter($items, ($item) => {
    const itemData = JSON.parse($item.getAttribute('data-catalog-filter-item'))

    if (state.filterPriceFrom && itemData.price < state.filterPriceFrom) { return }
    if (state.filterPriceTo && itemData.price > state.filterPriceTo) { return }
    if (state.filterEngine && !state.filterEngine.includes(itemData.engineBrand)) { return }
    if (state.filterMode && !state.filterMode.includes(itemData.mode)) { return }
    if (state.filterNoise && state.filterNoise.some((n) => itemData.noise > n)) { return }
    if (state.filterPhases && !state.filterPhases.includes(itemData.phases)) { return }

    return true
  })

  replaceChildren($itemsContainer, $filteredItems)
}

// This is wrong, but just for the sake of testing
document.addEventListener('click', (e) => filterItems())
document.addEventListener('input', debounce(filterItems, 700))
