const t = require('tcomb')
const { refinements } = require('../tests/utils/tcomb')

const r = refinements

// A validation schemas for Yandex Market Language (YML)

const CpaSchema = t.enums.of([0, 1])
const AdultSchema = t.Boolean

const DeliveryOptionsSchema = r.Maxlength(5)(t.list(t.struct({
  cost: t.Integer,
  days: t.union([t.enums.of(['']), t.Integer, t.tuple([t.Integer, t.Integer])]), // @todo maxvalue 31, output range as `"2-4"`, max interval 3 days
  'order-before': t.maybe(t.Integer) // @todo max 24
}, { name: 'YML Delivery Options', strict: true }), 'YML Delivery Options'))

const CurrencyIdSchema = t.enums.of(['RUB', 'RUR', 'UAH', 'BYN', 'KZT', 'USD', 'EUR'])

const CurrenciesSchema = t.list(t.struct({
  id: CurrencyIdSchema,
  // @todo В качестве основной валюты (для которой установлено rate="1") могут быть использованы только рубль (RUR, RUB), белорусский рубль (BYN), гривна (UAH) или тенге (KZT).
  rate: t.maybe(t.union([t.Number, t.enums.of(['CBRF', 'NBU', 'NBK', 'СВ'])])),
  plus: t.maybe(t.Number)
}, { name: 'YML Currency', strict: true }), 'YML Currencies')

const CategoriesSchema = t.list(t.struct({
  id: r.Maxlength(32)(t.String), // @todo can't be 0
  parentId: t.maybe(t.String), // @todo should exist in current list
  name: t.String
}, { name: 'YML Category', strict: true }), 'YML Categories')

const OfferSchema = t.struct({
  // attributes
  id: r.Maxlength(20)(t.String), // @todo only number and latin chars, should be unique among other offers
  available: t.maybe(t.Boolean), // Seems to be not used, when delivery-options specified
  bid: t.maybe(t.Integer),
  cbid: t.maybe(t.Integer),
  fee: t.maybe(t.Integer),
  group_id: t.maybe(r.Maxlength(9)(t.String)),
  // end attributes
  url: t.maybe(r.Maxlength(512)(r.Absoluteurl)), // @todo if contains non-latin chars, should be http, not https, or encoded
  price: t.union([t.Number, t.struct({
    from: t.Boolean, // @todo Allowed only for specific categories
    value: t.Number
  }, { name: 'YML Price', strict: true })]),
  oldprice: t.maybe(t.Number), // @todo Should be higher than `OfferSchema.price`
  currencyId: CurrencyIdSchema,
  categoryId: r.Maxlength(18)(t.String),
  // @todo JPEG or PNG only), mandatory for some categories
  picture: t.maybe(r.Maxlength(10)(t.list(r.Maxlength(512)(t.refinement(r.Absoluteurl, (p) =>
    r.Imagepath.is(p), 'Absoluteurl with Imagepath'
  ))))),
  store: t.maybe(t.Boolean),
  pickup: t.maybe(t.Boolean),
  delivery: t.maybe(t.Boolean),
  outlets: t.maybe(t.list(t.struct({
    id: t.String,
    instock: t.maybe(t.Integer),
    booking: t.maybe(t.Boolean)
  }, { name: 'YML Outlets', strict: true }))),
  'delivery-options': t.maybe(DeliveryOptionsSchema),
  // @todo dissalows words «скидка», «распродажа», «дешевый», «подарок» (кроме подарочных категорий), «бесплатно», «акция», «специальная цена», «только», «новинка», «new», «аналог», «заказ», «хит»;
  //       dissalows urls, emails;
  //       allows only tags <h3>...</h3>, <ul><li>...</li></ul>, <p>...</p>, <br/> encloused into `<![CDATA[Текст с использованием xhtml-разметки]]>``
  description: t.maybe(r.Maxlength(3000)(t.String)),
  sales_notes: t.maybe(r.Maxlength(50)(t.String)),
  'min-quantity': t.maybe(t.Integer),
  'step-quantity': t.maybe(t.Integer),
  manufacturer_warranty: t.maybe(t.Boolean),
  // @see https://cache-mskdataline04.cdn.yandex.net/download.cdn.yandex.net/support/ru/partnermarket/files/countries.pdf
  country_of_origin: t.maybe(t.enums.of(['Австралия', 'Австрия', 'Азербайджан', 'Албания', 'Алжир', 'Американские Виргинские острова', 'Ангилья', 'Ангола', 'Андорра', 'Антигуа и Барбуда', 'Аргентина', 'Армения', 'Аруба', 'Афганистан', 'Багамские острова', 'Бангладеш', 'Барбадос', 'Бахрейн', 'Беларусь', 'Белиз', 'Бельгия', 'Бенин', 'Бермудские Острова', 'Болгария', 'Боливия', 'Босния и Герцеговина', 'Ботсвана', 'Бразилия', 'Британские Виргинские острова', 'Бруней', 'Буркина-Фасо', 'Бурунди', 'Бутан', 'Вануату', 'Ватикан', 'Великобритания', 'Венгрия', 'Венесуэла', 'Восточный Тимор', 'Вьетнам', 'Габон', 'Гайана', 'Гаити', 'Гамбия', 'Гана', 'Гваделупа', 'Гватемала', 'Гвинея', 'Гвинея-Бисау', 'Германия', 'Гибралтар', 'Гондурас', 'Гонконг', 'Гренада', 'Гренландия', 'Греция', 'Грузия', 'Дания', 'Демократическая Республика Конго', 'Джибути', 'Доминика', 'Доминиканская Республика', 'Египет', 'Замбия', 'Западная Сахара', 'Зимбабве', 'Йемен', 'Израиль', 'Индия', 'Индонезия', 'Иордания', 'Ирак', 'Иран', 'Ирландия', 'Исландия', 'Испания', 'Италия', 'Кабо-Верде', 'Казахстан', 'Каймановы острова', 'Камбоджа', 'Камерун', 'Канада', 'Катар', 'Кения', 'Кипр', 'Киргизия', 'Кирибати', 'Китай', 'Колумбия', 'Коморские острова', 'Коста-Рика', 'Кот-д’Ивуар', 'Куба', 'Кувейт', 'Лаос', 'Латвия', 'Лесото', 'Либерия', 'Ливан', 'Ливия', 'Литва', 'Лихтенштейн', 'Люксембург', 'Маврикий', 'Мавритания', 'Мадагаскар', 'Майотта', 'Макао', 'Македония', 'Малави', 'Малайзия', 'Мали', 'Мальдивы', 'Мальта', 'Марокко', 'Маршалловы острова', 'Мексика', 'Мозамбик', 'Молдова', 'Монако', 'Монголия', 'Мьянма', 'Намибия', 'Науру', 'Непал', 'Нигер', 'Нигерия', 'Нидерланды', 'Никарагуа', 'Новая Зеландия', 'Новая Каледония', 'Норвегия', 'Объединённые Арабские Эмираты', 'Оман', 'Острова Кука', 'Пакистан', 'Палау', 'Панама', 'Папуа - Новая Гвинея', 'Парагвай', 'Перу', 'Польша', 'Португалия', 'Республика Конго', 'Реюньон', 'Россия', 'Руанда', 'Румыния', 'Самоа', 'Сан-Марино', 'Сан-Томе и Принсипи', 'Саудовская Аравия', 'Свазиленд', 'Северная Корея', 'Сейшельские острова', 'Сенегал', 'Сент-Винсент и Гренадины', 'Сент-Китс и Невис', 'Сент-Люсия', 'Сербия', 'Сингапур', 'Сирия', 'Словакия', 'Словения', 'Сомали', 'Судан', 'Суринам', 'США', 'Сьерра-Леоне', 'Таджикистан', 'Таиланд', 'Танзания', 'Тёркс и Кайкос', 'Того', 'Тонга', 'Тринидад и Тобаго', 'Тувалу', 'Тунис', 'Туркменистан', 'Турция', 'Уганда', 'Узбекистан', 'Украина', 'Уругвай', 'Федеративные Штаты Микронезии', 'Фиджи', 'Филиппины', 'Финляндия', 'Франция', 'Французская Гвиана', 'Французская Полинезия', 'Хорватия', 'Центрально-Африканская Республика', 'Чад', 'Черногория', 'Чехия', 'Чили', 'Швейцария', 'Швеция', 'Шри-Ланка', 'Эквадор', 'Экваториальная Гвинея', 'Эритрея', 'Эстония', 'Эфиопия', 'ЮАР', 'Южная Корея', 'Ямайка', 'Япония'])),
  adult: t.maybe(AdultSchema),
  age: t.maybe(t.struct({
    unit: t.enums.of(['year', 'month']),
    value: t.enums.of([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) // @todo For unit=year only 0, 6, 12, 16, 18 allowed
  }, { name: 'YML Age', strict: true })),
  barcode: t.maybe(t.list(r.Maxlength(12)(t.String))), // @todo can contains only numbers, without any other chars. Conforms to standards EAN-13, EAN-8, UPC-A, UPC-E
  cpa: t.maybe(CpaSchema),
  // @see https://yandex.ru/support/partnermarket/param.html for recommended params and their units
  param: t.maybe(t.list(t.struct({
    name: t.String,
    unit: t.maybe(t.String), // @todo mandatory if value numeric
    value: t.union([t.String, t.Number])
  }, { name: 'YML Param', strict: true }))),
  expiry: t.maybe(t.String), // @todo should be in ISO8601
  weight: t.maybe(t.Number),
  dimensions: t.maybe(t.tuple([t.Number, t.Number, t.Number])),
  downloadable: t.maybe(t.Boolean),
  // @todo only ints and latin chars
  //       ids should be enlisted in that file
  rec: r.Maxlength(30)(t.list(r.Maxlength(20)(t.String))),
  vat: t.maybe(t.enums.of([1, 'VAT_18', 3, 'VAT_18_118', 2, 'VAT_10', 4, 'VAT_10_110', 5, 'VAT_0', 6, 'NO_VAT']))
}, { name: 'YML Offer', strict: true })

// @todo Add support for special types:
//       https://yandex.ru/support/partnermarket/export/books.html
//       https://yandex.ru/support/partnermarket/export/audiobooks.html
//       https://yandex.ru/support/partnermarket/export/music-video.html
//       https://yandex.ru/support/partnermarket/export/medicine.html
//       https://yandex.ru/support/partnermarket/export/event-tickets.html
//       https://yandex.ru/support/partnermarket/export/tours.html

const SimplifiedOfferSchema = OfferSchema.extend({
  name: r.Maxlength(120)(t.String),
  model: t.maybe(t.String),
  vendor: t.maybe(t.String),
  vendorCode: t.maybe(t.String)
}, { name: 'YML Simplified Offer', strict: true })

const FreeOfferSchema = OfferSchema.extend({
  // attributes
  type: t.enums.of(['vendor.model']),
  // end attributes
  typePrefix: t.maybe(t.String),
  model: t.String,
  vendor: t.String,
  vendorCode: t.maybe(t.String)
}, { name: 'YML Free Offer', strict: true })

const OffersSchema = t.list(t.union([SimplifiedOfferSchema, FreeOfferSchema]))

const YandexMLSchema = t.struct({
  name: r.Maxlength(20)(t.String),
  company: t.String,
  url: r.Maxlength(50)(r.Absoluteurl),
  platform: t.maybe(t.String), // mostly not needed
  version: t.maybe(t.String), // mostly not needed
  agency: t.maybe(t.String), // mostly not needed
  email: t.maybe(t.String), // mostly not needed // @todo r.Email
  currencies: CurrenciesSchema,
  categories: CategoriesSchema,
  'delivery-options': DeliveryOptionsSchema,
  cpa: t.maybe(CpaSchema),
  adult: t.maybe(AdultSchema),
  offers: OffersSchema
}, { name: 'YML', strict: true })

module.exports = {
  CpaSchema,
  AdultSchema,
  DeliveryOptionsSchema,
  CurrencyIdSchema,
  CurrenciesSchema,
  CategoriesSchema,
  OfferSchema,
  OffersSchema,
  YandexMLSchema
}
