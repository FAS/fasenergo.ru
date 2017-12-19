/* eslint-disable import/no-webpack-loader-syntax */

// @todo Add loading from URL (see http://photoswipe.com/documentation/getting-started.html)
// @todo Add loading from URL by handling gallery id
// @todo Check how it works with groups, do we need `data-photoswiper-group`
// @todo Add passing of options

import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default.min.js'
import 'photoswipe/dist/photoswipe.css!'
import 'photoswipe/dist/default-skin/default-skin.css!'

/**
 * Get galleries images data for Photoswipe
 * @param  {Element} $parent  Gallery element in which should be
 *                            found images
 * @param  {string}  selector Matching images selector
 * @return {object[]} Array with data about each image
 */
export const getImages = ($parent, selector) => {
  const $imagesLinks = $parent.querySelectorAll(selector)

  return [...$imagesLinks].map(($link) => {
    const $thumbnail = $link.querySelector('img')
    const $figcaption = $link.parentNode.querySelector('figcaption')

    return {
      $thumbnail,
      title: $figcaption && $figcaption.innerHTML,
      src: $link.getAttribute('href'),
      msrc: $thumbnail && $thumbnail.getAttribute('src'),
      w: +$link.getAttribute('data-width'),
      h: +$link.getAttribute('data-height')
    }
  })
}

/**
 * Open Photoswipe lightbox with specific settings
 * @param  {number}   index            Index of image which should be opened
 * @param  {Element}  $gallery         Galler element which is being opened
 * @param  {object[]} items            Array with gallery images data
 * @param  {string}   lightboxSelector Selector for element which holds Photoswipe lightbox
 * @return {void} Just opens lightbox
 */
export const openPhotoswipe = (index, $gallery, items, lightboxSelector) => {
  const $photoswipe = document.querySelector(lightboxSelector)

  const gallery = new PhotoSwipe($photoswipe, PhotoSwipeUI, items, {
    // galleryUID: $gallery.getAttribute('data-pswp-uid'),
    index,
    getThumbBoundsFn: (index) => {
      const $thumbnail = items[index].$thumbnail
      const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
      const rect = $thumbnail.getBoundingClientRect()

      return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
    }
  })

  gallery.init()
}

/**
 * Find and watch for galleries images clicks and run Photoswipe whenever needed
 *
 * To make it work few requirements should be met:
 *
 * 1. Photoswipe-specific ligthbox should exist in DOM and match `lightboxSelector`.
 *
 *    See Photoswipe docs for HTML code.
 *
 * 2. All images that should have lightbox should use specific structure and match `imageSelector`:
 *
 *    ```html
 *    <figure>
 *       <a class='js-photoswiper__image' href='${image}' data-width='${width}' data-height='${height}'>
 *         <img src='${thumbnail}' alt='${alt}' />
 *       </a>
 *       <figcaption>${caption}</figcaption>
 *     </figure>
 *    ````
 *
 * 3. Images should be grouped into galleries matching `selector`:
 *
 *    ```html
 *    <article class='js-photoswiper'>...images</article>
 *    <article class='js-photoswiper'>...images</article>
 *    ````
 *
 * @param  {string} [selector]                   Galleries to be watched
 * @param  {string} [imageSelector]              Galleries images
 * @param  {string} [lightboxSelector = '.pswp'] Selector for element which holds Photoswipe lightbox
 * @return {void} Just runs Photoswipe whenever needed
 */
const photoSwiper = (
  selector = '.js-photoswiper',
  imageSelector = '.js-photoswiper__image',
  lightboxSelector = '.pswp'
) => {
  document.addEventListener('click', (e) => {
    const $galleries = document.querySelectorAll(selector)

    $galleries.forEach(($gallery) => {
      const $links = $gallery.querySelectorAll(imageSelector)

      $links.forEach(($link, index) => {
        if ($link.contains(e.target)) {
          e.preventDefault()
          openPhotoswipe(index, $gallery, getImages($gallery, imageSelector), lightboxSelector)
        }
      })
    })
  })
}

export default photoSwiper
