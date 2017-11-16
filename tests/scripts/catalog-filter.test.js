/**
 * @jest-environment jsdom
 */

/* eslint-env jest */
/* global GROUP */

import { renderString } from '../utils/nunjucks'

describe('catalogFilter listner', () => {
  it('should work', () => {
    document.body.innerHTML = renderString(`
      {% from '_components/_CatalogFilter.nj' import CatalogFilter with context %}
      {% from '_components/_ProductCard.nj' import ProductCard with context %}

      {{ CatalogFilter(
        minPower = 5,
        maxPower = 350,
        minPrice = 20000,
        maxPrice = 3500000,
        enginesBrands = ['LONCIN', 'ВАЗ', 'ЯМЗ', 'ММЗ']
      ) }}

      <div id='js-catalog' class='Box'>

        {{ ProductCard(
          url = '/model-1',
          photo = '/nope.jpg',
          power = 5,
          price = 20000,
          engineBrand = 'ВАЗ',
          mode = 'резервный',
          noise = 47,
          phases = 1
        ) }}

      </div>

      <button id='js-catalog-show-all-btn'>
        Показать ещё (<span id='js-catalog-show-all-btn__items'></span>)
      </button>
    `, { PAGE: { locale: 'ru-RU' } })

    require('../../source/scripts/plugins/catalogFilter')

    expect(true).toBe(false)
  })
})
