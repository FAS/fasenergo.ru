const YA_COUNTER_ID = 20139793

/**
 * Send exception to Google Analytics
 * @param  {Error|string} error         Exception object with stack or message properties, or error message
 * @param  {string}       [source]      Url where error was raised.
 * @param  {number}       [lineno]      Line number where error was raised.
 * @param  {number}       [colno]       Column number for the line where the error occurred.
 * @param  {boolean}      [fatal=false] Is exception was fatal
 * @return {void}
 */
export const exception = (error, source, lineno, colno, fatal = false) => {
  const { message, stack } = error

  console.error(error)

  try {
    window.ga('send', 'exception', {
      exDescription: `${stack || message || error}\n    @ ${source}:${lineno}:${colno}`,
      exFatal: fatal
      // 'appName': 'Application_Name',
      // 'appVersion': '1.0'
    })
  } catch (err) { console.error(err) }
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
export const event = (category, action, label, value) => {
  try {
    window.ga('send', 'event', category, action, label, value)
  } catch (err) { exception(err) }

  try {
    window[`yaCounter${YA_COUNTER_ID}`].reachGoal(action, { label, order_price: value })
  } catch (err) { exception(err) }
}
