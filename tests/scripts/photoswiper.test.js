/**
 * @jest-environment jsdom
 */

/* eslint-env jest */

import '../../source/scripts/polyfill'
import photoSwiper, { getImages } from '../../source/scripts/plugins/photoswiper'

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
  describe('`getImages()`', () => {
    it('should get images data', () => {
      document.body.innerHTML = `
        ${Image('/thumbnail-1.png', '/image-1.png', 100, 150, 'Thumbnail-1 alt', 'Thumbnail-1 caption')}
        ${Image('/thumbnail-2.png', '/image-2.png', 200, 250, 'Thumbnail-2 alt', 'Thumbnail-2 caption')}
      `

      expect(getImages(document.body, '.js-photoswiper__image')).toMatchSnapshot()
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
    `

    photoSwiper()

    document.querySelector('[href="/image-1.png"]').click()
    expect(activePhotoswipe).toMatchSnapshot()

    document.querySelector('[href="/image-4.png"]').click()
    expect(activePhotoswipe).toMatchSnapshot()
  })
})
