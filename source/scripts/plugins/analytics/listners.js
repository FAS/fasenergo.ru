/* eslint-env jquery */

import { event, exception } from './utils'

/**
 * Send Metrics when user tries to subscribe with already used email
 * @param  {string} result Response state
 * @param  {string} msg    Response message
 * @return {void}
 */
export const alreadySubscribed = (result, msg) => {
  if (result === 'error' && msg.includes('уже подписаны')) event('Subscribe form', 'already-subscribed', msg)
}

export default () => {
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
    forEachTarget(document.querySelectorAll('.js-metrica-share-vk'), () => event('Share', 'CLICK_SHARE_VK'))
    forEachTarget(document.querySelectorAll('.js-metrica-share-fb'), () => event('Share', 'CLICK_SHARE_FB'))
    forEachTarget(document.querySelectorAll('.js-metrica-share-tw'), () => event('Share', 'CLICK_SHARE_TW'))
    forEachTarget(document.querySelectorAll('.js-metrica-share-g'), () => event('Share', 'CLICK_SHARE_G'))
    forEachTarget(document.querySelectorAll('.js-metrica-share-in'), () => event('Share', 'CLICK_SHARE_IN'))
    forEachTarget(document.querySelectorAll('.js-metrica-tag-click-to-catalog'), () => event('Tag page', 'TAG_CLICK_TO_CATALOG'))
    forEachTarget(document.querySelectorAll('.js-metrica-tag-click-contact-us'), () => event('Tag page', 'TAG_CLICK_CONTACT_US'))
    forEachTarget(document.querySelectorAll('.js-metrica-product-click-solution'), () => event('Product', 'PRODUCT_CLICK_SOLUTION'))
  })

  // @note We don't use `ajaxError` here, since it won't track JSONP requests
  $(document).ajaxComplete((event, request, settings) => {
    // @todo This is temp workaround for cases when request ends up undefined
    //       Seems to be happening when AJAX request originates not from jQuery
    //       Caused by Mango calltracker code
    if (!request) return

    const { readyState, status, responseJSON: { result, msg } } = request
    const { url } = settings

    // @todo I'm not sure that it is reliable way to filter errors from xhr
    if (readyState !== 4 || status !== 200 || result === 'error') exception(`Ajax error: ${msg}, status ${status}`, url)
  })
}
