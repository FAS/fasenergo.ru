import { exception } from './analytics'

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
