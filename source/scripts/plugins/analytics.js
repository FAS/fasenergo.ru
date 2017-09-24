/* eslint-env jquery */

const YA_COUNTER_ID = 20139793

/**
 * Send reach goal to analytics
 * @param {string} goalId Id of a goal
 * @return void
 */
const reachGoal = (goalId) => {
  try {
    window[`yaCounter${YA_COUNTER_ID}`].reachGoal(goalId)
  } catch (e) {
    console.error(e)
  }
}

document.addEventListener('click', (e) => {
  const $target = e.target

  const forEachTarget = ($elements, cb) => $elements.forEach(($element) => {
    if ($element.contains($target)) cb()
  })

  forEachTarget(document.querySelectorAll('.js-metrica-order'), () => reachGoal('click-order'))
  forEachTarget(document.querySelectorAll('.js-metrica-request-offer'), () => reachGoal('click-request-offer'))
  forEachTarget(document.querySelectorAll('.js-metrica-contact-us'), () => reachGoal('click-contact-us'))
  forEachTarget(document.querySelectorAll('.js-metrica-ask-question'), () => reachGoal('click-ask-question'))
  forEachTarget(document.querySelectorAll('.js-metrica-callback'), () => reachGoal('click-callback'))
  forEachTarget(document.querySelectorAll('.js-metrica-where-to-buy'), () => reachGoal('click-where-to-buy'))
  forEachTarget(document.querySelectorAll('.js-metrica-expand-filter'), () => reachGoal('click-expand-filter'))
  forEachTarget(document.querySelectorAll('.js-metrica-subscribe-news'), () => reachGoal('click-subscribe-news'))
})

/**
 * Send Metrics when user tries to subscribe with already used email
 * @param  {string} result Response state
 * @param  {string} msg    Response message
 * @return {void}
 */
export const alreadySubscribed = (result, msg) => {
  if (result === 'error' && msg.includes('уже подписаны')) reachGoal('already-subscribed')
}
