/* eslint-env jquery */

const YA_COUNTER_ID = 20139793

/**
 * Send exception to Google Analytics
 * @param  {Error|string} error    Exception object with stack or message properties, or error message
 * @param  {string}       [source] Url where error was raised.
 * @param  {number}       [lineno] Line number where error was raised.
 * @param  {number}       [colno]  Column number for the line where the error occurred.
 * @param  {boolean}      [fatal=false] Is exception was fatal
 * @return {void}
 */
export const exception = (error, source, lineno, colno, fatal = false) => {
  console.error(error)

  try {
    window.ga('send', 'exception', {
      exDescription: `${(error && (error.stack || error.message)) || error}\n    @ ${source}:${lineno}:${colno}`,
      exFatal: fatal
      // 'appName': 'Application_Name',
      // 'appVersion': '1.0'
    })
  } catch (err) {}
}

/**
 * Send event to Google Analytics or goal to Yandex Metrica
 * @param {string} category Typically the object that was interacted with (e.g. `Video`).
 *                          Only for Google Analytics.
 * @param {string} action   Action name (e.g. `click-order`) or goal ID in case of Yandex.Metrica
 * @param {string} [label]  For categorizing events (e.g. `Fall Campaign`)
 * @param {string} [value]  To denote potential value/price of the event
 * @return void
 */
const event = (category, action, label, value) => {
  try {
    window.ga('send', 'event', category, action, label, value)
  } catch (err) { exception(err) }

  try {
    window[`yaCounter${YA_COUNTER_ID}`].reachGoal(action, { label, order_price: value })
  } catch (err) { exception(err) }
}

const originalOnerror = window.onerror

/**
 * Log any script error to Google Analytics.
 * Third-party scripts without CORS will only provide "Script Error." as an error message.
 * Modified https://stackoverflow.com/a/29552301
 * @param  {string} [messageOrEvent] Error message.
 * @param  {string} [source]         Url where error was raised.
 * @param  {number} [lineno]         Line number where error was raised.
 * @param  {number} [colno]          Column number for the line where the error occurred.
 * @param  {Error}  [error]          Error Object.
 * @return {boolean} When the function returns true, this prevents the firing of the default event handler.
 */
window.onerror = (messageOrEvent, source, lineno, colno, error) => {
  exception(error || messageOrEvent, source, lineno, colno)

  if (typeof originalOnerror === 'function') {
    return originalOnerror(messageOrEvent, source, lineno, colno, error)
  }
}

export default () => document.addEventListener('click', (e) => {
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
