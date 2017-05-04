import debounce from 'lodash/debounce'
import { filter, includes, replaceChildren } from '../helpers'

const $filtersContainer = document.getElementById('js-catalog-filters')
const $filters = $filtersContainer.querySelectorAll('input')
const $productsContainer = document.getElementById('js-catalog')
const $products = $productsContainer.querySelectorAll('.js-catalog-product')
const isFilter = ($el) => includes($filters, $el)
const getItemData = ($el) => JSON.parse($el.getAttribute('data-product'))

const getFilterState = () => {
  const state = Object.keys($filters).reduce((state, key) => {
    const $filter = $filters[key]
    const name = $filter.name
    const value = isNaN(+$filter.value) ? $filter.value : +$filter.value

    if ($filter.type === 'radio') {
      if ($filter.checked) {
        // Format state differently if it's sort radio
        if ($filter.getAttribute('data-order')) {
          state[name] = {
            value,
            order: $filter.getAttribute('data-order')
          }
          return state
        }
        state[name] = value
      }
      return state
    } else if ($filter.type === 'checkbox') {
      if ($filter.checked) {
        if (!Array.isArray(state[name])) {
          state[name] = []
        }
        state[name].push(value)
      }
      return state
    }

    // Assume everything else is just text input
    state[name] = value

    return state
  }, {})

  console.log(state)

  return state
}

const updateProducts = ($items) => {
  const $filtered = filterItems($items)
  const $sorted = sortItems($filtered)

  replaceChildren($productsContainer, $sorted)
}

const filterItems = ($items) => {
  const state = getFilterState()

  return filter($items, ($item) => {
    const item = getItemData($item)

    if (state.priceFrom && item.price < state.priceFrom) { return }
    if (state.priceTo && item.price > state.priceTo) { return }
    if (state.engineBrand && !state.engineBrand.includes(item.engineBrand)) { return }
    if (state.mode && !state.mode.includes(item.mode)) { return }
    if (state.noise && state.noise.some((n) => item.noise > n)) { return }
    if (state.phases && !state.phases.includes(item.phases)) { return }

    return true
  })
}

const sortItems = ($items) => {
  const state = getFilterState()

  return [...$items].sort(($a, $b) => {
    const a = getItemData($a)
    const b = getItemData($b)

    if (state.sort && state.sort.value === 'byPrice' && state.sort.order === 'desc') { return b.price - a.price }
    if (state.sort && state.sort.value === 'byPrice' && state.sort.order === 'asc') { return a.price - b.price }
    if (state.sort && state.sort.value === 'byPower' && state.sort.order === 'desc') { return b.power - a.power }
    if (state.sort && state.sort.value === 'byPower' && state.sort.order === 'asc') { return a.power - b.power }
  })
}

if ($filtersContainer) {
  // Init sorting
  updateProducts($products)

  $filtersContainer.addEventListener('click', (e) => {
    // Ensure that we clicked into filter or sorter's input
    isFilter(e.target) && updateProducts($products)
  })
  $filtersContainer.addEventListener('input', debounce(() => updateProducts($products), 700))
}
