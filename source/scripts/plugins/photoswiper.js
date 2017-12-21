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
export const getImagesData = ($entries) => [...$entries].map(($link) => {
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

/**
 * Find all galleries and orphan images — images, which are not grouped
 * into any gallery.
 * Orphan images represented as standalone gallery.
 * @param  {string} selector      Galleries to be watched
 * @param  {string} imageSelector Galleries images
 * @return {Array[]|Element[]} Grouped galleries and orphans as standalone gallery
 */
export const getGalleries = (selector, imageSelector) => {
  const $galleries = document.querySelectorAll(selector)
  const $images = document.querySelectorAll(imageSelector)

  const $orphans = [...$images].reduce(($orphans, $image) => {
    const isOrphan = ![...$galleries].some(($gallery) => $gallery.contains($image))

    if (isOrphan) $orphans.push($image)

    return $orphans
  }, [])

  return [
    $orphans,
    ...$galleries
  ]
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
    },
    bgOpacity: 0.9,
    fullscreenEl: false,
    zoomEl: false,
    shareEl: false
  })

  gallery.listen('close', () => {
    const $current = gallery.currItem.$thumbnail
    const isVisible = $current.getClientRects().length

    // Do not animate on closing images, if its thumbnail is not visible
    if (!isVisible) {
      // @todo It would be better to fade out somehow instead of closing instantly
      gallery.options.getThumbBoundsFn = undefined
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
 * 2. All images that should have use specific structure and match `imageSelector`:
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
 * 3. Optionally, images should be grouped into galleries matching `selector`:
 *
 *    ```html
 *    <article class='js-photoswiper'>...images</article>
 *    <article class='js-photoswiper'>...images</article>
 *    ````
 *
 *    Otherwise they will be considered orphans and grouped with other orphans.
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
    const $galleries = getGalleries(selector, imageSelector)

    $galleries.forEach(($gallery) => {
      if (!$gallery) return

      const $links = Array.isArray($gallery) ? $gallery : $gallery.querySelectorAll(imageSelector)

      $links.forEach(($link, index) => {
        if ($link.contains(e.target)) {
          e.preventDefault()
          openPhotoswipe(index, $gallery, getImagesData($links), lightboxSelector)
        }
      })
    })
  })
}

export default photoSwiper
