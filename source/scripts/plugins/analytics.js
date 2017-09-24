/* eslint-env jquery */

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
    console.error(e)
  }
}

const $orderBtns = document.querySelectorAll('.js-metrica-order')
const $requestOfferBtns = document.querySelectorAll('.js-metrica-request-offer')
const $contatcUsBtns = document.querySelectorAll('.js-metrica-contact-us')
const $askQuestionBtns = document.querySelectorAll('.js-metrica-ask-question')
const $callbackBtns = document.querySelectorAll('.js-metrica-callback')
const $whereToBuyBtns = document.querySelectorAll('.js-metrica-where-to-buy')
const $expandFilterBtns = document.querySelectorAll('.js-metrica-expand-filter')
const $subscribeNewsBtns = document.querySelectorAll('.js-metrica-subscribe-news')

document.addEventListener('click', (e) => {
  const $target = e.target

  const forEachTarget = ($elements, cb) => $elements.forEach(($element) => {
    if ($element.contains($target)) cb()
  })

  forEachTarget($orderBtns, () => reachGoal('click-order'))
  forEachTarget($requestOfferBtns, () => reachGoal('click-request-offer'))
  forEachTarget($contatcUsBtns, () => reachGoal('click-contact-us'))
  forEachTarget($askQuestionBtns, () => reachGoal('click-ask-question'))
  forEachTarget($callbackBtns, () => reachGoal('click-callback'))
  forEachTarget($whereToBuyBtns, () => reachGoal('click-where-to-buy'))
  forEachTarget($expandFilterBtns, () => reachGoal('click-expand-filter'))
  forEachTarget($subscribeNewsBtns, () => reachGoal('click-subscribe-news'))
})

$(document).ajaxComplete((e, xhr, settings) => {
  const { msg } = xhr.responseJSON
  const { url } = settings

  // Track when user tries to subscribe with already used email
  if (url.includes('/subscribe') && msg.includes('уже подписаны')) reachGoal('already-subscribed')
})
