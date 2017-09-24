/* eslint-env jquery */

const YA_COUNTER_ID = 20139793

/**
 * Send event to Google Analytics or goal to Yandex Metrica
 * @param {string} category Typically the object that was interacted with (e.g. `Video`).
 *                          Only for Google Analytics.
 * @param {string} action   Action name (e.g. `click-order`) or goal ID in case of Yandex.Metrica
 * @param {string} [label]  For categorizing events (e.g. `Fall Campaign`)
 * @return void
 */
const event = (category, action, label) => {
  try {
    window.ga('send', 'event', category, action, label)
  } catch (e) { console.error(e) }

  try {
    window[`yaCounter${YA_COUNTER_ID}`].reachGoal(action)
  } catch (e) { console.error(e) }
}

document.addEventListener('click', (e) => {
  const $target = e.target

  const forEachTarget = ($elements, cb) => $elements.forEach(($element) => {
    if ($element.contains($target)) cb()
  })

  forEachTarget(document.querySelectorAll('.js-metrica-order'), () => event('Product', 'click-order'))
  forEachTarget(document.querySelectorAll('.js-metrica-request-offer'), () => event('Product', 'click-request-offer'))
  forEachTarget(document.querySelectorAll('.js-metrica-contact-us'), () => event('Products', 'click-contact-us'))
  forEachTarget(document.querySelectorAll('.js-metrica-ask-question'), () => event('Product', 'click-ask-question'))
  forEachTarget(document.querySelectorAll('.js-metrica-callback'), () => event('Sidebar', 'click-callback'))
  forEachTarget(document.querySelectorAll('.js-metrica-where-to-buy'), () => event('Sidebar', 'click-where-to-buy'))
  forEachTarget(document.querySelectorAll('.js-metrica-expand-filter'), () => event('Products filter', 'click-expand-filter'))
  forEachTarget(document.querySelectorAll('.js-metrica-subscribe-news'), () => event('Subscribe form', 'click-subscribe-news'))
})

/**
 * Send Metrics when user tries to subscribe with already used email
 * @param  {string} result Response state
 * @param  {string} msg    Response message
 * @return {void}
 */
export const alreadySubscribed = (result, msg) => {
  if (result === 'error' && msg.includes('уже подписаны')) event('Subscribe form', 'already-subscribed', msg)
}
