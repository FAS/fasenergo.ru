t = require('tcomb')
{ file: { readYAML } } = require('grunt')

{ refinements: { False, equalKeysAndSlugs } } = require('../../tests/utils/tcomb')

enginesData = readYAML(__dirname + '/engines.yml')

Generators = t.dict t.union([t.String, t.Number]), t.struct({
  slug: t.union [t.String, t.Number]
  meta: t.struct
    title: t.maybe t.String
    description: t.maybe t.String
  type: t.String
  article: t.maybe t.Number
  manufacturer: t.struct
    brand: t.String
    country: t.maybe t.String
  series: t.maybe t.union [t.String, t.Number, False]
  model: t.maybe t.union [t.String, t.Number, False]
  # patttern for outputing name of the paricular model with `sprintf()`, like "%(brand)s %(series)s %(model)s"
  title: t.String
  _legacyPrice: t.maybe t.String
  _legacyOldPrice: t.maybe t.String
  price: t.maybe t.Number
  discount: t.maybe t.Number
  availability: t.enums.of ['available', 'preorder', 'discontinued']
  warranty: t.struct
    delivery: t.maybe t.Number
    installation: t.maybe t.union [t.Number, False]
    # time spent in active use (e.g. working hours, motoresource)
    serviceLife: t.maybe t.union [t.Number, False]
  desc: t.maybe t.union [t.String, t.list(t.String), False]
  features: t.maybe t.union [t.String, t.list(t.struct { title: t.String, desc: t.String }), False]
  photos: t.maybe t.list(t.struct { url: t.String, alt: t.maybe(t.String), main: t.maybe(t.Boolean) })
  # List of Youtubee iframe srcs
  videos: t.maybe t.union [t.list(t.String), False]
  docs: t.maybe t.list(t.struct { url: t.String, title: t.String, desc: t.maybe(t.String) })
  tags: t.maybe t.union [t.list(t.String), False]

  specs: t.struct
    # мощность
    power: t.struct
      ng: t.struct
        max: t.maybe t.Number
      lpg: t.struct
        max: t.maybe t.Number
    # темпловая мощность, для когенерационных установок
    _thermalPower: t.maybe t.Number
    # сила тока
    current: t.struct
      ng: t.maybe t.Number
      lpg: t.maybe t.Number
    # напряжение (необходимое напряжение в сети)
    voltage: t.maybe t.Number
    # частота
    frequency: t.maybe t.Number
    # количество фаз
    phases: t.maybe t.Number
    # коэфициент мощности
    phi: t.maybe t.Number
    # защитный автомат, А
    circuitBreaker: t.maybe t.Number
    fuel: t.struct
      # `0.4 м3/ч * 1 кВт`
      ng: t.maybe t.String
      lpg: t.maybe t.String
    operatingSpeed: t.maybe t.Number
    cooling: t.maybe t.enums.of ['air', 'liquid']

  equipment: t.maybe t.union [t.String, t.list(t.String), False]

  engine: t.maybe t.enums.of(Object.keys(enginesData))

  enclosure: t.struct
    # тип
    type: t.maybe t.enums.of ['корпус', 'открытый', 'контейнер', 'open', 'soundproof']
    # материал
    material: t.maybe t.enums.of ['сталь', 'нержавеющая сталь']
    # покрытие
    coating: t.maybe t.union [t.String, False]
    # теплоизоляция
    thermalInsulation: t.maybe t.Boolean
    # маркировка защиты (https://en.wikipedia.org/wiki/IP_Code)
    protection: t.maybe t.union([t.enums.of(['IP64', 'IP52 сталь']), False])
    # вентиляция
    ventilation: t.maybe t.Boolean
    # замок
    lock: t.maybe t.union [t.String, t.Boolean]
    # съемные стенки
    removablePanels: t.maybe t.Boolean
    # уровень шума
    noise: t.maybe t.Number
    # высота всего изделия
    height: t.maybe t.Number
    # ширина всего изделия
    width: t.maybe t.Number
    # глубина всего изделия
    depth: t.maybe t.Number
    # вес всего изделия
    weight: t.maybe t.Number
}, { name: 'Generator', strict: true }), 'Generators'

module.exports = equalKeysAndSlugs(Generators, 'Generators')