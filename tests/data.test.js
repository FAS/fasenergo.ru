/* eslint-env jest */

import { grunt } from './utils/grunt'
import { validate } from './utils/tcomb'
import { join } from 'path'

const { config, file: { readYAML } } = grunt

const generatorsData = readYAML(join(config('path.source.data'), 'generators.yml'))
const generatorsSchema = require(join('../../', config('path.source.data'), 'generators.schema'))

const enginesData = readYAML(join(config('path.source.data'), 'engines.yml'))
const enginesSchema = require(join('../../', config('path.source.data'), 'engines.schema'))

describe('Generators data', () => {
  it('should be readable', () => expect(generatorsData).toBeTruthy())

  it('schema should be readable', () => expect(generatorsSchema).toBeTruthy())

  it('should match schema structure and types', () => {
    expect(() => validate(generatorsData, generatorsSchema)).not.toThrow()
  })
})

describe('Engines data', () => {
  it('should be readable', () => expect(enginesData).toBeTruthy())

  it('schema should be readable', () => expect(enginesSchema).toBeTruthy())

  it('should match schema structure and types', () => {
    expect(() => validate(enginesData, enginesSchema)).not.toThrow()
  })
})
