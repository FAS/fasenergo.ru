/**
 * @jest-environment jsdom
 */

/* eslint-env jest */

import '../../source/scripts/polyfill'
import photoSwiper, { getGalleries, getImagesData } from '../../source/scripts/plugins/photoswiper'

let activePhotoswipe

jest.mock('photoswipe', () => class PhotoSwipe {
  constructor ($element, ui, items, options) {
    this.items = items
    this.options = options
  }

  init () {
    activePhotoswipe = {
      index: this.options.index,
      items: this.items
    }
  }

  listen () {}
}, { virtual: true })

jest.mock('photoswipe/dist/photoswipe-ui-default.min.js', () => {}, { virtual: true })
jest.mock('photoswipe/dist/photoswipe.css!', () => {}, { virtual: true })
jest.mock('photoswipe/dist/default-skin/default-skin.css!', () => {}, { virtual: true })

const Image = (thumbnail, image, width, height, alt, caption) => `
  <figure>
    <a class='js-photoswiper__image' href='${image}' data-width='${width}' data-height='${height}'>
      <img src='${thumbnail}' alt='${alt}' />
    </a>
    <figcaption>${caption}</figcaption>
  </figure>
`

describe('PhotoSwiper', () => {
  describe('`getImagesData()`', () => {
    it('should get images data', () => {
      document.body.innerHTML = `
        ${Image('/thumbnail-1.png', '/image-1.png', 100, 150, 'Thumbnail-1 alt', 'Thumbnail-1 caption')}
        ${Image('/thumbnail-2.png', '/image-2.png', 200, 250, 'Thumbnail-2 alt', 'Thumbnail-2 caption')}
      `

      const $images = document.querySelectorAll('.js-photoswiper__image')

      expect(getImagesData($images)).toMatchSnapshot()
    })
  })

  describe('`getGalleries()`', () => {
    it('should get galleries', () => {
      document.body.innerHTML = `
        <article class='js-photoswiper'>
          ${Image('/g-l-thumbnail-1.png', '/g-1-image-1.png', 100, 150, 'G-l-thumbnail-1 alt', 'G-l-thumbnail-1 caption')}
          ${Image('/g-l-thumbnail-2.png', '/g-1-image-2.png', 200, 250, 'G-l-thumbnail-2 alt', 'G-l-thumbnail-2 caption')}
        </article>

        <article class='js-photoswiper'>
          ${Image('/g-2-thumbnail-1.png', '/g-2-image-1.png', 300, 350, 'G-2-thumbnail-2 alt', 'G-2-thumbnail-2 caption')}
          ${Image('/g-2-thumbnail-2.png', '/g-2-image-2.png', 400, 450, 'G-2-thumbnail-2 alt', 'G-2-thumbnail-2 caption')}
        </article>

        ${Image('/orphan-thumbnail-1.png', '/orphan-image-1.png', 500, 550, 'Orphan-thumbnail-1 alt', 'Orphan-thumbnail-1 caption')}
        ${Image('/orphan-thumbnail-2.png', '/orphan-image-2.png', 600, 650, 'Orphan-thumbnail-2 alt', 'Orphan-thumbnail-2 caption')}
      `

      expect(getGalleries('.js-photoswiper', '.js-photoswiper__image')).toMatchSnapshot()
    })
  })

  it('should work with galleries', () => {
    document.body.innerHTML = `
      <article class='js-photoswiper'>
        ${Image('/thumbnail-1.png', '/image-1.png', 100, 150, 'Thumbnail-1 alt', 'Thumbnail-1 caption')}
        ${Image('/thumbnail-2.png', '/image-2.png', 200, 250, 'Thumbnail-2 alt', 'Thumbnail-2 caption')}
      </article>

      <article class='js-photoswiper'>
        ${Image('/thumbnail-3.png', '/image-3.png', 300, 350, 'Thumbnail-3 alt', 'Thumbnail-3 caption')}
        ${Image('/thumbnail-4.png', '/image-4.png', 400, 450, 'Thumbnail-4 alt', 'Thumbnail-4 caption')}
      </article>

      ${Image('/orphan-thumbnail-1.png', '/orphan-image-1.png', 500, 550, 'Orphan-thumbnail-1 alt', 'Orphan-thumbnail-1 caption')}
      ${Image('/orphan-thumbnail-2.png', '/orphan-image-2.png', 600, 650, 'Orphan-thumbnail-2 alt', 'Orphan-thumbnail-2 caption')}
    `

    photoSwiper()

    document.querySelector('[href="/image-1.png"]').click()
    expect(activePhotoswipe).toMatchSnapshot()

    document.querySelector('[href="/image-4.png"]').click()
    expect(activePhotoswipe).toMatchSnapshot()

    document.querySelector('[href="/orphan-image-1.png"]').click()
    expect(activePhotoswipe).toMatchSnapshot()
  })

  // @todo Disabled because due to mocking right now we can not use listner and test this case
  // it('should disable scaling if image is not visible', () => {})
})
