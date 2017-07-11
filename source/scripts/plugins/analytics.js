const YA_COUNTER_ID = 20139793

/**
 * Send reach goal to analytics
 * @param  {string} goalId Id of a goal
 * @return void
 */
const reachGoal = (goalId) => {
  try {
    window[`yaCounter${YA_COUNTER_ID}`].reachGoal(goalId)
  } catch (e) {
    console.log(e)
  }
}

const $orderBtns = document.querySelectorAll('.js-metrica-order')
const $requestOfferBtns = document.querySelectorAll('.js-metrica-request-offer')

document.addEventListener('click', (e) => {
  const $target = e.target

  const forEachTarget = ($elements, cb) => Array.from($elements).forEach(($element) => {
    if ($target === $element) { cb() }
  })

  forEachTarget($orderBtns, () => reachGoal('click-order'))
  forEachTarget($requestOfferBtns, () => reachGoal('click-request-offer'))
})
