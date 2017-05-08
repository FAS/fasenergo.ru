import debounce from 'lodash/debounce'
import { forEach, prependChildren } from '../helpers'

const PRODUCTS_PER_PAGE = 5

const $filtersContainer = document.getElementById('js-catalog-filters')
const $filters = $filtersContainer && $filtersContainer.querySelectorAll('input')
const $productsContainer = document.getElementById('js-catalog')
const $products = $productsContainer && $productsContainer.querySelectorAll('.js-catalog-product')
const $showAllBtn = document.getElementById('js-catalog-show-all-btn')
const $showAllBtnItems = document.getElementById('js-catalog-show-all-btn__items')

const isFilter = ($el) => [...$filters].includes($el)
const isSorter = ($el) => $el.matches('[data-order]')
const getSortOrder = ($el) => $el.getAttribute('data-order')
const setSortOrder = ($el, order) => $el.setAttribute('data-order', order)
const getItemData = ($el) => JSON.parse($el.getAttribute('data-product'))
const showItem = ($el) => {
  $el.style.display = ''
  $el.classList.remove('is-hidden')
}
const hideItem = ($el) => {
  $el.style.display = 'none'
  $el.classList.add('is-hidden')
}

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

  return state
}

const updateProducts = (limit = PRODUCTS_PER_PAGE) => {
  const state = getFilterState()
  const $filtered = filterItems($products, state)
  const $sorted = sortItems($filtered, state)
  const $limited = limit && limitItems($sorted, limit) || $sorted

  // Hide everything that was exluded by filter
  Array.from($products).forEach(($product) =>
    $limited.includes($product) ? showItem($product) : hideItem($product)
  )

  // Show "Show more" button whenever needed
  $showAllBtnItems.innerHTML = $sorted.length - $limited.length
  $sorted.length > $limited.length ? showItem($showAllBtn) : hideItem($showAllBtn)

  // Rearrenge elements by appending sorted to the end of container
  prependChildren($productsContainer, $sorted)
}

const limitItems = ($items, limit) => [...$items].slice(0, limit)

const filterItems = ($items, state) => [...$items].filter(($item) => {
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

const sortItems = ($items, state) => [...$items].sort(($a, $b) => {
  const a = getItemData($a)
  const b = getItemData($b)

  if (state.sort && state.sort === 'byPrice' && state.sortOrder === 'desc') { return b.price - a.price }
  if (state.sort && state.sort === 'byPrice' && state.sortOrder === 'asc') { return a.price - b.price }
  if (state.sort && state.sort === 'byPower' && state.sortOrder === 'desc') { return b.power - a.power }
  if (state.sort && state.sort === 'byPower' && state.sortOrder === 'asc') { return a.power - b.power }
})

if ($filtersContainer && $productsContainer) {
  // Init sorting
  updateProducts()

  $filtersContainer.addEventListener('click', (e) => {
    const $target = e.target
    const $uncheckedInputs = $filtersContainer.querySelectorAll('input:not(:checked)')

    // @todo Sorters visual behavior should be deattached from $filtersContainer
    // Reset order of unchecked sorters
    forEach($uncheckedInputs, ($input) => isSorter($input) && setSortOrder($input, ''))

    // Ensure that we clicked into filter or sorter's input
    if (isFilter($target)) {
      // If item has order, we're dealing with sorter and should toggle order on clicks
      isSorter($target) && getSortOrder($target) === 'asc' ? setSortOrder($target, 'desc') : setSortOrder($target, 'asc')

      updateProducts()
    }
  })
  $filtersContainer.addEventListener('input', debounce(() => updateProducts(), 700))
  // @todo Delaying here just to wait while DOM will update before grabbing new filters state
  //       Clearly, wrong way to handle it, should be improved
  $filtersContainer.addEventListener('reset', debounce(() => updateProducts(), 100))

  // Show current filtered products without limits
  $showAllBtn && $showAllBtn.addEventListener('click', (e) => updateProducts(false))
}
