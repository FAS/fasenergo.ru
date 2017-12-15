t = require('tcomb')
r = require('../../modules/refinements')
validate = require('../../modules/validate')
{ file: { readYAML } } = require('grunt')

GENERATORS_OPTIONS = readYAML "#{__dirname}/generators.options.yml"

module.exports = GeneratorsOptions = r.EqualKeyAndProp('id') t.dict t.String, t.struct({
  id: t.String
  title: t.String
  description: t.maybe t.String
  price: t.Number
}, { name: 'Generator options', strict: true }), 'Generators options'

if typeof describe == 'function'
  describe 'Generators options', () =>
    it 'should match schema structure and types', () =>
      expect(() => validate(GENERATORS_OPTIONS, GeneratorsOptions)).not.toThrow()
