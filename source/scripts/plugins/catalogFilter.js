import debounce from 'lodash/debounce'
import { forEach, replaceChildren } from '../helpers'

const $filtersContainer = document.getElementById('js-catalog-filters')
const $filters = $filtersContainer && $filtersContainer.querySelectorAll('input')
const $productsContainer = document.getElementById('js-catalog')
const $products = $productsContainer && $productsContainer.querySelectorAll('.js-catalog-product')
const isFilter = ($el) => [...$filters].includes($el)
const isSorter = ($el) => $el.matches('[data-order]')
const getSortOrder = ($el) => $el.getAttribute('data-order')
const setSortOrder = ($el, order) => $el.setAttribute('data-order', order)
const getItemData = ($el) => JSON.parse($el.getAttribute('data-product'))

const getFilterState = () => {
  const state = Object.keys($filters).reduce((state, key) => {
    const $filter = $filters[key]
    const name = $filter.name
    const value = isNaN(+$filter.value) ? $filter.value : +$filter.value

    switch ($filter.type) {
      case 'radio':
        if ($filter.checked) {
          // Write sort order
          isSorter($filter) && (state.sortOrder = getSortOrder($filter))
          state[name] = value
        }
        return state

      case 'checkbox':
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

const updateProducts = () => {
  const state = getFilterState()
  const $filtered = filterItems($products, state)
  const $sorted = sortItems($filtered, state)

  replaceChildren($productsContainer, $sorted)
}

const filterItems = ($items, state) => {
  return [...$items].filter(($item) => {
    const item = getItemData($item)

    if (state.powerFrom && item.power < state.powerFrom) { return }
    if (state.powerTo && item.power > state.powerTo) { return }
    if (state.priceFrom && item.price < state.priceFrom) { return }
    if (state.priceTo && item.price > state.priceTo) { return }
    if (state.engineBrand && !state.engineBrand.includes(item.engineBrand)) { return }
    if (state.mode && !state.mode.includes(item.mode)) { return }
    if (state.noise && state.noise.some((n) => item.noise > n)) { return }
    if (state.phases && !state.phases.includes(item.phases)) { return }

    return true
  })
}

const sortItems = ($items, state) => {
  return [...$items].sort(($a, $b) => {
    const a = getItemData($a)
    const b = getItemData($b)

    if (state.sort && state.sort === 'byPrice' && state.sortOrder === 'desc') { return b.price - a.price }
    if (state.sort && state.sort === 'byPrice' && state.sortOrder === 'asc') { return a.price - b.price }
    if (state.sort && state.sort === 'byPower' && state.sortOrder === 'desc') { return b.power - a.power }
    if (state.sort && state.sort === 'byPower' && state.sortOrder === 'asc') { return a.power - b.power }
  })
}

if ($filtersContainer && $productsContainer) {
  // Init sorting
  updateProducts($products)

  $filtersContainer.addEventListener('click', (e) => {
    const $this = e.target
    const $uncheckedInputs = $filtersContainer.querySelectorAll('input:not(:checked)')

    // @todo Sorters visual behavior should be deattached from $filtersContainer
    // Reset order of unchecked sorters
    forEach($uncheckedInputs, ($input) => isSorter($input) && setSortOrder($input, ''))

    // Ensure that we clicked into filter or sorter's input
    if (isFilter($this)) {
      // If item has order, we're dealing with sorter and should toggle order on clicks
      isSorter($this) && getSortOrder($this) === 'asc' ? setSortOrder($this, 'desc') : setSortOrder($this, 'asc')

      updateProducts()
    }
  })
  $filtersContainer.addEventListener('input', debounce(updateProducts, 700))
  // @todo Delaying here just to wait while DOM will update before grabbing new filters state
  //       Clearly, wrong way to handle it, should be improved
  $filtersContainer.addEventListener('reset', debounce(updateProducts, 100))
}
