const t = require('tcomb')
const r = require('../../modules/refinements')
const validate = require('../../modules/validate')
const { file: { readYAML } } = require('grunt')

const VAPORIZERS = readYAML(`#{__dirname}/vaporizers.yml`)

const Vaporizers = r.EqualKeyAndProp('id')(t.dict(t.String, t.struct({
  id: t.String,
  type: t.enums.of(['испаритель']),
  title: t.String,
  price: t.Number,
  specs: t.struct({
    performance: t.Number,
    heatType: t.enums.of(['жидкостный', 'электрический']),
    heatTransferType: t.enums.of(['прямой', 'непрямой']),
    pressure: t.Number,
    pressureType: t.union([t.enums.of(['низкое', 'среднее']), r.False])
  }, { strict: true })
}, { name: 'Vaporizers', strct: true })))

module.exports = Vaporizers

/* eslint-env jest */

if (typeof describe === 'function') {
  describe('Vaporizers', () => {
    it('should match schema structure and types', () => {
      expect(() => validate(VAPORIZERS, Vaporizers)).not.toThrow()
    })
  })
}
