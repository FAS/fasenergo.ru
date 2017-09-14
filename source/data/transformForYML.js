  // @todo This is temporary measure to deal with nulls in some properties
const omitBy = require('lodash/omitBy')
const isNil = require('lodash/isNil')

const smartPlurals = require('smart-plurals')

const s = require('./selectors')
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
    email: 'hello@example.com', // @todo Which one?
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

  FASENERGO_GENERATORS.forEach((g) => {
    const SAME_TAGGED_GENERATORS = s.filterWithTags(FASENERGO_GENERATORS, g.tags)
    const RECOMMENDED_GENERATORS = s.rejectWithId(SAME_TAGGED_GENERATORS, g.slug)
    const { weight, size: { length, width, height } } = g.enclosure

    const maxPower = s.getGeneratorHighestPower(g)

    YML.offers.push(omitBy({
      type: 'vendor.model',
      typePrefix: 'Газовый генератор',
      model: g.model,
      vendor: g.manufacturer.brand,
      vendorCode: g.article.toString(),
      id: g.article.toString(), // @todo CHECK THAT IT NEVER CHANGES! @todo We use article here instead of SLUG
      available: false,
      bid: 20, // @todo What to set?
      cbid: 50, // @todo What to set?
      // fee: 10, // Because cpa disabled
      // group_id: '13', // doesn't work for our categories
      url: urljoin(data.SITE.homepage, 'продукция/газовые-генераторы', g.slug),
      price: s.getGeneratorCurrentPrice(g),
      oldprice: g.priceBeforeDiscount,
      currencyId: 'RUB',
      categoryId: '1111',
      picture: s.getGeneratorPhotosUrls(g)
        .filter((_, i) => i < 10)
        .map((url, i) => urljoin(data.SITE.homepage, data.PATH.images, url)),
      store: true, // @todo Sale point has to be added in account
      pickup: true,
      delivery: true, // @todo Said to be  Если вы используете элемент store или pickup со значением true, убедитесь, что в личном кабинете указаны точки продаж или подключена доставка партнерами Маркета. В противном случае при проверке прайс-листа будет выдана ошибка.
      // outlets: [ // @todo Unavailable data
      //   { id: '205', instock: 20, booking: true }
      // ],
      'delivery-options': [
        { cost: 5000, days: [1, 3], 'order-before': 16 }
      ],
      description: g.desc,
      sales_notes: maxPower <= 50 ? 'Необходима 100% предоплата.' : 'Необходима предоплата.',
      manufacturer_warranty: true,
      country_of_origin: g.manufacturer.country,
      adult: false,
      // barcode: ['0156789012'], // @todo Unavailable data
      cpa: 0,
      param: [
        // {
        //   name: 'Гарантия',
        //   unit: plural(warrantyFromInstallation, ['месяц', 'месяца', 'месяцев']),
        //   value: warrantyFromInstallation
        // }, {
        //   name: 'Моторесурс',
        //   unit: plural(warrantyServiceLife, ['моточас', 'моточаса', 'моточасов']),
        //   value: warrantyServiceLife
        // },
        // { name: 'Мощность (метан)', unit: 'кВт', value: powersList },
        // { name: 'Мощность (СУГ)', unit: 'кВт', value: powersList },
        { name: 'Тепловая мощность', unit: 'кВт', value: g.specs._thermalPower },
        { name: 'Напряжение', unit: 'V', value: g.specs.voltage },
        // { name: 'Количество фаз', value: phasesWord },
        { name: 'Сила тока', unit: 'A', value: g.specs.current._legacy },
        { name: 'Шум', unit: 'Дб', value: g.enclosure.noise },
        { name: 'Стартер', value: 'Электростартер' },
        { name: 'Тип покдлючения', value: 'Прямое\\к резервуару' },
        { name: 'Время безостановочной работы', value: 'Круглосуточно' },
        { name: 'Исполнение', value: capitalize(g.enclosure.type) },
        { name: 'Материал исполнения', value: capitalize(g.enclosure.material) },
        // { name: 'Двигатель', value: engineTitle },
        // { name: 'Тип охлаждения', value: capitalize(CoolingToWord(engine.cooling)) },
        { name: 'Рабочие обороты', value: g.specs.operatingSpeed },
        // {% for fuel, fuelConsumption in specs.fuel %}
        // { name: 'Потребление ${FuelTypeToWord(fuel)}', value: fuelConsumption },
        // {% endfor %}
        // {% for equipmentList %} // Комплектация
        // { name: eq, value: есть },
        // {% endif %}
        { name: 'Блок управления', value: 'LCD-дисплей' },
        { name: 'Язык блока управления', value: 'Русский' },
        { name: 'Автомат ввода резерва', value: 'Нет' },
        { name: 'Время ввода резерва', unit: 'сек', value: 7 },
        { name: 'Авто-контроль работы генератора', value: 'Есть' }
        // @todo Hidden until information will be clarified
        // { name: 'Синхронизация', value: 'До 20 генераторов' },
        // @todo One more questionable measure to deal with null values
      ].filter((e) => !isNil(e.value)),
      weight: weight,
      // Dividing by 10 to convert `mm` to required by Yandex `cm`
      dimensions: (length && width && height && [length / 10, width / 10, height / 10]) || null,
      rec: RECOMMENDED_GENERATORS.map((e) => e.article.toString()), // @todo Note that it might be slug!
      vat: 'VAT_18'
    }, isNil))
  })

  return YML
}
