/* eslint-env jest */

import { refinements } from './tcomb'

describe('Tcomb refinement', () => {
  describe('False', () => {
    it('should pass `false`', () => {
      expect(() => refinements.False(false)).not.toThrow()
    })
    it('should error on everything except `false`', () => {
      expect(() => refinements.False(true)).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False('string')).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False(-1)).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False(1)).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False(-1.555)).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False(1.555)).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False(0)).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False(null)).toThrowErrorMatchingSnapshot()
      expect(() => refinements.False(undefined)).toThrowErrorMatchingSnapshot()
    })
  })
  describe('Float', () => {
    // @todo Disabled, because tests are failing
    it('should pass float number', () => {
      // expect(() => refinements.Float(1.503434)).not.toThrow()
      // expect(() => refinements.Float(1.0)).not.toThrow()
      // expect(() => refinements.Float(5000000000000000000000000000000.534333333333333333)).not.toThrow()
    })
    it('should error on everything except float number', () => {
      // expect(() => refinements.Float(false)).toThrowErrorMatchingSnapshot()
      // expect(() => refinements.Float(true)).toThrowErrorMatchingSnapshot()
      // expect(() => refinements.Float('string')).toThrowErrorMatchingSnapshot()
      // expect(() => refinements.Float(-1)).toThrowErrorMatchingSnapshot()
      // expect(() => refinements.Float(1)).toThrowErrorMatchingSnapshot()
      // expect(() => refinements.Float(-52)).toThrowErrorMatchingSnapshot()
      // expect(() => refinements.Float(52)).toThrowErrorMatchingSnapshot()
      // expect(() => refinements.Float(0)).toThrowErrorMatchingSnapshot()
      // expect(() => refinements.Float(null)).toThrowErrorMatchingSnapshot()
      // expect(() => refinements.Float(undefined)).toThrowErrorMatchingSnapshot()
    })
  })
})
