t = require('tcomb')
r = require('../../modules/refinements')
validate = require('../../modules/validate')
{ file: { readYAML } } = require('grunt')

ENGINES = readYAML("#{__dirname}/engines.yml")

module.exports = Engines = r.EqualKeyAndProp('slug') t.dict t.String, t.struct({
  slug: t.union [t.String, t.Number]
  type: t.maybe t.String
  model: t.maybe t.union [t.String, t.Number, r.False]
  article: t.maybe t.Number
  manufacturer: t.struct
    brand: t.String
    country: t.maybe t.String
  # 8.2kW@3600rpm
  power: t.struct
    hp: t.maybe t.Number
    value: t.maybe t.Number
    rpm: t.maybe t.Number
  # 25.1N.m@2500rpm
  torque: t.struct
    value: t.maybe t.Number
    rpm: t.maybe t.Number
  # расположение клапанов
  valvetrain: t.maybe t.enums.of ['OHV', 'SOHC', 'DOHC']
  # количество цилиндров
  cylinders: t.maybe t.Number
  # количество тактов
  strokes: t.maybe t.Number
  # объем двигателя, куб.см
  displacement: t.maybe t.Number
  compressionRatio: t.struct
    min: t.maybe t.Number
    max: t.maybe t.Number
  operatingSpeed: t.maybe t.Number
  cooling: t.maybe t.enums.of ['air', 'liquid']
  oilCapacity: t.maybe t.Number
  # типы топлива и расход
  fuel: t.struct
    # 0.4 м3/ч * 1 кВт
    ng: t.maybe t.String
    lpg: t.maybe t.String
}, { name: 'Engine', strict: true }), 'Engines'

if typeof describe == 'function'
  describe 'Engines', () =>
    it 'should match schema structure and types', () =>
      expect(() => validate(ENGINES, Engines)).not.toThrow()