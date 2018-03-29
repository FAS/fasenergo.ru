  // @todo This is temporary measure to deal with nulls in some properties
const omitBy = require('lodash/omitBy')
const isNil = require('lodash/isNil')

const smartPlurals = require('smart-plurals')

const s = require('./selectors')
const f = require('./formatters')
const urljoin = require('../../modules/urljoin')

/**
 * Transform data to serve as input for YML (Yandex Market Language) generator
 * @param  {object} data Complex object, confronting schema
 *                       @link source/data/index.test
 * @return {object} Transfomred data for `yandex-market-language` lib
 */
module.exports = (data) => {
  const capitalize = (string) => string && `${string.charAt(0).toUpperCase()}${string.slice(1)}`
  const plural = smartPlurals.Plurals.getRule('ru-RU')

  const YML = {
    name: data.PLACEHOLDERS.company,
    company: `ООО «${data.PLACEHOLDERS.company}»`,
    url: data.SITE.homepage,
    platform: 'Kotsu',
    version: data.SITE.version,
    agency: 'LotusTM',
    email: 'hello@2bad.me',
    currencies: [
      { id: 'RUR', rate: 1 },
      { id: 'USD', rate: 'CBRF' },
      { id: 'EUR', rate: 'CBRF' }
    ],
    categories: [
      { id: '1', name: 'Дом и дача' },
      { id: '11', parentId: '1', name: 'Строительство и ремонт' },
      { id: '111', parentId: '11', name: 'Электрика' },
      { id: '1111', parentId: '111', name: 'Электрогенераторы' }
    ],
    'delivery-options': [
      { cost: 5000, days: [1, 3], 'order-before': 16 }
    ],
    cpa: 0,
    adult: false,
    offers: []
  }

  const GENERATORS = s.selectGenerators(data.GENERATORS, false)
  const FASENERGO_GENERATORS = s.filterWithBrands(GENERATORS, 'Фасэнергомаш')

  // @todo This is bad. We filter out temporarily cogen station because it lacks article
  const WITHOUT_COGEN_GENERATORS = FASENERGO_GENERATORS.filter((e) => e.slug !== 'когенерационная-установка-фас-50-70м')
  const WITH_PRICES = WITHOUT_COGEN_GENERATORS
    .filter((e) => s.getGeneratorCurrentPrice(e))

  WITH_PRICES.forEach((g) => {
    const ENGINE = s.selectEngine(data.ENGINES, g.engineId)
    const { weight, size: { length, width, height } } = g.enclosure
    const SAME_TAGGED_GENERATORS = s.filterWithTags(FASENERGO_GENERATORS, g.tags)
    const RECOMMENDED_GENERATORS = s.rejectWithId(SAME_TAGGED_GENERATORS, g.slug)

    const maxPower = s.getGeneratorHighestPower(g)

    const params = [
      {
        name: 'Гарантия',
        unit: plural(g.warranty.installation, ['месяц', 'месяца', 'месяцев']),
        value: g.warranty.installation
      }, {
        name: 'Моторесурс',
        unit: plural(g.warranty.serviceLife, ['моточас', 'моточаса', 'моточасов']),
        value: g.warranty.serviceLife
      },
      // @todo Iterate upon fuel types
      { name: 'Мощность (метан)', unit: 'кВт', value: g.specs.power.ng.max },
      { name: 'Мощность (СУГ)', unit: 'кВт', value: g.specs.power.lpg.max },
      { name: 'Тепловая мощность', unit: 'кВт', value: g.specs._thermalPower },
      { name: 'Напряжение', unit: 'V', value: g.specs.voltage },
      { name: 'Количество фаз', value: g.specs.phases },
      { name: 'Сила тока', unit: 'A', value: g.specs.current._legacy },
      { name: 'Шум', unit: 'Дб', value: g.enclosure.noise },
      { name: 'Стартер', value: 'Электростартер' },
      { name: 'Тип покдлючения', value: 'Прямое\\к резервуару' },
      { name: 'Время безостановочной работы', value: 'Круглосуточно' },
      { name: 'Исполнение', value: capitalize(g.enclosure.type) },
      { name: 'Материал исполнения', value: capitalize(g.enclosure.material) },
      { name: 'Двигатель', value: s.getEngineTitle(ENGINE) },
      { name: 'Охлаждение', value: capitalize(f.coolingToWord(ENGINE.cooling)) },
      { name: 'Рабочие обороты', value: g.specs.operatingSpeed },
      // @todo Iterate upon fuel types
      { name: 'Потребление (метан)', value: g.specs.fuel.ng },
      { name: 'Потребление (СУГ)', value: g.specs.fuel.lpg },
      { name: 'Блок управления', value: 'LCD-дисплей' },
      { name: 'Язык блока управления', value: 'Русский' },
      { name: 'Автомат ввода резерва (АВР)', value: g.equipment.AST ? 'Есть' : 'Нет' },
      { name: 'Время ввода резерва', unit: 'сек', value: 7 },
      { name: 'Авто-контроль работы генератора', value: 'Есть' }
      // @todo Hidden until information will be clarified
      // { name: 'Синхронизация', value: 'До 20 генераторов' },
      // @todo One more questionable measure to deal with null values
    ].filter((e) => !isNil(e && e.value))

    if (g.equipment.list) {
      // @todo This is regretable way to work with our list, which is a single string with banch of tags
      //       Should be removed when generators.yml will be updated
      const parsedList = g.equipment.list
        .replace(/<li>|\r?\n|/g, '')
        .split(/<\/li>\s?/)
        .filter((e) => e !== '')

      parsedList.forEach((e) => params.push({ name: e, value: 'Есть' }))
    }

    YML.offers.push(omitBy({
      type: 'vendor.model',
      typePrefix: 'Газовый генератор',
      model: g.model,
      vendor: g.manufacturer.brand,
      vendorCode: g.article.toString(),
      // @note Ensure it never changes
      id: g.article.toString(),
      available: false,
      bid: 1,
      cbid: 1,
      // fee: 10, // Because cpa disabled
      // group_id: '13', // Doesn't work for our categories
      url: urljoin(data.SITE.homepage, 'продукция/газовые-генераторы', g.slug),
      price: s.getGeneratorCurrentPrice(g),
      oldprice: g.priceBeforeDiscount,
      currencyId: 'RUB',
      categoryId: '1111',
      picture: s.getGeneratorPhotosUrls(g)
        .filter((_, i) => i < 10)
        .map((url, i) => urljoin(data.SITE.homepage, data.PATH.images, url)),
      store: true,
      pickup: true,
      delivery: true,
      // @todo Unavailable data
      // outlets: [
      //   { id: '205', instock: 20, booking: true }
      // ],
      'delivery-options': [
        { cost: 5000, days: [1, 3], 'order-before': 16 }
      ],
      description: g.desc,
      sales_notes: maxPower <= 50 ? 'Необходима 100% предоплата.' : 'Условия оплаты оговариваються индивидуально.',
      manufacturer_warranty: true,
      country_of_origin: g.manufacturer.country,
      adult: false,
      // @todo Unavailable data
      // barcode: ['0156789012'],
      cpa: 0,
      param: params,
      weight: weight,
      dimensions: (length && width && height && [length, width, height]
          .map((v) => v / 10) // To convert `mm` to required by Yandex `cm`
        ) || null,
      rec: RECOMMENDED_GENERATORS.map((e) => e.article.toString()),
      vat: 'VAT_18'
    }, isNil))
  })

  return YML
}
