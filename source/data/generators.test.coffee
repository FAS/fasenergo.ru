t = require('tcomb')
r = require('../../modules/refinements')
validate = require('../../modules/validate')
{ file: { readYAML } } = require('grunt')

GENERATORS = readYAML "#{__dirname}/generators.yml"
ENGINES = readYAML "#{__dirname}/engines.yml"

module.exports = Generators = r.EqualKeyAndProp('slug') t.dict t.String, t.struct({
  slug: t.union [t.String, t.Number]
  meta: t.struct
    title: t.maybe t.String
    description: t.maybe t.String
  type: t.String
  article: t.maybe t.Number
  manufacturer: t.struct
    brand: t.String
    country: t.maybe t.String
  series: t.maybe t.union [t.String, t.Number, r.False]
  model: t.maybe t.union [t.String, t.Number, r.False]
  # patttern for outputing name of the paricular model with `sprintf()`, like "%(brand)s %(series)s %(model)s"
  title: t.String
  price: t.maybe t.Number
  priceBeforeDiscount: t.maybe t.Number
  discount: t.maybe t.Number
  discountDate: t.maybe r.Date
  availability: t.enums.of ['available', 'preorder', 'discontinued']
  warranty: t.struct
    delivery: t.maybe t.Number
    installation: t.maybe t.union [t.Number, r.False]
    # time spent in active use (e.g. working hours, motoresource)
    serviceLife: t.maybe t.union [t.Number, r.False]
  desc: t.maybe t.union [t.String, t.list(t.String), r.False]
  features: t.maybe t.union [t.String, t.list(t.struct { title: t.String, desc: t.String }), r.False]
  photos: t.maybe t.list(t.struct { url: t.String, alt: t.maybe(t.String), main: t.maybe(t.Boolean) })
  # List of Youtubee iframe srcs
  videos: t.maybe t.union [t.list(t.String), r.False]
  docs: t.maybe t.list(t.struct { url: t.String, title: t.String, desc: t.maybe(t.String) })
  tags: t.maybe t.union [t.list(t.String), r.False]

  specs: t.struct
    # мощность, kW
    # @todo: найти формулу для перевода кВт в кВА
    power: t.struct
      ng: t.struct
        # рекомендуемая мощность
        nominal: t.maybe t.Number
        # предельная мощность
        max: t.maybe t.Number
      lpg: t.struct
        nominal: t.maybe t.Number
        max: t.maybe t.Number
    # темпловая мощность, для когенерационных установок
    _thermalPower: t.maybe t.Number
    # сила тока, A
    current: t.struct
      ng: t.maybe t.Number
      lpg: t.maybe t.Number
    # напряжение, V
    # @todo: нужно уточнить о сложных моментах вроде 220/230 V
    voltage: t.maybe t.Number
    # частота, Hz
    frequency: t.maybe t.Number
    # количество фаз
    phases: t.maybe t.Number
    # коэфициент мощности
    phi: t.maybe t.Number
    # защитный автомат, A
    circuitBreaker: t.maybe t.Number
    consumption: t.struct
      ng: t.struct
        idling: t.maybe t.Number
        quarter: t.maybe t.Number
        half: t.maybe t.Number
        nominal: t.maybe t.Number
        max: t.maybe t.Number
      lpg: t.struct
        idling: t.maybe t.Number
        quarter: t.maybe t.Number
        half: t.maybe t.Number
        nominal: t.maybe t.Number
        max: t.maybe t.Number
    fuel: t.struct
      # `0.4 м3/ч * 1 кВт`
      ng: t.maybe t.String
      lpg: t.maybe t.String
    operatingSpeed: t.maybe t.Number
    cooling: t.maybe t.enums.of ['air', 'liquid']

  equipment: t.struct
    # Включен ли АВР
    ATS: t.maybe t.Boolean
    # Общий список включенного оборудования
    list: t.maybe t.union [t.String, t.list(t.String), r.False]
    optionsIds: t.maybe t.list(t.String)

  engine: t.maybe t.enums.of(Object.keys(ENGINES))

  enclosure: t.struct
    # исполнение
    type: t.maybe t.enums.of ['закрытое', 'открытое']
    # материал
    material: t.maybe t.enums.of ['пластик', 'метал']
    # покрытие
    coating: t.maybe t.union [t.String, r.False]
    # теплоизоляция
    thermalInsulation: t.maybe t.Boolean
    # маркировка защиты (https://en.wikipedia.org/wiki/IP_Code)
    protection: t.maybe t.union([t.enums.of(['IP64', 'IP52 сталь']), r.False])
    # вентиляция
    ventilation: t.maybe t.Boolean
    # замок
    lock: t.maybe t.union [t.String, t.Boolean]
    # съемные стенки
    removablePanels: t.maybe t.Boolean
    # уровень шума
    noise: t.maybe t.Number
    # габариты (ДxШxВ), мм
    size: t.struct
      # длина всего изделия
      length: t.maybe t.Number
      # ширина всего изделия
      width: t.maybe t.Number
      # высота всего изделия
      height: t.maybe t.Number
    # вес всего изделия
    weight: t.maybe t.Number
}, { name: 'Generator', strict: true }), 'Generators'

if typeof describe == 'function'
  describe 'Generators', () =>
    it 'should match schema structure and types', () =>
      expect(() => validate(GENERATORS, Generators)).not.toThrow()
