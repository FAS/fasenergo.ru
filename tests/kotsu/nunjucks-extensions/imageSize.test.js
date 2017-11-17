/* eslint-env jest */

import { renderString } from '../../utils/nunjucks'

const render = (template, context = mockContext , parse) => renderString(template, context, parse)
const mockContext = {
  PATH: {
    images: 'assets/images',
    build: {
      root: 'build'
    }
  },
  SITE: {
    __images: [
      { 'name': 'build/assets/images/test.jpg', 'width': 100, 'height': 150 },
      { 'name': 'build/assets/images/test2.png', 'width': 120, 'height': 170 }
    ]
  }
}

describe('Nunjucks `imageSize()`', () => {
  it('should get image size', () => {
    expect(render(`
      {% set image = imageSize('/' + PATH.images + '/test.jpg') %}
      <img src='{{ image.src }}' width='{{ image.width }}' height='{{ image.height }}'>
    `)).toMatchSnapshot()
  })

  it('should error on unknown image', () => {
    expect(() => render(`{% set size = imageSize('/nope.jpg') %}`)).toThrowErrorMatchingSnapshot()
  })
})
